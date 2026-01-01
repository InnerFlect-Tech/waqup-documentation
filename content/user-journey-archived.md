# User Journey

> **⚠️ Archived Reference Document**  
> This document is kept for historical reference. The complete, up-to-date content has been merged into the **[Conversational & Ritual System](./waqup_conversational_and_ritual_system.html#user-journey)** document.

**Domain**: HOW humans experience waQup (journey maps, touchpoints, principles)

---

**Related SSOT Documents**:
- Content Types & Taxonomy: Three content types and user progression through them
- Features & Workflows: Core features and workflow details
- Conversational & Ritual System: Detailed conversation flow implementation
- Value & Growth Economy: Economic value exchange in user journey
- AI Voice & Ethics: Ethical principles guiding user experience

## Overview

The waQup user journey is designed to be calm, trust-based, and regenerative. Users discover value through embodied practice, build habits through return loops, and engage with creators in a sustainable marketplace. No manipulation, no gamification, no dependency creation.

## New User Onboarding Journey

```mermaid
journey
    title New User Onboarding
    section Discovery
      Discovers waQup: 3: User
      Reads about voice-first rituals: 4: User
      Decides to try: 5: User
    section First Experience
      Opens app: 4: User
      Sees simple interface: 5: User
      Chooses content type: 4: User
      Creates first content: 5: User
      Practices content: 5: User
      Feels value: 5: User
    section Engagement
      Returns to practice: 5: User
      Creates affirmations: 4: User
      Uses guided meditations: 4: User
      Creates rituals: 4: User
      Explores marketplace: 4: User
      Builds habit: 5: User
```

## Content Creation Journey (Three Types)

### Typical Progression Through Types

```mermaid
journey
    title User Progression Through Content Types
    section Starting Point
      Creates affirmation: 5: User
      Practices daily: 5: User
      Feels resistance: 3: User
    section Deepening
      Uses guided meditation: 5: User
      Accesses deeper state: 5: User
      Feels ready for change: 5: User
    section Encoding
      Creates ritual: 5: User
      Experiences identity shift: 5: User
      Integrates change: 5: User
```

**Progression Logic**:
- **Affirmations repeat** (daily, lightweight)
- **Meditations open** (when resistance appears)
- **Rituals encode** (when something truly matters)

## Ritual Creation Journey (Deepest Type)

```mermaid
stateDiagram-v2
    [*] --> DiscoverNeed: User feels need<br/>for practice
    DiscoverNeed --> OpenApp: Opens waQup
    OpenApp --> StartCreation: Clicks "Create Ritual"
    StartCreation --> Greeting: System greets
    Greeting --> ShareIntent: User shares intent<br/>"I need calm"
    ShareIntent --> ShareContext: System asks context<br/>User shares details
    ShareContext --> ShareDetails: System asks preferences<br/>User shares practice type
    ShareDetails --> ReviewSummary: System presents summary
    ReviewSummary --> Confirm: User confirms
    ReviewSummary --> Modify: User requests changes
    Modify --> ShareDetails: Return to details
    Confirm --> Generating: System generates
    Generating --> Complete: Ritual ready
    Complete --> PracticeNow: User practices immediately
    Complete --> SaveForLater: User saves for later
    PracticeNow --> ExperienceValue: User experiences value
    SaveForLater --> [*]
    ExperienceValue --> ReturnLoop: User wants to return
```

### Journey Stages

**1. Type Selection**
- User recognizes need for practice (stress, focus, sleep, etc.)
- Opens waQup app
- Sees three options: "Create Affirmation", "Create Guided Meditation", "Create Ritual"
- System explains depth difference (optional, first-time users)
- User chooses based on need and depth desired
- No pressure, no urgency

**2. Discovery & Intent**
- System greets warmly
- Asks open-ended question: "What kind of practice would support you right now?"
- User shares intent naturally
- System adapts questions based on content type selected
- No forms, no configuration screens

**3. Conversation Flow (Type-Specific)**
- **Affirmations**: Focus on statements, identity language, repetition
- **Guided Meditations**: Focus on state, imagery, breath, nervous system
- **Rituals**: Focus on context, meaning, identity shift, emotional anchoring
- System adapts questions based on responses and type
- No forms, no configuration screens

**4. Personalization**
- System gathers context (time, location, duration)
- System learns preferences (practice type, intensity, guidance style)
- System applies personalization (voice, pace, tone)
- User feels heard and understood

**5. Generation & Delivery**
- System generates personalized content (type-specific structure)
- System synthesizes audio with chosen voice
- Content appears in library (organized by type)
- User can practice immediately or save for later

**6. First Practice**
- User starts audio playback
- Voice guides through practice (type-appropriate)
- User experiences value (affirmation: cognitive shift, meditation: state access, ritual: identity encoding)
- Practice completes naturally
- No pressure, no gamification

## Return Loop Journey

```mermaid
journey
    title Daily Return Loop
    section Morning
      Wakes up: 3: User
      Feels need for practice: 4: User
      Opens waQup: 4: User
      Sees saved rituals: 5: User
    section Practice
      Selects ritual: 4: User
      Starts practice: 5: User
      Practices ritual: 5: User
      Feels regulated: 5: User
    section After Practice
      Completes practice: 5: User
      Returns to library: 4: User
      No pressure to return: 5: User
      Returns when needed: 5: User
```

### Return Loop Characteristics

**No Gamification**:
- No streaks displayed
- No badges or achievements
- No "X day streak" notifications
- No comparison with others

**Intrinsic Motivation**:
- Users return because practice serves them
- Value comes from embodied experience
- No external rewards or punishments
- Natural habit formation

**User Autonomy**:
- Users control when to practice
- No reminders or pressure
- No consequences for not practicing
- Easy to pause and resume

## Marketplace Discovery Journey

```mermaid
flowchart TD
    Start([User Wants<br/>More Content]) --> Browse[Browse Marketplace]
    Browse --> Search[Search by Keyword<br/>or Browse Categories]
    Search --> Results[See Pack Results<br/>Personalized Recommendations]
    Results --> ViewPack[View Pack Details<br/>Creator, Price, Rituals]
    ViewPack --> Decision{User Decision}
    Decision -->|Free Pack| AddFree[Add to Library<br/>Immediate Access]
    Decision -->|Paid Pack| Purchase[Purchase/Subscribe<br/>Stripe Checkout]
    Decision -->|Not Interested| Browse
    Purchase --> Access[Pack Added to Library<br/>Access Granted]
    AddFree --> Practice[Practice Pack Rituals]
    Access --> Practice
    Practice --> Value[Experience Value<br/>from Creator Content]
    Value --> Return[Return to Practice<br/>Build Habit]
    Return --> Explore[Explore More Packs<br/>Follow Creators]
```

### Marketplace Journey Stages

**1. Discovery**
- User wants more variety or expertise
- Browses marketplace or searches
- Sees personalized recommendations
- No pressure, no FOMO

**2. Exploration**
- Views pack details (description, creator, rituals)
- Reads reviews and ratings
- Considers value proposition
- Makes informed decision

**3. Purchase/Subscription**
- Clear pricing (no hidden costs)
- Simple checkout process
- Transparent terms
- Immediate access after payment

**4. Practice & Value**
- Pack rituals available in library
- User practices and experiences value
- Returns to practice regularly
- Builds relationship with creator

**5. Engagement**
- User may follow creator
- User may explore more packs
- User may provide feedback
- Sustainable, trust-based relationship

## Creator Journey

```mermaid
journey
    title Creator Publishing Journey
    section Onboarding
      Discovers waQup: 4: Creator
      Registers as creator: 4: Creator
      Learns platform: 5: Creator
    section Creation
      Creates ritual pack: 5: Creator
      Sets pricing: 4: Creator
      Publishes pack: 5: Creator
    section Growth
      Pack discovered: 5: Creator
      Users purchase: 5: Creator
      Receives revenue: 5: Creator
      Builds audience: 5: Creator
    section Sustainability
      Creates more packs: 4: Creator
      Earns sustainable income: 5: Creator
      Builds reputation: 5: Creator
```

### Creator Journey Stages

**1. Onboarding**
- Creator discovers waQup marketplace
- Registers as creator account
- Learns platform tools and guidelines
- Understands value proposition

**2. Pack Creation**
- Creator creates ritual pack
- Adds rituals with expertise
- Sets pricing (free, one-time, subscription)
- Publishes pack

**3. Discovery & Sales**
- Pack appears in marketplace
- Users discover through search/recommendations
- Users purchase or subscribe
- Creator receives revenue share (see Value & Growth Economy document for revenue distribution details)

**4. Growth & Sustainability**
- Creator builds audience
- Receives feedback and reviews
- Creates more packs
- Builds sustainable income stream

## User Journey Principles

### Trust-Based
- No manipulation or dark patterns
- Transparent pricing and terms
- Clear value proposition
- Honest communication

### Regenerative
- Value circulates to all participants (see Value & Growth Economy document)
- Creators earn sustainable income
- Users receive genuine value
- Platform grows organically

### User Autonomy
- Users control their practice
- No pressure or dependency
- Easy exit (export, delete)
- Respect for user agency

### Calm & Supportive
- No urgency or FOMO
- No comparison or competition
- Supportive, not pushy
- Respects user's pace

## Journey Metrics (Non-Gamified)

### Health Indicators
- **Return Rate**: Users who return to practice (intrinsic value)
- **Practice Frequency**: Natural practice patterns
- **Ritual Creation**: Users creating multiple rituals
- **Marketplace Engagement**: Users discovering and purchasing packs
- **Creator Revenue**: Sustainable income for creators

### What We Don't Track
- Streaks or consecutive days
- Comparison with other users
- Engagement scores or gamification metrics
- Manipulative conversion funnels
- Dependency indicators

## Journey Touchpoints

### Key Moments
1. **First Content Creation**: User experiences conversational creation (affirmation, meditation, or ritual)
2. **First Practice**: User experiences embodied value
3. **Type Progression**: User naturally progresses from affirmations → meditations → rituals
4. **First Return**: User naturally returns for practice
5. **First Pack Purchase**: User discovers creator value
6. **Habit Formation**: User builds sustainable practice across all types

### Support Points
- Clear onboarding (no overwhelming tutorials)
- Helpful conversation guidance
- Transparent marketplace information
- Easy ritual export and sharing
- Simple account management

## Journey Optimization

### Focus Areas
- **Conversation Quality**: Natural, adaptive dialogue
- **Ritual Personalization**: Accurate intent understanding
- **Audio Quality**: Natural, prosodically appropriate voices
- **Marketplace Discovery**: Effective search and recommendations
- **Creator Tools**: Easy publishing and analytics

### Anti-Patterns to Avoid
- Adding gamification to increase engagement
- Creating urgency or FOMO
- Manipulating user behavior
- Extracting value without providing value
- Creating dependency through withdrawal mechanics

