// generate_index.js
// 用于在本地（或 CI）扫描仓库并生成 file-index.json，供 `index.html` 在不使用 GitHub API 时读取。
// 使用：
//   node generate_index.js > file-index.json

const fs = require('fs');
const path = require('path');

function walk(dir, root){
  const items = fs.readdirSync(dir, { withFileTypes: true });
  const entries = [];
  for(const it of items){
    if(it.name === '.git' || it.name === 'node_modules') continue;
    const full = path.join(dir, it.name);
    const rel = path.relative(root, full).replace(/\\\\/g, '/');
    if(it.isDirectory()){
      entries.push({ name: it.name, type: 'dir', path: rel });
    } else if(it.isFile()){
      const stat = fs.statSync(full);
      entries.push({ name: it.name, type: 'file', path: rel, size: stat.size });
    }
  }
  return entries;
}

function buildIndex(root){
  const map = {};
  function recurse(cur){
    const real = path.join(root, cur);
    const list = walk(real, root);
    map[cur.replace(/\\\\/g, '/').replace(/^\\/+|\\/+$/g, '')] = list;
    for(const e of list){
      if(e.type === 'dir') recurse(path.join(cur, e.name));
    }
  }
  recurse('');
  return map;
}

if(require.main === module){
  const root = process.cwd();
  const idx = buildIndex(root);
  console.log(JSON.stringify(idx, null, 2));
}

module.exports = { buildIndex };
