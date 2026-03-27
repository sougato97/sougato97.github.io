---
id: experience
title: A timeline of the systems, teams, and research tracks that shaped my work.
intro: >
  Recent work is front-loaded here, while older projects and publications are
  kept below in their own chronological archive.
items:
  - side: right
    kind: work
    date: Oct 2025 - Present
    title: Applied ML Systems Project
    role: Applied ML Systems Engineer
    description: Designed semantic retrieval for long-form, heterogeneous documents using chunk-level embeddings, ANN search, agreement-based scoring, reranking, and local multi-GPU open-source model deployment.
  - side: left
    kind: work
    date: Apr 2025 - Nov 2025
    title: fundae.ai
    role: Lead Cloud Solutions Architect | Founding Engineer
    description: Led AI systems architecture for a B2B health-tech startup, mentoring early engineers and building a multi-threaded orchestration framework based on control signals and connected to Salesforce, M365, D365, and Trino.
  - side: right
    kind: work
    date: Dec 2023 - Apr 2025
    title: Cozeva
    role: Machine Learning Engineer
    description: Built HIPAA-compliant AI systems for enterprise healthcare workflows, including a GraphRAG-based medical coding agent, multimodal retrieval pipelines, FastAPI inference services, and FHIR-oriented integration work.
  - side: left
    kind: work
    date: Feb 2024 - Feb 2025
    title: dspcoder.com
    role: Co-Founder
    description: Built a cloud-based coding platform for embedded engineers, with workspaces for small projects focused on low-level fundamentals. Marked my first end-to-end cloud systems design effort on Microsoft Azure, where I co-designed the backend architecture with the founding team and helped shape the platform's question set.
  - side: right
    kind: education
    date: Aug 2021 - Aug 2023
    title: University at Buffalo
    role: M.S. in Computer Science
    description: Specialized in computer vision, deep learning for image processing, and robotics while working on biometrics, low-light enhancement, HRI, and SLAM research.
  - side: left
    kind: work
    date: Feb 2022 - Dec 2023
    title: University at Buffalo
    role: Research Assistant
    description: Published work in low-light enhancement and dorsal hand vein biometrics, built an HRI framework around GPT-3.5 and robotics APIs, and studied localization error in SLAM systems.
  - side: right
    kind: work
    date: Jun 2022 - Aug 2022
    title: Cozeva
    role: Machine Learning Engineer Intern
    description: Engineered data pipelines for large-scale patient records, extracted features for predictive models, and worked with Social Determinants of Health data in healthcare analytics.
  - side: left
    kind: work
    date: May 2019 - Nov 2020
    title: Tata Consultancy Services
    role: Assistant Systems Engineer - Data Analytics
    description: Supported GE Healthcare analytics workflows through Salesforce-based dashboards, client requirement analysis, and SQL/reporting optimization.
  - side: right
    kind: education
    date: May 2015 - Apr 2019
    title: University of Engineering and Management, Kolkata
    role: B.Tech. in Computer Science and Engineering
    description: Early focus on machine learning, image processing, and applied research, including published work in survival prediction and weather-related modeling.
---

## What this file controls

This file defines the education and experience timeline.
Each entry in `items` becomes one timeline card.

Useful fields in the YAML above:

- `title`: section heading
- `intro`: short paragraph above the timeline
- `items[].side`: left or right placement on the timeline
- `items[].kind`: styling hint such as `work` or `education`
- `items[].date`: time range shown for the entry
- `items[].title`: organization or institution name
- `items[].role`: role or degree label
- `items[].description`: summary of the work or study
