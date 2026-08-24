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
      "Architected 10+ enterprise pipelines on Databricks Delta Lake processing 12M+ records/day across 30+ terminals (PySpark) — cut end-to-end latency 70%, enabling real-time analytics for $4B+ container operations.",
      "Led the MSS Vault secrets migration: secured 40+ API credentials across CDT/PP/Prod and fixed container-tracking data-quality defects, preventing $500K+ in operational disruption.",
    ],
  },
  {
    company: "A.P. Moller — Maersk",
    role: "Software Engineer Intern",
    period: "Jul 2025 — Jul 2026",
    location: "Bengaluru, IN",
    internal: true,
    points: [
      "Shipped 3 production REST APIs (OpenAPI 3.0.1) with StarGate/Apigee integration — 50K+ daily requests at sub-100ms P95 for Digital Maritime and PO Invoice teams.",
      "Engineered an automated PostgreSQL → Delta Lake sync for real-time rate ingestion — 99.7% data consistency across distributed systems.",
    ],
  },
  {
    company: "WEBEL · Govt. of West Bengal",
    role: "Data Science & ML Intern",
    period: "Aug 2024 — Oct 2024",
    location: "Kolkata, IN",
    points: [
      "Reclassified 1,000+ mislabelled cases using NLP + LangChain pipelines — +35% dataset quality.",
      "Built a crime-classification system surfacing 10 key contributing factors — −50% manual case-processing time.",
    ],
  },
];
