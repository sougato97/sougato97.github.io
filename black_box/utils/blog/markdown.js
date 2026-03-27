import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const DISPLAY_MATH_PATTERNS = [
  /^\$\$\s*\n([\s\S]*?)\n\$\$$/gm,
  /^\\\[\s*\n([\s\S]*?)\n\\\]$/gm,
];

marked.setOptions({
  gfm: true,
  breaks: false,
  headerIds: false,
  mangle: false,
});

function parseScalar(rawValue) {
  const value = rawValue.trim();
  if (!value) return "";
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
}

function normalizeTags(value) {
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag).trim()).filter(Boolean);
  }
  if (!value) {
    return [];
  }
  return String(value)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function parseFrontmatter(sourceText) {
  if (!sourceText.startsWith("---\n")) {
    return { metadata: {}, body: sourceText };
  }

  const closingIndex = sourceText.indexOf("\n---\n", 4);
  if (closingIndex === -1) {
    throw new Error("Article frontmatter is not closed properly.");
  }

  const frontmatterText = sourceText.slice(4, closingIndex);
  const body = sourceText.slice(closingIndex + 5).trimStart();
  const metadata = {};

  let currentKey = null;

  for (const line of frontmatterText.split("\n")) {
    if (!line.trim()) {
      continue;
    }

    const listMatch = line.match(/^\s*-\s+(.+)$/);
    if (listMatch && currentKey && Array.isArray(metadata[currentKey])) {
      metadata[currentKey].push(parseScalar(listMatch[1]));
      continue;
    }

    const entryMatch = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
    if (!entryMatch) {
      throw new Error(`Unsupported frontmatter line: ${line}`);
    }

    const [, key, rawValue = ""] = entryMatch;
    if (!rawValue) {
      metadata[key] = [];
      currentKey = key;
      continue;
    }

    metadata[key] = parseScalar(rawValue);
    currentKey = key;
  }

  metadata.tags = normalizeTags(metadata.tags);
  return { metadata, body };
}

function extractDisplayMath(markdownText) {
  const blocks = [];
  let updated = markdownText;

  const replaceWithPlaceholder = (delimiter) => (_, equationBody) => {
    const placeholder = `@@MATHBLOCK${blocks.length}@@`;
    blocks.push(
      `<div class="equation-block">\n${delimiter}\n${equationBody.trim()}\n${delimiter}\n</div>`
    );
    return placeholder;
  };

  updated = updated.replace(DISPLAY_MATH_PATTERNS[0], replaceWithPlaceholder("$$"));
  updated = updated.replace(DISPLAY_MATH_PATTERNS[1], replaceWithPlaceholder("\\["));

  return { markdownText: updated, blocks };
}

function injectDisplayMath(html, blocks) {
  return blocks.reduce((updatedHtml, block, index) => {
    const placeholder = `@@MATHBLOCK${index}@@`;
    return updatedHtml
      .replace(`<p>${placeholder}</p>`, block)
      .replace(placeholder, block);
  }, html);
}

export function renderArticleMarkdown(sourceText) {
  const { metadata, body } = parseFrontmatter(sourceText);
  const { markdownText, blocks } = extractDisplayMath(body);
  const html = injectDisplayMath(marked.parse(markdownText), blocks);
  return { metadata, html };
}

export function formatDisplayDate(rawDate) {
  if (!rawDate) {
    return "";
  }

  const parsed = new Date(`${rawDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return String(rawDate);
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}
