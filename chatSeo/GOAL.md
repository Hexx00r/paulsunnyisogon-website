# GOAL: SEO page pipeline for paulsunnydev.com

> Hand this file to Claude Code in the repo root: *"Read GOAL.md and complete it."*

## Objective
Set up a repeatable 3-skill pipeline that finds commercial keywords, briefs one page per keyword, and publishes each page through a preview and diff gate, never straight to live.

```
/money-keywords  →  keywords.md
/page-brief <kw> →  briefs/<keyword-slug>.md
/page-publish    →  git branch → Cloudflare Pages preview → approval → main
```

## Done when
- [ ] `.claude/skills/money-keywords/SKILL.md`, `page-brief/SKILL.md` and `page-publish/SKILL.md` exist with the contents below
- [ ] `seo-process.md` exists in the repo root
- [ ] An empty `briefs/` folder exists (with a `.gitkeep` file)
- [ ] ChatSEO MCP is connected: `list_sites` returns paulsunnydev.com
- [ ] `git remote -v` shows the GitHub repo that Cloudflare Pages builds from
- [ ] All of the above committed on a branch `chore/seo-pipeline`
- [ ] **Not done here:** running the pipeline. Stop after setup and report.

## Rules for Claude Code
- Don't edit any existing site page during setup.
- If ChatSEO isn't connected, stop and ask Paul for the MCP URL. Don't guess it.
- If the site isn't Astro + Cloudflare Pages, stop and report; `seo-process.md` needs adjusting.
- Commit at the end of each task.

## Tasks (15–30 min each)
1. **Check the stack**: confirm Astro (`astro.config.*`) and the Cloudflare Pages setup. *Done: stack reported.*
2. **Create the files**: the skills, `seo-process.md` and `briefs/` from the contents below. *Done: committed.*
3. **Connect ChatSEO**: `claude mcp add` with the URL from Paul. *Done: `list_sites` returns the site.*
4. **Smoke test**: run `/money-keywords` up to the point where ChatSEO replies, and check that `keywords.md` is written. Don't run page-publish. *Done: `keywords.md` exists with real data or `n/a`.*

---

## File: `.claude/skills/money-keywords/SKILL.md`
```markdown
---
name: money-keywords
description: Find the commercial keyword patterns for a site. Use when asked which keywords to target, for an SEO strategy, or "where is the money".
---

1. Call ChatSEO `list_sites`. If exactly one site matches the one the user means, use its ID. If several exist and the user hasn't named one, ask which site before spending credits.
2. Send ChatSEO (`send_message`, with the siteId), word for word:
   "Give me the best SEO strategy for my site. Group the opportunities
   by keyword pattern, and only keep the ones with commercial intent.
   Rank the patterns by how realistic they are for a site with my
   authority."
3. Poll `get_conversation_messages` until the reply is complete (stop after ~10 polls and report if it never finishes).
4. For each pattern, check the current top 3 results per keyword:
   - Use SERP data from ChatSEO if it returned any; otherwise ask ChatSEO a follow-up for the top-ranking URLs, or run a web search for the keyword.
   - Keep only keywords where the top 3 are landing, service, category or product pages. Drop anything where blog posts dominate.
   - If you could not check the SERP, keep the keyword and mark page type "unverified".
5. Check whether the site already has a URL for each keyword: look at the site's sitemap or a `site:` search. Record the URL, or "none".
6. Write `keywords.md` with a table: pattern, keyword, monthly volume, page type Google ranks, existing URL. Keep patterns in ChatSEO's ranked order.
7. Never invent a volume. If ChatSEO did not return it, write "n/a".
8. Hand the file to the user with a one-line summary: top pattern, and how many keywords have no URL yet (those are the pages to build).
```

