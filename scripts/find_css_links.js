const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(
  path.join(__dirname, '../.agent/skills/website-duplicator/website-duplicator/mirror/products/comfort-stretch-smart-capri-pants-high-rise-all-day-comfort/index.html'),
  'utf8'
);

const links = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi)].map(m => m[0]);
console.log('Stylesheet links:', links);

