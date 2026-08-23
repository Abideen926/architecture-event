"use client";

import { Bookmark, MapPin } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { appRoutes } from "@/lib/routes";
import {
  useListSavedEventsQuery,
  useUnsaveEventMutation,
} from "@/features/attendee/attendee-api";
import { getApiErrorMessage } from "@/lib/store/api-error";
import { FeaturedBadge } from "@/components/ui/featured-badge";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });

export function AttendeeSavedPage() {
  const { data, isLoading, isError, refetch } = useListSavedEventsQuery();
  const [unsaveEvent] = useUnsaveEventMutation();

  const savedEvents = data?.items ?? [];

  async function handleRemove(eventId: string) {
    try {
      await unsaveEvent(eventId).unwrap();
      toast.success("Removed from saved events");
    } catch (error) {
      toast.error("Couldn't remove event", {
        description: getApiErrorMessage(error),
      });
    }
  }

  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#E7E7E7] pb-5">
        <div>
          <Heading level="page">Saved Events</Heading>
          <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
            {isLoading
              ? "Loading..."
              : savedEvents.length === 0
                ? "No events saved"
                : savedEvents.length === 1
                  ? "1 event saved"
                  : `${savedEvents.length} events saved`}
          </p>
        </div>
        <Button
          href={appRoutes.architectureEvents.events}
          variant="ghost"
          size="text"
          className="!text-[var(--ae-accent)] text-[14.5px] font-semibold"
        >
          Browse all events →
        </Button>
      </div>

      {isLoading ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((key) => (
            <div
              key={key}
              className="h-[280px] animate-pulse rounded-[18px] border border-[#E7E7E7] bg-[#F5F5F5]"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="mt-[26px] rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] px-10 py-[76px] text-center">
          <p className="text-[16px] text-[#6A6A6A]">
            Couldn&apos;t load your saved events.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-[12px] border border-foreground bg-white px-6 py-[12px] text-[14.5px] font-semibold text-foreground transition-colors hover:bg-[#F1F1F1]"
          >
            Try again
          </button>
        </div>
      ) : savedEvents.length > 0 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {savedEvents.map(({ event }) => {
            const startAt = new Date(event.startAt);
            const thumbnail = event.media?.find((m) => m.isThumbnail)?.url;

            return (
              <article
                key={event.id}
                className="group relative overflow-hidden rounded-[18px] border border-[#E7E7E7] bg-white transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(20,20,20,0.24)]"
              >
                <Link
                  href={appRoutes.architectureEvents.eventDetail(event.id)}
                  className="absolute inset-0 z-10"
                  aria-label={`Open ${event.title}`}
                />

                <div className="relative h-[168px] overflow-hidden bg-[#F1EEE8]">
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt={event.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}
                  <div className="absolute left-4 top-4 rounded-[14px] bg-[#232323] px-[13px] py-[10px] text-white shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
                    <div className="text-[12px] font-bold leading-none tracking-[0.06em]">
                      {monthFormatter.format(startAt).toUpperCase()}
                    </div>
                    <div className="mt-[3px] text-center text-[18px] font-bold leading-[0.9]">
                      {startAt.getDate()}
                    </div>
                    <div className="mt-[6px] text-[12px] font-medium leading-none text-white/86">
                      {startAt.getFullYear()}
                    </div>
                  </div>
                  {event.isFeatured ? (
                    <FeaturedBadge className="absolute right-4 top-4 z-20" />
                  ) : null}
                  <span
                    className={`absolute right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--ae-accent)] shadow-[0_8px_18px_rgba(0,0,0,0.1)] ${
                      event.isFeatured ? "top-[54px]" : "top-4"
                    }`}
                  >
                    <Bookmark
                      className="h-[16px] w-[16px] fill-current"
                      strokeWidth={1.6}
                    />
                  </span>
                </div>

                <div className="relative z-20 px-[18px] pb-[16px] pt-[15px]">
                  <p className="text-[11px] font-bold tracking-[0.16em] text-[#7A7A7A]">
                    {event.category?.name.toUpperCase() ?? "EVENT"}
                  </p>
                  <h3 className="mt-[8px] min-h-[74px] text-[18px] font-bold leading-[1.18] tracking-[-0.02em] text-[#2B2B2B] group-hover:text-[var(--ae-accent)]">
                    {event.title}
                  </h3>
                  <div className="mt-[1px] flex items-center justify-between gap-4 border-t border-[#ECECEC] pt-[12px] text-[14.5px] text-[#6A6A6A]">
                    <span className="flex items-center gap-[7px]">
                      <MapPin className="h-[14px] w-[14px]" strokeWidth={1.7} />
                      {event.isOnline ? "Online" : (event.city ?? "—")}
                    </span>
                    <Button
                      variant="muted"
                      size="text"
                      className="relative z-30 font-medium"
                      onClick={(clickEvent) => {
                        clickEvent.preventDefault();
                        handleRemove(event.id);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-[26px] rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] px-10 py-[76px] text-center">
          <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#E7E7E7] bg-[#F1EEE8] text-[var(--ae-accent)]">
            <Bookmark className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <Heading level="section" as="h3" className="mt-[22px]">
            Nothing saved yet
          </Heading>
          <p className="mx-auto mt-[13px] max-w-[46ch] text-[16px] leading-[1.75] text-[#6A6A6A]">
            Tap the bookmark on any event and it will wait for you here with a
            reminder before registration closes.
          </p>
          <Button href={appRoutes.architectureEvents.events} className="mt-7">
            Browse Events
          </Button>
        </div>
      )}
    </div>
  );
}
