# Personal Portfolio Starter

This repository is a static GitHub Pages starter for a personal website with a Markdown-first content model.

You do not need to understand JavaScript, HTML, or CSS to use the content workflow. If you follow the Markdown formats in this repo and the notes in this README, you can update the homepage and blog content without touching the rendering code.

If you are only updating site content, stay inside `content/site/` and `blog/<slug>/article.md`. The `black_box/` folder contains implementation details and is not where routine content edits should happen.

Executing any of the `python` files is not necessary; but complementary for automation and debugging.  

## What It Is

- A single-page landing site for a personal profile
- A blog/articles system powered by Markdown
- A static, GitHub Pages-friendly setup with no server-side runtime

## How To Make Your Version

If you fork this repo, you are making your own copy of the site. The GitHub Pages URL and the homepage base path need to match the type of site you are publishing.

- For a user site, keep the repository name as `username.github.io`
- For a project site, the URL usually looks like `username.github.io/repo`
- The homepage base path in `content/site/config.md` must match that setup so homepage and blog links resolve correctly
- If the base path is wrong, navigation links will point to the wrong place even if the content files are correct

Keep `content/site/config.md` as the shared place for that base-path setting instead of repeating it in individual section files.

## Navigation Paths

The browser runtime assumes a homepage root path and uses it to build links back to the main page. That is why `site.homepage_root` belongs in `content/site/config.md`.

If you fork the repo:

- Preferred method: keep the same user-site structure if you want `username.github.io`
  Example: repository name `sougato97.github.io` -> site URL `https://sougato97.github.io`
- keep the project-site structure if you want `username.github.io/repo`
  Example: repository name `portfolio` under user `sougato97` -> site URL `https://sougato97.github.io/portfolio`
- make sure `site.homepage_root` matches that URL shape

Examples:

- user site:
  - URL: `https://sougato97.github.io`
  - repository name: `sougato97.github.io`
  - config:
    ```md
    site:
      homepage_root: /
    ```
- project site:
  - URL: `https://sougato97.github.io/portfolio`
  - repository name: `portfolio`
  - config:
    ```md
    site:
      homepage_root: /portfolio/
    ```


## Markdown-First Model

This is the section most people need.

To customize the site, you usually only edit the Markdown files under `content/site/` and the article Markdown files under `blog/<slug>/article.md`, then push your changes.

The homepage content is loaded from Markdown files under `content/site/`, and the blog content is loaded from `blog/<slug>/article.md`.

Suggested section files:

- `content/site/config.md`
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
---

Write the section body in Markdown.
```

In this repo, the text below the YAML frontmatter is editor-facing guidance. The current homepage runtime reads the YAML metadata from these files and ignores the explanatory notes below it.

Recommended frontmatter keys for section files:

- `id`: stable machine-readable identifier

Shared section metadata now lives in `content/site/config.md`, including:

- `section`
- `order`
- `kind`
- `kicker`
- `site.homepage_root`

The landing page reads the section files in the browser through `/black_box/utils/site/page.js`. Most files in `/black_box/`, along with the root `index.html`, are part of the site structure and rendering logic. Most users only need to edit the Markdown files.

## Repo Layout

- `index.html`: main landing page shell. You don't need any modification.
- `black_box/stylesheet.css`: shared visual styling. 
- `blog/`: article pages, each with a thin `index.html` shell and a sibling `article.md`
- `black_box/templates/blog-index.html`: shared shell template for blog post pages
- `black_box/utils/blog/`: shared blog runtime for Markdown parsing, layout rendering, and comments
- `black_box/utils/site/`: shared homepage runtime for loading section Markdown and rendering the landing page
- `content/site/`: Markdown source files for the homepage sections
- `example/`: reference Markdown files for future content
- `black_box/scripts/ensure_blog_shells.py`: creates missing blog `index.html` shells from the shared template
- `images/`: site images
- `data/`: PDFs and other static assets

GitHub requires workflow files to stay under `.github/workflows/`, so that folder remains outside `black_box/`.

## Blog Model

Blog posts live under `blog/<slug>/`.

Each post contains:

- `blog/<slug>/article.md`: article source of truth
- `blog/<slug>/index.html`: thin shell page, created from the shared template if it is missing

For a new post, create `blog/<slug>/article.md`. The shared shell comes from
`black_box/templates/blog-index.html`, and the deployment pipeline will create
`blog/<slug>/index.html` automatically if it is missing. If you want the same
behavior locally before a push, run:

```bash
python3 black_box/scripts/ensure_blog_shells.py
```

The article markdown supports:

- YAML frontmatter
- headings, lists, code blocks, and normal Markdown
- LaTeX display math through MathJax
- GitHub-based comments on blog articles through Utterances

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
- personal links in `content/site/hero.md`, `content/site/contact.md`, and `content/site/blog.md`

The intent is that the content lives in Markdown while the HTML shell stays small and reusable.

## Deployment

This repo is intended for GitHub Pages deployment through the workflow in
`.github/workflows/deploy-pages.yml`.

That workflow:

- ensures missing blog shells are created from `black_box/templates/blog-index.html`
- uploads the generated site as the Pages artifact
- deploys the site through GitHub Actions

## GitHub Actions Setup

Use this when you want the repo to be plug-and-play for GitHub Pages deployment.

1. Fork or create the repository on GitHub.
2. Push the repo contents, including `.github/workflows/deploy-pages.yml`.
3. In GitHub, open `Settings` -> `Pages`.
4. Under `Build and deployment`, set `Source` to `GitHub Actions`.
5. Make sure the default branch is the one listed in the workflow trigger:
   - `main`
   - or `master`
6. Push changes to that branch.
7. GitHub Actions will run the Pages workflow automatically.
8. After the workflow succeeds, GitHub Pages will publish the site.

What the workflow does on each deployment:

- checks out the repository
- runs `python3 black_box/scripts/ensure_blog_shells.py`
- creates any missing `blog/<slug>/index.html` files from `black_box/templates/blog-index.html`
- uploads the repository as the Pages artifact
- deploys that artifact to GitHub Pages

What you need to edit for a normal content update:

- `content/site/*.md` for homepage content
- `blog/<slug>/article.md` for article content

What you usually do not need to edit:

- `black_box/`
- `.github/workflows/deploy-pages.yml`

If deployment does not work, check these first:

1. GitHub Pages source is set to `GitHub Actions`
2. the workflow is running on the branch you are pushing to
3. `.nojekyll` is present so raw Markdown files are served correctly
4. `content/site/config.md` has the correct `site.homepage_root` for your site type

## Template Note

For reference, look at `https://github.com/sougato97/sougato97.github.io`.
