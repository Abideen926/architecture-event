import type { Metadata } from "next";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { appRoutes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Payment Cancelled | Architecture Events",
};

export default function FeaturePaymentCancelledPage() {
  return (
    <div className="mt-[30px] rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] px-[44px] py-[66px] text-center animate-[fadeIn_0.35s_ease]">
      <span className="inline-flex h-[56px] w-[56px] items-center justify-center rounded-full border border-[#E7E7E7] bg-white text-[var(--ae-accent)]">
        <CircleAlert className="h-[22px] w-[22px]" strokeWidth={1.8} />
      </span>
      <h1 className="ae-serif mt-6 text-[29px] font-semibold tracking-[-0.015em] text-[#202020]">
        Payment cancelled
      </h1>
      <p className="mx-auto mt-[14px] max-w-[52ch] text-[16px] leading-[1.75] text-[#6A6A6A]">
        No charge was made. Your event was still submitted for review as a
        standard listing — you can request Featured again from My Listings.
      </p>
      <div className="mt-[30px] flex flex-wrap justify-center gap-3">
        <Link
          href={appRoutes.organizer.root}
          className="rounded-[12px] bg-[#1E1E1E] px-[28px] py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-black"
        >
          Back to My Listings
        </Link>
      </div>
    </div>
  );
}
