import { AdvertiseContactSection } from "@/components/architecture-events/advertise/contact-section";
import { AdvertiseHeroSection } from "@/components/architecture-events/advertise/hero-section";
import { AdvertisePackagesSection } from "@/components/architecture-events/advertise/packages-section";
import { SiteFooter } from "@/components/architecture-events/marketing/site-footer";
import { SiteHeader } from "@/components/architecture-events/marketing/site-header";
import { SubmitEventFaqSection } from "@/components/architecture-events/submit-event/faq-section";

export default function AdvertisePage() {
  return (
    <div className="ae-shell">
      <SiteHeader />
      <main>
        <AdvertiseHeroSection />
        <AdvertisePackagesSection />
        <SubmitEventFaqSection />
        <AdvertiseContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
