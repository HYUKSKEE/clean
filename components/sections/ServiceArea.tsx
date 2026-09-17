import { Check, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { regions } from "@/lib/areas";
import { site } from "@/lib/site";

export function ServiceArea() {
  return (
    <section
      id="area"
      aria-labelledby="area-title"
      className="scroll-mt-24 border-b border-line bg-surface/60 py-16 lg:py-24"
    >
      <div className="container-page">
        <SectionHeading
          id="area-title"
          eyebrow="Service Area"
          title="서울 · 경기 · 인천 유리창 청소 출장 지역"
          description="수도권은 출장비 없이 방문 상담이 가능합니다. 지역별 오염 특성에 맞춰 유리창 청소와 외벽 고압세척 방법을 다르게 적용합니다."
        />

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {regions.map((region) => (
            <li key={region.name}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <h3 className="flex items-center gap-2 text-xl font-bold">
                  <span
                    className="grid size-9 place-items-center rounded-lg bg-brand-soft text-sm font-extrabold text-brand-deep"
                    aria-hidden
                  >
                    {region.name.charAt(0)}
                  </span>
                  {region.name} 유리창 · 외벽 청소
                </h3>
                <p className="mt-3 text-[0.925rem] leading-relaxed text-ink-soft">
                  {region.summary}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-5">
                  {region.districts.map((district) => (
                    <li
                      key={district}
                      className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink-soft"
                    >
                      <Check className="size-3 text-brand-deep" aria-hidden />
                      {region.name} {district}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>

        <aside className="mt-8 flex flex-col items-center gap-5 rounded-2xl border border-line bg-white p-6 text-center lg:flex-row lg:justify-between lg:p-8 lg:text-left">
          <div>
            <h3 className="text-lg font-bold sm:text-xl">
              목록에 없는 지역도 문의해 주세요
            </h3>
            <p className="mt-2 text-[0.925rem] leading-relaxed text-ink-soft">
              수도권 외 지역도 규모와 일정에 따라 시공 가능합니다. 건물 위치를 알려주시면 출장
              가능 여부를 바로 확인해 드립니다.
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-ink-soft lg:justify-start">
              <li className="inline-flex items-center gap-1.5">
                <Truck className="size-4 text-brand-deep" aria-hidden />
                출장비 없음
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Clock className="size-4 text-brand-deep" aria-hidden />
                {site.hours}
              </li>
            </ul>
          </div>
          <Button href="/#contact" size="lg" className="shrink-0">
            무료 견적 문의
          </Button>
        </aside>
      </div>
    </section>
  );
}
