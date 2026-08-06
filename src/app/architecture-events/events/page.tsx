import { BrowseHeroSection } from "@/components/architecture-events/event/hero-section";
import { BrowseMainSection } from "@/components/architecture-events/event/main-section";
import { SiteFooter } from "@/components/architecture-events/marketing/site-footer";
import { SiteHeader } from "@/components/architecture-events/marketing/site-header";

export default function EventsPage() {
  return (
    <div className="ae-shell">
      <SiteHeader />
      <main>
        <BrowseHeroSection />
        <BrowseMainSection />
      </main>
      <SiteFooter />
    </div>
  );
}
