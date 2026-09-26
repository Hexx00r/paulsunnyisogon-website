// THROWAWAY SPIKE — TypeSafe (Jev) intent classification for the site chat widget.
// Sends a labeled set of representative chat messages through one batched TypeSafe
// request each (Choice: intent, Noul: spam, Score: urgency) and writes raw answers
// plus a findings summary to scripts/typesafe-spike-results.json for inspection.
//
// Run:  node scripts/typesafe-spike.mjs
// Needs TYPESAFE_API_KEY in the environment. Plain fetch, no dependencies.

import { fileURLToPath } from "node:url";

const API = "https://api.typesafe.ai/v1/systemone";
const MODEL = "jev-latest";
const OUT = fileURLToPath(new URL("./typesafe-spike-results.json", import.meta.url));

// At least 3 messages per intent, plus edge cases (vague, mixed-intent, spam
// variants, urgency). `expected` is the human-labeled primary intent.
const MESSAGES = [
  // quote_request
  { id: "quote_request", expected: "quote_request", text: "I need a website for my pressure cleaning business, about 5 pages with a quote form. Can you give me a rough price?" },
  { id: "quote_ecommerce", expected: "quote_request", text: "Looking to get an online store built for my candle brand, maybe 20 products to start. What would something like that cost?" },
  { id: "quote_rebuild", expected: "quote_request", text: "I want to rebuild my landscaping company's outdated website and add an online booking form. Can you send me an estimate?" },
  { id: "quote_urgent", expected: "quote_request", text: "My current website just crashed and I need a replacement ASAP — five pages, quote form, the works. Can you help urgently?" },
  // booking_question
  { id: "booking_question", expected: "booking_question", text: "Do you have any availability next week for a call to discuss my project?" },
  { id: "booking_intro_call", expected: "booking_question", text: "Can we book a 30-minute intro call sometime Thursday or Friday?" },
  { id: "booking_consult", expected: "booking_question", text: "I'd like to schedule a consultation to talk about my site — what's your booking process?" },
  { id: "booking_mixed", expected: "booking_question", text: "I'd like to book a call next week to discuss a website for my bakery — mainly to talk through options and ballpark costs." },
  // faq
  { id: "faq", expected: "faq", text: "How long does a typical website build take?" },
  { id: "faq_stack", expected: "faq", text: "Do you build sites with WordPress or custom code?" },
  { id: "faq_cms", expected: "faq", text: "Will I be able to update the content myself once the site is live?" },
  { id: "faq_mixed", expected: "faq", text: "What's your typical timeline for a 5-page site? Hoping to launch before my trade show in March." },
  // pricing
  { id: "pricing", expected: "pricing", text: "What are your rates for a basic landing page?" },
  { id: "pricing_ballpark", expected: "pricing", text: "How much do you charge for a website, roughly? Just a ballpark is fine." },
  { id: "pricing_hourly", expected: "pricing", text: "What's your hourly rate for freelance dev work?" },
  // casual
  { id: "casual", expected: "casual", text: "Hey, just came across your portfolio. Nice work!" },
  { id: "casual_blog", expected: "casual", text: "Thanks for the tips in your latest blog post — really helpful stuff." },
  { id: "casual_animations", expected: "casual", text: "Just dropping by to say I love the animations on your homepage." },
  // spam (variants: SEO pitch, prize scam, inheritance scam)
  { id: "spam", expected: "spam", text: "SEO backlink services - guaranteed #1 Google ranking, cheap! Click here: best-seo.example" },
  { id: "spam_seo_pitch", expected: "spam", text: "Hi there, we noticed your website is not ranking on Google page 1. Our guaranteed SEO service will fix that — reply now for 50% off your first month!" },
  { id: "spam_prize", expected: "spam", text: "Congratulations! Your email was selected in our weekly draw. Claim your free iPhone now at free-gift.example/claim" },
  { id: "spam_inheritance", expected: "spam", text: "Dear sir/madam, I am the legal representative of a deceased client with $10,000,000 to transfer. I seek a trustworthy partner abroad and will share 30%." },
  // off_topic
  { id: "off_topic", expected: "off_topic", text: "Do you know what the weather is like in Melbourne today?" },
  { id: "off_topic_sports", expected: "off_topic", text: "Who do you reckon wins the grand final this weekend?" },
  { id: "off_topic_recipe", expected: "off_topic", text: "Can you recommend a good recipe for banana bread?" },
  // none_match (vague genuine inquiries)
  { id: "vague_inquiry", expected: "none_match", text: "I might need a website at some point, not really sure yet" },
  { id: "vague_deciding", expected: "none_match", text: "Honestly I'm still deciding whether I need a new site at all — no specific questions yet." },
];

