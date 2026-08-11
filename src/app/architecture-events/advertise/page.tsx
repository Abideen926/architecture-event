import { AdvertiseContactSection } from "@/components/architecture-events/advertise/contact-section";
import { AdvertiseHeroSection } from "@/components/architecture-events/advertise/hero-section";
import { AdvertisePackagesSection } from "@/components/architecture-events/advertise/packages-section";
import { SubmitEventFaqSection } from "@/components/architecture-events/submit-event/faq-section";
import { advertiseFaqItems } from "@/lib/architecture-events/advertise/advertise-data";

export default function AdvertisePage() {
  return (
    <div className="ae-shell">
      <main>
        <AdvertiseHeroSection />
        <AdvertisePackagesSection />
        <SubmitEventFaqSection
          heading="Advertise FAQ"
          items={advertiseFaqItems}
          maxWidthClassName="max-w-[1280px]"
        />
        <AdvertiseContactSection />
      </main>
    </div>
  );
}
