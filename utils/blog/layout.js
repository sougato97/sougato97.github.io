function initialsFromName(name = "") {
  const parts = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);
  return parts.length ? parts.map((part) => part[0].toUpperCase()).join("") : "SB";
}

function buildFaviconDataUri(name = "") {
  const initials = initialsFromName(name);
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23141f2d'/%3E%3Ctext x='50' y='62' font-size='48' text-anchor='middle' fill='%23f7f3ea' font-family='Arial, sans-serif'%3E${encodeURIComponent(initials)}%3C/text%3E%3C/svg%3E`;
}

function resolveHref(href = "", siteRoot = "/") {
  if (!href) {
    return "#";
  }
  if (/^[a-z]+:/i.test(href) || href.startsWith("/")) {
    return href;
  }
  return new URL(href, siteRoot).href;
}

export function syncSharedHead({ site, title, description }) {
  const siteTitle = site.titleSuffix || site.brand || site.author || "Portfolio";
  const author = site.author || site.brand || "";
  const metaDescription = description || site.description || "Blog article";

  if (title) {
    document.title = `${title} | ${siteTitle}`;
  }

  ensureMetaTag("description", metaDescription);
  ensureMetaTag("author", author);

  ensureHeadLinks([
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap",
    },
    {
      rel: "icon",
      href: buildFaviconDataUri(author || siteTitle),
    },
  ]);
}

function ensureMetaTag(name, content) {
  let element = document.head.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }

  if (content) {
    element.setAttribute("content", content);
  }
}

function ensureHeadLinks(links) {
  for (const link of links) {
    const selector = buildLinkSelector(link);
    if (document.head.querySelector(selector)) {
      continue;
    }

    const element = document.createElement("link");
    element.rel = link.rel;
    element.href = link.href;
    if (link.crossorigin) {
      element.crossOrigin = link.crossorigin;
    }
    document.head.appendChild(element);
  }
}

function buildLinkSelector(link) {
  const href = CSS.escape(link.href);
  return link.crossorigin
    ? `link[rel="${link.rel}"][href="${href}"][crossorigin]`
    : `link[rel="${link.rel}"][href="${href}"]`;
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean);
  }
  if (!tags) {
    return [];
  }
  return String(tags)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderBlogPage({ metadata, html, site, blog, contact, siteRoot }) {
  const title = escapeHtml(metadata.title || "Untitled Article");
  const kicker = escapeHtml(metadata.kicker || "Article");
  const description = escapeHtml(metadata.description || "");
  const date = escapeHtml(metadata.displayDate || "");
  const tags = normalizeTags(metadata.tags);
  const tagsMarkup = tags.length ? escapeHtml(tags.join(", ")) : "";
  const mathMarkup = metadata.math ? '<span id="article-math">Supports LaTeX equations</span>' : '<span id="article-math" hidden>Supports LaTeX equations</span>';
  const tagsNode = tags.length
    ? `<span id="article-tags">${tagsMarkup}</span>`
    : '<span id="article-tags" hidden></span>';
  const brand = escapeHtml(site.brand || "Portfolio");
  const navLinks = Array.isArray(blog.article_nav) ? blog.article_nav : [];
  const navMarkup = navLinks
    .map((link) => `<a href="${escapeHtml(resolveHref(link.href, siteRoot))}">${escapeHtml(link.label || "Link")}</a>`)
    .join("");
  const backLink = blog.back_link || {};
  const comments = blog.comments || {};
  const commentTitle = escapeHtml(comments.title || "Comments");
  const commentKicker = escapeHtml(comments.kicker || "Comments");
  const commentBody = escapeHtml(comments.body || "");
  const commentNote = escapeHtml(comments.note || "");
  const commentAppHref = escapeHtml(comments.app_href || "https://github.com/apps/utterances");
  const commentAppLabel = escapeHtml(comments.app_label || "Open the Utterances GitHub app");
  const footerKicker = escapeHtml(contact.kicker || "Contact");
  const footerTitle = escapeHtml(contact.title || "");
  const footerBody = escapeHtml(contact.body || "");
  const footerLinks = Array.isArray(contact.links) ? contact.links : [];
  const footerLinksMarkup = footerLinks
    .map((link) => {
      const target = link.external ? ' target="_blank" rel="noreferrer"' : "";
      return `<a href="${escapeHtml(resolveHref(link.href, siteRoot))}"${target}>${escapeHtml(link.label || "Link")}</a>`;
    })
    .join("");

  return `
    <div class="page-frame">
      <header class="hero hero-article" id="top">
        <nav class="topbar" aria-label="Article navigation">
          <a class="brand" href="${escapeHtml(resolveHref("#top", siteRoot))}">${brand}</a>
          <div class="nav-links">
            ${navMarkup}
            <button class="theme-toggle" type="button" aria-label="Toggle color theme" aria-pressed="false">
              <span class="theme-toggle-icon" aria-hidden="true">☾</span>
            </button>
          </div>
        </nav>

        <section class="article-header">
          <a class="back-link" href="${escapeHtml(resolveHref(backLink.href || "#blog", siteRoot))}">${escapeHtml(backLink.label || "Back")}</a>
          <p class="eyebrow" id="article-kicker">${kicker}</p>
          <h1 id="article-title">${title}</h1>
          <p class="lede article-lede" id="article-lede">${description}</p>
          <div class="article-meta" aria-label="Article metadata">
            <span id="article-date">${date}</span>
            ${tagsNode}
            ${mathMarkup}
          </div>
        </section>
      </header>

      <main>
        <section class="section article-shell">
          <article class="article-card" id="article-content">
${html}
          </article>
        </section>

        <section class="section" id="comments">
          <div class="section-heading">
            <p class="section-kicker">${commentKicker}</p>
            <h2>${commentTitle}</h2>
            <p>${commentBody}</p>
          </div>

          <div class="article-card comments-card">
            <p class="comment-note">${commentNote}</p>
            <p class="comment-note"><a href="${commentAppHref}" target="_blank" rel="noreferrer">${commentAppLabel}</a></p>
            <div class="comments-host" id="comments-host"></div>
          </div>
        </section>
      </main>

      <footer class="footer" id="contact">
        <div>
          <p class="footer-kicker">${footerKicker}</p>
          <h2>${footerTitle}</h2>
          <p>${footerBody}</p>
        </div>
        <div class="footer-links">
          ${footerLinksMarkup}
        </div>
      </footer>
    </div>
  `;
}
