# TODO

Nice-to-have items from the 2026-09-20 code review. Not blocking; pick off as time allows.

- public/chat.js:144 — add fetch timeout/AbortController and report HTTP errors accurately (currently mislabeled "Network hiccup")
- public/chat.js:8 — guard `localStorage` access so blocked storage degrades gracefully instead of killing the chat widget
- public/chat.js + QuoteCalculatorDemo.tsx — add `maxlength` to chat/quote inputs so oversized payloads never reach the worker
- src/lib/splash.ts:281 — add legacy `mq.addListener` fallback (or drop it in chat.js:94 — pick one convention)
- src/lib/tech-icons.ts:4 — `hex` field is dead data: wire up the hover color or remove it
- src/sections/Faq.tsx:41 — escape `<` in the JSON-LD stringify so future copy containing `</script>` can't break out
- src/lib/video-modal.ts — add focus trap while the modal is open (Esc/backdrop already work)
- index.html — consider CSP meta + referrer policy hardening
- Style drift: src/lib/splash.ts and src/lib/tech-icons.ts use double quotes + semicolons; rest of the codebase is single quotes, no semicolons — align
