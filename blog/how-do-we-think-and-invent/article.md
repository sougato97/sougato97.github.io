---
title: How Do We Think, and How Do We Invent?
description: Let's explore whether creativity can be modeled without losing what makes it human, and whether that is the next frontier for AI models.
date: 2026-03-25
tags: thinking, creativity, model design
slug: how-do-we-think-and-invent
kicker: Essay
math: true
---

I do not mean this in a mystical way. I mean it as an engineering question. People do not invent in a vacuum. We observe, compress, compare, borrow, reject, combine, and then test. Some inventions are flashes of insight, but even those flashes usually arrive after a long period of structured exposure.

So the question is not whether thinking is magical. The question is whether there is enough structure inside thought that we can model parts of it without flattening what makes it human.

## A rough way to frame invention

A useful starting point is to treat invention as a function of memory, abstraction, analogy, constraint, and taste. I am not claiming this is *the* equation. I am saying it is a good way to reason about the problem.

$$
\text{invention} \approx f(\text{memory},\; \text{abstraction},\; \text{analogy},\; \text{constraint},\; \text{taste})
$$

Memory matters because nothing new is created from nothing. Abstraction matters because raw facts are not enough; we need compressed forms that transfer across domains. Analogy matters because many useful inventions are really clean mappings between two things that previously looked unrelated. Constraint matters because useful solutions are shaped by budgets, hardware, time, and the messiness of the real world. Taste matters because not every valid combination is interesting.

## What current models are already good at

Present-generation models are already strong at recall, recombination, and compression. They can pull patterns out of large corpora, summarize them, and produce plausible continuations. That alone is why they are useful. In practice, a lot of good engineering work is exactly that: turning broad prior knowledge into something sharp enough for a local problem.

In other words, models already do part of the job. They are not blank autocomplete systems anymore. They are pattern compressors with a useful amount of transfer.

## Where they still feel limited

The gap shows up when novelty has to stay coherent over time. A system can generate many reasonable ideas, but invention usually requires more than local plausibility. It needs persistent pressure across steps: remembering what has already been tried, rejecting weak branches, preserving good constraints, and pushing toward something both new and useful.

That is where the question becomes interesting. Maybe the frontier is not just larger pretraining. It may also involve better memory structures, stronger world models, cleaner decomposition of subproblems, and architectures that can revisit their own intermediate reasoning without collapsing into noise.

## A toy objective

If I were forced to write down a crude target for invention, it would look something like this:

$$
I(x) = \text{novelty}(x) \cdot \text{usefulness}(x) \cdot \text{coherence}(x)
$$

This is obviously incomplete, but it helps. High novelty without usefulness is noise. Usefulness without novelty is routine optimization. Novelty and usefulness without coherence usually break during execution. If a future model class gets better at balancing all three, we may start calling it inventive for reasons that are harder to dismiss.

## Why I care about this

I care because this question is not only philosophical. It changes how we build systems today. If invention depends on memory, structure, and constraints, then retrieval, decomposition, and data design are not side issues. They are part of the path toward more capable systems.

That is also why I keep thinking about knowledge graphs, retrieval layers, and modular inference systems. If we want models to become better at creating genuinely useful ideas, we probably need to help them hold cleaner state, interact with better memory, and reason across better-structured worlds.

## Where I would push next

I would look at systems that separate memory from inference more clearly, keep richer intermediate state, and let models operate over structured representations instead of only dense text. I would also look at whether invention needs explicit search over idea space rather than one-pass generation.

If that sounds like a mix of model design, retrieval systems, and systems engineering, that is because it probably is.
