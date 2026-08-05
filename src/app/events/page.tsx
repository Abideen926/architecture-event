import { BrowseHeroSection } from "@/components/event/hero-section";
import { BrowseMainSection } from "@/components/event/main-section";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";


export default function Page() {
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
