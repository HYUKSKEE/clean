"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/faq";
import { cn } from "@/lib/utils";

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-24 border-b border-line py-16 lg:py-24"
    >
      <div className="container-page">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          title="유리창 청소 자주 묻는 질문"
          description="서울 · 경기 · 인천 출장 청소 비용, 작업 시간, 정기 관리, 견적 문의 방법을 모았습니다. 답변은 페이지에 그대로 공개되어 있습니다."
        />

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-line bg-white">
          {faqs.map((faq, index) => {
            const open = openIndex === index;

            return (
              <details
                key={faq.question}
                open={open}
                onToggle={(event) => {
                  if (event.currentTarget.open) setOpenIndex(index);
                  else if (openIndex === index) setOpenIndex(null);
                }}
                className="border-b border-line last:border-b-0"
              >
                <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-brand-tint sm:px-6">
                  <h3 className="flex items-start gap-3 text-[0.975rem] font-bold sm:text-lg">
                    <span aria-hidden className="mt-0.5 font-extrabold text-brand-deep">
                      Q
                    </span>
                    {faq.question}
                  </h3>
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "size-5 shrink-0 text-ink-muted transition-transform duration-200",
                      open && "rotate-180",
                    )}
                  />
                </summary>
                <p className="flex gap-3 bg-surface/50 px-5 pt-1 pb-5 text-[0.925rem] leading-relaxed text-ink-soft sm:px-6 sm:text-base">
                  <span aria-hidden className="font-extrabold text-ink-muted">
                    A
                  </span>
                  {faq.answer}
                </p>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
