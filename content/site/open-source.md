---
id: work
title: Projects that reflect how I think about infrastructure, agents, and retrieval.
cards:
  - kicker: Open source
    title: ModelServer
    description: Docker-first LLM inference stack spanning CUDA and ROCm, covering vLLM, llama.cpp, deployment ergonomics, and model-serving evaluation.
    tags:
      - CUDA
      - ROCm
      - vLLM
      - llama.cpp
    href: https://github.com/sougato97/ModelServer
    link_label: View repository
    external: true
  - kicker: Open source
    title: Graphrag-OSS
    description: GraphRAG stack built with ClickHouse, open-source LLM and embedding models for retrieval-heavy workflows.
    tags:
      - GraphRAG
      - ClickHouse
      - Embeddings
    href: https://github.com/sougato97/graphrag
    link_label: View repository
    external: true
  - kicker: Current systems work
    title: Project-Pod
    description: Early-stage work on building a knowledge graph from public professional information, with room for collaborators as it matures.
    tags:
      - Knowledge Graph
      - LLM Inference
      - Query-Reranking
    note: Private / ongoing
  - kicker: Open source
    title: Portfolio-in-Markdown
    description: "A simpler way to shape a portfolio or blog around your voice, your work, and your story, without writing much code."
    tags:
      - GitHub Pages
      - Markdown
      - Static Site
    href: https://github.com/sougato97/sougato97.github.io
    link_label: View repository
    external: true
---

## What this file controls

This file defines the Selected Systems & Open Source section.
Each entry in `cards` becomes one project card.

Useful fields in the YAML above:

- `title`: section heading
- `cards[].kicker`: small label above the project title
- `cards[].title`: project name
- `cards[].description`: summary of the project
- `cards[].tags`: list of technology tags
- `cards[].href`: repository or project link
- `cards[].link_label`: text for the footer link
- `cards[].note`: non-link footer note for private or in-progress work
