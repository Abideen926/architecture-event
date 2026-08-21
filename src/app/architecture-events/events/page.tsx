import { Suspense } from "react";
import { BrowseHeroSection } from "@/components/architecture-events/event/hero-section";
import { BrowseMainSection } from "@/components/architecture-events/event/main-section";

export default function EventsPage() {
  return (
    <div className="ae-shell">
      <main>
        <Suspense fallback={null}>
          <BrowseHeroSection />
          <BrowseMainSection />
        </Suspense>
      </main>
    </div>
  );
}
