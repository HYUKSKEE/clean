import { faqs } from "./faq";
import { services } from "./services";
import { site } from "./site";

/** 지역 기반 SEO – LocalBusiness 구조화 데이터 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${site.url}#business`,
  name: site.name,
  legalName: site.legalName,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: `${site.url}/images/og.svg`,
  foundingDate: String(site.foundingYear),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressCountry: "KR",
  },
  areaServed: site.areas.map((area) => ({
    "@type": "AdministrativeArea",
    name: area,
  })),
  openingHours: "Mo-Su 08:00-20:00",
  priceRange: "₩₩",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "청소 서비스",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        url: `${site.url}/services/${service.slug}`,
      },
    })),
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export const serviceSchema = (slug: string) => {
  const service = services.find((item) => item.slug === slug);
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.title,
    url: `${site.url}/services/${service.slug}`,
    provider: { "@id": `${site.url}#business` },
    areaServed: site.areas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
  };
};

/** <script type="application/ld+json"> 삽입용 */
export const jsonLd = (data: unknown) => ({
  __html: JSON.stringify(data).replace(/</g, "\\u003c"),
});
