import Navbar from "../../components/Navbar";
import Image from "next/image";
import styles from "./ecosystem.module.css";

interface EcosystemBrand {
  name: string;
  tagline: string;
  description: string;
  mission: string;
  vision: string;
  logo?: string;
  color: string;
}

const ecosystemBrands: EcosystemBrand[] = [
  {
    name: "Tolani Corp",
    tagline: "Building Beyond Boundaries",
    description: "The parent conglomerate anchoring innovation across diverse industries—from construction to labs to impact.",
    mission: "To pioneer integrated solutions that redefine industry standards while maintaining unwavering transparency and integrity.",
    vision: "A global ecosystem where innovation, integrity, and impact converge to create durable value for all stakeholders.",
    color: "#00D4FF",
  },
  {
    name: "Tolani Foundation™",
    tagline: "Expanding Access. Changing Lives.",
    description: "Our commitment to social responsibility through health services, workforce development, and blockchain-enabled transparency.",
    mission: "To expand access to essential services and create pathways for underserved communities to build resilient futures.",
    vision: "A world where health, opportunity, and economic dignity are accessible to all, tracked transparently through technology.",
    logo: "/assets/foundation/logo-lockup.png",
    color: "#FFB81C",
  },
  {
    name: "Tolani Labs",
    tagline: "Where Innovation Meets Industry",
    description: "Advanced R&D and emerging-technology integration—AI, blockchain, IoT, and smart infrastructure—driving next-generation solutions.",
    mission: "To integrate cutting-edge technologies into practical, scalable solutions that serve real-world challenges.",
    vision: "An innovation ecosystem where breakthrough tech becomes embedded into the fabric of global industries.",
    color: "#00A86B",
  },
  {
    name: "TC Construction Group",
    tagline: "Building Beyond",
    description: "Premier construction and infrastructure services delivering excellence across residential, commercial, and public works.",
    mission: "To deliver superior construction and infrastructure solutions with disciplined project management and unwavering quality standards.",
    vision: "To be the trusted builder of iconic, sustainable infrastructure that elevates communities and redefines possibilities.",
    logo: "/assets/tccg/logo.png",
    color: "#E74C3C",
  },
  {
    name: "Tolani Labs Neo",
    tagline: "The Next Evolution",
    description: "Specialized division exploring emerging technologies and incubating the next generation of breakthrough innovations.",
    mission: "To incubate and scale next-generation technologies that push the boundaries of what's possible.",
    vision: "A pipeline of transformative innovations that define the future of multiple industries.",
    color: "#9B59B6",
  },
  {
    name: "Mango Group",
    tagline: "Nourishing Excellence",
    description: "Diversified agribusiness and food production with a focus on sustainable practices and community partnership.",
    mission: "To produce and distribute nourishing food products while advancing sustainability and community prosperity.",
    vision: "A thriving agribusiness ecosystem that feeds communities while stewarding the land for future generations.",
    color: "#F39C12",
  },
  {
    name: "Mende Atelier",
    tagline: "Crafting Distinction",
    description: "Premium artisanal and design services—bespoke creation, luxury craftsmanship, and curated experiences.",
    mission: "To create bespoke, beautifully-crafted experiences and products that celebrate artistry and cultural heritage.",
    vision: "A global atelier where craftsmanship, design, and cultural authenticity converge to create timeless value.",
    color: "#E91E63",
  },
];

export const metadata = {
  title: "Tolani Ecosystem | Our Powerful Network of Innovation",
  description: "Explore the Tolani Ecosystem—a constellation of brands united by vision, integrity, and impact across industries.",
};

