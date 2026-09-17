import { beforeAfterCases } from "./before-after";
import { faqs } from "./faq";
import { portfolio } from "./portfolio";
import { regions } from "./areas";
import { services } from "./services";
import { site } from "./site";

const businessId = `${site.url}#business`;
const websiteId = `${site.url}#website`;
const webpageId = `${site.url}#webpage`;

/** 지역 기반 SEO – LocalBusiness 구조화 데이터 */
export const localBusinessSchema = {
  "@type": "HomeAndConstructionBusiness",
  "@id": businessId,
  name: site.name,
  legalName: site.legalName,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: `${site.url}/images/og.png`,
  logo: `${site.url}/images/og.png`,
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
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "20:00",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phone,
    email: site.email,
    contactType: "customer service",
    areaServed: "KR",
    availableLanguage: ["ko"],
  },
  priceRange: "₩₩",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "유리창 · 외벽 청소 서비스",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${site.url}/services/${service.slug}#service`,
        name: service.title,
        description: service.summary,
        url: `${site.url}/services/${service.slug}`,
        areaServed: site.areas.map((area) => ({
          "@type": "AdministrativeArea",
          name: area,
        })),
      },
    })),
  },
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: "ko-KR",
  publisher: { "@id": businessId },
};

export const homePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    websiteSchema,
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: site.url,
      name: `${site.name} | 서울 · 경기 · 인천 유리창 · 외벽 청소 전문`,
      description: site.description,
      inLanguage: "ko-KR",
      isPartOf: { "@id": websiteId },
      about: { "@id": businessId },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${site.url}/images/og.png`,
      },
    },
    {
      "@type": "ItemList",
      "@id": `${site.url}#services`,
      name: "삐까번쩍 청소 서비스",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: services.length,
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: `${site.url}/services/${service.slug}`,
        description: service.summary,
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${site.url}#portfolio`,
      name: "서울 · 경기 · 인천 시공 사례",
      numberOfItems: portfolio.length,
      itemListElement: portfolio.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        description: `${item.location} ${item.description}`,
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${site.url}#areas`,
      name: "출장 가능 지역",
      itemListElement: regions.map((region, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "AdministrativeArea",
          name: region.name,
          description: region.summary,
        },
      })),
    },
    {
      "@type": "ImageGallery",
      "@id": `${site.url}#before-after`,
      name: "청소 전후 비교",
      associatedMedia: beforeAfterCases.map((item) => ({
        "@type": "ImageObject",
        name: `${item.label} 청소 전후`,
        description: `${item.location}. ${item.description}`,
        contentUrl: `${site.url}${item.afterImage}`,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export const breadcrumbSchema = (items: Array<{ name: string; href: string }>) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.href.startsWith("http") ? item.href : `${site.url}${item.href}`,
  })),
});

export const serviceSchema = (slug: string) => {
  const service = services.find((item) => item.slug === slug);
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${site.url}/services/${service.slug}#service`,
        name: service.title,
        serviceType: service.title,
        description: service.description,
        url: `${site.url}/services/${service.slug}`,
        image: `${site.url}${service.image}`,
        provider: { "@id": businessId },
        areaServed: site.areas.map((area) => ({
          "@type": "AdministrativeArea",
          name: area,
        })),
        audience: {
          "@type": "Audience",
          audienceType: service.targets.join(", "),
        },
      },
      breadcrumbSchema([
        { name: "홈", href: "/" },
        { name: "서비스 소개", href: "/#services" },
        { name: service.title, href: `/services/${service.slug}` },
      ]),
    ],
  };
};

/** <script type="application/ld+json"> 삽입용 */
export const jsonLd = (data: unknown) => ({
  __html: JSON.stringify(data).replace(/</g, "\\u003c"),
});
