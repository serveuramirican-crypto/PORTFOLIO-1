const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./reference_bleame/exact_bleame_section.json', 'utf8'));

// Print the first 2500 characters of outerHTML
console.log('--- Bleame Section outerHTML (first 2500 chars) ---');
console.log(data.outerHTML.slice(0, 2500));

