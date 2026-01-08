import styles from "./Stats.module.css";

const stats = [
  {
    value: "500+",
    label: "Projects Completed",
    description: "Commercial & residential installations",
  },
  {
    value: "98%",
    label: "ESG Compliance Rate",
    description: "Exceeding industry standards",
  },
  {
    value: "40%",
    label: "Avg Energy Savings",
    description: "For smart HVAC clients",
  },
  {
    value: "15+",
    label: "Years Experience",
    description: "Industry-leading expertise",
  },
];

export function Stats() {
  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <span className={styles.value}>{stat.value}</span>
              <span className={styles.label}>{stat.label}</span>
              <span className={styles.description}>{stat.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
