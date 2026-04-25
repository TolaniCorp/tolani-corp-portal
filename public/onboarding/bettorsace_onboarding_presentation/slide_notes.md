# 1 - BettorsACE Early Employee Onboarding

Welcome to BettorsACE onboarding. This isn't a marketing overview; it's about operating our platform with confidence. Every early employee contributes to our reliability, trust, and monetization discipline. We'll cover the mechanics, paygates, policies, and security operations you need to master. Let's dive into why this focus is so critical for us.

# 2 - Why This Matters

This focus on operational excellence matters because it directly underpins our core business. We're talking about product accuracy, commercial integrity, and security discipline. These aren't just buzzwords; they are the bedrock of our user trust and revenue. As early employees, you own these outcomes before formal departments even scale. Your role boundaries are evolving, but your responsibility is absolute. Next, we'll look at the platform itself.

# 3 - Platform Map (What We Run)

Now, let's map out what we actually run. Our platform spans web and mobile experiences, a critical MCP/API monetization channel, and agent-assisted operator workflows. We rely on a modern stack: React and Vite for the frontend, Convex for real-time backend, and an APIM product model for monetization. Remember, customer trust can break at any layer. We perform cross-layer operations to prevent that. This brings us to the core of our intelligence.

# 4 - Core Platform Mechanics (Intelligence Pipeline)

Building on our platform overview, let's examine the intelligence pipeline that drives our decisions. Our CLV Engine tracks market efficiency. The Model Fair Pricing generates independent, true price signals. And our CCIR NLP Engine flags market-moving context in real-time. System output quality, like confidence and edge, is dynamic. It depends entirely on ingestion quality, model freshness, and precise signal routing. So, let's explore how we get that critical data in.

# 5 - Data and Ingestion Mechanics

Understanding the intelligence pipeline, we now focus on how data enters our system. We use a modular, provider-driven architecture. Raw feeds are normalized into a common update shape, then broadcast live to clients and agents. Critical failure modes include provider outages, write delays causing state discrepancies, and event staleness. These directly impact our recommendations and user confidence. Next, we'll discuss the reliability signals we constantly monitor.

# 6 - Reliability Signals We Care About

Our platform's reliability isn't just about uptime; it's about the integrity of every signal we provide. We're looking at specific indicators that tell us if we're delivering on our promise. We need to ensure our frontend routes and APIs are always healthy, because if users can't access us, nothing else matters. Authentication must be seamless; any login loops or token issues erode trust immediately. And critically, our AI predictions must render correctly with accurate confidence scores, because that's our core value proposition. These aren't just metrics; they're readiness gates and daily checks that we must pass. Now, let's talk about how we monetize this reliable platform through our paygate model.

# 7 - Paygate Model (MCP/API)

Building on our reliability, our paygate model is how we structure access and monetize our platform. We offer three distinct tiers: Free, Pro, and Enterprise, each designed for different user needs. The Free tier is for evaluation, allowing users to test the waters with limited access. Pro is for active integrations and smaller businesses, offering higher throughput and advanced signals. And Enterprise is for our largest clients, requiring a controlled onboarding and custom agreements. It's crucial to remember that entitlements are enforced by our gateway policies, not by what the frontend displays. Next, we'll dive into the specific limits and commercial expectations for each of these tiers.

# 8 - Paygate Limits and Commercial Expectations

Following our paygate model, we have clear limits and commercial expectations for each tier. The Free tier has hard ceilings on requests and data access; it's purely for initial discovery, not sustained high-volume use. The Pro tier is our paid path for active integrations, designed for SMBs with standard commercial terms. And Enterprise is for high-volume, contract-bound access, with custom limits and dedicated support. Our team discipline here is paramount: never bypass quota controls in ad hoc code, and never grant enterprise access without formal approval. This leads us directly into how we manage access to our MCP tools and maintain gating discipline.

# 9 - MCP Tool Access and Gating Discipline

Our paygate limits demand strict discipline, especially when it comes to MCP tool access and gating. Any new or unrecognized tool defaults to Enterprise-only treatment; we don't assume anything. Federation endpoints are also strictly gated, requiring formal policy review for any public access. When an operator verifies access, they must check the authentication context, the user's tier entitlement, and all policy headers. This isn't optional; release work must validate gate behavior both before and after deployment. Now, let's look at how these responsibilities are distributed across our functions, especially in support scenarios.

# 10 - Support Responsibilities by Function

Given our strict gating discipline, clear support responsibilities are essential for smooth operations. Product and Support are on the front lines, capturing user impact and mapping it to affected flows, while also handling initial communications. Engineering and Platform focus on rapid triage, safe mitigation, and deploying code fixes. Security and Ops handle critical issues like leak exposure, secret rotation, and preserving audit trails. And the Founding Team prioritizes incidents against trust and revenue, assessing legal exposure, and managing stakeholders. Speed and clarity are key here; we expect no blaming handoffs. Next, we'll cover the basics of our incident response.

