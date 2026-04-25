"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const dashboardItems = [
  {
    icon: "📊",
    title: "Pay & Benefits",
    description: "View pay stubs, tax documents, and benefits enrollment",
    href: "/employee-portal/pay",
    color: "#8b5cf6",
  },
  {
    icon: "📅",
    title: "Time Off",
    description: "Request PTO, view balances, and check schedules",
    href: "/employee-portal/time-off",
    color: "#06b6d4",
  },
  {
    icon: "📚",
    title: "Learning",
    description: "Training courses, certifications, and development",
    href: "/employee-portal/learning",
    color: "#10b981",
  },
  {
    icon: "👥",
    title: "Team Directory",
    description: "Find colleagues and organization chart",
    href: "/employee-portal/directory",
    color: "#f59e0b",
  },
  {
    icon: "💬",
    title: "IT Support",
    description: "Submit tickets and get technical help",
    href: "/employee-portal/support",
    color: "#ef4444",
  },
  {
    icon: "📋",
    title: "Documents",
    description: "Company policies, handbooks, and forms",
    href: "/employee-portal/documents",
    color: "#ec4899",
  },
];

const recentActivity = [
  { icon: "✅", text: "PTO request approved for Jan 15-17", time: "2 hours ago" },
  { icon: "📄", text: "W-2 form now available", time: "1 day ago" },
  { icon: "🎓", text: "Completed: Security Awareness Training", time: "3 days ago" },
  { icon: "💰", text: "Direct deposit processed", time: "1 week ago" },
];

export default function DashboardContent() {
  const { user, isLoaded } = useUser();
  const currentUser = useQuery(api.users.getCurrentUser);
  const storeUser = useMutation(api.users.store);
  const announcements = useQuery(api.announcements.getActive);

  // Store/update user in Convex on first load
  useEffect(() => {
    if (isLoaded && user && currentUser === null) {
      storeUser();
    }
  }, [isLoaded, user, currentUser, storeUser]);

  if (!isLoaded || !user) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const firstName = user.firstName || user.emailAddresses[0]?.emailAddress?.split("@")[0] || "Employee";

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>◈</span>
            <span>Tolani Corp</span>
          </Link>
        </div>
        <div className={styles.headerRight}>
          <nav className={styles.nav}>
            <Link href="/employee-portal/dashboard" className={styles.navLink}>Dashboard</Link>
            <Link href="/employee-portal/profile" className={styles.navLink}>Profile</Link>
          </nav>
          <UserButton
            appearance={{
              elements: {
                avatarBox: styles.userAvatar,
              },
            }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Welcome Section */}
        <section className={styles.welcome}>
          <div className={styles.welcomeContent}>
            <h1 className={styles.welcomeTitle}>
              Welcome back, <span className={styles.welcomeName}>{firstName}</span>
            </h1>
            <p className={styles.welcomeSubtitle}>
              {new Date().toLocaleDateString("en-US", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </p>
          </div>
          <div className={styles.quickStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>12</span>
              <span className={styles.statLabel}>PTO Days Left</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>3</span>
              <span className={styles.statLabel}>Pending Tasks</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>2</span>
              <span className={styles.statLabel}>Unread Messages</span>
            </div>
          </div>
        </section>

        {/* Announcements */}
        {announcements && announcements.length > 0 && (
          <section className={styles.announcements}>
            <h2 className={styles.sectionTitle}>📢 Announcements</h2>
            <div className={styles.announcementsList}>
              {announcements.map((ann) => (
                <div 
                  key={ann._id} 
                  className={`${styles.announcement} ${styles[`priority${ann.priority.charAt(0).toUpperCase() + ann.priority.slice(1)}`]}`}
                >
                  <h3>{ann.title}</h3>
                  <p>{ann.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dashboard Grid */}
        <section className={styles.dashboardGrid}>
          <h2 className={styles.sectionTitle}>Quick Access</h2>
          <div className={styles.grid}>
            {dashboardItems.map((item, index) => (
              <Link key={index} href={item.href} className={styles.card}>
                <div 
                  className={styles.cardIcon} 
                  style={{ backgroundColor: `${item.color}20`, color: item.color }}
                >
                  {item.icon}
                </div>
                <div className={styles.cardContent}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <span className={styles.cardArrow}>→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className={styles.activity}>
          <h2 className={styles.sectionTitle}>Recent Activity</h2>
          <div className={styles.activityList}>
            {recentActivity.map((item, index) => (
              <div key={index} className={styles.activityItem}>
                <span className={styles.activityIcon}>{item.icon}</span>
                <div className={styles.activityContent}>
                  <p>{item.text}</p>
                  <span className={styles.activityTime}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Tolani Corp Employee Portal</p>
        <div className={styles.footerLinks}>
          <Link href="/employee-portal/support">Help</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </footer>
    </div>
  );
}
