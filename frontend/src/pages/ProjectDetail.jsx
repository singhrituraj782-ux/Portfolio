import React, { useLayoutEffect, useMemo } from "react";
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

function SectionBlock({ title, body, children, childrenClassName = "pt-4" }) {
  return (
    <section className="space-y-2" data-reveal>
      <h2 className="font-display text-2xl tracking-tight">{title}</h2>
      {body ? (
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          {body}
        </p>
      ) : null}
      {children ? <div className={childrenClassName}>{children}</div> : null}
    </section>
  );
}

function InlineImage({
  src,
  alt,
  caption,
  maxWidthClass = "max-w-full",
  captionClassName = "",
}) {
  return (
    <figure
      className={`mx-auto w-full overflow-hidden rounded-2xl border bg-card/60 ${maxWidthClass}`}
      data-reveal
    >
      <img src={src} alt={alt} className="h-auto w-full" loading="lazy" />
      <figcaption
        className={`border-t bg-background/40 px-4 py-3 text-xs leading-relaxed text-muted-foreground ${captionClassName}`}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

function EvidenceCard({ title, src, alt, children }) {
  return (
    <Card className="bg-card/60">
      <CardHeader className="pb-3">
        <CardTitle className="font-display">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div className="overflow-hidden rounded-xl border bg-background/40 p-3">
            <img
              src={src}
              alt={alt}
              className="max-h-[420px] w-full object-contain"
              loading="lazy"
            />
          </div>
          <div className="text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();

  const p = useMemo(() => projects.find((x) => x.id === id), [id]);
  const isSimbound = p?.id === "tableto-simbound";
  const isXuris = p?.id === "xuris-mmm";
  const isFraud = p?.id === "fraud-detection";
  const isCowlor = p?.id === "cowlor-brand";

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [id]);

  if (!p) {
    return (
      <div className="site-container-reading py-16 md:py-20">
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

      <div className="relative site-container-reading py-12 md:py-16 lg:py-20 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out">
        <header data-reveal>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/projects" className="inline-flex">
                <Button variant="outline" className="rounded-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
                Case study
              </div>
            </div>
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

        <div className="mt-8 overflow-hidden rounded-2xl border bg-card/60" data-reveal>
          <div className="h-[42vh] w-full campaign-parallax" data-parallax="0.04">
            <img src={p.cover} alt={p.title} className="h-full w-full object-cover" />
          </div>
        </div>

        {isXuris || isFraud ? (
          <div className="mt-8 space-y-6">
            <Card className="bg-card/60" data-reveal>
              <CardHeader>
                <CardTitle className="font-display">Overview</CardTitle>
                <CardDescription>{p.oneLiner}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                {Array.isArray(p.overview) ? (
                  <div className="space-y-3">
                    {p.overview.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                ) : (
                  p.overview
                )}
              </CardContent>
            </Card>

            <Card className="bg-secondary/35" data-reveal>
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
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-[1.25fr_0.75fr]">
            <Card className="bg-card/60" data-reveal>
              <CardHeader>
                <CardTitle className="font-display">Overview</CardTitle>
                <CardDescription>{p.oneLiner}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                {Array.isArray(p.overview) ? (
                  <div className="space-y-3">
                    {p.overview.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                ) : (
                  p.overview
                )}
              </CardContent>
            </Card>

            <Card className="bg-secondary/35" data-reveal>
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
        )}

      {isFraud ? (
        <div className="mt-10">
          <SectionBlock title="Evidence / Analysis" body={null} childrenClassName="pt-3">
            <div className="space-y-4">
              <EvidenceCard
                title="Class Imbalance"
                src="/products/machine-learning/Fraud vs Non-Fraud distribution.png"
                alt="Fraud vs Non-Fraud distribution"
              >
                Fraud accounts represent roughly 1% of cases. That makes accuracy a misleading
                headline metric — the problem is better framed around recall, risk exposure, and
                investigation cost.
              </EvidenceCard>

              <EvidenceCard
                title="Feature Behavior"
                src="/products/machine-learning/Feature comparison (boxplots).png"
                alt="Feature comparison boxplots for fraud vs non-fraud"
              >
                Fraudulent accounts show higher variance and skew across signals like income,
                credit risk score, proposed credit limit, and session length. The patterns point to
                abnormal behavior profiles rather than random noise.
              </EvidenceCard>

              <EvidenceCard
                title="Model Performance"
                src="/products/machine-learning/Confusion Matrix (Logistic Regression).png"
                alt="Confusion matrix for Logistic Regression"
              >
                The operating point is intentionally recall-heavy. We accept more false positives
                because missing fraud is costlier than investigating a flagged account — especially
                when the goal is early interception.
              </EvidenceCard>

              <EvidenceCard
                title="Model Selection"
                src="/products/machine-learning/Model comparison table (ROC-AUC : Recall : Precision).png"
                alt="Model comparison table with ROC-AUC, Recall, and Precision"
              >
                Logistic Regression was selected for deployment because it delivered strong recall
                and remained interpretable for operations. Random Forest required threshold tuning
                to be competitive and was not suitable in its default form.
              </EvidenceCard>
            </div>
          </SectionBlock>
        </div>
      ) : null}

        <Separator className="my-12" />

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
            <SectionBlock
              title={isFraud || isCowlor ? "My Role" : "My role"}
              body={p.role}
            />
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
            <SectionBlock
              title={isFraud || isCowlor ? "Strategy / Approach" : "Strategy / approach"}
              body={p.approach}
            />
          )}

        {isCowlor ? (
          <SectionBlock title="Evidence / Analysis" body={null} childrenClassName="pt-3">
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {(p.evidence || []).map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </SectionBlock>
        ) : null}

        {isXuris ? (
          <SectionBlock title="Evidence / Analysis" body={null} childrenClassName="pt-3">
            <div className="space-y-3">
              <InlineImage
                src="/products/marketing-analytics/sampling-vs-prescriptions.png"
                alt="Sampling vs new prescriptions (exploratory analysis)"
                caption="Early exploratory view of sampling activity vs new prescriptions. The relationship suggested sampling could be a meaningful lever, motivating deeper modeling instead of relying on intuition."
                maxWidthClass="max-w-3xl"
                captionClassName="py-2"
              />
              <InlineImage
                src="/products/marketing-analytics/detailing-vs-prescriptions.png"
                alt="Detailing vs new prescriptions (exploratory analysis)"
                caption="Early exploratory view of detailing activity vs new prescriptions. Helped compare response patterns across levers and reinforced the need to quantify impact before reallocating budget."
                maxWidthClass="max-w-3xl"
                captionClassName="py-2"
              />
              <InlineImage
                src="/products/marketing-analytics/model-comparison-aic.png"
                alt="Model comparison using AIC across candidate specifications"
                caption="AIC comparison across candidate model specifications. We tested multiple functional forms to avoid overfitting and choose a realistic response curve; the log-log model had the best AIC, so we used it for final estimates."
                maxWidthClass="max-w-3xl"
                captionClassName="py-2"
              />
              <InlineImage
                src="/products/marketing-analytics/marginal-effects-detailing-vs-sampling.png"
                alt="Marginal effects comparing detailing vs sampling"
                caption="Marginal effects from the selected model comparing detailing vs sampling. Shows the relative incremental impact on new prescriptions and directly informed the budget allocation recommendation."
                maxWidthClass="max-w-3xl"
                captionClassName="py-2"
              />
            </div>
          </SectionBlock>
        ) : null}

        <SectionBlock
          title={isFraud || isCowlor ? "Outcome / Impact" : "Outcome / impact"}
          body={p.outcome}
        >
          {isSimbound ? (
            <InlineImage
              src="/products/simbound/download (2).png"
              alt="Overall ranks showing Team Yellow ranked #1"
              caption="Final overall ranking: Team Yellow finished #1 with €380,509.49 net profit. Confirms that KPI-led iteration across SEA and email translated into the top result."
            />
          ) : null}
        </SectionBlock>
          {isCowlor ? (
            <SectionBlock title="Key Learnings" body={p.learnings} childrenClassName="pt-3">
              <a
                href="/products/cowlor/PCE Final Pitch - Group 73-2.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Download pitch deck (PDF)
              </a>
            </SectionBlock>
          ) : (
            <SectionBlock title={isFraud ? "Key Learnings" : "Key learnings"} body={p.learnings} />
          )}
        </div>

        {p.links?.length ? (
          <>
            <Separator className="my-12" />
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

      </div>
    </div>
  );
}
