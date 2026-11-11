const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const destDir = path.resolve(__dirname, '../public/curvd_assets/pdp2');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const assets = [
  { name: 'hero_1.jpg', url: 'https://desmondanddempsey.com/cdn/shop/files/240507_D_D_SS24_SHOT_17_024.jpg?v=1726243973&width=2000' },
  { name: 'hero_2.jpg', url: 'https://desmondanddempsey.com/cdn/shop/files/240507_D_D_SS24_SHOT_17_039.jpg?v=1726247548&width=2000' },
  { name: 'hero_3.jpg', url: 'https://desmondanddempsey.com/cdn/shop/files/240507_D_D_SS24_SHOT_17_045.jpg?v=1726243948&width=2000' },
  { name: 'hero_4.jpg', url: 'https://desmondanddempsey.com/cdn/shop/files/240507_D_D_SS24_SHOT_17_054.jpg?v=1726243938&width=2000' },
  { name: 'hero_5.jpg', url: 'https://desmondanddempsey.com/cdn/shop/files/240507_D_D_SS24_SHOT_17_063.jpg?v=1726243877&width=2000' },
  { name: 'hero_6.jpg', url: 'https://desmondanddempsey.com/cdn/shop/files/Alpine-01LR.jpg?v=1726243813&width=2000' },
  { name: 'cYZLNDj.jpg', url: 'https://i.imgur.com/cYZLNDj.jpeg' },
  { name: 'flY5KEn.jpg', url: 'https://i.imgur.com/flY5KEn.jpeg' },
  { name: 'kD8xFri.jpg', url: 'https://i.imgur.com/kD8xFri.jpeg' },
  { name: 'EUchV7A.jpg', url: 'https://i.imgur.com/EUchV7A.jpeg' },
  { name: 'nihKxOE.jpg', url: 'https://i.imgur.com/nihKxOE.jpeg' },
  { name: 'bCAFICI.jpg', url: 'https://i.imgur.com/bCAFICI.jpeg' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;

    const request = (currentUrl) => {
      client.get(currentUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://desmondanddempsey.com/'
        }
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return request(res.headers.location);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed to download ${currentUrl}: Status ${res.statusCode}`));
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    };

    request(url);
  });
}

async function run() {
  for (const item of assets) {
    const filePath = path.join(destDir, item.name);
    console.log(`Downloading ${item.name} from ${item.url}...`);
    try {
      await download(item.url, filePath);
      const stat = fs.statSync(filePath);
      console.log(`✓ Saved ${item.name} (${stat.size} bytes)`);
    } catch (e) {
      console.error(`✗ Error downloading ${item.name}: ${e.message}`);
    }
  }
}

run();

