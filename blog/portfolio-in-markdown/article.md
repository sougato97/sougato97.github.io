---
title: Portfolio-in-Markdown
description: A simpler way to shape a portfolio or blog around your voice, your work, and your story, without writing much code.
date: 2026-03-27
tags: portfolio, personal publishing, blogging
slug: portfolio-in-markdown
kicker: Open Source
---

## Abstract

This project is about giving more people room to shape a portfolio or blog
around their own voice, their work, and their story, so they can move from an
idea to a personal page with less friction and without writing much code.

## What I want it to enable

I want it to be easy for someone to say, "This is me, this is my work, and
this is what I care about" without needing a big production just to get
started.

That is the real value here: not more complexity, but more confidence.

## Why I care about this

I studied computer science, and software engineering is only one part of it.
Software itself is a tool. It gives us the infrastructure to build other
things.

A lot of that infrastructure will keep getting easier to use, and parts of it
will increasingly be automated by language models. That creates more room for
people to spend their time on fields like biochemistry, physics, and AI
architecture, and, just as importantly, more time with family.

## Using this project

You do not need to understand the whole codebase to use this project. Most
people will only edit the Markdown files and then publish their version.

### Step 1: Make your own copy on GitHub

Start by opening the main repository:
[github.com/sougato97/sougato97.github.io](https://github.com/sougato97/sougato97.github.io)

Then:

1. Click `Fork`.
2. Choose your own GitHub account as the destination.
3. Decide how you want your site URL to look.

The easiest option is a **user site**:

- repository name: `your-username.github.io`
- site URL: `https://your-username.github.io`

Example:

- repository: `janedoe/janedoe.github.io`
- site URL: `https://janedoe.github.io`

You can also use a **project site** if you prefer to keep another repository
name:

- repository name: `portfolio`
- site URL: `https://your-username.github.io/portfolio`

Example:

- repository: `janedoe/portfolio`
- site URL: `https://janedoe.github.io/portfolio`

If you choose the project-site version, update `content/site/config.md` so
`site.homepage_root` matches the repository path.

Example:

```md
site:
  homepage_root: /portfolio/
```

### Step 2: Open it in GitHub Codespaces

Once the fork is created, open your copy of the repository on GitHub.

Then:

1. Click the green `Code` button.
2. Open the `Codespaces` tab.
3. Click `Create codespace on main/master`.

GitHub will open a browser-based workspace for you. That workspace lets you edit
files, preview the site, and push changes without setting up anything on your
local machine.

### Step 3: Customize the content

Most people only need to change the Markdown files.

Here, `Markdown` simply means a plain text writing format. It lets you write
headings, paragraphs, links, and lists without working directly in full HTML.

The main homepage content lives in:

- `content/site/hero.md`
- `content/site/highlights.md`
- `content/site/current-focus.md`
- `content/site/experience.md`
- `content/site/open-source.md`
- `content/site/archive.md`
- `content/site/contact.md`
- `content/site/blog.md`

Blog articles live inside the `blog/` folder. Each article has its own folder,
and the main content is written in `article.md`.

If a Markdown file opens in preview mode first, switch to the editor view instead.
In Codespaces, a single click may open the preview, while a double click usually
opens the file in the editor, where you can see and edit the YAML block at the top.

Good places to start:

- update your name, title, and intro in `content/site/hero.md`
- replace work history in `content/site/experience.md`
- replace project cards in `content/site/open-source.md`
- replace contact links in `content/site/contact.md`

You usually do **not** need to change the files inside `black_box/` unless you
want to change the site engine itself.

### Step 4: Preview your version

Inside Codespaces, open the terminal and run:

```bash
python3 -m http.server 8000
```

If `terminal` is an unfamiliar word here, it simply means the text-based panel
where you can run a command. In Codespaces, you can usually open it from the
top menu under `Terminal`, then choose `New Terminal`.

Then open the forwarded port in the browser. This gives you a live preview of
your site while you edit the Markdown files.

Here, a `forwarded port` simply means the private web link that Codespaces
creates for the preview running inside your browser workspace. After you run
the command, Codespaces usually detects port `8000` and offers an `Open in
Browser` button or a `Ports` tab where you can open that preview link.

### Step 5: Publish your site

If this is your first time deploying the fork, do this once on GitHub:

1. Open your repository `Settings`.
2. Open `Pages`.
3. Under build and deployment, choose `GitHub Actions`.

After that, publishing becomes simple:

1. Save your changes in Codespaces.
2. Open the `Source Control` tab.
3. Write a short commit message.
4. Commit the changes.
5. Click `Sync Changes` or push them.

If those words are new to you, here is the simple version:

- the `Source Control` tab is the place where Codespaces shows all the files
  you changed
- a `commit` is a saved checkpoint of your work, along with a short note
  explaining what changed
- when you click `push`, Codespaces sends those saved commits from your
  browser workspace back to your GitHub repository
- once the commit reaches GitHub, the deployment workflow starts and publishes
  the updated site

In short: edit your files, commit your changes, push them to GitHub, and the
site will redeploy automatically.

### Step 6: Add your own blog posts

When you want to publish a new article:

1. Create a new folder under `blog/`.
2. Add an `article.md` file inside it.
3. Add a matching card in `content/site/blog.md`.
4. Push your changes.

The deployment flow will generate the blog page shell if it is missing.

## Contributors are always welcome

This project started as something personal. As it grew, I needed a cleaner
separation between content and the site engine. That is what pushed it toward a
Markdown-first structure that other people could reuse for their own version.
If you want to improve the project itself, you are welcome. If you run
into bugs or rough edges, feedback in the comments is useful too.
