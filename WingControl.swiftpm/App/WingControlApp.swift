import SwiftUI

@main
struct WingControlApp: App {
    @State private var client = WingClient()
    @State private var layout = LayoutStore()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(client)
                .environment(layout)
                .preferredColorScheme(.dark)
        }
    }
}
