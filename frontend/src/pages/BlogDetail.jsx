import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { blogPosts } from "@/mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

export default function BlogDetail() {
  const { slug } = useParams();

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
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
    <article className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <Link to="/" className="inline-flex">
        <Button variant="outline" className="rounded-full">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to portfolio
        </Button>
      </Link>

      <header className="mt-10">
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

      <div className="mt-8 overflow-hidden rounded-2xl border">
        <img src={post.cover} alt={post.title} className="h-[40vh] w-full object-cover" />
      </div>

      <Separator className="my-10" />

      <div className="prose prose-neutral max-w-none">
        <p className="text-lg text-muted-foreground">{post.excerpt}</p>
      </div>

      <div className="mt-8 space-y-8">
        {post.content.map((b) => (
          <section key={b.h} className="space-y-3">
            <h2 className="font-display text-2xl tracking-tight">{b.h}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {b.p}
            </p>
          </section>
        ))}
      </div>

      <Separator className="my-10" />

      <div className="text-sm text-muted-foreground">
        Want more? New posts will appear here as you publish.
      </div>
    </article>
  );
}
