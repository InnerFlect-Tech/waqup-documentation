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

// Define main documents with display order and grouping
// Maps markdown filename to slug, order, group, and description
const MAIN_DOCS = [
  { markdownFile: 'product-constitution.md', slug: 'product-constitution', order: 1, group: 'Foundation', description: 'Core identity and principles' },
  { markdownFile: 'scientific-foundations.md', slug: 'scientific-foundations', order: 2, group: 'Foundation', description: 'Research basis and psychological grounding' },
  { markdownFile: 'conversational-and-ritual-system.md', slug: 'conversational-and-ritual-system', order: 3, group: 'User Experience', description: 'How humans interact with the platform' },
  { markdownFile: 'ai-voice-and-ethics.md', slug: 'ai-voice-and-ethics', order: 4, group: 'User Experience', description: 'Voice guidelines and ethical principles' },
  { markdownFile: 'system-architecture.md', slug: 'system-architecture', order: 5, group: 'Technical', description: 'System design, APIs, and infrastructure' },
  { markdownFile: 'value-and-growth-economy.md', slug: 'value-and-growth-economy', order: 6, group: 'Business', description: 'Credits, tokens, and economic model' },
  { markdownFile: 'roadmap-and-releases.md', slug: 'roadmap-and-releases', order: 7, group: 'Planning', description: 'Development timeline and releases' }
];

// Group sub-documents by category (reference/archived documents)
// Maps markdown filenames to their group
const SUB_DOC_GROUPS = {
  'Archived — System Architecture': [
    '01-architecture-overview.md',
    '03-data-flow.md',
    '05-api-flow.md'
  ],
  'Archived — User Experience': [
    '02-features-workflows.md',
    '04-user-journey.md',
    'WAQUP_CONTENT_TYPES_AND_TAXONOMY.md'
  ],
  'Archived — Business': [
    'WAQUP_CREDITS_SYSTEM.md'
  ],
  'Archived — Planning': [
    '06-development-timeline.md'
  ]
};

// Get all markdown files
const allFiles = fs.readdirSync(contentDir)
  .filter(file => file.endsWith('.md'))
  .sort();

// Separate main docs and sub-docs
const mainDocs = [];
const subDocs = [];

allFiles.forEach(file => {
  const isMainDoc = MAIN_DOCS.some(doc => doc.markdownFile === file);
  if (isMainDoc) {
    mainDocs.push(file);
  } else {
    subDocs.push(file);
  }
});

// Sort main docs by order
mainDocs.sort((a, b) => {
  const aDoc = MAIN_DOCS.find(doc => doc.markdownFile === a);
  const bDoc = MAIN_DOCS.find(doc => doc.markdownFile === b);
  return (aDoc?.order || 999) - (bDoc?.order || 999);
});

console.log(`Found ${mainDocs.length} main documents and ${subDocs.length} sub-documents`);

// Process each markdown file and generate separate HTML pages
const pages = [];

