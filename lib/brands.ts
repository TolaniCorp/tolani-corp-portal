// Tolani Ecosystem Brand Data
// Central source of truth for all ecosystem brands

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
    tagline: "Building Beyond Boundaries",
    description: "The parent conglomerate anchoring innovation across diverse industries—from construction to labs to impact.",
    mission: "To pioneer integrated solutions that redefine industry standards while maintaining unwavering transparency and integrity.",
    vision: "A global ecosystem where innovation, integrity, and impact converge to create durable value for all stakeholders.",
    color: "#00D4FF",
    accentColor: "#c9a963",
    headquarters: "United States",
    founded: "2020",
    industries: ["Conglomerate", "Technology", "Construction", "Philanthropy"],
    keyServices: [
      "Strategic Investment & Portfolio Management",
      "Cross-Industry Innovation",
      "Governance & Compliance",
      "Ecosystem Development",
    ],
  },
  {
    id: "tolani-foundation",
    name: "Tolani Foundation™",
    tagline: "Expanding Access. Changing Lives.",
    description: "Our commitment to social responsibility through health services, workforce development, and blockchain-enabled transparency.",
    mission: "To expand access to essential services and create pathways for underserved communities to build resilient futures.",
    vision: "A world where health, opportunity, and economic dignity are accessible to all, tracked transparently through technology.",
    logo: "/assets/foundation/logo-lockup.png",
    color: "#FFB81C",
    accentColor: "#c9a963",
    headquarters: "United States",
    founded: "2021",
    industries: ["Philanthropy", "Healthcare", "Education", "Community Development"],
    keyServices: [
      "Health Services Expansion",
      "Workforce Development Programs",
      "Blockchain-Enabled Donation Tracking",
      "Community Partnerships",
    ],
  },
  {
    id: "tolani-labs",
    name: "Tolani Labs",
    tagline: "Where Innovation Meets Industry",
    description: "Advanced R&D and emerging-technology integration—AI, blockchain, IoT, and smart infrastructure—driving next-generation solutions.",
    mission: "To integrate cutting-edge technologies into practical, scalable solutions that serve real-world challenges.",
    vision: "An innovation ecosystem where breakthrough tech becomes embedded into the fabric of global industries.",
    color: "#00A86B",
    accentColor: "#10b981",
    headquarters: "United States",
    founded: "2021",
    industries: ["Technology", "Research & Development", "AI/ML", "Blockchain"],
    keyServices: [
      "AI & Machine Learning Solutions",
      "Blockchain Development",
      "IoT & Smart Infrastructure",
      "Technology Consulting",
    ],
  },
  {
    id: "tc-construction-group",
    name: "TC Construction Group",
    tagline: "Building Beyond",
    description: "Premier construction and infrastructure services delivering excellence across residential, commercial, and public works.",
    mission: "To deliver superior construction and infrastructure solutions with disciplined project management and unwavering quality standards.",
    vision: "To be the trusted builder of iconic, sustainable infrastructure that elevates communities and redefines possibilities.",
    logo: "/assets/tccg/logo.png",
    color: "#E74C3C",
    accentColor: "#c0392b",
    headquarters: "United States",
    founded: "2020",
    industries: ["Construction", "Infrastructure", "Real Estate Development"],
    keyServices: [
      "Commercial Construction",
      "Residential Development",
      "Infrastructure Projects",
      "Project Management",
      "Quality Assurance",
    ],
  },
  {
    id: "neo-labs",
    name: "Tolani Labs Neo",
    tagline: "The Next Evolution",
    description: "Specialized division exploring emerging technologies and incubating the next generation of breakthrough innovations.",
    mission: "To incubate and scale next-generation technologies that push the boundaries of what's possible.",
    vision: "A pipeline of transformative innovations that define the future of multiple industries.",
    color: "#9B59B6",
    accentColor: "#8e44ad",
    headquarters: "United States",
    founded: "2023",
    industries: ["Technology Incubation", "Emerging Tech", "Venture Development"],
    keyServices: [
      "Technology Incubation",
      "Startup Acceleration",
      "Emerging Tech Research",
      "Venture Development",
    ],
  },
  {
    id: "mango-group",
    name: "Mango Group",
    tagline: "Nourishing Excellence",
    description: "Diversified agribusiness and food production with a focus on sustainable practices and community partnership.",
    mission: "To produce and distribute nourishing food products while advancing sustainability and community prosperity.",
    vision: "A thriving agribusiness ecosystem that feeds communities while stewarding the land for future generations.",
    color: "#F39C12",
    accentColor: "#e67e22",
    headquarters: "Kenya",
    founded: "2022",
    industries: ["Agriculture", "Food Production", "Sustainable Farming"],
    keyServices: [
      "Sustainable Agriculture",
      "Food Production & Distribution",
      "Community Farming Partnerships",
      "Agricultural Innovation",
    ],
  },
  {
    id: "mende-atelier",
    name: "Mende Atelier",
    tagline: "Crafting Distinction",
    description: "Premium artisanal and design services—bespoke creation, luxury craftsmanship, and curated experiences.",
    mission: "To create bespoke, beautifully-crafted experiences and products that celebrate artistry and cultural heritage.",
    vision: "A global atelier where craftsmanship, design, and cultural authenticity converge to create timeless value.",
    color: "#E91E63",
    accentColor: "#c2185b",
    headquarters: "United States",
    founded: "2023",
    industries: ["Luxury Goods", "Design", "Artisanal Crafts"],
    keyServices: [
      "Bespoke Design Services",
      "Luxury Craftsmanship",
      "Curated Experiences",
      "Cultural Heritage Projects",
    ],
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
