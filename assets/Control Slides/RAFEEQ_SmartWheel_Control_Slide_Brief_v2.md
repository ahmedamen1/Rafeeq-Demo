# RAFEEQ SmartWheel
## Control Subsystem — Slide Implementation Brief v2
### For: Presentation Developer / HTML Engineer
CIE 598/599 · Team 06 · Zewail City of Science and Technology · 2025/2026  
Same pattern as RAFEEQ_Mechanical_Slide_Brief_FINAL.pdf — content sourced from thesis §4.3  
**VERSION 2 — FINAL**

---

## How to Use This Document

Read Section 1 first. Implement slides CTRL-1 → CTRL-5 in order. All content is sourced directly from the thesis (§4.3 Electrical and Control Subsystem). Exact text in cells is verbatim. File names in `monospace` must match exactly.

| Property | Value |
|---|---|
| **Slides covered** | 5 slides: CTRL-1 (Transition) · CTRL-2 (Architecture) · CTRL-3 (Animated Pipeline) · CTRL-4 (Safety Decisions) · CTRL-5 (Novelty) |
| **Insertion point** | After slide-15 (AI Chatbot). Before current slide-16 (Transition: See It In Action). New slides become 16–20. Old slides 16–24 become 21–29. New total: 29. |
| **Video asset** | `control_pipeline.mp4` — 10 seconds, 1280×720. YOUR provided WhatsApp video. Use in CTRL-3 as the pipeline animation. |
| **STM32 image** | `STM32_FOC_Motor_Driver.png` — YOUR actual labelled board photo. Use in CTRL-3 pipeline block. |
| **Brand colours** | Navy #0D1F3C · Gold #C9992A · Blue #3B7DE8 · Green #27AE60 · Red #C94040 |
| **Thesis source** | §4.3.1–4.3.7 · §4.4 (pp. 84–109) — all data verified against thesis |

---

## Contents

1. Overview — Section Structure & Story Arc
2. Slide CTRL-1 — Section Transition
3. Slide CTRL-2 — Control Architecture (3 Tiers)
4. Slide CTRL-3 — The Animated Pipeline + Video
5. Slide CTRL-4 — Engineering Decisions / Safety
6. Slide CTRL-5 — Novelty & Positioning
7. Asset Reference — Files, Images & Video
8. JS Hook Pattern & Slide Counter Update
9. Presenter Speaking Notes (Control Section)

---

## Section 1 — Overview — Section Structure & Story Arc

### The Engineering Narrative

> "A voice command or Nav2 waypoint enters as a ROS2 Twist message, travels through three hardware tiers in under 20ms, drives two 350W BLDC hub motors via sinusoidal FOC, and feeds Hall RPM + IMU + battery voltage back through an EKF into /odom — closing the loop for autonomous navigation."

### Thesis Source: §4.3.1 — Three-Tier Architecture

The thesis defines three strict tiers (§4.3.1, Figure 4.9). This is the academic framing the committee will recognise. Use exactly this language in the slides.

| # | Slide | Story Beat | Thesis Ref | Time |
|---|---|---|---|---|
| CTRL-1 | Section Transition | Dark divider. "Control Subsystem" section opener. 4 pills. | — | ~15s |
| CTRL-2 | Control Architecture | Three tiers: Tier 1 (RPi5/ROS2) · Tier 2 (Arduino/50Hz) · Tier 3 (STM32/FOC). Inter-tier protocols shown. | §4.3.1 Fig 4.9 | ~1 min |
| CTRL-3 | Animated Pipeline | CENTREPIECE. Full signal journey + VIDEO. Command down (blue), motors spin, feedback up (gold). Stats strip. | §4.3.3–4.3.4 | ~2.5 min |
| CTRL-4 | Safety by Design | 4 engineering decision cards. VLT_MODE · DEFAULT_RATE · Sign convention · Arduino Uno→Mega upgrade. | §4.3.3.4 · §4.3.5.1 · §4.3.4.1 | ~1.5 min |
| CTRL-5 | Novelty & Positioning | Comparison table vs literature. 3 novelty claims. Evidence-based, confident. | §4.3 + literature | ~1 min |

### Insertion Point

