---
site:
  # Keep this correct: homepage and blog links resolve from here.
  homepage_root: /
sections:
  - id: hero
    file: hero.md
    target: hero-content
    section: Hero
    order: 0
    kind: hero
    fallback_title: Unable to load profile.
  - id: highlights
    file: highlights.md
    target: highlights-content
    section: Highlights
    order: 5
    kind: metrics
    fallback_title: Unable to load highlights.
  - id: blog
    file: blog.md
    target: blog-content
    section: Blog
    order: 10
    kind: cards
    kicker: Blog
    fallback_title: Unable to load blog notes.
  - id: focus
    file: current-focus.md
    target: focus-content
    section: Current Focus
    order: 20
    kind: panels
    kicker: Current Focus
    fallback_title: Unable to load current focus.
  - id: work
    file: open-source.md
    target: work-content
    section: Selected Systems & Open Source
    order: 30
    kind: cards
    kicker: Selected Systems & Open Source
    fallback_title: Unable to load open-source work.
  - id: experience
    file: experience.md
    target: experience-content
    section: Education & Experience
    order: 40
    kind: timeline
    kicker: Education & Experience
    fallback_title: Unable to load experience.
  - id: archive
    file: archive.md
    target: archive-content
    section: Research & Earlier Work
    order: 50
    kind: cards
    kicker: Research & Earlier Work
    fallback_title: Unable to load archive.
  - id: contact
    file: contact.md
    target: contact-content
    section: Contact
    order: 60
    kind: prose
    kicker: Contact
    fallback_title: Unable to load contact information.
nav:
  homepage:
    - label: Experience
      target_type: page-anchor
      target_value: experience
    - label: Focus
      target_type: page-anchor
      target_value: focus
    - label: Blog
      target_type: page-anchor
      target_value: blog
    - label: Open Source
      target_type: page-anchor
      target_value: work
    - label: Archive
      target_type: page-anchor
      target_value: archive
    - label: Contact
      target_type: page-anchor
      target_value: contact
    - label: Make It Yours
      target_type: url
      target_value: blog/portfolio-in-markdown/
      style: cta
  article:
    - label: Contact
      target_type: page-anchor
      target_value: contact
    - label: Make It Yours
      target_type: url
      target_value: blog/portfolio-in-markdown/
      style: cta
---

## What this file controls

This is the shared site configuration file.
It defines the homepage root path, section order, section labels, render targets, and navigation items.

Useful fields in the YAML above:

- `site.homepage_root`: base path used when links need to point back to the homepage
- `sections[]`: ordered list of homepage sections
- `sections[].file`: which Markdown file provides the content
- `sections[].target`: DOM target in `index.html`
- `sections[].order`: display order on the homepage
- `nav.homepage[]`: top-nav items on the homepage
- `nav.article[]`: top-nav items on blog article pages

Change this file when you want to reorder sections or change shared nav behavior.
