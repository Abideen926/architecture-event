"use client";

import { Check } from "lucide-react";
import type { PackageId } from "./submit-event-types";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

type SubmitEventSuccessStepProps = {
  selectedPackage: PackageId;
  onBackToListings: () => void;
};

export function SubmitEventSuccessStep({
  selectedPackage,
  onBackToListings,
}: SubmitEventSuccessStepProps) {
  return (
    <div className="mt-[30px] rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] px-[44px] py-[66px] text-center">
      <span className="inline-flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#1E1E1E] text-white">
        <Check className="h-[22px] w-[22px]" strokeWidth={2.1} />
      </span>
      <Heading level="page" as="h3" className="mt-6">
        Your event has been submitted
      </Heading>
      <p className="mx-auto mt-[14px] max-w-[52ch] text-[16px] leading-[1.75] text-[#6A6A6A]">
        It is now under review. You&apos;ll receive a confirmation email
        shortly, and the status on your listing will update as editorial works
        through it.
      </p>
      {selectedPackage === "featured" ? (
        <p className="mx-auto mt-[18px] max-w-[52ch] text-[14.5px] leading-[1.7] text-[#6A6A6A]">
          Your Featured Listing request is attached to this submission and will
          be reviewed alongside your event.
        </p>
      ) : null}
      <div className="mt-[30px] flex flex-wrap justify-center gap-3">
        <Button onClick={onBackToListings}>Back to My Listings</Button>
        <Button variant="secondary" onClick={onBackToListings}>
          Submit another event
        </Button>
      </div>
    </div>
  );
}
