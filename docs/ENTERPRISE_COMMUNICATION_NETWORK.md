# Enterprise Communication Network

This document defines the recommended communications architecture for:

- Tolani Corp (HQ)
- Tolani Labs
- Hook Travel
- Listo Marketplace
- BettorsACE
- Tolani Supply Group (TSG)

## Executive Decision

Use a hybrid model:

- one enterprise HQ voice switchboard
- separate brand-specific numbers for messaging and customer-facing support

This is the most operationally sound model because it preserves:

- clean brand identity
- opt-in and compliance separation
- accurate routing and reporting
- reputation isolation
- service-level accountability by brand

## Immediate Recommendation

### 1. Use `+1 (877) 691-2134` as Tolani Corp HQ

Use this as the parent-company switchboard for:

- operator routing
- partnerships
- executive office
- investor and press inquiries
- after-hours overflow

Treat it as a voice-first line until toll-free verification is complete.

### 2. Do not use one messaging number for all brands

Do not run a shared enterprise SMS sender across:

- education
- travel
- marketplace
- betting
- logistics

That introduces avoidable verification and trust problems.

### 3. Resubmit `+1 (888) 325-5859` as a single-brand BettorsACE line

The rejected verification should be handled narrowly:

- one brand
- one website
- one opt-in flow
- one messaging use case

Do not resubmit it as a multi-brand Tolani enterprise sender.

## Recommended Network Topology

### Parent Company Layer

`Tolani Corp HQ`

- one toll-free voice line
- IVR routing across brands
- operator fallback
- no default shared messaging role

### Brand Layers

`Tolani Labs`

- dedicated student support line
- admissions, DEBO, learner services
- verified SMS for academic and account workflows

`Hook Travel`

- dedicated concierge line
- voice and WhatsApp prioritized
- itinerary and urgent support workflows

`Listo Marketplace`

- start with HQ routing if low volume
- split to dedicated brand support once transaction volume justifies it

`BettorsACE`

- dedicated voice + SMS line
- picks, billing, payouts, War Room, responsible-play support
- isolated verification and sender reputation

`TSG`

- dedicated B2B support line once formal account volume warrants it
- voice + email first, SMS second

## HQ IVR Tree

- `1` Tolani Labs
- `2` Hook Travel
- `3` Listo Marketplace
- `4` BettorsACE
- `5` TSG
- `0` Operator

## Channel Policy

### Voice

Use for:

- switchboard
- concierge
- urgent support
- escalations
- executive office routing

### SMS

Use for:

- transactional follow-up
- secure links
- alerts
- reminders

Keep brand-specific senders and opt-ins.

### WhatsApp

Use for:

- travel concierge
- mobile-first support
- document and itinerary follow-up

### Email

Use for:

- formal support
- contracts
- admissions
- receipts
- B2B documentation

### Web Chat

Use for:

- conversion
- authenticated product help
- live AI triage with human escalation

## Twilio Architecture Recommendation

### Short Term

- Twilio Programmable Voice for HQ and brand lines
- IVR + queue routing
- one Twilio subaccount or messaging service per brand once brand numbers are active

### Medium Term

- AI receptionist by brand
- shared operator console for transcripts, escalations, and KPIs
- unified CRM identity with brand-specific queues

### Long Term

- one enterprise comms graph across:
  - phone
  - SMS
  - WhatsApp
  - email
  - web chat
  - Slack / Discord ops signals

## Rollout Sequence

### Phase 1

- Launch HQ switchboard on `+1 (877) 691-2134`
- route all brands through IVR
- keep messaging off HQ until verification posture is clean

### Phase 2

- resubmit BettorsACE number as a single-brand verified toll-free use case
- assign brand-specific messaging lanes
- separate HELP / STOP / consent language per brand

### Phase 3

- add AI receptionists for HQ, Tolani Labs, Hook Travel, and BettorsACE
- route live escalations into brand-specific human queues
- unify reporting in one management dashboard

## KPIs

- first-call resolution rate
- AI containment rate
- human escalation rate
- qualified lead capture rate
- toll-free verification approval status
- opt-in approval rate by brand
- average speed to answer by brand
- after-hours callback completion rate

## Implementation Artifacts

The dynamic registry for this network is implemented in:

- `lib/enterpriseCommunicationNetwork.ts`

The internal corporate page that renders it is:

- `app/communications/page.tsx`
