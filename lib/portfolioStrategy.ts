export type PlanStage = "live" | "scale-ready" | "active-build" | "emerging";

export type RevenueLane = {
  name: string;
  model: string;
  profitabilityLever: string;
};

export type FundingSummary = {
  narrative: string;
  recommendedCapital: string;
  useOfFunds: string[];
  diligenceHooks: string[];
};

export type ProfitabilitySchema = {
  revenueEngine: string;
  costStructure: string[];
  marginLevers: string[];
  proofMetrics: string[];
};

export type PlatformPlan = {
  key: string;
  name: string;
  domain: string;
  repo: string;
  stage: PlanStage;
  category: string;
  headline: string;
  summary: string;
  idealCustomers: string[];
  flagshipProducts: string[];
  monetizationSchema: RevenueLane[];
  profitabilitySchema: ProfitabilitySchema;
  marketingPriorities: string[];
  backendSyncPriorities: string[];
  ninetyDayMoves: string[];
  fundingSummary: FundingSummary;
};

export type StakeholderBrief = {
  name: string;
  audience: string;
  whyNow: string;
  offer: string;
  proofPack: string[];
};

export type TeamingEvent = {
  name: string;
  host: string;
  objective: string;
  audience: string;
  signatureOutcome: string;
  requiredAssets: string[];
  followThrough: string[];
};

export type PurchaseChannelStatus =
  | "live-now"
  | "operator-led"
  | "pilot"
  | "private";

export type PurchaseChannel = {
  key: string;
  platformKey: string;
  platformName: string;
  route: string;
  label: string;
  href: string;
  buyer: string;
  summary: string;
  note: string;
  ctaLabel: string;
  status: PurchaseChannelStatus;
  featured?: boolean;
};

export const portfolioStrategySummary = {
  name: "Tolani Portfolio Strategy Pack",
  thesis:
    "Each Tolani platform needs its own monetization logic on the surface and one shared operating language underneath. The portfolio becomes fundable when public narratives, backend truth, and profitability mechanics all point in the same direction.",
  operatingRule:
    "Do not market speculative capability. Public claims should trail or match real backend logic, and every launch should have a measurable path to margin.",
};

