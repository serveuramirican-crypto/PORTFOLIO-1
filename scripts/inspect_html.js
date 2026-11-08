const fs = require('fs');
const html = fs.readFileSync('scripts/gorilla_full_main.html', 'utf8');

console.log('HTML total length:', html.length);

// Let's print the top-level children of the main container
// Let's replace the image URLs with our local asset URLs
const imagesMap = JSON.parse(fs.readFileSync('scripts/gorilla_images_map.json', 'utf8'));

let localHtml = html;
for (const [remote, local] of Object.entries(imagesMap)) {
  localHtml = localHtml.split(remote).join(local);
}

fs.writeFileSync('scripts/gorilla_local_main.html', localHtml);
console.log('Saved gorilla_local_main.html with local image paths!');

