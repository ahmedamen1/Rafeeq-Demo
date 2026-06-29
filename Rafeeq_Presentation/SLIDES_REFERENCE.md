# Rafeeq Presentation — Slide Reference Guide

**57 slides total** · Source files in `src/slides/slide-NN.html` (2-digit zero-padded, `NN` = 01–57) · Build: `node build.js` (run from `d:\Rafeeq_Presentation`, **not** from `src/slides`) → produces `rafeeq_final.html`

---

## How the Build Works

- `build.js` reads every file matching `src/slides/slide-\d\d.html`, sorts alphabetically, and concatenates them into `rafeeq_final.html`.
- `TOTAL` (slide count, used for the `01 / 51` counter and progress bar) is **computed automatically** from the number of files found — you never edit a hardcoded total.
- Each slide file is **self-contained**: its own `<div class="slide" id="slide-NN" data-slide="NN">`, its own `<style>` block (scoped with `#slide-NN { ... }` and `sNN-*` / unique-per-slide class prefixes), and its own `<script>` block.
- Each slide's script registers a lifecycle hook:
  ```js
  window._slideNN = {
    enter: function () { /* runs when slide becomes active — start animations */ },
    leave: function () { /* runs when leaving — clear timers, reset state */ },
    onNext: function () { /* OPTIONAL — return true to consume an ArrowRight/Space
                              press for internal pagination (multi-phase slides),
                              return false/omit to let the deck advance normally */ }
  };
  ```
- Rule of thumb: **no slide may reference another slide's CSS classes, element IDs, or JS globals.** Everything must be namespaced (e.g. `s19-*`, `ctrl3-*`, `_t19` for that slide's timer array) so slides can be reordered, duplicated, or deleted without breaking others.

### Rebuild after any edit
```bash
cd d:/Rafeeq_Presentation
node build.js
```
Output looks like: `✅  Built: rafeeq_final.html  (550.6 KB)  [51 slides]`. Then open `rafeeq_final.html` in a browser.

---

## Editing an Existing Slide

### Change text
Open `src/slides/slide-NN.html` and find the text directly in the HTML. All visible text is plain inline HTML — no templates, no data binding.

### Change an image or video
Find the `<img src="...">` or `<video src="...">` tag and replace the path. Paths are relative to the project root (where `rafeeq_final.html` lives), e.g. `Control Slides/rpi5.png`, `Mechanical Slides/cad_motion_study.mp4`. Subfolder paths with spaces are fine (already used throughout — e.g. `Control Slides/STM32 FOC Motor Driver.png`).