const QUESTIONS = {
  intent: {
    type: "choice",
    instructions:
      "The `message` field is a chat message from a visitor to paulsunnydev.com, the portfolio site of a freelance web developer. Pick the single primary intent of the message.",
    criteria: {
      quote_request: "Asks for a quote, estimate, or price for a specific project with some detail about what they want built.",
      booking_question: "Asks about scheduling, availability, or booking a call or meeting.",
      faq: "Asks a factual question answerable from general site/service information (process, timeline, technologies, what's included).",
      pricing: "Asks about rates, prices, or cost in general terms without describing a specific project.",
      casual: "Social message with no request — greetings, compliments, small talk.",
      spam: "Unsolicited advertising, promotions, link schemes, or scams.",
      off_topic: "Has nothing to do with the site, its services, or a typical visitor request.",
      none_match: "A real visitor message, but none of the other intents fit.",
    },
  },
  is_spam: {
    type: "noul",
    instructions: "Is `message` spam or unsolicited advertising rather than a genuine visitor message?",
    criteria: {
      true: "Advertising, SEO/link offers, promotions, or scam-like content.",
      false: "A genuine message from a site visitor, even if vague or off-topic.",
    },
  },
  urgency: {
    type: "score",
    instructions: "How much time pressure does the visitor express in `message`?",
    criteria: [
      "No time pressure — general question, browsing, or no timeframe mentioned.",
      "Some time pressure — mentions a timeframe like 'this month' or 'next week'.",
      "High urgency — needs a fast response, using words like 'asap', 'urgent', or describing something broken.",
    ],
  },
};

function fatal(msg, err) {
  console.error(`SPIKE STOPPED: ${msg}`);
  if (err) console.error(err);
  process.exit(1);
}

const key = process.env.TYPESAFE_API_KEY;
if (!key) fatal("TYPESAFE_API_KEY is missing from the environment.");

function bodyFor(text) {
  return {
    state: {
      site: "paulsunnydev.com — portfolio of a freelance web developer. Services: website builds, automation, niche sites for pressure-cleaning businesses. The site offers quote requests, call booking, FAQs, and case studies.",
      message: text,
    },
    model: MODEL,
    questions: QUESTIONS,
  };
}

async function evaluate(text) {
  let lastErr;
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) {
      const wait = 1000 * 2 ** (attempt - 1);
      console.log(`  retry ${attempt}/2 in ${wait}ms`);
      await new Promise((r) => setTimeout(r, wait));
    }
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify(bodyFor(text)),
      });
      if (res.status === 401) fatal("TYPESAFE_API_KEY was rejected (401). Check the key.");
      if (res.status === 422) {
        fatal("TypeSafe returned 422 (request validation failed). Body: " + (await res.text()));
      }
      if (res.status === 429 || res.status === 529 || res.status >= 500) {
        lastErr = new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
        continue; // transient — backoff and retry
      }
      if (!res.ok) {
        lastErr = new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
        continue;
      }
      return await res.json();
    } catch (err) {
      if (err.message && err.message.startsWith("SPIKE STOPPED")) throw err;
      lastErr = err; // network error — retry
    }
  }
  throw lastErr;
}

