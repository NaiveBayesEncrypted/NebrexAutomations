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
    areaServed: ["Calgary", "Airdrie", "Cochrane", "Okotoks", "Chestermere", "Canada"]
  };
}

export function serviceSchema(name: string, description: string, url: string, areaServed = "Calgary, Alberta") {
  return {
    "@type": "Service",
    name,
    description,
    url,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: typeof areaServed === "string" ? { "@type": "Place", name: areaServed } : areaServed
  };
}

export function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Nebrex Automations",
    publisher: { "@id": `${siteUrl}/#organization` }
  };
}

export function webPageSchema(name: string, description: string, url: string) {
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` }
  };
}

export function aboutPageSchema(name: string, description: string, url: string) {
  return {
    ...webPageSchema(name, description, url),
    "@type": "AboutPage"
  };
}

export function contactPageSchema(name: string, description: string, url: string) {
  return {
    ...webPageSchema(name, description, url),
    "@type": "ContactPage"
  };
}

export function contactPointSchema() {
  return {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: "+14032200220",
    email: brand.emailLabel,
    areaServed: "CA",
    availableLanguage: ["English"]
  };
}

export function collectionPageSchema(name: string, description: string, url: string) {
  return {
    ...webPageSchema(name, description, url),
    "@type": "CollectionPage"
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function offerCatalogSchema(name: string, description: string, url: string, offers: { name: string; description: string; href: string; price?: { setup?: string; monthly?: string } }[]) {
  const priceValue = (value?: string) => value?.replace(/[^0-9.]/g, "") || "";

  return {
    "@type": "OfferCatalog",
    name,
    description,
    url,
    itemListElement: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      description: offer.description,
      url: canonical(offer.href),
      priceSpecification: [
        priceValue(offer.price?.setup)
          ? {
              "@type": "UnitPriceSpecification",
              name: "Setup",
              priceCurrency: "CAD",
              price: priceValue(offer.price?.setup)
            }
          : null,
        priceValue(offer.price?.monthly)
          ? {
              "@type": "UnitPriceSpecification",
              name: "Monthly support",
              priceCurrency: "CAD",
              price: priceValue(offer.price?.monthly)
            }
          : null
      ].filter(Boolean)
    }))
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
  },
  {
    slug: "calgary-contractor-website-checklist",
    title: "Calgary Contractor Website Checklist for More Leads",
    description: "A practical website checklist for Calgary contractors that want more calls, clearer quote requests, and stronger trust from local customers.",
    date: "2026-05-01",
    h1: "Calgary contractor website checklist for more leads",
    intro: "A contractor website should do more than look clean. It should help a local customer understand the service, trust the business, and take the next step without confusion.",
    sections: [
      { heading: "Make the service obvious in five seconds", paragraphs: ["Many contractor websites make visitors work too hard to understand what the company does. The homepage should quickly show the main services, service area, and best next step.", "For Calgary contractors, that usually means plain service language, a clear phone or form path, and pages that match how customers search for help."] },
      { heading: "Build pages around real buying questions", paragraphs: ["A good service page should answer what is included, who it is for, what area is served, and how to request a quote. Short generic pages rarely build enough confidence.", "The best pages feel useful before a customer ever calls. They reduce hesitation and help your team receive better inquiries."] },
      { heading: "Treat mobile as the main experience", paragraphs: ["Contractor leads often come from a phone. Tap targets, form fields, sticky navigation, and visible calls to action matter because the visitor may be comparing options quickly.", "If the mobile experience feels slow or awkward, the business can lose the lead before the first conversation starts."] },
      { heading: "Where Nebrex fits", paragraphs: ["Nebrex Presence focuses on the website foundation: service pages, local SEO basics, mobile usability, stronger calls to action, and clearer lead paths."] }
    ],
    links: [
      { label: "Nebrex Presence", href: "/packages/presence/" },
      { label: "Roofing lead capture", href: "/solutions/roofing/" }
    ],
    cta: "Start with Presence"
  },
  {
    slug: "calgary-small-business-local-seo-foundation",
    title: "Local SEO Foundation for Calgary Small Businesses",
    description: "What Calgary small businesses should fix first for local SEO, including service pages, internal links, contact clarity, and useful content.",
    date: "2026-05-01",
    h1: "Local SEO foundation for Calgary small businesses",
    intro: "Local SEO is not only keywords. For a small business, it starts with a website that clearly explains what you do, where you work, and how customers can reach you.",
    sections: [
      { heading: "Start with service clarity", paragraphs: ["Search engines and customers both need clear pages. If your site only says what you do in a broad way, it becomes harder to match real local searches.", "Each core service should have enough detail to help a customer decide whether to contact you."] },
      { heading: "Make the location signal natural", paragraphs: ["Calgary should appear where it genuinely helps the user: service area copy, contact details, page titles, and local examples. Repeating city names in every sentence makes the page worse, not better.", "The strongest local pages sound like they were written for a real customer in the market."] },
      { heading: "Connect related pages", paragraphs: ["Internal links help visitors move from a general page to a specific service, package, or use case. They also help search engines understand which pages matter.", "A simple structure usually beats a large messy site."] },
      { heading: "Where Nebrex fits", paragraphs: ["Nebrex Presence helps small businesses build a clearer website foundation. Nebrex Growth connects that foundation to lead capture and follow-up so traffic has a better chance of turning into real inquiries."] }
    ],
    links: [
      { label: "Nebrex Growth", href: "/packages/growth/" },
      { label: "HVAC lead response", href: "/solutions/hvac/" }
    ],
    cta: "See Packages"
  },
  {
    slug: "how-fast-should-small-business-respond-to-leads",
    title: "How Fast Should a Small Business Respond to New Leads?",
    description: "A practical lead response guide for small businesses that want fewer missed opportunities and better first conversations.",
    date: "2026-05-01",
    h1: "How fast should a small business respond to new leads?",
    intro: "The honest answer is simple: faster than the customer loses momentum. For local businesses, slow response often turns a warm inquiry into a lost opportunity.",
    sections: [
      { heading: "Speed is part of the customer experience", paragraphs: ["When someone fills out a form, opens chat, or calls your business, they are already in motion. A fast acknowledgement tells them the business is organized and paying attention.", "Even a simple message that confirms the inquiry and explains the next step can keep the conversation alive."] },
      { heading: "Not every lead needs the same response", paragraphs: ["An emergency repair request needs different handling than a general estimate or consultation. The system should capture urgency, service type, and preferred contact method so the team knows what to do first.", "Better intake helps staff respond with context instead of starting from zero."] },
      { heading: "The goal is consistency", paragraphs: ["Fast once in a while is not enough. The business needs a repeatable path for calls, forms, chat, and follow-up so leads do not depend on whoever happens to be available.", "That is where simple automation can support the team without replacing the human conversation."] },
      { heading: "Where Nebrex fits", paragraphs: ["Nebrex Capture helps businesses respond faster to new inquiries. Nebrex Flow helps keep the next steps moving after the first contact."] }
    ],
    links: [
      { label: "Nebrex Capture", href: "/packages/capture/" },
      { label: "Plumbing missed-call automation", href: "/solutions/plumbing/" }
    ],
    cta: "Start with Capture"
  },
  {
    slug: "best-website-pages-for-local-service-business",
    title: "Best Website Pages for a Local Service Business",
    description: "The core website pages local service businesses need to build trust, explain services, and turn more visitors into leads.",
    date: "2026-05-01",
    h1: "Best website pages for a local service business",
    intro: "A local service business does not need a giant website to get started. It needs the right pages, written clearly, with a direct path from interest to contact.",
    sections: [
      { heading: "Homepage", paragraphs: ["The homepage should make the offer clear, show who the business helps, and guide visitors to the next step. It should not try to explain every detail at once.", "Think of it as the front desk of the website: clear, calm, and easy to act on."] },
      { heading: "Service pages", paragraphs: ["Service pages are where customers decide whether the business fits their need. Each page should explain the service, common situations, service area, and how to request help.", "These pages are also important for local SEO because they match specific searches better than one broad services page."] },
      { heading: "About and proof pages", paragraphs: ["Customers want to know who is behind the business and whether it can be trusted. An About page, customer examples, or project-style proof can make the company feel more real.", "Do not invent proof. Use grounded experience, client examples, process clarity, and practical detail."] },
      { heading: "Where Nebrex fits", paragraphs: ["Nebrex Presence builds the key website structure. Nebrex Growth adds lead response and follow-up so the pages do more than sit online."] }
    ],
    links: [
      { label: "Nebrex Presence", href: "/packages/presence/" },
      { label: "Electrical intake systems", href: "/solutions/electrical/" }
    ],
    cta: "Upgrade My Website"
  },
  {
    slug: "quote-follow-up-system-for-contractors",
    title: "Quote Follow-Up System for Contractors",
    description: "How contractors can follow up on quotes without sounding pushy or relying on manual reminders.",
    date: "2026-05-01",
    h1: "Quote follow-up system for contractors",
    intro: "A quote is not finished when it is sent. For many contractors, the follow-up is where serious customers either move forward or quietly drift away.",
    sections: [
      { heading: "Why quotes go cold", paragraphs: ["Customers get busy, compare options, or forget the next step. If the business waits too long or never follows up, the quote loses momentum.", "A clear follow-up system keeps the conversation helpful instead of pushy."] },
      { heading: "What a good follow-up includes", paragraphs: ["The best follow-up reminds the customer what was discussed, offers to answer questions, and gives a simple next step. It should sound like a real business checking in, not a generic sales blast.", "Timing matters. One useful message soon after the quote and another later can be enough for many small teams."] },
      { heading: "Use alerts for high-value work", paragraphs: ["Some opportunities deserve faster attention. Larger jobs, urgent requests, or repeat customers can trigger a team alert so they do not sit in a general inbox.", "This helps staff focus without manually tracking every lead from memory."] },
      { heading: "Where Nebrex fits", paragraphs: ["Nebrex Flow is built for quote follow-up, reminders, customer updates, and review requests. Nebrex Growth connects the website and lead capture before the quote even happens."] }
    ],
    links: [
      { label: "Nebrex Flow", href: "/packages/flow/" },
      { label: "Roofing estimate follow-up", href: "/solutions/roofing/" }
    ],
    cta: "Start with Flow"
  },
  {
    slug: "ai-chatbot-for-calgary-service-businesses",
    title: "AI Chatbot for Calgary Service Businesses: What to Set Up First",
    description: "A practical setup guide for Calgary service businesses considering an AI chatbot for website questions, lead capture, and handoff.",
    date: "2026-05-01",
    h1: "AI chatbot for Calgary service businesses: what to set up first",
    intro: "An AI chatbot should help customers take the next step faster. For Calgary service businesses, the best first version is usually simple, clear, and focused on lead capture.",
    sections: [
      { heading: "Start with common questions", paragraphs: ["List the questions your team answers every week: service areas, timing, job types, booking steps, pricing basics, and what information is needed for a quote.", "Those answers should be reviewed and written in plain language before the chatbot goes live."] },
      { heading: "Add qualification questions", paragraphs: ["A chatbot becomes more valuable when it captures useful details. Ask what the customer needs, where they are located, how urgent it is, and how they prefer to be contacted.", "The goal is to help the team respond better, not to interrogate the customer."] },
      { heading: "Create a clean handoff", paragraphs: ["The chatbot should know when to send the inquiry to a person. If the visitor needs pricing, booking, or a specific answer, the system should collect details and trigger the right next step.", "A good handoff makes the business feel responsive and organized."] },
      { heading: "Where Nebrex fits", paragraphs: ["Nebrex Capture includes AI chatbot setup, lead capture forms, qualification questions, and booking or contact handoff."] }
    ],
    links: [
      { label: "Nebrex Capture", href: "/packages/capture/" },
      { label: "HVAC lead response", href: "/solutions/hvac/" }
    ],
    cta: "Capture More Leads"
  },
  {
    slug: "google-business-profile-and-website-work-together",
    title: "How Your Website and Google Business Profile Should Work Together",
    description: "How local businesses can connect Google Business Profile visibility with a website that turns searchers into real inquiries.",
    date: "2026-05-01",
    h1: "How your website and Google Business Profile should work together",
    intro: "A Google Business Profile can help people find you, but the website often decides whether they trust you enough to call, book, or request a quote.",
    sections: [
      { heading: "Keep the message consistent", paragraphs: ["Your services, service area, contact details, and business positioning should feel consistent between your profile and website. Mismatched information creates doubt.", "If a customer clicks from Google to the site, the next step should feel obvious."] },
      { heading: "Use the website to answer deeper questions", paragraphs: ["Your profile gives quick information. Your website should explain services, process, examples, FAQs, and contact options in more detail.", "That is especially important for quote-based or trust-heavy services where customers need more confidence before reaching out."] },
      { heading: "Make reviews easier to earn", paragraphs: ["A consistent review request process can support your profile over time. After a good job or customer interaction, the request should be timely, polite, and easy to follow.", "This is a follow-up problem as much as a marketing problem."] },
      { heading: "Where Nebrex fits", paragraphs: ["Nebrex Presence supports website clarity and local SEO basics. Nebrex Flow can support review requests and customer follow-up."] }
    ],
    links: [
      { label: "Nebrex Presence", href: "/packages/presence/" },
      { label: "Plumbing follow-up systems", href: "/solutions/plumbing/" }
    ],
    cta: "Start with Presence"
  },
  {
    slug: "small-business-automation-checklist",
    title: "Small Business Automation Checklist: What to Automate First",
    description: "A simple automation checklist for small businesses that want less manual admin without making operations complicated.",
    date: "2026-05-01",
    h1: "Small business automation checklist: what to automate first",
    intro: "Small businesses should not automate everything at once. The best starting point is the repetitive work that affects leads, customers, and follow-up.",
    sections: [
      { heading: "Start with lead capture", paragraphs: ["If new inquiries are messy, every later step becomes harder. Forms, chat, missed-call text back, and alerts should capture enough information for the team to act quickly.", "This is usually the highest-return place to start because it affects new revenue."] },
      { heading: "Automate simple follow-up", paragraphs: ["Appointment reminders, quote check-ins, review requests, and customer updates are strong early candidates. They are repetitive, easy to forget, and valuable when done consistently.", "Keep the messages short and useful."] },
      { heading: "Avoid overbuilding", paragraphs: ["A small business does not need a giant automation setup before the basics work. Start with one clear workflow, test it with real customers, and improve it over time.", "The best systems are the ones staff actually use."] },
      { heading: "Where Nebrex fits", paragraphs: ["Nebrex Flow handles follow-up workflows, while Nebrex Growth connects website, lead capture, and automation into one practical system."] }
    ],
    links: [
      { label: "Nebrex Growth", href: "/packages/growth/" },
      { label: "Electrical lead intake", href: "/solutions/electrical/" }
    ],
    cta: "Build My Growth System"
  },
  {
    slug: "online-booking-vs-contact-form-local-business",
    title: "Online Booking vs Contact Form: What Local Businesses Should Use",
    description: "How local businesses can choose between online booking, contact forms, chat, and phone calls without confusing customers.",
    date: "2026-05-01",
    h1: "Online booking vs contact form: what local businesses should use",
    intro: "The best contact path depends on how the business sells. Some customers are ready to book. Others need a quote, a call, or a few questions answered first.",
    sections: [
      { heading: "Use booking when the service is clear", paragraphs: ["Online booking works best when the service, timing, and next step are predictable. It can reduce back-and-forth and make the business feel easier to work with.", "If customers often need custom quotes, booking may need a qualification step first."] },
      { heading: "Use forms when details matter", paragraphs: ["A good contact form can collect service type, location, timeline, budget range, and job details. This helps the team reply with more context.", "The form should be short enough that people finish it, but specific enough that the lead is useful."] },
      { heading: "Use chat when visitors need help choosing", paragraphs: ["Chat can guide visitors who are not sure what they need yet. It can answer common questions and hand off when the conversation becomes specific.", "For many local businesses, the best setup includes more than one contact path."] },
      { heading: "Where Nebrex fits", paragraphs: ["Nebrex Capture helps businesses set up chat, forms, missed-call text back, and booking or contact handoff based on how customers actually buy."] }
    ],
    links: [
      { label: "Nebrex Capture", href: "/packages/capture/" },
      { label: "HVAC lead response", href: "/solutions/hvac/" }
    ],
    cta: "Start with Capture"
  },
  {
    slug: "review-request-system-for-local-business",
    title: "Review Request System for Local Businesses",
    description: "How local businesses can request more reviews consistently without making the customer experience feel awkward.",
    date: "2026-05-01",
    h1: "Review request system for local businesses",
    intro: "Good reviews are often earned during the work but lost after the work because no one asks at the right time. A simple review request system fixes that gap.",
    sections: [
      { heading: "Timing matters", paragraphs: ["The best time to ask is usually after a successful job, appointment, or customer outcome. Waiting too long makes the request feel less connected to the experience.", "A timely message can feel helpful and natural when the customer is happy."] },
      { heading: "Make the request easy", paragraphs: ["Customers are more likely to leave a review when the link is clear, the message is short, and the request does not feel demanding.", "The message should sound like the business, not like a generic marketing template."] },
      { heading: "Connect reviews to follow-up", paragraphs: ["Review requests work best as part of a broader follow-up process. Customer updates, completion messages, and review requests should feel connected.", "That makes the business feel organized from first inquiry to finished work."] },
      { heading: "Where Nebrex fits", paragraphs: ["Nebrex Flow can include review requests, customer update messages, and team alerts. Nebrex Partner can refine the process month after month."] }
    ],
    links: [
      { label: "Nebrex Flow", href: "/packages/flow/" },
      { label: "Plumbing lead response", href: "/solutions/plumbing/" }
    ],
    cta: "Improve Follow-Up"
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
