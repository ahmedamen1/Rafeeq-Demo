# RAFEEQ SmartWheel
## Mechanical Subsystem — Presentation Slide Brief
### Version 2 · Complete Edition

> **Prepared for:** Presentation Developer / HTML Engineer  
> CIE 598/599 · Team 06 · Zewail City of Science and Technology  
> Graduation Defense 2025/2026

---

> **How to use this document:** Read Section 1 first for the big picture. Implement slides A→D in order. Exact text cells are verbatim for slides. File names in `monospace` must match exactly. References in Section 7 are for presenter's speaking notes.

---

| Property | Value |
|---|---|
| **Slides covered** | 4 slides: A (Design Challenge), B (Motor Selection), C (5 Iterations), D (CAD + Manufacturing) |
| **Insertion point** | After existing `slide-9` in `rafeeq_final.html`. Total becomes 28 slides. |
| **Estimated time** | 7–9 minutes total for the mechanical section |
| **Video assets** | `cad_motion_study.mp4` (50 sec) · `manufacturing_wirecut_video.mp4` (3 sec) |
| **Image assets** | 13 images total — see Section 6 for all names and rename instructions |
| **Brand colours** | Navy #0D1F3C · Gold #C9992A · Gold-light #E8B84B · Red #C94040 · Green #2E7D52 · Amber #D97706 |
| **Font** | Inter (already imported in `rafeeq_final.html` via Google Fonts) |

---

## Contents

1. Overview — Section Structure & Story Arc
2. Slide A — The Design Challenge *(Purpose, layout, exact text, animation sequence)*
3. Slide B — Motor Selection: Engineering Problem → Solution *(Problem framing, torque sizing, 4-candidate card flip, motor images, spec strip, references)*
4. Slide C — 5 Iterations Timeline *(All 6 states with exact content, photos, timeline behaviour, key interception)*
5. Slide D — CAD Video + Manufacturing Gallery *(Video specs, 3-sec wire EDM clip, callout annotations, photo strip, tagline)*
6. Asset Reference — All File Names *(Images, videos, rename instructions, folder structure)*
7. References & Sources *(All citations used in motor selection and iteration design)*
8. Technical Implementation Notes *(JS key interception, card flip CSS, video playback, colour tokens)*

---

## Section 1 — Overview — Section Structure & Story Arc

### The Engineering Narrative

> **The Arc in One Sentence:** "We faced three hard constraints, sized the motors through a quantitative torque analysis, chose the actuators through structured comparison, then designed the mounting system through five physical iterations — and manufactured it ourselves in Egyptian workshops."

| # | Name | Story Beat | Presenter | Time |
|---|---|---|---|---|
| A | The Design Challenge | Set up WHY this was hard — 3 constraints | Ziad | ~30 s |
| B | Motor Selection | Problem statement → torque sizing → 4-candidate evaluation → selection | Ziad | ~2 min |
| C | 5 Iterations | Walk every physical iteration with real photos | Ziad + Nourhan | ~4 min |
| D | CAD + Manufacturing | CAD motion study + workshop photos | Omar | ~2 min |

> **Insertion:** Find `id="slide-9"` (dark "How We Built It" divider). Insert 4 new slides immediately after as `slide-10, -11, -12, -13`. Renumber all following slides +4. Update slide counter total: 24 → 28. Search JS for any hardcoded `totalSlides` and update.

---

## Section 2 — Slide A — The Design Challenge

### Purpose

30-second setup slide. Frames the engineering problem before any solution is shown. **No images, no interaction, no clicks required.** Full navy background.

### Exact Slide Content

