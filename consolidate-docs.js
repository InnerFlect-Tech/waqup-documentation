import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, 'content');
const outputDir = path.join(__dirname, 'content-consolidated');

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read all existing files
function readFile(filename) {
  const filePath = path.join(contentDir, filename);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  }
  return null;
}

// Update cross-references in content
function updateReferences(content, docMap) {
  // Replace old document references with new structure
  const referenceMap = {
    'Content Types & Taxonomy': '[Content Types & Taxonomy](#content-types--taxonomy)',
    'Credits System': '[Credits System](#credits-system)',
    'Architecture Overview': '[Architecture Overview](#architecture-overview)',
    'Data Flow': '[Data Flow](#data-flow)',
    'API Flow': '[API Flow](#api-flow)',
    'Features & Workflows': '[Features & Workflows](#features--workflows)',
    'User Journey': '[User Journey](#user-journey)',
    'Product Constitution': '[Product Constitution](./WAQUP_PRODUCT_CONSTITUTION.md)',
    'System Architecture': '[System Architecture](./WAQUP_SYSTEM_ARCHITECTURE.md)',
    'Value & Growth Economy': '[Value & Growth Economy](./WAQUP_VALUE_AND_GROWTH_ECONOMY.md)',
    'Scientific Foundations': '[Scientific Foundations](./WAQUP_SCIENTIFIC_FOUNDATIONS.md)',
    'Conversational & Ritual System': '[Conversational & Ritual System](./WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md)',
    'AI Voice & Ethics': '[AI Voice & Ethics](./WAQUP_AI_VOICE_AND_ETHICS.md)',
  };
  
  let updated = content;
  for (const [oldRef, newRef] of Object.entries(referenceMap)) {
    // Replace references in "Related SSOT Documents" sections
    updated = updated.replace(new RegExp(`- ${oldRef}:`, 'g'), `- ${newRef}:`);
    updated = updated.replace(new RegExp(`see ${oldRef}`, 'gi'), `see ${newRef}`);
  }
  
  return updated;
}

// Consolidate System Architecture document
function createSystemArchitecture() {
  const archOverview = readFile('01-architecture-overview.md');
  const dataFlow = readFile('03-data-flow.md');
  const apiFlow = readFile('05-api-flow.md');
  
  let consolidated = `# waQup System Architecture

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

## Architecture Overview

${archOverview ? archOverview.split('## System Architecture')[1]?.split('## Data Architecture')[0] || '' : ''}

## Data Flow

${dataFlow ? dataFlow.split('## Overview')[1] || '' : ''}

## API Flow

${apiFlow ? apiFlow.split('## API Architecture Overview')[1] || '' : ''}

`;

  // Add remaining sections from architecture overview
  if (archOverview) {
    const remainingSections = archOverview.split('## Data Architecture')[1];
    if (remainingSections) {
      consolidated += remainingSections;
    }
  }
  
  return updateReferences(consolidated, {});
}

// Write consolidated document
const systemArch = createSystemArchitecture();
fs.writeFileSync(path.join(outputDir, 'WAQUP_SYSTEM_ARCHITECTURE.md'), systemArch);
console.log('✓ Created WAQUP_SYSTEM_ARCHITECTURE.md');

console.log('\nConsolidation complete! Review files in content-consolidated/');

