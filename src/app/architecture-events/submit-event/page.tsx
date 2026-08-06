import { SubmitEventFaqSection } from "@/components/architecture-events/submit-event/faq-section";
import { SubmitEventHeroSection } from "@/components/architecture-events/submit-event/hero-section";
import { SubmitEventPricingSection } from "@/components/architecture-events/submit-event/pricing-section";

export default function SubmitEventPage() {
  return (
    <div className="ae-shell">
      <main>
        <SubmitEventHeroSection />
        <SubmitEventPricingSection />
        <SubmitEventFaqSection />
      </main>
    </div>
  );
}
