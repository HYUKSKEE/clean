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
          id="services-title"
          eyebrow="Services"
          title="유리창 · 외벽 · 간판 청소 서비스"
          description="아파트 유리창 청소부터 빌딩 외벽 고압세척, 간판·어닝 청소, 시트지 제거, 정기 관리까지. 현장을 먼저 확인하고 필요한 작업만 제안합니다."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug} className="h-full">
              <ServiceCard service={service} />
            </li>
          ))}

          <li className="h-full">
            <aside className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-brand-strong bg-brand-tint p-6 text-center">
              <h3 className="text-lg font-bold sm:text-xl">
                어떤 청소가 필요한지 모르겠다면
              </h3>
              <p className="mt-2 text-[0.925rem] leading-relaxed text-ink-soft">
                건물 사진 한 장만 보내주셔도 서울 · 경기 · 인천 출장 기준으로 필요한 청소 범위와
                예상 비용을 정리해 안내드립니다.
              </p>
              <Button href="/#contact" className="mt-5 self-center" size="lg">
                무료 견적 문의
              </Button>
            </aside>
          </li>
        </ul>
      </div>
    </section>
  );
}
