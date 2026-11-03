const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const nextBin = path.join(__dirname, '../node_modules/next/dist/bin/next');
const child = spawn(process.execPath, [nextBin, 'start', '-p', '4211'], {
  stdio: 'pipe',
  cwd: path.join(__dirname, '..'),
});

child.stdout.on('data', d => console.log('STDOUT:', d.toString()));
child.stderr.on('data', d => console.log('STDERR:', d.toString()));

let attempts = 0;
const poll = () => {
  attempts++;
  http.get('http://127.0.0.1:4211/products/comfort-stretch-smart-capri-pants-high-rise-all-day-comfort', res => {
    console.log('HTTP status:', res.statusCode);
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log('Received HTML bytes:', data.length);
      console.log('Has sb-why-we-made-this:', data.includes('sb-why-we-made-this'));
      console.log('Has sb-top3-reasons:', data.includes('sb-top3-reasons'));
      console.log('Has sb-cv-why-switch:', data.includes('sb-cv-why-switch'));
      child.kill();
      process.exit(0);
    });
  }).on('error', err => {
    if (attempts < 20) {
      setTimeout(poll, 1000);
    } else {
      console.error('Fetch error:', err.message);
      child.kill();
      process.exit(1);
    }
  });
};

setTimeout(poll, 1500);
