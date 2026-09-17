import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/services";

export function ServiceGrid() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-24 border-b border-line py-16 lg:py-24"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Services"
          title={<span id="services-title">건물 외부 청소, 필요한 만큼만 맡기세요</span>}
          description="유리창부터 외벽, 간판, 시트지 제거, 정기 관리까지. 현장을 먼저 확인하고 필요한 작업만 제안합니다."
        />

        {/* 모바일 1열 · 태블릿 2열 · 데스크톱 3열 */}
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug} className="h-full">
              <ServiceCard service={service} />
            </li>
          ))}

          {/* 서비스 카드와 같은 그리드 안에서 자연스럽게 이어지는 CTA */}
          <li className="h-full">
            <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-brand-strong bg-brand-tint p-6 text-center sm:col-span-1">
              <h3 className="text-lg font-bold sm:text-xl">
                어떤 작업이 필요한지 모르겠다면
              </h3>
              <p className="mt-2 text-[0.925rem] leading-relaxed text-ink-soft">
                건물 사진 한 장만 보내주셔도 필요한 청소 범위와 예상 비용을 정리해 안내드립니다.
              </p>
              <Button href="/#contact" className="mt-5 self-center" size="lg">
                무료 견적 문의
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
