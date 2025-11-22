// build.js
// Simple build script to prepare a `dist/` folder for Cloudflare Pages.
// - copies `index.html` into `dist/`
// - generates `file-index.json` into `dist/` by scanning the repo

const fs = require('fs');
const path = require('path');
const { buildIndex } = require('./generate_index');

const root = process.cwd();
const distDir = path.join(root, 'dist');

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

// copy index.html
fs.copyFileSync(path.join(root, 'index.html'), path.join(distDir, 'index.html'));

// build index and write to dist/file-index.json
const idx = buildIndex(root);
fs.writeFileSync(path.join(distDir, 'file-index.json'), JSON.stringify(idx, null, 2));

console.log('Built site to', distDir);
