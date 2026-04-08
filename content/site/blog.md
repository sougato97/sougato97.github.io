---
id: blog
title: Notes I am writing as I build, read, and explore.
intro: "My view is simple: artificial intelligence should make people happier and more effective."
back_link:
  label: Back to blog
  target_type: home-section
  target_value: blog
comments:
  kicker: Comments
  title: Join the conversation.
  provider: utterances
  repo: sougato97/sougato97.github.io
  label: blog-comment
cards:
  - state: In progress, Draft Published
    title: How Do We Think, and How Do We Invent?
    description: Let's explore whether creativity can be modeled without losing what makes it human, and whether that is the next frontier for AI models.
    href: blog/how-do-we-think-and-invent/
    link_label: Read article
    external: false
  - state: Published
    title: Portfolio-in-Markdown
    description: A simpler way to shape a portfolio or blog around your voice, your work, and your story, without writing much code.
    href: blog/portfolio-in-markdown/
    link_label: Read article
    external: false
  - state: Draft
    title: The Stakeholders of US Healthcare
    description: A draft map of the main stakeholders in the US healthcare system, how they relate to one another, and where incentives collide.
    href: blog/stakeholders-of-us-healthcare/
    link_label: Open draft
    external: false
  - state: In progress
    title: The Consumerism of Information
    description: It is 2026, and agent-based automation is changing how we consume information. But as information becomes easier to access and summarize, are we still thinking deeply for ourselves?
    link_label: Draft
  - state: In progress
    title: Using RAM and VRAM Together in Local Inference Stacks
    description: What I am learning about memory placement, model loading, and keeping the GPU focused on the core computation.
    link_label: Draft
---

## What this file controls

This file defines the homepage blog section, the article cards shown there, the back link used on article pages, and the shared comment settings for blog posts.

Useful fields in the YAML above:

- `title`: heading shown for the blog section on the homepage
- `intro`: short sentence below the heading
- `back_link`: where article pages should send the reader when they click "Back to blog"
- `comments`: shared comment-system settings for blog posts
- `cards[]`: list of blog cards shown on the homepage
- `cards[].href`: add this only when the article exists and should be clickable
