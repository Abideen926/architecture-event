"use client";

import type { PackageId } from "./submit-event-types";
import { organizerPackages } from "@/lib/organizer/organizer-data";
import { Heading } from "@/components/ui/heading";

type SubmitEventPackageStepProps = {
  onSelectPackage: (packageId: PackageId) => void;
};

export function SubmitEventPackageStep({
  onSelectPackage,
}: SubmitEventPackageStepProps) {
  return (
    <div className="mt-[28px]">
      <Heading level="section" as="h3">
        Choose a listing package
      </Heading>
      <p className="mt-2 text-[15px] leading-[1.7] text-ae-muted">
        Pick a package to open the submission form. You can change it before you
        submit.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {organizerPackages.map((item) => (
          <div
            key={item.id}
            className={`rounded-[20px] border bg-white p-[26px] ${
              item.id === "featured" ? "border-foreground" : "border-ae-border"
            }`}
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[11px] font-bold tracking-[0.16em] text-ae-muted">
                  {item.name.toUpperCase()}
                </p>
                <p className="ae-serif mt-[18px] text-[46px] font-semibold leading-none tracking-[-0.04em] text-[#2C2C2C]">
                  {item.price}
                </p>
              </div>
              {item.id === "featured" ? (
                <span className="inline-flex rounded-full bg-ae-accent px-[12px] py-[5px] text-[10px] font-bold tracking-[0.12em] text-white">
                  FEATURED
                </span>
              ) : null}
            </div>

            <div className="mt-5 border-t border-[#EAEAEA] pt-5" />

            <div className="grid gap-[11px] text-[14.5px] text-[#4B4B4B]">
              {item.points.map((point) => (
                <span key={point} className="flex items-start gap-[10px]">
                  <span className="mt-[2px] text-[13px] font-semibold text-ae-accent">
                    +
                  </span>
                  <span>{point}</span>
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onSelectPackage(item.id)}
              className={`mt-7 rounded-[12px] px-[20px] py-[13px] text-[15px] font-semibold transition-colors ${
                item.id === "featured"
                  ? "bg-[#232323] text-white hover:bg-black"
                  : "border border-foreground bg-white text-foreground hover:bg-mainbackground"
              }`}
            >
              {item.id === "featured" ? "Select Featured" : "Select Basic"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