export default function EcosystemPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={`section ${styles.heroSection}`}>
          <div className={`container ${styles.container}`}>
            <div className={styles.heroContent}>
              <span className="section-label">The Ecosystem</span>
              <h1 className={`display-xl ${styles.heroTitle}`}>The Tolani Ecosystem</h1>
              <p className={`section-description ${styles.heroDescription}`}>
                A constellation of specialized brands united by a shared commitment to innovation, integrity, and impact.
                Each entity brings unique expertise while operating within a cohesive ecosystem designed to create durable
                value across industries and communities.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className={`section ${styles.valuesSection}`}>
          <div className={`container ${styles.container}`}>
            <div className={styles.valuesGrid}>
              <article className={`glass-card ${styles.valueCard}`}>
                <h3 className={styles.valueTitle}>Innovation</h3>
                <p className={styles.valueBody}>
                  We pioneer solutions across blockchain, AI, IoT, and infrastructure—integrating emerging technologies
                  into practical, scalable impact.
                </p>
              </article>
              <article className={`glass-card ${styles.valueCard}`}>
                <h3 className={styles.valueTitle}>Integrity</h3>
                <p className={styles.valueBody}>
                  Unwavering transparency, disciplined operations, and accountability define every decision and
                  partnership across our ecosystem.
                </p>
              </article>
              <article className={`glass-card ${styles.valueCard}`}>
                <h3 className={styles.valueTitle}>Impact</h3>
                <p className={styles.valueBody}>
                  From health and education to sustainable livelihoods, we measure success by the durable change we create
                  in communities and industries.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Ecosystem Brands */}
        <section className={`section ${styles.brandsSection}`}>
          <div className={`container ${styles.container}`}>
            <header className={styles.sectionHeader}>
              <span className="section-label">Our Brands</span>
              <h2 className={`display-lg ${styles.sectionTitle}`}>A United Ecosystem</h2>
            </header>

            <div className={styles.brandsGrid}>
              {ecosystemBrands.map((brand) => (
                <article
                  key={brand.name}
                  className={`glass-card ${styles.brandCard}`}
                  style={
                    {
                      "--brand-color": brand.color,
                    } as React.CSSProperties
                  }
                >
                  {brand.logo && (
                    <div className={styles.brandLogoContainer}>
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        width={280}
                        height={140}
                        className={styles.brandLogo}
                      />
                    </div>
                  )}
                  <div className={styles.brandHeader}>
                    <h3 className={styles.brandName}>{brand.name}</h3>
                    <p className={styles.brandTagline}>{brand.tagline}</p>
                  </div>

                  <p className={styles.brandDescription}>{brand.description}</p>

                  <div className={styles.brandStatements}>
                    <div className={styles.statement}>
                      <span className={styles.statementLabel}>Mission</span>
                      <p className={styles.statementText}>{brand.mission}</p>
                    </div>
                    <div className={styles.statement}>
                      <span className={styles.statementLabel}>Vision</span>
                      <p className={styles.statementText}>{brand.vision}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Ecosystem Synergies */}
        <section className={`section ${styles.synergiesSection}`}>
          <div className={`container ${styles.container}`}>
            <header className={styles.sectionHeader}>
              <span className="section-label">Synergies</span>
              <h2 className={`display-lg ${styles.sectionTitle}`}>Connected Strength</h2>
            </header>

            <div className={styles.synergiesGrid}>
              <article className={`glass-card ${styles.synergyCard}`}>
                <h3 className={styles.synergyTitle}>Cross-Pollination</h3>
                <p className={styles.synergyBody}>
                  Brands collaborate on shared challenges—Labs innovates, Foundation scales impact, Construction builds
                  infrastructure, Mango sustains communities.
                </p>
              </article>
              <article className={`glass-card ${styles.synergyCard}`}>
                <h3 className={styles.synergyTitle}>Shared Governance</h3>
                <p className={styles.synergyBody}>
                  Unified brand standards, coordinated ethics frameworks, and transparent operating principles ensure
                  coherence across the ecosystem.
                </p>
              </article>
              <article className={`glass-card ${styles.synergyCard}`}>
                <h3 className={styles.synergyTitle}>Multiplied Impact</h3>
                <p className={styles.synergyBody}>
                  Each brand's expertise amplifies the others—innovation from Labs, legitimacy from Foundation, reach
                  through Construction and Mango.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`section ${styles.ctaSection}`}>
          <div className={`container ${styles.container}`}>
            <div className={`glass-card ${styles.ctaCard}`}>
              <h2 className={`display-lg ${styles.ctaTitle}`}>Ready to Explore Partnership?</h2>
              <p className={styles.ctaBody}>
                The Tolani Ecosystem welcomes collaborators, investors, and partners committed to innovation and integrity.
              </p>
              <a href="/#contact" className={`btn-primary ${styles.ctaButton}`}>
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
