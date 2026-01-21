import React, { useLayoutEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { blogPosts } from "@/mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

export default function BlogDetail() {
  const { slug } = useParams();

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [slug]);

  if (!post) {
    return (
      <div className="site-container-reading py-16 md:py-20">
        <div className="text-sm text-muted-foreground">Not found</div>
        <h1 className="mt-2 font-display text-3xl">This post doesn’t exist.</h1>
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

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-85"
          style={{
            background:
              "radial-gradient(900px 520px at 18% 18%, rgba(34,66,240,0.12), transparent 60%), radial-gradient(900px 520px at 86% 22%, rgba(255,70,190,0.10), transparent 60%), radial-gradient(900px 520px at 54% 92%, rgba(228,106,46,0.12), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 editorial-dots opacity-45" />
      </div>

      <article className="relative site-container-reading py-12 md:py-16 lg:py-20">
        <Link to="/" className="inline-flex" data-reveal>
          <Button variant="outline" className="rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to portfolio
          </Button>
        </Link>

	      <header className="mt-12" data-reveal>
        <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
          Blog
        </div>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Badge key={t} variant="secondary" className="rounded-full">
              {t}
            </Badge>
          ))}
        </div>
      </header>

      <div className="mt-8 overflow-hidden rounded-2xl border" data-reveal>
        <div className="h-[40vh] w-full campaign-parallax" data-parallax="0.03">
          <img src={post.cover} alt={post.title} className="h-full w-full object-cover" />
        </div>
      </div>

	      <Separator className="my-12" />

      <div className="prose prose-neutral max-w-none" data-reveal>
        <p className="text-lg text-muted-foreground">{post.excerpt}</p>
      </div>

      <div className="mt-8 space-y-8">
        {post.content.map((b) => (
          <section key={b.h} className="space-y-3" data-reveal>
            <h2 className="font-display text-2xl tracking-tight">{b.h}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {b.p}
            </p>
          </section>
        ))}
      </div>

	      <Separator className="my-12" />

        <div className="text-sm text-muted-foreground" data-reveal>
          Want more? New posts will appear here as you publish.
        </div>
      </article>
    </div>
  );
}
