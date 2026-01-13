import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { projects } from "@/mock";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { ArrowLeft, ArrowUpRight } from "lucide-react";

function SectionBlock({ title, body, children }) {
  return (
    <section className="space-y-2">
      <h2 className="font-display text-2xl tracking-tight">{title}</h2>
      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
        {body}
      </p>
      {children ? <div className="pt-4">{children}</div> : null}
    </section>
  );
}

function InlineImage({ src, alt, caption }) {
  return (
    <figure className="overflow-hidden rounded-2xl border bg-card/60">
      <img src={src} alt={alt} className="h-auto w-full" loading="lazy" />
      <figcaption className="border-t bg-background/40 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();

  const p = useMemo(() => projects.find((x) => x.id === id), [id]);
  const isSimbound = p?.id === "tableto-simbound";

  if (!p) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="text-sm text-muted-foreground">Not found</div>
        <h1 className="mt-2 font-display text-3xl">Project doesn’t exist.</h1>
        <div className="mt-6">
          <Link to="/projects">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/projects" className="inline-flex">
          <Button variant="outline" className="rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Projects
          </Button>
        </Link>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="rounded-full">
            {p.category}
          </Badge>
          {p.year ? (
            <Badge variant="outline" className="rounded-full">
              {p.year}
            </Badge>
          ) : null}
        </div>
      </div>

      <header className="mt-10">
        <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
          Case study
        </div>
        <h1 className="mt-3 font-display text-4xl leading-[1.03] tracking-tight md:text-5xl">
          {p.title}
        </h1>
        <p className="mt-3 text-base text-muted-foreground md:text-lg">
          {p.subtitle}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <Badge key={t} variant="secondary" className="rounded-full">
              {t}
            </Badge>
          ))}
        </div>
      </header>

      <div className="mt-8 overflow-hidden rounded-2xl border bg-card/60">
        <img src={p.cover} alt={p.title} className="h-[42vh] w-full object-cover" />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[1.25fr_0.75fr]">
        <Card className="bg-card/60">
          <CardHeader>
            <CardTitle className="font-display">Overview</CardTitle>
            <CardDescription>{p.oneLiner}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            {p.overview}
          </CardContent>
        </Card>

        <Card className="bg-secondary/35">
          <CardHeader>
            <CardTitle className="font-display">Impact</CardTitle>
            <CardDescription>What changed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {(p.metrics || []).map((m) => (
              <div key={m} className="rounded-xl border bg-background/40 px-3 py-3">
                <div className="text-foreground">{m}</div>
              </div>
            ))}
            {p.impact ? <div>{p.impact}</div> : null}
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <div className="space-y-8">
        <SectionBlock title="Goal" body={p.goal} />
        {isSimbound ? (
          <div className="space-y-4">
            <SectionBlock title="Execution / Email" body={p.role} />
            <InlineImage
              src="/products/simbound/download (1).png"
              alt="Email performance results (Simbound simulation, Round 6)"
              caption="Email results in Round 6 (opens, CTR, conversions, value). Guided frequency/targeting tweaks based on what was driving clicks and conversions, strengthening conversion performance into the final #1 profit result."
            />
          </div>
        ) : (
          <SectionBlock title="My role" body={p.role} />
        )}

        {isSimbound ? (
          <div className="space-y-4">
            <SectionBlock title="Strategy / approach" body={p.approach} />
            <InlineImage
              src="/products/simbound/download.png"
              alt="SEA results snapshot (Simbound simulation, Round 6)"
              caption="SEA traffic and results in Round 6 (conversions, ROAS, CPA by team). Informed keyword/bid and spend shifts to keep acquisition efficient, supporting the final #1 profit outcome."
            />
          </div>
        ) : (
          <SectionBlock title="Strategy / approach" body={p.approach} />
        )}

        <SectionBlock title="Outcome / impact" body={p.outcome}>
          {isSimbound ? (
            <InlineImage
              src="/products/simbound/download (2).png"
              alt="Overall ranks showing Team Yellow ranked #1"
              caption="Final overall ranking: Team Yellow finished #1 with €380,509.49 net profit. Confirms that KPI-led iteration across SEA and email translated into the top result."
            />
          ) : null}
        </SectionBlock>
        <SectionBlock title="Key learnings" body={p.learnings} />
      </div>

      {p.links?.length ? (
        <>
          <Separator className="my-10" />
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
              Links
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 text-sm transition-colors hover:bg-secondary"
                >
                  {l.label} <ArrowUpRight className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </>
      ) : null}

      <Separator className="my-10" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">Back to list</div>
        <Link to="/projects">
          <Button className="rounded-full">
            Browse projects <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
