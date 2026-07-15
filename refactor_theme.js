const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src/app/tool');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    const replacements = [
        { regex: /bg-\[#1a1a1a\]/g, replacement: 'bg-white' },
        { regex: /bg-\[#1e1e1e\]/g, replacement: 'bg-white' },
        { regex: /bg-\[#252526\]/g, replacement: 'bg-gray-50' },
        { regex: /bg-\[#2d2d2d\]/g, replacement: 'bg-gray-50' },
        { regex: /border-\[#333\]/g, replacement: 'border-gray-200' },
        { regex: /border-\[#444\]/g, replacement: 'border-gray-200' },
        { regex: /border-black/g, replacement: 'border-gray-200' },
        { regex: /border-gray-800/g, replacement: 'border-gray-200' },
        { regex: /text-white/g, replacement: 'text-gray-800' },
        { regex: /text-gray-400/g, replacement: 'text-gray-500' },
        { regex: /text-gray-300/g, replacement: 'text-gray-500' },
        { regex: /bg-vscode-bg/g, replacement: 'bg-white' },
        { regex: /theme="dark"/g, replacement: 'theme="light"' }
    ];

    let newContent = content;
    replacements.forEach(r => {
        newContent = newContent.replace(r.regex, r.replacement);
    });

    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else if (file === 'page.tsx' || file.endsWith('.tsx')) {
            replaceInFile(fullPath);
        }
    });
}

traverseDir(directoryPath);
console.log('Refactoring complete.');
