'use client';

import styles from './Benefits.module.css';

const benefits = [
  {
    category: 'Health & Wellness',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    items: [
      'Comprehensive Medical, Dental & Vision',
      'Mental Health Support & EAP',
      'Gym Membership Reimbursement',
      'On-site Safety & Health Training'
    ]
  },
  {
    category: 'Financial',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    items: [
      '401(k) with 6% Company Match',
      'Competitive Base Salary',
      'Performance Bonuses',
      'Project Completion Incentives'
    ]
  },
  {
    category: 'Time Off',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    items: [
      '20 Days PTO + Sick Leave',
      '10 Paid Holidays',
      'Paid Parental Leave',
      'Sabbatical After 7 Years'
    ]
  },
  {
    category: 'Growth',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    items: [
      'Certification Sponsorship (LEED, OSHA)',
      'Tuition Reimbursement',
      'Internal Promotion Priority',
      'Leadership Development Program'
    ]
  },
  {
    category: 'Work-Life',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    items: [
      'Flexible Scheduling Options',
      'Remote Work for Office Roles',
      'Company Vehicle Program',
      'Tool & Equipment Allowance'
    ]
  },
  {
    category: 'Perks',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    items: [
      'Annual Team Building Events',
      'Employee Referral Bonuses',
      'Safety Award Program',
      'Tolani Corp Ecosystem Benefits*'
    ]
  }
];

export default function Benefits() {
  return (
    <section className={styles.benefits}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Why Join TCCG</span>
          <h2 className={styles.title}>Benefits That Build Your Future</h2>
          <p className={styles.subtitle}>
            We invest in our team because great work starts with great people
          </p>
        </div>

        <div className={styles.grid}>
          {benefits.map((benefit) => (
            <div key={benefit.category} className={styles.card}>
              <div className={styles.cardIcon}>
                {benefit.icon}
              </div>
              <h3 className={styles.cardTitle}>{benefit.category}</h3>
              <ul className={styles.cardList}>
                {benefit.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.note}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <p>
            *As part of the Tolani Corp ecosystem, employees have access to additional 
            rewards and travel programs through{' '}
            <a href="https://tolanicorp.us" target="_blank" rel="noopener noreferrer">
              Tolani Corp HQ Portal
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
