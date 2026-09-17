"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { beforeAfterCases } from "@/lib/before-after";
import { cn } from "@/lib/utils";

export function BeforeAfterSection() {
  const [activeId, setActiveId] = useState(beforeAfterCases[0].id);

  return (
    <section
      id="before-after"
      aria-labelledby="before-after-title"
      className="scroll-mt-24 border-b border-line bg-surface/60 py-16 lg:py-24"
    >
      <div className="container-page">
        <SectionHeading
          id="before-after-title"
          eyebrow="Before & After"
          title="유리창 · 외벽 청소 전후 비교"
          description="같은 자리에서 촬영한 시공 전후입니다. 손잡이를 좌우로 움직이면 물때와 매연이 걷힌 차이를 바로 확인할 수 있습니다."
        />

        <div
          role="tablist"
          aria-label="비교할 시공 유형"
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {beforeAfterCases.map((item) => {
            const selected = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`before-after-tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`before-after-panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(item.id)}
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

        {beforeAfterCases.map((item) => {
          const selected = item.id === activeId;

          return (
            <article
              key={item.id}
              id={`before-after-panel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`before-after-tab-${item.id}`}
              hidden={!selected}
              className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center"
            >
              <BeforeAfterSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                beforeAlt={item.beforeAlt}
                afterAlt={item.afterAlt}
                caption={`${item.location} ${item.label} 청소 전후`}
              />

              <div className="rounded-2xl border border-line bg-white p-6 lg:p-8">
                <h3 className="text-xl font-bold">{item.label} 시공 결과</h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-ink-muted">
                  <MapPin className="size-4 text-brand-deep" aria-hidden />
                  <span>{item.location}</span>
                </p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
                  {item.description}
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
                  <div>
                    <dt className="text-ink-muted">사용 세제</dt>
                    <dd className="mt-1 font-bold">친환경 전용 세정제</dd>
                  </div>
                  <div>
                    <dt className="text-ink-muted">작업 인원</dt>
                    <dd className="mt-1 font-bold">2인 1조 이상</dd>
                  </div>
                </dl>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
