---
id: hero
name: Sougato Bagchi
meta_author: Sougato Bagchi
site_name: Sougato Bagchi
page_title: Sougato Bagchi | Cloud Solutions Architect
meta_description: Sougato Bagchi builds AI systems across multi-agent orchestration, GraphRAG, open-source LLM infrastructure, and applied machine learning.
eyebrow: Knowledge Graphs | System Design | Healthcare AI
title: Turning research ideas into AI systems that hold up in production.
lede: >
  Right now, I work on LLM infrastructure, inference stacks, knowledge graphs,
  and retrieval systems backed by OLAP databases such as ClickHouse. Much of my
  current work is focused on making open-source small language models efficient
  for narrow tasks and deployable across CUDA and ROCm, while keeping retrieval
  systems fast, modular, and useful on messy real-world data.
detail: >
  At **fundae.ai**, I designed the control agent concept: an orchestration layer
  that reduced latency and improved answer quality across downstream agents. At
  **Cozeva**, I built data-grounded AI assistants and an ICD-10 medical-coding
  agent that cut manual coding effort.
actions:
  - href: data/resume.pdf
    label: Resume
    icon: resume
    style: primary
    external: true
  - href: mailto:sougato97@gmail.com
    label: Email
    icon: email
    style: secondary
    external: false
  - href: https://github.com/sougato97
    label: GitHub
    icon: github
    style: secondary
    external: true
  - href: https://www.linkedin.com/in/sougato/
    label: LinkedIn
    icon: linkedin
    style: secondary
    external: true
  - href: https://scholar.google.com/citations?user=5L6iC3MAAAAJ&hl=en&oi=ao
    label: Google Scholar
    icon: scholar
    style: secondary
    external: true
facts:
  - label: Current track
    value: LLM infrastructure, retrieval systems, and knowledge graphs
  - label: Base
    value: Salem, Oregon
  - label: Core stack
    value: Python, C++, ClickHouse, Docker, CUDA, ROCm, GraphRAG
portrait:
  src: images/sougato_dp_circle.png
  alt: Portrait of Sougato Bagchi
panel:
  kicker: Current work
  title: Design systems that scale from local servers to the cloud.
  body: >
    Building a compact AI stack from the ground up: custom indexing that
    combines PageRank-style signals with approximate nearest-neighbor search to
    form knowledge graphs from public information, alongside local multi-GPU
    inference stacks that make better use of RAM and VRAM without moving core
    model computation off the GPU.
  tags:
    - ClickHouse + HNSW
    - vLLM / llama.cpp
    - CUDA + ROCm
    - GraphRAG
---

## What this file controls

This file defines the homepage hero area and the site-level metadata.
It controls the main headline, lede, action buttons, quick facts, portrait, and the right-side current-work panel.

Useful fields in the YAML above:

- `name`: brand name shown in the site navigation
- `meta_author`: `<meta name="author">`
- `site_name`: Open Graph site name used in link previews
- `page_title`: browser tab title
- `meta_description`: `<meta name="description">`
- `eyebrow`, `title`, `lede`, `detail`: hero copy
- `actions[]`: top action buttons
- `facts[]`: quick facts shown under the hero copy
- `portrait`: profile image source and alt text
- `panel`: right-side panel title, body, and tags
