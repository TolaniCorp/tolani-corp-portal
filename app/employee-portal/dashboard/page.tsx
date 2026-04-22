"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "./page.module.css";
import { hasClerkClientEnv } from "@/lib/clerk";

const isClerkConfigured = hasClerkClientEnv();

// Dynamically import the dashboard content to avoid SSR issues with Clerk
const DashboardContent = dynamic(() => import("./DashboardContent"), {
  ssr: false,
  loading: () => (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
      <p>Loading dashboard...</p>
    </div>
  ),
});

export default function DashboardPage() {
  // Show setup message if Clerk is not configured
  if (!isClerkConfigured) {
    return (
      <div className={styles.loadingContainer}>
        <h2 className={styles.setupTitle}>🔧 Setup Required</h2>
        <p className={styles.setupMessage}>
          The employee portal requires Clerk authentication to be configured.
          Please add your Clerk publishable key to the environment variables.
        </p>
        <Link 
          href="/employee-portal" 
          className={styles.setupBackLink}
        >
          ← Back to Sign In
        </Link>
      </div>
    );
  }

  return <DashboardContent />;
}
