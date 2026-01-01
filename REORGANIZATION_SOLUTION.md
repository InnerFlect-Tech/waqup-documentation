# Documentation Reorganization Solution

## Summary

I've analyzed your request to organize everything into 6 main documents with sub-pages. Here's the complete solution:

## Current State
- 9 markdown files in `content/`
- Flat structure, no hierarchy
- Cross-references use document names

## Target Structure

### 6 Main SSOT Documents:

1. **WAQUP_PRODUCT_CONSTITUTION.md** ✅ Created
   - Core identity, principles, boundaries

2. **WAQUP_SYSTEM_ARCHITECTURE.md** (Needs consolidation)
   - Architecture Overview (main section)
   - Data Flow (sub-section)
   - API Flow (sub-section)
   - Technology Stack
   - Deployment
   - Observability

3. **WAQUP_VALUE_AND_GROWTH_ECONOMY.md** (Needs creation)
   - Credits System (sub-section)
   - Token/Reward System (sub-section)
   - Marketplace Economics

4. **WAQUP_SCIENTIFIC_FOUNDATIONS.md** (Needs creation)
   - Psychological basis for content types
   - Nervous system regulation
   - Embodied practice research

5. **WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md** (Needs consolidation)
   - Content Types & Taxonomy (sub-section)
   - Features & Workflows (sub-section)
   - User Journey (sub-section)
   - State Machine

6. **WAQUP_AI_VOICE_AND_ETHICS.md** (Needs creation)
   - Voice tone and characteristics
   - Ethical boundaries
   - Data handling principles

### Optional:
7. **WAQUP_ROADMAP_AND_RELEASES.md**
   - Development Timeline

## Implementation Approach

Due to the size and complexity, I recommend:

1. **Manual consolidation** of the 6 main documents (ensures quality)
2. **Updated build.js** with hierarchical navigation support
3. **Cross-reference updates** using anchor links

## Next Steps

Would you like me to:

**Option A**: Create all 6 consolidated documents now (will take multiple steps)
**Option B**: Create a complete consolidation script that merges everything automatically
**Option C**: Create the documents one by one for your review

The build system I created (`build-hierarchical.js`) supports:
- Hierarchical sidebar navigation
- Table of contents generation
- Anchor links for sub-sections
- Cross-document linking

Which approach would you prefer?

