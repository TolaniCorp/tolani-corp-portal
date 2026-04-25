export type BrandKey =
  | "tolani-corp-hq"
  | "tolani-labs"
  | "hook-travel"
  | "listo-marketplace"
  | "bettorsace"
  | "tsg";

export type ChannelKey =
  | "voice"
  | "sms"
  | "whatsapp"
  | "email"
  | "web-chat"
  | "discord"
  | "slack";

export type NumberStatus =
  | "active"
  | "verification-required"
  | "verification-rejected"
  | "planned";

export type NumberRole =
  | "hq-switchboard"
  | "student-support"
  | "travel-concierge"
  | "marketplace-support"
  | "sports-support"
  | "logistics-support";

export type ServiceLevelTier = "instant" | "priority" | "same-day" | "next-business-day";

export type PhoneLine = {
  e164: string;
  display: string;
  friendlyName: string;
  carrierType: "toll-free" | "local";
  status: NumberStatus;
  role: NumberRole;
  brandOwner: BrandKey;
  capabilities: {
    voice: boolean;
    sms: boolean;
    mms: boolean;
    fax: boolean;
  };
  currentConfiguration?: string;
  recommendation: string;
};

export type ChannelPolicy = {
  key: ChannelKey;
  primaryUse: string;
  aiFirst: boolean;
  humanEscalation: boolean;
  systemOfRecord: "crm" | "support-desk" | "messaging-service" | "operator-console";
  serviceLevel: ServiceLevelTier;
};

export type BrandCommunicationProfile = {
  key: BrandKey;
  name: string;
  domain: string;
  mission: string;
  recommendedNumberRole: NumberRole;
  primaryInboundChannels: ChannelKey[];
  primaryOutboundChannels: ChannelKey[];
  aiAgentLabel: string;
  supportRouting: string[];
  escalationTargets: string[];
  notes: string[];
};

export type IvrBranch = {
  digit: string;
  label: string;
  brand: BrandKey | "operator";
  routeSummary: string;
};

export type RolloutPhase = {
  phase: string;
  goal: string;
  actions: string[];
};

export const enterprisePhoneLines: PhoneLine[] = [
  {
    e164: "+18776912134",
    display: "(877) 691-2134",
    friendlyName: "Tolani Corp HQ",
    carrierType: "toll-free",
    status: "verification-required",
    role: "hq-switchboard",
    brandOwner: "tolani-corp-hq",
    capabilities: {
      voice: true,
      sms: false,
      mms: false,
      fax: false,
    },
    currentConfiguration: "Voice capable. No production messaging use until toll-free verification is complete.",
    recommendation:
      "Use this as the parent-company voice switchboard with IVR and operator routing across all portfolio brands.",
  },
  {
    e164: "+18883255859",
    display: "(888) 325-5859",
    friendlyName: "BettorsACE candidate line",
    carrierType: "toll-free",
    status: "verification-rejected",
    role: "sports-support",
    brandOwner: "bettorsace",
    capabilities: {
      voice: true,
      sms: false,
      mms: false,
      fax: false,
    },
    currentConfiguration: "Voice webhook was configured to Twilio demo. Messaging verification was rejected.",
    recommendation:
      "Do not use as a shared enterprise messaging line. Resubmit as a single-brand BettorsACE line with a narrow verified use case.",
  },
];

export const enterpriseChannelPolicies: ChannelPolicy[] = [
  {
    key: "voice",
    primaryUse: "Switchboard, concierge, urgent support, VIP escalation, and authenticated service flows",
    aiFirst: true,
    humanEscalation: true,
    systemOfRecord: "operator-console",
    serviceLevel: "instant",
  },
  {
    key: "sms",
    primaryUse: "Transactional follow-up, login links, booking links, alerts, and payment status",
    aiFirst: true,
    humanEscalation: true,
    systemOfRecord: "messaging-service",
    serviceLevel: "priority",
  },
  {
    key: "whatsapp",
    primaryUse: "High-touch support, international/mobile-first conversations, itinerary and doc follow-up",
    aiFirst: true,
    humanEscalation: true,
    systemOfRecord: "messaging-service",
    serviceLevel: "priority",
  },
  {
    key: "email",
    primaryUse: "Formal support, receipts, contracts, admissions, logistics documentation, and post-call summaries",
    aiFirst: false,
    humanEscalation: true,
    systemOfRecord: "crm",
    serviceLevel: "same-day",
  },
  {
    key: "web-chat",
    primaryUse: "Live site conversion and authenticated product help",
    aiFirst: true,
    humanEscalation: true,
    systemOfRecord: "crm",
    serviceLevel: "priority",
  },
  {
    key: "discord",
    primaryUse: "Community engagement, War Room, and bettor/member operations",
    aiFirst: true,
    humanEscalation: true,
    systemOfRecord: "operator-console",
    serviceLevel: "priority",
  },
  {
    key: "slack",
    primaryUse: "Internal operations, escalations, engineering, and B2B handoff workflows",
    aiFirst: false,
    humanEscalation: true,
    systemOfRecord: "operator-console",
    serviceLevel: "instant",
  },
];

