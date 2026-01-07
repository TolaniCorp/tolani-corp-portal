import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  // Intentionally kept server-rendered for performance/SEO.
  return (
    <div className={styles.page}>
      <Navbar />
      <Hero />

      <main className={styles.main}>
        <section id="about" className={`section ${styles.section}`}>
          <div className={`container ${styles.container}`}>
            <header className={styles.header}>
              <span className="section-label">Why Choose Tolani Corp?</span>
              <h2 className={`display-lg ${styles.title}`}>We build legacies.</h2>
              <p className="section-description">
                At Tolani Corp, we don't just build businesses—we build legacies. Rooted in innovation,
                transparency, and integrity, our commitment extends far beyond mere profitability.
                We strive to elevate communities, empower innovation, and execute excellence across diverse
                industries worldwide.
              </p>
            </header>

            <div className={styles.featureGrid}>
              <article className={`glass-card ${styles.featureCard}`}>
                <h3 className={styles.cardTitle}>A Foundation Built on Integrity</h3>
                <p className={styles.cardBody}>
                  Compliance-first operations, rigorous quality assurance, and transparent governance—powered
                  by blockchain and DAO principles—drive trust and accountability.
                </p>
              </article>

              <article className={`glass-card ${styles.featureCard}`}>
                <h3 className={styles.cardTitle}>Innovation at Our Core</h3>
                <p className={styles.cardBody}>
                  We integrate blockchain, AI, IoT, and smart infrastructure to pioneer solutions that redefine
                  standards across the industries we serve.
                </p>
              </article>

              <article className={`glass-card ${styles.featureCard}`}>
                <h3 className={styles.cardTitle}>Commitment to Community</h3>
                <p className={styles.cardBody}>
                  Through Tolani Foundation™, we expand access to health services and workforce development,
                  with transparent donation tracking to maximize impact.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="global" className={`section ${styles.section}`}>
          <div className={`container ${styles.container}`}>
            <div className={styles.split}>
              <div className={styles.splitContent}>
                <span className="section-label">Global Reach</span>
                <h2 className={`display-lg ${styles.title}`}>Global reach. Local impact.</h2>
                <p className="section-description">
                  Tolani Corp operates strategically across the globe, from our headquarters in the United States
                  to vibrant hubs in Kenya, Panama, and Brazil. We deliver solutions that resonate locally while
                  leveraging global expertise and resources.
                </p>

                <div className={styles.locationGrid}>
                  <div className={`glass-card ${styles.locationCard}`}>
                    <div className={styles.locationTitle}>United States</div>
                    <div className={styles.locationMeta}>Headquarters</div>
                  </div>
                  <div className={`glass-card ${styles.locationCard}`}>
                    <div className={styles.locationTitle}>Kenya</div>
                    <div className={styles.locationMeta}>Regional Hub</div>
                  </div>
                  <div className={`glass-card ${styles.locationCard}`}>
                    <div className={styles.locationTitle}>Panama</div>
                    <div className={styles.locationMeta}>Regional Hub</div>
                  </div>
                  <div className={`glass-card ${styles.locationCard}`}>
                    <div className={styles.locationTitle}>Brazil</div>
                    <div className={styles.locationMeta}>Regional Hub</div>
                  </div>
                </div>
              </div>

              <div className={styles.splitVisual}>
                <div className={styles.visualFrame}>
                  <Image
                    src="/globe.svg"
                    alt="Global presence"
                    width={560}
                    height={560}
                    className={styles.globe}
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="innovation" className={`section ${styles.section}`}>
          <div className={`container ${styles.container}`}>
            <header className={styles.header}>
              <span className="section-label">Innovation</span>
              <h2 className={`display-lg ${styles.title}`}>Future-focused execution.</h2>
              <p className="section-description">
                Our subsidiaries—including TC Construction Group, Tolani Labs, and Neo Labs—are dedicated to
                building solutions that blend disciplined operations with cutting-edge technology.
              </p>
            </header>

            <div className={styles.pillarGrid}>
              <article className={`glass-card ${styles.pillarCard}`}>
                <h3 className={styles.cardTitle}>Blockchain + DAO Governance</h3>
                <p className={styles.cardBody}>Transparency, accountability, and auditability in every interaction.</p>
              </article>
              <article className={`glass-card ${styles.pillarCard}`}>
                <h3 className={styles.cardTitle}>Artificial Intelligence</h3>
                <p className={styles.cardBody}>Decision support, optimization, and intelligence across operations.</p>
              </article>
              <article className={`glass-card ${styles.pillarCard}`}>
                <h3 className={styles.cardTitle}>IoT + Smart Infrastructure</h3>
                <p className={styles.cardBody}>Connected systems that improve safety, efficiency, and insight.</p>
              </article>
              <article className={`glass-card ${styles.pillarCard}`}>
                <h3 className={styles.cardTitle}>Operational Excellence</h3>
                <p className={styles.cardBody}>SOPs, training programs, and advanced systems that deliver reliability.</p>
              </article>
            </div>

            <div className={styles.subsidiaries}>
              <div className={`glass-card ${styles.subsidiaryCard}`}>
                <div className={styles.subsidiaryHeading}>Subsidiaries</div>
                  <div className={styles.subsidiaryBrandRow}>
                    <Image
                      src="/assets/tccg/logo.png"
                      alt="TC Construction Group"
                      width={320}
                      height={180}
                      className={styles.subsidiaryBrandLogo}
                    />
                    <div className={styles.subsidiaryBrandMeta}>
                      <div className={styles.subsidiaryBrandName}>TC Construction Group</div>
                      <div className={styles.subsidiaryBrandTagline}>Building Beyond</div>
                    </div>
                  </div>

                  <ul className={styles.subsidiaryList}>
                    <li>Tolani Labs</li>
                    <li>Neo Labs</li>
                    <li>Tolani Foundation™</li>
                    <li>Mango Group</li>
                    <li>Mende Atelier</li>
                  </ul>

                  <p className={styles.ecosystemCTA}>
                    <a href="/ecosystem" className={styles.ecosystemLink}>
                      Explore the full ecosystem →
                    </a>
                  </p>
              </div>

              <div className={`glass-card ${styles.subsidiaryCard}`}>
                <div className={styles.subsidiaryHeading}>Operational Strength</div>
                <ul className={styles.subsidiaryList}>
                  <li>Disciplined project management</li>
                  <li>Streamlined procurement</li>
                  <li>Proactive compliance</li>
                  <li>Quality assurance standards</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="community" className={`section ${styles.section}`}>
          <div className={`container ${styles.container}`}>
            <div className={styles.community}>
              <header className={styles.headerLeft}>
                <div className={styles.foundationLogoContainer}>
                  <Image
                    src="/assets/foundation/logo-lockup.png"
                    alt="Tolani Foundation™"
                    width={480}
                    height={160}
                    className={styles.foundationLogo}
                    priority
                  />
                </div>
                <span className="section-label">Community</span>
                <h2 className={`display-lg ${styles.title}`}>Impact with accountability.</h2>
                <p className="section-description">
                  Tolani Foundation™ embodies our commitment to social responsibility—expanding health services,
                  workforce development, and transparent giving via blockchain-enabled donation tracking.
                </p>
              </header>

              <div className={styles.communityCards}>
                <article className={`glass-card ${styles.featureCard}`}>
                  <h3 className={styles.cardTitle}>Health Services</h3>
                  <p className={styles.cardBody}>
                    Practical, community-driven initiatives that improve access and outcomes.
                  </p>
                </article>
                <article className={`glass-card ${styles.featureCard}`}>
                  <h3 className={styles.cardTitle}>Workforce Development</h3>
                  <p className={styles.cardBody}>
                    Training and pathways that help underserved communities build durable careers.
                  </p>
                </article>
                <article className={`glass-card ${styles.featureCard}`}>
                  <h3 className={styles.cardTitle}>Transparent Giving</h3>
                  <p className={styles.cardBody}>
                    Donation tracking designed for clarity, trust, and measurable outcomes.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className={`section ${styles.section} ${styles.contactSection}`}>
          <div className={`container ${styles.container}`}>
            <div className={`glass-card ${styles.contactCard}`}>
              <div className={styles.contactHeader}>
                <span className="section-label">Contact</span>
                <h2 className={`display-lg ${styles.title}`}>Partner with Tolani Corp.</h2>
                <p className="section-description">
                  Share a little context and we’ll route your message to the right team.
                </p>
              </div>

              <Suspense fallback={<div>Loading...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
