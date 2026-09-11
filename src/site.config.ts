export type TechStackItem = {
  label: string
  value: string
}

/** Tech Stack section content (rendered in Hero). */
export const techStack: TechStackItem[] = [
  {
    label: 'Frontend',
    value: 'TypeScript static sites (no frameworks), deployed via GitHub Actions',
  },
  {
    label: 'Backend',
    value: 'Cloudflare Workers + D1 (zero-cost serverless)',
  },
  {
    label: 'Automation',
    value: 'n8n (self-hosted via Docker), webhooks, REST APIs',
  },
  {
    label: 'CRM',
    value: 'GoHighLevel — inbound webhook trigger only (cheap sub-account, no REST API access)',
  },
  {
    label: 'Notifications',
    value: 'Telegram bots',
  },
  {
    label: 'Languages',
    value: 'JavaScript, Python, PowerShell',
  },
]
