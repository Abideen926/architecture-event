"use client";

import { Clock3, MapPin } from "lucide-react";
import Link from "next/link";
import { appRoutes } from "@/lib/routes";
import { useListInteractionHistoryQuery } from "@/features/attendee/attendee-api";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

export function AttendeeHistoryPage() {
  const { data, isLoading, isError, refetch } = useListInteractionHistoryQuery();
  const rows = data?.items ?? [];

  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <div className="border-b border-[#E7E7E7] pb-5">
        <h2 className="ae-serif text-[30px] font-semibold tracking-[-0.015em] text-[#202020]">
          Registration History
        </h2>
        <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
          {isLoading
            ? "Loading..."
            : rows.length === 0
              ? "Nothing here yet"
              : `${rows.length} past events`}
        </p>
      </div>

      {isLoading ? (
        <div className="mt-[26px] grid gap-[10px]">
          {[0, 1, 2].map((key) => (
            <div key={key} className="h-[70px] animate-pulse rounded-[14px] border border-[#E7E7E7] bg-[#F5F5F5]" />
          ))}
        </div>
      ) : isError ? (
        <div className="mt-[26px] rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] px-10 py-[76px] text-center">
          <p className="text-[16px] text-[#6A6A6A]">Couldn&apos;t load your history.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-[12px] border border-[#202020] bg-white px-6 py-[12px] text-[14.5px] font-semibold text-[#202020] transition-colors hover:bg-[#F1F1F1]"
          >
            Try again
          </button>
        </div>
      ) : rows.length > 0 ? (
        <div className="mt-[26px] overflow-hidden rounded-[20px] border border-[#E7E7E7]">
          <div className="hidden bg-[#FAFAFA] px-[26px] py-[15px] lg:grid lg:grid-cols-[2.4fr_1fr_1.2fr_auto] lg:gap-6">
            {["EVENT", "DATE", "LOCATION", "STATUS"].map((label) => (
              <span key={label} className="text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
                {label}
              </span>
            ))}
          </div>

          <div className="divide-y divide-[#F1F1F1]">
            {rows.map((row) => {
              const accessed = row.isRegistered;
              const thumbnail = row.event.media?.find((m) => m.isThumbnail)?.url;

              return (
                <Link
                  key={row.id}
                  href={appRoutes.architectureEvents.eventDetail(row.event.id)}
                  className="grid gap-4 px-5 py-4 transition-colors hover:bg-[#FAFAFA] lg:grid-cols-[2.4fr_1fr_1.2fr_auto] lg:items-center lg:gap-6 lg:px-[26px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-[52px] w-[52px] flex-none overflow-hidden rounded-[10px] bg-[#F1EEE8]">
                      {thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={thumbnail} alt="" className="h-full w-full object-cover" />
                      ) : null}
                    </div>
                    <div>
                      <p className="mb-[3px] text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
                        {row.event.category?.name.toUpperCase() ?? "EVENT"}
                      </p>
                      <h3 className="text-[16.5px] font-bold leading-[1.28] tracking-[-0.01em] text-[#202020]">
                        {row.event.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[14.5px] text-[#3A3A3A]">
                    {dateFormatter.format(new Date(row.event.startAt))}
                  </span>
                  <span className="flex items-center gap-[7px] text-[14.5px] text-[#6A6A6A]">
                    <MapPin className="h-[14px] w-[14px]" strokeWidth={1.7} />
                    {row.event.isOnline ? "Online" : row.event.city ?? "—"}
                  </span>
                  <span
                    className={`justify-self-start whitespace-nowrap rounded-full border px-[15px] py-[7px] text-[12.5px] font-semibold ${
                      accessed
                        ? "border-[#202020] bg-[#1E1E1E] text-white"
                        : "border-[#E7E7E7] bg-white text-[#3A3A3A]"
                    }`}
                  >
                    {accessed ? "Accessed" : "Saved only"}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-[26px] rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] px-10 py-[76px] text-center">
          <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#E7E7E7] bg-[#F1EEE8] text-[var(--ae-accent)]">
            <Clock3 className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <h3 className="ae-serif mt-[22px] text-[27px] font-semibold tracking-[-0.015em] text-[#202020]">
            No past events yet
          </h3>
          <p className="mx-auto mt-[13px] max-w-[46ch] text-[16px] leading-[1.75] text-[#6A6A6A]">
            Once an event you registered for or saved has taken place, it moves here so
            you can look back on it.
          </p>
          <Link
            href={appRoutes.architectureEvents.events}
            className="mt-7 inline-block rounded-[12px] bg-[#1E1E1E] px-7 py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-black"
          >
            Browse Events
          </Link>
        </div>
      )}
    </div>
  );
}
