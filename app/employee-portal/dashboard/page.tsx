"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "./page.module.css";

// Check if Clerk is configured
const isClerkConfigured = typeof window !== "undefined" 
  ? !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_")
  : !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_");

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
        <h2 style={{ color: "#fff", marginBottom: "1rem" }}>🔧 Setup Required</h2>
        <p style={{ color: "rgba(255,255,255,0.7)", textAlign: "center", maxWidth: "400px" }}>
          The employee portal requires Clerk authentication to be configured.
          Please add your Clerk publishable key to the environment variables.
        </p>
        <Link 
          href="/employee-portal" 
          style={{ 
            marginTop: "1.5rem", 
            color: "#8b5cf6", 
            textDecoration: "none" 
          }}
        >
          ← Back to Sign In
        </Link>
      </div>
    );
  }

  return <DashboardContent />;
}
