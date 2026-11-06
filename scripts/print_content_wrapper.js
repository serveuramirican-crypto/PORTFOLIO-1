const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./reference_bleame/exact_bleame_section.json', 'utf8'));

const contentMatch = data.outerHTML.match(/<div class="[^"]*image-with-text__content-wrapper[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/);
if (contentMatch) {
  console.log('--- Content Wrapper HTML ---');
  console.log(contentMatch[0]);
} else {
  const textIdx = data.outerHTML.indexOf('Loving Their Bleame');
  console.log(data.outerHTML.slice(textIdx - 200, textIdx + 1500));
}

