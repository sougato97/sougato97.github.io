import yaml from "https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/+esm";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

marked.setOptions({
  gfm: true,
  breaks: false,
  headerIds: false,
  mangle: false,
});

export async function loadMarkdownDocument(source) {
  const response = await fetch(source, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to load ${source}: ${response.status}`);
  }

  const text = await response.text();
  const { metadata, body } = parseFrontmatter(text);
  return {
    source,
    metadata,
    body,
    html: body ? marked.parse(body) : "",
  };
}

export function parseFrontmatter(text) {
  if (!text.startsWith("---\n")) {
    return { metadata: {}, body: text.trim() };
  }

  const closingIndex = text.indexOf("\n---\n", 4);
  if (closingIndex === -1) {
    throw new Error("Markdown frontmatter is not closed properly.");
  }

  const frontmatterText = text.slice(4, closingIndex);
  const body = text.slice(closingIndex + 5).trim();
  const metadata = yaml.load(frontmatterText) || {};

  if (typeof metadata !== "object" || Array.isArray(metadata)) {
    throw new Error("Markdown frontmatter must be a YAML object.");
  }

  return { metadata, body };
}

export function renderMarkdown(markdownText = "") {
  return markdownText ? marked.parse(markdownText) : "";
}

export function renderInlineMarkdown(markdownText = "") {
  return markdownText ? marked.parseInline(markdownText) : "";
}

export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