| Element | Exact Text | Style |
|---|---|---|
| Eyebrow | MECHANICAL SUBSYSTEM | Gold, all-caps, letter-spaced, centred |
| Headline line 1 | The Design | White, 48–56 px bold, left-aligned |
| Headline line 2 | Challenge. | Same as above |
| Row 1 | • **Load** — Support a 120 kg user on uneven indoor floors | Gold dot, bold label, white text |
| Row 2 | • **Constraint** — Attach to a frame never designed for motor torque | Same pattern |
| Row 3 | • **Goal** — Modular: install and remove without permanent modification | Same pattern |
| Closing line | "We didn't design the final mount in a single pass. We iterated five times." | Gold italic, centred, ~14 px |

### Animation Sequence

| Step | Element | Animation | Delay |
|---|---|---|---|
| 1 | Eyebrow | fadeDown | 0 ms |
| 2 | Headline | fadeUp | 200 ms |
| 3 | Row 1 (Load) | fadeRight (slide from left) | 500 ms |
| 4 | Row 2 (Constraint) | fadeRight | 900 ms |
| 5 | Row 3 (Goal) | fadeRight | 1300 ms |
| 6 | Closing gold italic line | fadeIn | 2000 ms |

*No images or videos required for Slide A.*

---

## Section 3 — Slide B — Motor Selection: Engineering Problem → Solution

### Purpose & Engineering Framing

> **This slide should feel like engineering thinking made visible.** Structure: **Problem** → **Requirements** → **Torque Sizing** → **Candidates** → **Evaluation** → **Selection**. Not "here's what we chose" — *"here's how we chose it"*.

### Slide Opening — The Problem Statement (on screen 5 sec before cards appear)

> **Large navy centred text:**  
> *"We need to move a 120 kg loaded wheelchair reliably, at low speed, with precise independent wheel control — at a price that works in Egypt."*
>
> **Smaller grey below:**  
> *Four motor types were evaluated against four criteria. Only one passed all of them.*

---

### Motor Sizing — What Goes on the Slide (Before the Cards)

> **Presenter note:** This is a single small panel that appears *before* the 4 candidate cards. It takes **20–30 seconds** to present. One question, one equation, one answer. The committee sees you did the engineering — they do *not* need to follow every step. All spoken context is in the bullet points below the box.

**The question:** What is the minimum torque each motor must deliver to move a 120 kg loaded wheelchair up an ADA-compliant indoor ramp (1:12 gradient) without stalling?

$$T_{\text{required}} = \frac{mg \cdot \sin\theta \cdot r}{2} \times SF = \frac{120 \times 9.81 \times \frac{1}{12} \times 0.130}{2} \times 1.25 = 7.9 \times 1.25 \approx \mathbf{10 \text{ N·m per motor}}$$

**Selected motor delivers:** $T_{\text{BLDC}} = 11 \text{ N·m}$ at $I = 15 \text{ A}$ → $11 > 10$ → **Passes. ✓**

> *m* = 120 kg (user + chair) · sin θ = 1/12 (ISO ADA ramp) · *r* = 0.130 m (8-inch hub motor) · SF = 1.25 (ISO 13482)

**Presenter speaks (not on screen):**
- "We sized the motors against the worst-case scenario: a 120 kg user on a 1-in-12 ramp."
- "The calculation gives us a requirement of 10 N·m per motor with a safety factor."
- "The selected BLDC hub motor delivers 11 N·m at our configured current limit — it passes with margin."
- "That result is confirmed in the firmware: `I_MOT_MAX = 15 A`, Thesis Table 4.8."
- *(transition)* "Now — how did we actually choose this motor over the alternatives?"

---

### Evaluation Criteria (4 icons shown across top of slide)

| Criterion | Icon | What it means | Why it matters |
|---|---|---|---|
| Reliability | • | No brushes, gears, or wear parts | Medical device — must not fail at home. Maintenance unacceptable. |
| Torque at low speed | ! | ≥10 N·m at 0–1.5 m/s | ADA ramp 1:12 without stalling (ISO 7176-14, §3.2.1.3) |
| Closed-loop control | § | Position/speed feedback | Without feedback, straight-line drift uncorrectable in indoor nav |
| Cost | £ | Fit within BOM budget | Medical wheelchair motors cost 3–5× more — Egyptian market |

