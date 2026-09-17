import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site, telHref } from "@/lib/site";

const steps = [
  { title: "문의 접수", description: "전화 또는 견적 문의 폼으로 건물 정보를 남겨주세요." },
  { title: "상담 · 현장 확인", description: "사진 상담으로 개략 견적을, 대형 건물은 무료 실사를 진행합니다." },
  { title: "확정 견적 · 일정 조율", description: "작업 범위와 비용을 확정하고 영업에 지장 없는 일정을 잡습니다." },
  { title: "시공 · 결과 확인", description: "시공 후 작업 사진과 리포트로 결과를 확인해 드립니다." },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 bg-surface/60 py-16 lg:py-24"
    >
      <div className="container-page">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="서울 · 경기 · 인천 무료 견적 문의"
          description="유리창 청소, 외벽 청소, 간판·어닝 청소 상담과 출장 견적은 모두 무료입니다. 전화가 편하시면 바로 연락 주세요."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
          <div className="flex flex-col gap-6">
            <aside className="rounded-2xl border border-line bg-white p-6 lg:p-8">
              <h3 className="text-xl font-bold">전화 상담이 가장 빠릅니다</h3>
              <address className="mt-4 not-italic">
                <a
                  href={telHref}
                  className="inline-flex min-h-13 items-center gap-2.5 rounded-full bg-brand px-6 text-xl font-extrabold text-ink transition-colors hover:bg-brand-strong"
                >
                  <Phone className="size-5" aria-hidden />
                  {site.phone}
                </a>

                <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-5 text-[0.925rem] text-ink-soft">
                  <li className="flex items-center gap-2.5">
                    <Clock className="size-4 shrink-0 text-brand-deep" aria-hidden />
                    <span>{site.hours}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Mail className="size-4 shrink-0 text-brand-deep" aria-hidden />
                    <a href={`mailto:${site.email}`} className="hover:text-ink">
                      {site.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <MapPin className="size-4 shrink-0 text-brand-deep" aria-hidden />
                    {site.areas.join(" · ")} 전 지역 출장
                  </li>
                  {site.kakaoUrl ? (
                    <li className="flex items-center gap-2.5">
                      <MessageCircle className="size-4 shrink-0 text-brand-deep" aria-hidden />
                      <a
                        href={site.kakaoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-ink"
                      >
                        카카오톡 상담 열기
                      </a>
                    </li>
                  ) : null}
                </ul>
              </address>
            </aside>

            <aside className="rounded-2xl border border-line bg-white p-6 lg:p-8">
              <h3 className="text-xl font-bold">문의부터 시공까지</h3>
              <ol className="mt-5 flex flex-col gap-5">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-3.5">
                    <span
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-extrabold text-brand-deep"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-bold">{step.title}</h4>
                      <p className="mt-1 text-[0.9rem] leading-relaxed text-ink-soft">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
