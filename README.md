# WING Control

A simple iOS / iPadOS OSC controller for the Behringer WING. Drag ready-made faders, knobs and buttons from a palette onto the screen; each one is already bound to a WING parameter.

## Open and run

1. Copy the `WingControl.swiftpm` folder to a Mac with **Xcode 15 or newer** (or to an iPad with **Swift Playgrounds 4.4+**).
2. Open the folder in Xcode (File › Open, pick `WingControl.swiftpm`).
3. In the target's Signing & Capabilities, pick your team (or set `teamIdentifier` in `Package.swift`) and change the bundle id `com.example.wingcontrol` to your own.
4. Run on an iPhone or iPad on the same network as the WING. Accept the Local Network prompt on first launch.
5. Tap the status button (top left), enter the WING's IP address (Setup › Network on the console), tap Connect.

Requires iOS 17.

## Using it

- **Edit** shows the palette. Pick a strip type (Channels, Aux In, Buses, Mains, Matrix, DCA, Mute Groups) and a number, then drag a tile onto the surface, or tap it to drop it in the middle.
- In edit mode, drag a control to move it, tap it to change label, OSC address, value type, colour or size, or tap the red ✕ to remove it.
- **Done** makes the surface live. Faders and knobs move relative to your finger (no jump); double-tap resets to 0 dB / centre. Buttons toggle.
- The layout is saved automatically on the device.

## WING OSC used

| Item | Value |
|---|---|
| Transport | OSC over UDP, console port **2223** |
| Discovery / identify | `WING?` to UDP 2222, reply `WING,<ip>,<name>,<model>,<serial>,<fw>` |
| Read a value | send the bare address, e.g. `/ch/1/fdr`; reply `,sff` = text, normalized 0..1, real value |
| Live updates | send `/*S` every 8 s (WING drops the subscription after 10 s) |
| Set a value | real values: dB floats for faders/sends, -100..100 for pan, int 0/1 for on/off |

Palette addresses (`N` = strip number, `B` = bus 1-16):

| Control | Address | Range |
|---|---|---|
| Fader | `/ch/N/fdr` (also `aux`, `bus`, `main`, `mtx`, `dca`) | -144 (-∞) … +10 dB |
| Mute | `/ch/N/mute`, `/mgrp/N/mute` | 0/1 |
| Solo | `/ch/N/$solo` | 0/1 |
| Pan | `/ch/N/pan` | -100 … 100 |
| Trim | `/ch/N/in/set/trim` | -18 … +18 dB |
| EQ / Dyn / Gate on | `/ch/N/eq/on`, `/ch/N/dyn/on`, `/ch/N/gate/on` | 0/1 |
| Send to Main 1 | `/ch/N/main/1/on`, `/ch/N/main/1/lvl` | 0/1, dB |
| Send to bus | `/ch/N/send/B/on`, `/ch/N/send/B/lvl` | 0/1, dB |
| Strip name (shown under controls) | `/ch/N/name` | text |

Fader and send levels use Behringer's 4-segment fader law (-10…+10 dB on the top half). Any address can be changed per control in the inspector, and the palette's "Custom OSC" tiles take any address.

Source: Patrick-Gilles Maillot, *WING Remote Protocols* (FW 3.0.x), published by Music Tribe.

## Code map

- `OSC/OSCMessage.swift` – OSC 1.0 encoder/decoder (messages and bundles).
- `OSC/WingClient.swift` – UDP connection (Network framework), subscription renewal, value mirror.
- `Wing/WingCatalog.swift` – WING strips, parameters, addresses, value ranges and fader law.
- `Model/Layout.swift` – palette items (drag payload), placed controls, saved layout.
- `Views/` – surface canvas, palette, fader/knob/button widgets, inspector, connection screen.
