"use client";

import { useState } from "react";
import styles from "./JobBoard.module.css";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  isInternal: boolean;
  posted: string;
}

const jobs: Job[] = [
  // Public Positions
  {
    id: "hvac-tech-sr",
    title: "Senior HVAC Technician",
    department: "Field Operations",
    location: "Multiple Locations",
    type: "Full-time",
    experience: "5+ years",
    salary: "$75,000 - $95,000",
    description: "Lead complex HVAC installations and smart system integrations for commercial clients.",
    requirements: [
      "EPA 608 Universal Certification",
      "5+ years commercial HVAC experience",
      "Smart thermostat and IoT experience preferred",
      "Valid driver's license",
    ],
    isInternal: false,
    posted: "2024-01-15",
  },
  {
    id: "project-manager",
    title: "Construction Project Manager",
    department: "Project Management",
    location: "Dallas, TX",
    type: "Full-time",
    experience: "7+ years",
    salary: "$95,000 - $130,000",
    description: "Manage large-scale commercial construction projects from planning through completion.",
    requirements: [
      "PMP certification preferred",
      "7+ years construction management experience",
      "Experience with LEED certified projects",
      "Strong communication skills",
    ],
    isInternal: false,
    posted: "2024-01-12",
  },
  {
    id: "esg-analyst",
    title: "ESG Compliance Analyst",
    department: "Sustainability",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    salary: "$70,000 - $90,000",
    description: "Monitor and report on ESG compliance metrics across all active construction projects.",
    requirements: [
      "Bachelor's degree in Environmental Science or related field",
      "Experience with ESG reporting frameworks",
      "Data analysis skills",
      "Knowledge of construction industry",
    ],
    isInternal: false,
    posted: "2024-01-10",
  },
  {
    id: "bim-specialist",
    title: "BIM Specialist",
    department: "Design",
    location: "Austin, TX",
    type: "Full-time",
    experience: "4+ years",
    salary: "$80,000 - $105,000",
    description: "Create and manage BIM models for construction projects in collaboration with Tolani Labs.",
    requirements: [
      "Proficiency in Revit and AutoCAD",
      "4+ years BIM modeling experience",
      "Understanding of MEP systems",
      "Experience with clash detection",
    ],
    isInternal: false,
    posted: "2024-01-08",
  },
  {
    id: "web3-dev",
    title: "Web3 Developer",
    department: "Technology",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    salary: "$120,000 - $160,000",
    description: "Build blockchain-based contract performance monitoring and ESG tracking systems.",
    requirements: [
      "Experience with Solidity and Ethereum",
      "React/Next.js proficiency",
      "Understanding of smart contracts",
      "API integration experience",
    ],
    isInternal: false,
    posted: "2024-01-05",
  },
  // Internal Positions (Employee Only)
  {
    id: "internal-lead-tech",
    title: "Lead Technician - Promotion",
    department: "Field Operations",
    location: "Chicago, IL",
    type: "Full-time",
    experience: "Internal promotion",
    salary: "$85,000 - $100,000",
    description: "Leadership opportunity for experienced technicians to lead regional teams.",
    requirements: [
      "Current TCCG employee (2+ years)",
      "Excellent performance reviews",
      "Team leadership experience",
      "Mentorship abilities",
    ],
    isInternal: true,
    posted: "2024-01-14",
  },
  {
    id: "internal-safety-coord",
    title: "Safety Coordinator",
    department: "Operations",
    location: "Phoenix, AZ",
    type: "Full-time",
    experience: "Internal transfer",
    salary: "$65,000 - $80,000",
    description: "Transition opportunity for field staff interested in safety management.",
    requirements: [
      "Current TCCG employee",
      "OSHA 30 certification (or willing to obtain)",
      "Field experience preferred",
      "Strong attention to detail",
    ],
    isInternal: true,
    posted: "2024-01-11",
  },
];

export function JobBoard() {
  const [activeTab, setActiveTab] = useState<"all" | "public" | "internal">("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const departments = [...new Set(jobs.map((job) => job.department))];
  const locations = [...new Set(jobs.map((job) => job.location))];

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "public" && job.isInternal) return false;
    if (activeTab === "internal" && !job.isInternal) return false;
    if (selectedDepartment !== "all" && job.department !== selectedDepartment) return false;
    if (selectedLocation !== "all" && job.location !== selectedLocation) return false;
    return true;
  });

  return (
    <section className={styles.jobBoard}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Open Positions</h2>
          <p className={styles.subtitle}>
            Find your next opportunity with TC Construction Group
          </p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "all" ? styles.active : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Positions
            <span className={styles.count}>{jobs.length}</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === "public" ? styles.active : ""}`}
            onClick={() => setActiveTab("public")}
          >
            Public
            <span className={styles.count}>{jobs.filter((j) => !j.isInternal).length}</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === "internal" ? styles.active : ""}`}
            onClick={() => setActiveTab("internal")}
          >
            Employee Only
            <span className={styles.count}>{jobs.filter((j) => j.isInternal).length}</span>
          </button>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label>Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Job Listings */}
        <div className={styles.listings}>
          {filteredJobs.length === 0 ? (
            <div className={styles.noResults}>
              <p>No positions found matching your criteria.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <article
                key={job.id}
                className={`${styles.jobCard} ${job.isInternal ? styles.internal : ""}`}
              >
                <div
                  className={styles.jobHeader}
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  <div className={styles.jobMain}>
                    <div className={styles.jobTitleRow}>
                      <h3 className={styles.jobTitle}>{job.title}</h3>
                      {job.isInternal && (
                        <span className={styles.internalBadge}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          Employee Only
                        </span>
                      )}
                    </div>
                    <div className={styles.jobMeta}>
                      <span className={styles.metaItem}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                        {job.department}
                      </span>
                      <span className={styles.metaItem}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {job.location}
                      </span>
                      <span className={styles.metaItem}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <div className={styles.jobSalary}>
                    <span className={styles.salary}>{job.salary}</span>
                    <span className={styles.experience}>{job.experience}</span>
                  </div>
                  <div className={styles.expandIcon}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        transform: expandedJob === job.id ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {expandedJob === job.id && (
                  <div className={styles.jobDetails}>
                    <div className={styles.detailsGrid}>
                      <div className={styles.detailsSection}>
                        <h4>About this role</h4>
                        <p>{job.description}</p>
                      </div>
                      <div className={styles.detailsSection}>
                        <h4>Requirements</h4>
                        <ul>
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className={styles.jobActions}>
                      <button className={styles.applyBtn}>
                        Apply Now
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12,5 19,12 12,19" />
                        </svg>
                      </button>
                      <button className={styles.saveBtn}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                        Save
                      </button>
                      <span className={styles.postedDate}>
                        Posted {new Date(job.posted).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </div>
                )}
              </article>
            ))
          )}
        </div>

        <div className={styles.employeeNote}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <p>
            <strong>Current employees:</strong> Access internal positions using your employee portal credentials.
            For company-wide benefits and rewards programs, visit the{" "}
            <a href="https://tolanicorp.us/employee-portal" target="_blank" rel="noopener noreferrer">
              Tolani Corp HQ Portal
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
