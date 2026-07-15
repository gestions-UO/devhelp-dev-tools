const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const files = [];
walkDir('src', (f) => {
  if (f.endsWith('.tsx') || f.endsWith('.ts')) files.push(f);
});

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace invalid icons
  let newContent = content.replace(/WarningCircle/g, "TriangleWarning");
  newContent = newContent.replace(/MapPin/g, "MapPoint");
  newContent = newContent.replace(/PencilSimple/g, "Pen");

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log(`Fixed ${file}`);
  }
});
