import styles from "./CareersHero.module.css";

export function CareersHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.grid}></div>
        <div className={styles.gradientOrb}></div>
      </div>
      
      <div className={styles.container}>
        <span className={styles.badge}>Join Our Team</span>
        <h1 className={styles.title}>
          Build Your Career at{" "}
          <span className={styles.highlight}>TC Construction</span>
        </h1>
        <p className={styles.description}>
          Join a team that's shaping the future of sustainable construction. 
          We're looking for talented individuals who share our passion for 
          innovation, quality, and building beyond expectations.
        </p>
        
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>250+</span>
            <span className={styles.statLabel}>Team Members</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>15</span>
            <span className={styles.statLabel}>States</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>4.8★</span>
            <span className={styles.statLabel}>Glassdoor Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
