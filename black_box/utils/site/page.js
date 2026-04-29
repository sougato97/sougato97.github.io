import {
  escapeHtml,
  loadMarkdownDocument,
  renderInlineMarkdown,
} from "/black_box/utils/site/markdown.js";

const CONFIG_SOURCE = new URL("../../../content/site/config.md", import.meta.url).href;

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function assetUrl(relativePath) {
  return new URL(relativePath, import.meta.url).href;
}

function resolveOptionalHref(href = "") {
  if (!href) {
    return "";
  }
  if (/^[a-z]+:/i.test(href) || href.startsWith("/") || href.startsWith("#")) {
    return href;
  }
  return new URL(href, import.meta.url).href;
}

function resolveHomeRoot(homepageRoot = "/") {
  return new URL(homepageRoot, import.meta.url).href;
}

function resolveNavHref(item = {}, homepageRoot = "/") {
  const targetType = item.target_type || "url";
  const targetValue = item.target_value || "";

  if (targetType === "page-anchor") {
    return `#${targetValue}`;
  }

  if (targetType === "home-section") {
    return `${resolveHomeRoot(homepageRoot)}#${targetValue}`;
  }

  if (targetType === "url") {
    const href = targetValue || item.href || "#";
    if (/^[a-z]+:/i.test(href) || href.startsWith("/") || href.startsWith("#")) {
      return href;
    }
    return new URL(href, resolveHomeRoot(homepageRoot)).href;
  }

  return item.href || "#";
}

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

function setMetaContent(selector, attribute, content) {
  const node = document.querySelector(selector);
  if (node && content) {
    node.setAttribute(attribute, content);
  }
}

function updateHead(hero) {
  const name = hero.name || "Portfolio";
  const author = hero.meta_author || name;
  const title = hero.page_title || `${name} | Personal Website`;
  const description = hero.meta_description || hero.lede || "Personal portfolio website";

  document.title = title;
  setMetaContent('meta[name="author"]', "content", author);
  setMetaContent('meta[name="description"]', "content", description);
  setMetaContent('meta[property="og:title"]', "content", title);
  setMetaContent('meta[property="og:description"]', "content", description);
  setMetaContent('meta[property="og:site_name"]', "content", hero.site_name || name);
  setMetaContent('meta[name="twitter:title"]', "content", title);
  setMetaContent('meta[name="twitter:description"]', "content", description);
  setMetaContent('link[rel="icon"]', "href", buildFaviconDataUri(author || name));

  const brand = document.getElementById("site-brand");
  if (brand) {
    brand.textContent = name;
  }
}

function renderNav(items, homepageRoot) {
  return asArray(items)
    .map((item) => {
      const classes = ["nav-link", item.variant === "cta" || item.style === "cta" || item.cta ? "nav-link-cta" : null]
        .filter(Boolean)
        .join(" ");
      return `<a class="${classes}" href="${escapeHtml(resolveNavHref(item, homepageRoot))}">${escapeHtml(item.label || "Link")}</a>`;
    })
    .join("");
}

function isCtaNavItem(item = {}) {
  return Boolean(item.variant === "cta" || item.style === "cta" || item.cta);
}

function applyThemeToggleState(toggle) {
  const icon = toggle.querySelector(".theme-toggle-icon");
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
  toggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
  toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  if (icon) {
    icon.textContent = isDark ? "☀" : "☾";
  }
}

function setupThemeToggle() {
  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) {
    return;
  }

  applyThemeToggleState(toggle);

  toggle.addEventListener("click", () => {
    const root = document.documentElement;
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch (error) {
      // Ignore storage failures and keep the visual toggle working.
    }
    applyThemeToggleState(toggle);
  });
}

