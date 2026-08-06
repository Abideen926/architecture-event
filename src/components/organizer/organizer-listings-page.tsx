import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { organizerListings } from "@/lib/organizer/organizer-data";
import { appRoutes } from "@/lib/routes";

const statusStyles = {
  Published: "border-[#202020] bg-[#1E1E1E] text-white",
  "Under Review": "border-[#E7E7E7] bg-[#F1EEE8] text-[#3A3A3A]",
  Submitted: "border-[#E7E7E7] bg-[#F1EEE8] text-[#3A3A3A]",
  "Changes Requested": "border-[#B08A45] bg-white text-[#B08A45]",
  Rejected: "border-[#C9C9C9] bg-white text-[#6A6A6A]",
  Draft: "border-[#E7E7E7] bg-[#F1F1F1] text-[#6A6A6A]",
} as const;

export function OrganizerListingsPage() {
  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#E7E7E7] pb-5">
        <div>
          <h2 className="ae-serif text-[30px] font-semibold tracking-[-0.015em] text-[#202020]">
            My Listings
          </h2>
          <p className="mt-2 text-[14.5px] text-[#6A6A6A]">6 listings / 1 published</p>
        </div>
        <Link
          href={appRoutes.organizer.submit}
          className="rounded-[12px] bg-[#232323] px-[26px] py-[15px] text-[15px] font-semibold !text-white transition-colors hover:bg-black"
        >
          Submit New Event
        </Link>
      </div>

      <div className="mt-[18px] grid gap-[10px]">
        {organizerListings.map((listing) => (
          <Link
            key={`${listing.title}-${listing.status}`}
            href={`${appRoutes.organizer.submit}?step=form`}
            className="rounded-[16px] border border-[#E7E7E7] bg-white px-[18px] py-[15px] transition-colors hover:bg-[#FAFAFA]"
          >
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_170px_140px] md:items-center md:gap-[18px]">
              <div>
                <p className="text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
                  {listing.category}
                </p>
                <h3 className="mt-[3px] text-[18px] font-bold leading-[1.22] tracking-[-0.015em] text-[#202020]">
                  {listing.title}
                </h3>
                <p className="mt-[3px] text-[14px] leading-[1.65] text-[#7A7A7A]">
                  {listing.meta}
                </p>
              </div>

              <div className="md:justify-self-center">
                <span
                  className={`inline-flex rounded-full border px-[15px] py-[7px] text-[12.5px] font-semibold ${
                    statusStyles[listing.status]
                  }`}
                >
                  {listing.status}
                </span>
              </div>

              <div className="flex items-center justify-start gap-6 md:justify-end">
                {listing.status === "Published" ? (
                  <span className="text-[14px] font-medium text-[var(--ae-accent)]">
                    View live page
                  </span>
                ) : null}
                <span className="text-[14px] font-medium text-[#5F5F5F]">Edit</span>
              </div>
            </div>

            {"note" in listing && listing.note ? (
              <div className="mt-4 flex items-start gap-[10px] rounded-[12px] border border-[#E7E7E7] bg-[#F3EFE8] px-[14px] py-[12px] text-[14px] leading-[1.7] text-[#5F5F5F]">
                <CircleAlert
                  className="mt-[2px] h-[14px] w-[14px] flex-none text-[var(--ae-accent)]"
                  strokeWidth={1.8}
                />
                <span>{listing.note}</span>
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
