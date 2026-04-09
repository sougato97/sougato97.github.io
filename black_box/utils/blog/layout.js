function initialsFromName(name = "") {
  const parts = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);
  return parts.length ? parts.map((part) => part[0].toUpperCase()).join("") : "PF";
}

function buildFaviconDataUri(name = "") {
  const initials = initialsFromName(name);
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23141f2d'/%3E%3Ctext x='50' y='62' font-size='48' text-anchor='middle' fill='%23f7f3ea' font-family='Arial, sans-serif'%3E${encodeURIComponent(initials)}%3C/text%3E%3C/svg%3E`;
}

function normalizeHomepageRoot(homepageRoot = "/") {
  const value = String(homepageRoot || "/").trim() || "/";
  if (/^[a-z]+:/i.test(value)) {
    return value.endsWith("/") ? value : `${value}/`;
  }
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

function resolveHref(href = "", homepageRoot = "/") {
  if (!href) return "#";
  if (/^[a-z]+:/i.test(href) || href.startsWith("/") || href.startsWith("#")) {
    return href;
  }

  const base = normalizeHomepageRoot(homepageRoot);
  const absoluteBase = /^[a-z]+:/i.test(base)
    ? base
    : new URL(base, window.location.origin).href;

  return new URL(href, absoluteBase).href;
}

function resolveTarget(item = {}, homepageRoot = "/") {
  const targetType = item.target_type || "url";
  const targetValue = item.target_value || "";

  if (targetType === "page-anchor") {
    return `#${targetValue}`;
  }

  if (targetType === "home-section") {
    return `${normalizeHomepageRoot(homepageRoot)}#${targetValue}`;
  }

  return resolveHref(targetValue || item.href || "#", homepageRoot);
}

function renderNavLink(link, homepageRoot = "/") {
  const classes = ["nav-link", link.variant === "cta" || link.style === "cta" || link.cta ? "nav-link-cta" : null]
    .filter(Boolean)
    .join(" ");
  return `<a class="${classes}" href="${escapeHtml(resolveTarget(link, homepageRoot))}">${escapeHtml(link.label || "Link")}</a>`;
}

function isCtaNavItem(link = {}) {
  return Boolean(link.variant === "cta" || link.style === "cta" || link.cta);
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

function renderTagChips(tags) {
  return normalizeTags(tags)
    .map((tag) => `<span class="article-tag">${escapeHtml(tag)}</span>`)
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderBlogPage({ metadata, html, site, blog, contact, navItems }) {
  const title = escapeHtml(metadata.title || "Untitled Article");
  const kicker = escapeHtml(metadata.kicker || "Article");
  const description = escapeHtml(metadata.description || "");
  const date = escapeHtml(metadata.displayDate || "");
  const tagsMarkup = renderTagChips(metadata.tags);
  const tagsNode = tagsMarkup
    ? `<div class="article-tags" id="article-tags">${tagsMarkup}</div>`
    : '<div class="article-tags" id="article-tags" hidden></div>';
  const brand = escapeHtml(site.brand || "Portfolio");
  const navMarkup = (Array.isArray(navItems) ? navItems : [])
    .filter((link) => !isCtaNavItem(link))
    .map((link) => renderNavLink(link, site.homepageRoot || "/"))
    .join("");
  const navCtaMarkup = (Array.isArray(navItems) ? navItems : [])
    .filter((link) => isCtaNavItem(link))
    .map((link) => renderNavLink(link, site.homepageRoot || "/"))
    .join("");
  const backLink = blog.back_link || {};
  const comments = blog.comments || {};
  const commentTitle = escapeHtml(comments.title || "Comments");
  const commentKicker = escapeHtml(comments.kicker || "Comments");
  const commentBody = escapeHtml(comments.body || "");
  const commentBodyMarkup = commentBody ? `<p>${commentBody}</p>` : "";
  const commentNote = escapeHtml(comments.note || "");
  const commentNoteMarkup = commentNote ? `<p class="comment-note">${commentNote}</p>` : "";
  const footerKicker = escapeHtml(contact.kicker || "Contact");
  const footerTitle = escapeHtml(contact.title || "");
  const footerBody = escapeHtml(contact.body || "");
  const footerLinks = Array.isArray(contact.links) ? contact.links : [];
  const footerLinksMarkup = footerLinks
    .map((link) => {
      const target = link.external ? ' target="_blank" rel="noreferrer"' : "";
      return `<a href="${escapeHtml(resolveHref(link.href, site.homepageRoot || "/"))}"${target}>${escapeHtml(link.label || "Link")}</a>`;
    })
    .join("");

  return `
    <div class="page-frame">
      <header class="hero hero-article" id="top">
        <nav class="topbar" aria-label="Article navigation">
          <a class="brand" href="${escapeHtml(site.homepageRoot || "/")}">${brand}</a>
          <div class="nav-links">
            <div class="nav-link-list" id="article-nav-links">${navMarkup}</div>
            <div class="nav-cta-slot" id="article-nav-cta">${navCtaMarkup}</div>
          </div>
          <button class="nav-menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="article-nav-links">
            <span class="nav-menu-toggle-bars" aria-hidden="true"></span>
          </button>
          <button class="theme-toggle" type="button" aria-label="Toggle color theme" aria-pressed="false">
            <span class="theme-toggle-icon" aria-hidden="true">☾</span>
          </button>
        </nav>

        <section class="article-header">
          <a class="back-link" href="${escapeHtml(resolveTarget(backLink, site.homepageRoot || "/"))}">${escapeHtml(backLink.label || "Back")}</a>
          <p class="eyebrow" id="article-kicker">${kicker}</p>
          <h1 id="article-title">${title}</h1>
          <p class="lede article-lede" id="article-lede">${description}</p>
          <div class="article-meta" aria-label="Article metadata">
            <span id="article-date">${date}</span>
            ${tagsNode}
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
            ${commentBodyMarkup}
          </div>

          <div class="article-card comments-card">
            ${commentNoteMarkup}
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