---

### The 4 Candidate Cards — Complete Content

#### ❌ Card 1 — REJECTED — Brushed DC Motor

*Image file:* `motor_brushed_dc.jpg` — Generic brushed DC motor, visible commutator and brushes. Source: web product image.

| Criterion | Pass? | Reasoning |
|---|---|---|
| Reliability | ✗ | Brushes wear after 6–12 months of continuous use. Replacement required — unacceptable for a home medical device. |
| Torque | ✓ | Adequate torque, but performance degrades as brushes wear. |
| Closed-loop control | △ | Can use external encoder, but no built-in Hall sensor. Adds cost and complexity. |
| Cost | ✓ | Low initial cost — but high lifetime maintenance cost. |

*Ref: Krishnan, R. — Electric Motor Drives, Prentice Hall, 2001* **[58]**

---

#### ❌ Card 2 — REJECTED — Stepper Motor

*Image file:* `motor_stepper.jpg` — NEMA-17 or NEMA-23 stepper. Source: web product image.

| Criterion | Pass? | Reasoning |
|---|---|---|
| Reliability | ✓ | No brushes. Mechanically robust. |
| Torque | ✗ | Open-loop by design — loses steps under dynamic load. Cannot confirm actual wheel position. Torque drops significantly at speed. |
| Closed-loop control | ✗ | No native speed feedback. External encoder required for closed-loop — complexity defeats the purpose. |
| Cost | ✓ | Moderate cost. |

*Ref: Krishnan, R. — Electric Motor Drives* **[58]**

---

#### ❌ Card 3 — REJECTED — Servo Motor + Gearbox

*Image file:* `motor_servo_gearbox.jpg` — Industrial servo with gearbox. Source: web product image.

| Criterion | Pass? | Reasoning |
|---|---|---|
| Reliability | △ | Motor is reliable, but gearbox introduces backlash, wear, and additional failure points. |
| Torque | ✓ | Gearbox multiplies torque — good low-speed performance. |
| Closed-loop control | ✓ | Closed-loop encoder. Excellent control. |
| Cost | ✗ | Most expensive option: servo driver + gearbox + motor = 3–4× cost of hub motor solution. |

*Ref: Cooper et al. — Evaluation of electric-powered wheelchairs, APMR 1999* **[49]**

---

#### ✅ Card 4 — SELECTED — BLDC Hub Motor (8-inch, 350 W)

*Image file:* `motor_bldc_hub.jpg` — YOUR actual hoverboard 8-inch hub motor. Photo of the component used.

| Criterion | Pass? | Reasoning |
|---|---|---|
| Reliability | ✓ | No brushes, no gears, no belts. Direct-drive. Zero wear parts in drivetrain. |
| Torque | ✓ | FOC delivers max torque at zero speed. 11 N·m at 15 A > 10 N·m required. ADA ramp validated. |
| Closed-loop control | ✓ | Built-in Hall effect sensors — 3 sensors, 6 transitions/rev. Closed-loop FOC via EFeru STM32 firmware. |
| Cost | ✓ | ≈70% cheaper than dedicated medical wheelchair motors. Leverages hoverboard mass-production supply chain. |

*Ref: Krishnan* **[58]** · Åström & Hägglund **[57]** · ISO 7176-14 **[31]** · EFeru firmware **[37]**

---

### Spec Strip (appears after all 4 cards are flipped)

| Wheel diameter | Power | Supply voltage | Control | Sensing |
|---|---|---|---|---|
| 8 in (203 mm) | 350 W × 2 | 36 V Li-ion 10S2P | FOC · EFeru STM32 | Hall effect · 3 sensors/motor |

---

## Section 4 — Slide C — 5 Iterations Timeline

### Purpose

Walk the committee through the iterative design process using real photos and engineering language. **The most important slide for demonstrating rigour.** Should feel like turning pages of an engineering journal.

