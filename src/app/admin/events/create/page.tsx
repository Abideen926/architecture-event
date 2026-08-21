import type { Metadata } from "next";
import Link from "next/link";
import { appRoutes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Create Event | Admin | Architecture Events",
  description: "Create a new event listing from the admin dashboard.",
};

export default function AdminCreateEventPage() {
  return (
    <div className="rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] px-10 py-16 text-center">
      <h2 className="ae-serif text-[26px] font-semibold tracking-[-0.015em] text-[#202020]">
        Admins don&apos;t create events directly
      </h2>
      <p className="mx-auto mt-3 max-w-[52ch] text-[15px] leading-[1.75] text-[#6A6A6A]">
        The API only supports organizers submitting their own events for review. From here you
        can approve, request changes on, or reject events organizers have already submitted.
      </p>
      <Link
        href={appRoutes.admin.events}
        className="mt-6 inline-flex rounded-[12px] bg-[#1E1E1E] px-6 py-[13px] text-[14.5px] font-semibold text-white transition-colors hover:bg-black"
      >
        Go to Events
      </Link>
    </div>
  );
}