| Property | Value |
|---|---|
| **Find in file** | The closing of `window._slide15` (AI Chatbot slide, ~line 5238) |
| **Insert after** | That tag, before next slide |
| **New slides** | `id="slide-16"` through `id="slide-20"` · hooks `window._slide16` through `window._slide20` |
| **Shifted slides** | Old slides 16–24 become 21–29. Rename IDs, data-slide attrs, CSS selectors, JS hooks. Do in REVERSE order (24→29 first). |
| **Update TOTAL** | `const TOTAL = 24` → `const TOTAL = 29` |
| **Update counter** | `01 / 24` → `01 / 29` |
| **Verify** | `grep -n "data-slide=" rafeeq_final.html` should show 29 sequential entries, no gaps. |

---

## Section 2 — Slide CTRL-1 — Section Transition

**DARK · NO INTERACTION** — Dark divider ~15s. Identical pattern to existing slide-9 (Methodology transition).

### Exact Slide Content

| Element | Exact Text / Value | Style Notes |
|---|---|---|
| Ghost chip | 06 | 80px, gold at 12% opacity, top-left. Slides in from left. |
| Eyebrow | Methodology & Implementation | Gold, 9px, all-caps, letter-spacing 0.24em |
| Headline line 1 | Control | White, 48–80px, weight 900, letter-spacing -0.04em |
| Headline line 2 | Subsystem | Gold #C9992A, same size/weight |
| Gold bar | — | 3px high, 80px wide, gold. Expands width 0→80px. |
| Subtitle | From ROS2 velocity command to spinning wheels — and back | White 50% opacity, 16px, max-width 520px |
| Pills (4 together) | Differential Drive · Serial Communication · Sensor Feedback · Safety by Design | Border `rgba(201,153,42,0.25)`, bg `rgba(255,255,255,0.06)`, white 70%, border-radius 20px, padding 7px 16px |

### Animation Sequence

| Step | Element | Animation | Delay |
|---|---|---|---|
| 1 | Ghost chip "06" | translateX(-20px)→0, opacity 0→1 | 0ms |
| 2 | Eyebrow label | opacity 0→1 | 150ms |
| 3 | Headline (both lines) | translateY(20px)→0, opacity 0→1 | 250ms |
| 4 | Gold underline bar | width 0→80px | 500ms |
| 5 | Subtitle text | opacity 0→1 | 600ms |
| 6 | All 4 pills together | translateY(14px)→0, opacity 0→1 | 750ms |

No images, no video, no interaction required.

---

## Section 3 — Slide CTRL-2 — Control Architecture (3 Tiers)

**DARK · ANIMATED** — Thesis §4.3.1 Figure 4.9. Three coloured layers, pulsing feedback badge.

### Header

| Element | Text |
|---|---|
| Eyebrow tag | Methodology & Implementation · Control Subsystem |
| Title | Control Architecture |
| Subtitle | Three tiers. One purpose: translate autonomous decisions into motor torque. |

### Three Tiers — Exact Content from Thesis §4.3.1

Use these exact tier names and descriptions. They are quoted directly from the thesis.

#### Tier 1 — High-Level Compute — colour: #3B7DE8
Layer: `rgba(59,125,232,0.07)` · border `rgba(59,125,232,0.5)` · Highlighted node: `/cmd_vel`

- **Raspberry Pi 5** — Ubuntu 24.04 LTS · ROS2 Jazzy
- **SLAM + Nav2** — Path planning · `/cmd_vel` @ 20Hz
- **/cmd_vel** — `geometry_msgs/Twist` · v & ω

#### Tier 2 — Real-Time Control — colour: #C9992A
Layer: `rgba(201,153,42,0.07)` · border `rgba(201,153,42,0.5)` · Highlighted node: Diff. Kinematics

- **Arduino Mega 2560** — 50Hz deterministic loop · 3ms / 20ms
- **Diff. Kinematics** — `vL=v−ωd/2` `vR=v+ωd/2`
- **Safety Watchdog** — 500ms timeout → send (0,0)

#### Tier 3 — Actuation — colour: #27AE60
Layer: `rgba(39,174,96,0.07)` · border `rgba(39,174,96,0.5)` · Highlighted node: STM32 Driver

