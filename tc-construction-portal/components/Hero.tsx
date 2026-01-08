"use client";

import Link from "next/link";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundElements}>
        <div className={styles.grid}></div>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.constructionLines}>
          <svg viewBox="0 0 1200 800" className={styles.blueprint}>
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
            <line x1="100" y1="200" x2="500" y2="200" stroke="rgba(231, 76, 60, 0.3)" strokeWidth="2" strokeDasharray="5,5"/>
            <line x1="500" y1="200" x2="500" y2="600" stroke="rgba(231, 76, 60, 0.3)" strokeWidth="2" strokeDasharray="5,5"/>
            <line x1="700" y1="100" x2="1100" y2="100" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1"/>
            <line x1="1100" y1="100" x2="1100" y2="700" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Tolani Corp Ecosystem
          </div>
          
          <h1 className={styles.title}>
            Smart HVAC &<br />
            <span className={styles.highlight}>ESG Construction</span><br />
            Solutions
          </h1>
          
          <p className={styles.description}>
            TC Construction Group delivers cutting-edge smart HVAC installations 
            and ESG-compliant construction services. We're Building Beyond 
            traditional methods with Web3-enabled contract monitoring and 
            sustainable practices.
          </p>
          
          <div className={styles.features}>
            <div className={styles.feature}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>EPA Certified</span>
            </div>
            <div className={styles.feature}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>LEED Partner</span>
            </div>
            <div className={styles.feature}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>Web3 Enabled</span>
            </div>
          </div>
          
          <div className={styles.actions}>
            <Link href="/contact" className={styles.primaryBtn}>
              Get a Quote
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12,5 19,12 12,19"/>
              </svg>
            </Link>
            <Link href="/services" className={styles.secondaryBtn}>
              Our Services
            </Link>
          </div>
        </div>
        
        <div className={styles.visual}>
          <div className={styles.statsCard}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>500+</span>
              <span className={styles.statLabel}>Projects Completed</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>98%</span>
              <span className={styles.statLabel}>ESG Compliance</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>40%</span>
              <span className={styles.statLabel}>Energy Savings</span>
            </div>
          </div>
          
          <div className={styles.hvacVisual}>
            <div className={styles.hvacUnit}>
              <div className={styles.hvacIcon}>
                <svg viewBox="0 0 100 100" className={styles.hvacSvg}>
                  <rect x="10" y="20" width="80" height="60" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="30" cy="35" r="8" fill="none" stroke="var(--tccg-primary)" strokeWidth="2"/>
                  <circle cx="70" cy="35" r="8" fill="none" stroke="var(--success-green)" strokeWidth="2"/>
                  <rect x="25" y="60" width="50" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <line x1="35" y1="65" x2="65" y2="65" stroke="var(--tccg-primary)" strokeWidth="2"/>
                </svg>
              </div>
              <div className={styles.hvacStatus}>
                <span className={styles.statusIndicator}></span>
                Smart Monitoring Active
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.scrollIndicator}>
        <span>Scroll to explore</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
}
