export type PlatformCategory =
  | "education"
  | "ai-workstation"
  | "engineering"
  | "travel"
  | "marketplace"
  | "sports"
  | "supply-chain"
  | "shared-infrastructure"
  | "treasury";

export type Maturity = "live" | "active-build" | "emerging" | "future";

export type PlatformNode = {
  name: string;
  slug: string;
  category: PlatformCategory;
  maturity: Maturity;
  repo: string;
  role: string;
  signature: string;
  sharedSystems: string[];
};

export type SystemPlane = {
  name: string;
  headline: string;
  description: string;
  systems: string[];
  futurePotential: string;
};

export type SignatureLoop = {
  name: string;
  ownedBy: string;
  summary: string;
  motion: string[];
};

export type BuildWave = {
  wave: string;
  title: string;
  objective: string;
  moves: string[];
};

export const tolaniGridSummary = {
  name: "The Tolani Grid",
  statement:
    "A shared enterprise operating layer that gives every Tolani product a common identity, memory, communication, governance, and operator model while preserving distinct brand experiences.",
  thesis:
    "The portfolio becomes memorable when every platform feels purpose-built on the surface, but structurally consistent underneath.",
};

export const platformNodes: PlatformNode[] = [
  {
    name: "Tolani Labs",
    slug: "tolani-labs",
    category: "education",
    maturity: "live",
    repo: "C:\\Users\\terri\\Projects\\Tolani Labs",
    role: "Education, credentials, student success, and portfolio management surface",
    signature: "DEBO as the student AI workstation and management as the operating layer",
    sharedSystems: ["identity", "journey-memory", "communications", "management-control"],
  },
  {
    name: "DEBO",
    slug: "debo",
    category: "ai-workstation",
    maturity: "active-build",
    repo: "C:\\Users\\terri\\Projects\\DEBO",
    role: "AI dashboard and workstation for guided journeys, research, and operations",
    signature: "Take the journey one user at a time through memory, coaching, and orchestration",
    sharedSystems: ["identity", "journey-memory", "research", "communications"],
  },
  {
    name: "DevBot",
    slug: "devbot",
    category: "engineering",
    maturity: "active-build",
    repo: "C:\\Users\\terri\\Projects\\DevBot",
    role: "Teammate-grade engineering execution, approvals, and governed automation",
    signature: "Turn team requests into reviewed, audited, and teachable software execution",
    sharedSystems: ["identity", "journey-memory", "approval-policy", "management-control"],
  },
  {
    name: "Hook Travel",
    slug: "hook-travel",
    category: "travel",
    maturity: "active-build",
    repo: "C:\\Users\\terri\\Projects\\HookTravel",
    role: "Concierge travel planning, military support, and itinerary operations",
    signature: "AI-first concierge with human escalation for high-trust service recovery",
    sharedSystems: ["communications", "identity", "crm", "service-ops"],
  },
  {
    name: "Listo Marketplace",
    slug: "listo-marketplace",
    category: "marketplace",
    maturity: "emerging",
    repo: "C:\\Users\\terri\\Projects\\listo-platform",
    role: "Marketplace operations, buyer-seller support, and commercial onboarding",
    signature: "Marketplace support and merchant growth on a shared operator backbone",
    sharedSystems: ["communications", "identity", "crm", "trust-safety"],
  },
  {
    name: "BettorsACE",
    slug: "bettorsace",
    category: "sports",
    maturity: "live",
    repo: "C:\\Users\\terri\\Projects\\TC-gaming-platform",
    role: "Dynamic picks platform, War Room, bankroll flows, and AI phone agent operations",
    signature: "A dynamic sports operations layer where picks, coaching, payments, and support share one platform brain",
    sharedSystems: ["communications", "journey-memory", "payments", "war-room-ops"],
  },
  {
    name: "Tolani Supply Group",
    slug: "tsg",
    category: "supply-chain",
    maturity: "active-build",
    repo: "C:\\Users\\terri\\Projects\\TolaniSupplyGroup",
    role: "Trade, sourcing, tariff, and logistics control tower",
    signature: "Client-specific trade intelligence with control-tower visibility",
    sharedSystems: ["communications", "crm", "operator-console", "analytics"],
  },
  {
    name: "tc-platform",
    slug: "tc-platform",
    category: "shared-infrastructure",
    maturity: "active-build",
    repo: "C:\\Users\\terri\\Projects\\tc-platform",
    role: "Shared brain, MCP, model routing, and multi-product infrastructure substrate",
    signature: "The backend cognitive substrate for multi-product agent reasoning and tool access",
    sharedSystems: ["model-routing", "mcp", "shared-brain", "service-layer"],
  },
  {
    name: "Tolani Ecosystem DAO / TUT",
    slug: "tolani-dao",
    category: "treasury",
    maturity: "emerging",
    repo: "C:\\Users\\terri\\Projects\\Tolani Ecosystem DAO",
    role: "Treasury, token, and ecosystem coordination layer",
    signature: "A future value and incentive rail once operational products are stable and measured",
    sharedSystems: ["treasury", "governance", "identity", "reward-layer"],
  },
];

