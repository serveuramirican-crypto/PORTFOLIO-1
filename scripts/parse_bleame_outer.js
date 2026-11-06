const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./reference_bleame/exact_bleame_section.json', 'utf8'));

console.log('Heading style:', data.headingStyle);
console.log('Button style:', data.buttonStyle);
console.log('Section style:', data.sectionStyle);

// Let's find all videos and images in outerHTML
const imgMatches = [...data.outerHTML.matchAll(/<img[^>]+src="([^">]+)"/g)].map(m => m[1]);
const videoMatches = [...data.outerHTML.matchAll(/<source[^>]+src="([^">]+)"|<video[^>]+src="([^">]+)"/g)].map(m => m[1] || m[2]);

console.log('Unique images:', Array.from(new Set(imgMatches)));
console.log('Unique videos:', Array.from(new Set(videoMatches)));

