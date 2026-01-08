import styles from "./page.module.css";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { LabsPartnership } from "@/components/LabsPartnership";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <Stats />
      <Services />
      <LabsPartnership />
      <FeaturedProjects />
      <Testimonials />
      <CTASection />
    </div>
  );
}
