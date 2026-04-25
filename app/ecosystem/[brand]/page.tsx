import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { PurchaseChannelsSection } from "../../../components/PurchaseChannels";
import { getPlatformKeyForBrandId } from "../../../lib/agentCommerce";
import { getBrandById, getAllBrandSlugs, ecosystemBrands } from "../../../lib/brands";
import { getPurchaseChannelsForPlatform } from "../../../lib/portfolioStrategy";
import styles from "./brand.module.css";

interface PageProps {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  return getAllBrandSlugs().map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = getBrandById(brandSlug);
  
  if (!brand) {
    return { title: "Brand Not Found | Tolani Corp" };
  }

  return {
    title: `${brand.name} | Tolani Ecosystem`,
    description: brand.description,
    openGraph: {
      title: `${brand.name} - ${brand.tagline}`,
      description: brand.description,
    },
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { brand: brandSlug } = await params;
  const brand = getBrandById(brandSlug);

  if (!brand) {
    notFound();
  }

  // Get other brands for the "Explore More" section
  const otherBrands = ecosystemBrands.filter((b) => b.id !== brand.id).slice(0, 3);
  const platformKey = getPlatformKeyForBrandId(brand.id);
  const purchaseChannels = platformKey ? getPurchaseChannelsForPlatform(platformKey) : [];
  const hasPurchaseChannels = purchaseChannels.length > 0;

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero} style={{ '--brand-color': brand.color } as React.CSSProperties}>
          <div className={styles.heroBackground}>
            <div className={styles.heroGlow} style={{ background: `radial-gradient(ellipse at center, ${brand.color}20 0%, transparent 70%)` }} />
          </div>
          
          <div className={`container ${styles.heroContent}`}>
            <Link href="/ecosystem" className={styles.backLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Ecosystem
            </Link>

            <div className={styles.heroMain}>
              {brand.logo ? (
                <div className={styles.logoContainer}>
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={320}
                    height={120}
                    className={styles.brandLogo}
                    priority
                  />
                </div>
              ) : (
                <div className={styles.brandBadge} style={{ borderColor: brand.color }}>
                  <span style={{ color: brand.color }}>{brand.name.charAt(0)}</span>
                </div>
              )}
              
              <h1 className={styles.brandName}>{brand.name}</h1>
              <p className={styles.tagline} style={{ color: brand.color }}>{brand.tagline}</p>
              <p className={styles.description}>{brand.description}</p>

              <div className={styles.metaGrid}>
                {brand.headquarters && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Headquarters</span>
                    <span className={styles.metaValue}>{brand.headquarters}</span>
                  </div>
                )}
                {brand.founded && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Founded</span>
                    <span className={styles.metaValue}>{brand.founded}</span>
                  </div>
                )}
                {brand.industries && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Industries</span>
                    <span className={styles.metaValue}>{brand.industries.join(", ")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className={`section ${styles.section}`}>
          <div className={`container ${styles.container}`}>
            <div className={styles.missionVisionGrid}>
              <article className={`glass-card ${styles.card}`}>
                <div className={styles.cardIcon} style={{ color: brand.color }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                </div>
                <h2 className={styles.cardTitle}>Our Mission</h2>
                <p className={styles.cardBody}>{brand.mission}</p>
              </article>

              <article className={`glass-card ${styles.card}`}>
                <div className={styles.cardIcon} style={{ color: brand.color }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h2 className={styles.cardTitle}>Our Vision</h2>
                <p className={styles.cardBody}>{brand.vision}</p>
              </article>
            </div>
          </div>
        </section>

        {/* Key Services Section */}
        {brand.keyServices && brand.keyServices.length > 0 && (
          <section className={`section ${styles.section}`}>
            <div className={`container ${styles.container}`}>
              <header className={styles.sectionHeader}>
                <span className="section-label">What We Do</span>
                <h2 className={`display-lg ${styles.sectionTitle}`}>Key Services</h2>
              </header>

              <div className={styles.servicesGrid}>
                {brand.keyServices.map((service, index) => (
                  <div 
                    key={index} 
                    className={`glass-card ${styles.serviceCard}`}
                    style={{ '--index': index } as React.CSSProperties}
                  >
                    <div className={styles.serviceNumber} style={{ color: brand.color }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className={styles.serviceName}>{service}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {hasPurchaseChannels ? (
          <section className={`section ${styles.section}`}>
            <div className={`container ${styles.container}`}>
              <PurchaseChannelsSection
                title={`${brand.name} purchase route`}
                description={`Use the current route for ${brand.name}. Stripe checkout appears automatically where a live payment link is configured. Consultation, pilot, and retained-account lanes stay operator led.`}
                channels={purchaseChannels}
              />
            </div>
          </section>
        ) : null}

        {/* CTA Section */}
        <section className={`section ${styles.ctaSection}`}>
          <div className={`container ${styles.container}`}>
            <div className={`glass-card ${styles.ctaCard}`} style={{ borderColor: `${brand.color}40` }}>
              <h2 className={styles.ctaTitle}>
                {hasPurchaseChannels
                  ? `Need a custom engagement with ${brand.name}?`
                  : `Partner with ${brand.name}`}
              </h2>
              <p className={styles.ctaText}>
                {hasPurchaseChannels
                  ? "Use the purchase route above for standard checkout or intake. For partnerships, enterprise scoping, or custom operating work, contact the team directly."
                  : "Interested in working together? Let's discuss how we can create value together."}
              </p>
              <Link href="/#contact" className="btn btn-primary">
                Get in Touch
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Explore More Section */}
        <section className={`section ${styles.section}`}>
          <div className={`container ${styles.container}`}>
            <header className={styles.sectionHeader}>
              <span className="section-label">Ecosystem</span>
              <h2 className={`display-lg ${styles.sectionTitle}`}>Explore More</h2>
            </header>

            <div className={styles.otherBrandsGrid}>
              {otherBrands.map((otherBrand) => (
                <Link
                  key={otherBrand.id}
                  href={`/ecosystem/${otherBrand.id}`}
                  className={`glass-card ${styles.otherBrandCard}`}
                >
                  <div 
                    className={styles.otherBrandAccent} 
                    style={{ background: otherBrand.color }}
                  />
                  <h3 className={styles.otherBrandName}>{otherBrand.name}</h3>
                  <p className={styles.otherBrandTagline}>{otherBrand.tagline}</p>
                  <span className={styles.otherBrandLink} style={{ color: otherBrand.color }}>
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>

            <div className={styles.viewAllContainer}>
              <Link href="/ecosystem" className="btn btn-secondary">
                View All Brands
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
