# Resend setup: sending quote emails from paulsunnydev.com

The quote calculator posts to the `quote-relay` Cloudflare Worker
(`https://quote-relay.paulsunny.workers.dev/quote/paulsunnydev`, set in `src/site.config.ts`).
The Worker's source is **not in this repo**, so the from-address change below is made in the Worker repo.

> Not verified from this repo: whether the Worker currently sends from `onboarding@resend.dev`.
> Check the Worker's `from:` field. `onboarding@resend.dev` only delivers to the Resend account
> owner's own address, and it looks like a test sender to prospects.

## 1. Add the domain in Resend

1. Resend dashboard → **Domains** → **Add Domain** → `paulsunnydev.com`. A sending subdomain such as
   `send.paulsunnydev.com` is also fine and keeps it separate from any other mail on the root domain.
   If you use the subdomain, the from-address is `quotes@send.paulsunnydev.com`.
2. Pick the region closest to your sending (Sydney if offered).
3. Resend shows the exact records to add. **Copy the values it shows**; the ones below are the shape
   to expect, not the values to paste.

## 2. DNS records to add in Cloudflare (DNS → Records)

Set every record to **DNS only** (grey cloud), not proxied.

| Type | Name | Value | Notes |
| --- | --- | --- | --- |
| TXT | `resend._domainkey` | `p=MIGfMA0G...` (long DKIM public key from Resend) | DKIM. Resend shows it; paste exactly. |
| MX | `send` | `feedback-smtp.<region>.amazonses.com`, priority 10 | Bounce/return-path handling. Only needed on the `send` subdomain Resend creates. |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | SPF for the return-path subdomain. |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:paulsunnyisogon@gmail.com` | DMARC. Start with `p=none`, move to `quarantine` once reports look clean. |

Notes:
- If `paulsunnydev.com` already has an SPF TXT record at the root, **do not add a second one**;
  merge into one record (`v=spf1 include:amazonses.com include:<existing> ~all`).
  Only one SPF record per name is valid.
- If a `_dmarc` record already exists, edit it rather than adding another.
- Click **Verify** in Resend. DNS usually propagates within minutes; allow up to 48 hours.

## 3. Change the from-address in the Worker

In the Worker repo, wherever the Resend call is made:

```js
// before
from: 'Quote Calculator <onboarding@resend.dev>',
// after
from: 'Paul Sunny <quotes@paulsunnydev.com>',   // or quotes@send.paulsunnydev.com if you used the subdomain
reply_to: 'paulsunnyisogon@gmail.com',
```

Then:
1. Keep the API key as a Worker secret (`wrangler secret put RESEND_API_KEY`), not in code.
2. Deploy (`wrangler deploy`).
3. Submit the calculator on the live site and confirm the email arrives, is not in spam, and
   "Show original" in Gmail shows `SPF: PASS`, `DKIM: PASS`, `DMARC: PASS`.

## TODO

- Confirm which of the two options (root domain vs `send.` subdomain) you want; the from-address
  above depends on it.