const results = [];
for (const m of MESSAGES) {
  const t0 = Date.now();
  process.stdout.write(`${m.id} ... `);
  try {
    const data = await evaluate(m.text);
    const answers = data.answers || {};
    const missing = Object.keys(QUESTIONS).filter((q) => !(q in answers));
    if (missing.length) {
      console.log(`INCOMPLETE — missing answers for: ${missing.join(", ")}`);
      results.push({ ...m, ok: false, error: `missing answers: ${missing.join(", ")}`, latencyMs: Date.now() - t0 });
      continue;
    }
    const intent = answers.intent;
    const matchMark = intent.choice === m.expected ? "OK " : "MISMATCH ";
    console.log(
      `${matchMark}${intent.choice} (conf ${intent.confidence.toFixed(2)}) | spam ${answers.is_spam.noul.toFixed(2)} | urgency ${answers.urgency.score.toFixed(2)} [${Date.now() - t0}ms]`
    );
    results.push({
      ...m,
      ok: true,
      latencyMs: Date.now() - t0,
      model: data.model,
      usage: data.usage,
      answers: {
        intent: { choice: intent.choice, probabilities: intent.probabilities, confidence: intent.confidence },
        is_spam: { noul: answers.is_spam.noul },
        urgency: {
          score: answers.urgency.score,
          legend: answers.urgency.legend,
          probabilities: answers.urgency.probabilities,
          confidence: answers.urgency.confidence,
        },
      },
    });
  } catch (err) {
    console.log(`FAILED — ${err.message}`);
    results.push({ ...m, ok: false, error: String(err.message || err), latencyMs: Date.now() - t0 });
  }
}

const okResults = results.filter((r) => r.ok);
const intentMismatches = okResults
  .filter((r) => r.answers.intent.choice !== r.expected)
  .map((r) => ({ id: r.id, text: r.text, expected: r.expected, got: r.answers.intent.choice, confidence: r.answers.intent.confidence }));
const spamLabeled = okResults.filter((r) => r.expected === "spam");
const nonSpamLabeled = okResults.filter((r) => r.expected !== "spam");
const avg = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

const findings = {
  intent: {
    correct: okResults.length - intentMismatches.length,
    total: okResults.length,
    mismatches: intentMismatches,
  },
  is_spam: {
    spamMinNoul: spamLabeled.length ? Math.min(...spamLabeled.map((r) => r.answers.is_spam.noul)) : null,
    nonSpamMaxNoul: nonSpamLabeled.length ? Math.max(...nonSpamLabeled.map((r) => r.answers.is_spam.noul)) : null,
  },
  confidence: {
    avgIntent: avg(okResults.map((r) => r.answers.intent.confidence)),
    avgUrgency: avg(okResults.map((r) => r.answers.urgency.confidence)),
  },
  avgLatencyMs: Math.round(avg(okResults.map((r) => r.latencyMs))),
  tokens: okResults.reduce(
    (sum, r) => ({ input: sum.input + (r.usage?.input_tokens ?? 0), output: sum.output + (r.usage?.output_tokens ?? 0) }),
    { input: 0, output: 0 }
  ),
};

const okCount = okResults.length;
const output = {
  spike: "TypeSafe chat intent classification",
  model: MODEL,
  ranAt: new Date().toISOString(),
  summary: { total: results.length, ok: okCount, failed: results.length - okCount, intentMismatches: intentMismatches.length },
  findings,
  results,
};

const fs = await import("node:fs");
fs.writeFileSync(OUT, JSON.stringify(output, null, 2));
console.log(`\nWrote ${OUT} — ${okCount}/${results.length} messages succeeded, ${intentMismatches.length} intent mismatches.`);
console.log(`Intent accuracy: ${findings.intent.correct}/${findings.intent.total} | avg latency ${findings.avgLatencyMs}ms | tokens ${findings.tokens.input} in / ${findings.tokens.output} out`);

if (okCount !== results.length) {
  console.error("Some messages failed permanently; see results file. Not a clean pass.");
  process.exit(1);
}
