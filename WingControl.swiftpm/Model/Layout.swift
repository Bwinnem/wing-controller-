import SwiftUI
import CoreTransferable

enum WidgetKind: String, Codable, CaseIterable {
    case fader, knob, button

    var title: String { rawValue.capitalized }

    var symbol: String {
        switch self {
        case .fader: return "slider.vertical.3"
        case .knob: return "dial.medium"
        case .button: return "button.programmable"
        }
    }

    /// Base size in points, before the per-control scale.
    var size: CGSize {
        switch self {
        case .fader: return CGSize(width: 76, height: 280)
        case .knob: return CGSize(width: 96, height: 124)
        case .button: return CGSize(width: 88, height: 72)
        }
    }
}

enum ControlColor: String, Codable, CaseIterable {
    case orange, red, yellow, green, blue, purple, gray

    var color: Color {
        switch self {
        case .orange: return .orange
        case .red: return .red
        case .yellow: return .yellow
        case .green: return .green
        case .blue: return .blue
        case .purple: return .purple
        case .gray: return .gray
        }
    }
}

/// A ready-made control in the palette. It is what gets dragged onto the canvas.
struct PaletteItem: Codable, Hashable, Transferable {
    var widget: WidgetKind
    var label: String
    var address: String
    var spec: ParameterSpec
    var nameAddress: String?
    var color: ControlColor

    // Carried as JSON text so no custom UTType has to be declared in Info.plist.
    static var transferRepresentation: some TransferRepresentation {
        ProxyRepresentation(exporting: { item in
            String(decoding: try JSONEncoder().encode(item), as: UTF8.self)
        }, importing: { (text: String) in
            try JSONDecoder().decode(PaletteItem.self, from: Data(text.utf8))
        })
    }
}

/// A control placed on the canvas. `center` is normalized (0...1) to the canvas size
/// so a layout survives rotation and different screen sizes.
struct PlacedControl: Codable, Identifiable, Hashable {
    var id = UUID()
    var widget: WidgetKind
    var label: String
    var address: String
    var spec: ParameterSpec
    var nameAddress: String?
    var color: ControlColor
    var center: CGPoint
    var scale: Double = 1

    init(item: PaletteItem, center: CGPoint) {
        widget = item.widget
        label = item.label
        address = item.address
        spec = item.spec
        nameAddress = item.nameAddress
        color = item.color
        self.center = center
    }

    var size: CGSize {
        CGSize(width: widget.size.width * scale, height: widget.size.height * scale)
    }
}

/// Identifies a placed control for sheets and selection.
struct ControlRef: Identifiable, Hashable {
    let id: UUID
}

@MainActor
@Observable
final class LayoutStore {
    var controls: [PlacedControl] = [] {
        didSet { save() }
    }

    @ObservationIgnored private let fileURL = URL.documentsDirectory.appending(path: "wing-layout.json")

    init() {
        if let data = try? Data(contentsOf: fileURL),
           let saved = try? JSONDecoder().decode([PlacedControl].self, from: data) {
            controls = saved
        } else {
            controls = Self.starterLayout
        }
    }

    /// Every address the layout needs to read from the console, values and names.
    var addressesToQuery: [String] {
        Array(Set(controls.flatMap { [$0.address] + ($0.nameAddress.map { [$0] } ?? []) }))
    }

    @discardableResult
    func add(_ item: PaletteItem, at center: CGPoint) -> PlacedControl {
        let control = PlacedControl(item: item, center: center.clampedToUnit)
        controls.append(control)
        return control
    }

    func move(_ id: PlacedControl.ID, to center: CGPoint) {
        guard let i = controls.firstIndex(where: { $0.id == id }) else { return }
        controls[i].center = center.clampedToUnit
    }

    func remove(_ id: PlacedControl.ID) {
        controls.removeAll { $0.id == id }
    }

    func duplicate(_ id: PlacedControl.ID) {
        guard var copy = controls.first(where: { $0.id == id }) else { return }
        copy.id = UUID()
        copy.center = CGPoint(x: copy.center.x + 0.05, y: copy.center.y + 0.05).clampedToUnit
        controls.append(copy)
    }

    func resetToStarter() {
        controls = Self.starterLayout
    }

    private func save() {
        guard let data = try? JSONEncoder().encode(controls) else { return }
        try? data.write(to: fileURL, options: .atomic)
    }

    /// First-launch layout: channels 1-4 with mute buttons, plus Main 1.
    static var starterLayout: [PlacedControl] {
        var result: [PlacedControl] = []
        for ch in 1...4 {
            let x = 0.12 + Double(ch - 1) * 0.16
            result.append(PlacedControl(item: WingBinding(strip: .channel, index: ch, parameter: .fader).paletteItem(),
                                        center: CGPoint(x: x, y: 0.55)))
            result.append(PlacedControl(item: WingBinding(strip: .channel, index: ch, parameter: .mute).paletteItem(),
                                        center: CGPoint(x: x, y: 0.12)))
        }
        result.append(PlacedControl(item: WingBinding(strip: .main, index: 1, parameter: .fader).paletteItem(),
                                    center: CGPoint(x: 0.88, y: 0.55)))
        result.append(PlacedControl(item: WingBinding(strip: .main, index: 1, parameter: .mute).paletteItem(),
                                    center: CGPoint(x: 0.88, y: 0.12)))
        return result
    }
}

extension CGPoint {
    var clampedToUnit: CGPoint {
        CGPoint(x: x.clamped(to: 0...1), y: y.clamped(to: 0...1))
    }
}
