import {
  escapeHtml,
  loadMarkdownDocument,
  renderInlineMarkdown,
} from "/utils/site/markdown.js";

const SECTION_SOURCES = {
  hero: new URL("../../content/site/hero.md", import.meta.url).href,
  highlights: new URL("../../content/site/highlights.md", import.meta.url).href,
  blog: new URL("../../content/site/blog.md", import.meta.url).href,
  focus: new URL("../../content/site/current-focus.md", import.meta.url).href,
  work: new URL("../../content/site/open-source.md", import.meta.url).href,
  experience: new URL("../../content/site/experience.md", import.meta.url).href,
  archive: new URL("../../content/site/archive.md", import.meta.url).href,
  contact: new URL("../../content/site/contact.md", import.meta.url).href,
};

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function assetUrl(relativePath) {
  return new URL(relativePath, import.meta.url).href;
}

function updateHead(hero) {
  const name = hero.name || "Portfolio";
  const author = hero.meta_author || name;
  const title = hero.page_title || `${name} | Personal Website`;
  const description = hero.meta_description || hero.lede || "Personal portfolio website";

  document.title = title;

  const authorMeta = document.querySelector('meta[name="author"]');
  if (authorMeta) {
    authorMeta.setAttribute("content", author);
  }

  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute("content", description);
  }

  const brand = document.getElementById("site-brand");
  if (brand) {
    brand.textContent = name;
  }
}

function renderHero(metadata) {
  const facts = asArray(metadata.facts)
    .map(
      (fact) => `
        <li>
          <span class="fact-label">${escapeHtml(fact.label || "")}</span>
          <span class="fact-value">${escapeHtml(fact.value || "")}</span>
        </li>`
    )
    .join("");

  const actions = asArray(metadata.actions)
    .map((action) => {
      const classes = ["button", action.style === "secondary" ? "button-secondary" : null, "icon-button"]
        .filter(Boolean)
        .join(" ");
      const target = action.external ? ' target="_blank" rel="noreferrer"' : "";
      const href = escapeHtml(action.href || "#");
      const label = escapeHtml(action.label || "Link");
      const icon = escapeHtml(action.icon || "resume");
      return `<a class="${classes}" href="${href}"${target} aria-label="${label}" title="${label}"><img src="${assetUrl(`../../icons/${icon}.svg`)}" alt=""></a>`;
    })
    .join("");

  const panelTags = asArray(metadata.panel?.tags)
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("");

  const portrait = metadata.portrait || {};

  return `
    <div class="hero-copy">
      <p class="eyebrow">${escapeHtml(metadata.eyebrow || "")}</p>
      <h1>${escapeHtml(metadata.title || "")}</h1>
      <p class="lede">${escapeHtml(metadata.lede || "")}</p>
      <p class="hero-detail">${renderInlineMarkdown(metadata.detail || "")}</p>
      <div class="hero-actions">${actions}</div>
      <ul class="hero-facts">${facts}</ul>
    </div>

    <aside class="profile-panel">
      <img class="portrait" src="${escapeHtml(portrait.src || "images/sougato_dp_circle.png")}" alt="${escapeHtml(portrait.alt || "Portrait")}">
      <div class="profile-panel-body">
        <p class="panel-kicker">${escapeHtml(metadata.panel?.kicker || "")}</p>
        <h2>${escapeHtml(metadata.panel?.title || "")}</h2>
        <p>${escapeHtml(metadata.panel?.body || "")}</p>
        <div class="tag-row">${panelTags}</div>
      </div>
    </aside>`;
}

function renderHighlights(metadata) {
  return asArray(metadata.metrics)
    .map(
      (metric) => `
        <article class="metric-card">
          <span class="metric-value">${escapeHtml(metric.value || "")}</span>
          <span class="metric-label">${escapeHtml(metric.label || "")}</span>
        </article>`
    )
    .join("");
}

function renderBlog(metadata) {
  const intro = metadata.intro ? `<p>${escapeHtml(metadata.intro)}</p>` : "";
  const cards = asArray(metadata.cards)
    .map((card) => {
      const link = card.href
        ? `<a class="inline-link" href="${escapeHtml(card.href)}"${card.external ? ' target="_blank" rel="noreferrer"' : ""}>${escapeHtml(card.link_label || "Read more")}</a>`
        : `<span class="inline-link inline-link-muted">${escapeHtml(card.link_label || card.state || "Draft")}</span>`;

      return `
        <article class="repo-card">
          <p class="repo-kicker">${escapeHtml(card.state || "")}</p>
          <h3>${escapeHtml(card.title || "")}</h3>
          <p>${escapeHtml(card.description || "")}</p>
          ${link}
        </article>`;
    })
    .join("");

  return `
    <div class="section-heading">
      <p class="section-kicker">${escapeHtml(metadata.kicker || metadata.section || "")}</p>
      <h2>${escapeHtml(metadata.title || "")}</h2>
      ${intro}
    </div>
    <div class="repo-grid">${cards}</div>`;
}

function renderFocus(metadata) {
  const panels = asArray(metadata.panels)
    .map((panel) => {
      const bullets = asArray(panel.bullets).map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("");
      return `
        <article class="panel-card">
          <h3>${escapeHtml(panel.title || "")}</h3>
          <ul class="bullet-list">${bullets}</ul>
        </article>`;
    })
    .join("");

  return `
    <div class="section-heading">
      <p class="section-kicker">${escapeHtml(metadata.kicker || metadata.section || "")}</p>
      <h2>${escapeHtml(metadata.title || "")}</h2>
    </div>
    <div class="split-grid">${panels}</div>`;
}

