import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import MarkdownIt from 'markdown-it';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize markdown-it with options
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false
});

// Custom renderer for mermaid code blocks
const defaultFence = md.renderer.rules.fence || function(tokens, idx, options, env, renderer) {
  return renderer.renderToken(tokens, idx, options);
};

md.renderer.rules.fence = function(tokens, idx, options, env, renderer) {
  const token = tokens[idx];
  const info = token.info ? token.info.trim() : '';
  
  if (info === 'mermaid') {
    return `<div class="mermaid-container"><pre class="mermaid">${token.content}</pre></div>\n`;
  }
  
  return defaultFence(tokens, idx, options, env, renderer);
};

// Read HTML template
const templatePath = path.join(__dirname, 'template.html');
const template = fs.readFileSync(templatePath, 'utf-8');

// Directory containing markdown files
const contentDir = path.join(__dirname, 'content');
const outputDir = path.join(__dirname, 'docs');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Define main documents (6 SSOT documents)
const MAIN_DOCS = [
  'WAQUP_PRODUCT_CONSTITUTION',
  'WAQUP_SYSTEM_ARCHITECTURE',
  'WAQUP_VALUE_AND_GROWTH_ECONOMY',
  'WAQUP_SCIENTIFIC_FOUNDATIONS',
  'WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM',
  'WAQUP_AI_VOICE_AND_ETHICS',
  'WAQUP_ROADMAP_AND_RELEASES' // Optional 7th document
];

// Get all markdown files
const allFiles = fs.readdirSync(contentDir)
  .filter(file => file.endsWith('.md'))
  .sort();

// Separate main docs and sub-docs
const mainDocs = [];
const subDocs = [];

allFiles.forEach(file => {
  const baseName = file.replace('.md', '');
  if (MAIN_DOCS.includes(baseName)) {
    mainDocs.push(file);
  } else {
    subDocs.push(file);
  }
});

console.log(`Found ${mainDocs.length} main documents and ${subDocs.length} sub-documents`);

// Process each markdown file and generate separate HTML pages
const pages = [];

// Process main documents first
for (const file of mainDocs) {
  const filePath = path.join(contentDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const html = md.render(content);
  const title = extractTitle(content) || file.replace('.md', '').replace(/_/g, ' ');
  
  const pageSlug = file.replace('.md', '').toLowerCase();
  const outputPath = path.join(outputDir, `${pageSlug}.html`);
  
  // Generate hierarchical navigation
  const navLinks = generateHierarchicalNav(mainDocs, subDocs, file);
  
  // Replace placeholders in template
  const pageHtml = template
    .replace('<!-- PAGE_TITLE -->', title)
    .replace('<!-- NAV_LINKS -->', navLinks)
    .replace('<!-- CONTENT_PLACEHOLDER -->', html);
  
  // Write individual page
  fs.writeFileSync(outputPath, pageHtml, 'utf-8');
  console.log(`✓ Generated ${outputPath}`);
  
  pages.push({
    slug: pageSlug,
    title: title,
    filename: file,
    isMain: true
  });
}

// Process sub-documents
for (const file of subDocs) {
  const filePath = path.join(contentDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const html = md.render(content);
  const title = extractTitle(content) || file.replace('.md', '').replace(/-/g, ' ');
  
  const pageSlug = file.replace('.md', '').toLowerCase();
  const outputPath = path.join(outputDir, `${pageSlug}.html`);
  
  // Generate hierarchical navigation
  const navLinks = generateHierarchicalNav(mainDocs, subDocs, file);
  
  // Replace placeholders in template
  const pageHtml = template
    .replace('<!-- PAGE_TITLE -->', title)
    .replace('<!-- NAV_LINKS -->', navLinks)
    .replace('<!-- CONTENT_PLACEHOLDER -->', html);
  
  // Write individual page
  fs.writeFileSync(outputPath, pageHtml, 'utf-8');
  console.log(`✓ Generated ${outputPath}`);
  
  pages.push({
    slug: pageSlug,
    title: title,
    filename: file,
    isMain: false
  });
}

// Generate index page
const indexNavLinks = generateHierarchicalNav(mainDocs, subDocs, null);
const indexHtml = template
  .replace('<!-- PAGE_TITLE -->', 'waQup Documentation')
  .replace('<!-- NAV_LINKS -->', indexNavLinks)
  .replace('<!-- CONTENT_PLACEHOLDER -->', `
    <div class="index-content">
      <h1>waQup Documentation</h1>
      <p class="lead">Comprehensive documentation for the waQup voice-first ritual creation platform.</p>
      
      <div class="documentation-grid">
        ${mainDocs.map(file => {
          const title = extractTitle(fs.readFileSync(path.join(contentDir, file), 'utf-8')) || file.replace('.md', '').replace(/_/g, ' ');
          const slug = file.replace('.md', '').toLowerCase();
          return `
            <div class="doc-card">
              <h2><a href="${slug}.html">${title}</a></h2>
              <p>View detailed documentation for ${title.toLowerCase()}.</p>
              <a href="${slug}.html" class="doc-link">Read More →</a>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `);

const indexPath = path.join(outputDir, 'index.html');
fs.writeFileSync(indexPath, indexHtml, 'utf-8');
console.log(`✓ Generated ${indexPath}`);

console.log(`\n✓ Successfully built ${pages.length} documentation pages`);
console.log(`  Output directory: ${outputDir}`);

// Helper function to extract title from markdown
function extractTitle(content) {
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      return trimmed.substring(2).trim();
    }
  }
  return null;
}

// Generate hierarchical navigation
function generateHierarchicalNav(mainDocs, subDocs, currentFile) {
  let nav = '';
  
  // Main documents section
  nav += '<li class="nav-section"><span class="nav-section-title">Main Documents</span></li>';
  
  for (const file of mainDocs) {
    const slug = file.replace('.md', '').toLowerCase();
    const title = extractTitle(fs.readFileSync(path.join(contentDir, file), 'utf-8')) || file.replace('.md', '').replace(/_/g, ' ');
    const isActive = file === currentFile;
    nav += `<li><a href="${slug}.html" class="${isActive ? 'active' : ''}">${title}</a></li>`;
  }
  
  // Sub-documents section (if any)
  if (subDocs.length > 0) {
    nav += '<li class="nav-section"><span class="nav-section-title">Reference</span></li>';
    
    for (const file of subDocs) {
      const slug = file.replace('.md', '').toLowerCase();
      const title = extractTitle(fs.readFileSync(path.join(contentDir, file), 'utf-8')) || file.replace('.md', '').replace(/-/g, ' ');
      const isActive = file === currentFile;
      nav += `<li><a href="${slug}.html" class="${isActive ? 'active' : ''}">${title}</a></li>`;
    }
  }
  
  return nav;
}
