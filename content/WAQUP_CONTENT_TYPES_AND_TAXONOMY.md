# Content Types & Taxonomy

> **⚠️ Archived Reference Document**  
> This document is kept for historical reference. The complete, up-to-date content has been merged into the **[Conversational & Ritual System](./waqup_conversational_and_ritual_system.html#content-types--taxonomy)** document.

**Domain**: WHAT the three content types are, HOW they differ psychologically, and HOW they're organized (taxonomy, tags, depth layers)

---

**Related SSOT Documents**:
- Product Constitution: Core identity and boundaries
- Features & Workflows: How each type is created and used
- Credits System: Credit costs per content type
- Scientific Foundations: Psychological basis for each type
- Data Flow: How content types are stored and retrieved

---

## Core Principle: Three Depths, Not Interchangeable

waQup is built on **three different depths of subconscious engagement**.

They are **not interchangeable**.

Think of them as **layers**:

1. **Affirmations** → cognitive re-patterning (shallow → medium)
2. **Guided Meditations** → state induction (medium)
3. **Rituals** → identity encoding (deepest)

Most apps confuse these. waQup separates them **on purpose**.

---

## 1. Affirmations (Micro-Reprogramming)

### What Affirmations Are in waQup

Affirmations are **precise linguistic encodings** designed to:
- Bypass resistance
- Avoid negation errors
- Align language with felt identity

They are **not**:
- Positive thinking
- Wishful statements
- Surface motivation

They are **syntax-correct instructions to the subconscious**.

### How They Work Psychologically

1. The brain responds to present-tense identity language
2. Repetition builds neural familiarity
3. Familiarity reduces threat
4. Reduced threat allows adoption

**Example**:
- ❌ "I am becoming calm"
- ✅ "I am calm and present in my body"

### In the App

**Characteristics**:
- Can exist alone (standalone affirmations)
- Can be listened to daily (lightweight, repeatable)
- Can be recorded in:
  - User's voice
  - Selected voice
- Fast generation (less AI processing)
- Shorter duration (1-5 minutes)

**Depth**: Shallow → Medium

**Use Cases**: Habits, mindset, focus, confidence, daily reinforcement

**Credit Cost**: 0.5 credits (lighter AI processing)

**Structure**:
- Core affirmation statements (3-7 statements)
- Present-tense identity language
- Repetition pattern
- Optional: brief grounding

---

## 2. Guided Meditations (State + Imagery)

### What Guided Meditations Are

Guided meditations are **state-induction journeys**.

They use:
- Breath
- Attention direction
- Imagery
- Pacing
- Silence

Their purpose is **not identity change, but state access**.

### How They Work Psychologically

1. Slow the nervous system
2. Shift brainwave dominance
3. Increase suggestibility
4. Open access to emotional material

They **prepare the terrain, but don't rewrite the map**.

### In the App

**Characteristics**:
- Can be generic (relaxation, grounding, presence)
- Can be semi-personalized
- Can be listened to without credits (once created)
- Can include affirmations inside them
- Medium duration (5-20 minutes)
- Moderate AI processing

**Depth**: Medium

**Use Cases**: Regulation, stress, clarity, emotional access, nervous system regulation

**Credit Cost**: 1 credit (standard AI processing)

**Structure**:
- Grounding / arrival
- Breath work
- Attention direction
- Imagery / visualization
- Optional: embedded affirmations
- Closure / return

---

## 3. Rituals (Identity Encoding — The Core)

### What Rituals Are (This is Key)

A waQup ritual is a **structured act of self-authorship**.

It combines:
- Reflection
- Intention
- Language
- Voice
- Repetition
- Emotional imprint

**Rituals are not content. They are events.**

### What Makes Rituals Different

Rituals:
- Are **created, not consumed**
- Include **context** (why this matters)
- Encode **identity-level language**
- Are tied to a **moment in life**

This is why they are **rare — and powerful**.

### Structure of a Ritual (Simplified)

A ritual typically includes:
1. **Grounding / arrival** (nervous system regulation)
2. **Context** (what is changing, why this matters)
3. **Core affirmations** (personalized, identity-level)
4. **Emotional anchoring** (felt sense integration)
5. **Closure / integration** (commitment to new identity)

This structure is what makes it **stick**.

### In the App

**Characteristics**:
- Ritual creation consumes credits (highest cost)
- Ritual playback is unlimited (free)
- Rituals can evolve over time
- Rituals become part of the user's inner archive
- Longer duration (10-30 minutes)
- Highest AI processing (full personalization)

**Depth**: Deep

**Use Cases**: Identity shifts, transitions, trauma-safe re-framing, life thresholds, major changes

**Credit Cost**: 1 credit (full AI processing, highest value)

**Structure**:
- Grounding / arrival
- Context (personalized, why this matters)
- Core affirmations (identity-level, personalized)
- Emotional anchoring (felt sense)
- Closure / integration (commitment)

---

## 4. How the Three Work Together (System Logic)

### Typical User Journey

1. **User starts with affirmations** (lightweight, daily)
2. **When resistance appears** → uses guided meditation (state access)
3. **When something truly matters** → creates a ritual (identity encoding)

**Affirmations repeat**  
**Meditations open**  
**Rituals encode**

### Internal Hierarchy

- **Affirmations** = statements (cognitive layer)
- **Guided meditations** = states (nervous system layer)
- **Rituals** = identity contracts (deepest layer)

waQup doesn't force one path — it offers **depth when needed**.

---

## 5. Taxonomy System

### Primary Classification: Content Type

**Required field**: `content_type` (enum)
- `affirmation`
- `guided_meditation`
- `ritual`

### Secondary Classification: Tags

**Tags** are flexible, user-defined, and system-suggested.

#### System Tags (Predefined)

**By Use Case**:
- `habits` (affirmations)
- `mindset` (affirmations)
- `focus` (affirmations)
- `confidence` (affirmations)
- `regulation` (meditations)
- `stress` (meditations)
- `clarity` (meditations)
- `emotional-access` (meditations)
- `identity-shift` (rituals)
- `transition` (rituals)
- `trauma-safe` (rituals)
- `life-threshold` (rituals)

**By Practice Type** (for rituals and meditations):
- `breath-work`
- `body-scanning`
- `movement`
- `sensory-awareness`
- `visualization`
- `combination`

**By Time/Context**:
- `morning`
- `evening`
- `before-sleep`
- `anxiety`
- `calming`
- `energizing`
- `grounding`

**By Depth** (system-assigned):
- `shallow` (affirmations)
- `medium` (meditations, some affirmations)
- `deep` (rituals)

#### User Tags (Custom)

Users can add custom tags:
- Personal context tags
- Life event tags
- Emotional state tags
- Any meaningful categorization

**Tag Rules**:
- Maximum 10 tags per content item
- Tags are lowercase, hyphenated
- System suggests tags based on content analysis
- Users can remove/add tags freely

### Tertiary Classification: Collections

**Collections** are user-organized groups:
- Folders (user-created)
- Packs (creator-published)
- Sequences (multiple items in order)

---

## 6. Database Schema

### Content Items Table

```sql
CREATE TABLE content_items (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    content_type ENUM('affirmation', 'guided_meditation', 'ritual') NOT NULL,
    
    -- Core fields
    title VARCHAR(255) NOT NULL,
    content_text TEXT NOT NULL,
    audio_url VARCHAR(500),
    audio_duration INTEGER, -- seconds
    
    -- Type-specific fields
    structure JSONB, -- type-specific structure
    context JSONB, -- creation context, personalization
    
    -- Metadata
    tags TEXT[], -- array of tag strings
    depth VARCHAR(20), -- shallow, medium, deep (system-assigned)
    
    -- Voice
    voice_id UUID REFERENCES voices(id),
    voice_type VARCHAR(50), -- 'user', 'standard', 'premium'
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL,
    last_played_at TIMESTAMP,
    play_count INTEGER DEFAULT 0,
    
    -- Organization
    folder_id UUID REFERENCES folders(id),
    pack_id UUID REFERENCES ritual_packs(id), -- if part of pack
    
    -- Status
    status VARCHAR(20) DEFAULT 'active', -- active, archived, deleted
    
    -- Indexes
    INDEX idx_user_content_type (user_id, content_type),
    INDEX idx_tags (tags),
    INDEX idx_depth (depth)
);
```

### Tags Table (Normalized)

```sql
CREATE TABLE tags (
    id UUID PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50), -- 'use-case', 'practice-type', 'time-context', 'custom'
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE content_item_tags (
    content_item_id UUID REFERENCES content_items(id),
    tag_id UUID REFERENCES tags(id),
    PRIMARY KEY (content_item_id, tag_id)
);
```

---

## 7. API Design

### Filtering by Type

**GET /api/v1/content**
```json
Query Parameters:
- content_type: "affirmation" | "guided_meditation" | "ritual" | null (all)
- tags: string[] (filter by tags)
- depth: "shallow" | "medium" | "deep" | null (all)
- folder_id: uuid (optional)
- pack_id: uuid (optional)

Response:
{
  "content_items": [
    {
      "id": "uuid",
      "content_type": "ritual",
      "title": "Evening Calm",
      "depth": "deep",
      "tags": ["evening", "calming", "transition"],
      "duration": 600,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {...}
}
```

### Type-Specific Creation

**POST /api/v1/content/create**
```json
Request:
{
  "content_type": "affirmation" | "guided_meditation" | "ritual",
  "intent": "I need calm",
  "context": {...},
  "preferences": {...}
}

Response:
{
  "content_item_id": "uuid",
  "content_type": "ritual",
  "status": "generating",
  "estimated_time": 30
}
```

---

## 8. User Interface Organization

### Library View Options

1. **By Type** (default):
   - Affirmations tab
   - Guided Meditations tab
   - Rituals tab

2. **By Tags**:
   - Filter by tag
   - See all types with matching tag

3. **By Depth**:
   - Shallow (affirmations)
   - Medium (meditations)
   - Deep (rituals)

4. **By Collection**:
   - Folders
   - Packs
   - Sequences

### Creation Flow

**Step 1**: User selects content type
- "Create Affirmation" (lightweight)
- "Create Guided Meditation" (state access)
- "Create Ritual" (deep encoding)

**Step 2**: Conversation adapts to type
- Affirmations: Focus on statements, identity language
- Meditations: Focus on state, imagery, breath
- Rituals: Focus on context, meaning, identity shift

---

## 9. Credits Integration

### Credit Costs by Type

- **Affirmations**: 0.5 credits (lighter processing)
- **Guided Meditations**: 1 credit (standard processing)
- **Rituals**: 1 credit (full processing, highest value)

**Rationale**:
- Affirmations are shorter, simpler
- Meditations are standard length
- Rituals are full personalization (but same credit = intentional choice)

**Alternative**: All cost 1 credit (simplicity, intentionality)

---

## 10. Why This Design is Rare (and Strong)

### Most Apps:
- Mix everything (no distinction)
- Overload content (too many options)
- Remove authorship (pre-made content)

### waQup:
- Separates functions (clear hierarchy)
- Respects psychological layers (depth awareness)
- Gives ownership back to the user (self-authorship)

### This Creates:
- Higher trust (clear purpose)
- Deeper retention (meaningful progression)
- Emotional loyalty (identity-level connection)
- Ethical monetization (value-based pricing)

---

## 11. Open Questions

1. **Credit costs**: Should affirmations cost 0.5 credits or 1 credit?
2. **Tag limits**: Is 10 tags per item sufficient?
3. **Type transitions**: Can users convert affirmations → meditations → rituals?
4. **Pack types**: Can packs contain mixed types or single type only?
5. **Search**: Should search prioritize by type or relevance?

---

## Summary

The three content types form a **hierarchical system**:
- **Affirmations**: Cognitive re-patterning (shallow → medium)
- **Guided Meditations**: State induction (medium)
- **Rituals**: Identity encoding (deepest)

They are **not interchangeable** and serve different psychological purposes.

The taxonomy system supports:
- Type-based organization
- Flexible tagging
- User-defined collections
- Clear depth progression

This creates a **coherent, meaningful system** that respects psychological layers and user autonomy.

