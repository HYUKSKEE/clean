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
          eyebrow="Why 삐까번쩍"
          title={<span id="why-title">믿고 맡길 수 있는 네 가지 이유</span>}
          description="눈에 보이는 결과만큼 과정도 중요합니다. 장비와 안전, 세제까지 기준을 정해두고 시공합니다."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {trustFeatures.map((feature) => (
            <li
              key={feature.title}
              className="flex flex-col rounded-2xl border border-line bg-white p-6"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-brand-soft">
                <feature.icon className="size-6 text-brand-deep" strokeWidth={2.1} aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-[0.925rem] leading-relaxed text-ink-soft">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
