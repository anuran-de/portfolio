/**
 * Stack (DESIGN.md §6.05, PROFILE.md §4) — skills as a typographic index
 * grouped by domain. Explicitly not an icon-circle grid. `lead` items are the
 * strongest, weighted up to --text on render.
 */
export type StackGroup = {
  num: string;
  domain: string;
  items: { name: string; lead?: boolean }[];
};

export const STACK: StackGroup[] = [
  {
    num: "A",
    domain: "Data Engineering",
    items: [
      { name: "Apache Spark", lead: true },
      { name: "Databricks", lead: true },
      { name: "Delta Lake", lead: true },
      { name: "Azure Data Lake" },
      { name: "ETL / ELT" },
      { name: "Apache Airflow" },
      { name: "Data Warehousing" },
      { name: "Dimensional Modeling" },
    ],
  },
  {
    num: "B",
    domain: "AI & RAG",
    items: [
      { name: "LangGraph", lead: true },
      { name: "LangChain", lead: true },
      { name: "Azure OpenAI" },
      { name: "Qdrant" },
      { name: "Cohere Rerank" },
      { name: "RAG Pipelines", lead: true },
      { name: "NLP" },
    ],
  },
  {
    num: "C",
    domain: "API & Cloud",
    items: [
      { name: "REST / OpenAPI 3.0", lead: true },
      { name: "StarGate" },
      { name: "Apigee" },
      { name: "Azure" },
      { name: "Docker" },
      { name: "CI/CD" },
    ],
  },
  {
    num: "D",
    domain: "Databases",
    items: [
      { name: "PostgreSQL", lead: true },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Delta Lake" },
      { name: "Qdrant" },
    ],
  },
  {
    num: "E",
    domain: "Languages & Web",
    items: [
      { name: "Python", lead: true },
      { name: "SQL", lead: true },
      { name: "Java" },
      { name: "C" },
      { name: "JavaScript" },
      { name: "FastAPI" },
      { name: "React" },
      { name: "Streamlit" },
    ],
  },
];
