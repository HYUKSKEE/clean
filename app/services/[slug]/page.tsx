import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactSection } from "@/components/sections/ContactSection";
import { getService, services } from "@/lib/services";
import { site, telHref } from "@/lib/site";
import { jsonLd, serviceSchema } from "@/lib/structured-data";

type Params = { params: Promise<{ slug: string }> };

/** 서비스가 추가되면 상세 페이지도 자동으로 생성됩니다. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return { title: "서비스를 찾을 수 없습니다" };

  const title = `${service.title} | ${site.areas.join(" · ")}`;

  return {
    title,
    description: service.summary,
    keywords: service.keywords,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      title: `${service.title} – ${site.name}`,
      description: service.summary,
      url: `/services/${service.slug}`,
      images: [{ url: service.image, alt: service.imageAlt }],
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const schema = serviceSchema(service.slug);

  return (
    <>
      <article>
        <header className="border-b border-line bg-surface/60 py-12 lg:py-16">
          <div className="container-page">
            <nav aria-label="위치 경로" className="text-sm text-ink-muted">
              <ol className="flex items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-ink">
                    홈
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/#services" className="hover:text-ink">
                    서비스 소개
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-semibold text-ink">{service.title}</li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-bold text-brand-deep">
                  <service.icon className="size-4" aria-hidden />
                  {site.areas.join(" · ")} 출장 가능
                </span>
                <h1 className="mt-4 text-[2rem] leading-tight font-extrabold sm:text-4xl lg:text-[2.75rem]">
                  {service.title}
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

              <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={800}
                  height={600}
                  priority
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="border-b border-line py-16 lg:py-20">
          <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">시공 방식</h2>
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
                  <dd className="mt-1 font-bold">{site.areas.join(" · ")} 전 지역</dd>
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
            </aside>
          </div>
        </div>

        <section aria-labelledby="related-title" className="border-b border-line py-16 lg:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Other services"
              title={<span id="related-title">함께 많이 의뢰하는 서비스</span>}
              align="left"
            />
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} className="h-full">
                  <ServiceCard service={item} />
                </li>
              ))}
            </ul>

            <Link
              href="/#services"
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-bold hover:text-brand-deep"
            >
              <ArrowLeft className="size-4" aria-hidden />
              전체 서비스 보기
            </Link>
          </div>
        </section>
      </article>

      <ContactSection />

      {schema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      ) : null}
    </>
  );
}
