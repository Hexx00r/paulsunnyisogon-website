import { BrowserShot, Kicker } from '@/components/Shared'
import wfList from '@/assets/wf-list.png'
import wfQuote from '@/assets/wf-quote.png'
import wfFollowup from '@/assets/wf-followup.png'
import wfReview from '@/assets/wf-review.png'

const WORKFLOWS = [
  {
    num: '01',
    name: 'New Quote Submitted via Funnel',
    flow: 'Inbound Webhook → Create Contact → Tag ("new lead", "source-funnel") → Find/Create Opportunity → Internal Notification',
  },
  {
    num: '02',
    name: 'Quoted - Send Quote + Follow-Up',
    flow: 'Automated quote delivery with timed follow-up sequences until the lead replies or books.',
  },
  {
    num: '03',
    name: 'Booked - Confirm + Prepare + Remind',
    flow: 'Appointment confirmation, job-prep notes, and day-before reminders - no-shows drop.',
  },
  {
    num: '04',
    name: 'Job Done - Invoice + Review Request',
    flow: 'Post-job workflow that fires the invoice and kicks off the review ask automatically.',
  },
  {
    num: '05',
    name: 'Review Follow-Up for Google',
    flow: 'Pipeline stage trigger → remove job-done tag → add review-requested tag → wait 3 days → condition check → review-link SMS.',
  },
  {
    num: '06',
    name: 'Repeat - Long-Term Nurture + DB Reactivation',
    flow: 'Seasonal re-activation campaigns that turn last year\u2019s customers into this year\u2019s bookings.',
  },
]

export default function AutomationEngine() {
  return (
    <section id="automations" className="scroll-mt-20 bg-ink py-20 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Kicker light>The automation engine</Kicker>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-white md:text-5xl">
          The real magic happens <span className="text-brand">behind the scenes.</span>
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
          Most &ldquo;funnel builders&rdquo; give you a landing page and disappear. I architect the
          entire automation backbone - <strong className="text-white">6+ interconnected workflows</strong>{' '}
          handling every stage from first click to 5-star review. This is what turns a website into
          a revenue machine.
        </p>

        <div className="mt-12">
          <BrowserShot
            src={wfList}
            alt="GoHighLevel workflows list - six published automations running as one system"
            url="app.gohighlevel.com · DJ's Workflow folder"
            className="border-white/10"
          />
          <p className="mt-3 text-center text-xs font-semibold text-white/50">
            The actual workflows list from the DJ Property &amp; Cleaning sub-account - published
            and enrolling real leads.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WORKFLOWS.map((wf) => (
            <article
              key={wf.num}
              className="rounded-[18px] border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-brand/60"
            >
              <span className="font-display text-sm font-extrabold tracking-widest text-brand">
                WORKFLOW {wf.num}
              </span>
              <h3 className="mt-2 font-display text-base font-bold text-white">{wf.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/60">{wf.flow}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <BrowserShot
            src={wfQuote}
            alt="Workflow 01 - inbound webhook to contact, tags, opportunity and internal notification"
            url="01 · New quote submitted"
          />
          <BrowserShot
            src={wfFollowup}
            alt="Workflow 02 - quoted follow-up sequence with waits, conditions and last-call step"
            url="02 · Quoted follow-up"
          />
          <BrowserShot
            src={wfReview}
            alt="Workflow 05 - Google review follow-up with 3-day wait and pipeline condition"
            url="05 · Review follow-up"
          />
        </div>
      </div>
    </section>
  )
}