- **36V Li-ion Pack** — 10S2P Samsung · 158Wh
- **STM32 Driver** — FOC 20kHz · TANK_STEERING · VLT_MODE
- **2× BLDC Motors** — 350W each · 8-inch hub · Hall feedback

### Inter-Tier Communication (shown as labels on connecting arrows)

| From | To | Protocol / Format | Rate |
|---|---|---|---|
| Tier 1 (RPi5) | Tier 2 (Arduino) | `V,W<ω>\n` ASCII over USB-CDC · `/dev/ttyACM0` | 20 Hz |
| Tier 2 (Arduino) | Tier 3 (STM32) | Binary frame `0xABCD` · 8 bytes · Serial1 UART1 pins 18/19 | 50 Hz |
| Tier 3 (STM32) | Tier 2 (Arduino) | Feedback frame `0xABCD` · 18 bytes · spdR,spdL,batV,temp | 50 Hz |
| Tier 2 (Arduino) | Tier 1 (RPi5) | `L,R,AX,AY,AZ,GX,GY,GZ,BV,BT\n` ASCII telemetry | 20 Hz |

**Feedback badge** at bottom of slide: [pulsing dot] `Hall RPM + Battery voltage + IMU heading → EKF → /odom → Nav2`. CSS: keyframe `box-shadow 0→6px→0`, color `#27AE60`, 1.5s infinite.

### Animation Timing

Header at 80ms · Underline at 340ms · Tier 1 layer: `translateX(-20px)→0` at 350ms · Arrow 1 at 420ms · Tier 2 at 530ms · Arrow 2 at 600ms · Tier 3 at 710ms · Feedback badge at 1000ms. All transitions: `0.5s cubic-bezier(0.16,1,0.3,1)`.

---

## Section 4 — Slide CTRL-3 — The Animated Pipeline + Video

**DARK · VIDEO + CSS** — THE CENTREPIECE. Two-phase: sequential reveal → auto-loop. Uses `control_pipeline.mp4`.

### ★ Video Asset

File: `control_pipeline.mp4` — YOUR provided WhatsApp video. 10 seconds, 1280×720, MP4. This video plays in the TOP ZONE of the slide (~55% height), showing the real physical system. Below it runs the CSS animated pipeline diagram.

**Video preview frames:** Frame at 1s — opening · Frame at 5s — mid-point · Frame at 8s — end state

### Video Embed Specification

| Property | Value |
|---|---|
| **File name** | `control_pipeline.mp4` (rename your WhatsApp video to this) |
| **Placement** | Top zone of CTRL-3 slide — full width, ~55% of slide height, rounded corners 12px, navy border 1.5px |
| **Autoplay** | YES — autoplay muted loop playsinline. Starts immediately when slide enters. |
| **Controls** | No native controls bar. Add a subtle gold "■" pause button overlay bottom-right (optional). |
| **HTML tag** | `<video autoplay muted loop playsinline>` |
| **CSS** | `width:100%; border-radius:12px; border:1.5px solid rgba(201,153,42,0.3); object-fit:cover; flex:0 0 55%;` |

### Layout Below the Video — CSS Animated Pipeline Strip

Below the video (~35% height): a horizontal pipeline strip showing the signal flow in diagram form. Below that: the stats strip (5 numbers). The pipeline strip is the CSS animation described below — it loops continuously while the video plays.

### Pipeline Strip — Command Path (left → right, BLUE)

| Block | File/Fallback | Label | Sub-label | Badge |
|---|---|---|---|---|
| Block 0 | `rpi5.png` / ■■ | Raspberry Pi 5 | ROS2 Jazzy · Nav2 | `/cmd_vel` — blue badge |
| Wire 0 (blue) | — | Serial Bridge Node | Wire label above slide | Blue particle: `sct3FlowRight` 1.4s infinite |
| Block 1 | `arduino_mega.png` / ■■ | Arduino Mega 2560 | Serial1 · pins 18/19 · 50Hz | `V,W<ω>\n` — gold badge |
| Wire 1 (blue) | — | Binary Frame | Wire label above | Blue particle: delay 0.4s |
| Block 2 ★ | `STM32_FOC_Motor_Driver.png` / ■ | STM32 Driver | FOC 20kHz · VLT_MODE | `0xABCD` — blue badge |
| Y-split | — | Left/Right split | Top=blue Bottom=green | Appears at 1050ms |
| Motor L | SVG wheel blue spokes | Left Motor | 350W BLDC · 8-inch | Rotates: 0.8s linear infinite |
| Motor R | SVG wheel green spokes | Right Motor | 350W BLDC · 8-inch | Rotates: 0.8s linear infinite |