// Helper function to generate hierarchical navigation
function generateNav(currentFile) {
  let nav = '';
  let currentGroup = null;
  
  // Main documents grouped by category
  for (const file of mainDocs) {
    const baseName = file.replace('.md', '');
    const docConfig = MAIN_DOCS.find(doc => doc.file === baseName);
    const group = docConfig?.group || 'Other';
    const slug = baseName.toLowerCase();
    
    // Add group header if group changed
    if (group !== currentGroup) {
      if (currentGroup !== null) {
        nav += '</ul></li>'; // Close previous group
      }
      nav += `<li class="nav-group"><span class="nav-group-title">${group}</span><ul class="nav-group-items">`;
      currentGroup = group;
    }
    
    const title = extractTitle(fs.readFileSync(path.join(contentDir, file), 'utf-8')) || file.replace('.md', '').replace(/_/g, ' ');
    const isActive = file === currentFile;
    nav += `<li><a href="${slug}.html" class="${isActive ? 'active' : ''}">${title}</a></li>`;
  }
  
  // Close last group
  if (currentGroup !== null) {
    nav += '</ul></li>';
  }
  
  // Sub-documents grouped by category (archived/reference)
  if (subDocs.length > 0) {
    nav += '<li class="nav-section"><span class="nav-section-title">Archived Reference</span></li>';
    
    for (const [groupName, groupFiles] of Object.entries(SUB_DOC_GROUPS)) {
      const groupSubDocs = subDocs.filter(file => {
        return groupFiles.includes(file);
      });
      
      if (groupSubDocs.length > 0) {
        nav += `<li class="nav-subgroup"><span class="nav-subgroup-title">${groupName}</span><ul class="nav-subgroup-items">`;
        
        for (const file of groupSubDocs) {
          const slug = file.replace('.md', '').toLowerCase().replace(/_/g, '-');
          const title = extractTitle(fs.readFileSync(path.join(contentDir, file), 'utf-8')) || file.replace('.md', '').replace(/-/g, ' ').replace(/_/g, ' ');
          const isActive = file === currentFile;
          nav += `<li><a href="${slug}.html" class="${isActive ? 'active' : ''}">${title}</a></li>`;
        }
        
        nav += '</ul></li>';
      }
    }
    
    // Handle any remaining sub-docs not in groups
    const groupedSubDocs = Object.values(SUB_DOC_GROUPS).flat();
    const remainingSubDocs = subDocs.filter(file => {
      return !groupedSubDocs.includes(file);
    });
    
    if (remainingSubDocs.length > 0) {
      nav += '<li class="nav-subgroup"><span class="nav-subgroup-title">Other</span><ul class="nav-subgroup-items">';
      for (const file of remainingSubDocs) {
        const slug = file.replace('.md', '').toLowerCase().replace(/_/g, '-');
        const title = extractTitle(fs.readFileSync(path.join(contentDir, file), 'utf-8')) || file.replace('.md', '').replace(/-/g, ' ').replace(/_/g, ' ');
        const isActive = file === currentFile;
        nav += `<li><a href="${slug}.html" class="${isActive ? 'active' : ''}">${title}</a></li>`;
      }
      nav += '</ul></li>';
    }
  }
  
  return nav;
}

// Process all files
for (const file of [...mainDocs, ...subDocs]) {
  const filePath = path.join(contentDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const html = md.render(content);
  const title = extractTitle(content) || file.replace('.md', '').replace(/-/g, ' ').replace(/_/g, ' ');
  
  // Use slug from MAIN_DOCS if it's a main doc, otherwise generate from filename
  const docConfig = MAIN_DOCS.find(doc => doc.markdownFile === file);
  const pageSlug = docConfig?.slug || file.replace('.md', '').toLowerCase().replace(/_/g, '-');
  const outputPath = path.join(outputDir, `${pageSlug}.html`);
  
  // Generate hierarchical navigation
  const navLinks = generateNav(file);
  
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
    filename: file
  });
}

// Generate index page
const indexNavLinks = generateNav(null);

const indexHtml = template
  .replace('<!-- PAGE_TITLE -->', 'waQup Documentation')
  .replace('<!-- NAV_LINKS -->', indexNavLinks)
  .replace('<!-- CONTENT_PLACEHOLDER -->', `
    <div class="index-content">
      <h1>waQup Documentation</h1>
      <p class="lead">Comprehensive documentation for the waQup voice-first ritual creation platform.</p>
      
      <div class="documentation-grid">
        ${mainDocs.map(file => {
          const docConfig = MAIN_DOCS.find(doc => doc.markdownFile === file);
          const title = extractTitle(fs.readFileSync(path.join(contentDir, file), 'utf-8')) || file.replace('.md', '').replace(/_/g, ' ');
          const slug = docConfig?.slug || file.replace('.md', '').toLowerCase().replace(/_/g, '-');
          const group = docConfig?.group || 'Other';
          const description = docConfig?.description || `View detailed documentation for ${title.toLowerCase()}.`;
          return `
            <div class="doc-card" data-group="${group}">
              <div class="doc-card-badge">${group}</div>
              <h2><a href="${slug}.html">${title}</a></h2>
              <p>${description}</p>
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
