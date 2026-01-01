# Value & Growth Economy

**Domain**: HOW value, rewards, tokens, and growth circulate (economic + energetic system)

**Related SSOT Documents**:
- [Product Constitution](./waqup_product_constitution.html): WHAT waQup is
- [System Architecture](./waqup_system_architecture.html): HOW waQup is built
- [Conversational & Ritual System](./waqup_conversational_and_ritual_system.html): HOW humans interact

---

## Table of Contents

- [Credits System](#credits-system)
- [Token/Reward System](#tokenreward-system)
- [Marketplace Economics](#marketplace-economics)
- [Revenue Distribution](#revenue-distribution)

---

## Credits System

### 1. Why Credits (Not Pure Subscription)

Credits fit waQup because **value is created at the moment of ritual creation, not in passive listening**.

A ritual is an act of **encoding** → that is where effort, attention, and meaning happen.

So we price:
- **Creation** (encoding)
- **Transformation** (deep change)

Not time.

**Credits**:
- Feel intentional
- Reduce churn
- Avoid "I'm paying but not using it" guilt
- Match ritual psychology (scarcity + choice)
- Align infrastructure costs (AI only when needed)

---

### 2. What Credits Are (Definition)

**A credit = one irreversible act of creation or deep change.**

Credits are consumed when the user creates or transforms something meaningful.

**Not** when they listen.

**Core Principle**: Practice is free, creation is sacred.

---

### 3. What Costs Credits (Core Rules)

### Consumes Credits

**By Content Type** (see Content Types & Taxonomy document):
- **Affirmations**: 0.5 credits (lighter AI processing, shorter content)
- **Guided Meditations**: 1 credit (standard AI processing)
- **Rituals**: 1 credit (full AI processing, highest value)

**Other Actions**:
- Clone + deeply modify existing content (see thresholds below)
- Generate hypnosis / NLP-structured content (1 credit)

**Optional extra credit**:
- Use premium voices (+0.5 credit, or clarify if included in base)

### Does NOT Cost Credits

- Listening / replaying (unlimited)
- Daily practice (unlimited)
- Offline usage (unlimited)
- Using own voice (if feature exists)
- Editing text manually (minor tweaks)
- Minor tweaks (duration, pace, tags)

### Modification Thresholds

**Free (No Credit)**:
- Manual text editing
- Changing duration
- Adjusting pace/tone settings
- Adding/removing tags
- Organizing in folders
- Exporting rituals

**1 Credit (Deep Modification)**:
- Changing practice type (breath work → movement)
- Changing intent (calming → energizing)
- Restructuring ritual requiring LLM regeneration
- Changing core ritual structure
- Any modification requiring AI regeneration

---

### 4. Credit Packs (Simple, Humane)

### Example Packs (Illustrative)

- **Starter**: 3 credits → €9 (€3/credit)
- **Seeker**: 10 credits → €25 (€2.50/credit)
- **Architect**: 30 credits → €60 (€2/credit)

**Psychology**:
- Small entry point
- No pressure
- Higher packs feel like commitment, not upsell
- Bulk discount rewards intentional use

### Credit Properties

- **Never expire** (no FOMO, no manipulation)
- **Personal** (non-transferable, except future gifting feature)
- **Refundable** (on system errors, see error handling)
- **Transparent** (always visible balance, clear costs)

---

### 5. Free Tier (Important)

Free users get:
- **1 ritual credit** (one-time, to experience creation)
- **Full replay access** (unlimited listening)
- **Basic structure only** (standard voices, standard features)

This lets them:
- Feel the power
- Encode once
- Understand the system
- Experience value before paywall

Then the paywall feels **natural, not coercive**.

---

### 6. Error Handling & Refunds

### Credit Refund Policy

Credits are **refunded** when:
- Ritual generation fails due to system error
- Audio generation fails after text generation
- User cancels before ritual completion
- LLM/TTS service unavailable
- Any technical failure preventing completion

Credits are **consumed** when:
- Ritual successfully generated and saved
- User confirms ritual completion
- Ritual appears in library

**Principle**: User only pays for successful value delivery.

---

### 7. Credit Balance & Visibility

### Balance Display

- Always visible in UI (non-intrusive, calm)
- Shown before consumption: "This will use 1 credit. You have 5 remaining."
- Transaction history available (credits used, credits purchased, refunds)
- No pressure messaging (no "low balance" warnings)

### Purchase Flow

- Clear pricing before purchase
- No hidden fees
- Immediate credit availability
- Simple checkout (Stripe integration)

---

### 8. Premium Voices

**Standard voices**: Included in ritual creation credit (1 credit covers creation + standard voice)

**Premium voices**: 
- Option A: +0.5 credit per ritual
- Option B: Included in base credit (preferred for simplicity)

**Recommendation**: Include in base credit to maintain simplicity and avoid decision fatigue.

---

### 9. Marketplace Relationship

### Creator Packs

- Purchased separately (direct payment or credits)
- Credits can be used to purchase packs (1 credit = €3 value, or separate pricing)
- Creator revenue: Separate from user credits (creators receive payment, not credits)

### Credit Usage for Marketplace

- Users can use credits to purchase packs
- Credit value: €3 per credit (or market rate)
- Credits supplement, don't replace direct payment

---

### 10. Internal Logic (Systemic, Not Cosmetic)

Credits align:

**User Psychology** → "What is worth encoding now?"
- Intentional choice
- Scarcity creates meaning
- No infinite scrolling

**Infrastructure Cost** → AI + processing only when needed
- Pay for what you use
- Predictable costs
- Scales with usage

**Retention** → Rituals stay forever
- No subscription pressure
- No "use it or lose it"
- Credits never expire

**Ethics** → No addiction loops
- No streaks
- No pressure
- No manipulation
- No FOMO

This avoids:
- Infinite content scrolling
- Meditation gamification
- Streak anxiety
- Subscription fatigue

---

### 11. Economic Scalability

From a business view:

- **Near-zero marginal cost** per replay
- **Credits purchased upfront** (cash flow)
- **No refund pressure** ("I forgot to cancel")
- **Works globally** (no subscription fatigue)
- **Predictable revenue** per engaged user
- **Credits = cash flow + clarity**

---

### 12. Long-Term Extensibility

Credits later can unlock:

- **Creator rituals** (revenue share)
- **Couple rituals** (2 credits)
- **Trauma-safe guided work** (higher credit, 2 credits)
- **Therapist-generated rituals** (premium, 2 credits)
- **Custom voice models** (premium, 2 credits)
- **Ritual sequences** (multiple rituals, proportional credits)

Same system. No redesign.

---

### 13. Anti-Gamification Safeguards

### What Credits Are NOT

- Not a reward system (no "earn credits by practicing")
- Not a loyalty program (no "more credits for streaks")
- Not a social comparison tool (no leaderboards)
- Not a manipulation mechanism (no FOMO, urgency)

### What Credits ARE

- Resource management tool
- Cost allocation mechanism
- Intentional choice enabler
- Infrastructure cost alignment

---

### 14. Implementation Notes

### Credit Management Service

- Tracks credit balance per user
- Validates credit availability before consumption
- Processes refunds on errors
- Records transaction history
- Integrates with Payment Service for purchases

### API Integration

- Check credit balance before ritual creation
- Consume credit on successful completion
- Refund credit on failure
- Track credit transactions

### UI/UX Principles

- Calm, non-intrusive balance display
- Clear cost communication before action
- No pressure messaging
- Transparent transaction history
- Simple purchase flow

---

### 15. Content Type Credit Costs

### Rationale

- **Affirmations (0.5 credits)**: Shorter, simpler AI processing, lighter content
- **Guided Meditations (1 credit)**: Standard processing, medium complexity
- **Rituals (1 credit)**: Full processing, highest value, but same cost = intentional choice

**Alternative Consideration**: All cost 1 credit for simplicity and intentionality (recommended for Phase 1, can adjust based on usage data).

---

### 16. Open Questions

1. **Affirmation credit cost**: 0.5 credits (lighter) or 1 credit (simplicity)?
2. **Premium voice pricing**: Include in base credit or +0.5 credit?
3. **Credit gifting**: When to implement? What are the mechanics?
4. **Marketplace credit value**: Fixed €3/credit or variable?
5. **Bulk discounts**: Should larger packs have better per-credit pricing?
6. **Type transitions**: Should converting affirmations → meditations → rituals cost credits?

---

### Summary

The credits system is a **resource management tool** that:
- Aligns costs with value creation
- Enables intentional choice
- Avoids manipulation
- Scales economically
- Maintains waQup's anti-gamification principles

**Core Principle**: Practice is free, creation is sacred.



## Token/Reward System

### 7. Token/Reward System
Non-speculative recognition system for user and creator contributions. Tokens represent value exchange, not investment.

**Reward Types**:
- Practice tokens (for regular engagement)
- Creator tokens (for quality packs)
- Referral tokens (for word-of-mouth)
- Feedback tokens (for constructive feedback)

**Note**: For detailed token mechanics, distribution rules, and economic model, see Value & Growth Economy document.



## Marketplace Economics

*Marketplace economics details to be added.*

## Revenue Distribution

*Revenue distribution details to be added.*

