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
  const hasListings = organizerListings.length > 0;

  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#E7E7E7] pb-5">
        <div>
          <h2 className="ae-serif text-[30px] font-semibold tracking-[-0.015em] text-[#202020]">
            My Listings
          </h2>
          <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
            {organizerListings.length} listings /{" "}
            {organizerListings.filter((listing) => listing.status === "Published").length} published
          </p>
        </div>

        <Link
          href={appRoutes.organizer.submit}
          className="rounded-[12px] bg-[#1E1E1E] px-[28px] py-[15px] text-[15px] font-semibold !text-white transition-colors hover:bg-black"
        >
          Submit New Event
        </Link>
      </div>

      {hasListings ? (
        <div className="mt-5 grid gap-[10px]">
          {organizerListings.map((listing) => (
            <Link
              key={`${listing.title}-${listing.status}`}
              href={`${appRoutes.organizer.submit}?step=form`}
              className="block rounded-[16px] border border-[#E7E7E7] bg-white p-[17px] px-[22px] transition-shadow duration-200 hover:border-[#D9D9D9] hover:shadow-[0_18px_40px_-30px_rgba(20,20,20,0.4)]"
            >
              <div className="grid gap-4 md:grid-cols-[2.6fr_1fr_auto] md:items-center md:gap-[22px]">
                <div>
                  <p className="mb-[3px] text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
                    {listing.category}
                  </p>
                  <h3 className="text-[18px] font-bold leading-[1.22] tracking-[-0.01em] text-[#202020]">
                    {listing.title}
                  </h3>
                  <p className="mt-[4px] text-[13.5px] leading-[1.45] text-[#6A6A6A]">
                    {listing.meta}
                  </p>
                </div>

                <span
                  className={`inline-flex justify-self-start whitespace-nowrap rounded-full border px-[15px] py-[7px] text-[12.5px] font-semibold md:justify-self-center ${
                    statusStyles[listing.status]
                  }`}
                >
                  {listing.status}
                </span>

                <span className="flex items-center gap-[18px] justify-self-start md:justify-self-end">
                  {listing.status === "Published" ? (
                    <span className="text-[13.5px] font-semibold text-[var(--ae-accent)]">
                      View live page →
                    </span>
                  ) : null}
                  <span className="text-[13.5px] font-semibold text-[#6A6A6A]">
                    Edit
                  </span>
                </span>
              </div>

              {"note" in listing && listing.note ? (
                <div className="mt-[14px] flex items-start gap-3 rounded-[12px] border border-[#E7E7E7] bg-[#F1EEE8] px-[16px] py-[12px] text-[14.5px] leading-[1.65] text-[#3A3A3A]">
                  <CircleAlert
                    className="mt-[3px] h-[16px] w-[16px] flex-none text-[var(--ae-accent)]"
                    strokeWidth={1.7}
                  />
                  <span>{listing.note}</span>
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-[26px] rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] px-[40px] py-[76px] text-center">
          <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#E7E7E7] bg-[#F1EEE8] text-[var(--ae-accent)]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M12 9v6M9 12h6" />
            </svg>
          </span>
          <h3 className="ae-serif mt-[22px] text-[27px] font-semibold tracking-[-0.015em] text-[#202020]">
            No listings yet
          </h3>
          <p className="mx-auto mt-[13px] max-w-[48ch] text-[16px] leading-[1.75] text-[#6A6A6A]">
            Submit your first event and it will appear here with its review status as it moves through editorial.
          </p>
          <Link
            href={appRoutes.organizer.submit}
            className="mt-[28px] inline-flex rounded-[12px] bg-[#1E1E1E] px-[28px] py-[15px] text-[15px] font-semibold !text-white transition-colors hover:bg-black"
          >
            Submit New Event
          </Link>
        </div>
      )}
    </div>
  );
}
