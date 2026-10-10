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
5. Save the brief to `chatSeo/briefs/<keyword-slug>.md` (lowercase, hyphens). Use these sections: Decision (create/optimise + URL + why), Keywords (primary, secondary), Required sections, Title, Meta description, Notes. Do not edit the site yet.
6. Hand over the file with one line: the decision and the URL.
