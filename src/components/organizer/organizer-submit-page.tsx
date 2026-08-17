"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
  organizerDefaultForm,
} from "@/lib/organizer/organizer-data";
import type { PackageId, SubmitStep } from "./submit-event/submit-event-types";
import { SubmitEventFormStep } from "./submit-event/submit-event-form-step";
import { SubmitEventPackageStep } from "./submit-event/submit-event-package-step";
import { SubmitEventSuccessStep } from "./submit-event/submit-event-success-step";

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
      <div className="border-b border-[#E7E7E7] pb-5">
        <h2 className="ae-serif text-[30px] font-semibold tracking-[-0.015em] text-[#202020]">
          Submit New Event
        </h2>
        <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
          Step 1 of 2 - choose your listing package
        </p>
      </div>
    </div>
  );
}

function OrganizerSubmitPageContent() {
  const searchParams = useSearchParams();
  const initialStep: SubmitStep =
    searchParams.get("step") === "form" ? "form" : "package";
  const [step, setStep] = useState<SubmitStep>(initialStep);
  const [selectedPackage, setSelectedPackage] = useState<PackageId>("featured");
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  // FIX: Explicitly type all form states as <string> to allow updates from inputs
  const [eventName, setEventName] = useState<string>(
    organizerDefaultForm.eventName
  );
  const [eventDate, setEventDate] = useState<string>(
    organizerDefaultForm.eventDate
  );
  const [city, setCity] = useState<string>(organizerDefaultForm.city);
  const [venue, setVenue] = useState<string>(organizerDefaultForm.venue);
  const [category, setCategory] = useState<string>(
    organizerDefaultForm.category
  );
  const [registrationUrl, setRegistrationUrl] = useState<string>(
    organizerDefaultForm.registrationUrl
  );
  const [description, setDescription] = useState<string>(
    organizerDefaultForm.description
  );
  const [notes, setNotes] = useState<string>(organizerDefaultForm.notes);
  const [contactName, setContactName] = useState<string>(
    organizerDefaultForm.contactName
  );
  const [contactEmail, setContactEmail] = useState<string>(
    organizerDefaultForm.contactEmail
  );
  const [phone, setPhone] = useState<string>(organizerDefaultForm.phone);
  const [organization, setOrganization] = useState<string>(
    organizerDefaultForm.organization
  );

  const selectedPackageLabel =
    selectedPackage === "featured"
      ? "Featured Listing - $49"
      : "Basic Listing - Free";

  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <div className="border-b border-[#E7E7E7] pb-5">
        <h2 className="ae-serif text-[30px] font-semibold tracking-[-0.015em] text-[#202020]">
          Submit New Event
        </h2>
        <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
          Step 1 of 2 - choose your listing package
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
          eventName={eventName}
          setEventName={setEventName}
          category={category}
          setCategory={setCategory}
          registrationUrl={registrationUrl}
          setRegistrationUrl={setRegistrationUrl}
          description={description}
          setDescription={setDescription}
          eventDate={eventDate}
          setEventDate={setEventDate}
          city={city}
          setCity={setCity}
          venue={venue}
          setVenue={setVenue}
          thumbnailIndex={thumbnailIndex}
          setThumbnailIndex={setThumbnailIndex}
          notes={notes}
          setNotes={setNotes}
          contactName={contactName}
          setContactName={setContactName}
          contactEmail={contactEmail}
          setContactEmail={setContactEmail}
          phone={phone}
          setPhone={setPhone}
          organization={organization}
          setOrganization={setOrganization}
          onSubmitReview={() => setStep("done")}
        />
      ) : null}

      {step === "done" ? (
        <SubmitEventSuccessStep
          selectedPackage={selectedPackage}
          onBackToListings={() => setStep("package")}
        />
      ) : null}
    </div>
  );
}
