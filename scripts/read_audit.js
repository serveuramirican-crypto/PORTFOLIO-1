const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const audit = JSON.parse(fs.readFileSync(path.join(p2, 'reference_live', 'dom_audit.json'), 'utf8'));
console.log('DOM Audit:', audit);

