"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { appRoutes } from "@/lib/routes";
import { useListPublicEventsQuery } from "@/features/public/public-api";
import { FeaturedBadge } from "@/components/ui/featured-badge";

type EventRelatedSectionProps = {
  currentEventId: string;
  categoryId: string;
};

export function EventRelatedSection({
  currentEventId,
  categoryId,
}: EventRelatedSectionProps) {
  const { data } = useListPublicEventsQuery({
    categoryId,
    limit: 4,
    sort: "soonest",
  });
  const related = (data?.items ?? [])
    .filter((event) => event.id !== currentEventId)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="border-y border-[#E7E7E7] bg-[#FAFAFA] py-10 md:py-23 mt-15">
      <div className="ae-container">
        <div className="flex items-end justify-between gap-6">
          <h2 className="ae-serif text-[32px] leading-[1.04] tracking-[-0.045em] text-foreground md:text-[33px] font-semibold mb-4">
            Related events
          </h2>
          <Link
            href={appRoutes.architectureEvents.events}
            className="hidden items-center gap-2 text-[14px] font-semibold !text-[var(--ae-accent)] transition-colors !hover:text-[var(--ae-accent-strong)] md:inline-flex"
          >
            View all events
            <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {related.map((event) => {
            const thumbnail = event.media?.find((m) => m.isThumbnail)?.url;

            return (
              <Link
                key={event.id}
                href={appRoutes.architectureEvents.eventDetail(event.id)}
                className="group overflow-hidden rounded-[18px] border border-[#E7E1D6] bg-white shadow-[0_10px_24px_-22px_rgba(32,32,32,0.18)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative h-[176px] overflow-hidden bg-[#D8D0C2]">
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}
                  {event.isFeatured ? (
                    <FeaturedBadge className="absolute right-3 top-3 z-20" />
                  ) : null}
                </div>
                <div className="px-5 pb-5 pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7F7F7F]">
                    {event.category?.name ?? "EVENT"}
                  </p>
                  <h3 className="mt-2 text-[18px] font-semibold tracking-[-0.02em] text-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.55] text-[#7A7A7A]">
                    {new Date(event.startAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    <span aria-hidden="true">{String.fromCharCode(183)}</span>{" "}
                    {event.isOnline ? "Online" : (event.city ?? "—")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