### Fixed Top Bar (does not change between iterations)

> **Eyebrow:** ITERATIVE DESIGN PROCESS · MECHANICAL SUBSYSTEM  
> **Headline:** Five Iterations. One Validated Mount.

### Navigation Behaviour

- **Inside Slide C:** Pressing `→` or clicking a timeline dot advances to next iteration. Photo + text crossfade (300 ms). Active dot slides right.
- **Exit forward:** Pressing `→` on FINAL state moves to Slide D.
- **Exit backward:** Pressing `←` on Iteration 1 goes back to Slide B.
- See Section 8 for JS key interception pattern.

### Layout Per State

Left panel (55%): full-height photo, `object-fit: cover`, small iteration badge overlay top-left, tag bottom-left.  
Right panel (45%): iteration number + verdict badge, name, then: "What we tried" / "What happened" / "What we learned".  
Bottom: fixed timeline bar, 6 dots.

---

### ❌ Iteration 1 — REJECTED — Bent-plate bracket

*Image:* `iter1_prototype.jpg` · Tag: *\* Bracket Design · Phase 1*

**What we tried:** A simple bent-plate bracket to clamp the motor housing directly to the wheelchair's side frame tube.

**What happened:** Hole spacing and bend angles didn't match the motor housing or frame tube diameter. Motor visibly misaligned. Assembly unstable under hand load.

**What we learned:** A single bent plate is insufficient — bracket must be a **closed, self-referencing structure**. Motivated redesign into box-section.

---

### ❌ Iteration 2 — REJECTED — Stainless steel box-section bracket

*Image:* `iter2_steel_box.jpg` · Tag: *\* Bracket Design · Phase 1*

**What we tried:** Welded stainless steel box section wrapping the frame tube on 3 sides, clamped with through-bolts. Corrects alignment issue of Iter 1.

**What happened:** Under bolt torque, thin walls bowed inward — distorting section geometry and loosening the clamp over repeated tightening cycles.

**What we learned:** **Wall thickness and bolt-bearing area** are the limiting factors, not bracket shape. Switched to solid flat-bar stock.

---

### ! Iteration 3 — PARTIAL — Mild steel flat-bar bracket with rigid cross-bar

*Image:* `iter3_flatbar_bracket.jpg` · Tag: *\* Bracket Design · Phase 1*

**What we tried:** Solid mild steel flat bar, wider bolt pattern, two motor brackets tied by a single rigid cross-bar.

**What happened:** ✓ Zero deflection under 120 kg static load. Structurally validated. BUT: rigid cross-bar caused one wheel to lift on uneven floors.

**What we learned:** Bracket geometry is now correct. More fundamental system problem exposed: **the two drive wheels must be mechanically independent**.

---

### ✓ Iteration 4 — CAD VALIDATED — Independent suspension redesign (CAD)

*Image:* `iter4_cad_suspension_concept.png` · Tag: *[CAD] CAD Design · Phase 2*

**What we tried:** Complete redesign — two fully independent scissor/pantograph suspension links. Each motor on its own bracket. Each wheel can move vertically independent of the other.

**What happened:** CAD validation confirmed geometry. Each wheel maintains independent floor contact. Gas struts provide constant downforce. 120 kg rated.

**What we learned:** Independent suspension concept is correct. Design sent to manufacturing: CNC milling + Wire EDM.

---

### ! Iteration 5 — FIXED — Manufactured mount — alignment correction

*Image:* `iter5_problem_misalignment.jpg` · Tag: *[MFG] Manufacturing · Phase 3*

**What we tried:** Iteration 4 design manufactured (CNC milled brackets + Wire EDM) and installed on both sides of the wheelchair.

**What happened:** Two geometric issues found: (1) **Wheel camber** — one drive wheel leaned, contacting floor only at its edge. (2) **Toe-in** — front edges of both wheels closer together, producing constant rolling friction. Both traced to tolerance stack-up.