## File: `.claude/skills/page-brief/SKILL.md`
```markdown
---
name: page-brief
description: Build the SEO brief for one target keyword. Use when asked to rank for a keyword, optimise a page, or before creating any new page.
---

0. Inputs: the target keyword and the site. If the keyword is missing, ask for it. Get the siteId from ChatSEO `list_sites`; if several sites exist and the user hasn't named one, ask which.
1. Send ChatSEO (`send_message`, siteId), word for word, with the keyword filled in:
   "I want to rank first on <keyword>. Read the live top 10. Tell me
   which page type wins, which secondary keywords the top 3 also rank
   for, and whether I should optimise an existing page or create a new
   one. Then give me the full brief."
2. Poll `get_conversation_messages` until complete (stop after ~10 polls and report if it never finishes). Extract: create or optimise and which URL, primary and secondary keywords, the sections the top 3 all have, the proposed title and meta description.
3. Check whether an existing URL already gets clicks or impressions for the keyword:
   - Use Google Search Console data through ChatSEO (`get_gsc_sites` / the site's linked GSC integration), or ask ChatSEO a follow-up for the GSC queries data on that keyword.
   - If any URL has clicks or impressions for it, STOP any plan to create a new page. We optimise that URL, even if ChatSEO recommended a new page. Note the override in the brief.
   - If no GSC data is connected, say so at the top of the brief and mark the create/optimise decision "unverified".
4. Check the title and meta description:
   - The title contains the primary keyword, ideally near the start.
   - The title is about 60 characters or fewer (under ~580px) so it doesn't truncate in the SERP.
   - The meta description is about 155 characters or fewer.
   - If either fails, write a fixed version next to ChatSEO's original.
5. Save the brief to `briefs/<keyword-slug>.md` (lowercase, hyphens). Use these sections: Decision (create/optimise + URL + why), Keywords (primary, secondary), Required sections, Title, Meta description, Notes. Do not edit the site yet.
6. Hand over the file with one line: the decision and the URL.
```

## File: `.claude/skills/page-publish/SKILL.md`
```markdown
---
name: page-publish
description: Write or update a paulsunnydev.com page from its brief and publish it safely. Use after page-brief, when asked to build, rewrite or publish a page.
---

Site: paulsunnydev.com (Astro + Cloudflare Pages).
Config:
- Page template: the closest existing page of the same type in the repo (a service page for a service keyword, and so on). Name the file you're using as the template before writing.
- SEO process file: `seo-process.md` in the repo root. If it's missing, stop and ask for it.

0. Pre-flight
   - Read `briefs/<keyword-slug>.md`. If it doesn't exist, stop and run page-brief first.
   - Pick the template page and read it, then read `seo-process.md`.
   - If the brief says optimise, read the current version of that page and keep it as the old version for step 4.
1. Write or rewrite the page on the template:
   - Cover every section the top 3 share (from the brief).
   - Add one thing they don't have: a quiz, a calculator, photos, real numbers or a video.
   - Use only real assets and real numbers from the user or the site. If none exist, propose the element and leave a clearly marked TODO. Never fabricate stats, testimonials or photos.
2. On-page basics:
   - Exactly one H1, and it contains the primary keyword.
   - Title and meta description copied from the brief unchanged.
3. Run every check in `seo-process.md` sections 1–8 and report each as PASS / FAIL / N/A. Any FAIL blocks publishing until it's fixed or the user accepts it in writing.
4. DIFF GATE (before any publish):
   - Compare the new page with the old version (when optimising) or the template/reference page (when creating).
   - List every element present before and missing now: tables, rankings, forms, quizzes, embeds, images, internal links, schema, redirects or a changed URL slug.
   - Show the list. If it is not empty, the first line of the reply says: "DIFF GATE: N elements missing". If it is empty, say "DIFF GATE: clean".
5. Publish only after an explicit yes from the user, given in this conversation after the diff gate was shown.
   - Draft or branch first, never straight to live. Commit to a git branch, let Cloudflare Pages build the preview deploy, and share the preview URL. Run the seo-process checks that need a live page (forms, links, schema, PageSpeed) on that preview.
   - A yes covers this page and this version only. Any edit after the yes needs a new diff gate and a new yes.
   - After the merge to main goes live, run `seo-process.md` section 9 (sitemap, GSC indexing request, 14-day recheck).
```

## File: `seo-process.md`
Use the `seo-process.md` file delivered alongside this GOAL.md, unchanged.
