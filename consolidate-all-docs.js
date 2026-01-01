import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, 'content');
const outputDir = path.join(__dirname, 'content');

// Helper to read file
function readFile(filename) {
  const filePath = path.join(contentDir, filename);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  }
  return null;
}

// Helper to extract section from markdown
function extractSection(content, startMarker, endMarker) {
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) return '';
  const endIdx = endMarker ? content.indexOf(endMarker, startIdx + startMarker.length) : content.length;
  if (endIdx === -1) return content.substring(startIdx);
  return content.substring(startIdx, endIdx);
}

// Update cross-references
function updateRefs(content) {
  return content
    .replace(/\[Content Types & Taxonomy\]\([^)]+\)/g, '[Content Types & Taxonomy](#content-types--taxonomy)')
    .replace(/\[Credits System\]\([^)]+\)/g, '[Credits System](#credits-system)')
    .replace(/\[Data Flow\]\([^)]+\)/g, '[Data Flow](#data-flow)')
    .replace(/\[API Flow\]\([^)]+\)/g, '[API Flow](#api-flow)')
    .replace(/\[Features & Workflows\]\([^)]+\)/g, '[Features & Workflows](#features--workflows)')
    .replace(/\[User Journey\]\([^)]+\)/g, '[User Journey](#user-journey)')
    .replace(/Product Constitution:([^\n]+)/g, '[Product Constitution](./WAQUP_PRODUCT_CONSTITUTION.md)$1')
    .replace(/System Architecture:([^\n]+)/g, '[System Architecture](./WAQUP_SYSTEM_ARCHITECTURE.md)$1')
    .replace(/Value & Growth Economy:([^\n]+)/g, '[Value & Growth Economy](./WAQUP_VALUE_AND_GROWTH_ECONOMY.md)$1')
    .replace(/Scientific Foundations:([^\n]+)/g, '[Scientific Foundations](./WAQUP_SCIENTIFIC_FOUNDATIONS.md)$1')
    .replace(/Conversational & Ritual System:([^\n]+)/g, '[Conversational & Ritual System](./WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md)$1')
    .replace(/AI Voice & Ethics:([^\n]+)/g, '[AI Voice & Ethics](./WAQUP_AI_VOICE_AND_ETHICS.md)$1');
}

console.log('Starting consolidation...\n');

// 1. System Architecture (consolidates architecture, data flow, API flow)
console.log('Creating WAQUP_SYSTEM_ARCHITECTURE.md...');
const archOverview = readFile('01-architecture-overview.md');
const dataFlow = readFile('03-data-flow.md');
const apiFlow = readFile('05-api-flow.md');

const systemArch = `# waQup System Architecture

**Document Domain**: HOW waQup is built (full stack, APIs, infrastructure, deployment)

**Related SSOT Documents**:
- [Product Constitution](./WAQUP_PRODUCT_CONSTITUTION.md): WHAT waQup is
- [Value & Growth Economy](./WAQUP_VALUE_AND_GROWTH_ECONOMY.md): HOW value circulates
- [Conversational & Ritual System](./WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md): HOW humans interact
- [AI Voice & Ethics](./WAQUP_AI_VOICE_AND_ETHICS.md): HOW waQup speaks

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Data Flow](#data-flow)
- [API Flow](#api-flow)
- [Technology Stack](#technology-stack)
- [Deployment](#deployment)
- [Observability](#observability)

---

${archOverview ? extractSection(archOverview, '## System Architecture', '## Data Architecture') : ''}

${dataFlow ? extractSection(dataFlow, '## Overview', '').replace('## Overview', '## Data Flow') : ''}

${apiFlow ? extractSection(apiFlow, '## API Architecture Overview', '').replace('## API Architecture Overview', '## API Flow') : ''}

${archOverview ? extractSection(archOverview, '## Data Architecture', '') : ''}
`;

fs.writeFileSync(path.join(outputDir, 'WAQUP_SYSTEM_ARCHITECTURE.md'), updateRefs(systemArch));
console.log('✓ Created WAQUP_SYSTEM_ARCHITECTURE.md\n');

// 2. Value & Growth Economy (consolidates credits system + token system)
console.log('Creating WAQUP_VALUE_AND_GROWTH_ECONOMY.md...');
const creditsSystem = readFile('WAQUP_CREDITS_SYSTEM.md');
const featuresWorkflows = readFile('02-features-workflows.md');

const tokenSection = featuresWorkflows ? extractSection(featuresWorkflows, '### 7. Token/Reward System', '## Ritual Creation Workflow') : '';

const valueEconomy = `# waQup Value & Growth Economy

**Document Domain**: HOW value, rewards, tokens, and growth circulate (economic + energetic system)

**Related SSOT Documents**:
- [Product Constitution](./WAQUP_PRODUCT_CONSTITUTION.md): WHAT waQup is
- [System Architecture](./WAQUP_SYSTEM_ARCHITECTURE.md): HOW waQup is built
- [Conversational & Ritual System](./WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md): HOW humans interact

---

## Table of Contents

- [Credits System](#credits-system)
- [Token/Reward System](#tokenreward-system)
- [Marketplace Economics](#marketplace-economics)
- [Revenue Distribution](#revenue-distribution)

---

## Credits System

${creditsSystem ? extractSection(creditsSystem, '## 1. Why Credits', '').replace(/^## /gm, '### ') : ''}

## Token/Reward System

${tokenSection || 'Token/Reward System details to be added.'}

## Marketplace Economics

*Marketplace economics details to be added.*

## Revenue Distribution

*Revenue distribution details to be added.*

`;