export const systemPlanes: SystemPlane[] = [
  {
    name: "Identity Plane",
    headline: "One identity model, multiple brand surfaces",
    description:
      "Students, travelers, bettors, operators, developers, and enterprise clients should authenticate differently on the surface but map into one governed identity graph underneath.",
    systems: ["Auth0", "roles and claims", "cohort/tenant modeling", "management access"],
    futurePotential:
      "Cross-brand identity resolution, brand-scoped permissions, and machine-to-machine admin flows",
  },
  {
    name: "Journey Memory Plane",
    headline: "Longitudinal memory becomes the moat",
    description:
      "DEBO, DevBot, and coaching products should remember what the user attempted, how it performed, what advice helped, and when to change posture.",
    systems: ["journey snapshots", "memory events", "reflection engine", "intervention policy"],
    futurePotential:
      "Shared memory contracts across education, engineering, and coaching without leaking private context",
  },
  {
    name: "Communications Plane",
    headline: "A hybrid enterprise network with AI-first routing",
    description:
      "Voice, SMS, WhatsApp, email, Discord, and web chat should act like one network with brand-specific senders and parent-company oversight.",
    systems: ["HQ switchboard", "brand lines", "voice CRM", "AI receptionists", "operator queues"],
    futurePotential:
      "A portfolio-wide operator graph with real-time transcript, escalation, and conversion telemetry",
  },
  {
    name: "Commerce Plane",
    headline: "Payments and upgrades should feel native to every workflow",
    description:
      "Pricing, sign-in, onboarding, deposits, payouts, and subscriptions must route users into the right next step instead of static checkout pages.",
    systems: ["post-signin flows", "Stripe checkout", "Connect onboarding", "billing controls"],
    futurePotential:
      "Unified entitlements, portfolio offers, and later TUT-driven incentive mechanics",
  },
  {
    name: "Operator Plane",
    headline: "Every product needs a command layer",
    description:
      "War Room, management dashboards, trust metrics, and route-aware consoles are how the portfolio becomes governable at scale.",
    systems: ["War Room", "management snapshot", "Voice CRM", "DEBO operator views"],
    futurePotential:
      "One cross-brand executive console with drill-down into each product’s live posture",
  },
  {
    name: "Knowledge and Research Plane",
    headline: "Live research should be governed, cited, and contextual",
    description:
      "Parallel, model routing, and internal toolchains should give products current context without losing traceability or trust.",
    systems: ["Parallel research", "MCP tools", "model router", "source-backed workflows"],
    futurePotential:
      "Product-specific copilots that can research, act, and explain with controlled provenance",
  },
];

export const signatureLoops: SignatureLoop[] = [
  {
    name: "Student Loop",
    ownedBy: "Tolani Labs + DEBO",
    summary: "Student enters -> DEBO guides -> memory captures -> management measures -> learner returns stronger",
    motion: ["admit", "guide", "remember", "reflect", "credential"],
  },
  {
    name: "Engineering Loop",
    ownedBy: "DevBot + DEBO",
    summary: "Team request enters -> governed execution happens -> approval teaches -> memory improves future work",
    motion: ["request", "execute", "approve", "teach", "compound"],
  },
  {
    name: "Support and Conversion Loop",
    ownedBy: "HQ + brand communications",
    summary: "Call or message enters -> AI triages -> brand route resolves -> human escalates when needed -> follow-up converts",
    motion: ["route", "assist", "qualify", "escalate", "convert"],
  },
  {
    name: "Bettor Coaching Loop",
    ownedBy: "BettorsACE",
    summary: "User asks -> system checks memory and risk -> guidance adapts -> outcomes are measured -> coaching improves",
    motion: ["observe", "coach", "protect", "settle", "learn"],
  },
  {
    name: "Trade Intelligence Loop",
    ownedBy: "TSG",
    summary: "Client request enters -> trade context and tariff logic resolve -> operator acts -> client history compounds",
    motion: ["intake", "analyze", "route", "execute", "retain"],
  },
];

export const buildWaves: BuildWave[] = [
  {
    wave: "Wave 1",
    title: "Standardize the shared operating planes",
    objective:
      "Finish the identity, communications, journey-memory, and operator surfaces already emerging across the workspace.",
    moves: [
      "Make HQ + brand communications the official operating model.",
      "Finish DEBO as the student AI workstation and operator shell.",
      "Keep post-signin, payout, and support flows server-driven across products.",
    ],
  },
  {
    wave: "Wave 2",
    title: "Converge portfolio telemetry and management",
    objective:
      "Let Tolani Labs management understand business logic, operational metrics, and live product posture from one place.",
    moves: [
      "Bring product-level KPIs into a shared management registry.",
      "Expose trust, support, and journey metrics portfolio-wide.",
      "Add communications and operator data to the parent-company layer.",
    ],
  },
  {
    wave: "Wave 3",
    title: "Turn the portfolio into one memorable enterprise system",
    objective:
      "Preserve distinct brands on the surface while making the underlying engineering unmistakably Tolani.",
    moves: [
      "Shared identity, memory, and communications across brands.",
      "One executive operating model for AI, support, and commerce.",
      "Use TUT/DAO only after the operational products are measurable and trusted.",
    ],
  },
];

export const enterprisePossibilities = [
  "A Tolani executive console that shows learner, engineering, support, and revenue posture in one view",
  "Cross-brand operator routing where HQ triages and hands calls to the right AI workstation or human queue",
  "A portfolio journey memory standard reused by students, bettors, engineers, and clients",
  "AI-first concierge layers for Labs, Hook Travel, and BettorsACE with shared audit and escalation logic",
  "Brand-specific front doors with one unmistakable engineering language beneath them",
];
