import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/mock";

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

function ProjectCard({ p }) {
  return (
    <Link to={`/projects/${p.id}`} className="group">
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={p.cover}
            alt={p.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate font-display text-xl text-white">
                {p.title}
              </div>
              <div className="truncate text-sm text-white/80">
                {p.subtitle}
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-white/85" />
          </div>
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-base">{p.category}</CardTitle>
          <CardDescription>{p.oneLiner}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {p.tags.slice(0, 4).map((t) => (
              <Badge key={t} variant="secondary" className="rounded-full">
                {t}
              </Badge>
            ))}
          </div>
          {p.impact ? (
            <div className="text-sm text-muted-foreground">{p.impact}</div>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Projects() {
  const [query, setQuery] = useState("");

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
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-8 md:pt-14">
	        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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

	          <div className="flex w-full max-w-md items-center">
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

        <Tabs defaultValue="All" className="mt-8">
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
              <div className="grid gap-4 md:grid-cols-2">
                {grouped[c].map((p) => (
                  <ProjectCard key={p.id} p={p} />
                ))}
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