fs.writeFileSync(path.join(outputDir, 'WAQUP_VALUE_AND_GROWTH_ECONOMY.md'), updateRefs(valueEconomy));
console.log('✓ Created WAQUP_VALUE_AND_GROWTH_ECONOMY.md\n');

// 3. Conversational & Ritual System (consolidates content types, features, user journey)
console.log('Creating WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md...');
const contentTypes = readFile('WAQUP_CONTENT_TYPES_AND_TAXONOMY.md');
const userJourney = readFile('04-user-journey.md');

const conversationalSystem = `# waQup Conversational & Ritual System

**Document Domain**: HOW humans interact with waQup (state machines, ritual lifecycle)

**Related SSOT Documents**:
- [Product Constitution](./WAQUP_PRODUCT_CONSTITUTION.md): WHAT waQup is
- [System Architecture](./WAQUP_SYSTEM_ARCHITECTURE.md): HOW waQup is built
- [Scientific Foundations](./WAQUP_SCIENTIFIC_FOUNDATIONS.md): WHY waQup works

---

## Table of Contents

- [Content Types & Taxonomy](#content-types--taxonomy)
- [Features & Workflows](#features--workflows)
- [User Journey](#user-journey)
- [State Machine & Conversation Flow](#state-machine--conversation-flow)

---

## Content Types & Taxonomy

${contentTypes ? extractSection(contentTypes, '## Core Principle', '') : ''}

## Features & Workflows

${featuresWorkflows ? extractSection(featuresWorkflows, '## Core Features', '## Key Workflow Principles') : ''}

## User Journey

${userJourney ? extractSection(userJourney, '## Overview', '') : ''}

## State Machine & Conversation Flow

*State machine details to be added.*

`;

fs.writeFileSync(path.join(outputDir, 'WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md'), updateRefs(conversationalSystem));
console.log('✓ Created WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md\n');

// 4. Scientific Foundations (new document)
console.log('Creating WAQUP_SCIENTIFIC_FOUNDATIONS.md...');
const scientificFoundations = `# waQup Scientific Foundations

**Document Domain**: WHY waQup works (scientific & psychological grounding)

**Related SSOT Documents**:
- [Product Constitution](./WAQUP_PRODUCT_CONSTITUTION.md): WHAT waQup is
- [Conversational & Ritual System](./WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md): HOW humans interact
- [AI Voice & Ethics](./WAQUP_AI_VOICE_AND_ETHICS.md): HOW waQup speaks

---

## Overview

waQup is grounded in scientific research on:
- Nervous system regulation
- Embodied practice
- Voice prosody effects
- Identity encoding
- Cognitive re-patterning

*Detailed scientific foundations to be added.*

`;

fs.writeFileSync(path.join(outputDir, 'WAQUP_SCIENTIFIC_FOUNDATIONS.md'), scientificFoundations);
console.log('✓ Created WAQUP_SCIENTIFIC_FOUNDATIONS.md\n');

// 5. AI Voice & Ethics (new document)
console.log('Creating WAQUP_AI_VOICE_AND_ETHICS.md...');
const aiVoiceEthics = `# waQup AI Voice & Ethics

**Document Domain**: HOW waQup speaks and behaves ethically (tone, voice, moral boundaries)

**Related SSOT Documents**:
- [Product Constitution](./WAQUP_PRODUCT_CONSTITUTION.md): WHAT waQup is
- [System Architecture](./WAQUP_SYSTEM_ARCHITECTURE.md): HOW waQup is built
- [Scientific Foundations](./WAQUP_SCIENTIFIC_FOUNDATIONS.md): WHY waQup works

---

## Overview

waQup's voice and ethical principles guide:
- Voice tone and characteristics
- Ethical boundaries
- Data handling principles
- Privacy and consent
- User autonomy

*Detailed AI voice and ethics to be added.*

`;

fs.writeFileSync(path.join(outputDir, 'WAQUP_AI_VOICE_AND_ETHICS.md'), aiVoiceEthics);
console.log('✓ Created WAQUP_AI_VOICE_AND_ETHICS.md\n');

// 6. Roadmap (optional)
console.log('Creating WAQUP_ROADMAP_AND_RELEASES.md...');
const roadmap = readFile('06-development-timeline.md');
if (roadmap) {
  const roadmapDoc = `# waQup Roadmap & Releases

**Document Domain**: WHEN things ship and current development status

**Related SSOT Documents**:
- All other SSOT documents: This roadmap references features and systems defined in other documents

---

${extractSection(roadmap, '## Overview', '')}
`;
  fs.writeFileSync(path.join(outputDir, 'WAQUP_ROADMAP_AND_RELEASES.md'), updateRefs(roadmapDoc));
  console.log('✓ Created WAQUP_ROADMAP_AND_RELEASES.md\n');
}

console.log('Consolidation complete!');
console.log('\nCreated 6 main SSOT documents:');
console.log('1. WAQUP_PRODUCT_CONSTITUTION.md');
console.log('2. WAQUP_SYSTEM_ARCHITECTURE.md');
console.log('3. WAQUP_VALUE_AND_GROWTH_ECONOMY.md');
console.log('4. WAQUP_SCIENTIFIC_FOUNDATIONS.md');
console.log('5. WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md');
console.log('6. WAQUP_AI_VOICE_AND_ETHICS.md');
console.log('7. WAQUP_ROADMAP_AND_RELEASES.md (optional)');

