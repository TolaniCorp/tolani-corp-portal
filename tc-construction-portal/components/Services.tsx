import Link from "next/link";
import styles from "./Services.module.css";

const services = [
  {
    id: "smart-hvac",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <circle cx="8" cy="9" r="1.5" />
        <circle cx="16" cy="9" r="1.5" />
        <path d="M8 15h8" />
      </svg>
    ),
    title: "Smart HVAC Systems",
    description:
      "Next-generation HVAC installations with IoT sensors, real-time monitoring, and AI-driven optimization. Reduce energy costs by up to 40%.",
    features: ["IoT Integration", "Remote Monitoring", "Predictive Maintenance", "Energy Analytics"],
    highlight: true,
  },
  {
    id: "esg-solutions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "ESG Construction",
    description:
      "Sustainable building practices that meet and exceed environmental standards. Full ESG compliance documentation and reporting.",
    features: ["Carbon Tracking", "LEED Certification", "Green Materials", "Compliance Reports"],
    highlight: false,
  },
  {
    id: "commercial",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <line x1="10" y1="4" x2="10" y2="20" />
      </svg>
    ),
    title: "Commercial Construction",
    description:
      "Full-service commercial construction from planning to completion. Specializing in office buildings, retail spaces, and industrial facilities.",
    features: ["Project Management", "Design-Build", "Tenant Improvements", "Renovations"],
    highlight: false,
  },
  {
    id: "design",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    title: "Design Partnership",
    description:
      "In collaboration with Tolani Labs, we offer integrated design-build services using cutting-edge Revit modeling and BIM technology.",
    features: ["3D BIM Modeling", "Revit Integration", "Virtual Walkthroughs", "Clash Detection"],
    highlight: true,
  },
  {
    id: "monitoring",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <polyline points="6 8 10 12 14 8 18 12" />
      </svg>
    ),
    title: "Performance Monitoring",
    description:
      "Web3-enabled contract performance dashboards. Track ESG metrics, energy consumption, and project milestones in real-time.",
    features: ["Blockchain Verified", "Real-time Dashboards", "Performance Analytics", "Automated Reports"],
    highlight: false,
  },
  {
    id: "maintenance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "Maintenance Programs",
    description:
      "Comprehensive preventive maintenance programs to ensure optimal system performance and longevity of your installations.",
    features: ["Scheduled Service", "Emergency Response", "Parts Warranty", "System Upgrades"],
    highlight: false,
  },
];

export function Services() {
  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Our Expertise</span>
          <h2 className={styles.title}>
            Comprehensive Construction &<br />
            <span className={styles.highlight}>HVAC Solutions</span>
          </h2>
          <p className={styles.description}>
            From smart HVAC installations to full ESG-compliant construction projects, 
            we deliver excellence at every stage.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services#${service.id}`}
              className={`${styles.card} ${service.highlight ? styles.highlighted : ""}`}
            >
              <div className={styles.iconWrapper}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
              <ul className={styles.features}>
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <span className={styles.learnMore}>
                Learn more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12,5 19,12 12,19" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
