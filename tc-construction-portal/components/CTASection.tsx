import Link from "next/link";
import styles from "./CTASection.module.css";

export function CTASection() {
  return (
    <section className={styles.cta}>
      <div className={styles.background}>
        <div className={styles.grid}></div>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Ready to Build{" "}
            <span className={styles.highlight}>Beyond</span>?
          </h2>
          <p className={styles.description}>
            Let&apos;s discuss your next project. Whether you need smart HVAC installation, 
            ESG-compliant construction, or comprehensive building solutions, we&apos;re here to help.
          </p>
          
          <div className={styles.actions}>
            <Link href="/contact" className={styles.primaryBtn}>
              Request a Quote
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12,5 19,12 12,19" />
              </svg>
            </Link>
            <Link href="/careers" className={styles.secondaryBtn}>
              Join Our Team
            </Link>
          </div>
          
          <div className={styles.badges}>
            <div className={styles.badge}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Free Consultation
            </div>
            <div className={styles.badge}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Licensed & Insured
            </div>
            <div className={styles.badge}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Nationwide Service
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
