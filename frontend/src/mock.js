// Centralized MOCK data for the portfolio.
// Later, this can be swapped to backend APIs without touching UI logic.

export const profile = {
  name: "Rituraj Rituraj",
  roleTagline: "Branding & Marketing — Strategy, Research, and Creative Direction",
  location: "Villeurbanne, France",
  email: "singhrituraj782@gmail.com",
  phone: "+33-0672980260",
  address: "4 Rue Burais, Villeurbanne",
  summary:
    "Master in Management student at emlyon business school with hands-on experience in brand strategy, consumer research, and data-driven marketing decisions. I translate customer insights into clear positioning, messaging, and execution.",
  availability: "Internship (Branding / Brand Strategy) — Starting March",

  // Assets
  photoUrl:
    "https://customer-assets.emergentagent.com/job_artfolio-118/artifacts/u841goea_ae278b49-c13b-4fa5-84c7-cbbca4ff075e.JPG",
  resumeUrl:
    "https://customer-assets.emergentagent.com/job_b9ee181e-369a-4019-80f3-ae9b35c0c8c9/artifacts/xvjziauj_BRANDIN%20CV_%20Rituraj%20Rituraj%202026.pdf",

  social: {
    email: "mailto:singhrituraj782@gmail.com",
    linkedin: "https://www.linkedin.com/in/rituraj-rituraj-352bba229/",
    behance: "#",
  },
};

export const navigation = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Resume", href: "#resume" },
  { label: "Blog", href: "#blog" },
  { label: "Visual Diary", href: "#visual-diary" },
  { label: "Motion Design", href: "#motion" },
  { label: "Interests", href: "#interests" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  {
    title: "Brand Positioning",
    description:
      "Define who we’re for, what we stand for, and how we win. Clear differentiation, simple language.",
    bullets: ["Competitor scan", "Audience segmentation", "Positioning statement"],
  },
  {
    title: "Consumer & User Research",
    description:
      "Lightweight research that still feels rigorous: interviews, usability checks, and journey maps.",
    bullets: ["Interview scripts", "Insight synthesis", "Journey mapping"],
  },
  {
    title: "Campaign & Content Support",
    description:
      "Messaging frameworks and creative direction for campaigns that need clarity and consistency.",
    bullets: ["Message pillars", "Content briefs", "Creative QA"],
  },
];

export const skills = {
  groups: {
    "Marketing & Branding": [
      "Brand positioning & messaging",
      "Market research & customer insights",
      "Campaign planning & go-to-market",
    ],
    "Analytics & Data": [
      "Marketing analytics & measurement",
      "Regression thinking & experimentation",
      "Excel + Tableau KPI tracking",
      "Python/R basics for analysis",
    ],
    "Sales & Business": [
      "Lead qualification & pipeline discipline",
      "Negotiation and client communication",
      "Business decision-making under pressure",
    ],
    "Creative & Communication": [
      "Storytelling & content strategy",
      "Visual communication (Figma/Canva/Adobe)",
      "Clear writing and structured narratives",
    ],
  },
  languages: ["English (Fluent)", "Hindi (Native)", "French (A1)"],
};


export const howIThink = {
  title: "How I think",
  paragraphs: [
    "I start with the problem, not the output. Before I optimize a campaign or build a model, I ask: what decision are we trying to make — and what would ‘better’ actually change?",
    "I like using data to validate direction, not to decorate it. Even lightweight analysis can reduce uncertainty: a simple regression, a clear KPI structure, or a controlled comparison can make decisions easier to defend.",
    "Creativity is how I communicate strategy. A good insight is useless if it can’t travel — so I focus on framing, narrative, and clarity that helps teams execute.",
  ],
};

