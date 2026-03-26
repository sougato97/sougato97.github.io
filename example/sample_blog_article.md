---
title: Why Retrieval Changes Once the Data Stops Being Clean
description: A practical note on what breaks when retrieval systems have to work on public information, weak metadata, and inconsistent structure.
date: 2026-03-25
tags: retrieval systems, knowledge graphs, clickhouse
slug: why-retrieval-changes-on-messy-data
kicker: Draft
math: true
---

Start with the problem in one or two direct paragraphs.

Explain why the problem matters in practice, not just in theory.

## What changes when the data gets messy

Describe the shift in assumptions.

- metadata becomes unreliable
- joins get weaker
- ranking signals matter more than exact matching

## A simple framing

If you need an equation, you can still write it in normal Markdown:

$$
score(x) = relevance(x) \cdot trust(x) \cdot freshness(x)
$$

## What I would test next

End with what you would try next, what tradeoff still looks unresolved, or what you think most people are missing.
