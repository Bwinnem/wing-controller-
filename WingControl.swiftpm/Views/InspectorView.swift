import SwiftUI

/// Edits one placed control: label, OSC address, value range, colour and size.
struct InspectorView: View {
    @Environment(LayoutStore.self) private var layout
    @Environment(WingClient.self) private var client
    @Environment(\.dismiss) private var dismiss

    let controlID: PlacedControl.ID

    var body: some View {
        NavigationStack {
            if let index = layout.controls.firstIndex(where: { $0.id == controlID }) {
                form(for: index)
            } else {
                ContentUnavailableView("Control removed", systemImage: "trash")
            }
        }
    }

    private func form(for index: Int) -> some View {
        @Bindable var layout = layout
        let control = layout.controls[index]

        return Form {
            Section("Label") {
                TextField("Label", text: $layout.controls[index].label)
            }

            Section {
                TextField("/ch/1/fdr", text: $layout.controls[index].address)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
                    .font(.body.monospaced())
                Picker("Value type", selection: $layout.controls[index].spec.scale) {
                    Text("Fader dB (-∞…+10)").tag(ParameterSpec.Scale.faderDB)
                    Text("Linear range").tag(ParameterSpec.Scale.linear)
                    Text("On / Off").tag(ParameterSpec.Scale.toggle)
                }
                if control.spec.scale == .linear {
                    LabeledContent("Minimum") {
                        TextField("Min", value: $layout.controls[index].spec.min, format: .number)
                            .keyboardType(.numbersAndPunctuation)
                            .multilineTextAlignment(.trailing)
                    }
                    LabeledContent("Maximum") {
                        TextField("Max", value: $layout.controls[index].spec.max, format: .number)
                            .keyboardType(.numbersAndPunctuation)
                            .multilineTextAlignment(.trailing)
                    }
                }
            } header: {
                Text("WING OSC address")
            } footer: {
                Text("Values are sent to the console as real values (dB, pan -100…100, 0/1) on UDP port 2223.")
            }

            Section("Look") {
                Picker("Widget", selection: $layout.controls[index].widget) {
                    ForEach(WidgetKind.allCases, id: \.self) { Text($0.title).tag($0) }
                }
                Picker("Colour", selection: $layout.controls[index].color) {
                    ForEach(ControlColor.allCases, id: \.self) { color in
                        Label(color.rawValue.capitalized, systemImage: "circle.fill")
                            .foregroundStyle(color.color)
                            .tag(color)
                    }
                }
                LabeledContent("Size") {
                    Slider(value: $layout.controls[index].scale, in: 0.6...1.6)
                }
            }

            Section {
                Button("Read value from console") {
                    client.query([control.address] + (control.nameAddress.map { [$0] } ?? []))
                }
                Button("Duplicate") {
                    layout.duplicate(controlID)
                    dismiss()
                }
                Button("Delete", role: .destructive) {
                    let id = controlID
                    let store = layout
                    dismiss()
                    // Remove after the sheet has gone so the form never binds to a missing row.
                    Task { @MainActor in
                        try? await Task.sleep(for: .milliseconds(400))
                        store.remove(id)
                    }
                }
            }
        }
        .navigationTitle(control.label)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .confirmationAction) {
                Button("Done") { dismiss() }
            }
        }
    }
}
