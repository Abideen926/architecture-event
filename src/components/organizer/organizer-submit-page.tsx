"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { appRoutes } from "@/lib/routes";
import { useGetOrganizerEventQuery } from "@/features/organizer/organizer-api";
import type { PackageId, SubmitStep } from "./submit-event/submit-event-types";
import { SubmitEventFormStep } from "./submit-event/submit-event-form-step";
import { SubmitEventPackageStep } from "./submit-event/submit-event-package-step";
import { SubmitEventSuccessStep } from "./submit-event/submit-event-success-step";
import { Heading } from "@/components/ui/heading";

export function OrganizerSubmitPage() {
  return (
    <Suspense fallback={<OrganizerSubmitPageFallback />}>
      <OrganizerSubmitPageContent />
    </Suspense>
  );
}

function OrganizerSubmitPageFallback() {
  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <div className="border-b border-ae-border pb-5">
        <Heading level="page">Submit New Event</Heading>
        <p className="mt-2 text-[14.5px] text-ae-muted">Loading...</p>
      </div>
    </div>
  );
}

function OrganizerSubmitPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");

  const { data: existingEvent, isLoading: isLoadingEvent } =
    useGetOrganizerEventQuery(eventId ?? "", { skip: !eventId });

  const initialStep: SubmitStep = eventId
    ? "form"
    : searchParams.get("step") === "form"
      ? "form"
      : "package";
  const [step, setStep] = useState<SubmitStep>(initialStep);
  const [selectedPackage, setSelectedPackage] = useState<PackageId>("featured");

  useEffect(() => {
    if (existingEvent?.isFeatured) setSelectedPackage("featured");
  }, [existingEvent]);

  const selectedPackageLabel =
    selectedPackage === "featured"
      ? "Featured Listing — $49"
      : "Basic Listing — Free";

  if (eventId && isLoadingEvent) {
    return <OrganizerSubmitPageFallback />;
  }

  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <div className="border-b border-ae-border pb-5">
        <Heading level="page">
          {eventId ? "Edit Event" : "Submit New Event"}
        </Heading>
        <p className="mt-2 text-[14.5px] text-ae-muted">
          {step === "package"
            ? "Step 1 of 2 — choose your listing package"
            : step === "form"
              ? eventId
                ? "Update your event details below"
                : "Step 2 of 2 — fill in your event details"
              : "Submitted"}
        </p>
      </div>

      {step === "package" ? (
        <SubmitEventPackageStep
          onSelectPackage={(packageId) => {
            setSelectedPackage(packageId);
            setStep("form");
          }}
        />
      ) : null}

      {step === "form" ? (
        <SubmitEventFormStep
          selectedPackageLabel={selectedPackageLabel}
          requestFeatured={selectedPackage === "featured"}
          initialEvent={existingEvent}
          onChangePackage={() => setStep("package")}
          onSavedDraft={(event) => {
            if (!eventId) {
              router.replace(
                `${appRoutes.organizer.submit}?step=form&id=${event.id}`,
              );
            }
          }}
          onSubmittedForReview={(_event, checkoutUrl) => {
            if (checkoutUrl) {
              window.location.href = checkoutUrl;
              return;
            }
            setStep("done");
          }}
        />
      ) : null}

      {step === "done" ? (
        <SubmitEventSuccessStep
          selectedPackage={selectedPackage}
          onBackToListings={() => router.push(appRoutes.organizer.root)}
        />
      ) : null}
    </div>
  );
}
