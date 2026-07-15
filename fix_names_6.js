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
  
  let newContent = content.replace(/ArrowsIn/g, "ArrowsDown");
  newContent = newContent.replace(/ArrowsLeftRight/g, "ArrowSwapHorizontal2");

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log(`Fixed ${file}`);
  }
});
