const fs = require('fs');
const path = require('path');

const cssPath = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2\\reference_live\\extracted_section_styles.css';
const css = fs.readFileSync(cssPath, 'utf8');

const classMatches = [...css.matchAll(/\.mo-[a-zA-Z0-9_-]+/g)].map(m => m[0]);
const uniqueClasses = [...new Set(classMatches)];
console.log('Top unique mo- classes in CSS:');
console.log(uniqueClasses.slice(0, 50).join(', '));

