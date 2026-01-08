import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/careers", label: "Careers" },
    { href: "/dashboard", label: "ESG Dashboard" },
  ];

  const services = [
    { href: "/services#smart-hvac", label: "Smart HVAC" },
    { href: "/services#esg-solutions", label: "ESG Solutions" },
    { href: "/services#commercial", label: "Commercial Construction" },
    { href: "/services#design", label: "Design Partnership" },
  ];

  const ecosystemLinks = [
    { href: "https://tolanicorp.us", label: "Tolani Corp HQ", external: true },
    { href: "https://tolanilabs.io", label: "Tolani Labs", external: true },
    { href: "https://tolanifoundation.org", label: "Foundation", external: true },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/assets/tccg/logo-transparent.svg"
                alt="TC Construction Group"
                width={60}
                height={60}
              />
              <div className={styles.logoText}>
                <span className={styles.logoTitle}>TC Construction</span>
                <span className={styles.logoTagline}>Building Beyond</span>
              </div>
            </Link>
            <p className={styles.description}>
              Specializing in smart HVAC installations, ESG-compliant construction, 
              and sustainable building solutions. Part of the Tolani Corp ecosystem.
            </p>
            <div className={styles.certifications}>
              <span className={styles.cert}>ESG Certified</span>
              <span className={styles.cert}>LEED Partner</span>
              <span className={styles.cert}>EPA Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Services</h4>
            <ul className={styles.linkList}>
              {services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Tolani Ecosystem</h4>
            <ul className={styles.linkList}>
              {ecosystemLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLink}
                  >
                    {link.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15,3 21,3 21,9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <div className={styles.rewardsRedirect}>
              <p>Employee Rewards & Travel Programs:</p>
              <a
                href="https://tolanicorp.us/employee-portal"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit HQ Portal →
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Contact</h4>
            <ul className={styles.contactList}>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:info@tccg.work">info@tccg.work</a>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:+1-800-TCCG-BUILD">(800) TCCG-BUILD</a>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Nationwide Coverage</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} TC Construction Group. A{" "}
            <a href="https://tolanicorp.us" target="_blank" rel="noopener noreferrer">
              Tolani Corp
            </a>{" "}
            Company. All rights reserved.
          </p>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/safety">Safety Standards</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
