import { AdvertiseContactSection } from "@/components/architecture-events/advertise/contact-section";
import { AdvertiseHeroSection } from "@/components/architecture-events/advertise/hero-section";
import { AdvertisePackagesSection } from "@/components/architecture-events/advertise/packages-section";
import { SubmitEventFaqSection } from "@/components/architecture-events/submit-event/faq-section";

export default function AdvertisePage() {
  return (
    <div className="ae-shell">
      <main>
        <AdvertiseHeroSection />
        <AdvertisePackagesSection />
        <SubmitEventFaqSection />
        <AdvertiseContactSection />
      </main>
    </div>
  );
}
