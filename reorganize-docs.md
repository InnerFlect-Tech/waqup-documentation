# Documentation Reorganization Plan

## 6 Main Documents Structure

### 1. WAQUP_PRODUCT_CONSTITUTION.md
**Status**: ✅ Already exists
**Content**: WHAT waQup is (identity, invariants, boundaries)
**Sub-sections**: None needed

### 2. WAQUP_SYSTEM_ARCHITECTURE.md  
**Status**: ✅ Already exists, needs merging
**Content**: HOW waQup is built
**Merge from**:
- 01-architecture-overview.md → Architecture Overview section
- 03-data-flow.md → Data Flow section  
- 05-api-flow.md → API Flow section

### 3. WAQUP_VALUE_AND_GROWTH_ECONOMY.md
**Status**: ✅ Already exists
**Content**: Economic system
**Sub-sections**: Credits System (already included)

### 4. WAQUP_SCIENTIFIC_FOUNDATIONS.md
**Status**: ✅ Already exists
**Content**: WHY waQup works
**Sub-sections**: None needed

### 5. WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md
**Status**: ✅ Already exists, needs merging
**Content**: HOW humans interact
**Merge from**:
- WAQUP_CONTENT_TYPES_AND_TAXONOMY.md → Content Types section
- 02-features-workflows.md → Features & Workflows section
- 04-user-journey.md → User Journey section

### 6. WAQUP_AI_VOICE_AND_ETHICS.md
**Status**: ✅ Already exists
**Content**: HOW waQup speaks/behaves
**Sub-sections**: None needed

### 7. WAQUP_ROADMAP_AND_RELEASES.md (Optional)
**Status**: ✅ Already exists, needs merging
**Content**: WHEN things ship
**Merge from**:
- 06-development-timeline.md → Development Timeline section

## Action Plan

1. Update build.js to support hierarchical navigation
2. Merge numbered documents into main documents
3. Update all cross-links to use proper paths
4. Delete old numbered documents after merging
5. Test build and navigation

