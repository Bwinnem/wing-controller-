import SwiftUI

struct ConnectionView: View {
    @Environment(WingClient.self) private var client
    @Environment(LayoutStore.self) private var layout
    @Environment(\.dismiss) private var dismiss

    @State private var host = ""
    @State private var confirmReset = false

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    TextField("192.168.1.62", text: $host)
                        .keyboardType(.decimalPad)
                        .textInputAutocapitalization(.never)
                        .autocorrectionDisabled()
                        .font(.body.monospaced())
                    LabeledContent("OSC port", value: "\(WingProtocol.oscPort) (UDP)")
                } header: {
                    Text("WING IP address")
                } footer: {
                    Text("Find it on the WING under Setup › Network. The iPhone or iPad must be on the same network as the console.")
                }

                Section("Status") {
                    LabeledContent("State", value: client.status.title)
                    if let description = client.consoleDescription {
                        LabeledContent("Console", value: description)
                    }
                    if case .failed(let message) = client.status {
                        Text(message).foregroundStyle(.red).font(.footnote)
                    }
                }

                Section {
                    if client.status == .disconnected {
                        Button("Connect") { connect() }
                            .disabled(host.trimmingCharacters(in: .whitespaces).isEmpty)
                    } else {
                        Button("Reconnect") { connect() }
                        Button("Disconnect", role: .destructive) { client.disconnect() }
                    }
                }

                Section {
                    Button("Reset surface to starter layout", role: .destructive) { confirmReset = true }
                }
            }
            .navigationTitle("Console")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") { dismiss() }
                }
            }
            .confirmationDialog("Replace every control on the surface?", isPresented: $confirmReset, titleVisibility: .visible) {
                Button("Reset layout", role: .destructive) { layout.resetToStarter() }
            }
            .onAppear { host = client.host }
        }
    }

    private func connect() {
        client.host = host.trimmingCharacters(in: .whitespaces)
        client.connect(querying: layout.addressesToQuery)
    }
}
