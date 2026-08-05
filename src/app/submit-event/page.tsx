import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { SubmitEventFaqSection } from "@/components/submit-event/faq-section";
import { SubmitEventHeroSection } from "@/components/submit-event/hero-section";
import { SubmitEventPricingSection } from "@/components/submit-event/pricing-section";

export default function Page() {
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
