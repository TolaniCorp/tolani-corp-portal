"use client";

import { hasClerkClientEnv } from "@/lib/clerk";
import dynamic from "next/dynamic";
import styles from "../page.module.css";

const SignUpContent = dynamic(() => import("./SignUpContent"), {
  ssr: false,
  loading: () => (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
      <p>Loading...</p>
    </div>
  ),
});

export default function EmployeePortalSignUpPage() {
  if (!hasClerkClientEnv()) {
    return (
      <div className={styles.loadingContainer}>
        <h2 style={{ color: "#fff", marginBottom: "1rem" }}>Setup required</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", textAlign: "center", maxWidth: "440px" }}>
          Clerk environment variables are missing. Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY to enable sign-up.
        </p>
      </div>
    );
  }

  return <SignUpContent />;
}
