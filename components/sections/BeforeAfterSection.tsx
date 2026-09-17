"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { beforeAfterCases } from "@/lib/before-after";
import { cn } from "@/lib/utils";

export function BeforeAfterSection() {
  const [activeId, setActiveId] = useState(beforeAfterCases[0].id);
  const active =
    beforeAfterCases.find((item) => item.id === activeId) ?? beforeAfterCases[0];

  return (
    <section
      id="before-after"
      aria-labelledby="before-after-title"
      className="scroll-mt-24 border-b border-line bg-surface/60 py-16 lg:py-24"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Before & After"
          title={<span id="before-after-title">청소 전후, 직접 비교해 보세요</span>}
          description="손잡이를 좌우로 움직이면 같은 자리에서 촬영한 시공 전후를 바로 확인할 수 있습니다."
        />

        <div
          role="group"
          aria-label="비교할 시공 사례 선택"
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {beforeAfterCases.map((item) => {
            const selected = item.id === active.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
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

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <BeforeAfterSlider
            key={active.id}
            beforeImage={active.beforeImage}
            afterImage={active.afterImage}
            beforeAlt={active.beforeAlt}
            afterAlt={active.afterAlt}
          />

          <div className="rounded-2xl border border-line bg-white p-6 lg:p-8">
            <h3 className="text-xl font-bold">{active.label}</h3>
            <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-ink-muted">
              <MapPin className="size-4 text-brand-deep" aria-hidden />
              {active.location}
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
              {active.description}
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
        </div>
      </div>
    </section>
  );
}
