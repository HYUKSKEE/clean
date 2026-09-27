import { Clock, Truck } from "lucide-react";
import { AreaPlaceNav } from "@/components/sections/AreaPlaceNav";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/services";
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
          title="서비스별 서울 · 경기 · 인천 출장 지역"
          description="유리창 청소, 외벽 청소, 간판 청소 등 서비스마다 서울·경기·인천 전체 구·동으로 출장합니다."
        />

        <ul className="mt-10 flex flex-col gap-4">
          {services.map((service, index) => (
            <li key={service.slug}>
              <details
                className="rounded-2xl border border-line bg-white"
                open={index === 0}
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-5 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  <span className="grid size-9 place-items-center rounded-lg bg-brand-soft">
                    <service.icon
                      className="size-4 text-brand-deep"
                      aria-hidden
                    />
                  </span>
                  {service.title}
                </summary>
                <div className="border-t border-line px-5 py-5">
                  <AreaPlaceNav serviceSlug={service.slug} />
                </div>
              </details>
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
