# PROFILE.md — Source Extraction for Anuran De

> Step 1 of the build process. Everything below is pulled **only** from the provided
> resume PDF and the public GitHub profile. LinkedIn was inaccessible (auth wall / HTTP 999),
> so the resume is the sole source for work history. **Nothing here is invented** — gaps are
> flagged explicitly in the last section rather than filled with generic copy.

---

## 1. Snapshot

| | |
|---|---|
| **Name** | Anuran De |
| **Current role** | Associate Software Engineer — A. P. Moller · Maersk (Bengaluru, India) |
| **Focus** | Data engineering — distributed pipelines, ETL/ELT, Delta Lake, real-time ingestion; plus applied AI/RAG systems |
| **Education** | B.Tech, Computer Science Engineering (AI) — IEM Kolkata · GPA 8.75/10 · 2022–2026 |
| **Based in** | Bengaluru / Kolkata, India |

**One-line positioning (drawn from the resume, not genericized):**
> Data engineer building the pipelines behind Maersk's container operations — moving **12M+ shipping
> records a day** across **30+ global terminals** on Databricks Delta Lake, and the APIs and RAG
> systems that sit on top of that data.

---

## 2. Work History (verified from resume)

### A. P. Moller — Maersk · Bengaluru, India · Jul 2025 – Present
**Associate Software Engineer** *(Jul 2026 – Present)*
- Architected **10+ enterprise-scale data pipelines** on Databricks Delta Lake processing **12M+ shipping
  records/day** across **30+ global terminals** (PySpark) — cut end-to-end data latency **70%**, enabling
  real-time freight analytics for **$4B+ annual container operations**.
- Led **MSS Vault secrets migration**: secured **40+ API credentials** across 3 environments (CDT/PP/Prod);
  resolved critical data-quality defects in container-tracking nomenclature across 30+ terminals,
  preventing **$500K+ in operational disruptions**.

**Software Engineer Intern** *(Jul 2025 – Jul 2026)*
- Designed & deployed **3 production REST APIs** (OpenAPI 3.0.1) with StarGate/Apigee gateway integration —
  **50K+ daily requests** at **sub-100ms P95 latency** for Digital Maritime and PO Invoice teams.
- Engineered an automated **PostgreSQL → Delta Lake** sync pipeline for real-time rate ingestion across all
  terminals — **99.7% data consistency** across distributed systems.

### WEBEL, Government of West Bengal · Kolkata · Aug 2024 – Oct 2024
**Data Science & Machine Learning Intern**
- Reclassified **1,000+ mislabelled cases** using NLP + LangChain pipelines — **+35% dataset quality**.
- Built a crime-classification system surfacing **10 key contributing factors** — **−50% manual case-processing time**.

---

## 3. Featured Project Candidates (ranked)

Strongest first. #1–3 are the professional, data-heavy, metric-rich work (best fit for a data-engineering
portfolio). #4–5 are public repos with real code to link to. **Recommend shipping #1–4, plus one of #5.**

### ① SARA — Multi-Agent RAG for ServiceNow Incident Resolution · *Jun 2026*
- **What:** Production multi-agent RAG pipeline that classifies and root-causes ServiceNow incidents and routes them to the right engineer.
- **Stack:** LangGraph (StateGraph), Azure OpenAI (GPT-5-mini), Qdrant vector search, Cohere Rerank, FastAPI, Docker, ServiceNow.
- **Contribution:** Built the agent orchestration + a **hybrid retrieval** architecture (Qdrant + Cohere reranking) over 2 knowledge collections.
- **Impact:** **2,000+ tickets/month**, **−75% mean resolution time**, **300+ engineer-hours/month saved**, **94% classification accuracy**, routing across **4 incident categories**.
- **Links:** ⚠️ Internal Maersk project — likely no public repo (see flags).

### ② RateFlow — Cross-Platform API Gateway for Terminal Operations · *Apr 2026*
- **What:** Data-access layer exposing terminal/rate data to internal platforms with governed API contracts.
- **Stack:** Python, FastAPI, OpenAPI 3.0.1, StarGate/Apigee, PostgreSQL, Delta Lake.
- **Contribution:** Delivered **3 endpoints** (TMVC, PO Invoice, Container Info) with schema validation across CDT/PP/Prod; built **event-driven Postgres → Delta Lake** rate sync with real-time change detection.
- **Impact:** **50K+ daily requests**, **10K+ rate updates/day**, eliminated **20+ hrs/week** of manual reconciliation across 30+ terminals.
- **Links:** ⚠️ Internal Maersk project — likely no public repo (see flags).