export const platformPlans: PlatformPlan[] = [
  {
    key: "tolani-labs",
    name: "Tolani Labs",
    domain: "tolanilabs.io",
    repo: "C:\\Users\\terri\\Projects\\Tolani Labs",
    stage: "scale-ready",
    category: "education + AI workstation",
    headline: "A learner platform where DEBO becomes the AI dashboard and workstation for measurable student progress.",
    summary:
      "Tolani Labs should monetize around high-trust learner outcomes: admissions, guided journeys, credentials, and managed AI workstations for students and workforce partners.",
    idealCustomers: [
      "career-switching learners",
      "workforce development partners",
      "schools and training cohorts",
      "enterprise upskilling programs",
    ],
    flagshipProducts: ["Tolani Portal", "DEBO student workstation", "management console"],
    monetizationSchema: [
      {
        name: "cohort tuition",
        model: "per learner or per cohort seat",
        profitabilityLever: "digital curriculum and AI workstation reuse keep delivery gross margins high after curriculum creation",
      },
      {
        name: "enterprise workforce packages",
        model: "annual contract with seat bundles and reporting",
        profitabilityLever: "management tooling and reporting compound without proportional support headcount",
      },
      {
        name: "credentialing and premium workstation access",
        model: "tiered subscription on top of core learning access",
        profitabilityLever: "premium AI tooling increases ARPU with minimal incremental content cost",
      },
    ],
    profitabilitySchema: {
      revenueEngine: "Recurring education revenue paired with premium AI workstation access and B2B training contracts.",
      costStructure: ["curriculum creation", "student success staffing", "AI inference", "partner acquisition"],
      marginLevers: [
        "reuse one DEBO workstation across multiple cohorts",
        "automate onboarding and support through guided flows",
        "sell enterprise reporting and management features at high-margin contract prices",
      ],
      proofMetrics: [
        "student activation-to-completion rate",
        "credential issuance velocity",
        "DEBO workstation weekly active rate",
        "enterprise contract expansion",
      ],
    },
    marketingPriorities: [
      "position DEBO as the student AI dashboard and workstation, not a generic chatbot",
      "lead with outcomes, cohorts, credentials, and workforce alignment",
      "show management visibility and guided journeys as operational proof",
    ],
    backendSyncPriorities: [
      "keep Auth0 student claims aligned with DEBO route protection",
      "tie management snapshots to real learner and workstation telemetry",
      "persist research, journey, and support signals as inspectable student context",
    ],
    ninetyDayMoves: [
      "convert DEBO into the primary post-login student experience",
      "ship a partner-ready admissions and cohort reporting flow",
      "publish live proof blocks showing guided progress and workstation usage",
    ],
    fundingSummary: {
      narrative: "This is the portfolio's clearest path to high-trust recurring revenue with defensible learner data and AI workflow IP.",
      recommendedCapital: "operator-aligned education capital, workforce grants, and strategic institutional partnerships",
      useOfFunds: [
        "student acquisition and admissions operations",
        "curriculum and credential productization",
        "DEBO workstation refinement and management telemetry",
      ],
      diligenceHooks: [
        "documented student journey instrumentation",
        "cohort economics with support cost benchmarks",
        "evidence of credential completion and partner demand",
      ],
    },
  },
  {
    key: "tccg-work",
    name: "TCCG.work",
    domain: "tccg.work",
    repo: "C:\\Users\\terri\\Projects\\TCCG.work",
    stage: "active-build",
    category: "construction and project delivery",
    headline: "A modern construction front door focused on premium project intake, consultation, and disciplined delivery positioning.",
    summary:
      "TCCG should monetize like a serious services business: project fees, retainers, and project-management margins supported by a cleaner digital intake and operations layer.",
    idealCustomers: [
      "commercial property owners",
      "general contractors and public-sector buyers",
      "developers needing project oversight",
      "high-trust regional construction partners",
    ],
    flagshipProducts: ["brand site", "consultation intake", "project delivery profiles"],
    monetizationSchema: [
      {
        name: "design-build projects",
        model: "contract revenue with milestone billing",
        profitabilityLever: "better qualification improves close rates and reduces wasteful bid volume",
      },
      {
        name: "owner representation and PM retainers",
        model: "monthly advisory or fixed-fee engagement",
        profitabilityLever: "retainers smooth revenue between large projects and lift blended margins",
      },
      {
        name: "vendor and preconstruction services",
        model: "estimate, planning, and coordination fees",
        profitabilityLever: "early-stage advisory work monetizes pipeline development",
      },
    ],
    profitabilitySchema: {
      revenueEngine: "High-ticket project revenue supported by recurring advisory and preconstruction services.",
      costStructure: ["business development", "estimating", "project staff", "field operations"],
      marginLevers: [
        "use brand and intake improvements to qualify leads before human effort is spent",
        "expand owner-side advisory where margins are higher than field-heavy work",
        "standardize proposal and project communication assets",
      ],
      proofMetrics: [
        "qualified consultation rate",
        "proposal-to-win conversion",
        "gross margin by project class",
        "retainer revenue share",
      ],
    },
    marketingPriorities: [
      "keep the site premium, direct, and services-led",
      "show featured delivery profiles instead of generic case-study filler",
      "make consultation and project review the dominant CTA",
    ],
    backendSyncPriorities: [
      "connect consultation requests to a real CRM or project pipeline",
      "track project inquiry source, deal stage, and win rates",
      "mirror public service lanes with internal delivery playbooks",
    ],
    ninetyDayMoves: [
      "wire lead capture into an accountable pipeline",
      "publish three proof-backed delivery narratives",
      "add project qualification logic before human callbacks",
    ],
    fundingSummary: {
      narrative: "TCCG is less a venture-style asset and more a disciplined cashflow and credibility engine for the enterprise.",
      recommendedCapital: "working capital, strategic debt, and partner-backed project financing",
      useOfFunds: [
        "business development and proposal operations",
        "project mobilization and field readiness",
        "digital intake and pipeline systems",
      ],
      diligenceHooks: [
        "project margin by service line",
        "backlog quality and close rate",
        "evidence of repeat client demand",
      ],
    },
  },
  {
    key: "bettorsace",
    name: "BettorsACE",
    domain: "bettorsace.win",
    repo: "C:\\Users\\terri\\Projects\\TC-gaming-platform",
    stage: "live",
    category: "sports intelligence + coaching",
    headline: "A dynamic sports platform where War Room, Pro Picks, payments, coaching, and support operate as one product system.",
    summary:
      "BettorsACE should monetize around subscriptions and premium access while protecting trust through transparent outcomes, responsible-play logic, and dynamic post-signin journeys.",
    idealCustomers: [
      "serious retail bettors",
      "sports subscribers seeking structure over noise",
      "premium members wanting War Room access",
    ],
    flagshipProducts: ["War Room", "Pro Picks", "Voice CRM", "dynamic post-signin flow"],
    monetizationSchema: [
      {
        name: "subscription tiers",
        model: "monthly or annual plan upgrades",
        profitabilityLever: "software margins improve as onboarding, support, and retention become more automated",
      },
      {
        name: "premium War Room access",
        model: "higher-value recurring tier or event-style premium access",
        profitabilityLever: "community and operator surfaces increase retention more than support cost",
      },
      {
        name: "partner and affiliate monetization",
        model: "selective referral and co-marketing agreements",
        profitabilityLever: "incremental revenue attaches to existing traffic without being the core trust promise",
      },
    ],
    profitabilitySchema: {
      revenueEngine: "Recurring subscriptions anchored by strong onboarding, guided picks, and premium community access.",
      costStructure: ["odds data", "support and moderation", "payments", "content and AI operations"],
      marginLevers: [
        "keep the pick board server-driven and reduce support friction through dynamic flows",
        "use voice and messaging automation for first-line support",
        "improve retention through transparent outcome reporting rather than broad acquisition spend",
      ],
      proofMetrics: [
        "subscriber conversion from sign-in to paid",
        "plan retention by tier",
        "War Room engagement",
        "support containment rate and refund rate",
      ],
    },
    marketingPriorities: [
      "sell discipline, edge, and transparency instead of hype",
      "turn War Room into the flagship premium narrative",
      "make responsible-play posture part of the trust story",
    ],
    backendSyncPriorities: [
      "keep post-signin flows tied to live entitlements and support state",
      "ensure public outcome claims come from settlement-derived server logic",
      "connect voice, CRM, and payout flows to one operator layer",
    ],
    ninetyDayMoves: [
      "deploy the new post-signin flow system",
      "publish premium War Room proof and member journey narratives",
      "finish phone-agent rollout with Twilio configuration and ops dashboards",
    ],
    fundingSummary: {
      narrative: "BettorsACE is the clearest near-term consumer revenue engine if trust, retention, and support costs stay controlled.",
      recommendedCapital: "growth capital tied to retention proof, not pure top-of-funnel spend",
      useOfFunds: [
        "retention and lifecycle growth",
        "operator tooling and support automation",
        "data and platform reliability",
      ],
      diligenceHooks: [
        "subscription cohort retention",
        "support cost per active subscriber",
        "settlement-backed performance credibility",
      ],
    },
  },
  {
    key: "hook-travel",
    name: "Hook Travel",
    domain: "hooktravel.app",
    repo: "C:\\Users\\terri\\Projects\\HookTravel",
    stage: "active-build",
    category: "travel concierge",
    headline: "An AI-first concierge for travel planning, military routing, and high-trust service recovery.",
    summary:
      "Hook Travel should monetize through service fees, commissions, and premium concierge layers while keeping service response and itinerary reliability as the real moat.",
    idealCustomers: [
      "military and veteran travelers",
      "families managing complex itineraries",
      "high-touch concierge clients",
      "group travel organizers",
    ],
    flagshipProducts: ["concierge workspace", "research and itinerary operations", "support and recovery flows"],
    monetizationSchema: [
      {
        name: "trip planning fees",
        model: "per itinerary or retained concierge package",
        profitabilityLever: "AI-assisted research reduces planning time per trip",
      },
      {
        name: "supplier commissions",
        model: "air, lodging, package, and partner payouts",
        profitabilityLever: "commission revenue attaches to trips already being serviced",
      },
      {
        name: "premium support and travel clubs",
        model: "membership or annual concierge tier",
        profitabilityLever: "membership recurring revenue smooths seasonality",
      },
    ],
    profitabilitySchema: {
      revenueEngine: "Fee-based concierge layered with partner commissions and premium service memberships.",
      costStructure: ["agent support time", "supplier ops", "customer service", "trip recovery"],
      marginLevers: [
        "use AI to reduce itinerary research time",
        "route urgent cases to humans only when trust risk is high",
        "standardize post-booking support and documentation flows",
      ],
      proofMetrics: [
        "time to itinerary proposal",
        "trip conversion rate",
        "commission capture rate",
        "service recovery satisfaction",
      ],
    },
    marketingPriorities: [
      "lead with concierge outcomes and military travel trust",
      "show real itinerary and service-recovery workflows",
      "differentiate from generic booking sites through supported travel operations",
    ],
    backendSyncPriorities: [
      "tie research and concierge flows to CRM and itinerary state",
      "keep support escalation paths visible to operators",
      "capture lead source, itinerary creation time, and supplier yield",
    ],
    ninetyDayMoves: [
      "finalize concierge intake and follow-up logic",
      "stand up service-recovery workflows with voice and messaging",
      "publish partner-facing and traveler-facing proof pages",
    ],
    fundingSummary: {
      narrative: "Hook Travel can become a differentiated high-trust service brand if it proves concierge efficiency and repeat booking behavior.",
      recommendedCapital: "strategic travel partnerships and service-operations capital",
      useOfFunds: [
        "supplier and partner onboarding",
        "customer support operations",
        "travel product and itinerary tooling",
      ],
      diligenceHooks: [
        "proposal-to-book rate",
        "repeat traveler rate",
        "service recovery response times",
      ],
    },
  },
  {
    key: "listo-marketplace",
    name: "Listo Marketplace",
    domain: "listomarket.app",
    repo: "C:\\Users\\terri\\Projects\\listo-platform",
    stage: "emerging",
    category: "marketplace and merchant operations",
    headline: "A marketplace that should be built around merchant growth, trust, and support instrumentation before scale spend.",
    summary:
      "Listo's business plan should prioritize take-rate economics, merchant tooling, and dispute-resistant operations before consumer growth capital is deployed.",
    idealCustomers: [
      "independent merchants",
      "small buyers and sellers",
      "specialty commerce communities",
    ],
    flagshipProducts: ["merchant onboarding", "buyer-seller support", "trust and safety operations"],
    monetizationSchema: [
      {
        name: "transaction take rate",
        model: "percentage of GMV",
        profitabilityLever: "scales well once support and fraud controls are disciplined",
      },
      {
        name: "merchant subscriptions",
        model: "monthly seller tools, listings, and analytics",
        profitabilityLever: "high-margin SaaS revenue de-risks pure GMV dependence",
      },
      {
        name: "value-added services",
        model: "logistics, payments, or promotion add-ons",
        profitabilityLever: "improves margin per merchant without requiring marketplace-wide scale first",
      },
    ],
    profitabilitySchema: {
      revenueEngine: "Take-rate revenue paired with subscription-style merchant tooling.",
      costStructure: ["merchant acquisition", "dispute resolution", "fraud and trust operations", "payments"],
      marginLevers: [
        "focus on merchant quality before marketplace breadth",
        "instrument trust and support costs early",
        "bundle merchant tools that increase ARPU independently of GMV swings",
      ],
      proofMetrics: [
        "merchant activation",
        "GMV per active merchant",
        "dispute rate",
        "subscription attach rate",
      ],
    },
    marketingPriorities: [
      "market to early merchant quality, not broad consumer scale",
      "show safer onboarding and operator-backed trust flows",
      "position Listo as a managed marketplace, not a generic listing board",
    ],
    backendSyncPriorities: [
      "instrument trust and safety from day one",
      "connect merchant onboarding to CRM and support queues",
      "track disputes, merchant health, and recurring merchant revenue",
    ],
    ninetyDayMoves: [
      "define the first merchant segment clearly",
      "build operator visibility for onboarding and disputes",
      "ship a small but tight merchant-facing landing narrative",
    ],
    fundingSummary: {
      narrative: "Listo is fundable only after early merchant retention and trust economics are visible.",
      recommendedCapital: "patient seed or strategic commerce capital after merchant proof",
      useOfFunds: [
        "merchant acquisition experiments",
        "trust and safety tooling",
        "seller-facing product and analytics",
      ],
      diligenceHooks: [
        "merchant repeat activity",
        "trust and dispute metrics",
        "take-rate and subscription mix",
      ],
    },
  },
  {
    key: "tsg",
    name: "Tolani Supply Group",
    domain: "tolanisupplygroup.com",
    repo: "C:\\Users\\terri\\Projects\\TolaniSupplyGroup",
    stage: "active-build",
    category: "trade and logistics control tower",
    headline: "A B2B control-tower business for sourcing, tariff intelligence, freight coordination, and account operations.",
    summary:
      "TSG should monetize through retained accounts, trade-advisory services, and transaction margins, with the eventual goal of becoming a defensible operator layer for client logistics.",
    idealCustomers: [
      "import/export operators",
      "SMBs with cross-border sourcing needs",
      "freight and customs-sensitive accounts",
    ],
    flagshipProducts: ["trade intelligence", "account operations", "control-tower support"],
    monetizationSchema: [
      {
        name: "account retainers",
        model: "monthly client management agreements",
        profitabilityLever: "predictable retainer revenue stabilizes a variable transaction business",
      },
      {
        name: "transaction and sourcing margins",
        model: "spread or fee on fulfilled sourcing and logistics work",
        profitabilityLever: "better data and operator systems improve throughput per account team member",
      },
      {
        name: "trade advisory subscriptions",
        model: "recurring intelligence and compliance access",
        profitabilityLever: "high-margin information services increase blended margins",
      },
    ],
    profitabilitySchema: {
      revenueEngine: "Retained client revenue layered with transaction and advisory economics.",
      costStructure: ["account management", "trade expertise", "partner operations", "compliance and documentation"],
      marginLevers: [
        "standardize client intake and routing",
        "convert bespoke trade knowledge into repeatable advisory products",
        "use control-tower tooling to manage more accounts per operator",
      ],
      proofMetrics: [
        "retainer renewal rate",
        "margin per active account",
        "turnaround time on trade requests",
        "advisory attachment rate",
      ],
    },
    marketingPriorities: [
      "speak to reliability, tariffs, customs, and operator control",
      "keep B2B proof and account service language front and center",
      "sell the control tower, not generic freight sourcing",
    ],
    backendSyncPriorities: [
      "build account-level operator visibility and document workflows",
      "track lead source, request turnaround, and renewal metrics",
      "align public service lanes with actual trade and logistics workflows",
    ],
    ninetyDayMoves: [
      "publish the first control-tower service narrative",
      "stand up account intake and renewal tracking",
      "package one advisory subscription offer",
    ],
    fundingSummary: {
      narrative: "TSG is most attractive to strategic operators and trade partners once its retained-account model is visible.",
      recommendedCapital: "strategic partner capital and working-capital facilities",
      useOfFunds: [
        "account operations and compliance workflows",
        "client acquisition in one target corridor",
        "trade intelligence productization",
      ],
      diligenceHooks: [
        "renewal rate on retained accounts",
        "gross margin by account segment",
        "documentation and turnaround discipline",
      ],
    },
  },
  {
    key: "tut-dao",
    name: "TUT / Tolani Ecosystem DAO",
    domain: "tuttoken.pw",
    repo: "C:\\Users\\terri\\Projects\\Tolani Ecosystem DAO",
    stage: "emerging",
    category: "treasury and incentive rail",
    headline: "A future reward and governance layer that should follow, not precede, operational proof in the live businesses.",
    summary:
      "TUT should be treated as a measured incentive and treasury system after the operating products have clean metrics, not as the lead monetization story.",
    idealCustomers: [
      "ecosystem members",
      "future community participants",
      "partner networks with measurable platform engagement",
    ],
    flagshipProducts: ["token contract", "treasury coordination", "future reward layer"],
    monetizationSchema: [
      {
        name: "ecosystem utility",
        model: "access, reward, and incentive mechanics tied to real product behavior",
        profitabilityLever: "only valuable if attached to proven product usage and governance value",
      },
      {
        name: "treasury programs",
        model: "governed ecosystem allocations and participation rails",
        profitabilityLever: "capital efficiency improves when incentives support existing profitable products",
      },
    ],
    profitabilitySchema: {
      revenueEngine: "Not a near-term standalone profit center; it should reinforce margin-positive platforms once product-market proof exists.",
      costStructure: ["legal and compliance", "security review", "treasury ops", "community management"],
      marginLevers: [
        "launch only after live products have measurable retention and reward hooks",
        "keep treasury and governance lightweight until utility is real",
        "use TUT to deepen profitable product engagement rather than substitute for revenue",
      ],
      proofMetrics: [
        "eligible ecosystem actions that can be rewarded",
        "product retention lift from rewards",
        "treasury discipline and audit readiness",
      ],
    },
    marketingPriorities: [
      "keep token messaging subordinate to the operating products",
      "explain utility only where there is real workflow attachment",
      "avoid speculative public language until the incentive design is measurable",
    ],
    backendSyncPriorities: [
      "keep token logic isolated from core product auth and payments until ready",
      "publish canonical contract and treasury state clearly",
      "tie any future rewards to real product telemetry, not vanity events",
    ],
    ninetyDayMoves: [
      "finish canonical contract and deployment readiness docs",
      "define reward eligibility tied to real platform actions",
      "keep public communications conservative and utility-led",
    ],
    fundingSummary: {
      narrative: "TUT is a strategic layer, not the primary funding hook; it becomes credible after the businesses prove traction.",
      recommendedCapital: "limited ecosystem and treasury capital after operating proof",
      useOfFunds: [
        "legal and technical hardening",
        "treasury controls",
        "reward design linked to real products",
      ],
      diligenceHooks: [
        "product telemetry that justifies incentives",
        "contract and treasury auditability",
        "clear non-speculative utility narrative",
      ],
    },
  },
];

