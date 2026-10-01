import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactSection } from "@/components/sections/ContactSection";
import { AreaPlaceNav } from "@/components/sections/AreaPlaceNav";
import { ServiceWorks } from "@/components/sections/ServiceWorks";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { ImageViewerProvider, ViewablePhoto } from "@/components/ui/ImageViewer";
import { type ServicePlace } from "@/lib/areas";
import { type Service, services } from "@/lib/services";
import { getServicePhotos } from "@/lib/service-photos";
import { site, telHref } from "@/lib/site";

export function ServiceDetailArticle({
  service,
  place,
}: {
  service: Service;
  place?: ServicePlace;
}) {
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const areaLabel = place?.label ?? site.areas.join(" · ");
  const heading = place ? `${place.label} ${service.title}` : service.title;
  const photos = getServicePhotos(service.slug);
  const heroImage = photos.after ?? service.image;
  const heroAlt = photos.after
    ? `${heading} 청소 후`
    : service.imageAlt;
  const viewerImages = photos.pairs.flatMap((pair) => [
    ...(pair.before
      ? [{ src: pair.before, alt: `${heading} 청소 전 ${pair.index}`, caption: "청소 전" }]
      : []),
    ...(pair.after
      ? [{ src: pair.after, alt: `${heading} 청소 후 ${pair.index}`, caption: "청소 후" }]
      : []),
  ]);
  const gallery =
    viewerImages.length > 0
      ? viewerImages
      : [{ src: heroImage, alt: heroAlt }];

  return (
    <>
      <article>
        <ImageViewerProvider images={gallery}>
        <header className="border-b border-line bg-surface/60 py-12 lg:py-16">
          <div className="container-page">
            <nav aria-label="위치 경로" className="text-sm text-ink-muted">
              <ol className="flex flex-wrap items-center gap-x-2">
                <li className="after:ml-2 after:text-ink-muted after:content-['/']">
                  <Link href="/" className="hover:text-ink">
                    홈
                  </Link>
                </li>
                {place ? (
                  <li className="after:ml-2 after:text-ink-muted after:content-['/']">
                    <Link href="/#area" className="hover:text-ink">
                      서비스 지역
                    </Link>
                  </li>
                ) : (
                  <li className="after:ml-2 after:text-ink-muted after:content-['/']">
                    <Link href="/#services" className="hover:text-ink">
                      서비스 소개
                    </Link>
                  </li>
                )}
                <li aria-current="page" className="font-semibold text-ink">
                  {heading}
                </li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-bold text-brand-deep">
                  <service.icon className="size-4" aria-hidden />
                  {areaLabel} 출장 가능
                </span>
                <h1 className="mt-4 text-[2rem] leading-tight font-extrabold sm:text-4xl lg:text-[2.75rem]">
                  {heading}
                  <span className="mt-3 block text-lg font-semibold text-ink-soft sm:text-xl">
                    {areaLabel} 출장 시공
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                  {service.summary}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="/#contact" size="lg">
                    무료 견적 문의
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                  <Button href={telHref} variant="ghost" size="lg">
                    <Phone className="size-4" aria-hidden />
                    {site.phone}
                  </Button>
                </div>
              </div>

              {photos.before && photos.after ? (
                <BeforeAfterSlider
                  beforeImage={photos.before}
                  afterImage={photos.after}
                  beforeAlt={`${heading} 청소 전`}
                  afterAlt={`${heading} 청소 후`}
                  beforeLabel="청소 전"
                  afterLabel="청소 후"
                  caption={`${heading} 청소 전후`}
                  priority
                  sizes="(min-width: 640px) 500px, 100vw"
                  className="mx-auto aspect-[10/7] w-[500px] max-w-full"
                />
              ) : (
                <ViewablePhoto
                  src={heroImage}
                  alt={heroAlt}
                  caption={photos.after ? "청소 후" : undefined}
                  chip={photos.after ? "청소 후" : undefined}
                  chipClassName="bg-brand text-ink"
                  priority
                />
              )}
            </div>
          </div>
        </header>

        <ServiceWorks heading={heading} pairs={photos.pairs} />

        <section
          aria-labelledby="method-title"
          className="border-b border-line py-16 lg:py-20"
        >
          <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 id="method-title" className="text-2xl font-extrabold sm:text-3xl">
                {heading} 시공 방식
              </h2>
              <p className="mt-5 text-[0.975rem] leading-relaxed text-ink-soft sm:text-base">
                {service.description}
              </p>

              <h3 className="mt-10 text-xl font-bold">작업 범위</h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {service.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 rounded-xl border border-line bg-white p-4 text-[0.925rem]"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-deep" aria-hidden />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="h-fit rounded-2xl border border-line bg-surface/70 p-6 lg:sticky lg:top-28">
              <h3 className="text-lg font-bold">주요 시공 대상</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.targets.map((target) => (
                  <li
                    key={target}
                    className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink-soft"
                  >
                    {target}
                  </li>
                ))}
              </ul>

              <dl className="mt-6 flex flex-col gap-4 border-t border-line pt-5 text-sm">
                <div>
                  <dt className="text-ink-muted">출장 지역</dt>
                  <dd className="mt-1 font-bold">
                    {place ? `${place.label} 출장` : `${areaLabel} 전 지역`}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-muted">상담 시간</dt>
                  <dd className="mt-1 font-bold">{site.hours}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">출장 견적비</dt>
                  <dd className="mt-1 font-bold">무료</dd>
                </div>
              </dl>

              <Button href="/#contact" className="mt-6 w-full" size="lg">
                견적 문의하기
              </Button>

              <div className="mt-8 border-t border-line pt-5">
                <AreaPlaceNav
                  serviceSlug={service.slug}
                  heading={`${service.title} 출장 지역`}
                />
              </div>
            </aside>
          </div>
        </section>

        <section aria-labelledby="related-title" className="border-b border-line py-16 lg:py-20">
          <div className="container-page">
            <SectionHeading
              id="related-title"
              eyebrow="Other services"
              title="함께 많이 의뢰하는 서비스"
              align="left"
            />
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} className="h-full">
                  <ServiceCard service={item} placeSlug={place?.slug} />
                </li>
              ))}
            </ul>

            <Link
              href={place ? "/#area" : "/#services"}
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-bold hover:text-brand-deep"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {place ? "서비스 지역 보기" : "전체 서비스 보기"}
            </Link>
          </div>
        </section>
        </ImageViewerProvider>
      </article>

      <ContactSection />
    </>
  );
}
