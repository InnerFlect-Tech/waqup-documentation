import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, 'content');

// Map of old link patterns to new link patterns
const linkMappings = {
  // Old numbered docs to new main docs
  './01-architecture-overview.md': './waqup_system_architecture.html#architecture-overview',
  './03-data-flow.md': './waqup_system_architecture.html#data-flow',
  './05-api-flow.md': './waqup_system_architecture.html#api-flow',
  './02-features-workflows.md': './waqup_conversational_and_ritual_system.html#features-workflows',
  './04-user-journey.md': './waqup_conversational_and_ritual_system.html#user-journey',
  './06-development-timeline.md': './waqup_roadmap_and_releases.html#development-timeline',
  
  // WAQUP docs to HTML
  './WAQUP_PRODUCT_CONSTITUTION.md': './waqup_product_constitution.html',
  './WAQUP_SYSTEM_ARCHITECTURE.md': './waqup_system_architecture.html',
  './WAQUP_VALUE_AND_GROWTH_ECONOMY.md': './waqup_value_and_growth_economy.html',
  './WAQUP_SCIENTIFIC_FOUNDATIONS.md': './waqup_scientific_foundations.html',
  './WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md': './waqup_conversational_and_ritual_system.html',
  './WAQUP_AI_VOICE_AND_ETHICS.md': './waqup_ai_voice_and_ethics.html',
  './WAQUP_ROADMAP_AND_RELEASES.md': './waqup_roadmap_and_releases.html',
  './WAQUP_CREDITS_SYSTEM.md': './waqup_value_and_growth_economy.html#credits-system',
  './WAQUP_CONTENT_TYPES_AND_TAXONOMY.md': './waqup_conversational_and_ritual_system.html#content-types-taxonomy',
};

// Get all markdown files
const files = fs.readdirSync(contentDir)
  .filter(file => file.endsWith('.md'));

console.log(`Fixing links in ${files.length} files...`);

files.forEach(file => {
  const filePath = path.join(contentDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  // Fix markdown links
  for (const [oldLink, newLink] of Object.entries(linkMappings)) {
    const regex = new RegExp(`\\[([^\\]]+)\\]\\(${oldLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
    const newContent = content.replace(regex, `[$1](${newLink})`);
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  }
  
  // Also fix links without .md extension
  for (const [oldLink, newLink] of Object.entries(linkMappings)) {
    const oldLinkNoExt = oldLink.replace('.md', '');
    const regex = new RegExp(`\\[([^\\]]+)\\]\\(${oldLinkNoExt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
    const newContent = content.replace(regex, `[$1](${newLink})`);
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Fixed links in ${file}`);
  }
});

console.log('\n✓ Link fixing complete!');

