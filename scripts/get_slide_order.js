const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./reference_bleame/exact_bleame_section.json', 'utf8'));

// Search for all slide items
const regex = /<div class="[^"]*marquee-poster-(item|image|video)[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
let match;
const slides = [];
while ((match = regex.exec(data.outerHTML)) !== null) {
  const content = match[0];
  const isVideo = content.includes('<video') || content.includes('<source');
  const isImg = content.includes('<img');
  const videoSrc = content.match(/src="([^"]+\.mp4[^"]*)"/)?.[1] || '';
  const imgSrc = content.match(/<img[^>]+src="([^"]+)"/)?.[1] || '';
  slides.push({ isVideo, isImg, videoSrc, imgSrc });
}

console.log('Total slides in DOM:', slides.length);
slides.forEach((s, idx) => {
  console.log(`Slide ${idx + 1}: ${s.isVideo ? 'VIDEO: ' + s.videoSrc : 'IMAGE: ' + s.imgSrc}`);
});