export const education = [
  {
    id: "emlyon-mim",
    title: "Master’s in Management — EM Lyon Business School",
    duration: "2024–Present",
    narrative:
      "I’m pursuing a project-driven Masters in Management where learning happens through business cases and applied work — not just course lists. I’m intentionally building depth across strategy, analytics, and go-to-market execution.",
    themes: [
      {
        title: "Marketing, Branding & Strategy",
        items: ["Positioning", "Customer insight", "Go-to-market thinking"],
      },
      {
        title: "Marketing Analytics & Data",
        items: ["Measurement", "ROI thinking", "Regression-based analysis"],
      },
      {
        title: "E-commerce & Consumer Experience",
        items: ["Acquisition levers", "Conversion", "Customer journey"],
      },
      {
        title: "Sales, Negotiation & Business Development",
        items: ["Client communication", "Negotiation", "Pipeline thinking"],
      },
      {
        title: "Finance, Strategy & Management",
        items: ["Business trade-offs", "Strategy under constraints"],
      },
      {
        title: "Sustainability & Responsibility",
        items: ["Sustainable value creation", "Impact-oriented decision-making"],
      },
    ],
  },
  {
    id: "amity-bjmc",
    title: "Bachelor’s in Journalism & Mass Communication — Amity University",
    duration: "2019–2022",
    narrative:
      "This degree gave me a creative foundation: how to research, tell stories, and communicate visually. Today that translates directly into brand work — because strategy is only effective when it’s expressed clearly.",
    themes: [
      {
        title: "Creative foundations",
        items: [
          "Filmmaking & visual storytelling",
          "Journalism & research",
          "Storytelling & content creation",
          "Photography",
          "Event organization",
        ],
      },
    ],
  },
];

