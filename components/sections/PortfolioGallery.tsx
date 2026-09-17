"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolio, portfolioFilters } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export function PortfolioGallery() {
  const [filter, setFilter] = useState("all");

  const items = useMemo(
    () =>
      filter === "all"
        ? portfolio
        : portfolio.filter((item) => item.serviceSlug === filter),
    [filter],
  );

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="scroll-mt-24 border-b border-line py-16 lg:py-24"
    >
      <div className="container-page">
        <SectionHeading
          id="portfolio-title"
          eyebrow="Portfolio"
          title="서울 · 경기 · 인천 시공 사례"
          description="수도권에서 진행한 유리창 청소, 외벽 고압세척, 간판·어닝 청소, 시트지 제거, 정기 관리 작업 기록입니다. 장소와 서비스 유형을 함께 확인할 수 있습니다."
        />

        <div
          role="group"
          aria-label="서비스 유형별 시공 사례 필터"
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {portfolioFilters.map((item) => {
            const selected = item.slug === filter;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => setFilter(item.slug)}
                aria-pressed={selected}
                className={cn(
                  "min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors",
                  selected
                    ? "border-brand-strong bg-brand text-ink"
                    : "border-line bg-white text-ink-soft hover:border-brand-strong hover:text-ink",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-5 text-center text-sm text-ink-muted">
          총 {items.length}건의 시공 사례
        </p>

        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
                <figure className="relative m-0 aspect-4/3 bg-surface">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                  <figcaption className="sr-only">{item.imageAlt}</figcaption>
                </figure>
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-ink-muted">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5 text-brand-deep" aria-hidden />
                      {item.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="size-3.5 text-brand-deep" aria-hidden />
                      <time dateTime={item.period.replaceAll(".", "-").slice(0, 7)}>
                        {item.period}
                      </time>
                    </span>
                  </p>
                  <h3 className="mt-2.5 text-base font-bold sm:text-lg">{item.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
