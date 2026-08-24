/**
 * Experience (DESIGN.md §6.04, PROFILE.md §2) — a concise doc timeline. Every
 * line carries a number or a decision; no filler bullets.
 */
export type Role = {
  company: string;
  role: string;
  period: string;
  location: string;
  /** Internal work flag → PROPRIETARY note */
  internal?: boolean;
  points: string[];
};

export const EXPERIENCE: Role[] = [
  {
    company: "A.P. Moller — Maersk",
    role: "Associate Software Engineer",
    period: "Jul 2026 — Present",
    location: "Bengaluru, IN",
    internal: true,
    points: [
      "30+ PySpark pipelines on Databricks Delta Lake move 12M+ shipping records a day out of 30+ terminals and into the tables freight analytics reads from. Reworking the ingestion path took end-to-end latency down by 70%.",
      "Moved 40+ API credentials into MSS Vault across the CDT, PP, and Prod environments, and cleared the container-tracking data-quality defects that were feeding bad state downstream.",
    ],
  },
  {
    company: "A.P. Moller — Maersk",
    role: "Software Engineer Intern",
    period: "Jul 2025 — Jul 2026",
    location: "Bengaluru, IN",
    internal: true,
    points: [
      "Three production REST APIs (OpenAPI 3.0.1) sit behind StarGate and Apigee for the Digital Maritime and PO Invoice teams — 50K+ requests a day at sub-100ms P95.",
      "An event-driven PostgreSQL → Delta Lake sync keeps rate data current in real time, holding 99.7% consistency across the systems it spans.",
    ],
  },
  {
    company: "WEBEL · Govt. of West Bengal",
    role: "Data Science & ML Intern",
    period: "Aug 2024 — Oct 2024",
    location: "Kolkata, IN",
    points: [
      "NLP and LangChain pipelines relabelled 1,000+ mislabelled cases and pulled dataset quality up 35%.",
      "A crime-classification model surfaces the 10 factors that weigh most on each case, halving the manual processing time.",
    ],
  },
];
