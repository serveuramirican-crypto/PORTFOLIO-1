const fs = require('fs');
const path = require('path');

const imgDir = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2\\public\\images';
for (let i = 24; i <= 31; i++) {
  const files = fs.readdirSync(imgDir).filter(f => f.startsWith(`asset_${i}`));
  console.log(`Asset ${i}:`, files.map(f => `${f} (${fs.statSync(path.join(imgDir, f)).size} bytes)`));
}

