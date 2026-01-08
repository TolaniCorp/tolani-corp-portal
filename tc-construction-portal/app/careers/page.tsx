import { Metadata } from "next";
import { JobBoard } from "@/components/careers/JobBoard";
import { CareersHero } from "@/components/careers/CareersHero";
import Benefits from "@/components/careers/Benefits";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join TC Construction Group. Build your career with us in smart HVAC, ESG construction, and sustainable building solutions.",
};

export default function CareersPage() {
  return (
    <div className={styles.page}>
      <CareersHero />
      <JobBoard />
      <Benefits />
    </div>
  );
}