export const brandCommunicationProfiles: BrandCommunicationProfile[] = [
  {
    key: "tolani-corp-hq",
    name: "Tolani Corp (HQ)",
    domain: "tolanicorp.com",
    mission: "Parent-company operator switchboard, investor line, and cross-brand intake",
    recommendedNumberRole: "hq-switchboard",
    primaryInboundChannels: ["voice", "email", "web-chat"],
    primaryOutboundChannels: ["email", "voice", "sms"],
    aiAgentLabel: "Tolani Operator",
    supportRouting: [
      "Corporate partnerships and B2B leads",
      "Press, investor, legal, hiring, and portfolio routing",
      "After-hours overflow for brand lines",
    ],
    escalationTargets: ["human operator", "executive office"],
    notes: [
      "HQ should not be the default messaging sender for every brand.",
      "Use one voice-first switchboard with clear brand routing.",
    ],
  },
  {
    key: "tolani-labs",
    name: "Tolani Labs",
    domain: "tolanilabs.io",
    mission: "Admissions, learner support, DEBO workstation guidance, and credentialing workflows",
    recommendedNumberRole: "student-support",
    primaryInboundChannels: ["voice", "sms", "email", "web-chat"],
    primaryOutboundChannels: ["sms", "email", "voice"],
    aiAgentLabel: "DEBO Student Workstation",
    supportRouting: [
      "Student admissions and onboarding",
      "DEBO / AI workstation questions",
      "Course, credential, and partnership follow-up",
    ],
    escalationTargets: ["student success", "academic operations"],
    notes: [
      "Tolani Labs should have its own verified messaging number.",
      "Student voice and SMS flows should be distinct from corporate switchboard traffic.",
    ],
  },
  {
    key: "hook-travel",
    name: "Hook Travel",
    domain: "hooktravel.app",
    mission: "Travel concierge, itinerary support, military travel help, and urgent service recovery",
    recommendedNumberRole: "travel-concierge",
    primaryInboundChannels: ["voice", "sms", "whatsapp", "email"],
    primaryOutboundChannels: ["sms", "whatsapp", "email", "voice"],
    aiAgentLabel: "Hook Concierge",
    supportRouting: [
      "Trip planning and itinerary assistance",
      "Military and Space-A routing",
      "Urgent support and travel interruptions",
    ],
    escalationTargets: ["travel concierge", "operations manager"],
    notes: [
      "Travel needs a high-touch voice + WhatsApp posture.",
      "This brand should not share its customer messaging number with gambling or logistics brands.",
    ],
  },
  {
    key: "listo-marketplace",
    name: "Listo Marketplace",
    domain: "listomarket.app",
    mission: "Marketplace buyer/seller support, onboarding, and transaction issue handling",
    recommendedNumberRole: "marketplace-support",
    primaryInboundChannels: ["voice", "sms", "email", "web-chat"],
    primaryOutboundChannels: ["sms", "email"],
    aiAgentLabel: "Listo Marketplace Assistant",
    supportRouting: [
      "Buyer and seller onboarding",
      "Listing, order, and dispute support",
      "Merchant growth and marketplace health",
    ],
    escalationTargets: ["marketplace operations", "trust and safety"],
    notes: [
      "Add a dedicated line only when marketplace volume justifies it.",
      "Use HQ routing early, then split to a brand line once transaction support becomes material.",
    ],
  },
  {
    key: "bettorsace",
    name: "BettorsACE",
    domain: "bettorsace.win",
    mission: "Subscriber support, responsible-play communication, War Room access, and picks/product help",
    recommendedNumberRole: "sports-support",
    primaryInboundChannels: ["voice", "sms", "discord", "email"],
    primaryOutboundChannels: ["sms", "email", "discord"],
    aiAgentLabel: "BettorsACE Voice Agent",
    supportRouting: [
      "Pricing, Pro Picks, War Room, deposit, and payout help",
      "Responsible-play intervention and billing escalation",
      "Operator follow-up from the AI receptionist",
    ],
    escalationTargets: ["operations desk", "billing support", "responsible-play escalation"],
    notes: [
      "Keep BettorsACE on its own support number and messaging service.",
      "The rejected toll-free verification should be corrected and resubmitted as a single-brand use case.",
    ],
  },
  {
    key: "tsg",
    name: "Tolani Supply Group (TSG)",
    domain: "tolanisupplygroup.com",
    mission: "B2B trade, tariff, freight, sourcing, and logistics support",
    recommendedNumberRole: "logistics-support",
    primaryInboundChannels: ["voice", "email", "web-chat"],
    primaryOutboundChannels: ["email", "voice", "sms"],
    aiAgentLabel: "TSG Control Tower",
    supportRouting: [
      "Trade lane and customs inquiries",
      "Shipment and documentation follow-up",
      "Client onboarding and account management",
    ],
    escalationTargets: ["supply operations", "account executive"],
    notes: [
      "TSG should prioritize voice + email over broad messaging.",
      "A dedicated line is justified once client volume and SLAs become formalized.",
    ],
  },
];

