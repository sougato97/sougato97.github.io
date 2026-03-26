# Personal Portfolio Starter

This repository is a static GitHub Pages starter for a personal website with a Markdown-first content model.

You do not need to understand JavaScript, HTML, or CSS to use the content workflow. If you follow the Markdown formats in this repo and the notes in this README, you can update the homepage and blog content without touching the rendering code.

## What It Is

- A single-page landing site for a personal profile
- A blog/articles system powered by Markdown
- A static, GitHub Pages-friendly setup with no server-side runtime

## Repo Layout

- `index.html`: main landing page shell
- `stylesheet.css`: shared visual styling
- `blog/`: article pages, each with a thin `index.html` shell and a sibling `article.md`
- `utils/blog/`: shared blog runtime for Markdown parsing, layout rendering, and comments
- `utils/site/`: shared homepage runtime for loading section Markdown and rendering the landing page
- `content/site/`: Markdown source files for the homepage sections
- `example/`: reference Markdown files for future content
- `images/`: site images
- `data/`: PDFs and other static assets

## Markdown-First Model

The homepage content is loaded from Markdown files under `content/site/`.

Suggested section files:

- `content/site/hero.md`
- `content/site/highlights.md`
- `content/site/blog.md`
- `content/site/current-focus.md`
- `content/site/experience.md`
- `content/site/open-source.md`
- `content/site/archive.md`
- `content/site/contact.md`
- `content/site/about.md` for an optional future section

Each section file uses simple frontmatter and plain Markdown:

```md
---
id: about
section: About
order: 10
kind: prose
---

Write the section body in Markdown.
```

Recommended frontmatter keys:

- `id`: stable machine-readable identifier
- `section`: human-readable title
- `order`: intended display order
- `kind`: optional hint such as `hero`, `prose`, `cards`, or `timeline`

The current landing page reads the active section files in the browser through `utils/site/page.js`.

## Blog Model

Blog posts live under `blog/<slug>/`.

Each post contains:

- `blog/<slug>/index.html`: thin shell page
- `blog/<slug>/article.md`: article source of truth

For a new post, copy the thin shell from:

- `https://github.com/sougato97/sougato97.github.io/blob/master/blog/how-do-we-think-and-invent/index.html`

into `blog/<slug>/index.html`, then add the post content in `blog/<slug>/article.md`.

The article markdown supports:

- YAML frontmatter
- headings, lists, code blocks, and normal Markdown
- LaTeX display math through MathJax
- GitHub-based user comments on blog articles through Utterances

Use `example/sample_blog_article.md` as a reference format for future posts.

## Local Preview

Serve the repository from the root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Adapting The Site

If you fork this repo, the main things you usually change are:

- section Markdown files in `content/site/`
- article Markdown files in `blog/<slug>/article.md`
- personal links in `content/site/hero.md`, `content/site/contact.md`, and the shared blog runtime

The intent is that the content lives in Markdown while the HTML shell stays small and reusable.

## Deployment

This repo is intended for GitHub Pages deployment from the repository root.

## Template Note

For reference, look at `https://github.com/sougato97/sougato97.github.io`.