export const projects = [
  {
    id: "tableto-simbound",
    title: "E-Commerce Marketing Simulation — Tableto",
    subtitle: "Simbound • Email marketing lead in a 6-round team simulation",
    year: "2024",
    category: "Marketing & Strategy",
    tags: ["Email marketing", "SEA support", "Pricing", "Keyword strategy"],
    cover:
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&fm=jpg&w=1600&q=70",
    oneLiner:
      "A simulation where every decision impacts profit — and the scoreboard doesn’t forgive weak execution.",
    overview:
      "In a 6-round Simbound simulation for a tablet brand, our team managed acquisition and conversion levers. I led email marketing and supported SEA keyword strategy and pricing decisions, aligning messaging with performance signals across rounds.",
    goal:
      "Maximize profit across rounds by balancing acquisition spend, conversion tactics, and pricing decisions.",
    role:
      "Email marketing lead. Owned campaign planning, segmentation logic, and performance iteration. Supported SEA keyword strategy and pricing decisions with performance insights.",
    approach:
      "Built a tight feedback loop: review round metrics → identify bottlenecks → adjust email frequency, targeting, and messaging → coordinate with SEA and pricing choices so channels reinforced each other.",
    outcome:
      "Top-performing team by profit at the end of the simulation, with improved conversion discipline and better alignment between messaging and demand signals.",
    impact: "Top-performing team by profit (6-round simulation).",
    metrics: ["#1 by profit", "6 rounds executed", "Cross-channel coordination"],
    learnings:
      "Speed matters. In a competitive environment, fast iteration beats perfect planning. The best results came from consistent measurement and decisive adjustments, not from one ‘big’ idea.",
    links: [],
  },
  {
    id: "xuris-mmm",
    title: "Marketing Analytics — Detailing & Sampling for Xuris",
    subtitle: "Marketing mix thinking • regression analysis • budget recommendations",
    year: "2024",
    category: "Analytics & Machine Learning",
    tags: ["Marketing mix", "Regression", "ROI", "Budget allocation"],
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&fm=jpg&w=1600&q=70",
    oneLiner:
      "Turned channel activity into ROI comparisons to guide budget decisions.",
    overview:
      "I analyzed marketing performance to compare the ROI of detailing versus sampling. Using regression analysis, I connected spend/activity signals to outcomes and translated results into practical budget guidance.",
    goal:
      "Identify which channel (detailing vs sampling) drives stronger ROI and propose data-driven allocation.",
    role:
      "Analytics lead: structured the dataset, ran regression-based comparisons, and summarized decision-ready recommendations.",
    approach:
      "Defined outcome metrics, cleaned and structured activity inputs, ran regression to estimate impact, then compared ROI under realistic budget constraints.",
    outcome:
      "Produced a clear recommendation on budget allocation grounded in measured impact rather than intuition.",
    impact: "Data-driven budget recommendations based on channel ROI.",
    metrics: ["Regression-based ROI comparison", "Decision-ready budget guidance"],
    learnings:
      "The value of analytics is clarity. The best model is the one that helps stakeholders confidently decide what to do next.",
    links: [],
  },
  {
    id: "fraud-detection",
    title: "Machine Learning — Fraud Detection (Banking)",
    subtitle: "Classification model to detect fraudulent bank accounts",
    year: "2025",
    category: "Analytics & Machine Learning",
    tags: ["Risk", "Classification", "Fraud prevention"],
    cover:
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&fm=jpg&w=1600&q=70",
    oneLiner:
      "Built a fraud detection approach framed around risk reduction and operational decision-making.",
    overview:
      "I built a classification approach to flag potentially fraudulent accounts early. The goal wasn’t ‘perfect prediction’ — it was reducing financial risk while keeping false positives manageable for operations.",
    goal:
      "Detect higher-risk accounts early to reduce downstream loss and investigation cost.",
    role:
      "Built the model and translated outputs into business-relevant trade-offs (precision/recall) for decision-making.",
    approach:
      "Framed the problem as triage: score accounts by risk, then define thresholds that balance missed fraud versus investigation load. Focused on interpretability and operational usability.",
    outcome:
      "A risk scoring approach that supports earlier detection and clearer decision thresholds for review workflows.",
    impact: "Financial risk reduction through earlier fraud flagging.",
    metrics: ["Risk scoring", "Operational thresholds", "Reduced exposure"],
    learnings:
      "Models succeed when they fit workflows. A slightly less accurate model can be more valuable if teams trust it and act on it.",
    links: [],
  },
  {
    id: "car-price",
    title: "Machine Learning — Car Price Prediction",
    subtitle: "Predictive pricing model + feature impact analysis",
    year: "2025",
    category: "Analytics & Machine Learning",
    tags: ["Pricing", "Regression", "Feature impact"],
    cover:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&fm=jpg&w=1600&q=70",
    oneLiner:
      "Explained what drives price — not just what the prediction is.",
    overview:
      "I built a predictive pricing model to estimate car prices and then focused on explaining which features drive value. The aim was to turn the model into insight, not just a number.",
    goal:
      "Support pricing decisions by predicting price ranges and identifying value drivers.",
    role:
      "Built the regression model and analyzed feature impact to translate outputs into practical pricing insights.",
    approach:
      "Prepared data, trained a regression model, then used feature impact analysis to explain how factors like age, mileage, and specifications move price.",
    outcome:
      "A pricing insight summary that highlights which variables matter most and how they influence expected price.",
    impact: "Regression-based insights for pricing decisions.",
    metrics: ["Feature impact analysis", "Decision-oriented insights"],
    learnings:
      "Interpretability matters: people trust pricing guidance more when they can see the logic behind it.",
    links: [],
  },
  {
    id: "cowlor-brand",
    title: "Brand & Strategy Project — Cowlor",
    subtitle: "Sustainable paint brand: research, positioning, and go-to-market",
    year: "2024",
    category: "Marketing & Strategy",
    tags: ["Market research", "Positioning", "Go-to-market"],
    cover:
      "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&fm=jpg&w=1600&q=70",
    oneLiner:
      "Built a clearer positioning story in a crowded ‘sustainable’ category.",
    overview:
      "Cowlor is a sustainable paint brand. I focused on market research, competitor mapping, and positioning to define a go-to-market direction that feels distinct and actionable.",
    goal:
      "Create a differentiated positioning and launch narrative that is easy to execute.",
    role:
      "Led research synthesis and positioning work; translated insights into messaging pillars and launch guidance.",
    approach:
      "Mapped competitors, defined audience hypotheses, and stress-tested messaging directions to land on a simple, defensible positioning.",
    outcome:
      "A positioning statement, messaging pillars, and launch checklist that improved clarity and execution readiness.",
    impact: "Improved launch readiness by ~20–25%.",
    metrics: ["Differentiated positioning", "Launch narrative", "~20–25% readiness lift"],
    learnings:
      "A good positioning is a decision filter. When it’s clear, everything else becomes easier: messaging, design choices, and campaign trade-offs.",
    links: [],
  },
  {
    id: "lamaison-community",
    title: "Community Project — La Maison Upcycling",
    subtitle: "Textile upcycling workshops and sustainability education",
    year: "2025",
    category: "Sustainability & Community",
    tags: ["Workshops", "Sustainability", "Facilitation"],
    cover:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&fm=jpg&w=1600&q=70",
    oneLiner:
      "Sustainability is practical: it lives in skills, habits, and community learning.",
    overview:
      "A community-focused project supporting upcycling workshops. The work required facilitation, clarity, and responsibility — helping participants feel confident while reinforcing the sustainability message.",
    goal:
      "Educate and enable participants to practice textile upcycling through guided workshops.",
    role:
      "Workshop support and facilitation: guided participants, explained sustainability principles, and helped sessions run smoothly.",
    approach:
      "Prioritized inclusive instruction: break down tasks, demonstrate steps, offer help at the right moment, and keep a steady workshop rhythm.",
    outcome:
      "Successful workshops with participants producing upcycled items and stronger awareness of reuse practices.",
    impact: "50 hours of volunteering supporting sustainability education.",
    metrics: ["50 hours volunteered", "Multi-age facilitation", "Hands-on learning"],
    learnings:
      "Communication is impact. In community settings, clarity and patience determine whether people feel empowered to act.",
    links: [],
  },
  {
    id: "inside-sales-project",
    title: "Business & Sales — Lead Qualification & Conversion",
    subtitle: "Pipeline discipline, communication, and negotiation",
    year: "2024",
    category: "Business & Sales",
    tags: ["Lead qualification", "Conversion", "Negotiation"],
    cover:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&fm=jpg&w=1600&q=70",
    oneLiner:
      "Sales is decision-making under pressure: qualify, prioritize, and move fast.",
    overview:
      "A business development / inside sales experience focused on handling leads, qualifying fit, and guiding prospects through structured next steps.",
    goal:
      "Increase conversion by improving speed-to-lead, qualification quality, and clarity in communication.",
    role:
      "Handled leads end-to-end: first response, qualification, follow-ups, and negotiation support.",
    approach:
      "Kept a disciplined pipeline: clear qualification questions, consistent follow-up rhythm, and decision-focused communication.",
    outcome:
      "Improved conversion discipline and stronger outcomes through fast, structured lead handling.",
    impact: "Revenue and conversion focus through pipeline discipline.",
    metrics: ["Lead qualification", "Conversion focus", "Negotiation support"],
    learnings:
      "The best sales conversations are consultative: clarity on needs, next steps, and real decision criteria.",
    links: [],
  },
];

