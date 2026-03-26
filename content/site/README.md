# Site Content Model

This folder is the Markdown source of truth for the main site sections.

## How It Works

- Each major homepage section lives in its own Markdown file.
- `index.html` stays as the shared shell.
- `utils/site/page.js` reads these files, parses the frontmatter, and renders the homepage in the browser.

## Suggested Files

- `hero.md`: opening headline, lede, and quick facts
- `hero.md`: also a good place for shared page metadata such as author, title, and description
- `highlights.md`: metric strip values
- `blog.md`: blog section heading and cards
- `current-focus.md`: what you are working on now
- `experience.md`: work timeline or career highlights
- `open-source.md`: selected systems and projects
- `archive.md`: earlier work, publications, or older projects
- `contact.md`: contact details and closing note
- `about.md`: optional extra section if you want to add one later

## Frontmatter

Use simple YAML frontmatter like this:

```md
---
id: about
section: About
order: 10
kind: prose
---
```

Recommended keys:

- `id`: stable section identifier
- `section`: human-readable section title
- `order`: display order for a future renderer
- `kind`: optional content type such as `hero`, `prose`, `cards`, or `timeline`

Homepage metadata keys commonly used in `hero.md`:

- `meta_author`: sets `<meta name="author">`
- `page_title`: sets `<title>`
- `meta_description`: sets `<meta name="description">`

## Writing Style

- Keep the Markdown plain and portable.
- Prefer YAML frontmatter for structured cards, timeline items, tags, and links.
- Avoid HTML unless a section truly needs it.
- Put data in the section file instead of hardcoding it in the page shell.