**What we learned:** Brackets re-machined and re-aligned to zero camber and zero toe relative to chair centreline.

---

### ✓ Final Configuration — VALIDATED — Re-aligned brackets

*Image:* `final_configuration.jpg` · Tag: *✓ Production-Ready*

**What we tried:** Re-machined and re-aligned brackets reinstalled on both sides.

**What happened:** **Zero camber. Zero toe. Both drive wheels achieve full-width floor contact.** Independent suspension maintains contact on uneven surfaces. 120 kg: zero measurable deflection. No rotational slip.

**What we learned:** Final mount configuration validated (Thesis Table 4.2, §4.2.7). Modular installation confirmed. No permanent modification to wheelchair frame.

---

### Timeline Dot Legend

| State | Colour | Behaviour |
|---|---|---|
| Active (current) | Gold #C9992A, 16 px | Large filled dot with subtle glow |
| Completed | Gold #C9992A, 10 px | Smaller, no glow |
| Upcoming | Grey #9CA3AF, 10 px | Hollow or faded |
| FINAL dot | Green #2E7D52 when active | Switches to gold when complete |
| Connecting line | Grey #E5E7EB, 1 px | Full width at fixed position |

---

## Section 5 — Slide D — CAD Video + Manufacturing Gallery

> **Two messages on one slide:** (1) CAD motion study = designed with rigour. (2) Manufacturing photos + wire EDM video = built for real, in Egyptian workshops. Together: *production-readiness signal*.

### Moment 1 — CAD Motion Study Video (top 58% of slide)

| Property | Value |
|---|---|
| File name | `cad_motion_study.mp4` |
| Duration | ~50 sec original → plays at 1.5× speed = ~33 sec displayed |
| Placement | Centred horizontally, top 58% of slide. Rounded corners 12 px. Navy border 1.5 px. |
| Autoplay | **NO.** Custom gold play button overlay. Presenter clicks when ready. |
| Speed | `video.playbackRate = 1.5` triggered immediately on play. No controls bar visible. |
| After video ends | 3 callout annotations fade in (staggered, see below). |

#### Callout Annotations (fade in after video ends)

| # | Position | Icon | Text on Slide | Delay after end |
|---|---|---|---|---|
| 1 | Left of video | [M] | Modular plug-in interface — no permanent modification to the wheelchair | 0 ms |
| 2 | Below video centre | [S] | Scissor/pantograph linkage with gas struts — constant downforce on drive wheels | 300 ms |
| 3 | Right of video | [W] | 120 kg rated — each wheel independently follows the floor | 600 ms |

### Moment 2 — Manufacturing Gallery (bottom 38% of slide)

| Position | Type | File Name | Caption | Lightbox | Delay |
|---|---|---|---|---|---|
| Left (1/3) | Photo | `manufacturing_cnc.jpg` | CNC Milling | Open fullscreen | 500 ms |
| Centre (2/3) | Video clip | `manufacturing_wirecut_video.mp4` | Wire EDM | Autoplay inline, loops twice | 700 ms |
| Right (3/3) | Photo | `final_configuration.jpg` | Final Assembly | Open fullscreen | 900 ms |

> **Wire EDM video (3 sec):** Autoplays when thumbnail appears. Set to loop twice (~6 sec total). Listen for `ended` event, increment loop counter, replay if count < 2.

> **Bottom tagline** (centred, navy italic, fadeIn 1.2 s after photo strip):  
> *"Designed in Egypt. Machined in Egypt. Built for Egypt."*

---

## Section 6 — Asset Reference — All File Names

### Folder Structure

```
rafeeq_final.html
assets/mech/
  iter1_prototype.jpg
  iter2_steel_box.jpg
  iter3_flatbar_bracket.jpg
  iter4_cad_suspension_concept.png
  iter5_problem_misalignment.jpg
  final_configuration.jpg
  manufacturing_cnc.jpg
  manufacturing_wirecut.jpg
  motor_brushed_dc.jpg
  motor_stepper.jpg
  motor_servo_gearbox.jpg
  motor_bldc_hub.jpg
  cad_motion_study.mp4
  manufacturing_wirecut_video.mp4
```

