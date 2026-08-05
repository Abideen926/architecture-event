import { AdvertiseContactSection } from "@/components/advertise/contact-section";
import { AdvertiseHeroSection } from "@/components/advertise/hero-section";
import { AdvertisePackagesSection } from "@/components/advertise/packages-section";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { SubmitEventFaqSection } from "@/components/submit-event/faq-section";


export default function Page() {
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
