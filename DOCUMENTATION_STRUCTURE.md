# waQup Documentation Structure

## Overview

waQup documentation is organized into **6 main SSOT documents** with **sub-documents** for reference.

## Main Documents (6 SSOT Documents)

1. **[WAQUP_PRODUCT_CONSTITUTION.md](./content/WAQUP_PRODUCT_CONSTITUTION.md)**
   - **Domain**: WHAT waQup is (identity, invariants, boundaries)
   - **Purpose**: Core product definition and principles

2. **[WAQUP_SYSTEM_ARCHITECTURE.md](./content/WAQUP_SYSTEM_ARCHITECTURE.md)**
   - **Domain**: HOW waQup is built (full stack, APIs, infrastructure, deployment)
   - **Sections**: Architecture Overview, Data Flow, API Flow, Technology Stack, Deployment, Observability
   - **Merged from**: 01-architecture-overview.md, 03-data-flow.md, 05-api-flow.md

3. **[WAQUP_VALUE_AND_GROWTH_ECONOMY.md](./content/WAQUP_VALUE_AND_GROWTH_ECONOMY.md)**
   - **Domain**: HOW value, rewards, tokens, and growth circulate
   - **Sections**: Credits System, Token/Reward System, Marketplace Economics, Revenue Distribution
   - **Merged from**: WAQUP_CREDITS_SYSTEM.md

4. **[WAQUP_SCIENTIFIC_FOUNDATIONS.md](./content/WAQUP_SCIENTIFIC_FOUNDATIONS.md)**
   - **Domain**: WHY waQup works (scientific & psychological grounding)
   - **Purpose**: Research basis for nervous system regulation, embodied practice

5. **[WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md](./content/WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md)**
   - **Domain**: HOW humans interact with waQup (state machines, ritual lifecycle)
   - **Sections**: Content Types & Taxonomy, Features & Workflows, User Journey, State Machine
   - **Merged from**: WAQUP_CONTENT_TYPES_AND_TAXONOMY.md, 02-features-workflows.md, 04-user-journey.md

6. **[WAQUP_AI_VOICE_AND_ETHICS.md](./content/WAQUP_AI_VOICE_AND_ETHICS.md)**
   - **Domain**: HOW waQup speaks and behaves ethically (tone, voice, moral boundaries)
   - **Purpose**: Voice guidelines and ethical principles

## Optional Document

7. **[WAQUP_ROADMAP_AND_RELEASES.md](./content/WAQUP_ROADMAP_AND_RELEASES.md)**
   - **Domain**: WHEN things ship and current status
   - **Merged from**: 06-development-timeline.md

## Sub-Documents (Reference)

These documents remain as reference but are linked from main documents:

- `01-architecture-overview.md` → Merged into WAQUP_SYSTEM_ARCHITECTURE.md
- `02-features-workflows.md` → Merged into WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md
- `03-data-flow.md` → Merged into WAQUP_SYSTEM_ARCHITECTURE.md
- `04-user-journey.md` → Merged into WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md
- `05-api-flow.md` → Merged into WAQUP_SYSTEM_ARCHITECTURE.md
- `06-development-timeline.md` → Merged into WAQUP_ROADMAP_AND_RELEASES.md
- `WAQUP_CREDITS_SYSTEM.md` → Merged into WAQUP_VALUE_AND_GROWTH_ECONOMY.md
- `WAQUP_CONTENT_TYPES_AND_TAXONOMY.md` → Merged into WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md

## Navigation Structure

The documentation build system generates:

- **Main Documents** section in sidebar (6-7 documents)
- **Reference** section in sidebar (sub-documents for detailed reference)
- Hierarchical navigation with section headers
- Proper cross-linking between documents

## Building Documentation

```bash
npm run build
```

This generates HTML files in the `docs/` directory with:
- Hierarchical sidebar navigation
- Proper cross-links between documents
- Section anchors for deep linking
- Responsive design

## Link Format

- **Cross-document links**: `[Text](./waqup_document_name.html#section-name)`
- **Internal section links**: `[Text](#section-name)`
- **Reference links**: Links to sub-documents when needed for detailed reference

## Best Practices

1. **Domain Ownership**: Each main document owns its domain exclusively
2. **Cross-References**: Use "Related SSOT Documents" section at top of each document
3. **Section Anchors**: Use descriptive section headings for deep linking
4. **Consistency**: Maintain consistent terminology across all documents
5. **Coherence**: Ensure no contradictions or scope leakage between documents
