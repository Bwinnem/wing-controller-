import SwiftUI

// The three widget types. Each shows the console's value, but while a finger is on
// it the widget shows its own drag value, so echoes from the console don't make it jump.

struct FaderView: View {
    let label: String
    let subtitle: String?
    let value: Float
    let spec: ParameterSpec
    let tint: Color
    let scale: Double
    let onChange: (Float) -> Void

    @State private var dragPosition: Double?
    @State private var startPosition: Double = 0

    var body: some View {
        let position = dragPosition ?? spec.position(for: value)
        let shown = dragPosition.map(spec.value(for:)) ?? value

        VStack(spacing: 6 * scale) {
            Text(spec.display(shown))
                .font(.system(size: 12 * scale, weight: .semibold, design: .monospaced))
                .foregroundStyle(.secondary)

            GeometryReader { geo in
                let thumbHeight: CGFloat = 34 * scale
                let travel: CGFloat = max(geo.size.height - thumbHeight, 1)
                ZStack(alignment: .top) {
                    Capsule()
                        .fill(Color.white.opacity(0.12))
                        .frame(width: 6 * scale)
                    Capsule()
                        .fill(tint.opacity(0.6))
                        .frame(width: 6 * scale, height: geo.size.height * position)
                        .frame(maxHeight: .infinity, alignment: .bottom)
                    // 0 dB / centre mark
                    Rectangle()
                        .fill(Color.white.opacity(0.4))
                        .frame(width: 22 * scale, height: 1)
                        .offset(y: thumbHeight / 2 + travel * (1 - spec.position(for: spec.defaultValue)))
                    RoundedRectangle(cornerRadius: 5 * scale)
                        .fill(LinearGradient(colors: [Color(white: 0.85), Color(white: 0.55)], startPoint: .top, endPoint: .bottom))
                        .overlay(Rectangle().fill(tint).frame(height: 2 * scale))
                        .frame(width: 44 * scale, height: thumbHeight)
                        .shadow(radius: 3, y: 2)
                        .offset(y: travel * (1 - position))
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .contentShape(Rectangle())
                .gesture(
                    DragGesture(minimumDistance: 0)
                        .onChanged { drag in
                            if dragPosition == nil { startPosition = spec.position(for: value) }
                            let p = (startPosition - Double(drag.translation.height / travel)).clamped(to: 0...1)
                            dragPosition = p
                            onChange(spec.value(for: p))
                        }
                        .onEnded { _ in dragPosition = nil }
                )
                .simultaneousGesture(TapGesture(count: 2).onEnded { onChange(spec.defaultValue) })
            }

            ControlLabel(label: label, subtitle: subtitle, scale: scale)
        }
        .padding(.vertical, 6 * scale)
        .background(RoundedRectangle(cornerRadius: 10 * scale).fill(Color.white.opacity(0.04)))
    }
}

struct KnobView: View {
    let label: String
    let subtitle: String?
    let value: Float
    let spec: ParameterSpec
    let tint: Color
    let scale: Double
    let onChange: (Float) -> Void

    @State private var dragPosition: Double?
    @State private var startPosition: Double = 0

    private let sweep = 270.0 // degrees of rotation from min to max

    var body: some View {
        let position = dragPosition ?? spec.position(for: value)
        let shown = dragPosition.map(spec.value(for:)) ?? value
        let diameter: CGFloat = 64 * scale
        // Pan-style knobs fill from the centre, level knobs from the minimum.
        let origin = spec.scale == .linear && spec.min < 0 && spec.max > 0 ? spec.position(for: 0) : 0

        VStack(spacing: 4 * scale) {
            ZStack {
                Circle()
                    .trim(from: 0, to: sweep / 360)
                    .stroke(Color.white.opacity(0.12), style: StrokeStyle(lineWidth: 5 * scale, lineCap: .round))
                    .rotationEffect(.degrees(135))
                Circle()
                    .trim(from: min(origin, position) * sweep / 360, to: max(origin, position) * sweep / 360)
                    .stroke(tint, style: StrokeStyle(lineWidth: 5 * scale, lineCap: .round))
                    .rotationEffect(.degrees(135))
                Circle()
                    .fill(LinearGradient(colors: [Color(white: 0.35), Color(white: 0.18)], startPoint: .top, endPoint: .bottom))
                    .padding(9 * scale)
                Capsule()
                    .fill(Color.white)
                    .frame(width: 3 * scale, height: 12 * scale)
                    .offset(y: -diameter / 2 + 17 * scale)
                    .rotationEffect(.degrees(-135 + position * sweep))
                Text(spec.display(shown))
                    .font(.system(size: 10 * scale, weight: .semibold, design: .monospaced))
                    .foregroundStyle(.secondary)
                    .offset(y: diameter / 2 - 2 * scale)
            }
            .frame(width: diameter, height: diameter)
            .contentShape(Circle())
            .gesture(
                DragGesture(minimumDistance: 0)
                    .onChanged { drag in
                        if dragPosition == nil { startPosition = spec.position(for: value) }
                        // Drag up or right to turn clockwise; 200 pt covers the full range.
                        let delta = Double(drag.translation.width - drag.translation.height) / (200 * scale)
                        let p = (startPosition + delta).clamped(to: 0...1)
                        dragPosition = p
                        onChange(spec.value(for: p))
                    }
                    .onEnded { _ in dragPosition = nil }
            )
            .simultaneousGesture(TapGesture(count: 2).onEnded { onChange(spec.defaultValue) })

            ControlLabel(label: label, subtitle: subtitle, scale: scale)
        }
        .padding(6 * scale)
        .background(RoundedRectangle(cornerRadius: 10 * scale).fill(Color.white.opacity(0.04)))
    }
}

struct ToggleButtonView: View {
    let label: String
    let subtitle: String?
    let value: Float
    let spec: ParameterSpec
    let tint: Color
    let scale: Double
    let onChange: (Float) -> Void

    var body: some View {
        let isOn = value > 0.5
        Button {
            onChange(isOn ? 0 : 1)
        } label: {
            VStack(spacing: 2 * scale) {
                Text(label)
                    .font(.system(size: 13 * scale, weight: .bold))
                    .lineLimit(2)
                    .minimumScaleFactor(0.6)
                    .multilineTextAlignment(.center)
                if let subtitle {
                    Text(subtitle)
                        .font(.system(size: 10 * scale))
                        .lineLimit(1)
                        .opacity(0.8)
                }
            }
            .padding(6 * scale)
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .foregroundStyle(isOn ? Color.black : Color.white)
            .background(
                RoundedRectangle(cornerRadius: 10 * scale)
                    .fill(isOn ? tint : Color.white.opacity(0.08))
                    .shadow(color: isOn ? tint.opacity(0.7) : .clear, radius: 8)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 10 * scale)
                    .strokeBorder(tint.opacity(isOn ? 0 : 0.7), lineWidth: 1.5)
            )
        }
        .buttonStyle(.plain)
        .sensoryFeedback(.impact, trigger: isOn)
    }
}

private struct ControlLabel: View {
    let label: String
    let subtitle: String?
    let scale: Double

    var body: some View {
        VStack(spacing: 0) {
            Text(label)
                .font(.system(size: 11 * scale, weight: .semibold))
                .lineLimit(1)
                .minimumScaleFactor(0.6)
            if let subtitle {
                Text(subtitle)
                    .font(.system(size: 10 * scale))
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
            }
        }
        .padding(.horizontal, 4)
    }
}
