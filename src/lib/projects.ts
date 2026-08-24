/**
 * Selected work (DESIGN.md §6.02, PROFILE.md §3). Ranked strongest-first.
 * Internal Maersk work carries an honest PROPRIETARY tag and no dead link;
 * public OSS work links to source. Every number is real.
 */
export type Metric = { value: string; label: string };

export type Project = {
  num: string;
  name: string;
  /** One-line descriptor under the name */
  kicker: string;
  stack: string[];
  date: string;
  role: string;
  /** true → internal/proprietary, no public repo */
  internal: boolean;
  sourceUrl?: string;
  /** What it is */
  what: string;
  /** The specific contribution */
  contribution: string;
  /** Pulled metric callouts */
  metrics: Metric[];
};

export const PROJECTS: Project[] = [
  {
    num: "01",
    name: "SARA",
    kicker: "Multi-Agent RAG · ServiceNow Incident Resolution",
    stack: ["LangGraph", "Azure OpenAI", "Qdrant", "Cohere Rerank", "FastAPI", "Docker"],
    date: "Jun 2026",
    role: "Agent orchestration · retrieval",
    internal: true,
    what: "A production multi-agent RAG pipeline that classifies and root-causes ServiceNow incidents, then routes each to the right engineer.",
    contribution:
      "Built the agent orchestration and a hybrid retrieval architecture (Qdrant vector search + Cohere reranking) over two knowledge collections, across four incident categories.",
    metrics: [
      { value: "−75%", label: "Mean resolution time" },
      { value: "94%", label: "Classification accuracy" },
      { value: "300+", label: "Engineer-hrs / month saved" },
    ],
  },
  {
    num: "02",
    name: "RateFlow",
    kicker: "Cross-Platform API Gateway · Terminal Operations",
    stack: ["Python", "FastAPI", "OpenAPI 3.0", "StarGate / Apigee", "PostgreSQL", "Delta Lake"],
    date: "Apr 2026",
    role: "API design · data sync",
    internal: true,
    what: "A governed data-access layer exposing terminal and rate data to internal platforms through versioned API contracts.",
    contribution:
      "Delivered three endpoints (TMVC, PO Invoice, Container Info) with schema validation across CDT/PP/Prod, plus an event-driven Postgres → Delta Lake rate sync with real-time change detection.",
    metrics: [
      { value: "50K+", label: "Requests / day" },
      { value: "10K+", label: "Rate updates / day" },
      { value: "−20 hrs", label: "Manual work / week" },
    ],
  },
  {
    num: "03",
    name: "Delta Lake Platform",
    kicker: "Container Analytics · Databricks Lakehouse",
    stack: ["PySpark", "Databricks", "Delta Lake", "Azure Data Lake", "Dimensional Modeling"],
    date: "2025–26",
    role: "Data engineering",
    internal: true,
    what: "The fleet of 10+ PySpark pipelines on Databricks Delta Lake feeding real-time freight analytics for container operations.",
    contribution:
      "Architected and tuned enterprise-scale ingestion and dimensional models processing shipping records across every terminal, cutting end-to-end latency and underpinning downstream analytics.",
    metrics: [
      { value: "12M+", label: "Records / day" },
      { value: "30+", label: "Global terminals" },
      { value: "−70%", label: "Data latency" },
    ],
  },
  {
    num: "04",
    name: "researgent",
    kicker: "Multi-Agent Research System · CLI",
    stack: ["LangGraph", "LangChain", "Google Gemini", "Tavily", "aiohttp"],
    date: "OSS",
    role: "Author",
    internal: false,
    sourceUrl: "https://github.com/anuran-de/researgent",
    what: "A CLI research assistant that plans, searches the web, and synthesizes cited answers through multiple specialized agents.",
    contribution:
      "Configurable agent count and research depth, four output styles (academic / business / educational / journalistic), source attribution with citations, JSON export, and batch + interactive modes.",
    metrics: [
      { value: "4", label: "Output styles" },
      { value: "N-agent", label: "Configurable depth" },
    ],
  },
  {
    num: "05",
    name: "TELEDOC",
    kicker: "AI Symptom-Diagnosis Web App",
    stack: ["React", "styled-components", "FastAPI", "LangChain", "Google Gemini"],
    date: "OSS · MIT",
    role: "Author",
    internal: false,
    sourceUrl: "https://github.com/anuran-de/TELEDOC",
    what: "A web app that turns symptom selection into AI diagnostic suggestions and medication recommendations.",
    contribution:
      "Built the React front end and a FastAPI + LangChain service that structures model output into ranked, explainable suggestions.",
    metrics: [{ value: "MIT", label: "Open source" }],
  },
];