### ③ Delta Lake Pipeline Platform — Maersk Container Analytics *(from ASE role)*
- **What:** The fleet of **10+ PySpark pipelines** on Databricks Delta Lake feeding real-time freight analytics. *(Promoting this out of the "experience" bullet into its own project card — it's the strongest pure data-engineering story.)*
- **Stack:** PySpark, Databricks, Delta Lake, Azure Data Lake, dimensional modeling.
- **Impact:** **12M+ records/day**, **30+ terminals**, **−70% latency**, underpins **$4B+ operations**.
- **Links:** ⚠️ Internal Maersk project.

### ④ researgent — Multi-Agent Research System *(public, OSS)*
- **What:** CLI research assistant that plans, searches the web, and synthesizes cited answers via multiple specialized agents.
- **Stack:** LangGraph, LangChain, Google Gemini (Generative AI), Tavily search, aiohttp.
- **Features:** Configurable agent count / research depth, 4 output styles (academic/business/educational/journalistic), source attribution + citations, JSON export, batch + interactive CLI.
- **Links:** ✅ github.com/anuran-de/researgent *(public)*.

### ⑤ TELEDOC — AI Symptom-Diagnosis Web App *(public, OSS)*
- **What:** React app for symptom selection → AI diagnostic suggestions + medication recommendations.
- **Stack:** React + styled-components, FastAPI, LangChain, Google Gemini. MIT-licensed.
- **Links:** ✅ github.com/anuran-de/TELEDOC *(public)*.

*Also available but likely too thin to feature honestly:* `gencrew` ("CrewAI wrapper", 4 commits, no README),
`mamba` (single-commit `app.py`, no README), `Smart-Parking-System` (Raspberry Pi IoT, 2024), `ApniRail`,
`Booklook`, `SHROUD`, `bengal-esummit`. **I won't feature these unless you give me real details** — I'm not going to invent descriptions.

---

## 4. Skills Inventory (verified from resume)

- **Languages:** Python, SQL, Java, C, JavaScript
- **Data Architecture & Engineering:** Apache Spark, Databricks, Delta Lake, Azure Data Lake, ETL/ELT, Apache Airflow, Data Warehousing, Dimensional Modeling
- **AI & RAG:** LangGraph, LangChain, Azure OpenAI, Qdrant, Cohere Rerank, RAG pipelines, NLP
- **API & Cloud:** REST / OpenAPI 3.0, StarGate, Apigee, Azure, Docker, CI/CD
- **Databases:** PostgreSQL, MySQL, MongoDB, Delta Lake, Qdrant
- **Web:** FastAPI, Flask, React, Streamlit, HTML, CSS

---

## 5. Quantifiable Impact (the numbers — for a stats/data section)

| Metric | Value | Source |
|---|---|---|
| Shipping records processed / day | **12M+** | Maersk ASE |
| Global terminals served | **30+** | Maersk |
| Data-latency reduction | **70%** | Maersk ASE |
| Annual operations enabled | **$4B+** | Maersk ASE |
| Enterprise pipelines built | **10+** | Maersk ASE |
| API requests / day | **50K+** | Maersk / RateFlow |
| API P95 latency | **<100ms** | Maersk intern |
| Postgres→Delta consistency | **99.7%** | Maersk intern |
| Operational disruption prevented | **$500K+** | Maersk ASE |
| SARA — resolution-time cut | **75%** (2,000+ tickets/mo) | SARA |
| SARA — classification accuracy | **94%** | SARA |
| SARA — engineer-hours saved / mo | **300+** | SARA |
| RateFlow — manual work removed | **20+ hrs/week** | RateFlow |
| WEBEL — dataset-quality lift | **+35%** (1,000+ cases) | WEBEL |

**Leadership / community:** Bengal E-Summit — lead organizer, Kolkata's first college entrepreneurship
event (**500+ participants**); Diversion — tech lead, Western India's largest MLH hackathon (**100+ teams**).

---

## 6. Data-Engineering Visualization Candidates (the differentiator section)

Two ideas grounded in the *actual* project material (detailed in DESIGN.md):
1. **Live pipeline diagram** — animated **Postgres → CDC → PySpark/Databricks → Delta Lake → API/analytics**
   flow with "records" streaming through as particles; hover a node to see its role, throughput, and the real
   numbers (12M/day, 99.7% consistency). Directly mirrors the RateFlow / Delta Lake work.
2. **SARA agent graph** — an interactive LangGraph-style DAG (ingest → classify → hybrid retrieve → rerank →
   route) that lights up an incident as it flows through the agents.

Recommend #1 as the hero data-viz (most "data engineer", most legible) with #2 as an optional secondary.

---

## 7. Gaps & Flags — need your input before I proceed

1. **LinkedIn was unreadable** (auth wall). Resume is the only history source. → *Anything on LinkedIn not in the resume — certifications, extra roles, awards?*
2. **Experience framing.** The source supports **~1 year at Maersk** (intern → ASE) + a 3-month WEBEL internship + student projects — closer to **1–1.5 yrs professional**, not the "2–4 years" from your brief. I'd rather lead with **scale/impact** (12M records/day, $4B ops) than a year-count, which is both more honest and more impressive. → *How do you want tenure stated in the hero?*
3. **SARA & RateFlow look internal/proprietary** (not on your public GitHub). → *OK to present them without repo/demo links, tagged "Proprietary — Maersk"? Or do public versions exist?*
4. **Undescribed repos** (`mamba`, `gencrew`, `ApniRail`, `Booklook`, `SHROUD`, `bms`): excluded unless you supply details. → *Want any of these in? Give me a line on each.*
5. **No publications/research found** in any source (`researgent` is a personal tool, not a paper). → *Confirm none exist to list.*
6. **Contact:** two emails (`anurande514@gmail.com` resume / `anuran.de2022@iem.edu.in` GitHub) + phone `+91 9874155105`. → *Recommend publishing the gmail + GitHub + LinkedIn + LeetCode, and NOT the phone number. OK?*
7. **Handles for links:** GitHub `anuran-de`, LinkedIn `anuran-de-7b7083286`, LeetCode `anuran`, Instagram `anuran.__` (skip IG for a pro portfolio?).
