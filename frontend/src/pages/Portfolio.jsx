import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  formspree,
  interests,
  navigation,
  profile,
  services,
  skills,
  productStudies,
  projects,
  motionWorks,
  professionalExperience,
  volunteeringExperience,
  howIThink,
  education,
  work,
} from "@/mock";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Camera,
  FileText,
  Film,
  Mail,
  MapPin,
  Sparkles,
  Wand2,
} from "lucide-react";

import ThreeBackdrop from "@/components/ThreeBackdrop";
import ThemeToggle from "@/components/ThemeToggle";
import Product3DPreview from "@/components/Product3DPreview";

const ACCENT = "#E46A2E"; // single brand accent (used sparingly)
const FIRE_ACCENT = "#E46A2E"; // keep motion accents aligned to the same brand color
const HOME_SCROLL_KEY = "scroll:/";

function saveHomeScrollPosition() {
  try {
    sessionStorage.setItem(
      HOME_SCROLL_KEY,
      JSON.stringify({ y: window.scrollY || 0, ts: Date.now() })
    );
  } catch {
    // ignore
  }
}

function scrollToSection(href) {
  if (typeof window === "undefined") return;
  if (!href || !href.startsWith("#")) return;

  const el = document.querySelector(href);
  if (!el) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

const SKILL_GROUPS = [
  {
    id: "creative-storytelling",
    title: "Creative & Storytelling",
    skills: [
      "Film making",
      "Photography",
      "Visual storytelling",
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "Adobe Photoshop",
    ],
    snapshot: ["Film making", "Photography", "Visual storytelling", "Adobe Premiere Pro"],
    whereUsed: [
      { type: "motionWork", id: "mw-01" },
      { type: "motionWork", id: "mw-02" },
      { type: "productStudy", id: "ps-01" },
    ],
    howApplied:
      "Used Adobe Premiere Pro and Adobe After Effects to build motion pieces with clear pacing and emphasis, and Adobe Photoshop to refine stills and compositions. Focus stayed on making the idea readable fast — framing, rhythm, and visual hierarchy before polish.",
    resultsImpact:
      "Strengthened the ability to translate an idea into coherent assets (stills and motion) that feel intentional and campaign-ready.",
  },
  {
    id: "brand-design-communication",
    title: "Brand, Design & Communication",
    skills: [
      "Brand positioning",
      "Messaging frameworks",
      "Figma",
      "Canva",
      "PowerPoint",
      "Event management",
    ],
    snapshot: ["Brand positioning", "Messaging frameworks", "Figma", "PowerPoint"],
    whereUsed: [
      { type: "project", id: "cowlor-brand" },
      { type: "project", id: "tableto-simbound" },
      { type: "experience", id: "la-maison-upcycling" },
    ],
    howApplied:
      "In Cowlor, I turned research into positioning and messaging pillars and packaged the narrative in clear slides and visuals. In Tableto, I used messaging discipline in email execution and aligned communication to what was converting. In workshops, I supported planning and facilitation so sessions stayed structured and inclusive.",
    resultsImpact:
      "Improved clarity and consistency in how work was communicated (strategy decks, messaging, and facilitation), reducing decision friction and helping teams execute with a shared story.",
  },
  {
    id: "marketing-analytics-data",
    title: "Marketing Analytics & Data",
    skills: [
      "Marketing analytics",
      "Data analysis",
      "Tableau",
      "Excel",
      "Python",
      "R Studio",
    ],
    snapshot: ["Marketing analytics", "Tableau", "Excel", "Python"],
    whereUsed: [
      { type: "project", id: "tableto-simbound" },
      { type: "project", id: "xuris-mmm" },
      { type: "project", id: "fraud-detection" },
    ],
    howApplied:
      "Used KPI tracking and structured analysis to decide what to change and when: reviewed round-by-round performance signals in Tableto, quantified incremental lift and model fit in Xuris, and evaluated classification trade-offs (recall/precision) in Fraud Detection.",
    resultsImpact:
      "Enabled decision-ready outputs: profit-first iteration in Tableto, a measurable allocation recommendation in Xuris, and an operationally usable fraud screening setup built around explicit trade-offs.",
  },
  {
    id: "productive-strategic-tools",
    title: "Productive & Strategic Tools",
    skills: ["Notion", "Research synthesis", "Documentation and planning"],
    snapshot: ["Notion", "Research synthesis", "Documentation and planning"],
    whereUsed: [
      { type: "project", id: "cowlor-brand" },
      { type: "project", id: "xuris-mmm" },
      { type: "experience", id: "cur8-inside-sales" },
    ],
    howApplied:
      "Kept work structured through clear documentation: captured inputs, hypotheses, decisions, and next steps in a single source of truth (Notion-style working docs), then translated that into execution-ready outputs. In sales roles, used disciplined planning and documentation to keep follow-ups and priorities tight.",
    resultsImpact:
      "Reduced rework and improved execution speed by keeping decisions traceable and keeping teams aligned on what matters next.",
  },
  {
    id: "soft-skills",
    title: "Soft Skills",
    skills: [
      "Strategic thinking",
      "Problem solving",
      "Cross-functional collaboration",
      "Communication & presentation",
      "Ownership and execution",
    ],
    snapshot: [
      "Strategic thinking",
      "Problem solving",
      "Communication & presentation",
      "Ownership and execution",
    ],
    whereUsed: [
      { type: "project", id: "tableto-simbound" },
      { type: "experience", id: "granaura-promoters-bdr" },
      { type: "experience", id: "cur8-inside-sales" },
    ],
    howApplied:
      "Worked in fast cycles where priorities had to be set, executed, and reviewed with the team (Tableto), and owned end-to-end responsibilities in sales roles — handling blockers, keeping communication clear, and moving work forward without waiting for perfect conditions.",
    resultsImpact:
      "Built reliability under pressure: clearer coordination, faster iteration, and consistent follow-through in high-volume and time-constrained work.",
  },
];

function SectionHeading({
  kicker,
  title,
  description,
  icon: Icon,
  align = "left",
  descriptionClassName,
}) {
  const isCentered = align === "center";
  const descriptionClasses = descriptionClassName
    ? `mt-4 text-sm leading-relaxed text-muted-foreground md:text-base ${descriptionClassName}`
    : "mt-4 text-sm leading-relaxed text-muted-foreground md:text-base";

  return (
    <div
      className={
        isCentered
          ? "flex flex-col items-center gap-4 text-center md:gap-6"
          : "flex items-end justify-between gap-6"
      }
    >
      <div className="max-w-2xl">
        <div
          className={
            isCentered
              ? "flex items-center justify-center gap-2 text-xs tracking-[0.22em] uppercase text-accent"
              : "flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-accent"
          }
        >
          {Icon ? (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-background/40">
              <Icon className="h-4 w-4 text-accent" />
            </span>
          ) : null}
          <span>{kicker}</span>
          <span className="hidden h-[2px] w-10 rounded-full bg-accent/80 md:inline-block" aria-hidden />
        </div>
        <h2 className="mt-4 font-display text-4xl leading-[0.92] tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h2>
        {description ? (
          <p className={descriptionClasses}>{description}</p>
        ) : null}
      </div>
      {!isCentered ? (
        <div className="hidden md:block text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            <span>Currently: {profile.availability}</span>
          </span>
        </div>
      ) : null}
    </div>
  );
}

function ExperienceGrid({ items }) {
  const cols =
    (items || []).length > 1 ? "md:grid-cols-2" : "md:grid-cols-1";

  const scrollYRef = useRef(0);
  const activeElRef = useRef(null);

  return (
    <div className={`mt-6 grid gap-6 ${cols}`}>
      {(items || []).map((r) => (
        <Dialog
          key={r.id}
          onOpenChange={(open) => {
            if (open) {
              scrollYRef.current = window.scrollY || 0;
              activeElRef.current = document.activeElement;
            }
          }}
        >
          <Card className="relative overflow-hidden bg-card/60">
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent via-accent/40 to-transparent"
            />
            <CardHeader className="relative pl-7">
              <CardTitle className="font-display text-2xl">{r.role}</CardTitle>
              <CardDescription>
                {r.company} • {r.dates}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative pl-7 text-sm leading-relaxed">
              <ul className="space-y-2 text-muted-foreground">
                {(r.highlights || []).slice(0, 2).map((h) => (
                  <li key={h} className="flex gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-none rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex justify-end">
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-background/40"
                  >
                    See details
                  </Button>
                </DialogTrigger>
              </div>
            </CardContent>
          </Card>

          <DialogContent
            className="w-[94vw] max-w-3xl max-h-[85vh] overflow-y-auto sm:rounded-2xl bg-background/85 backdrop-blur"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              window.requestAnimationFrame(() => {
                window.scrollTo({ top: scrollYRef.current });
                const el = activeElRef.current;
                if (el && typeof el.focus === "function") {
                  el.focus({ preventScroll: true });
                }
              });
            }}
          >
            <DialogHeader>
              <DialogTitle className="font-display text-2xl md:text-3xl">
                {r.role}
              </DialogTitle>
              <DialogDescription>
                {r.company} • {r.location} • {r.dates}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {r.summary ? (
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {r.summary}
                </p>
              ) : null}

              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                {(r.highlights || []).map((h) => (
                  <li key={h} className="flex gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-none rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-xl border bg-background/40 p-4">
                <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                  Skills &amp; Impact
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      Skills I built
                    </div>
                    <ul className="mt-2 space-y-2 text-muted-foreground">
                      {(r.skillsImpact?.skillsBuilt || []).map((s) => (
                        <li key={s} className="flex gap-3">
                          <span
                            className="mt-2 h-1.5 w-1.5 flex-none rounded-full"
                            style={{ backgroundColor: ACCENT }}
                          />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-foreground">
                      How I applied them
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      {r.skillsImpact?.howApplied}
                    </p>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-foreground">
                      Results / Impact
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      {r.skillsImpact?.resultsImpact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

function SkillsGrid() {
  const scrollYRef = useRef(0);
  const activeElRef = useRef(null);

  const getWhereUsed = (ref) => {
    if (!ref) return null;

    if (ref.type === "project") {
      const p = (projects || []).find((x) => x.id === ref.id);
      if (!p) return null;
      return { title: p.title, context: p.oneLiner };
    }

    if (ref.type === "experience") {
      const all = [...(professionalExperience || []), ...(volunteeringExperience || [])];
      const r = all.find((x) => x.id === ref.id);
      if (!r) return null;
      return { title: `${r.role} — ${r.company}`, context: r.summary };
    }

    if (ref.type === "motionWork") {
      const m = (motionWorks || []).find((x) => x.id === ref.id);
      if (!m) return null;
      return { title: m.title, context: m.description };
    }

    if (ref.type === "productStudy") {
      const ps = (productStudies || []).find((x) => x.id === ref.id);
      if (!ps) return null;
      return { title: ps.title, context: ps.caption };
    }

    return null;
  };

  const spans = [
    "md:col-span-7",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-7",
    "md:col-span-12",
  ];

  return (
    <div className="grid gap-6 md:grid-cols-12">
      {SKILL_GROUPS.map((g, idx) => (
        <Dialog
          key={g.id}
          onOpenChange={(open) => {
            if (open) {
              scrollYRef.current = window.scrollY || 0;
              activeElRef.current = document.activeElement;
            }
          }}
        >
          <Card className={`relative overflow-hidden bg-card/60 ${spans[idx] || "md:col-span-6"}`} data-reveal>
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent via-accent/40 to-transparent"
            />
            <CardHeader className="relative pl-7">
              <CardTitle className="font-display text-2xl">{g.title}</CardTitle>
              <CardDescription className="sr-only">{g.title}</CardDescription>
            </CardHeader>
            <CardContent className="relative space-y-4 pl-7">
              <div className="flex flex-wrap gap-2">
                {(g.snapshot || []).slice(0, 4).map((s) => (
                  <Badge key={s} variant="secondary" className="rounded-full">
                    {s}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-end">
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-background/40"
                  >
                    See details
                  </Button>
                </DialogTrigger>
              </div>
            </CardContent>
          </Card>

          <DialogContent
            className="w-[94vw] max-w-3xl max-h-[85vh] overflow-y-auto sm:rounded-2xl bg-background/85 backdrop-blur"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              window.requestAnimationFrame(() => {
                window.scrollTo({ top: scrollYRef.current });
                const el = activeElRef.current;
                if (el && typeof el.focus === "function") {
                  el.focus({ preventScroll: true });
                }
              });
            }}
          >
            <DialogHeader>
              <DialogTitle className="font-display text-2xl md:text-3xl">
                {g.title}
              </DialogTitle>
              <DialogDescription className="sr-only">{g.title}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {(g.skills || g.snapshot || []).map((s) => (
                  <Badge key={`${g.id}:${s}`} variant="secondary" className="rounded-full">
                    {s}
                  </Badge>
                ))}
              </div>

              <div className="rounded-xl border bg-background/40 p-4">
                <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                  Where I used these skills
                </div>
                <div className="mt-4 space-y-3">
                  {(g.whereUsed || [])
                    .map(getWhereUsed)
                    .filter(Boolean)
                    .slice(0, 3)
                    .map((item) => (
                      <div
                        key={`${g.id}:${item.title}`}
                        className="rounded-xl border bg-background/60 px-4 py-3"
                      >
                        <div className="text-sm font-medium text-foreground">
                          {item.title}
                        </div>
                        <div
                          className="mt-1 text-sm text-muted-foreground truncate"
                          title={item.context}
                        >
                          {item.context}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="rounded-xl border bg-background/40 p-4">
                <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                  How I applied the skills
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {g.howApplied}
                </p>
              </div>

              <div className="rounded-xl border bg-background/40 p-4">
                <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                  Results / Outcomes
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {g.resultsImpact}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

function EducationGrid() {
  const scrollYRef = useRef(0);
  const activeElRef = useRef(null);

  const splitTitle = (title) => {
    if (!title) return { degree: "", institution: "" };
    const parts = title.split("—").map((p) => p.trim()).filter(Boolean);
    if (parts.length < 2) return { degree: title.trim(), institution: "" };
    return {
      degree: parts.slice(0, -1).join(" — "),
      institution: parts[parts.length - 1],
    };
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {(education || []).map((e) => {
        const { degree, institution } = splitTitle(e.title);
        const meta = [
          institution,
          e.location ? e.location : null,
          e.duration,
        ]
          .filter(Boolean)
          .join(" • ");

        return (
          <Dialog
            key={e.id}
            onOpenChange={(open) => {
              if (open) {
                scrollYRef.current = window.scrollY || 0;
                activeElRef.current = document.activeElement;
              }
            }}
          >
            <Card className="relative overflow-hidden bg-card/60" data-reveal>
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent via-accent/40 to-transparent"
              />
              <CardHeader className="relative pl-7">
                <CardTitle className="font-display text-2xl">
                  {degree}
                </CardTitle>
                <CardDescription>{meta}</CardDescription>
              </CardHeader>

              <CardContent className="relative pl-7">
                <div className="flex justify-end">
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-full bg-background/40"
                    >
                      See relevant coursework
                    </Button>
                  </DialogTrigger>
                </div>
              </CardContent>
            </Card>

            <DialogContent
              className="w-[94vw] max-w-3xl max-h-[85vh] overflow-y-auto sm:rounded-2xl bg-background/85 backdrop-blur"
              onCloseAutoFocus={(event) => {
                event.preventDefault();
                window.requestAnimationFrame(() => {
                  window.scrollTo({ top: scrollYRef.current });
                  const el = activeElRef.current;
                  if (el && typeof el.focus === "function") {
                    el.focus({ preventScroll: true });
                  }
                });
              }}
            >
              <DialogHeader>
                <DialogTitle className="font-display text-2xl md:text-3xl">
                  {degree}
                </DialogTitle>
                <DialogDescription>{meta}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="rounded-xl border bg-background/40 p-4">
                  <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                    Relevant Coursework
                  </div>

                  {(e.coursework || []).length ? (
                    <div className="mt-4 space-y-4">
                      {(e.coursework || []).map((group) => (
                        <div key={`${e.id}:${group.title}`}>
                          <div className="text-sm font-medium text-foreground">
                            {group.title}
                          </div>
                          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                            {(group.items || []).map((item) => (
                              <li key={`${e.id}:${group.title}:${item}`} className="flex gap-3">
                                <span
                                  className="mt-2 h-1.5 w-1.5 flex-none rounded-full"
                                  style={{ backgroundColor: ACCENT }}
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-muted-foreground">
                      Coursework not listed in CV.
                    </p>
                  )}
                </div>

                <div className="rounded-xl border bg-background/40 p-4">
                  <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                    Applied Capabilities
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {e.appliedCapabilities}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);

  const jump = (href) => {
    setOpen(false);
    window.requestAnimationFrame(() => {
      scrollToSection(href);
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-accent/35 after:to-transparent">
      <div className="site-container flex h-16 items-center justify-between">
        <Link to="/" className="group inline-flex items-baseline gap-2">
          <span className="font-display text-lg tracking-tight">
            {profile.name}
          </span>
          <span className="text-xs tracking-[0.22em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
            Portfolio
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
	          {navigation.map((item) => (
	            <button
	              key={item.href}
	              type="button"
	              onClick={() => jump(item.href)}
              className="relative rounded-full px-3 py-2 text-sm text-foreground/70 transition-colors hover:text-foreground after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {item.label}
            </button>
          ))}

          <ThemeToggle
            variant="outline"
            className="ml-1 rounded-full bg-background/70 backdrop-blur"
          />
        </nav>

        <div className="md:hidden">
          <Button
            variant="outline"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            Menu
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t bg-background md:hidden">
          <div className="site-container py-3">
            <div className="grid grid-cols-2 gap-2">
              {navigation.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => jump(item.href)}
                >
                  {item.label}
                </Button>
              ))}

              <div className="col-span-2">
                <ThemeToggle
                  variant="outline"
                  className="w-full justify-center rounded-md bg-background"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section data-reveal className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.8]"
          style={{
            background:
              "radial-gradient(900px 420px at 18% 18%, rgba(34,66,240,0.22), transparent 62%), radial-gradient(900px 520px at 26% 30%, rgba(255,70,190,0.16), transparent 62%), radial-gradient(650px 320px at 82% 10%, rgba(228,106,46,0.20), transparent 60%)",
          }}
        />
        <div className="campaign-orb campaign-orb--a" />
        <div className="campaign-orb campaign-orb--b" />
        <div className="campaign-orb campaign-orb--c" />
        <ThreeBackdrop className="absolute inset-0" accent={FIRE_ACCENT} />
      </div>

      <div className="relative site-container flex min-h-[calc(100svh-4rem)] items-center py-14 md:py-16">
        <div className="grid w-full gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-start">
          <div className="space-y-6">
            <div
              className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2 text-xs tracking-[0.22em] uppercase text-muted-foreground backdrop-blur"
              data-reveal
            >
              <Sparkles className="h-4 w-4" />
              <span>Brand strategy + marketing analytics</span>
            </div>

            <h1
              className="font-display text-6xl leading-[0.88] tracking-tight md:text-8xl lg:text-9xl"
              data-reveal
            >
              {profile.name}
            </h1>
            <p
              className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
              data-reveal
            >
              {profile.summary}
            </p>

            <div className="flex flex-wrap items-center gap-3" data-reveal>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  scrollToSection("#contact");
                }}
              >
                Contact
              </Button>

              <span className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-2 text-sm text-muted-foreground backdrop-blur">
                <MapPin className="h-4 w-4" />
	                {profile.location}
	              </span>
	            </div>
	          </div>

	          <div className="relative md:ml-auto md:max-w-[420px]" data-reveal>
	            <div className="campaign-frame" aria-hidden />
	            <Card className="relative overflow-hidden bg-background/70 backdrop-blur md:mt-2">
	              <div className="relative aspect-[3/4] overflow-hidden">
	                <div className="campaign-photo" data-parallax="0.08">
	                  <img
	                    src={profile.photoUrl}
	                    alt={profile.name}
	                    className="h-full w-full object-cover"
	                    loading="lazy"
	                  />
	                </div>
	                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
	                <div className="absolute bottom-4 left-4 right-4">
	                  <div className="text-xs tracking-[0.22em] uppercase text-white/70">
	                    {profile.roleTagline}
	                  </div>
	                  <div className="mt-2 flex flex-wrap gap-2">
		                    <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
	                      <Button
	                        size="sm"
	                        className="rounded-full"
	                        style={{
	                          backgroundColor: "rgba(16,17,20,0.88)",
	                          color: "#f7f7f2",
	                        }}
	                      >
	                        Resume <ArrowUpRight className="ml-2 h-4 w-4" />
	                      </Button>
	                    </a>
	                    <a
	                      href={profile.social.linkedin}
	                      target="_blank"
	                      rel="noreferrer"
	                    >
	                      <Button
	                        size="sm"
	                        variant="outline"
	                        className="rounded-full bg-white/10 text-white border-white/30 hover:bg-white/15"
	                      >
	                        LinkedIn <ArrowUpRight className="ml-2 h-4 w-4" />
	                      </Button>
	                    </a>
	                  </div>
	                </div>
	              </div>
	            </Card>
	          </div>
        </div>
      </div>
    </section>
  );
}

function WorkGrid({ items }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((w) => (
        <Link
          key={w.id}
          to={`/work/${w.id}`}
          className="group"
          data-reveal
          onClick={saveHomeScrollPosition}
        >
          <Card className="h-full overflow-hidden transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_20px_44px_-28px_rgba(0,0,0,0.42)]">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={w.cover}
                alt={w.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate font-display text-xl text-white">
                    {w.title}
                  </div>
                  <div className="truncate text-sm text-white/80">
                    {w.subtitle}
                  </div>
                </div>
                <span
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur"
                  style={{ border: `1px solid rgba(183,255,90,0.35)` }}
                >
                  {w.year}
                </span>
              </div>
            </div>
            <CardContent className="space-y-3 p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                  {w.category}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
              </div>
              <div className="flex flex-wrap gap-2">
                {w.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="rounded-full">
                    {t}
                  </Badge>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {w.overview}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function ProductStudiesGrid() {
  const scrollYRef = useRef(0);
  const activeElRef = useRef(null);

  return (
    <div className="grid gap-6 md:grid-cols-12">
      {(productStudies || []).map((item, idx) => {
        const span = idx === 0 ? "md:col-span-8" : "md:col-span-4";
        return (
          <Dialog
            key={item.id}
            onOpenChange={(open) => {
              if (open) {
                scrollYRef.current = window.scrollY || 0;
                activeElRef.current = document.activeElement;
              }
            }}
          >
            <DialogTrigger asChild>
              <button
                type="button"
                className={`group relative overflow-hidden rounded-2xl border bg-card/60 ${span} transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_20px_44px_-28px_rgba(0,0,0,0.42)]`}
                data-reveal
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="font-display text-2xl leading-none text-white">
                    {item.title}
                  </div>
                  <div className="mt-2 text-sm text-white/80">{item.caption}</div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">
                      Product study
                    </span>
                    {item.meta?.format ? (
                      <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
                        {item.meta.format}
                      </span>
                    ) : null}
                    {item.meta?.lighting ? (
                      <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
                        {item.meta.lighting}
                      </span>
                    ) : null}
                  </div>
                </div>
              </button>
            </DialogTrigger>

            <DialogContent
              className="w-[94vw] max-w-5xl max-h-[85vh] overflow-y-auto sm:rounded-2xl bg-background/85 backdrop-blur"
              onCloseAutoFocus={(event) => {
                event.preventDefault();
                window.requestAnimationFrame(() => {
                  window.scrollTo({ top: scrollYRef.current });
                  const el = activeElRef.current;
                  if (el && typeof el.focus === "function") {
                    el.focus({ preventScroll: true });
                  }
                });
              }}
            >
              <DialogHeader>
                <DialogTitle className="font-display text-3xl">
                  {item.title}
                </DialogTitle>
                <DialogDescription>{item.caption}</DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
                    <TabsTrigger
                      value="details"
                      className="rounded-full border bg-background/60 px-4 py-2 data-[state=active]:bg-foreground data-[state=active]:text-background"
                    >
                      Product details
                    </TabsTrigger>
                    <TabsTrigger
                      value="preview"
                      className="rounded-full border bg-background/60 px-4 py-2 data-[state=active]:bg-foreground data-[state=active]:text-background"
                    >
                      3D preview
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="mt-4">
                    <div className="grid gap-6 md:grid-cols-[1.25fr_0.75fr]">
                      <div className="overflow-hidden rounded-2xl border bg-card/60">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="h-[60vh] w-full object-contain bg-black/30"
                        />
                      </div>

                      <Card className="bg-secondary/20">
                        <CardHeader>
                          <CardTitle className="font-display">Product details</CardTitle>
                          <CardDescription>Commercial-style breakdown</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                          <div className="flex items-center justify-between gap-4 rounded-xl border bg-background/40 px-4 py-3">
                            <span className="text-muted-foreground">Client</span>
                            <span className="font-medium text-foreground">
                              {item.meta?.client || "—"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4 rounded-xl border bg-background/40 px-4 py-3">
                            <span className="text-muted-foreground">Format</span>
                            <span className="font-medium text-foreground">
                              {item.meta?.format || "—"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4 rounded-xl border bg-background/40 px-4 py-3">
                            <span className="text-muted-foreground">Lighting</span>
                            <span className="font-medium text-foreground">
                              {item.meta?.lighting || "—"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4 rounded-xl border bg-background/40 px-4 py-3">
                            <span className="text-muted-foreground">Focus</span>
                            <span className="font-medium text-foreground">
                              {item.meta?.focus || "—"}
                            </span>
                          </div>

                          <div className="rounded-xl border bg-background/40 px-4 py-3">
                            <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                              Deliverables
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {(item.meta?.deliverables || []).map((d) => (
                                <Badge
                                  key={d}
                                  variant="secondary"
                                  className="rounded-full"
                                >
                                  {d}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-xl border bg-background/40 px-4 py-3 text-muted-foreground">
                            Presented like a commercial asset: clear framing,
                            intentional lighting, and crops that can ship into a
                            campaign.
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="preview" className="mt-4">
                    <Product3DPreview imageUrl={item.url} accent={FIRE_ACCENT} />
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}

function VisualDiaryChapter() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const timersRef = useRef([]);
  const cycleActiveRef = useRef(false);
  const [phase, setPhase] = useState("idle"); // idle -> intro -> dock -> reveal

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const introEl = introRef.current || sectionEl;
    if (!sectionEl || !introEl) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      cycleActiveRef.current = true;
      setPhase("reveal");
      return;
    }

    const clearTimers = () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };

    const resetSequence = () => {
      clearTimers();
      setPhase("idle");
    };

    const INTRO_MS = 700;
    const HOLD_MS = 400;
    const DOCK_MS = 700;
    const START_THRESHOLD = 0.4;

    const startSequence = () => {
      clearTimers();
      setPhase("intro");

      timersRef.current.push(
        window.setTimeout(() => {
          setPhase("dock");
        }, INTRO_MS + HOLD_MS)
      );

      timersRef.current.push(
        window.setTimeout(() => {
          setPhase("reveal");
        }, INTRO_MS + HOLD_MS + DOCK_MS)
      );
    };

    const startObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (entry.intersectionRatio < START_THRESHOLD) return;
        if (cycleActiveRef.current) return;
        cycleActiveRef.current = true;
        startSequence();
      },
      { threshold: START_THRESHOLD }
    );

    const resetObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) return;
        if (!cycleActiveRef.current) return;
        cycleActiveRef.current = false;
        resetSequence();
      },
      { threshold: 0 }
    );

    startObserver.observe(introEl);
    resetObserver.observe(sectionEl);

    return () => {
      startObserver.disconnect();
      resetObserver.disconnect();
      clearTimers();
    };
  }, []);

  const docked = phase === "dock" || phase === "reveal";
  const revealed = phase === "reveal";

  return (
    <section id="visual-diary" ref={sectionRef} className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(900px 520px at 18% 18%, rgba(255,70,190,0.10), transparent 60%), radial-gradient(900px 520px at 82% 22%, rgba(34,66,240,0.10), transparent 60%), radial-gradient(900px 520px at 54% 92%, rgba(228,106,46,0.12), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 editorial-dots opacity-45" />
      </div>

      <div className="relative site-container section-pad">
        <div className="relative">
          <div aria-hidden className="h-24 md:h-28" />

          <div
            ref={introRef}
            aria-hidden={phase === "idle"}
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[65vh] md:h-[70vh]"
          >
            <h2
              className={[
                "absolute font-display leading-none text-white drop-shadow-sm",
                "text-5xl sm:text-6xl md:text-7xl",
                "transition-all ease-out duration-700 will-change-transform",
                docked
                  ? "left-0 top-0 translate-x-0 translate-y-0 origin-top-left"
                  : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center",
                phase === "idle"
                  ? "opacity-0 scale-[0.985]"
                  : docked
                    ? "opacity-100 scale-[0.62] md:scale-[0.66]"
                    : "opacity-100 scale-[1.03]",
              ].join(" ")}
            >
              Visual Diary
            </h2>
          </div>

          <div
            className={[
              "relative z-10 transition-all ease-out duration-700",
              revealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[30px] pointer-events-none",
            ].join(" ")}
          >
          <div className="mt-10">
            <SectionHeading
              kicker="Product studies"
              title="Product storyboards"
              description="Your product photography, styled like brand assets and treated with the same care as a campaign."
              icon={Camera}
            />
            <div className="mt-8">
              <ProductStudiesGrid />
            </div>
          </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function MotionGrid() {
  const motionYouTubeIds = ["2KqndrjUujM", "qQ9MAljH8_E"];

  const motionEmbedSources = motionYouTubeIds.map((id) => {
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      loop: "1",
      playlist: id,
      controls: "0",
      modestbranding: "1",
      playsinline: "1",
      rel: "0",
    });
    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  });

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
      {(motionWorks || []).slice(0, motionEmbedSources.length).map((m, idx) => {
        const src = motionEmbedSources[idx];

        return (
          <Card
            key={m.id}
            className="group h-full overflow-hidden border-white/10 bg-black/45 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_-48px_rgba(0,0,0,0.85)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_84px_-56px_rgba(228,106,46,0.22)]"
            data-reveal
          >
            <div className="relative bg-black/70">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={src}
                  title={m.title}
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                />
                <div className="pointer-events-none absolute bottom-4 left-4 right-4">
                  <div className="max-w-[92%] rounded-2xl bg-black/35 px-4 py-3 backdrop-blur-sm">
                    <div className="font-display text-lg font-semibold leading-tight tracking-tight text-white">
                      {m.title}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-white/80">
                      {m.description}
                    </p>
                  </div>
                </div>
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
              />
            </div>

            <CardContent className="sr-only">
              <div>{m.title}</div>
              <div>{m.description}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

const VISUAL_IDENTITY_WORK = [
  {
    title: "AFF — Campaign Visual",
    description:
      "Campaign visual designed in Adobe Photoshop, focusing on hierarchy, contrast, and attention capture.",
    src: "/products/photos/AFF PSD.jpg",
  },
  {
    title: "Cadbury — Brand Graphic Exploration",
    description:
      "Brand-led visual exploration created in Adobe Photoshop, balancing legacy identity with modern graphic treatment.",
    src: "/products/photos/cadbury.jpg",
  },
  {
    title: "TDRI — Logo System",
    description:
      "Logo and visual mark developed in Adobe Photoshop with emphasis on structure, clarity, and brand credibility.",
    src: "/products/photos/TDRI LOGO 2_1.jpg",
  },
];

function VisualIdentityGrid() {
  const items = VISUAL_IDENTITY_WORK.map((item) => ({
    ...item,
    url: `${process.env.PUBLIC_URL}${encodeURI(item.src)}`,
  }));

  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {items.map((item) => (
        <div
          key={item.title}
          className="group h-full overflow-hidden rounded-2xl bg-black/45 shadow-[0_22px_60px_-52px_rgba(0,0,0,0.9)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_80px_-56px_rgba(228,106,46,0.28)]"
          data-reveal
        >
          <div className="relative overflow-hidden bg-black/70">
            <div className="aspect-[4/3] w-full">
              <img
                src={item.url}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0"
            />
          </div>

          <div className="space-y-2 p-6">
            <div className="font-display text-lg font-semibold leading-tight tracking-tight text-white">
              {item.title}
            </div>
            <p className="max-w-[56ch] text-sm leading-relaxed text-white/70">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactSection() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const formEl = e.currentTarget;
      const data = new FormData(formEl);

      const res = await fetch(formspree.endpoint, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || "Form submission failed");
      }

      formEl.reset();
      toast({
        title: "Message sent",
        description:
          "Thanks — I’ll get back to you soon. If it’s urgent, email me directly.",
      });
    } catch (err) {
      toast({
        title: "Couldn’t send message",
        description:
          err?.message || "Please try again, or send an email directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-10 md:grid-cols-[1fr_0.9fr]">
      <Card className="border bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="font-display text-2xl">Send a message</CardTitle>
          <CardDescription>
            Share a short brief, timeline, and what you want to improve.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                  Your name
                </label>
                <Input name="name" placeholder="Rituraj" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                  Your email
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@domain.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                Subject
              </label>
              <Input name="subject" placeholder="Brand strategy / research / collaboration" />
            </div>

            <div className="space-y-2">
              <label className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                Message
              </label>
              <Textarea
                name="message"
                placeholder="Tell me a bit about what you need and your timeline."
                className="min-h-36"
                required
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="submit"
                className="rounded-full"
                style={{
                  backgroundColor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                }}
                disabled={loading}
              >
                {loading ? "Sending…" : "Send message"}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>

              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Prefer LinkedIn? Message me there →
              </a>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className="bg-secondary/35">
          <CardHeader>
            <CardTitle className="font-display">Direct</CardTitle>
            <CardDescription>For quick coordination.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Email</span>
              <a className="font-medium hover:underline" href={profile.social.email}>
                {profile.email}
              </a>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">LinkedIn</span>
              <a className="font-medium hover:underline" href={profile.social.linkedin} target="_blank" rel="noreferrer">
                Open profile
              </a>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-muted-foreground">Location</span>
              <span className="text-right font-medium">{profile.address}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div
            className="p-6"
            style={{
              background:
                "radial-gradient(700px 320px at 20% 20%, rgba(228,106,46,0.16), transparent 60%), radial-gradient(700px 320px at 80% 10%, rgba(228,106,46,0.10), transparent 60%)",
            }}
          >
            <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
              Availability
            </div>
            <div className="mt-2 text-lg font-medium text-foreground">
              {profile.availability}
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              Best response time: within 24–48 hours.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const location = useLocation();

  useLayoutEffect(() => {
    const hash = typeof location?.hash === "string" ? location.hash : "";
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        el.scrollIntoView({
          block: "start",
          behavior: reduceMotion ? "auto" : "smooth",
        });
        return;
      }
    }

    let restored = false;
    try {
      const raw = sessionStorage.getItem(HOME_SCROLL_KEY);
      if (raw) {
        sessionStorage.removeItem(HOME_SCROLL_KEY);
        const parsed = JSON.parse(raw);
        const y = typeof parsed?.y === "number" ? parsed.y : null;
        const ts = typeof parsed?.ts === "number" ? parsed.ts : null;
        if (y != null && (ts == null || Date.now() - ts <= 5 * 60 * 1000)) {
          window.scrollTo({ top: y });
          restored = true;
        }
      }
    } catch {
      // ignore
    }

    if (!restored) window.scrollTo({ top: 0, left: 0 });
  }, [location.key, location.hash]);

  return (
    <div className="min-h-screen portfolio-grain">
      <SiteHeader />
      <main className="flex flex-col">
        <Hero />

        <section id="work" data-reveal className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(900px 520px at 14% 18%, rgba(34,66,240,0.14), transparent 60%), radial-gradient(900px 520px at 86% 22%, rgba(255,70,190,0.12), transparent 60%), radial-gradient(900px 520px at 60% 86%, rgba(228,106,46,0.14), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 editorial-dots opacity-60" />
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          </div>

          <div className="relative site-container section-pad">
            <SectionHeading
              kicker="What I bring"
              title="Brand and marketing, built for execution"
              description="I start with the decision, validate direction with KPIs in Excel/Tableau dashboards, and deliver messaging and campaigns teams can launch, measure, and improve."
              icon={Briefcase}
            />

            <div className="mt-12 grid gap-6 md:grid-cols-12">
              <Card className="group overflow-hidden bg-card/60 md:col-span-7">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">Problem-first brand decisions</CardTitle>
                  <CardDescription>
                    Audience, positioning, message, or channel.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  I define the goal and trade-offs early so teams align and execution stays focused.
                </CardContent>
              </Card>

              <Card className="group overflow-hidden bg-card/60 md:col-span-5">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">Validate with analytics</CardTitle>
                  <CardDescription>
                    KPI tracking in Excel and Tableau dashboards.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  I use funnel and campaign data to identify drivers, choose changes, and track impact.
                </CardContent>
              </Card>

              <Card className="group overflow-hidden bg-card/60 md:col-span-12">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">Storytelling built to launch</CardTitle>
                  <CardDescription>
                    Journalism, filmmaking, ad creation, and visual design.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  I turn insights into a clear narrative, messaging, and creative assets that teams can brief and launch.
                </CardContent>
              </Card>
            </div>

            <div
              className="mt-12 overflow-hidden rounded-2xl border bg-secondary/25 p-5 md:p-6"
              style={{
                background:
                  "radial-gradient(900px 420px at 12% 20%, rgba(34,66,240,0.10), transparent 60%), radial-gradient(900px 420px at 85% 15%, rgba(255,70,190,0.10), transparent 60%), radial-gradient(900px 420px at 65% 85%, rgba(228,106,46,0.12), transparent 60%)",
              }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-muted-foreground">
                  Want the full case-study view?
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/projects" onClick={saveHomeScrollPosition}>
                    <Button className="rounded-full">
                      Browse projects <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
	                  <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="rounded-full">
                      Resume <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" data-reveal className="relative overflow-hidden border-y">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 opacity-80"
              style={{
                background:
                  "radial-gradient(900px 520px at 16% 10%, rgba(255,70,190,0.10), transparent 60%), radial-gradient(900px 520px at 84% 14%, rgba(34,66,240,0.10), transparent 60%), radial-gradient(900px 520px at 50% 90%, rgba(228,106,46,0.12), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 editorial-dots opacity-45" />
          </div>

          <div className="relative site-container section-pad">
            <SectionHeading
              kicker="Projects"
              title="Projects"
              description="Structured case studies, grouped by category."
              icon={Sparkles}
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <Link to="/projects" className="group block" onClick={saveHomeScrollPosition}>
                <Card className="relative overflow-hidden bg-card/60 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_20px_44px_-28px_rgba(0,0,0,0.42)]">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-80"
                    style={{
                      background:
                        "radial-gradient(520px 300px at 15% 25%, rgba(228,106,46,0.22), transparent 60%), radial-gradient(520px 320px at 85% 20%, rgba(255,70,190,0.18), transparent 60%)",
                    }}
                  />
                  <CardHeader className="relative">
                    <CardTitle className="font-display text-2xl">Marketing & Strategy</CardTitle>
                    <CardDescription>Brand, messaging, go-to-market</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/projects" className="group block" onClick={saveHomeScrollPosition}>
                <Card className="relative overflow-hidden bg-card/60 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_20px_44px_-28px_rgba(0,0,0,0.42)]">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-80"
                    style={{
                      background:
                        "radial-gradient(520px 320px at 20% 25%, rgba(34,66,240,0.22), transparent 60%), radial-gradient(520px 320px at 85% 25%, rgba(168,227,111,0.18), transparent 60%)",
                    }}
                  />
                  <CardHeader className="relative">
                    <CardTitle className="font-display text-2xl">Analytics & ML</CardTitle>
                    <CardDescription>Measurement, modeling, insights</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/projects" className="group block" onClick={saveHomeScrollPosition}>
                <Card className="relative overflow-hidden bg-card/60 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_20px_44px_-28px_rgba(0,0,0,0.42)]">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-80"
                    style={{
                      background:
                        "radial-gradient(520px 320px at 20% 25%, rgba(255,70,190,0.18), transparent 60%), radial-gradient(520px 320px at 85% 25%, rgba(34,66,240,0.18), transparent 60%), radial-gradient(520px 320px at 40% 80%, rgba(228,106,46,0.18), transparent 60%)",
                    }}
                  />
                  <CardHeader className="relative">
                    <CardTitle className="font-display text-2xl">Business & Sales</CardTitle>
                    <CardDescription>Conversion, negotiation, pipeline</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-12">
              {(projects || [])
                .filter(
                  (p) => !["lamaison-community", "inside-sales-project"].includes(p.id)
                )
                .slice(0, 4)
                .map((p, idx) => {
                  const span =
                    idx === 0
                      ? "md:col-span-12"
                      : idx % 3 === 1
                        ? "md:col-span-7"
                        : "md:col-span-5";

                  return (
                    <Link
                      key={p.id}
                      to={`/projects/${p.id}`}
                      className={`group block ${span}`}
                      data-reveal
                      onClick={saveHomeScrollPosition}
                    >
                      <Card className="h-full overflow-hidden transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_20px_44px_-28px_rgba(0,0,0,0.42)]">
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <div
                            className="absolute inset-0 campaign-parallax"
                            data-parallax="0.05"
                          >
                            <img
                              src={p.cover}
                              alt={p.title}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                              loading="lazy"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                          <div className="absolute left-3 top-3">
                            <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">
                              {p.category}
                            </span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="truncate font-display text-2xl leading-none tracking-tight text-white md:text-3xl">
                              <span className="relative inline-block after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                                {p.title}
                              </span>
                            </div>
                            <div className="mt-2 inline-flex items-center gap-2 text-sm text-white/85">
                              <span className="relative inline-block after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                                View case study
                              </span>
                              <ArrowUpRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>

                        <CardContent className="p-5 pt-4">
                          <div className="text-sm leading-relaxed text-muted-foreground">
                            {p.oneLiner}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
            </div>

            <div className="mt-6 rounded-2xl border bg-card/60 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-display text-2xl">Browse the full Projects page</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Each case study includes: overview, goal, my role, approach, outcome, and learnings.
                  </div>
                </div>
                <Link to="/projects" onClick={saveHomeScrollPosition}>
                  <Button className="rounded-full">
                    Open Projects <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>


        <section id="skills" data-reveal className="relative overflow-hidden border-y">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 opacity-85"
              style={{
                background:
                  "radial-gradient(900px 520px at 18% 18%, rgba(34,66,240,0.12), transparent 60%), radial-gradient(900px 520px at 86% 22%, rgba(255,70,190,0.10), transparent 60%), radial-gradient(900px 520px at 54% 92%, rgba(228,106,46,0.12), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 editorial-dots opacity-45" />
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
            <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
          </div>

          <div className="relative site-container section-pad">
            <SectionHeading kicker="Skills" title="Skills" icon={Sparkles} />
            <div className="mt-12">
              <SkillsGrid />
            </div>
          </div>
        </section>

        <section id="work-experience" data-reveal className="relative overflow-hidden border-y">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(900px 520px at 18% 10%, rgba(228,106,46,0.14), transparent 60%), radial-gradient(900px 520px at 78% 14%, rgba(34,66,240,0.12), transparent 60%), radial-gradient(900px 520px at 62% 92%, rgba(255,70,190,0.12), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 editorial-dots opacity-60" />
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
            <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
          </div>

          <div className="relative site-container section-pad">
            <div className="grid gap-12 md:grid-cols-12">
              <div className="md:col-span-4 md:sticky md:top-24 self-start">
                <SectionHeading
                  kicker="Work experience"
                  title="Work Experience"
                  description="Narratives from roles where decisions, communication, and outcomes mattered."
                  icon={Wand2}
                />
              </div>

              <div className="md:col-span-8 space-y-12">
                <div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <h3 className="font-display text-2xl">Professional experience</h3>
                    <div className="text-sm text-muted-foreground">
                      Sales, business development, and client-facing roles.
                    </div>
                  </div>
                  <ExperienceGrid items={professionalExperience} />
                </div>

                <div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <h3 className="font-display text-2xl">Volunteering experience</h3>
                    <div className="text-sm text-muted-foreground">
                      Community work and sustainability education.
                    </div>
                  </div>
                  <ExperienceGrid items={volunteeringExperience} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="education" data-reveal className="relative overflow-hidden border-y">
	          <div aria-hidden className="pointer-events-none absolute inset-0">
	            <div
	              className="absolute inset-0 opacity-90"
	              style={{
	                background:
	                  "radial-gradient(900px 520px at 14% 18%, rgba(34,66,240,0.10), transparent 60%), radial-gradient(900px 520px at 86% 22%, rgba(255,70,190,0.10), transparent 60%), radial-gradient(900px 520px at 58% 92%, rgba(228,106,46,0.12), transparent 60%)",
	              }}
	            />
	            <div className="absolute inset-0 editorial-dots opacity-55" />
	            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
	            <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
	          </div>

	          <div className="relative site-container section-pad">
	            <SectionHeading
	              kicker="Education"
	              title="Education"
	              description="A CV-style snapshot with coursework and practical capabilities on demand."
	              icon={BookOpen}
	            />
	            <div className="mt-12">
	              <EducationGrid />
	            </div>
	          </div>
	        </section>

	        <section id="resume" data-reveal className="relative overflow-hidden border-y">
	          <div aria-hidden className="pointer-events-none absolute inset-0">
	            <div
	              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(900px 520px at 14% 18%, rgba(228,106,46,0.14), transparent 60%), radial-gradient(900px 520px at 86% 22%, rgba(34,66,240,0.12), transparent 60%), radial-gradient(900px 520px at 58% 92%, rgba(255,70,190,0.10), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 editorial-dots opacity-55" />
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
            <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
          </div>

          <div className="relative site-container section-pad">
            <SectionHeading
              kicker="Resume"
              title="A simple, readable snapshot"
              description="Open the PDF, or skim the essentials here. (PDF is the source of truth.)"
              icon={FileText}
            />

            <div className="mt-12 grid gap-6 md:grid-cols-12">
              <Card className="relative overflow-hidden md:col-span-7 md:-rotate-[0.6deg]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-80"
                  style={{
                    background:
                      "radial-gradient(520px 320px at 22% 20%, rgba(34,66,240,0.12), transparent 60%), radial-gradient(520px 320px at 88% 24%, rgba(228,106,46,0.12), transparent 60%)",
                  }}
                />
                <CardHeader className="relative">
                  <CardTitle className="font-display">Highlights</CardTitle>
                  <CardDescription>Quick overview.</CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-4 text-sm text-muted-foreground">
                  <div className="rounded-xl border bg-background p-4">
                    <div className="text-xs tracking-[0.22em] uppercase">Profile</div>
                    <div className="mt-2 text-foreground">{profile.summary}</div>
                  </div>

                  <div className="rounded-xl border bg-background p-4">
                    <div className="text-xs tracking-[0.22em] uppercase">Core skills</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Object.entries(skills.groups).map(([group, items]) => (
                        <React.Fragment key={group}>
                          {items.map((s) => (
                            <Badge key={`${group}:${s}`} variant="secondary" className="rounded-full">
                              {s}
                            </Badge>
                          ))}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
	                    <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="rounded-full" style={{ backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                        View full resume <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                    <a href={profile.social.linkedin} target="_blank" rel="noreferrer">
                      <Button variant="outline" className="rounded-full">
                        LinkedIn <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden md:col-span-5 md:rotate-[0.6deg]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-75"
                  style={{
                    background:
                      "radial-gradient(520px 320px at 18% 18%, rgba(255,70,190,0.10), transparent 60%), radial-gradient(520px 320px at 82% 30%, rgba(34,66,240,0.10), transparent 60%)",
                  }}
                />
                <CardHeader className="relative">
                  <CardTitle className="font-display">Details</CardTitle>
                  <CardDescription>Kept minimal on purpose.</CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-3 text-sm text-muted-foreground">
                  <div className="rounded-xl border bg-background p-4">
                    <div className="text-xs tracking-[0.22em] uppercase">Education</div>
                    <div className="mt-2 text-foreground">
                      EM-Lyon Business School — Masters in Management (2024–Present)
                    </div>
                    <div className="mt-1">
                      Amity University — Bachelor of Journalism and Mass Communication (2019–2022)
                    </div>
                  </div>

                  <div className="rounded-xl border bg-background p-4">
                    <div className="text-xs tracking-[0.22em] uppercase">Tools</div>
                    <div className="mt-2">Excel, Tableau, Figma, Canva, Adobe Creative Suite</div>
                  </div>

                  <div className="rounded-xl border bg-background p-4">
                    <div className="text-xs tracking-[0.22em] uppercase">Languages</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {skills.languages.map((l) => (
                        <span key={l} className="rounded-full border bg-background px-3 py-1 text-xs">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="services" data-reveal className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 opacity-85"
              style={{
                background:
                  "radial-gradient(900px 520px at 18% 22%, rgba(34,66,240,0.10), transparent 60%), radial-gradient(900px 520px at 86% 26%, rgba(228,106,46,0.12), transparent 60%), radial-gradient(900px 520px at 54% 92%, rgba(255,70,190,0.10), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 editorial-dots opacity-40" />
          </div>

          <div className="relative site-container section-pad">
            <SectionHeading
              kicker="Services"
              title="Where I can help"
              description="Strategy-first, with the right amount of analysis and craft."
              icon={Sparkles}
            />

            <div className="mt-12 grid gap-6 md:grid-cols-12">
              {(services || []).map((s, idx) => {
                const span =
                  idx === 0
                    ? "md:col-span-7"
                    : idx === 1
                      ? "md:col-span-5"
                      : "md:col-span-12";

                const wash =
                  idx === 0
                    ? "radial-gradient(520px 300px at 18% 22%, rgba(34,66,240,0.14), transparent 60%), radial-gradient(520px 320px at 88% 18%, rgba(255,70,190,0.12), transparent 60%)"
                    : idx === 1
                      ? "radial-gradient(520px 320px at 22% 20%, rgba(228,106,46,0.16), transparent 62%), radial-gradient(520px 320px at 88% 28%, rgba(34,66,240,0.12), transparent 60%)"
                      : "radial-gradient(720px 360px at 18% 30%, rgba(255,70,190,0.10), transparent 60%), radial-gradient(720px 360px at 82% 26%, rgba(228,106,46,0.12), transparent 60%)";

                return (
                  <Card
                    key={s.title}
                    className={`group relative h-full overflow-hidden ${span}`}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-80"
                      style={{ background: wash }}
                    />
                    <CardHeader className="relative">
                      <CardTitle className="font-display text-2xl">
                        {s.title}
                      </CardTitle>
                      <CardDescription>{s.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="relative">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {s.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-center justify-between gap-3 rounded-lg border bg-background/60 px-3 py-2 backdrop-blur transition-colors group-hover:bg-background/75"
                          >
                            <span>{b}</span>
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: ACCENT }}
                            />
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

          <VisualDiaryChapter />

	        <section id="motion" data-reveal className="relative overflow-hidden border-y">
	          <div aria-hidden className="pointer-events-none absolute inset-0">
	            <div
	              className="absolute inset-0 opacity-85"
              style={{
                background:
                  "radial-gradient(900px 520px at 12% 22%, rgba(228,106,46,0.14), transparent 60%), radial-gradient(900px 520px at 84% 16%, rgba(34,66,240,0.12), transparent 60%), radial-gradient(900px 520px at 52% 92%, rgba(255,70,190,0.10), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 editorial-dots opacity-45" />
          </div>

	          <div className="relative site-container section-pad">
	            <SectionHeading
	              kicker="Motion design"
	              title="Editing & Rhythm"
	              description="Motion design work focused on pacing, typography, and visual storytelling."
	              descriptionClassName="text-sm leading-6 md:text-sm"
	              icon={Film}
	            />
	            <div className="mt-14 md:mt-16">
	              <MotionGrid />
	            </div>
	          </div>
	        </section>

	        <section id="visual-identity" data-reveal className="relative overflow-hidden border-y">
	          <div aria-hidden className="pointer-events-none absolute inset-0">
	            <div
	              className="absolute inset-0 opacity-85"
	              style={{
	                background:
	                  "radial-gradient(900px 520px at 10% 20%, rgba(255,70,190,0.12), transparent 60%), radial-gradient(900px 520px at 86% 22%, rgba(34,66,240,0.10), transparent 60%), radial-gradient(900px 520px at 54% 90%, rgba(228,106,46,0.12), transparent 60%)",
	              }}
	            />
	            <div className="absolute inset-0 editorial-dots opacity-40" />
	          </div>

	          <div className="relative site-container section-pad">
	            <SectionHeading
	              kicker="Visual identity"
	              title="Visual Identity & Brand Graphics"
	              description="Logos, campaign visuals, and brand assets built for clarity, recall, and emotional impact."
	              icon={Sparkles}
	            />
	            <div className="mt-14 md:mt-16">
	              <VisualIdentityGrid />
	            </div>
	          </div>
	        </section>

		        <section
		          id="interests"
		          data-reveal
		          className="relative overflow-hidden"
	        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 opacity-80"
              style={{
                background:
                  "radial-gradient(900px 520px at 18% 18%, rgba(34,66,240,0.10), transparent 60%), radial-gradient(900px 520px at 82% 22%, rgba(255,70,190,0.10), transparent 60%), radial-gradient(900px 520px at 54% 92%, rgba(228,106,46,0.12), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 editorial-dots opacity-45" />
          </div>

          <div className="relative site-container section-pad">
            <SectionHeading
              kicker="Interests"
              title="What I pay attention to"
              description="The details that shape taste and strategy decisions."
              icon={Sparkles}
            />

            <div className="mt-12 grid gap-6 md:grid-cols-12">
              {(interests || []).map((i, idx) => {
                const span =
                  idx === 0
                    ? "md:col-span-5"
                    : idx === 1
                      ? "md:col-span-7"
                      : "md:col-span-12";

                const tone =
                  idx === 2
                    ? "bg-secondary/25"
                    : "";

                return (
                  <Card key={i.title} className={`h-full ${span} ${tone}`}>
                    <CardHeader>
                      <CardTitle className="font-display text-2xl">
                        {i.title}
                      </CardTitle>
                      <CardDescription>{i.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" data-reveal className="relative overflow-hidden border-t">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(900px 520px at 12% 26%, rgba(228,106,46,0.16), transparent 60%), radial-gradient(900px 520px at 86% 18%, rgba(34,66,240,0.12), transparent 60%), radial-gradient(900px 520px at 55% 92%, rgba(255,70,190,0.10), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 editorial-dots opacity-50" />
          </div>

          <div className="relative site-container section-pad-last">
            <div className="mx-auto max-w-5xl">
              <SectionHeading
                kicker="Contact"
                title="Let’s make the next decision clearer"
                description="Send a short brief — I’ll reply with questions, a plan, and next steps."
                icon={Mail}
                align="center"
              />
              <div className="mt-12 rounded-3xl border bg-card/60 p-6 backdrop-blur md:p-10">
                <ContactSection />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background/60 backdrop-blur">
        <div className="site-container py-12 md:py-14 lg:py-16">
          {/* Big name footer treatment (reference-inspired) */}
          <div className="relative overflow-hidden rounded-2xl border bg-card/60 p-8 md:p-10">
            <div
              className="absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(900px 520px at 12% 20%, rgba(228,106,46,0.14), transparent 60%), radial-gradient(900px 520px at 85% 15%, rgba(228,106,46,0.10), transparent 60%)",
              }}
            />
            <div className="relative">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                    Portfolio
                  </div>
                  <div className="mt-3 font-display text-5xl leading-[0.85] tracking-tight md:text-7xl">
                    Rituraj
                    <br />
                    Rituraj
                  </div>
                  <div className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
                    {profile.roleTagline}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
	                  <a
	                    href={profile.resumeUrl}
	                    target="_blank"
	                    rel="noopener noreferrer"
	                    className="inline-flex items-center justify-center rounded-full border bg-background/50 px-4 py-2 text-sm transition-colors hover:bg-secondary"
	                  >
                    Resume <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border bg-background/50 px-4 py-2 text-sm transition-colors hover:bg-secondary"
                  >
                    LinkedIn <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="inline-flex items-center justify-center rounded-full border bg-background/50 px-4 py-2 text-sm transition-colors hover:bg-secondary"
                  >
                    Back to top <ArrowUpRight className="ml-2 h-4 w-4 rotate-[-45deg]" />
                  </button>
                </div>
              </div>

              <div className="mt-10 grid gap-6 border-t pt-6 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                    Contact
                  </div>
                  <a className="text-sm hover:underline" href={profile.social.email}>
                    {profile.email}
                  </a>
                  <div className="text-sm text-muted-foreground">{profile.location}</div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                    Explore
                  </div>
                  <div className="flex flex-wrap gap-2">
	                    {navigation.slice(0, 6).map((n) => (
	                      <button
	                        key={n.href}
	                        type="button"
	                        onClick={() => {
	                          scrollToSection(n.href);
	                        }}
	                        className="rounded-full border bg-background/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
	                      >
	                        {n.label}
	                      </button>
	                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                    Note
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Built as a portfolio MVP. Work images are placeholders for now.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
