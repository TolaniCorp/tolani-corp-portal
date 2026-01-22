"use client";

import dynamic from "next/dynamic";
import styles from "./page.module.css";

// Check if Clerk is configured
const isClerkConfigured = typeof window !== "undefined" 
  ? !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_")
  : !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_");

// Dynamically import sign-in content to avoid SSR issues with Clerk
const SignInContent = dynamic(() => import("./SignInContent"), {
  ssr: false,
  loading: () => (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
      <p>Loading...</p>
    </div>
  ),
});

const quickLinks = [
  {
    icon: "📊",
    title: "HR Dashboard",
    description: "View pay stubs, benefits, and personal information",
    href: "/employee-portal/dashboard",
  },
  {
    icon: "📅",
    title: "Time & Attendance",
    description: "Submit time sheets, request PTO, view schedules",
    href: "/employee-portal/time-off",
  },
  {
    icon: "📚",
    title: "Learning Center",
    description: "Access training materials and certifications",
    href: "/employee-portal/learning",
  },
  {
    icon: "🏥",
    title: "Benefits Portal",
    description: "Manage health insurance, 401k, and wellness programs",
    href: "/employee-portal/benefits",
  },
  {
    icon: "💬",
    title: "IT Support",
    description: "Submit tickets and get technical assistance",
    href: "/employee-portal/support",
  },
  {
    icon: "📋",
    title: "Company Directory",
    description: "Find colleagues and organizational charts",
    href: "/employee-portal/directory",
  },
];

export default function EmployeePortalPage() {
  // Show setup message if Clerk is not configured
  if (!isClerkConfigured) {
    return (
      <div className={styles.container}>
        <section className={styles.hero}>
          <span className={styles.badge}>🔧 Setup Required</span>
          <h1 className={styles.title}>
            Employee <span className={styles.titleAccent}>Portal</span>
          </h1>
          <p className={styles.subtitle}>
            The employee portal authentication is not yet configured. 
            Please set up Clerk authentication to enable sign-in.
          </p>
        </section>

        <section className={styles.loginSection}>
          <div className={styles.setupCard}>
            <h2>Configuration Required</h2>
            <p>To enable employee authentication, add the following environment variables:</p>
            <ul>
              <li><code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code></li>
              <li><code>CLERK_SECRET_KEY</code></li>
            </ul>
            <p>
              Get your keys from{" "}
              <a href="https://dashboard.clerk.com" target="_blank" rel="noopener noreferrer">
                Clerk Dashboard
              </a>
            </p>
          </div>
        </section>

        <section className={styles.quickLinks}>
          <h2 className={styles.quickLinksTitle}>Features Preview</h2>
          <p className={styles.quickLinksSubtitle}>These features will be available after setup</p>
          <div className={styles.linksGrid}>
            {quickLinks.map((link, index) => (
              <div key={index} className={styles.linkCard}>
                <span className={styles.linkIcon}>{link.icon}</span>
                <div className={styles.linkContent}>
                  <h3>{link.title}</h3>
                  <p>{link.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <p className={styles.footerCopyright}>
            © {new Date().getFullYear()} Tolani Corp. All rights reserved.
          </p>
        </footer>
      </div>
    );
  }

  return <SignInContent />;
}
