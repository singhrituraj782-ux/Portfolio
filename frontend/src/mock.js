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
  { label: "Case Studies", href: "#case-studies" },
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
  highlights: [
    "Market research & customer insights",
    "Brand positioning & messaging",
    "Excel + Tableau KPI tracking",
    "Figma, Canva, Adobe Creative Suite",
    "Python (basic), R (basic)",
  ],
  languages: ["English (Fluent)", "Hindi (Native)", "French (A1)"] ,
};

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
