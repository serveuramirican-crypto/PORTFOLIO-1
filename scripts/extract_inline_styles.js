const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const secDir = path.join(p2, 'reference_live', 'sections_html');

let allInlineStyles = '';
const files = fs.readdirSync(secDir);
files.forEach(f => {
  if (!f.endsWith('.html')) return;
  const content = fs.readFileSync(path.join(secDir, f), 'utf8');
  const styleMatches = [...content.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
  styleMatches.forEach(m => {
    allInlineStyles += `\n/* From ${f} */\n` + m[1] + '\n';
  });
});

fs.writeFileSync(path.join(p2, 'reference_live', 'extracted_section_styles.css'), allInlineStyles, 'utf8');
console.log(`Extracted ${allInlineStyles.length} characters of inline styles to extracted_section_styles.css`);

