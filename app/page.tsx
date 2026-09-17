import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioGallery } from "@/components/sections/PortfolioGallery";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { TrustFeatures } from "@/components/sections/TrustFeatures";
import { faqSchema, jsonLd } from "@/lib/structured-data";

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

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />
    </>
  );
}
