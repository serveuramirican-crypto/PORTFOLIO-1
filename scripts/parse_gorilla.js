const fs = require('fs');
const html = fs.readFileSync('scripts/gorilla_local_main.html', 'utf8');

// Let's analyze the outer structure:
// <main><div class="min-h-screen bg-white"><div class="w-full max-w-[1440px] mx-auto px-0 sm:px-6 lg:px-8 py-0 sm:py-6">
//   <div class="flex flex-col lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
//     <div class="w-full lg:w-[58%] xl:w-[60%]"> -> LEFT (GALLERY)
//     <div class="w-full lg:w-[42%] xl:w-[40%]"> -> RIGHT (BUYBOX + DETAILS)
// And below the flex row or inside it: are there accordions? Let's check where the accordions are located.

const leftStart = html.indexOf('<div class="w-full lg:w-[58%]');
const rightStart = html.indexOf('<div class="w-full lg:w-[42%]');

console.log('leftStart:', leftStart, 'rightStart:', rightStart);

const rightHtml = html.substring(rightStart);
console.log('Right column snippet (first 1000 chars):');
console.log(rightHtml.substring(0, 1000));

// Check where "Get The Look" is
console.log('Get The Look index:', html.indexOf('Get The Look'));

// Check where accordions like "Designed For" are
console.log('Designed For index:', html.indexOf('Designed For'));
console.log('Features & Fabric index:', html.indexOf('Features &amp; Fabric'));

