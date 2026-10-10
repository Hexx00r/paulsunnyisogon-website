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
6. Write `chatSeo/keywords.md` with a table: pattern, keyword, monthly volume, page type Google ranks, existing URL. Keep patterns in ChatSEO's ranked order.
7. Never invent a volume. If ChatSEO did not return it, write "n/a".
8. Hand the file to the user with a one-line summary: top pattern, and how many keywords have no URL yet (those are the pages to build).
