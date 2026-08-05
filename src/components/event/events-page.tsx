import { SiteFooter } from "../marketing/site-footer";
import { SiteHeader } from "../marketing/site-header";
import { BrowseHeroSection } from "./browse-hero-section";
import { BrowseMainSection } from "./browse-main-section";

export function EventsPage() {
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
