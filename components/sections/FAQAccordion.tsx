"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/faq";
import { cn } from "@/lib/utils";

export function FAQAccordion() {
  // 첫 항목은 열린 상태로 시작해 사용법을 바로 알 수 있게 합니다.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-24 border-b border-line py-16 lg:py-24"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="FAQ"
          title={<span id="faq-title">자주 묻는 질문</span>}
          description="상담 전에 가장 많이 받는 질문을 모았습니다. 더 궁금한 점은 언제든 문의해 주세요."
        />

        <ul className="mx-auto mt-10 max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <li key={faq.question}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left text-[0.975rem] font-bold transition-colors hover:bg-brand-tint sm:px-6 sm:text-lg"
                  >
                    <span className="flex items-start gap-3">
                      <span aria-hidden className="mt-0.5 font-extrabold text-brand-deep">
                        Q
                      </span>
                      {faq.question}
                    </span>
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "size-5 shrink-0 text-ink-muted transition-transform duration-200",
                        open && "rotate-180",
                      )}
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!open}
                  className="bg-surface/50 px-5 pt-1 pb-5 sm:px-6"
                >
                  <p className="flex gap-3 text-[0.925rem] leading-relaxed text-ink-soft sm:text-base">
                    <span aria-hidden className="font-extrabold text-ink-muted">
                      A
                    </span>
                    {faq.answer}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
