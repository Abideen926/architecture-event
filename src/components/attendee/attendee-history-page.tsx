"use client";

import { Clock3, MapPin } from "lucide-react";
import Link from "next/link";
import { appRoutes } from "@/lib/routes";
import { useListInteractionHistoryQuery } from "@/features/attendee/attendee-api";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function AttendeeHistoryPage() {
  const { data, isLoading, isError, refetch } =
    useListInteractionHistoryQuery();
  const rows = data?.items ?? [];

  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <div className="border-b border-ae-border pb-5">
        <Heading level="page">Registration History</Heading>
        <p className="mt-2 text-[14.5px] text-ae-muted">
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
            <div
              key={key}
              className="h-[70px] animate-pulse rounded-[14px] border border-ae-border bg-[#F5F5F5]"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="mt-[26px] rounded-[20px] border border-ae-border bg-mainbackground px-10 py-[76px] text-center">
          <p className="text-[16px] text-ae-muted">
            Couldn&apos;t load your history.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-[12px] border border-foreground bg-white px-6 py-[12px] text-[14.5px] font-semibold text-foreground transition-colors hover:bg-[#F1F1F1]"
          >
            Try again
          </button>
        </div>
      ) : rows.length > 0 ? (
        <div className="mt-[26px] overflow-hidden rounded-[20px] border border-ae-border">
          <div className="hidden bg-mainbackground px-[26px] py-[15px] lg:grid lg:grid-cols-[2.4fr_1fr_1.2fr_auto] lg:gap-6">
            {["EVENT", "DATE", "LOCATION", "STATUS"].map((label) => (
              <span
                key={label}
                className="text-[10.5px] font-bold tracking-[0.13em] text-ae-muted"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="divide-y divide-[#F1F1F1]">
            {rows.map((row) => {
              const accessed = row.isRegistered;
              const thumbnail = row.event.media?.find(
                (m) => m.isThumbnail,
              )?.url;

              return (
                <Link
                  key={row.id}
                  href={appRoutes.architectureEvents.eventDetail(row.event.id)}
                  className="grid gap-4 px-5 py-4 transition-colors hover:bg-mainbackground lg:grid-cols-[2.4fr_1fr_1.2fr_auto] lg:items-center lg:gap-6 lg:px-[26px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-[52px] w-[52px] flex-none overflow-hidden rounded-[10px] bg-background">
                      {thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thumbnail}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div>
                      <p className="mb-[3px] text-[10.5px] font-bold tracking-[0.13em] text-ae-muted">
                        {row.event.category?.name.toUpperCase() ?? "EVENT"}
                      </p>
                      <h3 className="text-[16.5px] font-bold leading-[1.28] tracking-[-0.01em] text-foreground">
                        {row.event.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[14.5px] text-[#3A3A3A]">
                    {dateFormatter.format(new Date(row.event.startAt))}
                  </span>
                  <span className="flex items-center gap-[7px] text-[14.5px] text-ae-muted">
                    <MapPin className="h-[14px] w-[14px]" strokeWidth={1.7} />
                    {row.event.isOnline ? "Online" : (row.event.city ?? "—")}
                  </span>
                  <span
                    className={`justify-self-start whitespace-nowrap rounded-full border px-[15px] py-[7px] text-[12.5px] font-semibold ${
                      accessed
                        ? "border-foreground bg-foreground text-white"
                        : "border-ae-border bg-white text-[#3A3A3A]"
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
        <div className="mt-[26px] rounded-[20px] border border-ae-border bg-mainbackground px-10 py-[76px] text-center">
          <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-ae-border bg-background text-ae-accent">
            <Clock3 className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <Heading level="section" as="h3" className="mt-[22px]">
            No past events yet
          </Heading>
          <p className="mx-auto mt-[13px] max-w-[46ch] text-[16px] leading-[1.75] text-ae-muted">
            Once an event you registered for or saved has taken place, it moves
            here so you can look back on it.
          </p>
          <Button href={appRoutes.architectureEvents.events} className="mt-7">
            Browse Events
          </Button>
        </div>
      )}
    </div>
  );
}
