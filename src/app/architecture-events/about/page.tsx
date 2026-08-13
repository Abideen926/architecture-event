import { AboutFounderSection } from "@/components/architecture-events/about/founder-section";
import { AboutHeroSection } from "@/components/architecture-events/about/hero-section";
import { AboutHighlightsSection } from "@/components/architecture-events/about/highlights-section";
import { AboutLastSection } from "@/components/architecture-events/about/about-last-section";
import { AboutVisionSection } from "@/components/architecture-events/about/vision-section";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf7]">
      <main>
        <AboutHeroSection />
        <AboutHighlightsSection />
        <AboutVisionSection />
        <AboutFounderSection />
        <AboutLastSection />
      </main>
    </div>
  );
}