export const stakeholderBriefs: StakeholderBrief[] = [
  {
    name: "Operating Revenue Track",
    audience: "operators, family offices, strategic cashflow investors",
    whyNow:
      "TCCG, BettorsACE, and TSG can produce near-term revenue if their public funnels and operator systems stay disciplined.",
    offer: "Back cashflow businesses and operator tooling rather than speculative portfolio breadth.",
    proofPack: [
      "qualified pipeline and conversion metrics",
      "support and operating cost benchmarks",
      "clear margin story by business line",
    ],
  },
  {
    name: "Education and Workforce Track",
    audience: "grants, workforce boards, institutional partners, education capital",
    whyNow:
      "Tolani Labs and DEBO can translate guided AI learning into measurable student outcomes and enterprise training value.",
    offer: "Support learner acquisition, cohort growth, and workstation tooling with outcome-linked reporting.",
    proofPack: [
      "student activation and completion metrics",
      "credential and cohort economics",
      "enterprise partner readiness material",
    ],
  },
  {
    name: "Strategic Partnership Track",
    audience: "travel partners, logistics partners, channel resellers, data and communications providers",
    whyNow:
      "Hook Travel, TSG, and BettorsACE all benefit from partners that can improve service quality faster than pure paid growth can.",
    offer: "Trade distribution, concierge reach, communications infrastructure, and co-marketing expansion.",
    proofPack: [
      "partner integration maps",
      "service-level expectations",
      "operator and escalation model",
    ],
  },
  {
    name: "Future Treasury Track",
    audience: "ecosystem members, DAO-aligned backers, long-horizon supporters",
    whyNow:
      "The treasury layer should be introduced only after the revenue platforms have measurable usage and repeat behavior.",
    offer: "A disciplined future incentive rail attached to real product activity rather than speculation.",
    proofPack: [
      "operating product telemetry",
      "treasury controls and audit readiness",
      "utility narrative tied to real workflows",
    ],
  },
];

