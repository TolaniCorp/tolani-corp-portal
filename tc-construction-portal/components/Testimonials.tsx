import styles from "./Testimonials.module.css";

const testimonials = [
  {
    id: 1,
    quote: "TC Construction transformed our office with their smart HVAC system. Energy costs dropped 42% in the first year alone.",
    author: "Sarah Mitchell",
    role: "Facilities Director",
    company: "TechCorp Industries",
  },
  {
    id: 2,
    quote: "The ESG compliance reporting they provide is exceptional. Our stakeholders love the transparency and real-time metrics.",
    author: "Michael Chen",
    role: "Sustainability Officer",
    company: "GreenPath Properties",
  },
  {
    id: 3,
    quote: "Their partnership with Tolani Labs gave us a complete BIM model that caught issues before they became expensive problems.",
    author: "Jennifer Brooks",
    role: "Project Manager",
    company: "Riverside Development",
  },
];

export function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Client Success</span>
          <h2 className={styles.title}>What Our Clients Say</h2>
        </div>

        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.id} className={styles.card}>
              <div className={styles.quoteIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className={styles.quote}>{testimonial.quote}</p>
              <footer className={styles.author}>
                <div className={styles.avatar}>
                  {testimonial.author.charAt(0)}
                </div>
                <div className={styles.authorInfo}>
                  <cite className={styles.name}>{testimonial.author}</cite>
                  <span className={styles.role}>{testimonial.role}</span>
                  <span className={styles.company}>{testimonial.company}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
