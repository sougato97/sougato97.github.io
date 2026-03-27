import { formatDisplayDate, renderArticleMarkdown } from "/black_box/utils/blog/markdown.js";
import { renderBlogPage, syncSharedHead } from "/black_box/utils/blog/layout.js";
import { loadMarkdownDocument } from "/black_box/utils/site/markdown.js";

const SITE_SOURCES = {
  config: new URL("../../../content/site/config.md", import.meta.url).href,
  hero: new URL("../../../content/site/hero.md", import.meta.url).href,
  blog: new URL("../../../content/site/blog.md", import.meta.url).href,
  contact: new URL("../../../content/site/contact.md", import.meta.url).href,
};

function getBodyConfig() {
  return {
    source: document.body.dataset.articleSource || "./article.md",
  };
}

function ensureMathJaxConfig() {
  const existingConfig = window.MathJax || {};
  const existingTex = existingConfig.tex || {};
  const existingOptions = existingConfig.options || {};
  const skipHtmlTags = Array.isArray(existingOptions.skipHtmlTags)
    ? existingOptions.skipHtmlTags
    : ["script", "noscript", "style", "textarea", "pre", "code"];

  window.MathJax = {
    ...existingConfig,
    tex: {
      ...existingTex,
      inlineMath: existingTex.inlineMath || [["$", "$"], ["\\(", "\\)"]],
      displayMath: existingTex.displayMath || [["$$", "$$"], ["\\[", "\\]"]],
      processEscapes: existingTex.processEscapes ?? true,
      processEnvironments: existingTex.processEnvironments ?? true,
    },
    options: {
      ...existingOptions,
      skipHtmlTags,
    },
  };
}

function loadMathJax() {
  if (document.querySelector('script[data-mathjax="true"]')) {
    return Promise.resolve();
  }

  ensureMathJaxConfig();

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js";
    script.defer = true;
    script.dataset.mathjax = "true";
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function containsMathSyntax(sourceText = "") {
  return (
    /\$\$[\s\S]+?\$\$/.test(sourceText) ||
    /\\\[[\s\S]+?\\\]/.test(sourceText) ||
    /\\\([\s\S]+?\\\)/.test(sourceText) ||
    /(^|[^\$\\])\$(?!\$)[^\n$]+?\$(?!\$)/m.test(sourceText)
  );
}

function renderComments(comments = {}) {
  const host = document.getElementById("comments-host");
  if (!host) {
    return;
  }

  host.innerHTML = "";
  if (comments.provider !== "utterances" || !comments.repo || !comments.label) {
    return;
  }

  const script = document.createElement("script");
  script.src = "https://utteranc.es/client.js";
  script.async = true;
  script.setAttribute("repo", comments.repo);
  script.setAttribute("issue-term", "pathname");
  script.setAttribute("label", comments.label);
  script.setAttribute(
    "theme",
    document.documentElement.getAttribute("data-theme") === "dark" ? "github-dark" : "github-light"
  );
  script.setAttribute("crossorigin", "anonymous");
  host.appendChild(script);
}

function applyToggleState(toggle) {
  const icon = toggle.querySelector(".theme-toggle-icon");
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
  toggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
  toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  if (icon) {
    icon.textContent = isDark ? "☀" : "☾";
  }
}

function setupThemeToggle(commentsConfig) {
  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) {
    return;
  }

  applyToggleState(toggle);

  toggle.addEventListener("click", () => {
    const root = document.documentElement;
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyToggleState(toggle);
    renderComments(commentsConfig);
  });
}

async function bootArticlePage() {
  const { source } = getBodyConfig();

  try {
    const [response, configDoc, heroDoc, blogDoc, contactDoc] = await Promise.all([
      fetch(source, { cache: "no-store" }),
      loadMarkdownDocument(SITE_SOURCES.config),
      loadMarkdownDocument(SITE_SOURCES.hero),
      loadMarkdownDocument(SITE_SOURCES.blog),
      loadMarkdownDocument(SITE_SOURCES.contact),
    ]);
    if (!response.ok) {
      throw new Error(`Unable to load article markdown: ${response.status}`);
    }

    const sourceText = await response.text();
    const { metadata, html } = renderArticleMarkdown(sourceText);
    metadata.math = Boolean(metadata.math) || containsMathSyntax(sourceText);
    metadata.displayDate = formatDisplayDate(metadata.date);
    const config = configDoc.metadata || {};
    const hero = heroDoc.metadata || {};
    const blog = blogDoc.metadata || {};
    const contactSection = Array.isArray(config.sections)
      ? config.sections.find((section) => section.id === "contact") || {}
      : {};
    const contact = { ...contactSection, ...(contactDoc.metadata || {}) };
    const site = {
      brand: hero.name || "Portfolio",
      author: hero.meta_author || hero.name || "Portfolio",
      titleSuffix: hero.name || "Portfolio",
      description: hero.meta_description || "",
      homepageRoot: config.site?.homepage_root || "/",
    };
    const navItems = config.nav?.article || [];
    const commentsConfig = blog.comments || {};

    const root = document.getElementById("blog-root");
    if (root) {
      root.innerHTML = renderBlogPage({ metadata, html, site, blog, contact, navItems });
    }

    syncSharedHead({ site, title: metadata.title || "Untitled Article", description: metadata.description || "" });
    setupThemeToggle(commentsConfig);

    if (metadata.math) {
      await loadMathJax();
      if (window.MathJax && typeof window.MathJax.typesetPromise === "function") {
        await window.MathJax.typesetPromise([document.getElementById("article-content")]);
      }
    }

    renderComments(commentsConfig);
  } catch (error) {
    console.error(error);
    const root = document.getElementById("blog-root");
    if (root) {
      root.innerHTML = `<div class="page-frame"><main><section class="section article-shell"><article class="article-card"><p>Unable to load the article markdown. Check <code>${source}</code> and the browser console.</p></article></section></main></div>`;
    }
  }
}

bootArticlePage();
