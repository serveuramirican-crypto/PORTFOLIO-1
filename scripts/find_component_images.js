const fs = require('fs');
const path = require('path');

function searchFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      searchFiles(full);
    } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.match(/['"]\/(images|cdn|assets)[^'"]*['"]/g) || [];
      const shopifyMatches = content.match(/https:\/\/[^'"\s]*shopify[^'"\s]*/g) || [];
      const allMatches = [...matches, ...shopifyMatches];
      if (allMatches.length > 0) {
        console.log(f + ':');
        allMatches.forEach(m => console.log('  ' + m));
      }
    }
  }
}
searchFiles('components');
searchFiles('app');