> ★ Block 2 uses `STM32_FOC_Motor_Driver.png` — your real board photo. This is the most impactful visual in the entire slide.

### Pipeline Strip — Feedback Path (right → left, GOLD)

Row below command path. `flex-direction: row-reverse`. Background `rgba(201,153,42,0.04)`, border `1px solid rgba(201,153,42,0.15)`, border-radius `12px`.

| Position | Element | Content | Notes |
|---|---|---|---|
| Far right | 3 sensor chips | ■ Hall RPM \| ■ Battery V \| ■ IMU | Source: Tier 3 → Tier 2 |
| Wire gold A | Gold wire + particle | `particle-gold`: `sct3FlowLeft` 1.6s infinite, delay 0.2s | RIGHT-TO-LEFT flow |
| Centre | Arduino node | ■ Arduino · "Parses & re-encodes" | Decodes 18-byte feedback frame |
| Wire gold B | Gold wire + particle | `particle-gold`: delay 0.6s | Continues left |
| Far left | Destination box | ■ `/odom → EKF → Nav2` · "Pose updated @ 20Hz" | Blue-tinted box |

### Communication Protocol Detail — What Goes on Each Wire Label

These are the EXACT formats from §4.3.3.5 and §4.3.4.5 of the thesis. Use as wire labels or hover tooltips.

| Wire | Direction | Exact Format | Size | Rate | Thesis Ref |
|---|---|---|---|---|---|
| RPi5 → Arduino | USB-CDC `/dev/ttyACM0` | `V,W<ω>\n` (ASCII float, newline terminated) | ~15 bytes | 20 Hz | §4.3.4.3 |
| Arduino → STM32 | UART1 Serial1 pins 18/19 | `[START 0xABCD][steer int16][speed int16][XOR checksum]` | 8 bytes | 50 Hz (0.7ms) | §4.3.3.5 Fig 4.15 |
| STM32 → Arduino | UART1 feedback | `[0xABCD][cmd1][cmd2][spdR][spdL][batV][temp][LED][CRC]` | 18 bytes | 50 Hz | §4.3.3.5 Fig 4.15 |
| Arduino → RPi5 | USB-CDC `/dev/ttyACM0` | `L,R,AX,AY,AZ,GX,GY,GZ,BV,BT\n` ASCII | — | 20 Hz | §4.3.4.5 |

Battery voltage decode from raw: `V_bat = raw_batV × 39.7 / 1492 / 100` (V). Implemented in Arduino firmware.

### Stats Strip — 5 Numbers (bottom bar)

| # | Value (large gold) | Label (small grey) | Thesis Source |
|---|---|---|---|
| 1 | 20ms | control loop period | §4.3.4.4 — 50Hz deterministic loop |
| 2 | 115,200 | UART baud rate | §4.3.3.5 · Table 4.9 |
| 3 | 90 RPM | N_MOT_MAX | §4.3.3.3 Table 4.8 — ISO 7176-14 speed limit |
| 4 | 15A | I_MOT_MAX | §4.3.3.3 Table 4.8 — 11 N·m torque |
| 5 | 85% | CPU headroom | §4.3.4.4 — 3ms of 20ms budget (bench-measured) |

### Enter Sequence Timing — Phase 1 (sequential reveal, then auto-loop)

