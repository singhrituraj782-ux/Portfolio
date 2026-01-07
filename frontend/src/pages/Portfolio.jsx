import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  blogPosts,
  formspree,
  interests,
  navigation,
  profile,
  services,
  skills,
  visualDiary,
  motionWorks,
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
  Linkedin,
  Mail,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";

import ThreeBackdrop from "@/components/ThreeBackdrop";

const ACCENT = "#b7ff5a";

function useFilteredWork(query) {
  return useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return work;
    return work.filter((w) => {
      const hay = [w.title, w.subtitle, w.category, ...(w.tags || [])]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query]);
}

function SectionHeading({ kicker, title, description, icon: Icon }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-muted-foreground">
          {Icon ? (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border bg-background">
              <Icon className="h-4 w-4" />
            </span>
          ) : null}
          <span>{kicker}</span>
        </div>
        <h2 className="mt-3 font-display text-3xl leading-[1.05] tracking-tight md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
        ) : null}
      </div>
      <div className="hidden md:block text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
          <span>Currently: {profile.availability}</span>
        </span>
      </div>
    </div>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);

  const jump = (href) => {
    setOpen(false);
    if (!href.startsWith("#")) return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
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
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </button>
          ))}

          <a
            href={profile.social.email}
            className="ml-1 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-2 text-sm transition-colors hover:bg-secondary"
          >
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </a>
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
          <div className="mx-auto max-w-6xl px-4 py-3">
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

              <a
                href={profile.social.email}
                className="col-span-2 inline-flex items-center justify-center rounded-md border bg-background px-3 py-2 text-sm transition-colors hover:bg-secondary"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            background:
              "radial-gradient(900px 420px at 20% 20%, rgba(183,255,90,0.22), transparent 60%), radial-gradient(600px 320px at 82% 8%, rgba(0,0,0,0.12), transparent 60%)",
          }}
        />
        <ThreeBackdrop className="absolute inset-0" accent={ACCENT} />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="grid gap-10 md:grid-cols-[1.12fr_0.88fr] md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs tracking-[0.22em] uppercase text-muted-foreground backdrop-blur">
              <Sparkles className="h-4 w-4" />
              <span>Brand strategy + marketing analytics</span>
            </div>

            <h1 className="mt-5 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {profile.summary}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
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

          <Card className="bg-background/80 backdrop-blur overflow-hidden">
            <div className="relative aspect-[4/5]">
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-xs tracking-[0.22em] uppercase text-white/70">
                  {profile.roleTagline}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                    <Button
                      size="sm"
                      className="rounded-full"
                      style={{ backgroundColor: "rgba(16,17,20,0.88)", color: "#f7f7f2" }}
                    >
                      Resume <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <a href={profile.social.linkedin} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="outline" className="rounded-full bg-white/10 text-white border-white/30 hover:bg-white/15">
                      LinkedIn <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            <CardHeader className="pt-5">
              <CardTitle className="font-display text-xl">Snapshot</CardTitle>
              <CardDescription>Fast facts + skills.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg border bg-background px-3 py-2">
                  <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                    Email
                  </div>
                  <div className="mt-1 truncate font-medium">{profile.email}</div>
                </div>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border bg-background px-3 py-2 transition-colors hover:bg-secondary"
                >
                  <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                    LinkedIn
                  </div>
                  <div className="mt-1 inline-flex items-center gap-2 font-medium">
                    View profile <ArrowUpRight className="h-4 w-4" />
                  </div>
                </a>
              </div>

              <div>
                <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                  Skills
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.highlights.slice(0, 6).map((s) => (
                    <Badge
                      key={s}
                      variant="secondary"
                      className="rounded-full"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                {skills.languages.map((l) => (
                  <span
                    key={l}
                    className="inline-flex items-center rounded-full border bg-background px-3 py-1"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function WorkGrid({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((w) => (
        <Link key={w.id} to={`/work/${w.id}`} className="group">
          <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={w.cover}
                alt={w.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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

function BlogGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {blogPosts.map((p) => (
        <Link key={p.slug} to={`/blog/${p.slug}`} className="group">
          <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={p.cover}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="font-display text-xl text-white">{p.title}</div>
                <div className="mt-1 text-sm text-white/80">
                  {p.readTime} • {p.date}
                </div>
              </div>
            </div>
            <CardContent className="space-y-3 p-5">
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="rounded-full">
                    {t}
                  </Badge>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {p.excerpt}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function VisualDiaryGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-12">
      {visualDiary.map((item, idx) => {
        const span = idx === 0 ? "md:col-span-7" : "md:col-span-5";
        return (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <button
                type="button"
                className={`group relative overflow-hidden rounded-xl border bg-card ${span}`}
              >
                <div className="relative aspect-[16/10]">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="font-display text-lg text-white">
                    {item.title}
                  </div>
                  <div className="mt-1 text-sm text-white/80">
                    {item.caption}
                  </div>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle className="font-display">{item.title}</DialogTitle>
                <DialogDescription>{item.caption}</DialogDescription>
              </DialogHeader>
              <div className="mt-3 overflow-hidden rounded-xl border">
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-[56vh] w-full object-cover"
                />
              </div>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}

function MotionGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {motionWorks.map((m) => (
        <Card key={m.id} className="overflow-hidden">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={m.cover}
              alt={m.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0" />
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
              <div>
                <div className="font-display text-xl text-white">{m.title}</div>
                <div className="mt-1 text-sm text-white/80">{m.description}</div>
              </div>
              <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">
                {m.duration}
              </span>
            </div>
          </div>
          <CardContent className="flex items-center justify-between gap-3 p-5">
            <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
              Replace with video link later
            </div>
            <Button variant="outline" className="rounded-full" disabled>
              View
            </Button>
          </CardContent>
        </Card>
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
    <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Send a message</CardTitle>
          <CardDescription>
            This form is connected to Formspree (frontend-only).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Your email</label>
              <Input
                name="email"
                type="email"
                placeholder="you@domain.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea
                name="message"
                placeholder="What are you building? What do you need?"
                className="min-h-32"
                required
              />
            </div>
            <Button
              type="submit"
              className="rounded-full"
              style={{ backgroundColor: "#101114", color: "#f7f7f2" }}
              disabled={loading}
            >
              {loading ? "Sending…" : "Send"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="font-display">Direct contact</CardTitle>
            <CardDescription>For quick coordination.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Email</span>
              <a
                className="font-medium hover:underline"
                href={profile.social.email}
              >
                {profile.email}
              </a>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{profile.phone}</span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-muted-foreground">Location</span>
              <span className="text-right font-medium">{profile.address}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display">Resume snapshot</CardTitle>
            <CardDescription>
              Not a fancy resume page — just the essentials.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div>
              <div className="text-xs tracking-[0.22em] uppercase">Education</div>
              <div className="mt-1 text-foreground">
                EM-Lyon Business School — Masters in Management (2024–Present)
              </div>
              <div className="mt-1">
                Amity University — Bachelor of Journalism and Mass Communication
                (2019–2022)
              </div>
            </div>
            <Separator />
            <div>
              <div className="text-xs tracking-[0.22em] uppercase">Tools</div>
              <div className="mt-1">
                Excel, Tableau, Figma, Canva, Adobe Creative Suite
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [query, setQuery] = useState("");
  const filtered = useFilteredWork(query);

  const byCategory = useMemo(() => {
    const groups = {
      All: filtered,
      "Brand Strategy": filtered.filter((w) => w.category === "Brand Strategy"),
      "Marketing Analytics": filtered.filter(
        (w) => w.category === "Marketing Analytics"
      ),
      "Product Research": filtered.filter((w) => w.category === "Product Research"),
      "Motion Design": filtered.filter((w) => w.category === "Motion Design"),
    };
    return groups;
  }, [filtered]);

  return (
    <div className="min-h-screen portfolio-grain">
      <SiteHeader />
      <main>
        <Hero />

        <section id="work" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <SectionHeading
            kicker="Selected work"
            title="Projects that start with a question"
            description="A curated set of strategy and research-led projects. Search by theme, then open a case study for the full story."
            icon={Briefcase}
          />

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search work (pricing, research, messaging…)"
                className="pl-9"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filtered.length}</span> items
            </div>
          </div>

          <Tabs defaultValue="All" className="mt-6">
            <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
              {Object.keys(byCategory).map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="rounded-full border bg-background px-4 py-2 data-[state=active]:bg-foreground data-[state=active]:text-background"
                >
                  {key}
                  <span className="ml-2 text-xs opacity-70">
                    {byCategory[key].length}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(byCategory).map(([key, items]) => (
              <TabsContent key={key} value={key} className="mt-6">
                <WorkGrid items={items} />
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <section
          id="case-studies"
          className="border-y bg-secondary/30"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
            <SectionHeading
              kicker="Case studies"
              title="From insight to execution"
              description="Clear problem framing, lightweight research, and decisions you can trace.
              "
              icon={Sparkles}
            />

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {work.slice(0, 3).map((w) => (
                <Link key={w.id} to={`/work/${w.id}`} className="group">
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-display text-2xl">
                        {w.title}
                      </CardTitle>
                      <CardDescription>{w.subtitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {w.tags.slice(0, 3).map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="rounded-full"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {w.impact}
                      </div>
                      <div className="pt-1 text-sm font-medium text-foreground transition-colors group-hover:text-muted-foreground">
                        Open case study <ArrowUpRight className="inline h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <SectionHeading
            kicker="Services"
            title="Where I can help"
            description="Strategy-first, with the right amount of analysis and craft."
            icon={Sparkles}
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {services.map((s) => (
              <Card key={s.title} className="h-full">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">
                    {s.title}
                  </CardTitle>
                  <CardDescription>{s.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-center justify-between gap-3 rounded-lg border bg-background px-3 py-2"
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
            ))}
          </div>
        </section>

        <section id="resume" className="border-y bg-secondary/30">
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
            <SectionHeading
              kicker="Resume"
              title="A simple, readable snapshot"
              description="Open the PDF, or skim the essentials here. (PDF is the source of truth.)"
              icon={FileText}
            />

            <div className="mt-8 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Highlights</CardTitle>
                  <CardDescription>Quick overview.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <div className="rounded-xl border bg-background p-4">
                    <div className="text-xs tracking-[0.22em] uppercase">Profile</div>
                    <div className="mt-2 text-foreground">{profile.summary}</div>
                  </div>

                  <div className="rounded-xl border bg-background p-4">
                    <div className="text-xs tracking-[0.22em] uppercase">Core skills</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {skills.highlights.map((s) => (
                        <Badge key={s} variant="secondary" className="rounded-full">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                      <Button className="rounded-full" style={{ backgroundColor: "#101114", color: "#f7f7f2" }}>
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

              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Details</CardTitle>
                  <CardDescription>Kept minimal on purpose.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
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

        <section id="blog" className="border-y bg-secondary/30">
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
            <SectionHeading
              kicker="Blog"
              title="Notes on research, brand, and clarity"
              description="Short posts about process, frameworks, and what I’m learning in real projects."
              icon={BookOpen}
            />

            <div className="mt-8">
              <BlogGrid />
            </div>
          </div>
        </section>

        <section
          id="visual-diary"
          className="mx-auto max-w-6xl px-4 py-14 md:py-20"
        >
          <SectionHeading
            kicker="Visual diary"
            title="Still work / photography"
            description="A small gallery of visual observations. Placeholder images for now."
            icon={Camera}
          />
          <div className="mt-8">
            <VisualDiaryGrid />
          </div>
        </section>

        <section id="motion" className="border-y bg-secondary/30">
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
            <SectionHeading
              kicker="Motion design"
              title="Editing + rhythm"
              description="Video editing projects, kinetic type experiments, and short loops (placeholders)."
              icon={Film}
            />
            <div className="mt-8">
              <MotionGrid />
            </div>
          </div>
        </section>

        <section
          id="interests"
          className="mx-auto max-w-6xl px-4 py-14 md:py-20"
        >
          <SectionHeading
            kicker="Interests"
            title="What I pay attention to"
            description="The details that shape taste and strategy decisions."
            icon={Sparkles}
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {interests.map((i) => (
              <Card key={i.title} className="h-full">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">
                    {i.title}
                  </CardTitle>
                  <CardDescription>{i.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
            <SectionHeading
              kicker="Contact"
              title="Let’s make the next decision clearer"
              description="Send a short brief — I’ll reply with questions, a plan, and next steps."
              icon={Mail}
            />
            <div className="mt-8">
              <ContactSection />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <div className="font-display text-lg">{profile.name}</div>
              <div className="text-sm text-muted-foreground">
                {profile.roleTagline}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={profile.social.email}
                className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-2 text-sm transition-colors hover:bg-secondary"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-2 text-sm transition-colors hover:bg-secondary"
              >
                <ArrowUpRight className="h-4 w-4 rotate-[-45deg]" />
                Back to top
              </button>
            </div>
          </div>
          <div className="mt-6 text-xs text-muted-foreground">
            Built as a portfolio MVP. Work images are placeholders for now.
          </div>
        </div>
      </footer>
    </div>
  );
}
