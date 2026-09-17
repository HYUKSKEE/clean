import { SectionHeading } from "@/components/ui/SectionHeading";
import { trustFeatures } from "@/lib/trust";

export function TrustFeatures() {
  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="border-b border-line bg-surface/60 py-16 lg:py-24"
    >
      <div className="container-page">
        <SectionHeading
          id="why-title"
          eyebrow="Why 삐까번쩍"
          title="서울 · 경기 · 인천 청소를 맡기는 이유"
          description="유리창과 외벽은 한 번 시공할 때 장비와 안전 기준이 결과를 가릅니다. 전문 장비, 2인 1조 안전 작업, 건물 맞춤 시공, 친환경 세제까지 기준을 정해두고 진행합니다."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {trustFeatures.map((feature) => (
            <li key={feature.title}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-soft">
                  <feature.icon
                    className="size-6 text-brand-deep"
                    strokeWidth={2.1}
                    aria-hidden
                  />
                </span>
                <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-[0.925rem] leading-relaxed text-ink-soft">
                  {feature.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