### Change animation timing
Each slide's `<script>` uses a small per-slide helper pattern:
```js
var _t19 = [];
function at(fn, ms) { _t19.push(setTimeout(fn, ms)); }
function ca19() { _t19.forEach(clearTimeout); _t19 = []; }
```
`enter()` calls `at(function(){ ... }, DELAY_MS)` for each staggered animation step. Increase `DELAY_MS` to delay longer, decrease to speed up. `leave()` calls `ca19()` (the slide's own clear-timers function) plus a `hideNN()` reset function that snaps every animated element back to its pre-enter (hidden) state with `transition:'none'`.

### Change animation style
Find the element by its `id`. Its inline style will have a hidden/initial state like `opacity:0;transform:translateY(24px);transition:none;`. The `at()` callback that animates it in sets:
```js
el.style.transition = 'opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1)';
el.style.opacity = '1';
el.style.transform = 'translateY(0)';
```
Change the duration (`0.55s`), easing, or the `translateX/Y` direction/distance to taste.

### Multi-phase / paginated slides (advanced)
Some slides (e.g. slide-19 voice state machine in older numbering, or any slide with internal "phases") use `onNext()` to intercept ArrowRight/Space and step through internal states before letting the deck move to the next slide. Pattern:
```js
window._slideNN = {
  enter: function(){ /* reset to phase 1, start animations */ },
  leave: function(){ /* clear timers, reset */ },
  onNext: function(){
    if (currentPhase < maxPhase) { currentPhase++; showPhase(currentPhase); return true; }
    return false; // let deck advance to next slide
  }
};
```
For **backward** navigation inside a multi-phase slide, intercept keydown directly with `document.addEventListener('keydown', handler, true)` + `e.stopImmediatePropagation()` (see slide-27, the TF2 transform tree slide, for a working example).

---

## Adding a New Slide

1. **Pick the insertion point** and decide the new slide's number `NN`. Every slide from `NN` onward (old numbering) must shift up by however many slides you're inserting.
2. **Shift existing slides out of the way FIRST, in REVERSE order** (highest number first) to avoid overwriting files that haven't moved yet:
   ```bash
   cd d:/Rafeeq_Presentation/src/slides
   # Example: inserting 1 new slide at position 30, current total 51 → new total 52
   # Shift 51→52, 50→51, ..., 30→31  (reverse order!)
   for old in $(seq 51 -1 30); do
     new=$(printf "%02d" $((old+1)))
     oldpad=$(printf "%02d" $old)
     sed -i "s/slide-${oldpad}/slide-${new}/g; s/_slide${oldpad}/_slide${new}/g; s/data-slide=\"${oldpad}\"/data-slide=\"${new}\"/g" "slide-${oldpad}.html"
     mv "slide-${oldpad}.html" "slide-${new}.html"
   done
   ```
   This rewrites every internal reference to that slide's own number (`id="slide-NN"`, `data-slide="NN"`, `#slide-NN { ... }` CSS, `window._slideNN`) and renames the file.
3. **Create the new file** `src/slides/slide-30.html` (in this example) with the structure:
   ```html
   <!-- ═══════════════════════════════════════════
        SLIDE 30 — <DESCRIPTIVE TITLE>
   ═══════════════════════════════════════════ -->
   <div class="slide" id="slide-30" data-slide="30" style="background:#0D1F3C; overflow:hidden;">
     <!-- content -->
   </div>
   <style>
   #slide-30 { background: #0D1F3C; }
   /* use a unique prefix, e.g. s30-* or t30-*, for ALL classes/ids in this slide */
   </style>
   <script>
   (function () {
     'use strict';
     var _t30 = [];
     function at(fn, ms) { _t30.push(setTimeout(fn, ms)); }
     function ca30() { _t30.forEach(clearTimeout); _t30 = []; }
     function q(id) { return document.getElementById(id); }
     function hide30() { /* reset all animated elements to hidden state */ }
     window._slide30 = {
       enter: function () { ca30(); hide30(); /* schedule animations via at() */ },
       leave: function () { ca30(); hide30(); }
     };
   })();
   </script>
   ```
4. **Rebuild and verify**: `node build.js` should report the new total. Run `grep -c "data-slide=" rafeeq_final.html` to confirm it equals the new total, and `grep -o "data-slide=\"[0-9]*\"" rafeeq_final.html` to confirm sequential numbering 1..N with no gaps or duplicates.
5. **Update this file's Slide Index table** (below) to reflect the new slide and any renumbered ones.

> Tip: for a new dark-themed slide, copy the visual conventions of an existing dark slide (e.g. slide-18 "CTRL-1 Section Transition" or slide-19 "CTRL-2 Architecture") — navy `#0D1F3C` background, dot-grid texture overlay, gold `#C9992A` eyebrow/accents, `'Inter',sans-serif` font stack, staggered `at()` entrance animations.

---

## Deleting a Slide

1. **Delete the file**: `rm src/slides/slide-NN.html`.
2. **Shift everything after it down by one, in ASCENDING order** (lowest number first this time, since you're closing a gap — opposite direction from inserting):
   ```bash
   cd d:/Rafeeq_Presentation/src/slides
   # Example: deleted slide-30, total was 51 → new total 50. Shift 31→30, 32→31, ..., 51→50
   for old in $(seq 31 51); do
     new=$(printf "%02d" $((old-1)))
     oldpad=$(printf "%02d" $old)
     sed -i "s/slide-${oldpad}/slide-${new}/g; s/_slide${oldpad}/_slide${new}/g; s/data-slide=\"${oldpad}\"/data-slide=\"${new}\"/g" "slide-${oldpad}.html"
     mv "slide-${oldpad}.html" "slide-${new}.html"
   done
   ```
3. **Rebuild and verify** as above (`node build.js`, check `data-slide=` sequence is gapless).
4. **Update the Slide Index table** in this file.

---

## Redesigning / Replacing a Slide's Content

If you're keeping the slide in the same position (same `NN`) but giving it entirely new content (this is how the Control section — slides 18–22 — was rebuilt):

1. Keep the file name, `id="slide-NN"`, `data-slide="NN"`, `#slide-NN { ... }` CSS selector, and `window._slideNN` hook name **unchanged**.
2. Replace everything inside the `<div id="slide-NN">`, the slide-specific `<style>` rules, and the `enter`/`leave`/`onNext` bodies.
3. Pick a **new unique class/id prefix** for the new content if the old prefix conflicted with anything (prefixes only need to be unique within the file, but using a fresh prefix avoids confusion when grepping).
4. Rebuild and verify with Playwright if the slide has video/animation — a quick headless check (load `rafeeq_final.html`, ArrowRight to the slide, screenshot, confirm visually) catches layout issues that a build success alone won't.

---

## Verification Checklist (after any structural change)

```bash
cd d:/Rafeeq_Presentation
node build.js                                              # must report correct [N slides]
grep -c "data-slide=" rafeeq_final.html                     # must equal N
grep -o "data-slide=\"[0-9]*\"" rafeeq_final.html | sort -t'"' -k2 -n -u   # 1..N, no gaps/dupes
```
For visual/animation changes, do a headless Playwright pass: launch Chromium at 1920×1080, load `rafeeq_final.html`, press ArrowRight repeatedly to the changed slide(s), screenshot, and review with the Read tool. Clean up temporary scripts/screenshots afterward.

---

## Slide Index

| # | File | Title | Section |
|---|------|-------|---------|
| 01 | `slide-01.html` | Cover — Rafeeq SmartWheel | Intro |
| 02 | `slide-02.html` | Agenda | Intro |
| 03 | `slide-03.html` | Transition: The Problem | Problem |
| 04 | `slide-04.html` | Problem Shot 1 — Isolation | Problem |
| 05 | `slide-05.html` | Problem Shot 2 — Waiting | Problem |
| 06 | `slide-06.html` | Problem Shot 3 — The Price | Problem |
| 07 | `slide-07.html` | Problem Shot 4 — One of Millions | Problem |
| 08 | `slide-08.html` | What Already Exists — Competitor Comparison | Problem |
| 09 | `slide-09.html` | Statement: The Technology Exists | Problem |
| 10 | `slide-10.html` | Introducing Rafeeq — 5-Feature Hub (Voice · Nav · Health · App · AI) | The Reveal |
| 11 | `slide-11.html` | Transition: Methodology | Methodology |
| 12 | `slide-12.html` | Mechanical — The Design Challenge | Mechanical |
| 13 | `slide-13.html` | Mechanical — Motor Selection (flip cards, 3 phases) | Mechanical |
| 14 | `slide-14.html` | Mechanical — 5 Iterations Timeline (6 states) | Mechanical |
| 15 | `slide-15.html` | Mechanical — CAD Motion Study + Manufacturing | Mechanical |
| 16 | `slide-16.html` | Electrical — Power & Safety System | Electrical |
| 17 | `slide-17.html` | Electrical — Full System Wiring Diagram | Electrical |
| 18 | `slide-18.html` | CTRL-1 — Control Subsystem Section Transition | Control |
| 19 | `slide-19.html` | CTRL-2 — Animated Pipeline + `control_pipeline.mp4` (centrepiece) | Control |
| 20 | `slide-20.html` | CTRL-3 — Novelty & Positioning (comparison table) | Control |
| 21 | `slide-21.html` | Voice Control — Model Training | Voice Control |
| 22 | `slide-22.html` | Voice Control — Wake-Word State Machine (Sleep → Action) | Voice Control |
| 23 | `slide-23.html` | Voice Control — Model Accuracy (per-command) | Voice Control |
| 24 | `slide-24.html` | Navigation — It Knows Where to Go | Navigation |
| 25 | `slide-25.html` | Navigation — System Architecture (ROS2 Node Graph) | Navigation |
| 26 | `slide-26.html` | Navigation — SLAM Toolbox: Mapping the Environment | Navigation |
| 27 | `slide-27.html` | Navigation — Nav2 Stack (Live Local Costmap) | Navigation |
| 28 | `slide-28.html` | Navigation — TF2 Transform Tree | Navigation |
| 29 | `slide-29.html` | Navigation — Demo 1: Live Simulation / RViz | Navigation |
| 30 | `slide-30.html` | Navigation — Demo 2: Full System Integration (Voice → Speech Node) | Navigation |
| 31 | `slide-31.html` | Mobile App — Splash / Login / Register | Mobile App Walkthrough |
| 32 | `slide-32.html` | Mobile App — Patient Home & Daily Check-in | Mobile App Walkthrough |
| 33 | `slide-33.html` | Mobile App — Alarms, Medications & Appointments | Mobile App Walkthrough |
| 34 | `slide-34.html` | Mobile App — AI Chatbot (RAG-Powered) | Mobile App Walkthrough |
| 35 | `slide-35.html` | Mobile App — Voice Assistant | Mobile App Walkthrough |
| 36 | `slide-36.html` | Mobile App — SOS Emergency | Mobile App Walkthrough |
| 37 | `slide-37.html` | Mobile App — Health Dashboard & Sensor Monitoring | Mobile App Walkthrough |
| 38 | `slide-38.html` | Mobile App — Caregiver Dashboard & Patient Management | Mobile App Walkthrough |
| 39 | `slide-39.html` | Mobile App — Reports, PDF & Analytics | Mobile App Walkthrough |
| 40 | `slide-40.html` | Mobile App — Linking System & Direct Chat | Mobile App Walkthrough |
| 41 | `slide-41.html` | Health Monitoring — The Why (The Problem) | Health |
| 42 | `slide-42.html` | Health — Full Architecture Pipeline | Health |
| 43 | `slide-43.html` | Health — Hardware Components (Cast of Characters) | Health |
| 44 | `slide-44.html` | Health — Working Prototype (MAX30100, MLX90614) | Health |
| 45 | `slide-45.html` | Health — Logic Flow (Firmware Flowchart) | Health |
| 46 | `slide-46.html` | Health — Calibration & the Cloud (Firebase) | Health |
| 47 | `slide-47.html` | Health — Caregiver Dashboard (Arabic App) | Health |
| 48 | `slide-48.html` | Health Monitoring — It Watches Over You (intro/recap) | Health |
| 49 | `slide-49.html` | Transition: See It in Action | Demo |
| 50 | `slide-50.html` | Live Demo | Demo |
| 51 | `slide-51.html` | Where We Are Today | Results |
| 52 | `slide-52.html` | What We Learned | Results |
| 53 | `slide-53.html` | Transition: What's Next | Future |
| 54 | `slide-54.html` | The Road Ahead (Future Vision) | Future |
| 55 | `slide-55.html` | Independence Statement | Closing |
| 56 | `slide-56.html` | The Team | Closing |
| 57 | `slide-57.html` | Thank You | Closing |

---

## Quick Edit Cheatsheet

| Goal | What to look for in the file |
|------|------------------------------|
| Change headline text | Find the large `font-size` div near the top of the HTML |
| Change eyebrow label | Find `letter-spacing:0.24em;text-transform:uppercase` (or `0.28em`/`0.32em`) |
| Change a color | Find the hex code, e.g. `#C9992A` (gold), `#C94040` (red), `#3B7DE8`/`#1B5FA6` (blue), `#27AE60` (green), `#0D1F3C` (navy) |
| Change animation delay | Find `at(function(){ ... }, NNN)` in `enter()` — change `NNN` ms |
| Change animation speed | Find `transition = 'opacity 0.55s ...'` — change `0.55s` |
| Change animation direction | Find `translateY(-16px)` / `translateX(-24px)` in the element's initial inline style |
| Swap an image/video | Find `<img src="...">` / `<video src="...">` and replace the path (subfolders OK, e.g. `Control Slides/...`, `Mechanical Slides/...`) |
| Add a new bullet/card | Duplicate an existing bullet/card `<div>` block, change text, add it to the relevant `enter()` animation stagger |
| Remove an element | Delete its wrapping `<div>` and remove its `at()` animation call (and any `hideNN()` reset entry) |
| Add a whole new slide | See **Adding a New Slide** above |
| Delete a whole slide | See **Deleting a Slide** above |
| Redesign a slide in place | See **Redesigning / Replacing a Slide's Content** above |