export const teamingEvents: TeamingEvent[] = [
  {
    name: "Tolani Portfolio Demo Day",
    host: "Tolani Corp + Tolani Labs",
    objective: "Show how the portfolio fits together as one operating system while each brand keeps a distinct front door.",
    audience: "strategic partners, investors, institutional allies, senior operators",
    signatureOutcome: "A shared understanding of where the portfolio makes money, where it needs proof, and where collaboration fits.",
    requiredAssets: [
      "portfolio strategy one-pager",
      "live command surfaces and platform atlas",
      "per-platform proof blocks and operator metrics",
    ],
    followThrough: [
      "circulate stakeholder briefs within 24 hours",
      "capture partner interest by platform",
      "route follow-ups into the corporate communications network",
    ],
  },
  {
    name: "DEBO Student Workstation Showcase",
    host: "Tolani Labs",
    objective: "Demonstrate DEBO as the next-generation learner dashboard and workstation.",
    audience: "schools, workforce partners, mentors, student-success operators",
    signatureOutcome: "Convert curiosity about AI education into concrete cohort and partner conversations.",
    requiredAssets: [
      "student journey demo",
      "management reporting screenshots",
      "cohort pricing and credential plan",
    ],
    followThrough: [
      "route admissions and partnership leads into Tolani Labs CRM",
      "schedule cohort planning sessions",
      "share the education funding brief",
    ],
  },
  {
    name: "BettorsACE War Room Preview",
    host: "BettorsACE",
    objective: "Sell premium membership through a controlled live preview of the War Room and post-signin journey.",
    audience: "high-intent subscribers, affiliates, premium prospects",
    signatureOutcome: "Drive plan upgrades and prove that War Room is the premium flagship experience.",
    requiredAssets: [
      "live War Room walkthrough",
      "settlement-backed proof blocks",
      "support and voice-agent readiness narrative",
    ],
    followThrough: [
      "push qualified attendees into the premium signup flow",
      "track War Room trial-to-paid conversion",
      "capture objections for pricing and product tuning",
    ],
  },
  {
    name: "Hook Travel Concierge Partner Table",
    host: "Hook Travel",
    objective: "Turn suppliers and support partners into leverage for a high-trust concierge operation.",
    audience: "travel suppliers, community leaders, military networks, service partners",
    signatureOutcome: "Secure routing partners and supplier relationships that improve travel response quality.",
    requiredAssets: [
      "service-recovery operating flow",
      "concierge response-time targets",
      "partner onboarding brief",
    ],
    followThrough: [
      "move partners into formal onboarding",
      "publish approved partner offers on the site",
      "measure booking and recovery lift from each partner",
    ],
  },
  {
    name: "Trade Control Tower Briefing",
    host: "Tolani Supply Group",
    objective: "Present TSG as a disciplined account and trade-ops partner rather than a generic sourcing broker.",
    audience: "import/export clients, freight partners, customs and sourcing allies",
    signatureOutcome: "Open retained account conversations with buyers that need control, not just quotes.",
    requiredAssets: [
      "account intake workflow",
      "tariff and customs response examples",
      "retainer and advisory offer sheet",
    ],
    followThrough: [
      "route high-fit accounts into TSG intake",
      "convert one-off requests into retained relationships",
      "track turnaround and renewal discipline",
    ],
  },
];