### Complete Image List

| File Name | Used In | Description | Action |
|---|---|---|---|
| `iter1_prototype.jpg` | Slide C · Iter 1 | First prototype — old chair, aluminium extrusion with two vertical tubes | Already have |
| `iter2_steel_box.jpg` | Slide C · Iter 2 | Stainless steel box-section bracket on black surface | Already have |
| `iter3_flatbar_bracket.jpg` | Slide C · Iter 3 | Polished mild-steel flat bar T-bracket with crossbar rod | Already have |
| `iter4_cad_suspension_concept.png` | Slide C · Iter 4 | CAD render — two independent yellow BLDC hub motors, scissor linkage | Already have |
| `iter5_problem_misalignment.jpg` | Slide C · Iter 5 | Final chair on tiled floor — visible wheel camber/toe before correction | Already have |
| `final_configuration.jpg` | Slide C · Final & Slide D | Clean final chair rear view — both hub motors flat, gas struts | Already have |
| `manufacturing_cnc.jpg` | Slide D · Photo strip | CNC milling machine mid-operation, metal chips visible | **Rename:** `1781449010835_image.png` |
| `manufacturing_wirecut.jpg` | Slide D · Thumbnail | Wire EDM machine (blue frame), water bath visible | **Rename:** `1781449022102_image.png` |
| `motor_brushed_dc.jpg` | Slide B · Card 1 | Generic brushed DC motor, commutator visible | **Find online** |
| `motor_stepper.jpg` | Slide B · Card 2 | NEMA-17 or NEMA-23 stepper motor | **Find online** |
| `motor_servo_gearbox.jpg` | Slide B · Card 3 | Servo motor with gearbox | **Find online** |
| `motor_bldc_hub.jpg` | Slide B · Card 4 | YOUR 8-inch BLDC hoverboard hub motor | **Photograph it** |

### Video Assets

| File Name | Used In | Specs |
|---|---|---|
| `cad_motion_study.mp4` | Slide D · Top zone | ~50 sec · 1.5× playback · MP4 H.264 · Local host · No autoplay |
| `manufacturing_wirecut_video.mp4` | Slide D · Centre strip | 3 sec · Normal speed · Loops ×2 · MP4 H.264 · Local host |

---

## Section 7 — References & Sources

*For presenter's speaking notes. Most are not shown on screen; cite verbally when the committee asks.*

### Motor Selection References

**[58]** R. Krishnan, *Electric Motor Drives: Modeling, Analysis, and Control*. Prentice Hall, 2001. → Core reference for BLDC motor operating principles, FOC theory, and motor type comparison.

**[57]** K. J. Åström & T. Hägglund, *Advanced PID Control*. ISA, 2006. → PID controller theory underpinning FOC closed-loop control cited in criteria.

**[31]** ISO 7176-14:2008, *Wheelchairs — Part 14: Power and control systems for electrically powered wheelchairs*. ISO, Geneva, 2008. → ADA ramp compliance standard (1:12 slope) used in torque sizing calculation.

**[33]** ISO 13482:2014, *Robots and robotic devices — Safety requirements for personal care robots*. ISO, Geneva, 2014. → Safety factor 1.25 used in torque sizing derivation.

**[37]** EFeru, *Hoverboard Firmware Hack FOC*. GitHub, 2023. https://github.com/EFeru/hoverboard-firmware-hack-FOC. → FOC firmware on STM32F103RCT6. Source for 11 N·m at 15 A figure.

**[49]** R. A. Cooper, M. L. Boninger & A. Rentschler, "Evaluation of selected electric-powered wheelchairs using the ANSI/RESNA standards," *Archives of Physical Medicine and Rehabilitation*, vol. 80, no. 6, pp. 693–702, 1999. → Servo/gearbox rejection context; medical wheelchair standards.

