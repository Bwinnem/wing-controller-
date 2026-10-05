import Foundation

// Behringer WING OSC protocol, as documented in Patrick-Gilles Maillot's
// "WING Remote Protocols" (FW 3.x):
//   - OSC over UDP, console listens on port 2223.
//   - Discovery: send the 5 bytes "WING?" to UDP port 2222; the reply is
//     "WING,<ip>,<name>,<model>,<serial>,<firmware>".
//   - Query a value: send the bare address, e.g. "/ch/1/fdr".
//     Reply type tags are ",sff" / ",sfi" (text, normalized 0..1, real value) or ",s".
//   - Set a value: send the real value (dB, pan units, 0/1), not the normalized one.
//     An int of -1 toggles an on/off parameter.
//   - Subscribe to changes: send "/*S" at least every 10 seconds.

enum WingProtocol {
    static let oscPort: UInt16 = 2223
    static let discoveryPort: UInt16 = 2222
    static let discoveryRequest = Data("WING?".utf8)
    static let subscribe = OSCMessage("/*S")
    static let subscriptionRenewal: TimeInterval = 8
}

/// The kinds of strips on a WING that the palette offers.
enum StripType: String, Codable, CaseIterable, Identifiable {
    case channel = "ch"
    case aux
    case bus
    case main
    case matrix = "mtx"
    case dca
    case muteGroup = "mgrp"

    var id: String { rawValue }

    var count: Int {
        switch self {
        case .channel: return 40
        case .aux: return 8
        case .bus: return 16
        case .main: return 4
        case .matrix: return 8
        case .dca: return 16
        case .muteGroup: return 8
        }
    }

    var title: String {
        switch self {
        case .channel: return "Channels"
        case .aux: return "Aux In"
        case .bus: return "Buses"
        case .main: return "Mains"
        case .matrix: return "Matrix"
        case .dca: return "DCA"
        case .muteGroup: return "Mute Groups"
        }
    }

    var shortName: String {
        switch self {
        case .channel: return "Ch"
        case .aux: return "Aux"
        case .bus: return "Bus"
        case .main: return "Main"
        case .matrix: return "Mtx"
        case .dca: return "DCA"
        case .muteGroup: return "MGrp"
        }
    }

    /// The parameters each strip type exposes, in palette order.
    var parameters: [WingParameter] {
        switch self {
        case .channel, .aux:
            return [.fader, .mute, .solo, .pan, .trim, .eqOn, .dynOn, .gateOn, .mainOn, .mainLevel]
        case .bus:
            return [.fader, .mute, .solo, .pan, .eqOn, .dynOn, .mainOn, .mainLevel]
        case .main, .matrix:
            return [.fader, .mute, .solo, .pan, .eqOn, .dynOn]
        case .dca:
            return [.fader, .mute, .solo]
        case .muteGroup:
            return [.mute]
        }
    }

    /// Channels and aux inputs can send to the 16 buses.
    var hasBusSends: Bool { self == .channel || self == .aux }
}

enum WingParameter: String, Codable, CaseIterable {
    case fader, mute, solo, pan, trim, eqOn, dynOn, gateOn, mainOn, mainLevel, sendLevel, sendOn

    var title: String {
        switch self {
        case .fader: return "Fader"
        case .mute: return "Mute"
        case .solo: return "Solo"
        case .pan: return "Pan"
        case .trim: return "Trim"
        case .eqOn: return "EQ"
        case .dynOn: return "Dyn"
        case .gateOn: return "Gate"
        case .mainOn: return "To Main"
        case .mainLevel: return "Main Lvl"
        case .sendLevel: return "Send"
        case .sendOn: return "Send On"
        }
    }

    var spec: ParameterSpec {
        switch self {
        case .fader, .mainLevel, .sendLevel:
            return .faderDB
        case .pan:
            return ParameterSpec(scale: .linear, min: -100, max: 100, defaultValue: 0, unit: "pan")
        case .trim:
            return ParameterSpec(scale: .linear, min: -18, max: 18, defaultValue: 0, unit: "dB")
        case .mute, .solo, .eqOn, .dynOn, .gateOn, .mainOn, .sendOn:
            return .toggle
        }
    }

    /// The widgets offered in the palette for this parameter; the first is the default.
    var widgets: [WidgetKind] {
        switch spec.scale {
        case .faderDB: return self == .fader ? [.fader, .knob] : [.knob, .fader]
        case .linear: return [.knob, .fader]
        case .toggle: return [.button]
        }
    }

    var defaultColor: ControlColor {
        switch self {
        case .mute: return .red
        case .solo: return .yellow
        case .eqOn, .dynOn, .gateOn: return .green
        case .mainOn, .sendOn, .sendLevel, .mainLevel: return .blue
        case .pan, .trim: return .purple
        case .fader: return .orange
        }
    }
}

