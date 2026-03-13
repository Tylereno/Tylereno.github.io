# AGENTS.md

## Cursor Cloud specific instructions

This is a purely static HTML/CSS portfolio website (no build system, no package manager, no backend, no tests, no linting).

### Serving the site locally

```
python3 -m http.server 8080
```

All 6 HTML pages (`index.html`, `ark.html`, `operations.html`, `ventures.html`, `journal.html`, `consultation.html`) are served from the repository root. Shared styles are in `styles.css`; `ark.html` uses its own inline styles.

### Key notes

- **No dependencies**: There is no `package.json`, `requirements.txt`, or any dependency file. Nothing needs to be installed.
- **No build step**: Files are served as-is. No compilation, bundling, or preprocessing.
- **No automated tests or linting**: The project has no test framework or linter configured.
- **CDN resources**: `index.html` loads Mermaid.js v10 from CDN for architecture diagrams. `ark.html` loads Google Fonts (JetBrains Mono, Inter) from CDN. These require internet access but pages degrade gracefully without them.
- **GitHub Pages**: The site is deployed via GitHub Pages with a custom domain configured in `CNAME` (`tylereno.me`).
