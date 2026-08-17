"use client";

import { Check } from "lucide-react";
import type { PackageId } from "./submit-event-types";

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
      <h3 className="ae-serif mt-6 text-[29px] font-semibold tracking-[-0.015em] text-[#202020]">
        Your event has been submitted
      </h3>
      <p className="mx-auto mt-[14px] max-w-[52ch] text-[16px] leading-[1.75] text-[#6A6A6A]">
        It is now under review. You&apos;ll receive a confirmation email
        shortly, and the status on your listing will update as editorial works
        through it.
      </p>
      {selectedPackage === "featured" ? (
        <p className="mx-auto mt-[18px] max-w-[52ch] text-[14.5px] leading-[1.7] text-[#6A6A6A]">
          Payment for the Featured Listing is processed after editorial
          approval. Nothing has been charged yet.
        </p>
      ) : null}
      <div className="mt-[30px] flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onBackToListings}
          className="rounded-[12px] bg-[#1E1E1E] px-[28px] py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-black"
        >
          Back to My Listings
        </button>
        <button
          type="button"
          onClick={onBackToListings}
          className="rounded-[12px] border border-[#202020] bg-white px-[26px] py-[15px] text-[15px] font-semibold text-[#202020] transition-colors hover:bg-[#F1F1F1]"
        >
          Submit another event
        </button>
      </div>
    </div>
  );
}
