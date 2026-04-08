#!/usr/bin/env python3
from pathlib import Path
import html

ROOT = Path(__file__).resolve().parents[2]
BLOG_DIR = ROOT / "blog"
TEMPLATE_PATH = ROOT / "black_box" / "templates" / "blog-index.html"
HOME_TEMPLATE_PATH = ROOT / "black_box" / "templates" / "home-index.html"
HOME_OUTPUT = ROOT / "index.html"
HOME_FALLBACK_CONTEXT = {
    "meta_author": "Portfolio",
    "meta_description": "Personal portfolio website.",
    "page_title": "Portfolio | Personal Website",
    "site_name": "Portfolio",
    "favicon_data_uri": "",
}
def render_template(template: str, context: dict[str, str]) -> str:
    rendered = template
    for key, value in context.items():
        rendered = rendered.replace(f"{{{{ {key} }}}}", html.escape(str(value), quote=True))
    return rendered


def initials_from_name(name: str) -> str:
    parts = [part for part in str(name).strip().split() if part][:2]
    return "".join(part[0].upper() for part in parts) or "PF"


def build_favicon_data_uri(name: str) -> str:
    initials = initials_from_name(name)
    return (
        "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E"
        "%3Crect width=%27100%27 height=%27100%27 rx=%2722%27 fill=%27%23141f2d%27/%3E"
        f"%3Ctext x=%2750%27 y=%2762%27 font-size=%2748%27 text-anchor=%27middle%27 fill=%27%23f7f3ea%27 font-family=%27Arial, sans-serif%27%3E{initials}%3C/text%3E%3C/svg%3E"
    )


def sync_homepage() -> None:
    template = HOME_TEMPLATE_PATH.read_text()
    context = {
        **HOME_FALLBACK_CONTEXT,
        "favicon_data_uri": build_favicon_data_uri(HOME_FALLBACK_CONTEXT["meta_author"]),
    }
    HOME_OUTPUT.write_text(render_template(template, context))


def sync_blog_shells() -> int:
    template = TEMPLATE_PATH.read_text()
    synced = 0

    for article_path in sorted(BLOG_DIR.glob("*/article.md")):
        output = article_path.with_name("index.html")
        output.write_text(template)
        synced += 1
        print(f"synced {output.relative_to(ROOT)}")

    return synced


def main() -> int:
    sync_homepage()
    synced = sync_blog_shells()

    print(f"homepage synced: {HOME_OUTPUT.relative_to(ROOT)}")
    print(f"summary: blog_shells={synced}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
