import SwiftUI

/// The control surface. In edit mode it accepts drops from the palette and lets
/// controls be moved, inspected and deleted; otherwise the controls are live.
struct CanvasView: View {
    @Environment(WingClient.self) private var client
    @Environment(LayoutStore.self) private var layout

    let isEditing: Bool
    @Binding var inspected: ControlRef?

    @State private var isDropTargeted = false

    var body: some View {
        GeometryReader { geo in
            ZStack {
                background(size: geo.size)

                ForEach(layout.controls) { control in
                    PlacedControlView(control: control, canvasSize: geo.size, isEditing: isEditing) {
                        inspected = ControlRef(id: control.id)
                    }
                }

                if layout.controls.isEmpty {
                    ContentUnavailableView(
                        "Empty surface",
                        systemImage: "slider.horizontal.3",
                        description: Text("Tap Edit, then drag faders, knobs and buttons from the palette.")
                    )
                }
            }
            .frame(width: geo.size.width, height: geo.size.height)
            .contentShape(Rectangle())
            .dropDestination(for: PaletteItem.self) { items, location in
                guard isEditing else { return false }
                for (offset, item) in items.enumerated() {
                    let point = CGPoint(x: (location.x + CGFloat(offset) * 24) / geo.size.width,
                                        y: location.y / geo.size.height)
                    layout.add(item, at: point)
                    client.query([item.address] + (item.nameAddress.map { [$0] } ?? []))
                }
                return true
            } isTargeted: { targeted in
                isDropTargeted = targeted
            }
        }
        .coordinateSpace(name: "canvas")
    }

    private func background(size: CGSize) -> some View {
        Canvas { context, size in
            guard isEditing else { return }
            let step: CGFloat = 24
            var path = Path()
            for x in stride(from: 0, through: size.width, by: step) {
                path.move(to: CGPoint(x: x, y: 0))
                path.addLine(to: CGPoint(x: x, y: size.height))
            }
            for y in stride(from: 0, through: size.height, by: step) {
                path.move(to: CGPoint(x: 0, y: y))
                path.addLine(to: CGPoint(x: size.width, y: y))
            }
            context.stroke(path, with: .color(.white.opacity(0.05)), lineWidth: 1)
        }
        .background(Color(white: 0.08))
        .overlay {
            if isDropTargeted {
                RoundedRectangle(cornerRadius: 12)
                    .strokeBorder(Color.accentColor, style: StrokeStyle(lineWidth: 3, dash: [10, 6]))
                    .padding(4)
            }
        }
    }
}

/// One control on the canvas, with the edit-mode chrome around it.
private struct PlacedControlView: View {
    @Environment(WingClient.self) private var client
    @Environment(LayoutStore.self) private var layout

    let control: PlacedControl
    let canvasSize: CGSize
    let isEditing: Bool
    let onInspect: () -> Void

    @State private var dragStart: CGPoint?

    var body: some View {
        ZStack {
            ControlWidget(control: control)
                .allowsHitTesting(!isEditing)

            if isEditing {
                RoundedRectangle(cornerRadius: 10)
                    .strokeBorder(control.color.color.opacity(0.8), style: StrokeStyle(lineWidth: 1.5, dash: [5, 4]))
                    .contentShape(Rectangle())
                    .onTapGesture(perform: onInspect)
                    .gesture(moveGesture)
                    .overlay(alignment: .topTrailing) {
                        Button {
                            layout.remove(control.id)
                        } label: {
                            Image(systemName: "xmark.circle.fill")
                                .font(.title3)
                                .symbolRenderingMode(.palette)
                                .foregroundStyle(.white, .red)
                        }
                        .offset(x: 10, y: -10)
                    }
            }
        }
        .frame(width: control.size.width, height: control.size.height)
        .position(x: control.center.x * canvasSize.width, y: control.center.y * canvasSize.height)
    }

    private var moveGesture: some Gesture {
        DragGesture(minimumDistance: 2, coordinateSpace: .named("canvas"))
            .onChanged { value in
                let start = dragStart ?? control.center
                if dragStart == nil { dragStart = start }
                layout.move(control.id, to: CGPoint(
                    x: start.x + value.translation.width / canvasSize.width,
                    y: start.y + value.translation.height / canvasSize.height
                ))
            }
            .onEnded { _ in dragStart = nil }
    }
}

/// Picks the widget view for a control and binds it to the client's value.
struct ControlWidget: View {
    @Environment(WingClient.self) private var client
    let control: PlacedControl

    var body: some View {
        let value = client.value(for: control.address, spec: control.spec)
        let stripName = control.nameAddress.flatMap { client.names[$0] }.flatMap { $0.isEmpty ? nil : $0 }
        let set: (Float) -> Void = { client.set(control.address, to: $0, spec: control.spec) }

        switch control.widget {
        case .fader:
            FaderView(label: control.label, subtitle: stripName, value: value, spec: control.spec,
                      tint: control.color.color, scale: control.scale, onChange: set)
        case .knob:
            KnobView(label: control.label, subtitle: stripName, value: value, spec: control.spec,
                     tint: control.color.color, scale: control.scale, onChange: set)
        case .button:
            ToggleButtonView(label: control.label, subtitle: stripName, value: value, spec: control.spec,
                             tint: control.color.color, scale: control.scale, onChange: set)
        }
    }
}