function renderWork(metadata) {
  const intro = metadata.intro ? `<p>${escapeHtml(metadata.intro)}</p>` : "";
  const cards = asArray(metadata.cards)
    .map((card) => {
      const tags = asArray(card.tags).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
      let footer = "";
      if (card.href) {
        footer = `<a class="inline-link" href="${escapeHtml(card.href)}"${card.external ? ' target="_blank" rel="noreferrer"' : ""}>${escapeHtml(card.link_label || "View repository")}</a>`;
      } else if (card.note) {
        footer = `<span class="inline-link inline-link-muted">${escapeHtml(card.note)}</span>`;
      }

      return `
        <article class="repo-card">
          <p class="repo-kicker">${escapeHtml(card.kicker || "")}</p>
          <h3>${escapeHtml(card.title || "")}</h3>
          <p>${escapeHtml(card.description || "")}</p>
          <div class="tag-row">${tags}</div>
          ${footer}
        </article>`;
    })
    .join("");

  return `
    <div class="section-heading">
      <p class="section-kicker">${escapeHtml(metadata.kicker || metadata.section || "")}</p>
      <h2>${escapeHtml(metadata.title || "")}</h2>
      ${intro}
    </div>
    <div class="repo-grid">${cards}</div>`;
}

function renderExperience(metadata) {
  const intro = metadata.intro ? `<p>${escapeHtml(metadata.intro)}</p>` : "";
  const items = asArray(metadata.items)
    .map((item, index) => {
      const side = item.side || (index % 2 === 0 ? "right" : "left");
      const kind = item.kind || "work";
      return `
        <article class="timeline-item ${escapeHtml(side)} ${escapeHtml(kind)}">
          <div class="timeline-card">
            <p class="timeline-date">${escapeHtml(item.date || "")}</p>
            <h3>${escapeHtml(item.title || "")}</h3>
            <p class="timeline-role">${escapeHtml(item.role || "")}</p>
            <p>${escapeHtml(item.description || "")}</p>
          </div>
        </article>`;
    })
    .join("");

  return `
    <div class="section-heading">
      <p class="section-kicker">${escapeHtml(metadata.kicker || metadata.section || "")}</p>
      <h2>${escapeHtml(metadata.title || "")}</h2>
      ${intro}
    </div>
    <div class="timeline">${items}</div>`;
}

function renderArchive(metadata) {
  const intro = metadata.intro ? `<p>${escapeHtml(metadata.intro)}</p>` : "";
  const items = asArray(metadata.items)
    .map((item) => {
      const image = item.image
        ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || item.title || "Archive image")}">`
        : "";
      const links = asArray(item.links)
        .map(
          (link) => `<a href="${escapeHtml(link.href || "#")}"${link.external ? ' target="_blank" rel="noreferrer"' : ""}>${escapeHtml(link.label || "Link")}</a>`
        )
        .join("");
      const linksMarkup = links ? `<div class="inline-links">${links}</div>` : "";

      return `
        <article class="archive-card">
          ${image}
          <div class="archive-copy">
            <p class="year-badge">${escapeHtml(item.year || "")}</p>
            <h3>${escapeHtml(item.title || "")}</h3>
            <p>${escapeHtml(item.description || "")}</p>
            ${linksMarkup}
          </div>
        </article>`;
    })
    .join("");

  return `
    <div class="section-heading">
      <p class="section-kicker">${escapeHtml(metadata.kicker || metadata.section || "")}</p>
      <h2>${escapeHtml(metadata.title || "")}</h2>
      ${intro}
    </div>
    <div class="archive-grid">${items}</div>`;
}

function renderContact(metadata) {
  const body = metadata.body ? `<p>${escapeHtml(metadata.body)}</p>` : "";
  const links = asArray(metadata.links)
    .map((link) => {
      const external = link.external ? ' target="_blank" rel="noreferrer"' : "";
      return `<a href="${escapeHtml(link.href || "#")}"${external}>${escapeHtml(link.label || "Link")}</a>`;
    })
    .join("");

  return `
    <div>
      <p class="footer-kicker">${escapeHtml(metadata.kicker || metadata.section || "Contact")}</p>
      <h2>${escapeHtml(metadata.title || "")}</h2>
      ${body}
    </div>
    <div class="footer-links">${links}</div>`;
}

function mountSection(id, html) {
  const node = document.getElementById(id);
  if (node) {
    node.innerHTML = html;
  }
}

async function bootHomepage() {
  try {
    const [hero, highlights, blog, focus, work, experience, archive, contact] = await Promise.all(
      Object.values(SECTION_SOURCES).map((source) => loadMarkdownDocument(source))
    );

    updateHead(hero.metadata);
    mountSection("hero-content", renderHero(hero.metadata));
    mountSection("highlights-content", renderHighlights(highlights.metadata));
    mountSection("blog-content", renderBlog(blog.metadata));
    mountSection("focus-content", renderFocus(focus.metadata));
    mountSection("work-content", renderWork(work.metadata));
    mountSection("experience-content", renderExperience(experience.metadata));
    mountSection("archive-content", renderArchive(archive.metadata));
    mountSection("contact-content", renderContact(contact.metadata));
  } catch (error) {
    console.error(error);
    const fallback = `<div class="section-heading"><h2>Unable to load site content.</h2><p>Check the Markdown files under <code>content/site/</code> and the browser console.</p></div>`;
    [
      "hero-content",
      "highlights-content",
      "blog-content",
      "focus-content",
      "work-content",
      "experience-content",
      "archive-content",
      "contact-content",
    ].forEach((id) => mountSection(id, fallback));
  }
}

bootHomepage();