export const hqIvrTree: IvrBranch[] = [
  {
    digit: "1",
    label: "Tolani Labs",
    brand: "tolani-labs",
    routeSummary: "Student admissions, DEBO, learner support, and partnerships",
  },
  {
    digit: "2",
    label: "Hook Travel",
    brand: "hook-travel",
    routeSummary: "Travel concierge, itinerary changes, and military support",
  },
  {
    digit: "3",
    label: "Listo Marketplace",
    brand: "listo-marketplace",
    routeSummary: "Marketplace onboarding, seller support, and transaction help",
  },
  {
    digit: "4",
    label: "BettorsACE",
    brand: "bettorsace",
    routeSummary: "Subscriptions, picks, War Room, billing, and payout support",
  },
  {
    digit: "5",
    label: "Tolani Supply Group",
    brand: "tsg",
    routeSummary: "Freight, sourcing, tariffs, customs, and account support",
  },
  {
    digit: "0",
    label: "Operator",
    brand: "operator",
    routeSummary: "Corporate operator, executive office, and exception handling",
  },
];

export const rolloutPlan: RolloutPhase[] = [
  {
    phase: "Phase 1",
    goal: "Stand up the parent-company voice switchboard without cross-brand messaging risk",
    actions: [
      "Use +1 (877) 691-2134 as the Tolani Corp HQ voice line.",
      "Implement IVR with brand routing and operator fallback.",
      "Do not use HQ as the default SMS sender for every brand.",
    ],
  },
  {
    phase: "Phase 2",
    goal: "Split customer messaging by brand and fix verification posture",
    actions: [
      "Resubmit +1 (888) 325-5859 as a single-brand BettorsACE number.",
      "Create one Twilio Messaging Service per brand that uses SMS or WhatsApp.",
      "Use separate consent language, HELP/STOP handling, and templates by brand.",
    ],
  },
  {
    phase: "Phase 3",
    goal: "Unify enterprise routing and agent telemetry",
    actions: [
      "Add AI-first receptionists for HQ, Tolani Labs, Hook Travel, and BettorsACE.",
      "Route escalations to brand-specific human queues, not a single generic inbox.",
      "Track call resolution, conversion, and escalation metrics in one operator layer.",
    ],
  },
];

export const enterpriseCommunicationKpis = [
  "First-call resolution rate",
  "AI containment rate",
  "Human escalation rate",
  "Qualified lead capture rate",
  "SMS opt-in approval rate by brand",
  "Toll-free verification approval status",
  "Average speed to answer by brand",
  "After-hours callback completion rate",
];

export const enterpriseCommunicationDecision = {
  recommendedModel: "hybrid-hq-and-brand-lines",
  summary:
    "Use one enterprise HQ switchboard for voice routing and separate brand numbers for messaging and customer-facing support.",
  why: [
    "A single number for every brand creates verification, attribution, and brand-trust problems.",
    "Separate brand lines isolate reputation, consent, compliance, and reporting.",
    "The HQ line still gives Tolani Corp one corporate front door for partnerships and operator routing.",
  ],
};

export function getBrandProfile(key: BrandKey) {
  return brandCommunicationProfiles.find((brand) => brand.key === key) ?? null;
}

export function getLinesForBrand(key: BrandKey) {
  return enterprisePhoneLines.filter((line) => line.brandOwner === key);
}

export function getPrimaryHqLine() {
  return enterprisePhoneLines.find((line) => line.role === "hq-switchboard") ?? null;
}
