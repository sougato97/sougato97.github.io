#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = ROOT / "blog"
TEMPLATE_PATH = ROOT / "black_box" / "templates" / "blog-index.html"


def main() -> int:
    template = TEMPLATE_PATH.read_text()
    created = []
    skipped = []

    for article_path in sorted(BLOG_DIR.glob("*/article.md")):
        index_path = article_path.with_name("index.html")
        if index_path.exists():
            skipped.append(index_path.relative_to(ROOT))
            continue
        index_path.write_text(template)
        created.append(index_path.relative_to(ROOT))

    for path in created:
        print(f"created {path}")
    for path in skipped:
        print(f"exists  {path}")

    print(f"summary: created={len(created)} skipped={len(skipped)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
