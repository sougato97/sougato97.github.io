---
id: focus
title: What I am building now and the problems I keep coming back to.
panels:
  - title: I am exploring
    bullets:
      - Knowledge graphs built from public information and professional context.
      - LLM inference layers that use RAM, VRAM, and GPU compute more intelligently.
      - Reasoning-oriented neural architectures, including the idea of IDEA-AS-A-TOKEN.
      - Neuromorphic computing as a reference point for future model design.
  - title: What guides my work
    bullets:
      - I spend a lot of time reading research papers, then checking which ideas actually survive real systems.
      - I borrow from strong engineering practices in distributed systems, databases, and infrastructure.
      - I care a lot about clear separation of concerns, especially from the data side, because it makes system architecture easier to design, extend, and maintain.
      - I like building systems that remove repetitive manual work and make people noticeably more effective in their day-to-day workflows.
---

## What this file controls

This file defines the Current Focus section on the homepage.
Each panel becomes a card with a heading and bullet list.

Useful fields in the YAML above:

- `title`: section heading
- `panels[]`: list of focus cards
- `panels[].title`: card heading
- `panels[].bullets`: bullet points shown inside the card
