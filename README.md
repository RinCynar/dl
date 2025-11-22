# File Index (Material You style)

This repository contains a static front-end `index.html` that lists, previews and downloads files from the repository using the GitHub API, with a fallback to a locally generated `file-index.json`.

Main files:

- `index.html` — Material You style front-end page. Default behavior: list via the GitHub API; fallback: read `file-index.json`.
- `generate_index.js` — Node script to scan the repository and produce a `file-index.json` mapping for offline or private use.
- `build.js` and `package.json` — simple build step to produce a `dist/` folder containing `index.html` and `file-index.json` for deployment.

Local build (creates `dist/`):

```powershell
npm install   # optional, no dependencies required but good practice
npm run build
```

The `build` script copies `index.html` to `dist/` and generates `dist/file-index.json` by scanning the repository.

Manual generation (optional)

If you want to generate `file-index.json` locally (without running the full build):

```powershell
# from repository root
node generate_index.js > file-index.json
```

Then you can serve the files (for example with a simple static server) or commit `file-index.json` and let Pages publish it.

`file-index.json` example structure:

```json
{
  "": [
    { "name": "cla", "type": "dir", "path": "cla" },
    { "name": "README.md", "type": "file", "path": "README.md", "size": 123 }
  ],
  "cla": [
    { "name": "example.txt", "type": "file", "path": "cla/example.txt", "size": 45 }
  ]
}
```

If you want additional Cloudflare Pages integrations (e.g. secrets for GitHub authentication, or a nicer theme toggle control), tell me which option you prefer and I will add it.
# 文件索引 (Material You 风格)

这是为仓库 `dl` 提供的一个前端 `index.html`，用于自动索引、浏览并下载仓库内的文件。

主要文件：

- `index.html` — Material You 风格的前端页面，默认通过 GitHub API 列出仓库内容；也支持从本地 `file-index.json` 读取。
- `generate_index.js` — Node 脚本，用于在本地扫描仓库并生成 `file-index.json`（适用于私有仓库或离线场景）。

使用方式

1. 直接在 GitHub Pages 或任意静态服务器上托管 `index.html`（仓库为公共时即可工作）。
   - 页面会调用 GitHub API：`https://api.github.com/repos/RinCynar/dl/contents/...` 列出文件。
   - 点击「下载」会跳转到 `raw.githubusercontent.com` 的原始文件链接。

2. 若仓库为私有或不希望使用 GitHub API：
   - 在仓库根目录运行（需 Node.js）：

     ```powershell
     node generate_index.js > file-index.json
     ```

   - 将生成的 `file-index.json` 与 `index.html` 一起放到静态服务器根目录（或仓库根目录），然后在页面中点击右上角切换为 `local JSON`。

`file-index.json` 格式（示例）：

```json
{
  "": [
    { "name": "cla", "type": "dir", "path": "cla" },
    { "name": "README.md", "type": "file", "path": "README.md", "size": 123 }
  ],
  "cla": [
    { "name": "example.txt", "type": "file", "path": "cla/example.txt", "size": 45 }
  ]
}
```

注意事项

- GitHub API 有速率限制（未认证时较低），公共仓库通常能正常工作。若遇到 403，请生成并使用 `file-index.json`。
- 页面中一些路径/仓库信息被写死（`OWNER/REPO/BRANCH`），如需用于其它仓库，请编辑 `index.html` 顶部的配置常量。

如需我把 `index.html` 美化、增加文件预览（例如在侧栏直接显示文本或图片）、或支持分页/异步懒加载，请告诉我，我可以继续完善。