import { AboutFounderSection } from "@/components/about/founder-section";
import { AboutHeroSection } from "@/components/about/hero-section";
import { AboutHighlightsSection } from "@/components/about/highlights-section";
import { AboutVisionSection } from "@/components/about/vision-section";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export default function Page() {
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
