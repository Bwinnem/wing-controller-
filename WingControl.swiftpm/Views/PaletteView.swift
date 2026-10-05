import SwiftUI

/// The menu of ready-made WING controls. Drag a tile onto the surface, or tap it
/// to drop it in the middle.
struct PaletteView: View {
    let onAdd: (PaletteItem) -> Void

    @State private var strip: StripType = .channel
    @State private var index = 1
    @State private var showSends = false

    private let columns = [GridItem(.adaptive(minimum: 76), spacing: 8)]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 14) {
                stripPicker
                indexPicker

                section(title: "\(strip.shortName) \(index)") {
                    ForEach(strip.parameters, id: \.self) { parameter in
                        ForEach(parameter.widgets, id: \.self) { widget in
                            tile(WingBinding(strip: strip, index: index, parameter: parameter).paletteItem(widget: widget),
                                 title: parameter.title)
                        }
                    }
                }

                if strip.hasBusSends {
                    DisclosureGroup("Sends to buses", isExpanded: $showSends) {
                        LazyVGrid(columns: columns, spacing: 8) {
                            ForEach(1...16, id: \.self) { bus in
                                tile(WingBinding(strip: strip, index: index, parameter: .sendLevel, bus: bus).paletteItem(),
                                     title: "Bus \(bus)")
                                tile(WingBinding(strip: strip, index: index, parameter: .sendOn, bus: bus).paletteItem(),
                                     title: "Bus \(bus) On")
                            }
                        }
                        .padding(.top, 8)
                    }
                    .font(.subheadline.weight(.semibold))
                }

                section(title: "Custom OSC") {
                    ForEach(WidgetKind.allCases, id: \.self) { widget in
                        tile(customItem(widget), title: "Custom")
                    }
                }

                Text("Drag a control onto the surface, or tap to add it. Tap a placed control to rename it or change its OSC address.")
                    .font(.footnote)
                    .foregroundStyle(.secondary)
            }
            .padding()
        }
        .background(Color(white: 0.12))
        .onChange(of: strip) { _, newStrip in
            index = min(index, newStrip.count)
        }
    }

    private var stripPicker: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 6) {
                ForEach(StripType.allCases) { type in
                    Button(type.title) { strip = type }
                        .buttonStyle(.bordered)
                        .tint(type == strip ? Color.accentColor : Color.gray)
                        .controlSize(.small)
                }
            }
        }
    }

    private var indexPicker: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 4) {
                ForEach(1...strip.count, id: \.self) { n in
                    Button("\(n)") { index = n }
                        .font(.caption.monospacedDigit().weight(.semibold))
                        .frame(width: 32, height: 28)
                        .background(RoundedRectangle(cornerRadius: 6).fill(n == index ? Color.accentColor : Color.white.opacity(0.08)))
                        .foregroundStyle(n == index ? Color.black : Color.white)
                        .buttonStyle(.plain)
                }
            }
        }
    }

    private func section<Content: View>(title: String, @ViewBuilder content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title).font(.subheadline.weight(.semibold))
            LazyVGrid(columns: columns, spacing: 8) { content() }
        }
    }

    private func tile(_ item: PaletteItem, title: String) -> some View {
        PaletteTile(item: item, title: title)
            .onTapGesture { onAdd(item) }
            .draggable(item) {
                PaletteTile(item: item, title: title)
                    .frame(width: 80)
            }
    }

    private func customItem(_ widget: WidgetKind) -> PaletteItem {
        let spec: ParameterSpec
        switch widget {
        case .fader: spec = .faderDB
        case .knob: spec = ParameterSpec(scale: .linear, min: 0, max: 1, defaultValue: 0, unit: "")
        case .button: spec = .toggle
        }
        return PaletteItem(widget: widget, label: "Custom \(widget.title)", address: "/ch/1/fdr",
                           spec: spec, nameAddress: nil, color: .gray)
    }
}

private struct PaletteTile: View {
    let item: PaletteItem
    let title: String

    var body: some View {
        VStack(spacing: 4) {
            Image(systemName: item.widget.symbol)
                .font(.title2)
                .foregroundStyle(item.color.color)
            Text(title)
                .font(.caption2.weight(.semibold))
                .lineLimit(1)
                .minimumScaleFactor(0.7)
            Text(item.widget.title)
                .font(.system(size: 9))
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, minHeight: 68)
        .background(RoundedRectangle(cornerRadius: 8).fill(Color.white.opacity(0.07)))
        .contentShape(RoundedRectangle(cornerRadius: 8))
    }
}
