"use client";

import { appRoutes } from "@/lib/routes";
import { useGetAdminOverviewStatsQuery } from "@/features/admin/admin-stats-api";
import { EVENT_STATUS_LABELS } from "@/features/events/event-types";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

type AttentionItem = {
  title: string;
  meta: string;
  actionLabel: string;
  href: string;
  tone: "accent" | "muted";
};

export function AdminOverviewPage() {
  const {
    data: stats,
    isLoading,
    isError,
    refetch,
  } = useGetAdminOverviewStatsQuery();

  const attentionItems: AttentionItem[] = [];
  if (stats) {
    const { eventsAwaitingReview, changesRequested, pendingFeatureRequests } =
      stats.attention;

    if (eventsAwaitingReview.count > 0) {
      attentionItems.push({
        title: `${eventsAwaitingReview.count} event${eventsAwaitingReview.count === 1 ? "" : "s"} awaiting review`,
        meta: eventsAwaitingReview.oldest
          ? `Oldest: "${eventsAwaitingReview.oldest.title}", submitted ${dateFormatter.format(new Date(eventsAwaitingReview.oldest.submittedAt))}`
          : "",
        actionLabel: "Review queue",
        href: appRoutes.admin.events,
        tone: "accent",
      });
    }

    if (changesRequested.count > 0) {
      attentionItems.push({
        title: `${changesRequested.count} listing${changesRequested.count === 1 ? "" : "s"} in changes requested`,
        meta: "Awaiting organizer follow-up",
        actionLabel: "View listings",
        href: appRoutes.admin.events,
        tone: "muted",
      });
    }

    if (pendingFeatureRequests.count > 0) {
      attentionItems.push({
        title: `${pendingFeatureRequests.count} Featured Listing request${pendingFeatureRequests.count === 1 ? "" : "s"} pending review`,
        meta: "Awaiting admin decision",
        actionLabel: "Open Payments",
        href: appRoutes.admin.payments,
        tone: "accent",
      });
    }
  }

  return (
    <div className="animate-[fadeIn_.35s_ease_both] space-y-0">
      <section className="border-b border-ae-border pb-5">
        <Heading level="page">Overview</Heading>
        <p className="mt-2 text-[14.5px] text-ae-muted">
          A live snapshot of events, accounts, and Featured Listing requests.
        </p>
      </section>

      {isLoading ? (
        <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((key) => (
            <div
              key={key}
              className="h-[190px] animate-pulse rounded-[20px] border border-ae-border bg-[#F5F5F5]"
            />
          ))}
        </section>
      ) : isError || !stats ? (
        <section className="mt-6 rounded-[20px] border border-ae-border bg-mainbackground px-10 py-16 text-center">
          <p className="text-[15px] text-ae-muted">
            Couldn&apos;t load overview stats.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => refetch()}
          >
            Try again
          </Button>
        </section>
      ) : (
        <>
          <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-[20px] border border-ae-border bg-white px-[26px] py-[26px]">
              <p className="text-[10.5px] font-bold tracking-[0.13em] text-ae-muted">
                TOTAL EVENTS
              </p>
              <p className="mt-4 ae-serif text-[40px] leading-none tracking-[-0.03em] text-foreground">
                {stats.events.total}
              </p>
              <div className="mt-4 border-t border-ae-border pt-4">
                <div className="space-y-2.5">
                  {(
                    ["UNDER_REVIEW", "CHANGES_REQUESTED", "PUBLISHED"] as const
                  ).map((status) => (
                    <div
                      key={status}
                      className="flex items-center justify-between gap-3 text-[13.5px] text-ae-muted"
                    >
                      <span>{EVENT_STATUS_LABELS[status]}</span>
                      <span className="font-semibold text-foreground">
                        {stats.events.byStatus[status]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="rounded-[20px] border border-ae-border bg-white px-[26px] py-[26px]">
              <p className="text-[10.5px] font-bold tracking-[0.13em] text-ae-muted">
                ORGANIZERS
              </p>
              <p className="mt-4 ae-serif text-[40px] leading-none tracking-[-0.03em] text-foreground">
                {stats.organizers.total}
              </p>
              <div className="mt-4 border-t border-ae-border pt-4">
                <p className="text-[13.5px] text-ae-muted">
                  Registered organizer accounts
                </p>
              </div>
            </article>

            <article className="rounded-[20px] border border-ae-border bg-white px-[26px] py-[26px]">
              <p className="text-[10.5px] font-bold tracking-[0.13em] text-ae-muted">
                ATTENDEES
              </p>
              <p className="mt-4 ae-serif text-[40px] leading-none tracking-[-0.03em] text-foreground">
                {stats.attendees.total}
              </p>
              <div className="mt-4 border-t border-ae-border pt-4">
                <p className="text-[13.5px] text-ae-muted">
                  Registered attendee accounts
                </p>
              </div>
            </article>

            <article className="rounded-[20px] border border-ae-border bg-white px-[26px] py-[26px]">
              <p className="text-[10.5px] font-bold tracking-[0.13em] text-ae-muted">
                FEATURED LISTING REQUESTS
              </p>
              <p className="mt-4 ae-serif text-[40px] leading-none tracking-[-0.03em] text-ae-accent">
                {stats.featureRequests.pendingReview}
              </p>
              <div className="mt-4 border-t border-ae-border pt-4">
                <p className="text-[13.5px] text-ae-muted">
                  Awaiting admin review
                </p>
              </div>
            </article>
          </section>

          <section className="mt-7 overflow-hidden rounded-[20px] border border-ae-border bg-white">
            <div className="flex items-center justify-between gap-4 border-b border-ae-border px-[26px] py-5">
              <Heading level="card" as="h2">
                Needs your attention
              </Heading>
              <p className="text-[13.5px] text-ae-muted">
                {attentionItems.length} items
              </p>
            </div>

            {attentionItems.length > 0 ? (
              <div>
                {attentionItems.map((item, index) => (
                  <article
                    key={item.title}
                    className={`flex items-center gap-4 px-[26px] py-5 ${
                      index < attentionItems.length - 1
                        ? "border-b border-[#F1F1F1]"
                        : ""
                    }`}
                  >
                    <span
                      className={`mt-1 h-2 w-2 flex-none rounded-full ${
                        item.tone === "accent" ? "bg-ae-accent" : "bg-ae-muted"
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[15.5px] font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-[13.5px] leading-[1.6] text-ae-muted">
                        {item.meta}
                      </p>
                    </div>
                    <Button
                      href={item.href}
                      variant="ghost"
                      size="text"
                      className="text-[13.5px] font-semibold whitespace-nowrap !text-ae-accent"
                    >
                      {item.actionLabel} →
                    </Button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="px-[26px] py-10 text-center text-[14.5px] text-ae-muted">
                Nothing needs your attention right now.
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
