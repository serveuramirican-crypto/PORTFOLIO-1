const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const appDir = path.join(p2, 'app');
if (!fs.existsSync(appDir)) fs.mkdirSync(appDir, { recursive: true });

const sectionStyles = fs.readFileSync(path.join(p2, 'reference_live', 'extracted_section_styles.css'), 'utf8');

const baseCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --mo-ink: #1F1433;
  --mo-violet: #34205C;
  --mo-btn: #3B2366;
  --mo-violet-2: #4B2E83;
  --mo-lav: #EDE6F9;
  --mo-lav-50: #F7F4FC;
  --mo-line: #E6DFF3;
  --mo-muted: #6C6282;
  --mo-pink: #F2B8C6;
  --mo-pink-bg: #FBE7EE;
  --mo-pink-ink: #9B2E5A;
  --mo-gutter: 1.5rem;
  --color-foreground: 31, 20, 51;
  --color-background: 255, 255, 255;
  --font-body-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-heading-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

@media screen and (min-width: 750px) {
  :root {
    --mo-gutter: clamp(2rem, 4vw, 12rem);
  }
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  color: var(--mo-ink);
  background-color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* Base custom styles from mocosmetics.ma */
${sectionStyles}
`;

fs.writeFileSync(path.join(appDir, 'globals.css'), baseCss, 'utf8');
console.log('globals.css written successfully!');

