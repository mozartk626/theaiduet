# The AI Duet — theaiduet.com

Astro static site. Deploys to Cloudflare Pages.

## Quick Start

```bash
npm install
npm run dev      # localhost:4321
npm run build    # builds to ./dist
```

## Publishing a New Article

Create a `.md` file in `src/content/posts/`:

```markdown
---
title: "Your Article Title"
description: "One-sentence summary for SEO and previews."
date: 2026-06-03
tags: ["founders", "strategy"]
episode: "https://www.xiaoyuzhoufm.com/episode/ID"  # optional, for podcast eps
episodeNumber: "EP08"  # optional
titleZh: "中文标题"  # optional
draft: false  # set true to hide from site
---

Your article content in Markdown.
```

Commit → push → Cloudflare auto-deploys. Done.

## Site Structure

```
/                → Homepage (hero + all articles + services preview)
/posts           → All Field Notes listing
/posts/[slug]    → Individual article (auto-generated from markdown)
/services        → Consulting services page
/about           → About The AI Duet and Ellen
/chinese         → Gateway to Chinese content (小宇宙, 微信, 小红书)
/rss.xml         → RSS feed
/sitemap-index.xml → Sitemap
```

## Content Status

3 articles fully migrated: egg trader, EDB, maritime/ShipLinker.
9 articles/episodes as draft stubs — set `draft: false` and add content when ready.

## Before Going Live

1. Update social/podcast links in `src/pages/chinese.astro`
2. Set up email: ellen@theaiduet.com (Cloudflare Email Routing)
3. Cloudflare Pages: connect GitHub repo, build command `npm run build`, output `dist`, set `NODE_VERSION=22`
4. Add custom domain theaiduet.com in Cloudflare Pages settings
