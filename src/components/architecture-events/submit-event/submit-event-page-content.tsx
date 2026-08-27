"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { appRoutes } from "@/lib/routes";
import { SubmitEventFaqSection } from "@/components/architecture-events/submit-event/faq-section";
import { SubmitEventHeroSection } from "@/components/architecture-events/submit-event/hero-section";
import { SubmitEventPricingSection } from "@/components/architecture-events/submit-event/pricing-section";
import { PublicSubmitEventForm } from "@/components/architecture-events/submit-event/public-submit-event-form";
import { submitEventFaqItems } from "@/lib/architecture-events/submit-event/submit-event-data";
import type { PackageId } from "@/components/organizer/submit-event/submit-event-types";

export function SubmitEventPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (searchParams.get("step") === "form") {
    const packageId: PackageId =
      searchParams.get("package") === "featured" ? "featured" : "basic";

    return (
      <PublicSubmitEventForm
        packageId={packageId}
        onChangePackage={() => router.push(appRoutes.architectureEvents.submitEvent)}
      />
    );
  }

  return (
    <>
      <SubmitEventHeroSection />
      <SubmitEventPricingSection />
      <SubmitEventFaqSection items={submitEventFaqItems} maxWidthClassName="max-w-[1040px]" />
    </>
  );
}
