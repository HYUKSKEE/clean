import type { Metadata } from "next";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioGallery } from "@/components/sections/PortfolioGallery";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { TrustFeatures } from "@/components/sections/TrustFeatures";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { homePageSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: {
    absolute: `${site.name} | 서울 · 경기 · 인천 유리창 · 외벽 청소 전문`,
  },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustFeatures />
      <ServiceGrid />
      <BeforeAfterSection />
      <PortfolioGallery />
      <ServiceArea />
      <FAQAccordion />
      <ContactSection />
      <JsonLd data={homePageSchema} />
    </>
  );
}