| Time | Event |
|---|---|
| 0ms | Video starts autoplaying immediately (muted loop) |
| 0ms | Header fades in, slides down from -12px |
| 360ms | Gold underline expands 0 → 56px |
| 400ms | Block 0 (RPi5) appears: `translateY(16px)→0` |
| 600ms | Block 1 (Arduino) appears |
| 800ms | Block 2 (STM32 ★) appears |
| 1050ms | Y-split wire appears |
| 1150ms | Left motor appears |
| 1300ms | Right motor appears |
| 1500ms | Wheel spoke rotation begins (CSS animation) |
| 1700ms | Feedback row slides up |
| 2000ms | Stats strip slides up |
| 2000ms+ | Phase 2: CSS particles loop. Wheels spin. Video loops. Full auto-loop state. |

### Particle CSS Keyframes

**Blue command particles:**
```css
@keyframes sct3FlowRight {
  0%   { left: -5%;  opacity: 0 }
  10%  { opacity: 1 }
  90%  { opacity: 1 }
  100% { left: 105%; opacity: 0 }
}
/* 1.4s ease infinite */
```

**Gold feedback particles:**
```css
@keyframes sct3FlowLeft {
  0%   { right: -5%;  opacity: 0 }
  10%  { opacity: 1 }
  90%  { opacity: 1 }
  100% { right: 105%; opacity: 0 }
}
/* 1.6s ease infinite */
```

Particle style: 10px circle, `box-shadow: 0 0 8px` matching colour.

---

## Section 5 — Slide CTRL-4 — Engineering Decisions / Safety by Design

**DARK · 4 CARDS** — Thesis §4.3.3.3–4.3.5.1 · §4.3.4.1. Four cards. Problem → Solution. No interaction.

### Layout

Full-width dark slide. Header + 4-column card grid. Each card: dark glass panel, ghost number (large, gold 15% opacity), title, red problem panel, green solution panel, gold tag chip. Hover state: `border-color rgba(201,153,42,0.35)`.

### Header

| Element | Text |
|---|---|
| Eyebrow | Methodology & Implementation · Control Subsystem |
| Title | Engineering Decisions That Kept the Patient Safe [gold span] |
| Underline | 56px gold bar |

---

#### Card 01 — ■■ VLT_MODE over SPD_MODE (§4.3.3.4 · Fig 4.14)

**Tag chip:** Patient Safety — gold bg, gold border. Font 8px uppercase.

| ■ Problem | ■ Solution |
|---|---|
| SPD_MODE: STM32 closed-loop holds 0 RPM via active braking torque. cmd=0 creates back-EMF resistance on drive wheels. A caregiver CANNOT manually push the wheelchair in an emergency. Safety hazard. | VLT_MODE: cmd=0 applies zero voltage to stator windings. Motors freewheel freely. Velocity loop closed at Arduino layer using Hall RPM feedback (PID Kp=0.8, Ki=0.3, Kd=0.05). Manual push always possible. |

---

#### Card 02 — ■ DEFAULT_RATE: 800 → 300 (§4.3.5.1 · Fig 4.18)

**Tag chip:** Voltage Stability — gold bg, gold border. Font 8px uppercase.

| ■ Problem | ■ Solution |
|---|---|
| DEFAULT_RATE=800 controls FOC voltage ramp slew rate. Fast ramp → dI/dt transient spike → peak ≈30A before inner current loop reacts → 36V bus sags to ~31V → STM32 BAT_DEAD cutoff → wheelchair stops mid-turn. | Reducing DEFAULT_RATE from 800 to 300 cuts peak transient from ≈30A to 12–15A. Voltage sag eliminated. Stable operation across all forward + rotation manoeuvres. (Note: firmware default was 30; team had set it to 800 for faster ramp-up.) |

---

#### Card 03 — ■ Arduino Uno → Mega 2560 (§4.3.4.1 · Table 4.9)

**Tag chip:** Reliability — gold bg, gold border. Font 8px uppercase.

| ■ Problem | ■ Solution |
|---|---|
| Arduino Uno: single hardware UART shared between USB-CDC and SoftwareSerial (pins 2/3) for STM32. At 115200 baud, SoftwareSerial interrupt-driven bit-banging conflicts with I2C + timer interrupts → 17% packet error rate (bench-measured: CRC-failed frames per 1000 transmissions). | Arduino Mega 2560: 4 independent hardware UARTs. UART0 (pins 0/1) → RPi5 USB-CDC. UART1 Serial1 (pins 18/19) → STM32 USART2. UART1 eliminates all interrupt contention. Packet error rate: 0%. |

