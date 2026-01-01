# waQup Documentation

A comprehensive HTML-only documentation system for waQup with Mermaid diagram support, optimized for GitHub Pages hosting.

## 🌐 Viewing the Documentation

### GitHub Pages (Recommended)
Once GitHub Pages is enabled, view the documentation at:
**https://innerflect-tech.github.io/waqup-documentation/**

### View Locally
Simply open `docs/index.html` in your web browser to view the documentation locally.

## 🚀 Setting Up GitHub Pages

1. Go to your repository: https://github.com/InnerFlect-Tech/waqup-documentation
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/docs`
4. Click **Save**
5. Wait a few minutes for GitHub to build your site
6. Your documentation will be available at: `https://innerflect-tech.github.io/waqup-documentation/`

## Features

- 📝 **Self-Contained HTML Files**: All documentation is in standalone HTML files
- 🎨 **Beautiful Design**: Modern, responsive design with integrated styling
- 📊 **Mermaid Diagrams**: Full support for Mermaid diagrams rendered client-side
- 📑 **Navigation**: Built-in sidebar navigation for easy browsing
- 🌐 **GitHub Pages Ready**: Pre-configured for easy hosting
- 🚀 **No Build Required**: Pure HTML - no build system or dependencies needed

## Project Structure

```
waQup/
├── docs/                       # HTML documentation files (for GitHub Pages)
│   ├── index.html             # Main documentation page
│   ├── product-constitution.html
│   ├── scientific-foundations.html
│   ├── conversational-and-ritual-system.html
│   ├── ai-voice-and-ethics.html
│   ├── system-architecture.html
│   ├── value-and-growth-economy.html
│   ├── roadmap-and-releases.html
│   └── [subdirectories]/      # Organized content sections
└── README.md                  # This file
```

## Usage

### Viewing Documentation

1. **Online**: Visit your GitHub Pages URL once configured
2. **Locally**: Open `docs/index.html` in any modern web browser
3. **On GitHub**: Browse HTML files directly in the `docs/` folder

### Editing Documentation

1. Edit any HTML file directly in the `docs/` directory
2. All HTML files are self-contained with:
   - Complete styling
   - Navigation sidebar
   - Mermaid diagram support
   - Responsive design

### Mermaid Diagrams

Mermaid diagrams are supported via CDN and render automatically. Use code blocks with the `mermaid` language:

````html
<pre class="mermaid">
graph TD
    A[Start] --> B[Process]
    B --> C[End]
</pre>
````

Supported diagram types:
- Flowcharts
- Sequence diagrams
- Gantt charts
- Class diagrams
- State diagrams
- And more!

## 📚 Documentation Files

The repository contains comprehensive documentation covering:

- **Product Constitution**: Core identity and principles
- **Scientific Foundations**: Research basis and psychological grounding
- **Conversational & Ritual System**: How humans interact with the platform
- **AI Voice & Ethics**: Voice guidelines and ethical principles
- **System Architecture**: System design, APIs, and infrastructure
- **Value & Growth Economy**: Credits, tokens, and economic model
- **Roadmap & Releases**: Development timeline and releases

## 🔄 Updating Documentation

1. Edit HTML files directly in the `docs/` folder
2. Commit and push changes:
   ```bash
   git add docs/
   git commit -m "Update documentation"
   git push origin main
   ```
3. GitHub Pages will automatically update (may take a few minutes)

## 🤝 Contributing

1. Fork the repository
2. Make your changes to HTML files in `docs/`
3. Commit your changes
4. Push to your fork and create a Pull Request

## Notes

- All HTML files are self-contained - no external dependencies required
- Mermaid diagrams are rendered client-side using the Mermaid.js CDN
- The documentation is optimized for GitHub Pages hosting
- All styling and navigation is embedded within each HTML file