function setupMobileNav() {
  const topbar = document.querySelector(".topbar");
  const toggle = document.querySelector(".nav-menu-toggle");
  const navList = document.querySelector(".nav-link-list");
  if (!topbar || !toggle || !navList) {
    return;
  }

  const closeMenu = () => {
    topbar.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  };

  const openMenu = () => {
    topbar.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");
  };

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (topbar.classList.contains("menu-open")) {
      closeMenu();
      return;
    }
    openMenu();
  });

  document.addEventListener("click", (event) => {
    if (!topbar.contains(event.target)) {
      closeMenu();
    }
  });

  navList.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      closeMenu();
    }
  });

  closeMenu();
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
      return `<a class="${classes}" href="${href}"${target} aria-label="${label}" title="${label}"><img src="${assetUrl(`../../../icons/${icon}.svg`)}" alt=""></a>`;
    })
    .join("");

  const panelTags = asArray(metadata.panel?.tags)
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("");

  const portrait = metadata.portrait || {};
  const panelKicker = metadata.panel?.kicker || "";
  const panelKickerHref = resolveOptionalHref(metadata.panel?.kicker_href || "");
  const panelKickerHtml = panelKickerHref
    ? `<a href="${escapeHtml(panelKickerHref)}" target="_blank" rel="noreferrer">${escapeHtml(panelKicker)}</a>`
    : escapeHtml(panelKicker);

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
      <div class="profile-panel-top">
        <img class="portrait" src="${escapeHtml(portrait.src || "images/sougato_dp_circle.png")}" alt="${escapeHtml(portrait.alt || "Portrait")}">
        <div class="profile-panel-body">
          <p class="panel-kicker">${panelKickerHtml}</p>
          <h2>${escapeHtml(metadata.panel?.title || "")}</h2>
          <p>${escapeHtml(metadata.panel?.body || "")}</p>
        </div>
      </div>
      <div class="profile-panel-bottom">
        <div class="tag-row">${panelTags}</div>
      </div>
    </aside>`;
}

function renderHighlights(metadata) {
  return asArray(metadata.metrics)
    .map((metric) => {
      const label = metric.href
        ? `<a class="metric-label metric-link" href="${escapeHtml(metric.href)}"${metric.external ? ' target="_blank" rel="noreferrer"' : ""}>${escapeHtml(metric.label || "")}</a>`
        : `<span class="metric-label">${escapeHtml(metric.label || "")}</span>`;

      return `
        <article class="metric-card">
          <span class="metric-value">${escapeHtml(metric.value || "")}</span>
          ${label}
        </article>`;
    })
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

function renderSectionFallback(title) {
  return `<div class="section-heading"><h2>${escapeHtml(title)}</h2><p>Check the Markdown files under <code>content/site/</code> and the browser console.</p></div>`;
}

async function bootHomepage() {
  try {
    const renderers = {
      hero: renderHero,
      highlights: renderHighlights,
      blog: renderBlog,
      focus: renderFocus,
      work: renderWork,
      experience: renderExperience,
      archive: renderArchive,
      contact: renderContact,
    };

    const configDoc = await loadMarkdownDocument(CONFIG_SOURCE);
    const siteConfig = configDoc.metadata || {};
    const sections = asArray(siteConfig.sections).sort((left, right) => (left.order || 0) - (right.order || 0));
    const homepageRoot = siteConfig.site?.homepage_root || "/";

    const navLinks = document.getElementById("site-nav-links");
    if (navLinks) {
      navLinks.innerHTML = renderNav(asArray(siteConfig.nav?.homepage).filter((item) => !isCtaNavItem(item)), homepageRoot);
    }
    const navCta = document.getElementById("site-nav-cta");
    if (navCta) {
      navCta.innerHTML = renderNav(asArray(siteConfig.nav?.homepage).filter((item) => isCtaNavItem(item)), homepageRoot);
    }
    setupThemeToggle();
    setupMobileNav();

    const results = await Promise.allSettled(
      sections.map((section) => loadMarkdownDocument(new URL(`../../../content/site/${section.file}`, import.meta.url).href))
    );

    let heroLoaded = false;

    results.forEach((result, index) => {
      const section = sections[index];
      const key = section.id;

      if (result.status === "fulfilled") {
        const document = result.value;
        const metadata = { ...section, ...document.metadata };
        if (key === "hero") {
          updateHead(metadata);
          heroLoaded = true;
        }
        mountSection(section.target, renderers[key](metadata));
        return;
      }

      console.error(`Failed to load section "${key}" from ${section.file}`, result.reason);
      mountSection(section.target, renderSectionFallback(section.fallback_title || section.fallbackTitle || "Unable to load section."));
    });

    if (!heroLoaded) {
      const brand = document.getElementById("site-brand");
      if (brand) {
        brand.textContent = "Portfolio";
      }
    }
  } catch (error) {
    console.error("Failed to load site config or homepage content", error);
    const fallback = renderSectionFallback("Unable to load site content.");
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