**[40]** P. Vas, *Vector Control of AC Machines*. Oxford University Press, 1990. → FOC / vector control theoretical basis.

### Mechanical Design References

**[29]** ISO 7176-4:2008, *Wheelchairs — Part 4: Energy consumption of electric wheelchairs*. ISO, 2008.

**[46]** ISO 7176-14:2022, *Wheelchairs — Power and control systems*. ISO, 2022. → Speed compliance: N_MOT_MAX = 90 RPM.

**[47]** IEC 60364-5-52:2009, *Low-voltage electrical installations — Wiring systems*. IEC, 2009.

**[Thesis]** Team 06, "Mechanical Subsystem — Iterative Design Process," *GRADUATION_THEEESIS_Final_Version_2026*, pp. 77–84, 2026. → Primary source for all 5 iteration descriptions and test results.

---

## Section 8 — Technical Implementation Notes

### 8.1 Slide Insertion in rafeeq_final.html

Find `id="slide-9"` (dark divider). Insert 4 new slides after it: `slide-10, slide-11, slide-12, slide-13`. Renumber existing: 10→14, 11→15, …, 24→28. Update `#slide-counter` to "/28". Search JS for any hardcoded "24" and update.

### 8.2 Slide C Key Interception Logic

1. When Slide C becomes active: `window.inIterationMode = true; window.iterIndex = 0;`
2. In existing `keydown` handler: check `if (window.inIterationMode)` before calling next/prev slide.
3. `ArrowRight` → call `advanceIteration()`: increments `iterIndex`. If `iterIndex > 5`: set flag false, call `nextSlide()`.
4. `ArrowLeft` → call `prevIteration()`: decrements. If `iterIndex < 0`: set flag false, call `prevSlide()`.
5. Dot clicks: `goToIteration(n)` sets index directly.
6. On leaving Slide C: `window.inIterationMode = false; window.iterIndex = 0;`

### 8.3 CSS Card Flip (Slide B)

Container has class `flip-card` with `perspective: 1000px`. Inner div has class `flip-inner` with `transform-style: preserve-3d` and `transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)`. Two children: `flip-front` and `flip-back`, absolutely positioned with `backface-visibility: hidden`. The back starts at `transform: rotateY(180deg)`. Toggle class `flipped` on click. Show spec strip when all 4 cards have class `flipped`.

### 8.4 Video 1.5× Speed + Callout Trigger

On play button click: call `vid.play()` then immediately set `vid.playbackRate = 1.5`. Hide the play button overlay. On the `ended` event: use `setTimeout` to show callout 1 at 0 ms, callout 2 at 300 ms, callout 3 at 600 ms, manufacturing strip at 1100 ms, tagline at 1900 ms.

### 8.5 Wire EDM Video — Auto-loop-twice

Listen to `ended` event on `wirecut-video` element. Keep a counter. On first end (count = 1), call `play()` again. On second end (count = 2), stop. Gives ~6 seconds of viewing from a 3-second clip.

### 8.6 Brand Colour Tokens

| CSS Variable | Hex | Use |
|---|---|---|
| `--navy` | #0D1F3C | Dark slides, headers, nav bar, card fronts |
| `--teal / --gold` | #C9992A | All gold accents, timeline dots, borders, active badges |
| `--teal-light` | #E8B84B | Hover states, glow, spec strip text, eyebrow letters |
| `--coral / red` | #C94040 | REJECTED badges, rejected card backs, error states |
| `green` | #2E7D52 | SELECTED / VALIDATED badges, FINAL iteration dot |
| `amber` | #D97706 | PARTIAL / FIXED badges (Iterations 3 and 5) |
| `--muted / gray` | #9CA3AF | Inactive timeline dots, secondary text, captions |

---

*RAFEEQ SmartWheel · Team 06 · Zewail City of Science and Technology · CIE 598/599 · 2025/2026*
