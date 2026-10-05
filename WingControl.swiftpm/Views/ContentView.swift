import SwiftUI

struct ContentView: View {
    @Environment(WingClient.self) private var client
    @Environment(LayoutStore.self) private var layout

    @State private var isEditing = false
    @State private var showPalette = true
    @State private var showConnection = false
    @State private var inspected: ControlRef?

    var body: some View {
        NavigationStack {
            HStack(spacing: 0) {
                if isEditing && showPalette {
                    PaletteView { item in
                        layout.add(item, at: CGPoint(x: 0.5, y: 0.5))
                        client.query([item.address] + (item.nameAddress.map { [$0] } ?? []))
                    }
                    .frame(width: 280)
                    .transition(.move(edge: .leading))
                    Divider()
                }
                CanvasView(isEditing: isEditing, inspected: $inspected)
            }
            .animation(.snappy, value: isEditing && showPalette)
            .navigationTitle(client.consoleDescription ?? "WING Control")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar { toolbar }
            .sheet(isPresented: $showConnection) {
                ConnectionView()
            }
            .sheet(item: $inspected) { ref in
                InspectorView(controlID: ref.id)
                    .presentationDetents([.medium, .large])
            }
        }
        .onAppear {
            if !client.host.isEmpty, client.status == .disconnected {
                client.connect(querying: layout.addressesToQuery)
            }
        }
        .onChange(of: client.status) { _, status in
            if status == .online { client.query(layout.addressesToQuery) }
        }
    }

    @ToolbarContentBuilder
    private var toolbar: some ToolbarContent {
        ToolbarItem(placement: .topBarLeading) {
            Button {
                showConnection = true
            } label: {
                Label(client.status.title, systemImage: "circle.fill")
                    .labelStyle(.titleAndIcon)
                    .foregroundStyle(statusColor)
            }
        }
        if isEditing {
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    showPalette.toggle()
                } label: {
                    Label("Palette", systemImage: showPalette ? "sidebar.left" : "plus.rectangle.on.rectangle")
                }
            }
        }
        ToolbarItem(placement: .topBarTrailing) {
            Button(isEditing ? "Done" : "Edit") {
                isEditing.toggle()
                if isEditing { showPalette = true }
            }
            .bold(isEditing)
        }
    }

    private var statusColor: Color {
        switch client.status {
        case .online: return .green
        case .connecting: return .yellow
        case .failed: return .red
        case .disconnected: return .gray
        }
    }
}
