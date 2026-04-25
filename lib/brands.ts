// Tolani ecosystem brand registry
// Source of truth for active brands and their current operating role.

export interface EcosystemBrand {
  id: string;
  name: string;
  tagline: string;
  description: string;
  mission: string;
  vision: string;
  logo?: string;
  color: string;
  accentColor?: string;
  website?: string;
  founded?: string;
  headquarters?: string;
  industries?: string[];
  keyServices?: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export const ecosystemBrands: EcosystemBrand[] = [
  {
    id: "tolani-corp",
    name: "Tolani Corp",
    tagline: "Enterprise platform engineering with disciplined ownership",
    description:
      "The parent operating company for Tolani Labs, Hook Travel, BettorsACE, TCCG.work, Listo Marketplace, TSG, and the broader communications and governance stack.",
    mission:
      "To build durable businesses with shared operating standards, visible business logic, and accountable platform execution.",
    vision:
      "A memorable portfolio of products that is known for consistency, accuracy, and disciplined ownership across every customer and operator surface.",
    color: "#00D4FF",
    accentColor: "#c9a963",
    headquarters: "United States",
    founded: "2020",
    industries: ["Enterprise operations", "Technology", "Services", "Platform engineering"],
    keyServices: [
      "Portfolio governance",
      "Enterprise communications",
      "Shared product strategy",
      "Cross-platform operating standards",
    ],
  },
  {
    id: "tolani-labs",
    name: "Tolani Labs",
    tagline: "Learner platform, DEBO workstation, and portfolio control",
    description:
      "The Tolani learner platform and codebase-admin layer for the portfolio, combining guided education, DEBO student workstations, and management oversight.",
    color: "#00A86B",
    accentColor: "#10b981",
    mission:
      "To run the learner platform and portfolio governance layer with consistency, accuracy, and visible business logic.",
    vision:
      "A learning and operations system where students, management, and product teams can work from one defensible source of truth.",
    headquarters: "United States",
    founded: "2021",
    industries: ["Education technology", "AI workstations", "Portfolio operations"],
    keyServices: [
      "Student portal and rewards",
      "DEBO AI dashboard and workstation",
      "Management control plane",
      "Portfolio codebase administration",
    ],
    website: "https://app.tolanilabs.io",
  },
  {
    id: "tccg-work",
    name: "TCCG.work",
    tagline: "Building modernization with verified owner outcomes",
    description:
      "Facilities and HVAC modernization focused on measurable savings, project discipline, and clear owner ROI.",
    mission:
      "To translate building modernization work into verified operational savings and disciplined delivery.",
    vision:
      "A modernization platform known for measurable results instead of generic capability claims.",
    logo: "/assets/tccg/logo.png",
    color: "#E74C3C",
    accentColor: "#c0392b",
    headquarters: "United States",
    founded: "2020",
    industries: ["Facilities", "HVAC modernization", "Energy operations"],
    keyServices: [
      "Assessment and retrofit planning",
      "HVAC modernization",
      "Savings verification",
      "Owner-facing ROI reporting",
    ],
    website: "https://tccg.work",
  },
  {
    id: "hooktravel",
    name: "Hook Travel",
    tagline: "AI-assisted concierge for military and complex travel",
    description:
      "Travel intelligence and concierge operations for military, veteran, and complex itineraries where service recovery matters as much as booking.",
    mission:
      "To reduce travel friction with dependable planning, live rerouting, and premium concierge support.",
    vision:
      "A travel brand trusted for recovery, responsiveness, and clarity when itineraries become complex.",
    logo: "/assets/hooktravel/logo.svg",
    color: "#3B82F6",
    accentColor: "#60a5fa",
    headquarters: "United States",
    founded: "2024",
    industries: ["Travel", "Concierge services", "AI planning"],
    keyServices: [
      "Concierge trip planning",
      "Service recovery and rerouting",
      "Military and veteran travel support",
      "Premium travel memberships",
    ],
    website: "https://hooktravel.app",
  },
  {
    id: "bettorsace",
    name: "BettorsACE",
    tagline: "Betting intelligence, coaching, and bankroll discipline",
    description:
      "A consumer intelligence platform focused on transparent edge evaluation, coaching loops, and responsible-play guardrails.",
    mission:
      "To improve bettor judgment through transparent data, guided workflows, and disciplined bankroll controls.",
    vision:
      "A betting product known for measurable edge, operational trust, and accountable coaching.",
    color: "#F59E0B",
    accentColor: "#fbbf24",
    headquarters: "United States",
    founded: "2025",
    industries: ["Sports intelligence", "Consumer coaching", "Gaming operations"],
    keyServices: [
      "Settled performance tracking",
      "War Room operations",
      "Pro Picks and account workflows",
      "Responsible-play interventions",
    ],
    website: "https://bettorsace.win",
  },
  {
    id: "listo-marketplace",
    name: "Listo Marketplace",
    tagline: "Marketplace and sourcing operations with operational clarity",
    description:
      "The marketplace and sourcing layer for Tolani commerce flows, focused on traceable product logic, supply visibility, and clean operator workflows.",
    mission:
      "To make marketplace execution, sourcing logic, and supply workflows legible enough for management and operators to trust.",
    vision:
      "A marketplace platform where inventory, sourcing, and order logic stay visible instead of fragmented.",
    color: "#8B5CF6",
    accentColor: "#a78bfa",
    headquarters: "United States",
    founded: "2025",
    industries: ["Marketplace operations", "Supply workflows", "Commerce systems"],
    keyServices: [
      "Marketplace workflows",
      "Catalog and sourcing visibility",
      "Order operations",
      "Cross-platform commerce support",
    ],
    website: "https://listomarket.app",
  },
  {
    id: "tolani-supply-group",
    name: "Tolani Supply Group",
    tagline: "Trade operations with quote and margin discipline",
    description:
      "Supply-chain and trade operations focused on quote accuracy, sourcing visibility, and tariff-aware execution.",
    mission:
      "To help operators and leadership understand sourcing economics before scale hides the real margin picture.",
    vision:
      "A trade operation known for quote discipline, tariff awareness, and operational clarity.",
    color: "#14B8A6",
    accentColor: "#2dd4bf",
    headquarters: "United States",
    founded: "2025",
    industries: ["Supply chain", "Trade operations", "Sourcing intelligence"],
    keyServices: [
      "Quote-to-order workflows",
      "Tariff-aware sourcing",
      "Supplier response tracking",
      "Margin visibility by lane",
    ],
  },
  {
    id: "tut-token",
    name: "TUT / Tolani Ecosystem DAO",
    tagline: "Rewards, governance, and aligned incentives",
    description:
      "The token and DAO layer for rewards, governance, and ecosystem participation across Tolani platforms.",
    mission:
      "To keep reward logic and governance mechanics legible, auditable, and aligned with real platform behavior.",
    vision:
      "A governance layer that supports the operating system instead of distracting from it.",
    logo: "/assets/tut/logo.svg",
    color: "#F97316",
    accentColor: "#fb923c",
    headquarters: "United States",
    founded: "2025",
    industries: ["Governance", "Rewards", "Token infrastructure"],
    keyServices: [
      "Token issuance and staking",
      "Governance participation",
      "Reward conversion logic",
      "Portfolio incentive alignment",
    ],
    website: "https://tuttoken.pw",
  },
];

export function getBrandById(id: string): EcosystemBrand | undefined {
  return ecosystemBrands.find((brand) => brand.id === id);
}

export function getBrandBySlug(slug: string): EcosystemBrand | undefined {
  return ecosystemBrands.find(
    (brand) => brand.id === slug || brand.name.toLowerCase().replace(/[™\s]+/g, "-").replace(/--+/g, "-") === slug
  );
}

export function getAllBrandSlugs(): string[] {
  return ecosystemBrands.map((brand) => brand.id);
}
