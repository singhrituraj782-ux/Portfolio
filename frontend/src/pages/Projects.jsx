import React, { useLayoutEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/mock";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ArrowUpRight, Search } from "lucide-react";

const categories = [
  "All",
  "Marketing & Strategy",
  "Analytics & Machine Learning",
  "Business & Sales",
  "Sustainability & Community",
];

const HIDDEN_PROJECT_IDS = new Set(["lamaison-community", "inside-sales-project"]);
const PROJECTS_SCROLL_KEY = "scroll:/projects";
const PROJECTS_STATE_KEY = "state:/projects";
const PROJECTS_STATE_TTL_MS = 5 * 60 * 1000;

function saveProjectsScrollPosition() {
  try {
    sessionStorage.setItem(
      PROJECTS_SCROLL_KEY,
      JSON.stringify({ y: window.scrollY || 0, ts: Date.now() })
    );
  } catch {
    // ignore
  }
}

function readProjectsState() {
  try {
    const raw = sessionStorage.getItem(PROJECTS_STATE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const ts = typeof parsed?.ts === "number" ? parsed.ts : null;
    if (ts != null && Date.now() - ts > PROJECTS_STATE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeProjectsState(state) {
  try {
    sessionStorage.setItem(PROJECTS_STATE_KEY, JSON.stringify({ ...state, ts: Date.now() }));
  } catch {
    // ignore
  }
}

function ProjectCard({ p }) {
  return (
    <Link
      to={`/projects/${p.id}`}
      className="group"
      data-reveal
      onClick={saveProjectsScrollPosition}
    >
      <Card className="h-full overflow-hidden transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_20px_44px_-28px_rgba(0,0,0,0.42)]">
        <div className="relative aspect-[16/9] overflow-hidden">
          <div className="absolute inset-0 campaign-parallax" data-parallax="0.05">
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
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div className="min-w-0">
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
        </div>

        <CardContent className="p-5 pt-4">
          <div className="text-sm leading-relaxed text-muted-foreground">
            {p.oneLiner}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Projects() {
  const initial = useMemo(() => readProjectsState(), []);

  const [query, setQuery] = useState(() => {
    const q = typeof initial?.query === "string" ? initial.query : "";
    return q;
  });

  const [activeCategory, setActiveCategory] = useState(() => {
    const raw = typeof initial?.tab === "string" ? initial.tab : "All";
    return categories.includes(raw) ? raw : "All";
  });

  useLayoutEffect(() => {
    writeProjectsState({ query, tab: activeCategory });
  }, [query, activeCategory]);

  useLayoutEffect(() => {
    let restored = false;

    try {
      const raw = sessionStorage.getItem(PROJECTS_SCROLL_KEY);
      if (raw) {
        sessionStorage.removeItem(PROJECTS_SCROLL_KEY);

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
  }, []);

  const visibleProjects = useMemo(
    () => projects.filter((p) => !HIDDEN_PROJECT_IDS.has(p.id)),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return visibleProjects;
    return visibleProjects.filter((p) => {
      const hay = [p.title, p.subtitle, p.category, ...(p.tags || [])]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, visibleProjects]);

  const grouped = useMemo(() => {
    const map = {};
    categories.forEach((c) => {
      map[c] = c === "All" ? filtered : filtered.filter((p) => p.category === c);
    });
    return map;
  }, [filtered]);

  return (
    <div className="min-h-screen">
      <div className="site-container pt-12 pb-10 md:pt-16">
        <div
          className="relative overflow-hidden rounded-3xl border bg-card/60 p-6 md:p-10"
          data-reveal
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(900px 420px at 12% 20%, rgba(34,66,240,0.16), transparent 60%), radial-gradient(900px 420px at 85% 15%, rgba(255,70,190,0.14), transparent 60%), radial-gradient(900px 420px at 65% 90%, rgba(228,106,46,0.16), transparent 60%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 editorial-dots opacity-55" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Link to="/" className="inline-flex">
                  <Button type="button" variant="outline" className="rounded-full">
                    Home
                  </Button>
                </Link>
                <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                  Projects
                </div>
              </div>
              <h1 className="mt-3 font-display text-5xl leading-[0.92] tracking-tight md:text-6xl">
                Case studies & builds
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                I don’t treat projects as “deliverables”. I treat them as decisions.
                Each case study shows how I framed the problem, what I chose to do,
                and what changed because of it.
              </p>
            </div>

            <div className="w-full max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9"
                  placeholder="Search projects (ROI, pricing, fraud, sustainability…)"
                />
              </div>
            </div>
          </div>
	        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mt-12">
          <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
            {categories.map((c) => (
              <TabsTrigger
                key={c}
                value={c}
                className="rounded-full border bg-background/60 px-4 py-2 data-[state=active]:bg-foreground data-[state=active]:text-background"
              >
                {c}
                <span className="ml-2 text-xs opacity-70">{grouped[c].length}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((c) => (
            <TabsContent key={c} value={c} className="mt-6">
              <div className="grid gap-6 md:grid-cols-12">
                {grouped[c].map((p, idx) => {
                  const span =
                    idx === 0 ? "md:col-span-12" : idx % 3 === 1 ? "md:col-span-7" : "md:col-span-5";
                  return (
                    <div key={p.id} className={span}>
                      <ProjectCard p={p} />
                    </div>
                  );
                })}
              </div>
              {grouped[c].length === 0 ? (
                <div className="mt-8 rounded-xl border bg-card/60 p-6 text-sm text-muted-foreground">
                  No results. Try another keyword.
                </div>
              ) : null}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
