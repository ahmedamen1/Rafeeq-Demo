const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  await page.addStyleTag({ content: 'html, body, #deck { width: 1920px !important; height: 1080px !important; overflow: hidden !important; }' });

  const filePath = 'file:///' + path.resolve('rafeeq_elevator_pitch.html').replace(/\\/g, '/');
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // hide logo bar
  await page.evaluate(() => {
    var lb = document.getElementById('logo-bar');
    if (lb) lb.style.display = 'none';
    // also hide chrome elements
    var prog = document.getElementById('progress');
    if (prog) prog.style.display = 'none';
    var lbl = document.getElementById('slide-label');
    if (lbl) lbl.style.display = 'none';
    var dots = document.getElementById('dots');
    if (dots) dots.style.display = 'none';
  });

  // activate slide 2 and force all elements visible
  await page.evaluate(() => {
    var s1 = document.getElementById('s1');
    var s2 = document.getElementById('s2');
    s1.classList.remove('active');
    s1.style.opacity = '0';
    s1.style.pointerEvents = 'none';
    s2.style.opacity = '1';
    s2.classList.add('active');
    s2.style.pointerEvents = 'all';

    // force every child element fully visible with no transform
    var all = s2.querySelectorAll('*');
    all.forEach(function(el) {
      el.style.transition = 'none';
      el.style.opacity = '1';
      el.style.transform = 'translate(0,0)';
      el.style.width = el.id === 's2-bar' ? '64px' : el.style.width;
    });
  });

  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: 'rafeeq_slide2_export.png',
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });
  await browser.close();
  console.log('Saved: rafeeq_slide2_export.png');
})();