/// One WING parameter on one strip, e.g. channel 3 mute or channel 1 send to bus 5.
struct WingBinding: Hashable {
    var strip: StripType
    var index: Int
    var parameter: WingParameter
    var bus: Int? = nil

    private var base: String { "/\(strip.rawValue)/\(index)" }

    var address: String {
        switch parameter {
        case .fader: return "\(base)/fdr"
        case .mute: return "\(base)/mute"
        case .solo: return "\(base)/$solo"
        case .pan: return "\(base)/pan"
        case .trim: return "\(base)/in/set/trim"
        case .eqOn: return "\(base)/eq/on"
        case .dynOn: return "\(base)/dyn/on"
        case .gateOn: return "\(base)/gate/on"
        case .mainOn: return "\(base)/main/1/on"
        case .mainLevel: return "\(base)/main/1/lvl"
        case .sendLevel: return "\(base)/send/\(bus ?? 1)/lvl"
        case .sendOn: return "\(base)/send/\(bus ?? 1)/on"
        }
    }

    var nameAddress: String { "\(base)/name" }

    var label: String {
        let strip = "\(self.strip.shortName) \(index)"
        switch parameter {
        case .sendLevel: return "\(strip) → Bus \(bus ?? 1)"
        case .sendOn: return "\(strip) → Bus \(bus ?? 1) On"
        default: return "\(strip) \(parameter.title)"
        }
    }

    func paletteItem(widget: WidgetKind? = nil) -> PaletteItem {
        PaletteItem(
            widget: widget ?? parameter.widgets[0],
            label: label,
            address: address,
            spec: parameter.spec,
            nameAddress: nameAddress,
            color: parameter.defaultColor
        )
    }
}

// MARK: - Value scales

struct ParameterSpec: Codable, Hashable {
    enum Scale: String, Codable { case faderDB, linear, toggle }

    var scale: Scale
    var min: Float
    var max: Float
    var defaultValue: Float
    var unit: String

    static let faderDB = ParameterSpec(scale: .faderDB, min: -144, max: 10, defaultValue: 0, unit: "dB")
    static let toggle = ParameterSpec(scale: .toggle, min: 0, max: 1, defaultValue: 0, unit: "")

    /// The valid value range, safe even if min and max were entered the wrong way round.
    var range: ClosedRange<Float> { Swift.min(min, max)...Swift.max(min, max) }

    /// Maps a real value to a 0...1 control position.
    func position(for value: Float) -> Double {
        switch scale {
        case .faderDB: return FaderLaw.position(forDB: value)
        case .linear:
            guard max != min else { return 0 }
            return Double((value - min) / (max - min)).clamped(to: 0...1)
        case .toggle: return value > 0.5 ? 1 : 0
        }
    }

    /// Maps a 0...1 control position to a real value to send.
    func value(for position: Double) -> Float {
        let p = position.clamped(to: 0...1)
        switch scale {
        case .faderDB: return FaderLaw.db(forPosition: p)
        case .linear: return min + Float(p) * (max - min)
        case .toggle: return p > 0.5 ? 1 : 0
        }
    }

    func display(_ value: Float) -> String {
        switch scale {
        case .faderDB:
            return value <= -144 ? "-∞" : String(format: "%+.1f", value)
        case .toggle:
            return value > 0.5 ? "On" : "Off"
        case .linear where unit == "pan":
            let v = Int(value.rounded())
            return v == 0 ? "C" : (v < 0 ? "L\(-v)" : "R\(v)")
        case .linear:
            return String(format: "%.1f", value) + (unit.isEmpty ? "" : " \(unit)")
        }
    }

    /// The OSC argument WING expects for this value.
    func argument(for value: Float) -> OSCArgument {
        scale == .toggle ? .int(value > 0.5 ? 1 : 0) : .float(value)
    }
}

/// Fader travel to dB, using the 4-segment law Behringer consoles use:
/// top half is -10...+10 dB, then -30, -60 and -90 dB break points, bottom is -∞ (-144 dB).
enum FaderLaw {
    static func db(forPosition p: Double) -> Float {
        let db: Double
        switch p {
        case ...0: return -144
        case ..<0.0625: db = p * 480 - 90
        case ..<0.25: db = p * 160 - 70
        case ..<0.5: db = p * 80 - 50
        default: db = p * 40 - 30
        }
        return Float((db * 10).rounded() / 10)
    }

    static func position(forDB value: Float) -> Double {
        let db = Double(value)
        switch db {
        case ...(-90): return 0
        case ..<(-60): return (db + 90) / 480
        case ..<(-30): return (db + 70) / 160
        case ..<(-10): return (db + 50) / 80
        default: return ((db + 30) / 40).clamped(to: 0...1)
        }
    }
}

extension Comparable {
    func clamped(to range: ClosedRange<Self>) -> Self {
        Swift.min(Swift.max(self, range.lowerBound), range.upperBound)
    }
}
