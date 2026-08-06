import { AboutFounderSection } from "@/components/architecture-events/about/founder-section";
import { AboutHeroSection } from "@/components/architecture-events/about/hero-section";
import { AboutHighlightsSection } from "@/components/architecture-events/about/highlights-section";
import { AboutVisionSection } from "@/components/architecture-events/about/vision-section";
import { SiteFooter } from "@/components/architecture-events/marketing/site-footer";
import { SiteHeader } from "@/components/architecture-events/marketing/site-header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf7]">
      <SiteHeader />
      <main>
        <AboutHeroSection />
        <AboutHighlightsSection />
        <AboutVisionSection />
        <AboutFounderSection />
      </main>
      <SiteFooter />
    </div>
  );
}
