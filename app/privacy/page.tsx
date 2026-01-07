import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Tolani Corp",
  description: "Tolani Corp's privacy policy explaining how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  const lastUpdated = "January 1, 2026";

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <article className={styles.article}>
          <header className={styles.header}>
            <span className="section-label">Legal</span>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.lastUpdated}>Last updated: {lastUpdated}</p>
          </header>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2>Introduction</h2>
              <p>
                Tolani Corp ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you visit our website
                tolanicorp.us and any related services, applications, or websites that link to this policy.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy
                policy, please do not access the site.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Information We Collect</h2>
              
              <h3>Personal Data</h3>
              <p>
                We may collect personally identifiable information that you voluntarily provide to us when you:
              </p>
              <ul>
                <li>Fill out our contact form</li>
                <li>Subscribe to our newsletter</li>
                <li>Request information about our services</li>
                <li>Apply for career opportunities</li>
              </ul>
              <p>
                This information may include your name, email address, phone number, company name, and any
                other information you choose to provide.
              </p>

              <h3>Automatically Collected Data</h3>
              <p>
                When you access our website, we may automatically collect certain information, including:
              </p>
              <ul>
                <li>Device and browser information</li>
                <li>IP address and location data</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Click patterns and navigation paths</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your inquiries and provide requested information</li>
                <li>Send administrative information, updates, and marketing communications</li>
                <li>Improve our website and services</li>
                <li>Analyze usage patterns and trends</li>
                <li>Protect against fraudulent or unauthorized activity</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>Disclosure of Your Information</h2>
              <p>We may share your information in the following situations:</p>
              <ul>
                <li>
                  <strong>With Service Providers:</strong> We may share your information with third-party
                  service providers who perform services on our behalf, such as email delivery and analytics.
                </li>
                <li>
                  <strong>For Legal Purposes:</strong> We may disclose your information if required by law
                  or in response to valid requests by public authorities.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale
                  of company assets, your information may be transferred.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may disclose your information for any other purpose
                  with your consent.
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>Cookies and Tracking Technologies</h2>
              <p>
                We may use cookies, web beacons, and similar tracking technologies to collect information
                about your browsing activities. You can control cookies through your browser settings, but
                disabling cookies may affect website functionality.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your
                personal information. However, no method of transmission over the Internet or electronic
                storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Object to processing of your personal information</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the
                privacy practices of these websites. We encourage you to review their privacy policies
                before providing any personal information.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Children's Privacy</h2>
              <p>
                Our website is not intended for children under 13 years of age. We do not knowingly collect
                personal information from children under 13. If you believe we have collected information
                from a child under 13, please contact us immediately.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by
                posting the new privacy policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Contact Us</h2>
              <p>
                If you have questions or concerns about this privacy policy, please contact us at:
              </p>
              <address className={styles.address}>
                <strong>Tolani Corp</strong><br />
                Email: privacy@tolanicorp.us<br />
                Website: <Link href="/#contact">Contact Form</Link>
              </address>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
