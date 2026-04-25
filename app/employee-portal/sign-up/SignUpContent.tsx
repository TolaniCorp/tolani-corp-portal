"use client";

import { SignUp, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "../page.module.css";

export default function SignUpContent() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

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

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <span className={styles.badge}>Team onboarding</span>
        <h1 className={styles.title}>
          Create your <span className={styles.titleAccent}>employee account</span>
        </h1>
        <p className={styles.subtitle}>
          Use your company email to register and access the Tolani Corp employee portal.
        </p>
      </section>

      <section className={styles.loginSection}>
        <div className={styles.clerkContainer}>
          <SignUp
            routing="hash"
            signInUrl="/employee-portal"
            forceRedirectUrl="/employee-portal/dashboard"
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
          />
        </div>
      </section>
    </div>
  );
}
