'use strict';
const fs   = require('fs');
const path = require('path');

const dir  = path.join(__dirname, 'src', 'slides');
const from = parseInt(process.argv[2]);
const to   = parseInt(process.argv[3]);

// Shift slides [from..to] up by 1, in reverse order to avoid collisions
for (let old = to; old >= from; old--) {
  const src = path.join(dir, `slide-${String(old).padStart(2,'0')}.html`);
  const dst = path.join(dir, `slide-${String(old+1).padStart(2,'0')}.html`);
  if (!fs.existsSync(src)) continue;

  let t = fs.readFileSync(src, 'utf8');
  const n = old, m = old + 1;
  const np = String(n).padStart(2,'0');
  const mp = String(m).padStart(2,'0');

  // id and data-slide
  t = t.replace(new RegExp(`data-slide="${n}"`, 'g'), `data-slide="${m}"`);
  t = t.replace(new RegExp(`id="slide-${np}"`, 'g'), `id="slide-${mp}"`);
  // window hook
  t = t.replace(new RegExp(`window\\._slide${np}\\b`, 'g'), `window._slide${mp}`);
  // timer variable — all occurrences of _tN (where N is the old number)
  t = t.replace(new RegExp(`\\b_t${n}\\b`, 'g'), `_t${m}`);
  // ca function
  t = t.replace(new RegExp(`\\bca${n}\\(\\)`, 'g'), `ca${m}()`);
  t = t.replace(new RegExp(`\\bfunction ca${n}\\b`, 'g'), `function ca${m}`);
  // hide function
  t = t.replace(new RegExp(`\\bhide${n}\\b`, 'g'), `hide${m}`);
  // CSS selector
  t = t.replace(new RegExp(`#slide-${np}\\s*\\{`, 'g'), `#slide-${mp} {`);
  // querySelector refs
  t = t.replace(new RegExp(`querySelector\\('#slide-${n}\\b`, 'g'), `querySelector('#slide-${m}`);
  t = t.replace(new RegExp(`querySelectorAll\\('#slide-${n}\\b`, 'g'), `querySelectorAll('#slide-${m}`);

  fs.writeFileSync(dst, t, 'utf8');
  fs.unlinkSync(src);
  console.log(`slide-${np} -> slide-${mp}`);
}
console.log('Done.');
