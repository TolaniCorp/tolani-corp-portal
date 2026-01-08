import Link from "next/link";
import styles from "./FeaturedProjects.module.css";

const projects = [
  {
    id: 1,
    title: "Metro Office Complex",
    category: "Commercial",
    description: "40-story office building with integrated smart HVAC system achieving 45% energy reduction.",
    stats: { size: "850,000 sq ft", savings: "45%", certification: "LEED Platinum" },
    image: "/projects/metro-office.jpg",
  },
  {
    id: 2,
    title: "GreenTech Data Center",
    category: "Industrial",
    description: "Tier 4 data center with precision cooling and 99.999% uptime guarantee.",
    stats: { size: "150,000 sq ft", savings: "38%", certification: "EPA Certified" },
    image: "/projects/greentech-dc.jpg",
  },
  {
    id: 3,
    title: "Riverside Medical Campus",
    category: "Healthcare",
    description: "State-of-the-art medical facility with advanced air filtration and climate control.",
    stats: { size: "320,000 sq ft", savings: "42%", certification: "LEED Gold" },
    image: "/projects/riverside-medical.jpg",
  },
];

export function FeaturedProjects() {
  return (
    <section className={styles.projects}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Portfolio</span>
          <h2 className={styles.title}>Featured Projects</h2>
          <p className={styles.description}>
            Showcasing our commitment to excellence in construction and sustainable building practices.
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((project) => (
            <article key={project.id} className={styles.card}>
              <div className={styles.cardImage}>
                <div className={styles.imagePlaceholder}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span>Project Image</span>
                </div>
                <span className={styles.category}>{project.category}</span>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description}</p>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{project.stats.size}</span>
                    <span className={styles.statLabel}>Size</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{project.stats.savings}</span>
                    <span className={styles.statLabel}>Energy Savings</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{project.stats.certification}</span>
                    <span className={styles.statLabel}>Certification</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.cta}>
          <Link href="/projects" className={styles.viewAll}>
            View All Projects
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12,5 19,12 12,19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
