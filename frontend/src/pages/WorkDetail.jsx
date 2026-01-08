import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { work } from "@/mock";
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

export default function WorkDetail() {
  const { id } = useParams();

  const item = useMemo(() => work.find((w) => w.id === id), [id]);
  const idx = useMemo(() => work.findIndex((w) => w.id === id), [id]);

  if (!item) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="text-sm text-muted-foreground">Not found</div>
        <h1 className="mt-2 font-display text-3xl">This case study doesn’t exist.</h1>
        <div className="mt-6">
          <Link to="/">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const prev = idx > 0 ? work[idx - 1] : null;
  const next = idx < work.length - 1 ? work[idx + 1] : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="inline-flex">
          <Button variant="outline" className="rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to portfolio
          </Button>
        </Link>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="rounded-full">
            {item.category}
          </Badge>
          <Badge variant="outline" className="rounded-full">
            {item.year}
          </Badge>
        </div>
      </div>

      <header className="mt-10">
        <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
          Case Study
        </div>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
          {item.title}
        </h1>
        <p className="mt-3 text-base text-muted-foreground md:text-lg">
          {item.subtitle}
        </p>
      </header>

      <div className="mt-8 overflow-hidden rounded-2xl border bg-card">
        <img
          src={item.cover}
          alt={item.title}
          className="h-[44vh] w-full object-cover"
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Overview</CardTitle>
            <CardDescription>{item.impact}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>{item.overview}</p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/40">
          <CardHeader>
            <CardTitle className="font-display">Quick notes</CardTitle>
            <CardDescription>What I focused on</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {item.sections.slice(0, 2).map((s) => (
              <div key={s.heading} className="rounded-xl border bg-background px-3 py-3">
                <div className="text-xs tracking-[0.22em] uppercase">
                  {s.heading}
                </div>
                <div className="mt-2 text-foreground">{s.body}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <div className="space-y-6">
        {item.sections.map((s) => (
          <div key={s.heading} className="space-y-2">
            <h2 className="font-display text-2xl tracking-tight">{s.heading}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {s.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
          Gallery (placeholders)
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {item.gallery.map((url) => (
            <div key={url} className="overflow-hidden rounded-xl border">
              <img src={url} alt="" className="h-48 w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-10" />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground">More work</div>
        <div className="flex flex-wrap gap-2">
          {prev ? (
            <Link to={`/work/${prev.id}`}>
              <Button variant="outline" className="rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {prev.title}
              </Button>
            </Link>
          ) : null}
          {next ? (
            <Link to={`/work/${next.id}`}>
              <Button className="rounded-full" style={{ backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                {next.title} <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
