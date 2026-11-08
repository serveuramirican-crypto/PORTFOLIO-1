const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.resolve(__dirname, '../public/desmond_assets');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const videoTargetDir = path.resolve(__dirname, '../public/customer_videos');
if (!fs.existsSync(videoTargetDir)) {
  fs.mkdirSync(videoTargetDir, { recursive: true });
}

// 1. Copy local video files
const sourceVideoDir = path.resolve(__dirname, '../components/ProductHero/videos as');
if (fs.existsSync(sourceVideoDir)) {
  const videoFiles = fs.readdirSync(sourceVideoDir).filter(f => f.endsWith('.mp4'));
  console.log('Found video files:', videoFiles);
  videoFiles.forEach((file, index) => {
    const src = path.join(sourceVideoDir, file);
    const dest = path.join(videoTargetDir, `video_${index + 1}.mp4`);
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} -> ${dest}`);
  });
} else {
  console.error('Source video dir not found:', sourceVideoDir);
}

// 2. Download Desmond & Dempsey images
const images = [
  'https://desmondanddempsey.com/cdn/shop/files/260819_D_D_SHOT_126_7644.jpg?v=1787833232&width=2000',
  'https://desmondanddempsey.com/cdn/shop/files/260819_D_D_SHOT_126_7655.jpg?v=1787833232&width=2000',
  'https://desmondanddempsey.com/cdn/shop/files/260819_D_D_SHOT_126_7662.jpg?v=1787833232&width=2000',
  'https://desmondanddempsey.com/cdn/shop/files/260819_D_D_SHOT_126_7669.jpg?v=1787833232&width=2000',
  'https://desmondanddempsey.com/cdn/shop/files/260819_D_D_SHOT_126_7679.jpg?v=1787833232&width=2000',
  'https://desmondanddempsey.com/cdn/shop/files/260819_D_D_SHOT_126_7700.jpg?v=1787833231&width=2000',
  'https://desmondanddempsey.com/cdn/shop/products/Desmond-and-Dempsey-Long-Pyjama-Set-The-Jag-Print-Cream-Cutout.jpg?v=1693912591&width=2000'
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (let i = 0; i < images.length; i++) {
    const dest = path.join(targetDir, `desmond_img_${i + 1}.jpg`);
    console.log(`Downloading image ${i + 1}/${images.length}...`);
    try {
      await download(images[i], dest);
      console.log(`Saved: ${dest}`);
    } catch (err) {
      console.error(`Failed to download ${images[i]}:`, err.message);
    }
  }
  console.log('All downloads finished!');
}

run();

