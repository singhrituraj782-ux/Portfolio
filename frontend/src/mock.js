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
  resumeUrl: `${process.env.PUBLIC_URL}/products/cv/BRANDIN CV_ Rituraj Rituraj 2026 (2).pdf`,

  social: {
    email: "mailto:singhrituraj782@gmail.com",
    linkedin: "https://www.linkedin.com/in/rituraj-rituraj-352bba229/",
    behance: "#",
  },
};

export const navigation = [
  { label: "Work", href: "#work-experience" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Resume", href: "#resume" },
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
    location: "France",
    coursework: [
      {
        title: "Analytics",
        items: ["Marketing Analytics"],
      },
      {
        title: "Marketing & Research",
        items: ["Consumer Behavior", "Market Research Methods"],
      },
      {
        title: "Strategy",
        items: ["Retail Strategy"],
      },
    ],
    appliedCapabilities:
      "Translate marketing questions into testable hypotheses, validate direction with structured analysis, and connect consumer insight to practical channel and retail trade-offs. This supports how I work on projects like Tableto (profit-first iteration) and Xuris (incremental impact modeling).",
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
    location: "India",
    coursework: [],
    appliedCapabilities:
      "Build clear narratives from research, structure messaging for specific audiences, and execute visual stories end-to-end — from concept and scripting to editing and final delivery. This foundation carries into brand work where ideas need to be understood fast and communicated consistently.",
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
    title: "Profit-First E-Commerce Strategy — Tableto",
    subtitle: "Simbound • Email marketing lead in a 6-round team simulation",
    year: "2024",
    category: "Marketing & Strategy",
    tags: ["Email marketing", "SEA support", "Pricing", "Keyword strategy"],
    cover:
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&fm=jpg&w=1600&q=70",
    oneLiner:
      "A 6-round e-commerce simulation where decisions are judged on net profit.",
    overview:
      "Tableto is a simulated online retailer selling tablets from manufacturers like Apple, HP, Acer, and Samsung across the US and UK. In Simbound, teams compete across six rounds — making trade-offs on acquisition (SEA), pricing, and on-site levers — and the scoreboard is total net profit. As Team Yellow, we focused on early profitability and then iterated each round toward qualified demand and better conversion efficiency, not just higher traffic.",
    goal:
      "Maximize total net profit across six rounds by balancing acquisition efficiency (SEA), on-site conversion levers, and pricing across the US and UK markets.",
    role:
      "Led email marketing for Team Yellow: planned campaigns, set targeting and cadence, wrote messaging, and reviewed results each round. Used email to bring back qualified visitors and support conversion, then iterated using open rate, CTR, conversions, value, and unsubscribe signals. Shared learnings to inform SEA keyword focus and on-site alignment.",
    approach:
      "Optimized for profit early: kept acquisition spend disciplined, prioritized high-intent keywords, and avoided chasing low-quality traffic. Each round we reviewed the profit equation (traffic × conversion rate × margin) to find the bottleneck, then adjusted the right lever — website settings available in the simulation, SEA budgets/keywords, or pricing. Email acted as a conversion lever: targeted sends reinforced the value proposition, supported current offers, and pushed qualified users back to the site. The loop was consistent: measure → decide → ship changes → validate in the next round.",
    outcome:
      "Team Yellow finished #1 overall with €380,509.49 total net profit. The result came from disciplined acquisition and steady conversion improvements — aligning email, SEA, and on-site decisions around what was actually converting, not what looked good on traffic charts.",
    impact: "Ranked #1 overall with €380,509.49 total net profit (Team Yellow).",
    metrics: ["Ranked #1 overall (Team Yellow)", "€380,509.49 total net profit", "6 rounds across US + UK"],
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
      "Quantified incremental lift of detailing vs sampling to guide budget decisions.",
    overview:
      "This case study evaluates marketing effectiveness for Xuris, a pharmaceutical brand. Using physician-month level data, I compared two core levers — detailing visits (sales rep interactions) and product sampling — as drivers of new prescriptions. The goal was to quantify incremental impact (not just observe correlations) and translate the findings into decision-ready budget allocation guidance under realistic constraints.",
    goal:
      "Identify which channel (detailing vs sampling) delivers stronger ROI in new prescriptions, and produce a practical allocation recommendation that holds up under real-world budget and resource constraints.",
    role:
      "Analytics Lead: owned dataset structuring, exploratory analysis, model selection, diagnostics, interpretation, and the final budget recommendation.",
    approach:
      "Data prep & QA: structured physician-month records and checked distributions, missing values, and outliers. Visual exploration: used scatter plots and binned relationships to surface non-linear patterns in how detailing and sampling relate to new prescriptions. Modeling: tested multiple specifications (OLS, Poisson, log-log) to match the data behavior and business question. Selection & validation: chose the final model using AIC and verified stability with residual checks, Q–Q plots, and leverage diagnostics. Interpretation: converted coefficients into marginal effects to compare incremental impact and identify diminishing returns, then translated results into budget guidance.",
    outcome:
      "Key analytical findings: 1) Both detailing and sampling increased new prescriptions. 2) Detailing showed a stronger, more consistent marginal effect. 3) Sampling showed diminishing returns and worked best as a support lever. 4) The non-linear response justified the final log-log model. Recommendation: prioritize detailing investment while maintaining targeted sampling to support coverage — a directly actionable allocation plan based on measured marginal impact, not intuition.",
    impact: "Actionable budget allocation guidance based on quantified incremental impact.",
    metrics: ["Physician-month impact modeling", "AIC-based model selection (log-log)", "Marginal effects → budget guidance"],
    learnings:
      "Model choice has to match data behavior: non-linear response and diminishing returns changed the conclusions. Visual exploration before modeling reduced false confidence early. Analytics creates the most value when it turns results into decision clarity — what to prioritize, what to keep, and what to stop.",
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
      "A recall-first fraud screening model built for operational triage.",
    overview:
      "Fraudulent account openings create outsized financial risk and downstream investigation work. This project builds a classification model to flag high-risk accounts early and treats the problem as a threshold decision — balancing missed fraud (risk exposure) against review capacity (false positives). Interpretability mattered because analysts need to understand why an account was flagged and act on it within a real workflow.",
    goal:
      "Detect higher-risk accounts early to reduce loss and risk exposure, while keeping the number of reviews manageable. The output needed to be deployable: a risk score, a recommended operating threshold, and decision-focused evaluation (recall/precision) rather than headline accuracy.",
    role:
      "Analytics Lead: structured the dataset, selected and prepared features, trained and compared models, and translated model outputs into an operating threshold aligned to investigation capacity. Owned evaluation, diagnostics, and the final recommendation for how the model should be used in practice.",
    approach:
      "Structured the problem as triage: predict fraud risk at the account level, then choose a threshold that prioritizes recall. Addressed extreme class imbalance by focusing on recall/precision and reviewing performance through confusion matrices (not accuracy). Prepared features with lightweight preprocessing so results remained stable and explainable. Trained baseline and comparative models (Logistic Regression and Random Forest), evaluated ROC-AUC alongside recall and precision, and selected a recall-heavy operating point. Chose the final model based on both performance and interpretability so the output could be used and trusted by operations.",
    outcome:
      "Delivered an interpretable fraud risk scoring approach with a recommended threshold for review workflows. The final setup favors catching fraud early (higher recall), accepts false positives as a cost of risk reduction, and provides decision clarity on what happens when the model flags an account.",
    impact:
      "Improves risk reduction and operational decision-making by turning fraud detection into a clear, threshold-based review process.",
    metrics: [
      "Recall-first operating threshold",
      "Interpretable Logistic Regression baseline",
      "Decision-ready evaluation (ROC-AUC / recall / precision)",
    ],
    learnings:
      "In high-risk problems, trade-offs matter more than accuracy. Thresholds can matter more than algorithms. The best model is the one that fits the workflow — transparent enough to trust, and practical enough to act on.",
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
      "/products/cowlor/cowlorcover.png",
    oneLiner:
      "Built a clearer positioning story in a crowded ‘sustainable’ category.",
    overview:
      [
        "Cowlor is a sustainable paint brand entering a crowded “eco-friendly” paint market where most competitors sound the same. Claims like low-VOC, non-toxic, and “green” were everywhere, creating an attention problem: sustainability was expected, but rarely differentiated.",
        "The objective was to create a clear positioning, messaging pillars, and a practical go-to-market narrative that could be executed by a real team — not just a concept. The focus was on clarity that improves day-to-day decisions across messaging, channels, and campaign trade-offs.",
      ],
    goal:
      "Create a differentiated positioning and launch narrative that simplifies decisions across messaging, channels, and campaign trade-offs.",
    role:
      "Led end-to-end research synthesis; conducted competitor analysis and positioning mapping; defined target audience hypotheses; and translated insights into messaging pillars and launch guidance.",
    approach:
      "1) Market + competitor audit to map sustainability claims, price cues, and brand language to identify where “eco” messaging overlapped. 2) Audience segmentation and hypothesis development to clarify who we’re for and which jobs-to-be-done mattered most. 3) Stress-tested multiple positioning directions against real trade-offs (credibility, distinctiveness, and execution feasibility). 4) Selected a simple, defensible positioning with clear messaging pillars that could guide creative, channels, and launch sequencing.",
    evidence: [
      "The competitive set clustered around the same sustainability vocabulary, which made brand differences hard to perceive at a glance. When every brand claims “safe,” “green,” and “low-VOC,” the buyer is left comparing price and aesthetics — not meaning.",
      "That overlap made “sustainable” an entry ticket, not a differentiator. The work focused on defining a sharper angle that could be expressed in plain language and supported consistently across touchpoints.",
      "Positioning options were evaluated through trade-offs, not preferences: would it stay credible without sounding generic, avoid being premium-only, and give the team a practical decision rule for what to say, show, and prioritize at launch?",
    ],
    outcome:
      "Delivered a final positioning statement, a set of messaging pillars, and a launch checklist designed to keep execution consistent. The output aligned marketing, product, and launch decisions around one story — making it easier to brief creative, choose channels, and keep campaigns coherent.",
    impact:
      "Clarity reduced decision friction across messaging, channel choices, and launch planning.",
    metrics: [
      "Differentiated positioning in a saturated sustainability market",
      "Clear launch narrative and messaging framework",
      "~20–25% improvement in internal launch readiness and clarity",
    ],
    learnings:
      "A strong positioning acts as a decision filter. When it’s clear, messaging, design, and campaign choices become faster and more consistent.",
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

export const professionalExperience = [
  {
    id: "granaura-promoters-bdr",
    role: "Business Development Representative",
    company: "Granaura Promoters",
    location: "India",
    dates: "Sep 2023 – Mar 2024",
    summary:
      "Owned end-to-end sales cycles with a consultative approach — from lead handling and discovery to follow-ups, negotiation, and closing.",
    highlights: [
      "Managed full sales cycle handling 150+ leads monthly with 25% conversion rate, consistently exceeding quarterly targets.",
      "Boosted revenue by 10–15% through strategic prospecting and consultative selling approach.",
      "Implemented retention strategies that increased client engagement by 15% and reduced churn.",
    ],
    skillsImpact: {
      skillsBuilt: [
        "Lead qualification and discovery call structure",
        "Follow-up cadence management and pipeline discipline",
        "Negotiation, objection handling, and closing",
        "CRM hygiene and stage-based reporting",
        "Target tracking and revenue forecasting basics",
      ],
      howApplied:
        "Worked daily across inbound lead handling and outbound prospecting: qualified needs and intent, ran discovery, managed follow-ups, and coordinated offers and next steps while keeping CRM stages clean for visibility.",
      resultsImpact:
        "Sustained a high-volume pipeline (150+ leads/month) with ~25% conversion by tightening qualification and follow-up. The same discipline supported 10–15% revenue lift and stronger retention touchpoints that improved engagement (+15%) and reduced churn.",
    },
  },
  {
    id: "cur8-inside-sales",
    role: "Inside Sales Specialist",
    company: "Cur8",
    location: "India",
    dates: "May 2023 – Aug 2024",
    summary:
      "Drove prospecting, qualification, and closing in a high-volume environment, using CRM tracking and performance analytics to improve conversion.",
    highlights: [
      "Exceeded sales targets by 35% through effective prospecting, qualification, and closing techniques.",
      "Executed high-volume outbound campaigns across phone, email, and social channels, increasing engagement by 25%.",
      "Utilized CRM tools and analytics to track performance and optimize conversion rates.",
    ],
    skillsImpact: {
      skillsBuilt: [
        "Outbound sequencing across phone, email, and social",
        "Qualification frameworks and handoff readiness",
        "CRM reporting and performance tracking",
        "Messaging and objection handling for conversion",
        "Pipeline management across stages and follow-ups",
      ],
      howApplied:
        "Ran structured outreach sequences, qualified leads through consistent discovery questions, and used CRM performance signals to adjust prioritization and messaging. Kept pipeline stages current to ensure follow-ups and next actions were executed on time.",
      resultsImpact:
        "The process translated into stronger conversion and target delivery: exceeded targets by 35% and increased engagement by 25% through coordinated multi-channel outbound, supported by CRM-based tracking and iteration.",
    },
  },
  {
    id: "bedo-design-bda",
    role: "Business Development Associate",
    company: "Bedo Design",
    location: "India",
    dates: "Oct 2022 – Apr 2023",
    summary:
      "Expanded the client portfolio through B2B prospecting, relationship building, and key-account acquisition to support growth.",
    highlights: [
      "Expanded portfolio by 25% through strategic B2B prospecting and relationship development.",
      "Secured key accounts contributing to 15% market growth and launched campaigns amplifying engagement by 30%.",
    ],
    skillsImpact: {
      skillsBuilt: [
        "B2B prospect research and targeted outreach",
        "Relationship management and account follow-through",
        "Proposal framing and stakeholder communication",
        "Coordination with creative teams on campaign needs",
        "Prioritization across accounts and opportunities",
      ],
      howApplied:
        "Built a focused prospect list, ran outreach and follow-ups, and managed conversations through proposal and closing. Partnered with internal teams to translate client needs into clear briefs and practical next steps.",
      resultsImpact:
        "Helped expand the client portfolio by 25% and secured key accounts that supported 15% market growth. Campaign coordination and client alignment contributed to stronger engagement (+30%) across launched initiatives.",
    },
  },
];

export const volunteeringExperience = [
  {
    id: "la-maison-upcycling",
    role: "Volunteer — Workshop Support & Facilitation",
    company: "La Maison Upcycling",
    location: "Lyon, France",
    dates: "50 hours volunteering",
    summary:
      "Supported textile upcycling workshops and sustainability education sessions, helping participants feel confident while reinforcing the practical ‘why’ behind reuse.",
    highlights: [
      "Guided participants of different ages through hands-on making with clear, step-by-step facilitation.",
      "Explained sustainability concepts in simple language and supported inclusive participation throughout sessions.",
      "Helped keep workshops flowing smoothly with steady pacing, patience, and on-the-spot problem solving.",
    ],
    skillsImpact: {
      skillsBuilt: [
        "Workshop facilitation and participant support",
        "Clear instruction and step-by-step guidance",
        "Explaining sustainability concepts in plain language",
        "Session logistics and materials coordination",
        "Real-time problem solving in group settings",
      ],
      howApplied:
        "Supported set-up and flow during workshops, guided participants through each step, and adjusted pacing based on the room. Answered questions, helped troubleshoot issues, and reinforced the sustainability purpose without overwhelming participants.",
      resultsImpact:
        "Contributed 50 hours of consistent on-the-ground support that helped sessions run smoothly and stay inclusive. The work strengthened participant confidence and kept attention on practical reuse outcomes rather than abstract sustainability messaging.",
    },
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

export const productStudies = [
  {
    id: "ps-01",
    title: "Chole Bhature",
    caption: "Comfort food, framed like a hero product shot.",
    url: "/products/chole-bhature.png",
    meta: {
      client: "Personal (spec)",
      brand: "Food photography",
      format: "Menu hero",
      lighting: "Warm, high-contrast",
      focus: "Texture + plating",
      deliverables: ["Menu hero", "Social post", "Banner crop"],
    },
  },
  {
    id: "ps-02",
    title: "Dosa",
    caption: "Clean composition with strong geometry and negative space.",
    url: "/products/dosa.png",
    meta: {
      client: "Personal (spec)",
      brand: "Food photography",
      format: "Top-down",
      lighting: "Neutral",
      focus: "Shape + crispness",
      deliverables: ["Menu tile", "Story post", "Web hero"],
    },
  },
  {
    id: "ps-03",
    title: "Raj Kachori",
    caption: "Layered ingredients and center framing — built for attention.",
    url: "/products/raj-kachori.png",
    meta: {
      client: "Haldiram’s (spec)",
      brand: "Food photography",
      format: "Product close-up",
      lighting: "Balanced",
      focus: "Detail richness",
      deliverables: ["Campaign visual", "Poster crop", "Feed post"],
    },
  },
  {
    id: "ps-04",
    title: "Kaju Katli",
    caption: "Repetition and sharp edges — premium minimal dessert styling.",
    url: "/products/kaju-katli.png",
    meta: {
      client: "Personal (spec)",
      brand: "Food photography",
      format: "Grid / repetition",
      lighting: "Soft",
      focus: "Precision",
      deliverables: ["Product grid", "Packaging mock", "Carousel"],
    },
  },
  {
    id: "ps-05",
    title: "Ras Malai",
    caption: "Soft highlights and warmth — a high-end dessert frame.",
    url: "/products/ras-malai.png",
    meta: {
      client: "Personal (spec)",
      brand: "Food photography",
      format: "Editorial",
      lighting: "Warm",
      focus: "Creamy textures",
      deliverables: ["Editorial cut", "Story post", "Web feature"],
    },
  },
];

export const motionWorks = [
  {
    id: "mw-01",
    title: "Brand Motion Reel",
    description:
      "High-energy brand motion exploring rhythm, pacing, and visual storytelling.",
    duration: "00:45",
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&fm=jpg&w=1400&q=70",
  },
  {
    id: "mw-02",
    title: "Kinetic Typography Study",
    description:
      "Typography-led motion focused on timing, hierarchy, and expressive transitions.",
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
