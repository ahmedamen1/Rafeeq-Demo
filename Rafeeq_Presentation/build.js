/**
 * Rafeeq Presentation — Build Script
 * ------------------------------------
 * Reads src/shared/*.css and src/slides/slide-*.html
 * and assembles them into a single rafeeq_final.html
 *
 * Usage:  node build.js
 * Output: rafeeq_final.html  (in project root)
 */

'use strict';
const fs   = require('fs');
const path = require('path');

const ROOT   = __dirname;
const SHARED = path.join(ROOT, 'src', 'shared');
const SLIDES = path.join(ROOT, 'src', 'slides');
const OUT    = path.join(ROOT, 'rafeeq_final.html');

function read(p) { return fs.readFileSync(p, 'utf8'); }
function css(f)  { return read(path.join(SHARED, f)); }

// Replace {{IMG:filename.ext}} tokens with relative paths
function embedImages(html) {
  return html.replace(/\{\{IMG:([^}]+)\}\}/g, (_, fname) => {
    const fpath = path.join(ROOT, fname.trim());
    if (!fs.existsSync(fpath)) { console.warn('  ⚠ missing image:', fpath); return ''; }
    return fname.trim();
  });
}

// 1. Collect slide HTML in order
const slideFiles = fs.readdirSync(SLIDES)
  .filter(f => /^slide-\d+\.html$/.test(f))
  .sort();

const TOTAL      = slideFiles.length;
const slidesHTML = slideFiles
  .map(f => embedImages(read(path.join(SLIDES, f))))
  .join('\n\n');

// 2. Presentation engine JS
const engineJS = `(function () {
  'use strict';

  const TOTAL        = ${TOTAL};
  let   current      = 0;
  let   transitioning= false;

  const slides      = Array.from(document.querySelectorAll('.slide'));
  const counter     = document.getElementById('slide-counter');
  const progressBar = document.getElementById('progress-bar');
  const btnPrev     = document.getElementById('btn-prev');
  const btnNext     = document.getElementById('btn-next');
  const hint        = document.getElementById('slide-hint');

  /* Lifecycle registry: each slide exposes window._slide01 = { enter, leave } */
  function callHook(idx, hook) {
    const key = '_slide' + String(idx + 1).padStart(2, '0');
    const mod = window[key];
    if (mod && typeof mod[hook] === 'function') {
      try { mod[hook](); } catch(e) { console.warn(key, hook, e); }
    }
  }

  /* Reset CSS animations so they replay on re-visit */
  function resetAnims(slideEl) {
    slideEl.querySelectorAll(
      '.au,.ai,.al,.ar,.as,.ap,.af,.s3-card,.s4-item,.s5-row,.s10-card,.s13-row,.s14-pillar,.s15-member'
    ).forEach(el => {
      el.style.animation = 'none';
      void el.offsetHeight;
      el.style.animation = '';
    });
  }

  /* Main transition function */
  function goTo(idx, dir) {
    if (transitioning || idx === current) return;
    if (idx < 0 || idx >= TOTAL) return;
    transitioning = true;

    const leaving  = slides[current];
    const entering = slides[idx];

    callHook(current, 'leave');
    resetAnims(leaving);

    // Snap entering slide into start position instantly (no-transition + reflow)
    entering.classList.add('no-transition');
    entering.classList.remove('active', 'entering-right', 'entering-left', 'leaving-left', 'leaving-right');
    entering.classList.add(dir > 0 ? 'entering-right' : 'entering-left');
    void entering.offsetHeight; // commit off-screen position before enabling transitions
    entering.classList.remove('no-transition');

    // Force another reflow so the browser registers the transition start correctly
    void entering.offsetHeight;

    // Trigger transition on both
    leaving.classList.remove('active');
    leaving.classList.add(dir > 0 ? 'leaving-left' : 'leaving-right');
    entering.classList.remove('entering-right', 'entering-left');
    entering.classList.add('active');

    setTimeout(() => {
      // Park the leaving slide off-screen instantly (no-transition) so it
      // doesn't drift back to center when the leaving class is removed.
      leaving.classList.add('no-transition');
      leaving.classList.remove('leaving-left', 'leaving-right');
      leaving.classList.add(dir > 0 ? 'entering-right' : 'entering-left');
      void leaving.offsetHeight;
      leaving.classList.remove('no-transition');
      transitioning = false;
    }, 580);

    current = idx;
    updateUI();
    callHook(current, 'enter');
    if (hint) hint.classList.add('hidden');
  }

  function updateUI() {
    const n   = current + 1;
    const pad = s => String(s).padStart(2, '0');
    counter.textContent   = pad(n) + ' / ' + pad(TOTAL);
    progressBar.style.width = ((n / TOTAL) * 100).toFixed(2) + '%';
  }

  /* Allow the active slide to intercept "Next" for its own step sequence
     before the deck advances to the next slide. */
  function goNext() {
    const key = '_slide' + String(current + 1).padStart(2, '0');
    const mod = window[key];
    if (mod && typeof mod.onNext === 'function' && mod.onNext()) return;
    goTo(current + 1, 1);
  }
  window.goNext = goNext;

  /* Keyboard navigation */
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') goNext();
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')                    goTo(current - 1, -1);
    if (e.key === 'Home') goTo(0,          -1);
    if (e.key === 'End')  goTo(TOTAL - 1,   1);
  });

  btnNext.addEventListener('click', goNext);
  btnPrev.addEventListener('click', () => goTo(current - 1, -1));

  /* Touch swipe */
  let tx = 0;
  document.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goNext(); else goTo(current - 1, -1);
    }
  }, { passive: true });

  /* Init: set all slides to off-screen right, activate slide 0 */
  slides.forEach((s, i) => {
    s.classList.add('no-transition');
    s.classList.remove('active', 'entering-right', 'entering-left');
    if (i === 0) {
      s.classList.add('active');
    } else {
      s.classList.add('entering-right');
    }
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      slides.forEach(s => s.classList.remove('no-transition'));
    });
  });

  updateUI();
  callHook(0, 'enter');
  setTimeout(() => { if (hint) hint.classList.add('hidden'); }, 5000);

})();`;

// 3. Assemble final HTML
const padTotal = String(TOTAL).padStart(2, '0');
const initPct  = (1 / TOTAL * 100).toFixed(2);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Rafeeq — AI-Powered Smart Wheelchair Retrofit Kit</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
<style>
/* ══ SHARED: Variables ══ */
${css('_vars.css')}

/* ══ SHARED: Animations ══ */
${css('_animations.css')}

/* ══ SHARED: Transitions ══ */
${css('_transitions.css')}

/* ══ SHARED: Layout ══ */
${css('_layout.css')}
</style>
</head>
<body>

<div id="progress-bar" style="width:${initPct}%"></div>
<div id="slide-hint">← → to navigate</div>

<div id="slides-wrapper">
${slidesHTML}
</div>

<div id="nav">
  <button class="nav-btn" id="btn-prev" aria-label="Previous slide">
    <i class="ti ti-chevron-left"></i>
  </button>
  <button class="nav-btn" id="btn-next" aria-label="Next slide">
    <i class="ti ti-chevron-right"></i>
  </button>
</div>

<div id="slide-counter">01 / ${padTotal}</div>

<script>
${engineJS}
<\/script>

</body>
</html>`;

// 4. Write output
fs.writeFileSync(OUT, html, 'utf8');
const kb = (fs.statSync(OUT).size / 1024).toFixed(1);
console.log(`✅  Built: rafeeq_final.html  (${kb} KB)  [${TOTAL} slides]`);
