const path = require('path');
const fs = require('fs');
const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  const videos = ['bleame_vid_1.mp4', 'bleame_vid_2.mp4', 'bleame_vid_3.mp4', 'bleame_vid_4.mp4', 'bleame_vid_5.mp4'];
  for (let i = 0; i < videos.length; i++) {
    const v = videos[i];
    const fullPath = path.resolve(__dirname, '../public/bleame_assets', v);
    if (!fs.existsSync(fullPath)) continue;
    
    // Load local file in page
    await page.setContent(`
      <html>
        <body style="margin:0; background:black;">
          <video id="vid" src="file://${fullPath.replace(/\\/g, '/')}" width="300" height="500" muted></video>
        </body>
      </html>
    `);

    await page.evaluate(() => {
      const vid = document.getElementById('vid');
      vid.currentTime = 1.0;
    });
    await page.waitForTimeout(500);

    const vidEl = await page.$('#vid');
    if (vidEl) {
      await vidEl.screenshot({ path: path.resolve(__dirname, `../reference_bleame/frame_${v}.png`) });
      console.log(`Saved frame_${v}.png`);
    }
  }

  await browser.close();
})();

