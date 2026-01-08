import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about TC Construction Group - our mission, values, and commitment to sustainable construction excellence.',
};

const stats = [
  { value: '25+', label: 'Years Experience' },
  { value: '500+', label: 'Projects Completed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '150+', label: 'Team Members' },
];

const values = [
  {
    title: 'Innovation',
    description: 'We embrace cutting-edge technologies like IoT, Web3, and BIM to deliver smarter, more efficient solutions.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    )
  },
  {
    title: 'Sustainability',
    description: 'Environmental responsibility drives every decision, from material selection to energy-efficient system design.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
        <path d="M8.5 8.5v.01"/>
        <path d="M16 15.5v.01"/>
        <path d="M12 12v.01"/>
        <path d="M11 17v.01"/>
        <path d="M7 14v.01"/>
      </svg>
    )
  },
  {
    title: 'Excellence',
    description: 'We hold ourselves to the highest standards of craftsmanship, safety, and professional integrity.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/>
      </svg>
    )
  },
  {
    title: 'Collaboration',
    description: 'Through our partnership with Tolani Labs and our ecosystem approach, we achieve more together.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  }
];

const leadership = [
  {
    name: 'James Mitchell',
    role: 'CEO & Founder',
    bio: '25 years of construction industry leadership. Former VP at Turner Construction.',
  },
  {
    name: 'Sarah Chen',
    role: 'Chief Operations Officer',
    bio: 'Expert in sustainable construction practices. LEED AP certified.',
  },
  {
    name: 'Michael Torres',
    role: 'Director of HVAC Systems',
    bio: '15 years specializing in commercial HVAC. IoT integration pioneer.',
  },
  {
    name: 'Dr. Anika Patel',
    role: 'ESG & Sustainability Director',
    bio: 'PhD in Environmental Engineering. Former EPA consultant.',
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>About TCCG</span>
          <h1 className={styles.title}>Building the Future,<br/>Sustainably</h1>
          <p className={styles.subtitle}>
            TC Construction Group is a leader in smart construction and HVAC solutions, 
            combining cutting-edge technology with sustainable practices to deliver 
            exceptional results for our clients.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.mission}>
        <div className={styles.container}>
          <div className={styles.missionContent}>
            <h2>Our Mission</h2>
            <p>
              To transform the construction and HVAC industry through innovation, 
              sustainability, and excellence. We believe that every building should 
              be smart, efficient, and environmentally responsible—and we have the 
              expertise to make it happen.
            </p>
          </div>
          <div className={styles.missionVisual}>
            <div className={styles.visualFrame}>
              <span>TCCG</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.values}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          <div className={styles.valuesGrid}>
            {values.map((value) => (
              <div key={value.title} className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className={styles.ecosystem}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Part of the Tolani Corp Ecosystem</h2>
          <p className={styles.ecosystemText}>
            As a proud member of the Tolani Corp family of companies, we leverage 
            shared resources, expertise, and innovation across our ecosystem. Our 
            close partnership with <strong>Tolani Labs</strong> gives us access to 
            industry-leading BIM and design capabilities, while our connection to 
            <strong> Tolani Corp HQ</strong> provides enterprise-grade support and 
            resources.
          </p>
          <div className={styles.ecosystemLinks}>
            <a href="https://tolanicorp.us" target="_blank" rel="noopener noreferrer" className={styles.ecosystemLink}>
              <span>Tolani Corp HQ</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
            <a href="/services#tolani-labs" className={styles.ecosystemLink}>
              <span>Tolani Labs Partnership</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className={styles.leadership}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Leadership Team</h2>
          <div className={styles.leadershipGrid}>
            {leadership.map((leader) => (
              <div key={leader.name} className={styles.leaderCard}>
                <div className={styles.leaderAvatar}>
                  <span>{leader.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3>{leader.name}</h3>
                <span className={styles.leaderRole}>{leader.role}</span>
                <p>{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Ready to Build Together?</h2>
          <p>Let's discuss how TCCG can bring your project to life.</p>
          <div className={styles.ctaButtons}>
            <a href="/contact" className={styles.primaryBtn}>Contact Us</a>
            <a href="/careers" className={styles.secondaryBtn}>Join Our Team</a>
          </div>
        </div>
      </section>
    </div>
  );
}