---

#### Card 04 — ■ Magnetometer Excluded from IMU (§4.3.6)

**Tag chip:** Sensor Integrity — gold bg, gold border. Font 8px uppercase.

| ■ Problem | ■ Solution |
|---|---|
| 9-axis IMU with magnetometer was considered. But BLDC motors + 3-phase power cables generate time-varying magnetic fields that corrupt indoor compass readings by 30–90° per minute during motor operation. | MPU-6050 (6-axis, no magnetometer) used at I2C 0x68, pins 20/21. Orientation estimated from gyroscope integration + accelerometer tilt correction via `imu_filter_madgwick` ROS2 package. Yaw-unobservable but drift-bounded for short indoor traversal distances. |

---

### Card Animation

Cards stagger: Card 0 at 380ms, Card 1 at 510ms, Card 2 at 640ms, Card 3 at 770ms. Each: `translateY(18px)→0`, `opacity 0→1`, `0.5s cubic-bezier(0.16,1,0.3,1)`.

---

## Section 6 — Slide CTRL-5 — Novelty & Positioning

**DARK · 2-COL LAYOUT** — Comparison table vs 3 literature systems + 3 novelty claim cards. Evidence-based, confident.

### Layout

Two-column split. Left (~60%): comparison table. Right (~40%): 3 novelty claim cards. Table slides in from left (400ms). Claims slide from right (550ms). Table rows stagger +110ms each. Claim cards stagger at 680/830/980ms.

### Comparison Table — Exact Data

7 columns. RAFEEQ row: gold border 1.5px, background `rgba(201,153,42,0.07)`. RAFEEQ "Motor Controller" cell badge: background `rgba(201,153,42,0.2)`, border `rgba(201,153,42,0.5)`, color `#C9992A`.

| System | Drive | ROS2 | SLAM | Voice | Retrofit | Motor Ctrl |
|---|---|---|---|---|---|---|
| ROMR (2023) | Hoverboard BLDC | ✗ | ✓ | ✗ | ✗ | ODrive (separate) |
| U. Toronto (2018) | Custom motors | ✗ | ✓ | ✗ | ✓ | Proprietary |
| Voice+SLAM (2026) | Custom DC | ROS1 | ✓ | ✓ | ✗ | Dedicated driver |
| ★ **RAFEEQ (Ours)** | Hoverboard BLDC | ✓ Jazzy | ✓ SLAM TB | ✓ Arabic | ✓ Retrofit | **Repurposed STM32 ★** |

### Literature Sources (for presenter to cite verbally)

**ROMR (2023):** Nwankwo et al., HardwareX 2023. Used hoverboard 350W BLDC + Arduino Mega + ODrive controller + Jetson Nano. General robot — not wheelchair, not medical, different motor controller.

**U. Toronto (2018):** Burhanpurkar et al., IROS 2018. "Cheap or Robust?" — autonomous wheelchair retrofit. Custom motors, ROS1, no voice, no SLAM Toolbox.

**Voice+SLAM (2026):** Scientific Reports, Jan 2026. Voice-controlled wheelchair SLAM. ROS1 GMapping/AMCL, dedicated motor controller, no Arabic, not a retrofit kit.

### Three Novelty Claim Cards — Exact Text

> ■ First to repurpose the original hoverboard STM32F103RCT6 mainboard as a medical-grade wheelchair motor driver — no separate controller added to BOM

> ■ First complete ROS2 Jazzy + SLAM Toolbox + Egyptian Arabic voice + retrofit kit integration on a repurposed consumer BLDC hoverboard platform

> ■ Deployed at a fraction of commercial cost — designed specifically for the Egyptian market (ISF-funded) with MENA expansion roadmap

**Claim card styling:** bg `rgba(255,255,255,0.03)`, border `1px solid rgba(255,255,255,0.07)`, border-radius `11px`. Icon 22px. Text 11px, white 50% opacity in dark slide. `<strong>`/`<b>` tags: white (`#fff`) full opacity.

---

## Section 7 — Asset Reference — Files, Images & Video

### Complete File List

