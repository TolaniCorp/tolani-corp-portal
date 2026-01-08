import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Services',
  description: 'TC Construction Group services: Smart HVAC installations, ESG solutions, commercial construction, and design partnerships with Tolani Labs.',
};

const serviceDetails = [
  {
    id: 'smart-hvac',
    title: 'Smart HVAC Solutions',
    description: 'Next-generation heating, ventilation, and air conditioning systems with IoT monitoring, predictive maintenance, and energy optimization.',
    features: [
      'Variable Refrigerant Flow (VRF) Systems',
      'Building Automation Integration',
      'Real-time Performance Monitoring',
      'Predictive Maintenance Algorithms',
      'Energy Usage Analytics Dashboard',
      'Remote System Management'
    ],
    benefits: [
      'Up to 40% energy savings',
      'Reduced maintenance costs',
      '24/7 system visibility',
      'Extended equipment lifespan'
    ]
  },
  {
    id: 'esg-solutions',
    title: 'ESG Consulting & Implementation',
    description: 'Comprehensive Environmental, Social, and Governance solutions to help your organization meet sustainability goals and regulatory requirements.',
    features: [
      'Carbon Footprint Assessment',
      'LEED Certification Support',
      'Sustainability Reporting',
      'Green Building Retrofits',
      'Renewable Energy Integration',
      'Compliance Auditing'
    ],
    benefits: [
      'Meet regulatory requirements',
      'Attract ESG-focused investors',
      'Reduce operational costs',
      'Enhance brand reputation'
    ]
  },
  {
    id: 'commercial-construction',
    title: 'Commercial Construction',
    description: 'Full-service commercial construction from ground-up builds to major renovations, with a focus on sustainable practices and quality craftsmanship.',
    features: [
      'Design-Build Services',
      'Tenant Improvements',
      'Ground-Up Construction',
      'Historic Renovations',
      'ADA Compliance Upgrades',
      'Sustainable Material Sourcing'
    ],
    benefits: [
      'Single point of accountability',
      'On-time project delivery',
      'Budget transparency',
      'Quality assurance'
    ]
  },
  {
    id: 'tolani-labs',
    title: 'Tolani Labs Design Partnership',
    description: 'Leverage our partnership with Tolani Labs for cutting-edge BIM modeling, 3D visualization, and Revit design services.',
    features: [
      'BIM Modeling & Coordination',
      '3D Virtual Walkthroughs',
      'Clash Detection Analysis',
      'As-Built Documentation',
      'Design Visualization',
      'Project Collaboration Tools'
    ],
    benefits: [
      'Reduced design conflicts',
      'Better stakeholder alignment',
      'Faster design iterations',
      'Comprehensive documentation'
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>What We Do</span>
          <h1 className={styles.title}>Our Services</h1>
          <p className={styles.subtitle}>
            Comprehensive construction and HVAC solutions built on innovation, 
            sustainability, and proven expertise.
          </p>
        </div>
      </section>

      <section className={styles.services}>
        <div className={styles.container}>
          {serviceDetails.map((service, index) => (
            <div 
              key={service.id} 
              id={service.id}
              className={`${styles.serviceDetail} ${index % 2 === 1 ? styles.reverse : ''}`}
            >
              <div className={styles.serviceContent}>
                <h2 className={styles.serviceTitle}>{service.title}</h2>
                <p className={styles.serviceDescription}>{service.description}</p>
                
                <div className={styles.serviceGrid}>
                  <div className={styles.featuresBlock}>
                    <h3>Features</h3>
                    <ul>
                      {service.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.benefitsBlock}>
                    <h3>Benefits</h3>
                    <ul>
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a href="/contact" className={styles.ctaBtn}>
                  Get a Quote
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              </div>
              <div className={styles.serviceVisual}>
                <div className={styles.visualPlaceholder}>
                  <span>{service.title.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Ready to Start Your Project?</h2>
          <p>Contact our team for a free consultation and project estimate.</p>
          <div className={styles.ctaButtons}>
            <a href="/contact" className={styles.primaryBtn}>Contact Us</a>
            <a href="/dashboard" className={styles.secondaryBtn}>View Dashboard Demo</a>
          </div>
        </div>
      </section>
    </div>
  );
}