export const portfolioMetrics = {
  planCount: platformPlans.length,
  revenueLaneCount: platformPlans.reduce((total, plan) => total + plan.monetizationSchema.length, 0),
  stakeholderTrackCount: stakeholderBriefs.length,
  teamingEventCount: teamingEvents.length,
};

export const purchaseChannels: PurchaseChannel[] = [
  {
    key: "tolani-labs-intake",
    platformKey: "tolani-labs",
    platformName: "Tolani Labs",
    route: "HQ switchboard -> Labs",
    label: "Route cohort and workstation planning through HQ",
    href: "/communications",
    buyer: "Schools, workforce partners, enterprise training teams",
    summary:
      "Use the corporate routing layer for admissions, cohort design, DEBO workstation planning, and institutional follow-through.",
    note:
      "Operator-led lane. Buyers should be routed into the Tolani Labs track without any wallet connection or browser-extension dependency.",
    ctaLabel: "View communications route",
    status: "operator-led",
    featured: true,
  },
  {
    key: "tccg-consultation",
    platformKey: "tccg-work",
    platformName: "TCCG.work",
    route: "Direct consultation intake",
    label: "Open the construction consultation front door",
    href: "https://tccg.work",
    buyer: "Property owners, developers, public-sector buyers",
    summary:
      "Project work should enter through a premium consultation and delivery-intake path rather than a generic corporate contact lane.",
    note:
      "This is a services-led purchase channel built around consultation, project scoping, and milestone-billed work.",
    ctaLabel: "Open TCCG.work",
    status: "live-now",
    featured: true,
  },
  {
    key: "bettorsace-pricing",
    platformKey: "bettorsace",
    platformName: "BettorsACE",
    route: "Live pricing + card checkout",
    label: "Open pricing and premium access",
    href: "https://bettorsace.win/pricing",
    buyer: "High-intent subscribers, War Room prospects, premium members",
    summary:
      "The current consumer purchase lane is the live pricing surface with plan selection, card checkout, and premium entitlement routing.",
    note:
      "This route is card and account based. No MetaMask, Keplr, or other wallet flow is required for the public purchase path.",
    ctaLabel: "Open BettorsACE pricing",
    status: "live-now",
    featured: true,
  },
  {
    key: "hook-travel-concierge",
    platformKey: "hook-travel",
    platformName: "Hook Travel",
    route: "Direct concierge intake",
    label: "Start the travel concierge path",
    href: "https://hooktravel.app",
    buyer: "Military travelers, families, high-touch concierge clients",
    summary:
      "Travel demand should enter through the concierge front door where itinerary planning, service recovery, and premium support are framed clearly.",
    note:
      "The commercial motion here is service intake and supported booking, not a wallet or token-gated purchase experience.",
    ctaLabel: "Open Hook Travel",
    status: "live-now",
    featured: true,
  },
  {
    key: "listo-pilot",
    platformKey: "listo-marketplace",
    platformName: "Listo Marketplace",
    route: "Pilot intake through HQ",
    label: "Route merchant and pilot interest through the switchboard",
    href: "/communications",
    buyer: "Early merchants, pilot partners, operator-led commerce teams",
    summary:
      "Listo should stay in a controlled merchant-pilot lane until trust, dispute, and activation economics are instrumented well enough for broader scale.",
    note:
      "Use the communications network to qualify the first merchant segment before public checkout or broad growth spend is introduced.",
    ctaLabel: "Review pilot routing",
    status: "pilot",
  },
  {
    key: "tsg-briefing",
    platformKey: "tsg",
    platformName: "Tolani Supply Group",
    route: "Control-tower briefing",
    label: "Start with a retained-account briefing",
    href: "/communications",
    buyer: "Import/export operators, sourcing teams, logistics accounts",
    summary:
      "TSG sales should begin with an operator-led control-tower conversation that qualifies account complexity before formal onboarding.",
    note:
      "This is a B2B advisory and account-intake channel, routed through the Tolani communications layer rather than a consumer checkout.",
    ctaLabel: "Open TSG routing",
    status: "operator-led",
    featured: true,
  },
  {
    key: "tut-brief",
    platformKey: "tut-dao",
    platformName: "TUT / Tolani Ecosystem DAO",
    route: "Private utility brief",
    label: "Keep TUT in a controlled, non-public lane",
    href: "/strategy",
    buyer: "Long-horizon ecosystem backers and governance stakeholders",
    summary:
      "The treasury and reward layer should be explained only in the context of real operating proof from the live businesses.",
    note:
      "There is no general public purchase channel here yet. The correct move is disciplined briefing, not speculative wallet-led traffic.",
    ctaLabel: "Review strategy posture",
    status: "private",
  },
];

export const featuredPurchaseChannels = purchaseChannels.filter((channel) => channel.featured);

export function getPlatformPlan(key: string) {
  return platformPlans.find((plan) => plan.key === key) ?? null;
}

export function getPurchaseChannelsForPlatform(platformKey: string) {
  return purchaseChannels.filter((channel) => channel.platformKey === platformKey);
}