| File Name | Used In | Description | Status |
|---|---|---|---|
| `control_pipeline.mp4` | CTRL-3 top zone (55% height) | YOUR WhatsApp video renamed. 10s, 1280×720. Autoplay muted loop. | ✓ Have it — **RENAME** |
| `STM32_FOC_Motor_Driver.png` | CTRL-3 Block 2 image | YOUR actual labelled STM32 hoverboard mainboard. 3096×1599px. High-res. | ✓ Have it |
| `rpi5.png` | CTRL-3 Block 0 image | Raspberry Pi 5 top-down board photo. Download from raspberrypi.com or use official press image. | Download |
| `arduino_mega.png` | CTRL-3 Block 1 image | Arduino Mega 2560 board photo. Use official Arduino product image from arduino.cc. | Download |

### Folder Structure

```
rafeeq_final.html
control_pipeline.mp4          ← rename your WhatsApp video to this
STM32_FOC_Motor_Driver.png    ← already have
rpi5.png                      ← download
arduino_mega.png              ← download
--- existing mechanical assets already in folder ---
Rafeeq_Logo.jfif · zewail.png · isf.png (already present)
```

### ★ STM32 Board Image (use in CTRL-3 Block 2)

This is the exact image to use inside the STM32 Driver hardware block in the pipeline strip. It shows your actual board with all pin labels — far more professional than any generic icon.

`STM32_FOC_Motor_Driver.png` — YOUR actual hoverboard mainboard · 3096×1599px · Use in CTRL-3 pipeline Block 2

**Pin labels visible on the board image (for reference):**

Left side: Power Button (PA1 / Button Pin, PA5 / Latch Pin) · Motor Wires · Left Motor Current (PC3 / Phase B, PA0 / Phase A) · DC Link Current (PC0 / Left Motor, PC1 / Right Motor) · Left Hall Cable (GND, HALL A, HALL B, HALL C, 5V 100mA max.) · Left Sideboard (15V 200mA max., PA2 / TX / ADC1, PA3 / RX / ADC2, PWM2 / PPM / iBUS, GND)

Right side: XT60 Main Power · Charger Connector (PA12 / Charger Pin) · Right Motor Current (PC5 / Phase C, PC4 / Phase B) · SWD Programming (3.3V 30mA max., PA14 / SWCLK, GND, PA13 / SWDIO) · Right Hall Cable (5V 100mA max., HALL A, HALL B, HALL C, GND) · Right Sideboard\* (15V 200mA max., PB10 / TX / SCL, PB11 / RX / SDA, iBUS / PPM / PWM2, GND) · \*5V Tolerant

---

## Section 8 — JS Hook Pattern & Slide Counter Update

### How the Navigation Engine Works

Each slide registers: `window._slideNN = { enter: function(){...}, leave: function(){...} }`. The engine calls `callHook(idx, "enter")` when active and `callHook(idx, "leave")` on exit. Key format: `"_slide" + String(idx+1).padStart(2,"0")`. So slide at array index 15 (the 16th slide) → `window._slide16`.

### Required Changes

| Location | Find | Replace With |
|---|---|---|
| ~line 6127 | `const TOTAL = 24;` | `const TOTAL = 29;` |
| ~line 6121 | `01 / 24` | `01 / 29` |
| New slide hooks (×5) | `window._slidectrl1 / _ctrl2 / _ctrl3 / _ctrl4 / _ctrl5` | `window._slide16 / _slide17 / _slide18 / _slide19 / _slide20` |
| Shifted hook (×9) | `window._slide16 … _slide24` (old slides) | `window._slide21 … _slide29` (rename in reverse order) |
| Shifted CSS (×9) | `#slide-16 { … }` through `#slide-24 { … }` | `#slide-21 { … }` through `#slide-29 { … }` |
| Shifted IDs (×9) | `id="slide-16"` through `id="slide-24"` | `id="slide-21"` through `id="slide-29"` |
| Shifted data-slide (×9) | `data-slide="16"` through `data-slide="24"` | `data-slide="21"` through `data-slide="29"` |

### Renaming Order (CRITICAL — do in reverse to avoid collision)

Go from high to low: rename slide-24→slide-29 first, then slide-23→slide-28, … , slide-16→slide-21. If you go low-to-high you will overwrite slide-16 with the new slide-16 data before renaming it.

