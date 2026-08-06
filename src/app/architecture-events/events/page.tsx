import { BrowseHeroSection } from "@/components/architecture-events/event/hero-section";
import { BrowseMainSection } from "@/components/architecture-events/event/main-section";

export default function EventsPage() {
  return (
    <div className="ae-shell">
      <main>
        <BrowseHeroSection />
        <BrowseMainSection />
      </main>
    </div>
  );
}
