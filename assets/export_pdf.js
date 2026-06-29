'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const filePath = 'file://' + path.join(__dirname, 'rafeeq_final.html').replace(/\\/g, '/');
  const chromeCandidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  const execPath = chromeCandidates.find(p => fs.existsSync(p));
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: execPath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-color-profile=srgb']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.goto(filePath, { waitUntil: 'load' });

  // Disable transitions/animations and find total slide count
  const total = await page.evaluate(() => {
    return document.querySelectorAll('.slide').length;
  });
  console.log('Total slides:', total);

  const tmpDir = path.join(__dirname, '_pdf_tmp');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

  const pageFiles = [];

  for (let i = 0; i < total; i++) {
    // Use the deck's own goTo() via keyboard End/Home is unreliable; call internal fn directly.
    await page.evaluate((idx) => {
      // Reach into the closure-free globals the engine exposes via hooks only.
      // We replicate minimal nav: hide all slides, show target as 'active', call its enter().
      const slides = Array.from(document.querySelectorAll('.slide'));
      slides.forEach((s, j) => {
        s.classList.remove('active','entering-right','entering-left','leaving-left','leaving-right');
        s.classList.add('no-transition');
        if (j === idx) {
          s.classList.add('active');
        } else {
          s.classList.add('entering-right');
        }
      });
      const key = '_slide' + String(idx + 1).padStart(2, '0');
      const mod = window[key];
      if (mod && typeof mod.enter === 'function') {
        try { mod.enter(); } catch (e) { console.warn(key, e); }
      }
    }, i);

    // Wait for enter animations (most use ~600-900ms staggered delays)
    await new Promise(r => setTimeout(r, 1300));

    const outPath = path.join(tmpDir, `slide-${String(i + 1).padStart(2, '0')}.pdf`);
    await page.pdf({
      path: outPath,
      width: '1920px',
      height: '1080px',
      printBackground: true,
      pageRanges: '1',
      margin: { top: 0, bottom: 0, left: 0, right: 0 }
    });
    pageFiles.push(outPath);
    console.log('Captured slide', i + 1, '/', total);
  }

  await browser.close();

  // Merge all single-page PDFs into one
  const { PDFDocument } = require('pdf-lib');
  const merged = await PDFDocument.create();
  for (const f of pageFiles) {
    const bytes = fs.readFileSync(f);
    const src = await PDFDocument.load(bytes);
    const [copiedPage] = await merged.copyPages(src, [0]);
    merged.addPage(copiedPage);
  }
  const mergedBytes = await merged.save();
  fs.writeFileSync(path.join(__dirname, 'Rafeeq_Presentation.pdf'), mergedBytes);

  // Cleanup tmp
  for (const f of pageFiles) fs.unlinkSync(f);
  fs.rmdirSync(tmpDir);

  console.log('Done: Rafeeq_Presentation.pdf');
})();
