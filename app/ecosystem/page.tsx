import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import { getBrandCommerceAction, isExternalHref } from "../../lib/agentCommerce";
import { ecosystemBrands } from "../../lib/brands";
import styles from "./ecosystem.module.css";

export const metadata = {
  title: "Tolani Ecosystem | Active Brands, Shared Systems, Clear Ownership",
  description:
    "Explore the active Tolani portfolio: learning, travel, betting intelligence, building modernization, sourcing, and governance connected by one operating standard.",
};

export default function EcosystemPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <section className={`section ${styles.heroSection}`}>
          <div className={`container ${styles.container}`}>
            <div className={styles.heroContent}>
              <span className="section-label">The Ecosystem</span>
              <h1 className={`display-xl ${styles.heroTitle}`}>The Tolani Ecosystem</h1>
              <p className={`section-description ${styles.heroDescription}`}>
                A portfolio of active brands connected by one operating standard:
                clear ownership, defensible business logic, and shared platform
                engineering discipline. The ecosystem should read like a real
                system, not a collection of disconnected brand cards.
              </p>
            </div>
          </div>
        </section>

        <section className={`section ${styles.valuesSection}`}>
          <div className={`container ${styles.container}`}>
            <div className={styles.valuesGrid}>
              <article className={`glass-card ${styles.valueCard}`}>
                <h3 className={styles.valueTitle}>Operational clarity</h3>
                <p className={styles.valueBody}>
                  Each platform should explain what it does, how it makes money,
                  and how leadership can verify the logic behind it.
                </p>
              </article>
              <article className={`glass-card ${styles.valueCard}`}>
                <h3 className={styles.valueTitle}>Shared systems</h3>
                <p className={styles.valueBody}>
                  Communications, portfolio oversight, and platform engineering
                  should strengthen every brand instead of fragmenting them.
                </p>
              </article>
              <article className={`glass-card ${styles.valueCard}`}>
                <h3 className={styles.valueTitle}>Measured trust</h3>
                <p className={styles.valueBody}>
                  Marketing claims, operator behavior, and backend logic should
                  reconcile cleanly enough to defend in public and in review.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={`section ${styles.brandsSection}`}>
          <div className={`container ${styles.container}`}>
            <header className={styles.sectionHeader}>
              <span className="section-label">Active Brands</span>
              <h2 className={`display-lg ${styles.sectionTitle}`}>Brands That Share One Operating Standard</h2>
            </header>

            <div className={styles.brandsGrid}>
              {ecosystemBrands.map((brand) => {
                const commerceAction = getBrandCommerceAction(
                  brand.id,
                  brand.website ?? "/#contact",
                  brand.website ? `Visit ${brand.name}` : "Get in Touch",
                );
                const commerceHint = commerceAction.isStripeCheckout
                  ? "Stripe checkout live"
                  : commerceAction.channel?.route ?? "Direct brand route";

                return (
                  <article
                    key={brand.id}
                    className={`glass-card ${styles.brandCard}`}
                    style={{ "--brand-color": brand.color } as CSSProperties}
                  >
                    {brand.logo ? (
                      <div className={styles.brandLogoContainer}>
                        <Image
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          width={280}
                          height={140}
                          className={styles.brandLogo}
                        />
                      </div>
                    ) : null}

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

                    {brand.keyServices?.length ? (
                      <div className={styles.brandStatements}>
                        <div className={styles.statement}>
                          <span className={styles.statementLabel}>Operating lanes</span>
                          <p className={styles.statementText}>{brand.keyServices.join(" | ")}</p>
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                      <Link
                        href={`/ecosystem/${brand.id}`}
                        className="text-sm font-semibold text-white transition-opacity hover:opacity-80"
                      >
                        Explore brand <span aria-hidden="true">&rarr;</span>
                      </Link>
                      {isExternalHref(commerceAction.href) ? (
                        <a
                          href={commerceAction.href}
                          className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                        >
                          {commerceAction.ctaLabel}
                        </a>
                      ) : (
                        <Link
                          href={commerceAction.href}
                          className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                        >
                          {commerceAction.ctaLabel}
                        </Link>
                      )}
                      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                        {commerceHint}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={`section ${styles.synergiesSection}`}>
          <div className={`container ${styles.container}`}>
            <header className={styles.sectionHeader}>
              <span className="section-label">Shared Planes</span>
              <h2 className={`display-lg ${styles.sectionTitle}`}>How The Ecosystem Works Together</h2>
            </header>

            <div className={styles.synergiesGrid}>
              <article className={`glass-card ${styles.synergyCard}`}>
                <h3 className={styles.synergyTitle}>Portfolio control</h3>
                <p className={styles.synergyBody}>
                  Tolani Labs management keeps product truth, business logic, and
                  GitHub execution visible across the portfolio.
                </p>
              </article>
              <article className={`glass-card ${styles.synergyCard}`}>
                <h3 className={styles.synergyTitle}>Communications network</h3>
                <p className={styles.synergyBody}>
                  One enterprise communications layer can route HQ, concierge,
                  support, and operator traffic without losing brand-specific ownership.
                </p>
              </article>
              <article className={`glass-card ${styles.synergyCard}`}>
                <h3 className={styles.synergyTitle}>Monetization discipline</h3>
                <p className={styles.synergyBody}>
                  Each brand should have a legible monetization model, measurable
                  operating loop, and a clear relationship to the rest of the system.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={`section ${styles.ctaSection}`}>
          <div className={`container ${styles.container}`}>
            <div className={`glass-card ${styles.ctaCard}`}>
              <h2 className={`display-lg ${styles.ctaTitle}`}>Ready to work with the Tolani system?</h2>
              <p className={styles.ctaBody}>
                The Tolani ecosystem is built for collaborators, operators, investors,
                and partners who want real systems, not generic brand stories.
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
