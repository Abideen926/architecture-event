import type { Metadata } from "next";
import { CircleAlert } from "lucide-react";
import { appRoutes } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

export const metadata: Metadata = {
  title: "Payment Cancelled | Architecture Events",
};

export default function FeaturePaymentCancelledPage() {
  return (
    <div className="mt-[30px] rounded-[20px] border border-ae-border bg-mainbackground px-[44px] py-[66px] text-center animate-[fadeIn_0.35s_ease]">
      <span className="inline-flex h-[56px] w-[56px] items-center justify-center rounded-full border border-ae-border bg-white text-ae-accent">
        <CircleAlert className="h-[22px] w-[22px]" strokeWidth={1.8} />
      </span>
      <Heading level="page" as="h1" className="mt-6">
        Payment cancelled
      </Heading>
      <p className="mx-auto mt-[14px] max-w-[52ch] text-[16px] leading-[1.75] text-ae-muted">
        No charge was made. Your event was still submitted for review as a
        standard listing — you can request Featured again from My Listings.
      </p>
      <div className="mt-[30px] flex flex-wrap justify-center gap-3">
        <Button href={appRoutes.organizer.root}>Back to My Listings</Button>
      </div>
    </div>
  );
}
