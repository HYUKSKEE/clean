import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ServiceDetailArticle } from "@/components/sections/ServiceDetailArticle";
import { JsonLd } from "@/components/seo/JsonLd";
import { getService, services } from "@/lib/services";
import { getServicePhotos } from "@/lib/service-photos";
import { site } from "@/lib/site";
import { serviceSchema } from "@/lib/structured-data";

type Params = { params: Promise<{ slug: string }> };

/** 서비스가 추가되면 상세 페이지도 자동으로 생성됩니다. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return { title: "서비스를 찾을 수 없습니다" };

  const title = `${service.title} | 서울 · 경기 · 인천`;

  const photos = getServicePhotos(service.slug);
  const ogImage = photos.after ?? service.image;

  return {
    title,
    description: `${site.areas.join(" · ")} ${service.title} 전문. ${service.summary}`,
    keywords: [...service.keywords, ...site.areas.map((area) => `${area} ${service.title}`)],
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      title: `${service.title} – ${site.name}`,
      description: `${site.areas.join(" · ")} ${service.title} 전문. ${service.summary}`,
      url: `/services/${service.slug}`,
      images: [{ url: ogImage, alt: photos.after ? `${service.title} 청소 후` : service.imageAlt }],
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const schema = serviceSchema(service.slug);

  return (
    <>
      <SiteShell>
        <ServiceDetailArticle service={service} />
      </SiteShell>
      {schema ? <JsonLd data={schema} /> : null}
    </>
  );
}
