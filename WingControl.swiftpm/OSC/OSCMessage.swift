import Foundation

/// A single OSC argument.
enum OSCArgument: Equatable {
    case int(Int32)
    case float(Float)
    case string(String)
    case blob(Data)

    var floatValue: Float? {
        switch self {
        case .int(let v): return Float(v)
        case .float(let v): return v
        case .string(let s): return Float(s)
        case .blob: return nil
        }
    }

    var stringValue: String? {
        if case .string(let s) = self { return s }
        return nil
    }

    var typeTag: Character {
        switch self {
        case .int: return "i"
        case .float: return "f"
        case .string: return "s"
        case .blob: return "b"
        }
    }
}

/// An OSC message: an address pattern plus typed arguments.
struct OSCMessage: Equatable {
    var address: String
    var arguments: [OSCArgument]

    init(_ address: String, _ arguments: [OSCArgument] = []) {
        self.address = address
        self.arguments = arguments
    }

    /// Encodes the message as an OSC 1.0 packet.
    /// A message without arguments is sent as a bare address, which is how WING
    /// expects value queries ("/ch/1/fdr") and the subscribe command ("/*S").
    func encoded() -> Data {
        var data = Data()
        data.appendOSCString(address)
        guard !arguments.isEmpty else { return data }

        data.appendOSCString("," + String(arguments.map(\.typeTag)))
        for argument in arguments {
            switch argument {
            case .int(let v):
                data.appendUInt32(UInt32(bitPattern: v))
            case .float(let v):
                data.appendUInt32(v.bitPattern)
            case .string(let s):
                data.appendOSCString(s)
            case .blob(let b):
                data.appendUInt32(UInt32(b.count))
                data.append(b)
                let padding = (4 - b.count % 4) % 4
                data.append(contentsOf: [UInt8](repeating: 0, count: padding))
            }
        }
        return data
    }
}

enum OSCPacket {
    /// Decodes a UDP datagram into messages. Bundles are flattened.
    /// Malformed packets yield an empty array rather than throwing.
    static func decode(_ data: Data) -> [OSCMessage] {
        decode(bytes: [UInt8](data))
    }

    static func decode(bytes: [UInt8]) -> [OSCMessage] {
        var reader = OSCReader(bytes: bytes)
        guard let address = reader.readString() else { return [] }

        if address == "#bundle" {
            guard reader.skip(8) else { return [] } // time tag
            var messages: [OSCMessage] = []
            while let size = reader.readUInt32(), size > 0, let element = reader.readBytes(Int(size)) {
                messages += decode(bytes: element)
            }
            return messages
        }

        guard address.hasPrefix("/") else { return [] }
        guard !reader.isAtEnd else { return [OSCMessage(address)] }
        guard let tags = reader.readString(), tags.first == "," else { return [OSCMessage(address)] }

        var arguments: [OSCArgument] = []
        for tag in tags.dropFirst() {
            switch tag {
            case "i":
                guard let v = reader.readUInt32() else { return [OSCMessage(address, arguments)] }
                arguments.append(.int(Int32(bitPattern: v)))
            case "f":
                guard let v = reader.readUInt32() else { return [OSCMessage(address, arguments)] }
                arguments.append(.float(Float(bitPattern: v)))
            case "s", "S":
                guard let s = reader.readString() else { return [OSCMessage(address, arguments)] }
                arguments.append(.string(s))
            case "b":
                guard let size = reader.readUInt32(), let b = reader.readBytes(Int(size)) else {
                    return [OSCMessage(address, arguments)]
                }
                reader.align()
                arguments.append(.blob(Data(b)))
            case "h", "t":
                guard let hi = reader.readUInt32(), let lo = reader.readUInt32() else {
                    return [OSCMessage(address, arguments)]
                }
                arguments.append(.int(Int32(truncatingIfNeeded: Int64(bitPattern: UInt64(hi) << 32 | UInt64(lo)))))
            case "d":
                guard let hi = reader.readUInt32(), let lo = reader.readUInt32() else {
                    return [OSCMessage(address, arguments)]
                }
                arguments.append(.float(Float(Double(bitPattern: UInt64(hi) << 32 | UInt64(lo)))))
            case "T":
                arguments.append(.int(1))
            case "F":
                arguments.append(.int(0))
            default:
                break // N, I and unknown tags carry no data we use
            }
        }
        return [OSCMessage(address, arguments)]
    }
}

private struct OSCReader {
    let bytes: [UInt8]
    var position = 0

    var isAtEnd: Bool { position >= bytes.count }

    mutating func readString() -> String? {
        guard position < bytes.count,
              let end = bytes[position...].firstIndex(of: 0) else { return nil }
        let string = String(decoding: bytes[position..<end], as: UTF8.self)
        position = (end + 4) & ~3 // skip the terminator and padding to the next 4-byte boundary
        return string
    }

    mutating func readUInt32() -> UInt32? {
        guard position + 4 <= bytes.count else { return nil }
        let value = UInt32(bytes[position]) << 24 | UInt32(bytes[position + 1]) << 16
            | UInt32(bytes[position + 2]) << 8 | UInt32(bytes[position + 3])
        position += 4
        return value
    }

    mutating func readBytes(_ count: Int) -> [UInt8]? {
        guard count >= 0, position + count <= bytes.count else { return nil }
        defer { position += count }
        return Array(bytes[position..<position + count])
    }

    mutating func skip(_ count: Int) -> Bool {
        guard position + count <= bytes.count else { return false }
        position += count
        return true
    }

    mutating func align() {
        position = (position + 3) & ~3
    }
}

extension Data {
    mutating func appendOSCString(_ string: String) {
        var bytes = Array(string.utf8)
        bytes.append(0)
        while bytes.count % 4 != 0 { bytes.append(0) }
        append(contentsOf: bytes)
    }

    mutating func appendUInt32(_ value: UInt32) {
        append(contentsOf: [
            UInt8(truncatingIfNeeded: value >> 24),
            UInt8(truncatingIfNeeded: value >> 16),
            UInt8(truncatingIfNeeded: value >> 8),
            UInt8(truncatingIfNeeded: value),
        ])
    }
}
