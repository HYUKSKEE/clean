import { SectionHeading } from "@/components/ui/SectionHeading";
import { ViewablePhoto } from "@/components/ui/ImageViewer";
import type { ServicePhotoPair } from "@/lib/service-photos";

export function ServiceWorks({
  heading,
  pairs,
}: {
  heading: string;
  pairs: ServicePhotoPair[];
}) {
  if (pairs.length === 0) return null;

  return (
    <section
      aria-labelledby="works-title"
      className="border-b border-line py-16 lg:py-20"
    >
      <div className="container-page">
        <SectionHeading
          id="works-title"
          eyebrow="Before & After"
          title={`${heading} 시공 전후`}
          description="같은 현장에서 촬영한 청소 전과 청소 후입니다. 사진을 누르면 크게 볼 수 있습니다."
          align="left"
        />

        <ul className="mt-10 flex flex-col gap-8">
          {pairs.map((pair) => (
            <li key={pair.index} className="grid gap-4 sm:grid-cols-2">
              {pair.before ? (
                <ViewablePhoto
                  src={pair.before}
                  alt={`${heading} 청소 전 ${pair.index}`}
                  caption="청소 전"
                  chip="청소 전"
                  chipClassName="bg-ink/80 text-white"
                />
              ) : null}

              {pair.after ? (
                <ViewablePhoto
                  src={pair.after}
                  alt={`${heading} 청소 후 ${pair.index}`}
                  caption="청소 후"
                  chip="청소 후"
                  chipClassName="bg-brand text-ink"
                />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
