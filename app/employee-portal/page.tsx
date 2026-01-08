import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Employee Portal | Tolani Corp",
  description: "Secure employee portal for Tolani Corp team members. Access HR resources, benefits, payroll, and internal tools.",
};

const quickLinks = [
  {
    icon: "📊",
    title: "HR Dashboard",
    description: "View pay stubs, benefits, and personal information",
    href: "#",
  },
  {
    icon: "📅",
    title: "Time & Attendance",
    description: "Submit time sheets, request PTO, view schedules",
    href: "#",
  },
  {
    icon: "📚",
    title: "Learning Center",
    description: "Access training materials and certifications",
    href: "#",
  },
  {
    icon: "🏥",
    title: "Benefits Portal",
    description: "Manage health insurance, 401k, and wellness programs",
    href: "#",
  },
  {
    icon: "💬",
    title: "IT Support",
    description: "Submit tickets and get technical assistance",
    href: "#",
  },
  {
    icon: "📋",
    title: "Company Directory",
    description: "Find colleagues and organizational charts",
    href: "#",
  },
];

export default function EmployeePortalPage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <span className={styles.badge}>🔐 Secure Access</span>
        <h1 className={styles.title}>
          Employee <span className={styles.titleAccent}>Portal</span>
        </h1>
        <p className={styles.subtitle}>
          Welcome to the Tolani Corp employee portal. Access your HR resources, 
          benefits, payroll, and internal tools securely.
        </p>
      </section>

      <section className={styles.loginSection}>
        <div className={styles.loginCard}>
          <h2 className={styles.loginTitle}>Sign In</h2>
          <p className={styles.loginSubtitle}>
            Use your Tolani Corp credentials
          </p>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Work Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@tolanicorp.us"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.rememberRow}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkbox} />
                Remember me
              </label>
              <a href="#" className={styles.forgotLink}>
                Forgot password?
              </a>
            </div>

            <button type="submit" className={styles.submitButton}>
              Sign In
            </button>
          </form>

          <div className={styles.divider}>
            <div className={styles.dividerLine} />
            <span className={styles.dividerText}>or continue with</span>
            <div className={styles.dividerLine} />
          </div>

          <div className={styles.ssoButtons}>
            <a href="#" className={styles.ssoButton}>
              <span className={styles.ssoIcon}>🔑</span>
              Sign in with Microsoft Entra ID
            </a>
            <a href="#" className={styles.ssoButton}>
              <span className={styles.ssoIcon}>🌐</span>
              Sign in with Google Workspace
            </a>
          </div>

          <p className={styles.helpText}>
            Need help?{" "}
            <a href="mailto:it@tolanicorp.us" className={styles.helpLink}>
              Contact IT Support
            </a>
          </p>
        </div>
      </section>

      <section className={styles.quickLinks}>
        <h2 className={styles.quickLinksTitle}>Quick Access</h2>
        <div className={styles.linksGrid}>
          {quickLinks.map((link, index) => (
            <a key={index} href={link.href} className={styles.linkCard}>
              <span className={styles.linkIcon}>{link.icon}</span>
              <div className={styles.linkContent}>
                <h3>{link.title}</h3>
                <p>{link.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © {new Date().getFullYear()} Tolani Corp. All rights reserved.{" "}
          <a href="/privacy" className={styles.footerLink}>
            Privacy Policy
          </a>{" "}
          ·{" "}
          <a href="/terms" className={styles.footerLink}>
            Terms of Service
          </a>
        </p>
      </footer>
    </div>
  );
}
