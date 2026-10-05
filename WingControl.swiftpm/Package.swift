// swift-tools-version: 5.9

// Swift Playgrounds / Xcode app package.
// Open this folder in Xcode (File > Open) or in Swift Playgrounds on iPad/Mac.

import PackageDescription
import AppleProductTypes

let package = Package(
    name: "WING Control",
    platforms: [
        .iOS("17.0")
    ],
    products: [
        .iOSApplication(
            name: "WING Control",
            targets: ["AppModule"],
            bundleIdentifier: "com.example.wingcontrol",
            teamIdentifier: "",
            displayVersion: "1.0",
            bundleVersion: "1",
            appIcon: .placeholder(icon: .leaf),
            accentColor: .presetColor(.orange),
            supportedDeviceFamilies: [
                .pad,
                .phone
            ],
            supportedInterfaceOrientations: [
                .portrait,
                .landscapeRight,
                .landscapeLeft,
                .portraitUpsideDown(.when(deviceFamilies: [.pad]))
            ],
            capabilities: [
                .localNetwork(purposeString: "WING Control talks to your Behringer WING mixer over the local network using OSC.")
            ]
        )
    ],
    targets: [
        .executableTarget(
            name: "AppModule",
            path: "."
        )
    ]
)
