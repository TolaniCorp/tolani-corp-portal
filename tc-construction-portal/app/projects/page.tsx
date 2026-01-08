import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore TC Construction Group\'s portfolio of smart HVAC installations, ESG-compliant buildings, and sustainable construction projects.',
};

const projects = [
  {
    id: 'downtown-office-complex',
    title: 'Downtown Office Complex',
    client: 'Metro Properties LLC',
    location: 'Metro City, MC',
    category: 'Commercial HVAC',
    year: '2024',
    stats: {
      sqft: '450,000',
      savings: '$156K/year',
      co2: '45 tons reduced'
    },
    description: 'Complete HVAC retrofit with VRF systems and IoT monitoring for a 35-story office tower. Achieved 40% energy reduction while improving occupant comfort.',
    features: ['VRF System Installation', 'Building Automation', 'Real-time Monitoring', 'Predictive Maintenance'],
    status: 'Active'
  },
  {
    id: 'green-valley-hospital',
    title: 'Green Valley Hospital',
    client: 'Valley Health Systems',
    location: 'Green Valley, GV',
    category: 'Healthcare HVAC',
    year: '2024',
    stats: {
      sqft: '680,000',
      savings: '$320K/year',
      co2: '62 tons reduced'
    },
    description: 'Critical healthcare HVAC system with 99.99% uptime requirement. Implemented redundant systems with smart failover and air quality monitoring.',
    features: ['HEPA Filtration', 'Pressure Control', 'Redundant Systems', '24/7 Monitoring'],
    status: 'Active'
  },
  {
    id: 'tech-campus-phase2',
    title: 'Tech Campus Phase 2',
    client: 'Innovation Partners',
    location: 'Silicon Heights, SH',
    category: 'New Construction',
    year: '2023',
    stats: {
      sqft: '1,200,000',
      savings: '$425K/year',
      co2: '78 tons reduced'
    },
    description: 'Ground-up construction of a LEED Platinum certified tech campus with integrated smart building systems and on-site renewable energy.',
    features: ['LEED Platinum', 'Solar Integration', 'Smart Grid Ready', 'EV Charging'],
    status: 'Completed'
  },
  {
    id: 'riverside-mall-retrofit',
    title: 'Riverside Mall Retrofit',
    client: 'Riverside Development Corp',
    location: 'Riverside, RS',
    category: 'Retail HVAC',
    year: '2024',
    stats: {
      sqft: '320,000',
      savings: '$98K/year',
      co2: '28 tons reduced'
    },
    description: 'Modernization of aging HVAC infrastructure in a busy shopping center. Minimized disruption during operating hours with phased installation.',
    features: ['Phased Installation', 'Zone Control', 'Air Quality Sensors', 'Energy Recovery'],
    status: 'Maintenance'
  },
  {
    id: 'university-science-center',
    title: 'University Science Center',
    client: 'State University',
    location: 'University Park, UP',
    category: 'Educational',
    year: '2023',
    stats: {
      sqft: '180,000',
      savings: '$87K/year',
      co2: '32 tons reduced'
    },
    description: 'Specialized HVAC for research laboratories with precise temperature and humidity control. Integrated with existing campus building management system.',
    features: ['Lab-Grade Control', 'Fume Hood Integration', 'BMS Integration', 'Variable Air Volume'],
    status: 'Completed'
  },
  {
    id: 'luxury-hotel-tower',
    title: 'Luxury Hotel Tower',
    client: 'Grand Hospitality Group',
    location: 'Downtown Metro, DM',
    category: 'Hospitality',
    year: '2024',
    stats: {
      sqft: '520,000',
      savings: '$210K/year',
      co2: '55 tons reduced'
    },
    description: 'Premium HVAC installation for a 42-story luxury hotel with individual room climate control and centralized management.',
    features: ['Guest Room Control', 'Quiet Operation', 'Fresh Air Systems', 'Pool Dehumidification'],
    status: 'Active'
  }
];

const categories = ['All', 'Commercial HVAC', 'Healthcare HVAC', 'New Construction', 'Retail HVAC', 'Educational', 'Hospitality'];

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>Our Work</span>
          <h1 className={styles.title}>Project Portfolio</h1>
          <p className={styles.subtitle}>
            Explore our track record of successful HVAC installations, retrofits, 
            and sustainable construction projects across diverse industries.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.statsBar}>
        <div className={styles.container}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>500+</span>
            <span className={styles.statLabel}>Projects Completed</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>$2.5M+</span>
            <span className={styles.statLabel}>Client Savings/Year</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>350+</span>
            <span className={styles.statLabel}>Tons CO₂ Reduced</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>98%</span>
            <span className={styles.statLabel}>Client Satisfaction</span>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button 
                key={cat} 
                className={`${styles.filterBtn} ${cat === 'All' ? styles.active : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className={styles.projects}>
        <div className={styles.container}>
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <article key={project.id} className={styles.projectCard}>
                <div className={styles.projectImage}>
                  <div className={styles.imagePlaceholder}>
                    <span>{project.category.split(' ')[0]}</span>
                  </div>
                  <span className={`${styles.statusBadge} ${styles[project.status.toLowerCase()]}`}>
                    {project.status}
                  </span>
                </div>
                
                <div className={styles.projectContent}>
                  <div className={styles.projectMeta}>
                    <span className={styles.category}>{project.category}</span>
                    <span className={styles.year}>{project.year}</span>
                  </div>
                  
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectClient}>{project.client} • {project.location}</p>
                  <p className={styles.projectDescription}>{project.description}</p>
                  
                  <div className={styles.projectStats}>
                    <div className={styles.projectStat}>
                      <span className={styles.projectStatValue}>{project.stats.sqft}</span>
                      <span className={styles.projectStatLabel}>Sq Ft</span>
                    </div>
                    <div className={styles.projectStat}>
                      <span className={styles.projectStatValue}>{project.stats.savings}</span>
                      <span className={styles.projectStatLabel}>Savings</span>
                    </div>
                    <div className={styles.projectStat}>
                      <span className={styles.projectStatValue}>{project.stats.co2}</span>
                      <span className={styles.projectStatLabel}>CO₂ Impact</span>
                    </div>
                  </div>
                  
                  <div className={styles.projectFeatures}>
                    {project.features.map((feature) => (
                      <span key={feature} className={styles.featureTag}>{feature}</span>
                    ))}
                  </div>
                  
                  <a href={`/projects/${project.id}`} className={styles.viewBtn}>
                    View Details
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Have a Project in Mind?</h2>
          <p>Let's discuss how TCCG can deliver results for your next project.</p>
          <div className={styles.ctaButtons}>
            <a href="/contact" className={styles.primaryBtn}>Request a Quote</a>
            <a href="/dashboard" className={styles.secondaryBtn}>View Live Dashboard</a>
          </div>
        </div>
      </section>
    </div>
  );
}
