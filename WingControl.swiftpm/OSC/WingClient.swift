import Foundation
import Network

/// Talks OSC to a Behringer WING over UDP and mirrors the values the layout uses.
@MainActor
@Observable
final class WingClient {
    enum Status: Equatable {
        case disconnected
        case connecting      // socket open, no reply from the console yet
        case online
        case failed(String)

        var title: String {
            switch self {
            case .disconnected: return "Offline"
            case .connecting: return "Connecting…"
            case .online: return "Connected"
            case .failed: return "Error"
            }
        }
    }

    private(set) var status: Status = .disconnected
    /// "<name> (<model>, fw <version>)" from the discovery reply, when the console answers it.
    private(set) var consoleDescription: String?

    /// Real values by OSC address (dB, pan units, 0/1). Shared by every control bound to the address.
    private(set) var values: [String: Float] = [:]
    /// Strip names by name address, e.g. "/ch/1/name" → "Kick".
    private(set) var names: [String: String] = [:]

    var host: String = UserDefaults.standard.string(forKey: "wing.host") ?? "" {
        didSet { UserDefaults.standard.set(host, forKey: "wing.host") }
    }

    @ObservationIgnored private var connection: NWConnection?
    @ObservationIgnored private var discovery: NWConnection?
    @ObservationIgnored private var renewTask: Task<Void, Never>?
    @ObservationIgnored private let queue = DispatchQueue(label: "wing.osc")
    @ObservationIgnored private var pendingQueries: [String] = []

    // MARK: Connection

    func connect(querying addresses: [String] = []) {
        disconnect()
        let trimmed = host.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty, let port = NWEndpoint.Port(rawValue: WingProtocol.oscPort) else { return }

        status = .connecting
        pendingQueries = addresses

        let conn = NWConnection(host: NWEndpoint.Host(trimmed), port: port, using: .udp)
        conn.stateUpdateHandler = { [weak self] state in
            Task { @MainActor in self?.connectionStateChanged(state) }
        }
        connection = conn
        conn.start(queue: queue)
        receive(on: conn) { [weak self] data in
            self?.handle(OSCPacket.decode(data))
        }

        identifyConsole(at: trimmed)
    }

    func disconnect() {
        renewTask?.cancel()
        renewTask = nil
        connection?.cancel()
        connection = nil
        discovery?.cancel()
        discovery = nil
        status = .disconnected
    }

    private func connectionStateChanged(_ state: NWConnection.State) {
        switch state {
        case .ready:
            send(WingProtocol.subscribe)
            query(pendingQueries)
            startRenewingSubscription()
        case .failed(let error):
            status = .failed(error.localizedDescription)
        case .waiting(let error):
            status = .failed(error.localizedDescription)
        default:
            break
        }
    }

    /// WING drops an OSC subscription after 10 s, so renew it on a timer.
    private func startRenewingSubscription() {
        renewTask?.cancel()
        renewTask = Task { [weak self] in
            while !Task.isCancelled {
                try? await Task.sleep(for: .seconds(WingProtocol.subscriptionRenewal))
                guard !Task.isCancelled else { return }
                self?.send(WingProtocol.subscribe)
            }
        }
    }

    /// Unicast "WING?" to the discovery port to confirm the console and read its name.
    private func identifyConsole(at host: String) {
        guard let port = NWEndpoint.Port(rawValue: WingProtocol.discoveryPort) else { return }
        let conn = NWConnection(host: NWEndpoint.Host(host), port: port, using: .udp)
        discovery = conn
        conn.start(queue: queue)
        receive(on: conn) { [weak self] data in
            self?.handleDiscoveryReply(data)
        }
        conn.send(content: WingProtocol.discoveryRequest, completion: .idempotent)
    }

    private nonisolated func receive(on conn: NWConnection, handler: @escaping @MainActor (Data) -> Void) {
        conn.receiveMessage { [weak self] data, _, _, error in
            if let data, !data.isEmpty {
                Task { @MainActor in handler(data) }
            }
            if error == nil, self != nil {
                self?.receive(on: conn, handler: handler)
            }
        }
    }

    private func handleDiscoveryReply(_ data: Data) {
        // "WING,<ip>,<name>,<model>,<serial>,<firmware>"
        let fields = String(decoding: data, as: UTF8.self)
            .trimmingCharacters(in: .controlCharacters)
            .split(separator: ",", omittingEmptySubsequences: false)
            .map(String.init)
        guard fields.first == "WING", fields.count >= 6 else { return }
        consoleDescription = "\(fields[2]) (\(fields[3]), fw \(fields[5]))"
        status = .online
        discovery?.cancel()
        discovery = nil
    }

    // MARK: Sending

    func send(_ message: OSCMessage) {
        connection?.send(content: message.encoded(), completion: .idempotent)
    }

    /// Asks the console for the current value of each address.
    func query(_ addresses: [String]) {
        for address in addresses {
            send(OSCMessage(address))
        }
    }

    func value(for address: String, spec: ParameterSpec) -> Float {
        values[address] ?? spec.defaultValue
    }

    /// Sets a parameter locally and on the console.
    func set(_ address: String, to value: Float, spec: ParameterSpec) {
        let clamped = value.clamped(to: spec.range)
        values[address] = clamped
        send(OSCMessage(address, [spec.argument(for: clamped)]))
    }

    // MARK: Receiving

    private func handle(_ messages: [OSCMessage]) {
        guard !messages.isEmpty else { return }
        if status != .online { status = .online }

        for message in messages {
            let args = message.arguments
            if message.address.hasSuffix("/name") {
                if let name = args.first?.stringValue { names[message.address] = name }
                continue
            }
            // ",sff"/",sfi": text, normalized, real value. Otherwise take the single value given.
            let real: Float?
            if args.count >= 3 {
                real = args[2].floatValue
            } else if args.count == 1 {
                real = args[0].floatValue
            } else {
                real = nil
            }
            if let real {
                values[message.address] = real
            }
        }
    }
}
