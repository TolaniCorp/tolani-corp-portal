"use client";

import { SignIn, useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import styles from "./page.module.css";

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

export default function SignInContent() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [workEmail, setWorkEmail] = useState(searchParams.get("email") ?? "");

  const emailHint = searchParams.get("email") ?? "";

  function handleEnterpriseContinue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = workEmail.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      return;
    }

    router.push(`/employee-portal?email=${encodeURIComponent(trimmed)}#enterprise`);
  }

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/employee-portal/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p>Loading...</p>
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p>Redirecting to dashboard...</p>
      </div>
    );
  }

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
        <form className={styles.enterpriseForm} onSubmit={handleEnterpriseContinue}>
          <label htmlFor="enterprise-email" className={styles.enterpriseLabel}>
            Enterprise SSO
          </label>
          <div className={styles.enterpriseRow}>
            <input
              id="enterprise-email"
              type="email"
              className={styles.input}
              value={workEmail}
              onChange={(event) => setWorkEmail(event.target.value)}
              placeholder="name@company.com"
              autoComplete="email"
            />
            <button type="submit" className={styles.enterpriseButton}>
              Continue
            </button>
          </div>
          <p className={styles.enterpriseHint}>
            Use your company email to continue with your organization&apos;s sign-in policy.
          </p>
          {emailHint ? (
            <p className={styles.enterpriseHint}>
              Email hint detected: <strong>{emailHint}</strong>
            </p>
          ) : null}
        </form>

        <div className={styles.clerkContainer}>
          <SignIn 
            appearance={{
              elements: {
                rootBox: styles.clerkRoot,
                card: styles.clerkCard,
                headerTitle: styles.clerkTitle,
                headerSubtitle: styles.clerkSubtitle,
                socialButtonsBlockButton: styles.clerkSocialButton,
                formButtonPrimary: styles.clerkSubmitButton,
                footerAction: styles.clerkFooter,
              },
            }}
            routing="hash"
            transferable
            forceRedirectUrl="/employee-portal/dashboard"
            signUpUrl="/employee-portal/sign-up"
          />
        </div>
      </section>

      <section className={styles.quickLinks}>
        <h2 className={styles.quickLinksTitle}>Quick Access</h2>
        <p className={styles.quickLinksSubtitle}>Sign in to access these features</p>
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
        <p>
          Need help?{" "}
          <a href="mailto:it@tolanicorp.us" className={styles.helpLink}>
            Contact IT Support
          </a>
        </p>
        <p className={styles.footerCopyright}>
          © {new Date().getFullYear()} Tolani Corp. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
