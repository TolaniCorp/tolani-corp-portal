import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Service | Tolani Corp",
  description: "Terms of service governing the use of Tolani Corp's website and services.",
};

export default function TermsPage() {
  const lastUpdated = "January 1, 2026";

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <article className={styles.article}>
          <header className={styles.header}>
            <span className="section-label">Legal</span>
            <h1 className={styles.title}>Terms of Service</h1>
            <p className={styles.lastUpdated}>Last updated: {lastUpdated}</p>
          </header>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2>Agreement to Terms</h2>
              <p>
                These Terms of Service ("Terms") govern your access to and use of the Tolani Corp website
                located at tolanicorp.us ("Website") and any related services provided by Tolani Corp
                ("Company," "we," "us," or "our").
              </p>
              <p>
                By accessing or using our Website, you agree to be bound by these Terms. If you disagree
                with any part of these Terms, you may not access the Website.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Intellectual Property</h2>
              <p>
                The Website and its entire contents, features, and functionality (including but not limited
                to all information, software, text, displays, images, video, and audio, and the design,
                selection, and arrangement thereof) are owned by Tolani Corp, its licensors, or other
                providers of such material and are protected by United States and international copyright,
                trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, create derivative works of, publicly display,
                publicly perform, republish, download, store, or transmit any of the material on our
                Website without our prior written consent.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Trademarks</h2>
              <p>
                The following are trademarks of Tolani Corp:
              </p>
              <ul>
                <li>Tolani Corp™</li>
                <li>Tolani Foundation™</li>
                <li>TC Construction Group™</li>
                <li>Tolani Labs™</li>
                <li>Neo Labs™</li>
                <li>Mango Group™</li>
                <li>Mende Atelier™</li>
                <li>"Building Beyond Boundaries"™</li>
              </ul>
              <p>
                You may not use these trademarks without our prior written permission.
              </p>
            </section>

            <section className={styles.section}>
              <h2>User Representations</h2>
              <p>By using the Website, you represent and warrant that:</p>
              <ul>
                <li>You have the legal capacity to agree to these Terms</li>
                <li>You are not a minor in the jurisdiction in which you reside</li>
                <li>You will not access the Website through automated or non-human means</li>
                <li>You will not use the Website for any illegal or unauthorized purpose</li>
                <li>Your use of the Website will not violate any applicable law or regulation</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>Prohibited Activities</h2>
              <p>You may not access or use the Website for any purpose other than that for which we make
                the Website available. The Website may not be used in connection with any commercial
                endeavors except those specifically endorsed or approved by us. You agree not to:</p>
              <ul>
                <li>Systematically retrieve data to create a collection or database</li>
                <li>Circumvent, disable, or interfere with security-related features</li>
                <li>Engage in unauthorized framing or linking to the Website</li>
                <li>Trick, defraud, or mislead us or other users</li>
                <li>Interfere with or disrupt the Website or connected networks</li>
                <li>Attempt to bypass any measures designed to prevent access</li>
                <li>Harass, annoy, intimidate, or threaten our employees or agents</li>
                <li>Upload or transmit viruses or malicious code</li>
                <li>Use the Website in a manner inconsistent with applicable laws</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>Submissions</h2>
              <p>
                By submitting questions, comments, suggestions, ideas, or other information through our
                contact form or other means ("Submissions"), you grant us a non-exclusive, royalty-free,
                perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt,
                publish, translate, create derivative works from, distribute, and display such Submissions
                throughout the world in any media.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Third-Party Websites</h2>
              <p>
                The Website may contain links to third-party websites and services. We are not responsible
                for the content, privacy policies, or practices of third-party websites. You acknowledge
                and agree that we are not liable for any damage or loss caused by your use of any
                third-party website.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Disclaimer of Warranties</h2>
              <p>
                THE WEBSITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE DISCLAIM ALL WARRANTIES
                OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES
                OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p>
                WE DO NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, THAT
                DEFECTS WILL BE CORRECTED, OR THAT THE WEBSITE IS FREE OF VIRUSES OR OTHER HARMFUL
                COMPONENTS.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Limitation of Liability</h2>
              <p>
                TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL TOLANI CORP, ITS AFFILIATES,
                DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE WEBSITE.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless Tolani Corp and its subsidiaries,
                affiliates, officers, directors, employees, agents, and licensors from and against any
                claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees arising
                out of your violation of these Terms or your use of the Website.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State
                of Delaware, United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will provide notice of changes
                by updating the "Last updated" date. Your continued use of the Website after any changes
                constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className={styles.section}>
              <h2>Contact Information</h2>
              <p>
                For questions about these Terms, please contact us at:
              </p>
              <address className={styles.address}>
                <strong>Tolani Corp</strong><br />
                Email: legal@tolanicorp.us<br />
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