export const workExperience = [
  {
    id: "inside-sales",
    title: "Business Development / Inside Sales",
    location: "Client-facing role",
    duration: "Experience",
    narrative:
      "In a client-facing inside sales role, I worked at the point where interest becomes revenue. I handled inbound leads, qualified fit, and moved conversations forward through clear discovery, fast follow-ups, and structured next steps. The work demanded tight communication, negotiation, and comfort with real-world pressure — because speed and clarity directly impact conversion.",
    impact:
      "Focused on conversion discipline: lead qualification, pipeline hygiene, and outcome-driven communication.",
  },
  {
    id: "la-maison-upcycling",
    title: "Community & Social Impact — La Maison Upcycling (Lyon)",
    location: "Lyon, France",
    duration: "50 hours volunteering",
    narrative:
      "Over 50 hours, I supported textile upcycling workshops and sustainability education sessions. I guided participants of different ages through hands-on making, explained the ‘why’ behind reuse, and helped keep workshops flowing smoothly. It’s a different kind of responsibility: facilitation, patience, and the ability to communicate simply — while ensuring people feel confident and included.",
    impact:
      "Strengthened facilitation, workshop leadership, and sustainability communication in real community settings.",
  },
];

export const work = [
  {
    id: "cowlor",
    title: "Cowlor",
    subtitle: "Sustainable Paint Brand Strategy",
    year: "2024",
    category: "Brand Strategy",
    tags: ["Research", "Positioning", "Go-to-market"],
    cover:
      "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&fm=jpg&w=1400&q=70",
    impact: "Improved launch readiness by 20–25%",
    overview:
      "A strategy sprint focused on a sustainable paint brand. Defined target customers, competitive frame, positioning, and launch narrative.",
    sections: [
      {
        heading: "Problem",
        body: "Sustainable claims were common in the category. The brand needed a sharper angle and a clearer audience focus.",
      },
      {
        heading: "Approach",
        body: "Market scan + competitor mapping, persona hypotheses, and message testing concepts to shape a differentiated story.",
      },
      {
        heading: "Outcome",
        body: "A concise positioning, messaging pillars, and launch checklist that increased clarity for creative execution.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&fm=jpg&w=1600&q=70",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&fm=jpg&w=1600&q=70",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&fm=jpg&w=1600&q=70",
    ],
  },
  {
    id: "ecom-sim",
    title: "E-Commerce Simulation",
    subtitle: "Product & Brand Performance Lead",
    year: "2024",
    category: "Marketing Analytics",
    tags: ["Pricing", "Promotion", "Messaging"],
    cover:
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&fm=jpg&w=1400&q=70",
    impact: "Improved profitability and brand performance",
    overview:
      "A simulation project: adjusted product mix, pricing, and acquisition levers to improve sales and profitability.",
    sections: [
      {
        heading: "Signals",
        body: "Demand patterns and buying behavior showed where price sensitivity was highest.",
      },
      {
        heading: "Decisions",
        body: "Iterated on pricing and promo intensity, tested acquisition channels, and refined brand messaging variants.",
      },
      {
        heading: "Result",
        body: "Higher profitability across rounds with improved brand traction in the simulated market.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&fm=jpg&w=1600&q=70",
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&fm=jpg&w=1600&q=70",
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&fm=jpg&w=1600&q=70",
    ],
  },
  {
    id: "plant-app",
    title: "Smart Plant Monitoring App",
    subtitle: "Product Concept + Consumer Insights",
    year: "2025",
    category: "Product Research",
    tags: ["Insights", "Retention", "Pricing"],
    cover:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&fm=jpg&w=1400&q=70",
    impact: "Optimized pricing + messaging based on performance",
    overview:
      "Concept work for a smart plant monitoring app: customer behavior analysis, pricing sensitivity, and acquisition assumptions.",
    sections: [
      {
        heading: "Discovery",
        body: "Identified key anxieties: plant health uncertainty, forgetfulness, and desire for low-effort care routines.",
      },
      {
        heading: "Strategy",
        body: "Mapped journeys and defined messaging that reframed the product from a gadget to a care companion.",
      },
      {
        heading: "Metrics",
        body: "Tracked projected retention and profitability improvements across scenarios.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&fm=jpg&w=1600&q=70",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&fm=jpg&w=1600&q=70",
      "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&fm=jpg&w=1600&q=70",
    ],
  },
  {
    id: "motion-reel",
    title: "Motion Reel (Placeholder)",
    subtitle: "Short edits + narrative pacing",
    year: "2025",
    category: "Motion Design",
    tags: ["Editing", "Sound", "Rhythm"],
    cover:
      "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&fm=jpg&w=1400&q=70",
    impact: "A tight 45–60s reel concept",
    overview:
      "A placeholder project card for future motion work. Replace with your actual reel frames and links.",
    sections: [
      {
        heading: "Direction",
        body: "Fast cuts, high contrast type, clean transitions, and intentional quiet moments for emphasis.",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&fm=jpg&w=1600&q=70",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&fm=jpg&w=1600&q=70",
    ],
  },
];

export const visualDiary = [
  {
    id: "vd-01",
    title: "Light Studies",
    caption: "Neutral tones, soft shadows, sharp type.",
    url: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&fm=jpg&w=1600&q=70",
  },
  {
    id: "vd-02",
    title: "Street Geometry",
    caption: "Lines, grids, and the calm of repetition.",
    url: "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&fm=jpg&w=1600&q=70",
  },
  {
    id: "vd-03",
    title: "Objects with Intent",
    caption: "Everyday things, framed like products.",
    url: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&fm=jpg&w=1600&q=70",
  },
  {
    id: "vd-04",
    title: "Paper & Ink",
    caption: "Texture first. Type follows.",
    url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&fm=jpg&w=1600&q=70",
  },
];

export const motionWorks = [
  {
    id: "mw-01",
    title: "Motion Design Study",
    description:
      "A placeholder set for motion projects — edits, kinetic typography, and short narratives.",
    duration: "00:45",
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&fm=jpg&w=1400&q=70",
  },
  {
    id: "mw-02",
    title: "Kinetic Type Loop",
    description:
      "Letterform rhythm, spacing, and tempo experiments.",
    duration: "00:18",
    cover:
      "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&fm=jpg&w=1400&q=70",
  },
];

export const blogPosts = [
  {
    slug: "positioning-that-doesnt-sound-like-marketing",
    title: "Positioning that doesn’t sound like marketing",
    date: "2025-06-12",
    readTime: "6 min",
    tags: ["Brand", "Messaging"],
    excerpt:
      "A simple checklist to keep positioning crisp: who, why now, and what we refuse to be.",
    cover:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&fm=jpg&w=1400&q=70",
    content: [
      {
        h: "The problem",
        p: "Most positioning becomes abstract because it’s written for internal approval instead of external clarity.",
      },
      {
        h: "A practical frame",
        p: "Write one sentence: For [audience] who struggle with [tension], [brand] is the [category] that [promise], unlike [alternative], because [proof].",
      },
      {
        h: "How to test it",
        p: "If a smart friend can repeat it after one read, it’s probably close. If not, simplify.",
      },
    ],
  },
  {
    slug: "how-i-run-lightweight-consumer-research",
    title: "How I run lightweight consumer research",
    date: "2025-04-03",
    readTime: "7 min",
    tags: ["Research", "Method"],
    excerpt:
      "A repeatable approach: 8 interviews, 1 journey map, 3 insights you can act on.",
    cover:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&fm=jpg&w=1400&q=70",
    content: [
      {
        h: "Start with a decision",
        p: "Research is only useful if it leads to a decision. I define the decision first, then pick methods.",
      },
      {
        h: "Interview structure",
        p: "15 minutes context, 15 minutes story, 10 minutes trade-offs. Then I tag quotes for themes.",
      },
      {
        h: "Outputs",
        p: "One page: top jobs-to-be-done, anxieties, moments of delight, and a message pillar draft.",
      },
    ],
  },
];

export const interests = [
  {
    title: "Brand worlds",
    description:
      "I like when brands feel like places — consistent tone, textures, and rules that make decisions easier.",
  },
  {
    title: "Editorial design",
    description:
      "Long-form layout, typography systems, and spacing that makes reading feel effortless.",
  },
  {
    title: "Storytelling",
    description:
      "Short narratives with clear tension and payoff — useful for case studies and campaign concepts.",
  },
];

export const formspree = {
  endpoint: "https://formspree.io/f/mwvpdgdj",
};
