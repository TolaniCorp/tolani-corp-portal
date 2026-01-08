import Link from "next/link";
import styles from "./LabsPartnership.module.css";

export function LabsPartnership() {
  return (
    <section className={styles.partnership}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>Ecosystem Collaboration</span>
          <h2 className={styles.title}>
            Design Excellence with{" "}
            <span className={styles.highlight}>Tolani Labs</span>
          </h2>
          <p className={styles.description}>
            Our partnership with Tolani Labs brings together world-class design 
            capabilities and construction expertise. Using advanced Revit modeling 
            and BIM technology, we deliver projects with unprecedented precision and efficiency.
          </p>
          
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3>3D BIM Modeling</h3>
                <p>Full Building Information Modeling for clash detection and coordination</p>
              </div>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3>Virtual Walkthroughs</h3>
                <p>Experience your project before construction begins</p>
              </div>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3>Detailed Documentation</h3>
                <p>Comprehensive construction documents and specifications</p>
              </div>
            </div>
          </div>
          
          <div className={styles.actions}>
            <Link href="/services#design" className={styles.primaryBtn}>
              Learn About Design Services
            </Link>
            <a
              href="https://tolanilabs.io"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
            >
              Visit Tolani Labs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15,3 21,3 21,9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
        
        <div className={styles.visual}>
          <div className={styles.blueprintCard}>
            <div className={styles.blueprintHeader}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.blueprintTitle}>Project Model</span>
            </div>
            <div className={styles.blueprintContent}>
              <svg viewBox="0 0 300 200" className={styles.blueprintSvg}>
                {/* Isometric Building Wireframe */}
                <defs>
                  <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#gridPattern)" />
                
                {/* Base */}
                <polygon points="50,150 150,100 250,150 150,200" fill="none" stroke="var(--blueprint)" strokeWidth="1.5"/>
                
                {/* Walls */}
                <line x1="50" y1="150" x2="50" y2="80" stroke="var(--blueprint)" strokeWidth="1.5"/>
                <line x1="150" y1="100" x2="150" y2="30" stroke="var(--blueprint)" strokeWidth="1.5"/>
                <line x1="250" y1="150" x2="250" y2="80" stroke="var(--blueprint)" strokeWidth="1.5"/>
                <line x1="150" y1="200" x2="150" y2="130" stroke="var(--blueprint)" strokeWidth="1"/>
                
                {/* Roof */}
                <polygon points="50,80 150,30 250,80 150,130" fill="none" stroke="var(--tccg-primary)" strokeWidth="2"/>
                
                {/* HVAC Unit */}
                <rect x="120" y="45" width="30" height="20" fill="none" stroke="var(--success-green)" strokeWidth="1.5"/>
                <circle cx="135" cy="55" r="5" fill="none" stroke="var(--success-green)" strokeWidth="1"/>
                
                {/* Windows */}
                <rect x="65" y="100" width="15" height="25" fill="none" stroke="var(--text-muted)" strokeWidth="1"/>
                <rect x="95" y="100" width="15" height="25" fill="none" stroke="var(--text-muted)" strokeWidth="1"/>
                <rect x="185" y="100" width="15" height="25" fill="none" stroke="var(--text-muted)" strokeWidth="1"/>
                <rect x="215" y="100" width="15" height="25" fill="none" stroke="var(--text-muted)" strokeWidth="1"/>
                
                {/* Dimension lines */}
                <line x1="50" y1="170" x2="250" y2="170" stroke="var(--text-muted)" strokeWidth="0.5" strokeDasharray="3,3"/>
                <text x="145" y="185" fill="var(--text-muted)" fontSize="10">100&apos;</text>
              </svg>
            </div>
            <div className={styles.blueprintFooter}>
              <span className={styles.modelInfo}>BIM Level 2 Compliant</span>
              <span className={styles.modelVersion}>v3.2.1</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
