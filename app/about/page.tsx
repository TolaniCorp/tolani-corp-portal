import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Us | Tolani Corp",
  description: "Learn about Tolani Corp's mission, vision, values, and leadership team. We build legacies through innovation, transparency, and integrity.",
};

const coreValues = [
  {
    title: "Innovation",
    description: "We pioneer integrated solutions that redefine industry standards, embracing emerging technologies to solve real-world challenges.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Integrity",
    description: "Transparency, accountability, and auditability guide every interaction. We build trust through blockchain-powered governance.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Impact",
    description: "Through Tolani Foundation™, we expand access to health services and workforce development with transparent donation tracking.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: "Excellence",
    description: "Disciplined operations, rigorous quality assurance, and streamlined processes deliver reliability across every venture.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const milestones = [
  { year: "2020", title: "Foundation", description: "Tolani Corp established with a vision to build beyond boundaries" },
  { year: "2020", title: "TC Construction Group", description: "Launched premier construction and infrastructure services" },
  { year: "2021", title: "Tolani Foundation™", description: "Created philanthropic arm for community impact" },
  { year: "2021", title: "Tolani Labs", description: "Opened R&D division for emerging technology integration" },
  { year: "2022", title: "Global Expansion", description: "Established regional hubs in Kenya, Panama, and Brazil" },
  { year: "2022", title: "Mango Group", description: "Launched sustainable agribusiness operations" },
  { year: "2023", title: "Neo Labs", description: "Incubation division for next-generation innovations" },
  { year: "2023", title: "Mende Atelier", description: "Premium artisanal design and luxury craftsmanship" },
];

const stats = [
  { value: "7+", label: "Ecosystem Brands" },
  { value: "4", label: "Global Regions" },
  { value: "100+", label: "Team Members" },
  { value: "50+", label: "Projects Delivered" },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroContent}`}>
            <span className="section-label">About Us</span>
            <h1 className={`display-xl ${styles.heroTitle}`}>We Build Legacies</h1>
            <p className={styles.heroDescription}>
              At Tolani Corp, we don't just build businesses—we build legacies. Rooted in innovation,
              transparency, and integrity, our commitment extends far beyond mere profitability.
              We strive to elevate communities, empower innovation, and execute excellence across
              diverse industries worldwide.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={`container ${styles.container}`}>
            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className={`section ${styles.section}`}>
          <div className={`container ${styles.container}`}>
            <div className={styles.missionVisionGrid}>
              <article className={`glass-card ${styles.mvCard}`}>
                <h2 className={styles.mvTitle}>Our Mission</h2>
                <p className={styles.mvText}>
                  To pioneer integrated solutions that redefine industry standards while maintaining
                  unwavering transparency and integrity. We leverage blockchain, AI, and smart
                  infrastructure to create durable value for all stakeholders.
                </p>
              </article>
              <article className={`glass-card ${styles.mvCard}`}>
                <h2 className={styles.mvTitle}>Our Vision</h2>
                <p className={styles.mvText}>
                  A global ecosystem where innovation, integrity, and impact converge to create
                  durable value for all stakeholders. We envision communities empowered by
                  technology, transparency, and sustainable growth.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className={`section ${styles.section}`}>
          <div className={`container ${styles.container}`}>
            <header className={styles.sectionHeader}>
              <span className="section-label">Our Foundation</span>
              <h2 className={`display-lg ${styles.sectionTitle}`}>Core Values</h2>
              <p className="section-description">
                These principles guide every decision and define who we are as an organization.
              </p>
            </header>

            <div className={styles.valuesGrid}>
              {coreValues.map((value) => (
                <article key={value.title} className={`glass-card ${styles.valueCard}`}>
                  <div className={styles.valueIcon}>{value.icon}</div>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueDescription}>{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className={`section ${styles.section}`}>
          <div className={`container ${styles.container}`}>
            <header className={styles.sectionHeader}>
              <span className="section-label">Our Journey</span>
              <h2 className={`display-lg ${styles.sectionTitle}`}>Milestones</h2>
            </header>

            <div className={styles.timeline}>
              {milestones.map((milestone, index) => (
                <div 
                  key={`${milestone.year}-${milestone.title}`} 
                  className={styles.timelineItem}
                  style={{ '--index': index } as React.CSSProperties}
                >
                  <div className={styles.timelineYear}>{milestone.year}</div>
                  <div className={styles.timelineDot}></div>
                  <div className={`glass-card ${styles.timelineContent}`}>
                    <h3 className={styles.timelineTitle}>{milestone.title}</h3>
                    <p className={styles.timelineDescription}>{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Presence */}
        <section className={`section ${styles.section}`}>
          <div className={`container ${styles.container}`}>
            <div className={styles.globalGrid}>
              <div className={styles.globalContent}>
                <span className="section-label">Global Reach</span>
                <h2 className={`display-lg ${styles.sectionTitle}`}>Worldwide Impact</h2>
                <p className="section-description">
                  Tolani Corp operates strategically across the globe, from our headquarters in
                  the United States to vibrant hubs in Kenya, Panama, and Brazil.
                </p>

                <div className={styles.locationList}>
                  <div className={`glass-card ${styles.locationCard}`}>
                    <strong>United States</strong>
                    <span>Headquarters</span>
                  </div>
                  <div className={`glass-card ${styles.locationCard}`}>
                    <strong>Kenya</strong>
                    <span>Africa Regional Hub</span>
                  </div>
                  <div className={`glass-card ${styles.locationCard}`}>
                    <strong>Panama</strong>
                    <span>Central America Hub</span>
                  </div>
                  <div className={`glass-card ${styles.locationCard}`}>
                    <strong>Brazil</strong>
                    <span>South America Hub</span>
                  </div>
                </div>
              </div>

              <div className={styles.globalVisual}>
                <Image
                  src="/globe.svg"
                  alt="Global presence"
                  width={480}
                  height={480}
                  className={styles.globeImage}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`section ${styles.ctaSection}`}>
          <div className={`container ${styles.container}`}>
            <div className={`glass-card ${styles.ctaCard}`}>
              <h2 className={styles.ctaTitle}>Ready to Build Together?</h2>
              <p className={styles.ctaText}>
                Whether you're looking for a partner, investment opportunity, or want to join our team,
                we'd love to hear from you.
              </p>
              <div className={styles.ctaButtons}>
                <Link href="/#contact" className="btn btn-primary">
                  Partner With Us
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/ecosystem" className="btn btn-secondary">
                  Explore Ecosystem
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
