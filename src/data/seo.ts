import { brand } from "./site";

export const siteUrl = "https://nebrex.ca";
export const ogImage = `${siteUrl}/og-image.png`;

export function canonical(path: string) {
  return `${siteUrl}${path}`;
}

export function graph(items: unknown[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": items }, null, 2);
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Nebrex Automations",
    url: siteUrl,
    email: brand.emailLabel,
    telephone: "+14032200220",
    founder: {
      "@type": "Person",
      name: "Jahan"
    },
    areaServed: ["Calgary", "Airdrie", "Cochrane", "Okotoks", "Chestermere", "Canada"]
  };
}

export function localBusinessSchema() {
  return {
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: "Nebrex Automations",
    url: siteUrl,
    telephone: "+14032200220",
    email: brand.emailLabel,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Calgary",
      addressRegion: "AB",
      addressCountry: "CA"
    },
    areaServed: ["Calgary", "Airdrie", "Cochrane", "Okotoks", "Chestermere", "Canada"],
    sameAs: []
  };
}

export function serviceSchema(name: string, description: string, url: string, areaServed = "Calgary, Alberta") {
  return {
    "@type": "Service",
    name,
    description,
    url,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function articleSchema(article: ResourceArticle) {
  return {
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: canonical(`/resources/${article.slug}/`)
  };
}

export const solutionPages = [
  {
    slug: "hvac",
    eyebrow: "HVAC lead response",
    title: "HVAC AI Automation & Lead Response | Nebrex Calgary",
    description: "Lead response, missed-call text back, booking handoff, and follow-up systems for Calgary HVAC companies that need faster customer communication.",
    h1: "HVAC lead response systems for Calgary companies",
    intro: "Nebrex helps HVAC teams respond faster to urgent calls, seasonal demand, quote requests, and after-hours inquiries without adding more manual admin.",
    heroList: ["Emergency call recovery", "Seasonal demand intake", "Install quote follow-up", "Booking handoff clarity"],
    problems: [
      "Emergency inquiries arrive when the office is busy or closed.",
      "Install quotes lose momentum when follow-up depends on memory.",
      "Maintenance requests and seasonal spikes create messy handoffs.",
      "Customers compare multiple HVAC companies before anyone replies."
    ],
    setup: [
      "AI website chat that answers common questions and captures service details.",
      "Lead forms that collect job type, urgency, location, and contact information.",
      "Missed-call text back for callers who do not reach your team.",
      "Follow-up messages for estimates, maintenance plans, and booking next steps.",
      "Team alerts so the right person sees the right inquiry quickly."
    ],
    matters: [
      "HVAC demand is often urgent, so response speed affects trust.",
      "Clear intake helps your team understand whether it is repair, replacement, or maintenance.",
      "Consistent follow-up keeps install and quote conversations moving."
    ],
    rollout: ["Audit current calls, forms, and booking handoffs.", "Build the intake and follow-up flow.", "Test messages with your team before launch.", "Refine based on real inquiries."],
    fit: "Best for HVAC companies in Calgary that want faster lead response, cleaner estimate follow-up, and less manual coordination during busy seasons.",
    packages: [
      { label: "Nebrex Capture", href: "/packages/capture/" },
      { label: "Nebrex Flow", href: "/packages/flow/" },
      { label: "Nebrex Growth", href: "/packages/growth/" }
    ],
    faqs: [
      { question: "Can Nebrex help with after-hours HVAC inquiries?", answer: "Yes. Nebrex can set up chat, lead forms, and missed-call text back so urgent inquiries are captured even when your team is not immediately available." },
      { question: "Will this replace our dispatcher?", answer: "No. The goal is to support your team with cleaner details, faster handoffs, and more consistent follow-up." },
      { question: "Can the system separate repair and replacement leads?", answer: "Yes. Intake questions can ask about job type, urgency, equipment, location, and preferred contact method." },
      { question: "Which package fits HVAC companies best?", answer: "Most HVAC teams start with Nebrex Capture or Nebrex Growth if they want website, lead capture, and follow-up connected together." }
    ]
  },
  {
    slug: "plumbing",
    eyebrow: "Plumbing lead response",
    title: "Plumbing Missed-Call & Follow-Up Automation | Nebrex Calgary",
    description: "Missed-call text back, urgent inquiry intake, quote follow-up, and review request systems for Calgary plumbing businesses.",
    h1: "Plumbing follow-up systems for missed calls and urgent leads",
    intro: "Nebrex helps plumbing companies capture urgent requests, respond faster, and keep service or quote conversations moving without relying on manual chasing.",
    heroList: ["Missed-call text back", "Emergency intake routing", "Quote follow-up", "Review request workflows"],
    problems: [
      "Customers call multiple plumbers when the issue feels urgent.",
      "Missed calls can turn into lost jobs quickly.",
      "Quote follow-up gets inconsistent during busy service days.",
      "Review requests often get forgotten after successful work."
    ],
    setup: [
      "Website chat and forms for urgent or non-urgent plumbing requests.",
      "Missed-call text back with a clear next step.",
      "Qualification questions for leak, drain, repair, install, and maintenance requests.",
      "Quote and appointment follow-up messages.",
      "Review request workflows after completed service."
    ],
    matters: [
      "Plumbing customers usually want a fast, clear response.",
      "Better intake reduces back-and-forth before a job is booked.",
      "Consistent follow-up helps keep quote and service opportunities from going cold."
    ],
    rollout: ["Review missed calls and form inquiries.", "Map urgent and routine request paths.", "Set up messages and team alerts.", "Launch, measure, and refine."],
    fit: "Best for Calgary plumbing companies that want fewer missed calls, faster customer handoff, and more consistent follow-up after first contact.",
    packages: [
      { label: "Nebrex Capture", href: "/packages/capture/" },
      { label: "Nebrex Flow", href: "/packages/flow/" },
      { label: "Nebrex Growth", href: "/packages/growth/" }
    ],
    faqs: [
      { question: "Can missed-call text back work for plumbing calls?", answer: "Yes. Nebrex can create a simple response path so missed callers receive a quick text and a way to share job details." },
      { question: "Can urgent jobs be separated from routine requests?", answer: "Yes. Intake questions can route leaks, backups, and urgent repairs differently from quotes or maintenance requests." },
      { question: "Can this help with review requests?", answer: "Yes. Nebrex Flow can include review request timing after a job is complete." },
      { question: "Do we need new software?", answer: "Not always. Nebrex starts with your current tools and connects the simplest system that improves response and follow-up." }
    ]
  },
  {
    slug: "roofing",
    eyebrow: "Roofing estimate follow-up",
    title: "Roofing Estimate Follow-Up & Lead Capture | Nebrex Calgary",
    description: "Lead capture, storm-demand intake, estimate follow-up, and customer update systems for Calgary roofing companies.",
    h1: "Roofing lead capture and estimate follow-up for Calgary roofers",
    intro: "Nebrex helps roofing companies handle seasonal demand, estimate requests, storm inquiries, and customer follow-up with a clearer front-office system.",
    heroList: ["Storm demand intake", "Estimate request capture", "Quote follow-up", "Customer update paths"],
    problems: [
      "Roofing demand can arrive in waves after weather events.",
      "Estimate requests need enough detail before the team can respond well.",
      "Customers may compare roofers while waiting for follow-up.",
      "Project updates and review requests can become manual and inconsistent."
    ],
    setup: [
      "Website lead capture for repair, replacement, inspection, and emergency inquiries.",
      "Qualification questions for roof type, issue, location, and urgency.",
      "Team alerts for high-priority requests.",
      "Estimate follow-up sequences that keep conversations warm.",
      "Review and update workflows after project milestones."
    ],
    matters: [
      "Roofing buyers often make decisions after comparing trust, speed, and clarity.",
      "Better forms reduce incomplete estimate requests.",
      "Follow-up helps serious prospects take the next step instead of drifting away."
    ],
    rollout: ["Audit current estimate and inquiry paths.", "Build roofing-specific intake questions.", "Connect follow-up and team alerts.", "Refine messages after real lead data."],
    fit: "Best for Calgary roofing companies that want cleaner estimate requests, faster response, and more consistent follow-up during seasonal demand.",
    packages: [
      { label: "Nebrex Presence", href: "/packages/presence/" },
      { label: "Nebrex Capture", href: "/packages/capture/" },
      { label: "Nebrex Growth", href: "/packages/growth/" }
    ],
    faqs: [
      { question: "Can Nebrex help roofing companies with estimate requests?", answer: "Yes. Nebrex can build lead capture paths that collect the details your team needs before following up." },
      { question: "Can the system handle storm-related demand?", answer: "It can help capture and sort demand so urgent inquiries and estimate requests do not get buried." },
      { question: "Does this include a new website?", answer: "Nebrex Presence and Growth can include website improvements. Capture and Flow can also be added to an existing site." },
      { question: "Can follow-up be customized for roofing quotes?", answer: "Yes. Follow-up can be written around inspections, estimates, project timing, and next steps." }
    ]
  },
  {
    slug: "electrical",
    eyebrow: "Electrical intake systems",
    title: "Electrical Lead Intake & Follow-Up Systems | Nebrex Calgary",
    description: "Structured lead intake, dispatch handoff, quote follow-up, and customer communication systems for Calgary electrical businesses.",
    h1: "Electrical lead intake and follow-up systems for Calgary teams",
    intro: "Nebrex helps electrical businesses capture better job details, respond faster, and follow up more consistently for residential and light commercial work.",
    heroList: ["Job-type qualification", "Dispatch handoff clarity", "Quote follow-up", "Customer update messages"],
    problems: [
      "Electrical inquiries can vary from quick service calls to larger quote requests.",
      "Incomplete job details slow down scheduling and response.",
      "Follow-up after quotes can become inconsistent.",
      "Teams need a cleaner way to hand off urgent or high-value inquiries."
    ],
    setup: [
      "Lead forms and chat questions for job type, urgency, property type, and location.",
      "Team alerts for urgent or high-value requests.",
      "Quote follow-up for residential and light commercial jobs.",
      "Customer update and reminder messages.",
      "Review request workflows after completed work."
    ],
    matters: [
      "Electrical customers need confidence that the job is understood.",
      "Better intake saves time before scheduling.",
      "Consistent follow-up keeps quotes and next steps from slipping."
    ],
    rollout: ["Map current inquiry types.", "Create qualification and routing logic.", "Set up follow-up and customer updates.", "Review and improve after launch."],
    fit: "Best for Calgary electrical companies that want clearer inquiry details, better response speed, and more reliable quote follow-up.",
    packages: [
      { label: "Nebrex Capture", href: "/packages/capture/" },
      { label: "Nebrex Flow", href: "/packages/flow/" },
      { label: "Nebrex Growth", href: "/packages/growth/" }
    ],
    faqs: [
      { question: "Can Nebrex separate service calls from quote requests?", answer: "Yes. Intake questions can identify the type of electrical request and capture details before your team follows up." },
      { question: "Can this work for residential and commercial jobs?", answer: "Yes. The system can include property type and job-type questions to support both residential and light commercial work." },
      { question: "Can customers get reminders or updates?", answer: "Yes. Nebrex Flow can include reminders, updates, and follow-up messages based on the customer journey." },
      { question: "Which package fits electrical companies best?", answer: "Nebrex Capture is useful for faster intake, while Nebrex Growth connects the website, lead capture, and follow-up together." }
    ]
  }
];

export type SolutionPage = (typeof solutionPages)[number];

export const resourceArticles = [
  {
    slug: "stop-losing-leads-after-hours-calgary",
    title: "How Calgary Small Businesses Can Stop Losing Leads After Hours",
    description: "A practical guide for Calgary small businesses that want to capture after-hours inquiries and follow up before leads go cold.",
    date: "2026-05-01",
    h1: "How Calgary small businesses can stop losing leads after hours",
    intro: "After-hours inquiries are easy to miss because the customer is ready now, but your team may not be. The fix is not always hiring more people. Many small businesses need a clearer capture and follow-up path.",
    sections: [
      { heading: "Why after-hours leads go cold", paragraphs: ["Customers often search in the evening after work, on weekends, or during urgent moments. If they call, fill out a form, or open chat and nothing happens until the next business day, the momentum drops.", "The business may still be great, but the response path feels slow. A simple system can acknowledge the inquiry, collect useful details, and prepare the team for a better follow-up."] },
      { heading: "What to set up first", paragraphs: ["Start with the points where people already try to reach you. That usually means website forms, phone calls, chat, and booking links. The goal is to make the next step obvious and make sure every inquiry lands somewhere your team can act on.", "For many Calgary service businesses, the first useful setup is missed-call text back, a short website chat flow, and an internal alert that includes the customer's need, location, and urgency."] },
      { heading: "Keep it human", paragraphs: ["Automation should not pretend to be a full replacement for your team. It should help customers feel heard and help staff start the next conversation with context.", "A good system says what it can do, captures the right information, and hands the lead to a real person clearly."] },
      { heading: "Where Nebrex fits", paragraphs: ["Nebrex Capture is built for this exact gap: new inquiries, faster replies, and cleaner lead details. If the website and follow-up also need work, Nebrex Growth connects the pieces into one front-office system."] }
    ],
    links: [
      { label: "Nebrex Capture", href: "/packages/capture/" },
      { label: "HVAC lead response", href: "/solutions/hvac/" }
    ],
    cta: "Book a Call"
  },
  {
    slug: "website-mistakes-cost-local-service-businesses-jobs",
    title: "Website Mistakes That Cost Local Service Businesses Real Jobs",
    description: "Common website issues that make local customers hesitate, leave, or contact a competitor instead.",
    date: "2026-05-01",
    h1: "Website mistakes that cost local service businesses real jobs",
    intro: "A website does not need to be flashy to work. For local service businesses, it needs to build trust quickly, explain the service clearly, and make the next step easy.",
    sections: [
      { heading: "The website looks fine, but does not guide action", paragraphs: ["Many small-business websites look acceptable at a glance but fail at the moment that matters. Visitors do not know which service fits, what area is served, or what to do next.", "The fix is stronger page structure: clear service pages, direct calls to action, contact paths, trust signals, and mobile-friendly content."] },
      { heading: "Mobile friction matters", paragraphs: ["Local customers often browse from a phone. If buttons are hard to tap, phone numbers are not clear, or forms feel awkward, the business can lose real inquiries.", "Mobile optimization is not only a design issue. It is a lead capture issue."] },
      { heading: "Trust signals are too weak", paragraphs: ["Customers want to know the business is real, local, and capable. Clear service descriptions, examples, contact details, and practical proof all reduce hesitation.", "Small businesses do not need corporate language. They need clarity and confidence."] },
      { heading: "Where Nebrex fits", paragraphs: ["Nebrex Presence focuses on the website foundation: better structure, stronger calls to action, local SEO basics, and a more professional first impression."] }
    ],
    links: [
      { label: "Nebrex Presence", href: "/packages/presence/" },
      { label: "Roofing lead capture", href: "/solutions/roofing/" }
    ],
    cta: "Start with Presence"
  },
  {
    slug: "what-ai-chat-can-do-small-business-website",
    title: "What AI Chat Can Actually Do for a Small Business Website",
    description: "A clear, practical look at how AI chat can help small businesses capture leads without making the experience feel robotic.",
    date: "2026-05-01",
    h1: "What AI chat can actually do for a small business website",
    intro: "AI chat should not be treated like a magic trick. Used well, it is a practical intake tool that helps visitors get answers, share details, and take the next step.",
    sections: [
      { heading: "It can answer common questions", paragraphs: ["Most businesses answer the same questions every week: services, location, timing, pricing basics, booking steps, and what happens next. Chat can handle these simple questions while keeping the tone clear and helpful.", "The goal is not to overpromise. The goal is to remove friction."] },
      { heading: "It can qualify leads", paragraphs: ["A useful chat flow can ask about service type, urgency, location, budget range, and preferred contact method. That gives your team better context before they respond.", "This is especially helpful when inquiries arrive after hours or during busy workdays."] },
      { heading: "It should hand off clearly", paragraphs: ["The best small-business chat systems know when to stop and hand off. If a customer needs a quote, booking, or custom answer, the chat should capture details and send the lead to the right place.", "Human-reviewed setup matters because the experience should sound like your business, not a generic bot."] },
      { heading: "Where Nebrex fits", paragraphs: ["Nebrex Capture includes chatbot setup, lead capture, qualification questions, and contact handoff. It is designed for practical lead response, not hype."] }
    ],
    links: [
      { label: "Nebrex Capture", href: "/packages/capture/" },
      { label: "Electrical intake systems", href: "/solutions/electrical/" }
    ],
    cta: "Capture More Leads"
  },
  {
    slug: "missed-call-text-back-contractors",
    title: "How Missed-Call Text Back Helps Contractors Win More Jobs",
    description: "Why missed-call text back can help contractors respond faster and recover leads that would otherwise move on.",
    date: "2026-05-01",
    h1: "How missed-call text back helps contractors win more jobs",
    intro: "Contractors miss calls because they are on job sites, with customers, driving, or handling urgent work. The problem is that customers do not always wait.",
    sections: [
      { heading: "Speed creates trust", paragraphs: ["A quick text after a missed call tells the customer the business is active and paying attention. Even if a person follows up later, the customer has a clear next step right away.", "That small response can be the difference between staying in the conversation and losing the lead."] },
      { heading: "Text back should collect useful details", paragraphs: ["The message should not only say sorry we missed you. It should help the customer share what they need, where they are located, and how urgent the request is.", "This gives the team better information before calling back."] },
      { heading: "Keep the workflow simple", paragraphs: ["The best setup is easy for staff to understand. Missed call, quick text, customer reply, team alert, follow-up. No complicated dashboard should be required for the first version to help.", "That is why a practical system beats a pile of disconnected tools."] },
      { heading: "Where Nebrex fits", paragraphs: ["Nebrex Capture and Nebrex Flow can work together for missed-call recovery and follow-up. For contractors who also need better website conversion, Nebrex Growth connects the full path."] }
    ],
    links: [
      { label: "Nebrex Flow", href: "/packages/flow/" },
      { label: "Plumbing missed-call automation", href: "/solutions/plumbing/" }
    ],
    cta: "Improve Follow-Up"
  },
  {
    slug: "follow-up-process-costing-leads",
    title: "Signs Your Small Business Follow-Up Process Is Costing You Leads",
    description: "How to spot follow-up gaps that cause quotes, inquiries, and customer next steps to go cold.",
    date: "2026-05-01",
    h1: "Signs your small business follow-up process is costing you leads",
    intro: "Most follow-up problems are quiet. A lead comes in, someone replies once, and then the next step depends on memory, timing, or a busy staff member.",
    sections: [
      { heading: "Quotes are not followed up consistently", paragraphs: ["If quotes sit without a clear next message, customers may assume the business is too busy or not interested. A simple quote follow-up flow keeps the conversation alive without making staff chase manually every time.", "The message should be polite, useful, and timed around the customer journey."] },
      { heading: "Customers ask the same status questions", paragraphs: ["Repeated status questions can mean the process is unclear. Updates, reminders, and simple next-step messages can reduce confusion and make the business feel more organized.", "This is not about more messages. It is about better-timed communication."] },
      { heading: "Reviews are requested randomly", paragraphs: ["Happy customers are most likely to leave reviews when the timing is right and the request is easy. If review requests only happen when someone remembers, the business misses trust-building opportunities.", "A light workflow can make this more consistent."] },
      { heading: "Where Nebrex fits", paragraphs: ["Nebrex Flow is built for follow-through: appointment reminders, quote follow-up, customer updates, review requests, team alerts, and simple triggers."] }
    ],
    links: [
      { label: "Nebrex Flow", href: "/packages/flow/" },
      { label: "Roofing estimate follow-up", href: "/solutions/roofing/" }
    ],
    cta: "Start with Flow"
  },
  {
    slug: "automating-lead-response-without-losing-human-touch",
    title: "Automating Lead Response Without Losing the Human Touch",
    description: "A practical guide to using automation for faster replies while keeping customer communication clear and human.",
    date: "2026-05-01",
    h1: "Automating lead response without losing the human touch",
    intro: "Small businesses do not want to sound robotic. They want customers to feel heard while the team saves time and responds faster.",
    sections: [
      { heading: "Automate the handoff, not the relationship", paragraphs: ["The first job of automation is to acknowledge the inquiry, collect details, and send the right information to the team. It should make the real conversation easier.", "Customers can tell when a system is trying too hard. Clear and simple usually wins."] },
      { heading: "Use plain language", paragraphs: ["Avoid overbuilt scripts and technical language. Ask useful questions, explain the next step, and keep expectations honest.", "For local businesses, the best messaging feels like a helpful front desk, not a tech demo."] },
      { heading: "Review the system regularly", paragraphs: ["Lead response should improve over time. If customers ask the same question repeatedly, update the website or chat. If follow-up drops at the same step, adjust the workflow.", "That is how automation becomes a system that actually gets used."] },
      { heading: "Where Nebrex fits", paragraphs: ["Nebrex Growth connects website clarity, lead capture, and follow-up so the whole front-office path works together. Nebrex Partner adds ongoing refinement for businesses that want more support."] }
    ],
    links: [
      { label: "Nebrex Growth", href: "/packages/growth/" },
      { label: "HVAC automation", href: "/solutions/hvac/" }
    ],
    cta: "Build My Growth System"
  }
];

export type ResourceArticle = (typeof resourceArticles)[number];

export const locationPages = [
  {
    slug: "airdrie",
    city: "Airdrie",
    title: "Website & AI Automation for Airdrie Businesses | Nebrex",
    description: "Website, lead capture, AI chat, and follow-up systems for Airdrie small businesses that want clearer customer communication.",
    h1: "Website and AI systems for Airdrie small businesses",
    intro: "Nebrex helps Airdrie businesses improve how they look online, respond to new inquiries faster, and follow up more consistently without adding more admin work.",
    framing: "Airdrie businesses often serve both local customers and nearby Calgary-area demand, so the website needs to make service areas, contact paths, and response expectations clear.",
    emphasis: ["Service-area clarity", "Fast inquiry response", "Review and reputation support", "Simple systems that fit a growing local team"],
    faq: [
      { question: "Does Nebrex work with Airdrie businesses?", answer: "Yes. Nebrex serves Airdrie businesses that want stronger websites, lead capture, AI chat, and follow-up systems." },
      { question: "Can the website show Airdrie and Calgary service areas?", answer: "Yes. Service-area language can be written clearly so customers know where you work without making the site feel generic." },
      { question: "Which package fits Airdrie businesses?", answer: "Many start with Nebrex Presence for website clarity or Nebrex Growth if response and follow-up also need improvement." }
    ]
  },
  {
    slug: "cochrane",
    city: "Cochrane",
    title: "Website & Lead Response Systems for Cochrane Businesses",
    description: "Practical website, lead response, and follow-up systems for Cochrane small businesses serving local and Calgary-area customers.",
    h1: "Lead response systems for Cochrane small businesses",
    intro: "Nebrex helps Cochrane businesses create a cleaner online presence and a faster path from inquiry to real conversation.",
    framing: "Cochrane customers often value local trust and clear service expectations. A simple website and follow-up system can help a business feel more organized before the first call.",
    emphasis: ["Local trust and service clarity", "Better mobile inquiry paths", "Follow-up for quotes and consultations", "Simple customer communication"],
    faq: [
      { question: "Can Nebrex help a Cochrane business look more professional online?", answer: "Yes. Nebrex Presence focuses on a clearer website, mobile optimization, service pages, and stronger calls to action." },
      { question: "Can follow-up help quote-based businesses in Cochrane?", answer: "Yes. Nebrex Flow can support quote follow-up, reminders, customer updates, and review requests." },
      { question: "Do I need a complicated automation setup?", answer: "No. Nebrex starts with the simplest useful system and expands only when it makes sense." }
    ]
  },
  {
    slug: "okotoks",
    city: "Okotoks",
    title: "Small Business Website & Automation Support in Okotoks",
    description: "Website, AI chat, lead capture, and follow-up systems for Okotoks businesses that want fewer missed opportunities.",
    h1: "Website and follow-up systems for Okotoks businesses",
    intro: "Nebrex helps Okotoks small businesses make the first impression clearer, capture more useful inquiries, and keep customer communication moving.",
    framing: "For Okotoks service and appointment-based businesses, the biggest opportunity is often not more tools. It is making the website, contact path, and follow-up work together.",
    emphasis: ["Cleaner website structure", "Lead capture for service inquiries", "Appointment and quote follow-up", "Customer communication that feels organized"],
    faq: [
      { question: "Does Nebrex serve Okotoks businesses?", answer: "Yes. Nebrex works with Okotoks small businesses that want better websites, faster response, and more consistent follow-up." },
      { question: "Can Nebrex help appointment-based businesses?", answer: "Yes. Systems can support booking handoff, reminders, lead capture, and customer updates." },
      { question: "Can I start with only the website?", answer: "Yes. Nebrex Presence is the best starting point when the website is the main issue." }
    ]
  },
  {
    slug: "chestermere",
    city: "Chestermere",
    title: "Website, AI Chat & Follow-Up for Chestermere Businesses",
    description: "Simple growth systems for Chestermere businesses that need a better website, faster replies, and clearer customer follow-up.",
    h1: "Website, chat, and follow-up systems for Chestermere businesses",
    intro: "Nebrex helps Chestermere businesses build practical systems that improve first impressions, capture inquiries, and reduce manual follow-up.",
    framing: "Chestermere businesses often compete for attention across local and Calgary-area searches. Clear service pages, fast replies, and consistent follow-up help customers choose with more confidence.",
    emphasis: ["Local and Calgary-area positioning", "AI chat for common questions", "Missed-call and form response", "Follow-up that supports trust"],
    faq: [
      { question: "Can Nebrex support Chestermere and Calgary-area positioning?", answer: "Yes. The website can explain your local service area clearly while keeping the customer journey simple." },
      { question: "Can AI chat answer common customer questions?", answer: "Yes. Nebrex Capture can set up human-reviewed chat for common questions, qualification, and handoff." },
      { question: "What is the best package for a connected setup?", answer: "Nebrex Growth is the main package when you want website, lead capture, and follow-up working together." }
    ]
  }
];

export type LocationPage = (typeof locationPages)[number];
