# Documentation Organization Summary

## Structure Overview

### Main Documents (7 SSOT Documents)

**Foundation** (2 documents)
1. **Product Constitution** — Core identity and principles
2. **Scientific Foundations** — Research basis and psychological grounding

**User Experience** (2 documents)
3. **Conversational & Ritual System** — How humans interact with the platform
4. **AI Voice & Ethics** — Voice guidelines and ethical principles

**Technical** (1 document)
5. **System Architecture** — System design, APIs, and infrastructure

**Business** (1 document)
6. **Value & Growth Economy** — Credits, tokens, and economic model

**Planning** (1 document)
7. **Roadmap & Releases** — Development timeline and releases

### Archived Reference Documents (8 documents)

These documents are kept for historical reference. All content has been merged into the main documents above.

**Archived — System Architecture**
- Architecture Overview → Merged into System Architecture
- Data Flow → Merged into System Architecture
- API Flow → Merged into System Architecture

**Archived — User Experience**
- Features & Workflows → Merged into Conversational & Ritual System
- User Journey → Merged into Conversational & Ritual System
- Content Types & Taxonomy → Merged into Conversational & Ritual System

**Archived — Business**
- Credits System → Merged into Value & Growth Economy

**Archived — Planning**
- Development Timeline → Merged into Roadmap & Releases

## Document Standards

### Consistent Structure

All main documents follow this structure:

```markdown
# Document Title

**Domain**: [Domain description]

**Related SSOT Documents**:
- [Links to related documents]

---

## Table of Contents

- [Section links]

---

## [Content sections]
```

### Archived Documents

All archived documents include:

```markdown
# Document Title

> **⚠️ Archived Reference Document**  
> This document is kept for historical reference. The complete, up-to-date content has been merged into the **[Main Document](./link.html)** document.

**Domain**: [Domain description]

---
```

## Navigation

### Sidebar Organization

- **Main Documents** grouped by category (Foundation, User Experience, Technical, Business, Planning)
- **Archived Reference** grouped by original category
- Visual distinction: Archived documents are styled with reduced opacity and italic group headers

## Best Practices

1. **No "waQup" repetition** in document titles
2. **Consistent headers** — All use "Domain" not "Document Domain"
3. **Table of Contents** — All main documents have TOC
4. **Cross-links** — All links point to correct HTML pages with anchors
5. **Archived clarity** — Clear warnings that archived docs are for reference only

## File Organization

```
content/
├── WAQUP_PRODUCT_CONSTITUTION.md          (Main)
├── WAQUP_SCIENTIFIC_FOUNDATIONS.md        (Main)
├── WAQUP_CONVERSATIONAL_AND_RITUAL_SYSTEM.md (Main)
├── WAQUP_AI_VOICE_AND_ETHICS.md          (Main)
├── WAQUP_SYSTEM_ARCHITECTURE.md           (Main)
├── WAQUP_VALUE_AND_GROWTH_ECONOMY.md     (Main)
├── WAQUP_ROADMAP_AND_RELEASES.md         (Main)
│
├── 01-architecture-overview.md            (Archived)
├── 02-features-workflows.md               (Archived)
├── 03-data-flow.md                        (Archived)
├── 04-user-journey.md                     (Archived)
├── 05-api-flow.md                         (Archived)
├── 06-development-timeline.md            (Archived)
├── WAQUP_CREDITS_SYSTEM.md                (Archived)
└── WAQUP_CONTENT_TYPES_AND_TAXONOMY.md   (Archived)
```

## Build Output

- Generates 15 HTML pages (7 main + 8 archived)
- Hierarchical sidebar navigation
- Proper cross-linking
- Responsive design

