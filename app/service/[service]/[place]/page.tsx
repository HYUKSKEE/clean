import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { ServiceDetailArticle } from "@/components/sections/ServiceDetailArticle";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPlace, places, servicePlaceHref } from "@/lib/areas";
import { getService, services } from "@/lib/services";
import { getServicePhotos } from "@/lib/service-photos";
import { site } from "@/lib/site";
import { serviceSchema } from "@/lib/structured-data";

type Params = { params: Promise<{ service: string; place: string }> };

export function generateStaticParams() {
  return services.flatMap((service) =>
    places.map((place) => ({ service: service.slug, place: place.slug })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { service: serviceSlug, place: placeSlug } = await params;
  const service = getService(serviceSlug);
  const place = getPlace(placeSlug);

  if (!service || !place) return { title: "페이지를 찾을 수 없습니다" };

  const title = `${place.label} ${service.title}`;
  const description = `${place.label} ${service.title} 전문. ${service.summary}`;
  const keywords = [
    `${place.label} ${service.title}`,
    ...service.keywords.map((keyword) => `${place.label} ${keyword}`),
  ];
  const photos = getServicePhotos(service.slug);
  const ogImage = photos.after ?? service.image;
  const path = servicePlaceHref(service.slug, place.slug);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      title: `${title} – ${site.name}`,
      description,
      url: path,
      images: [{ url: ogImage, alt: photos.after ? `${title} 청소 후` : service.imageAlt }],
    },
  };
}

export default async function ServicePlacePage({ params }: Params) {
  const { service: serviceSlug, place: placeSlug } = await params;
  const service = getService(serviceSlug);
  const place = getPlace(placeSlug);

  if (!service || !place) notFound();

  const schema = serviceSchema(service.slug, place);

  return (
    <>
      <SiteShell>
        <ServiceDetailArticle service={service} place={place} />
      </SiteShell>
      {schema ? <JsonLd data={schema} /> : null}
    </>
  );
}