**Verify:**
```bash
grep -n "data-slide=" rafeeq_final.html | head -35
```
Should show exactly 29 lines, numbered 1 through 29, no gaps or duplicates.

---

## Section 9 — Presenter Speaking Notes — Control Section

Ziad presents CTRL-1 through CTRL-4. Nourhan covers navigation integration (Nav2 / SLAM). These are the key points to hit — sourced from thesis §4.3.

### CTRL-2 — Architecture (Ziad, ~1 min)

- "The control system is organised into three strict tiers — this is not arbitrary, it enforces separation between computation, real-time control, and actuation."
- "Tier 1 is the Raspberry Pi 5 running ROS2 Jazzy on Ubuntu 24.04 — the only officially certified OS for RPi5. It runs SLAM, Nav2, and voice recognition."
- "Tier 2 is the Arduino Mega running a deterministic 50Hz loop — that is a 20ms control period. Six tasks complete in only 3ms, leaving 85% CPU headroom, bench-measured."
- "Tier 3 is the STM32 hoverboard driver running EFeru FOC firmware at 20kHz sinusoidal commutation — silent, zero torque ripple, which matters for a seated patient."

### CTRL-3 — Pipeline (Ziad + Nourhan, ~2.5 min)

- "Nav2 publishes a `geometry_msgs/Twist` on `/cmd_vel` — a linear velocity v and angular velocity ω. The serial bridge node serialises this to `V,W<ω>` over USB at 20Hz."
- "The Arduino receives this ASCII message, runs differential drive kinematics — vL = v minus ωd/2, vR = v plus ωd/2 — with our measured track width of 0.348m and wheel radius 0.130m."
- "It converts wheel velocities to target RPM, scales to the STM32 command integer range of -1000 to +1000, and sends an 8-byte binary frame with start word 0xABCD and XOR checksum."
- "The STM32 drives the motors via FOC at 20kHz. It sends back an 18-byte feedback frame every 20ms containing Hall RPM, battery voltage, and board temperature."
- "The Arduino parses this, publishes an ASCII telemetry string at 20Hz back to the RPi5, where the serial bridge converts Hall RPM to `/odom` and IMU data to `/imu/data_raw`."
- "`robot_localization` runs an Extended Kalman Filter fusing wheel odometry with IMU — this filtered odometry is what Nav2 uses for localisation."

### CTRL-4 — Safety Decisions (Ziad, ~1.5 min)

- "VLT_MODE is not a performance choice — it is a patient safety requirement. SPD_MODE would physically block a caregiver from pushing the chair manually. That is unacceptable for a medical device."
- "The DEFAULT_RATE issue was discovered during seated integration testing — motor jerk, an audible over-current alert, and a 4 to 6 volt sag on the 36V bus. The root cause was a dI/dt transient from our own earlier configuration. Reducing from 800 to 300 cut the peak current from 30A to 12–15A."
- "The Arduino Uno produced a 17% packet error rate — bench-measured, per 1000 CRC-checked transmissions. That is not acceptable for a safety-critical motor driver. The Mega gives us four independent hardware UARTs, eliminating all interrupt contention."
- "We excluded the magnetometer because BLDC motors corrupt compass readings by 30 to 90 degrees per minute indoors. The MPU-6050 with gyro-accelerometer fusion is drift-bounded for the short traversal distances of indoor navigation."

### CTRL-5 — Novelty (Ziad, ~1 min)

- "ROMR (2023) also used hoverboard BLDC motors — but they used a separate ODrive controller. We use the original STM32 mainboard that came with the hoverboard. No added controller cost."
- "No prior system combines ROS2 Jazzy, SLAM Toolbox, Egyptian Arabic voice, and a retrofit form-factor on a repurposed consumer BLDC platform. That combination is ours."
- "The entire system was funded by ISF — designed specifically for the Egyptian market, targeting a price point accessible in Egypt, not imported from Europe."

---

*RAFEEQ SmartWheel · Team 06 · Zewail City of Science and Technology · CIE 598/599 · 2025/2026 — Control Subsystem Slide Brief v2 — FINAL*
