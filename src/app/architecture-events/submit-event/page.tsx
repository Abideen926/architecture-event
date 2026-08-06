import { SiteFooter } from "@/components/architecture-events/marketing/site-footer";
import { SiteHeader } from "@/components/architecture-events/marketing/site-header";
import { SubmitEventFaqSection } from "@/components/architecture-events/submit-event/faq-section";
import { SubmitEventHeroSection } from "@/components/architecture-events/submit-event/hero-section";
import { SubmitEventPricingSection } from "@/components/architecture-events/submit-event/pricing-section";

export default function SubmitEventPage() {
  return (
    <div className="ae-shell">
      <SiteHeader />
      <main>
        <SubmitEventHeroSection />
        <SubmitEventPricingSection />
        <SubmitEventFaqSection />
      </main>
      <SiteFooter />
    </div>
  );
}
