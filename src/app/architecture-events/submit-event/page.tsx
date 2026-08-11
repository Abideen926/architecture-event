import { SubmitEventFaqSection } from "@/components/architecture-events/submit-event/faq-section";
import { SubmitEventHeroSection } from "@/components/architecture-events/submit-event/hero-section";
import { SubmitEventPricingSection } from "@/components/architecture-events/submit-event/pricing-section";
import { submitEventFaqItems } from "@/lib/architecture-events/submit-event/submit-event-data";

export default function SubmitEventPage() {
  return (
    <div className="ae-shell">
      <main>
        <SubmitEventHeroSection />
        <SubmitEventPricingSection />
        <SubmitEventFaqSection items={submitEventFaqItems} maxWidthClassName="max-w-[1040px]" />
      </main>
    </div>
  );
}