# 11 - Incident Response Basics

When an incident strikes, our response strategy is clear: mitigate first, then diagnose. This approach ensures we restore stability quickly, minimizing impact on our users and our platform. We just discussed how different functions contribute to incident support; now let's dive into the specifics of how we respond. P0 incidents, like core flow outages or security breaches, demand immediate, all-hands attention. For P1 incidents, where there's major degradation but workarounds exist, urgent mitigation within the current shift is critical. If an algorithm regression occurs, we roll back to the last known-good deployment without delay. We then use audit logs to pinpoint the exact change and keep stakeholders informed with factual, concise updates. This disciplined approach is foundational to maintaining trust, and it leads us directly into our security operations baseline.

# 12 - Security Operations Baseline

Our security operations baseline is non-negotiable; failures here can cause irreversible damage to trust and expose us to legal risks. We just covered how to respond to incidents; now let's talk about preventing them. First, secret hygiene: never commit live secrets or environment files. Use .gitignore rigorously. Second, secure storage: all keys must reside in managed secret managers and controlled dashboards. Third, the principle of least privilege: validate access for all mutations, admin actions, and integration keys. Finally, vulnerability reporting: always use private channels, never public issue threads. These practices are critical for protecting our platform and our users. This brings us to the specific workflow for secret hygiene and rotation.

# 13 - Secret Hygiene and Rotation Workflow

Secret hygiene isn't just a best practice; it's an operational procedure. We just outlined our security operations baseline; now let's get into the mechanics of how we manage secrets. Rotation is triggered by several events: if a secret is exposed in Git or chat, if personnel changes, or if an upstream provider is compromised. The rotation sequence is critical: first, roll affected keys immediately. Then, update runtime secret stores and verify all dependent services. After that, revoke the old keys and record the completion in the incident trail. This disciplined approach to secret rotation is vital for our security posture. Next, we'll discuss how we manage identity and access across our systems.

# 14 - Identity and Access Controls

Managing identity and access is crucial; access drift is a common early-stage security failure. We just discussed the workflow for secret hygiene and rotation; now let's focus on who has access to what. For system provisioning, we use automated systems like Stripe SCIM for critical access where available. Rapid offboarding is also key: we remove orphaned access immediately during personnel transitions to prevent security gaps. For governance and audit, every high-risk credential must have an explicit, documented owner for accountability. We also conduct regular access reviews for production, infrastructure, and billing systems. These controls are essential for maintaining a secure environment. Now, let's look at the guardrails we put in place for every release and go-live event.

# 15 - Release and Go-Live Guardrails

Every release is both a product and an operations event, and we treat it with the seriousness it deserves. We just covered identity and access controls; now let's talk about how we ensure releases are secure and stable. Before release, build and sync checks must pass, route and sitemap validity confirmed, and CI secrets present in the target platform. We also review migration scripts. During release, we monitor health and readiness endpoints, track key user journey metrics, watch for unexpected error spikes, and verify live log streaming. After release, we confirm no paygate regressions, validate auth flows for all tiers, and perform a final verification of intelligence signals. We then close the release incident ticket. This rigorous process ensures we maintain trust and reliability with every deployment.

# 16 - Responsible Use and User Safety

User safety is non-negotiable; it's built into our product and our legal standing. We just covered how every release needs guardrails, and now we're focusing on the critical aspect of responsible use. Our backend logic enforces gambling controls, not just front-end displays. You must never present our outputs as guaranteed wins; always frame them as statistical probabilities. And if you see any policy-violating behavior, escalate it immediately to the safety lead.

# 17 - 30/60/90 Day Ramp Plan

Now, let's talk about your ramp-up plan, building on that foundation of responsible use. This isn't just a checklist; it's a measurable path to operational readiness. In your first 30 days, you'll immerse yourself in our architecture, policies, and playbooks. By 60 days, you'll own a reliability or support workflow and deliver a process improvement. And at 90 days, you'll be leading incident rotations and presenting hardening recommendations, earning full production access certification.

# 18 - Practical Drills (Required)

This ramp plan isn't theoretical; it's grounded in practical drills. These are required, not optional, to ensure you can execute under pressure. You'll validate paygate behavior across all tiers and participate in a secret leak tabletop exercise. We'll also simulate production incidents for rollback practice and triage common authentication failures. These drills build muscle memory, ensuring you can perform when it counts.

# 19 - Team Agreements

These practical drills reinforce our team agreements, which are the bedrock of our operational culture. We never bypass policy for speed, and we don't hide reliability or security risks. Our commitment is to escalate early with evidence and always leave systems safer after each incident. These aren't just words; they're the cultural commitments that define our technical quality.

# 20 - Action Items and Certification

These team agreements lead directly to your action items and certification, marking your full operational readiness. You'll complete an onboarding checklist in your first week and pass knowledge checks for operations and security. You must also complete at least one supervised incident drill. Only then will you receive access certification for production-level privileges, ensuring you're ready to operate with confidence.
