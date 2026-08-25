"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Video } from "lucide-react";
import { appRoutes } from "@/lib/routes";
import {
  useApproveEventMutation,
  useGetAdminEventQuery,
  useRejectEventMutation,
  useRequestEventChangesMutation,
} from "@/features/admin/admin-events-api";
import {
  useApproveFeatureRequestMutation,
  useListAdminFeatureRequestsQuery,
  useRejectFeatureRequestMutation,
} from "@/features/admin/admin-feature-requests-api";
import type { FeatureRequestStatus } from "@/features/organizer/organizer-api";
import { EVENT_STATUS_LABELS } from "@/features/events/event-types";
import { getApiErrorMessage } from "@/lib/store/api-error";
import { EventLocationMap } from "@/components/maps/event-location-map";
import { useConfirm } from "@/components/ui/modal-provider";
import { Modal } from "@/components/ui/modal";
import { Heading } from "@/components/ui/heading";
import { FeaturedBadge } from "@/components/ui/featured-badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const centsToUsd = (cents: number) => `$${(cents / 100).toFixed(2)}`;

const featureRequestStatusLabels: Record<FeatureRequestStatus, string> = {
  PENDING_PAYMENT: "Pending Payment",
  PENDING_REVIEW: "Pending Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  PAYMENT_FAILED: "Payment Failed",
  CANCELLED: "Cancelled",
};

type AdminEventReviewPageProps = {
  id: string;
};

export function AdminEventReviewPage({ id }: AdminEventReviewPageProps) {
  const {
    data: event,
    isLoading,
    isError,
    refetch,
  } = useGetAdminEventQuery(id);
  const { data: featureRequestData } = useListAdminFeatureRequestsQuery({
    eventId: id,
    limit: 20,
  });

  const [approveEvent, { isLoading: isApproving }] = useApproveEventMutation();
  const [requestChanges, { isLoading: isRequestingChanges }] =
    useRequestEventChangesMutation();
  const [rejectEvent, { isLoading: isRejecting }] = useRejectEventMutation();
  const [approveFeature, { isLoading: isApprovingFeature }] =
    useApproveFeatureRequestMutation();
  const [rejectFeature] = useRejectFeatureRequestMutation();
  const confirm = useConfirm();

  const [noteModal, setNoteModal] = useState<null | "changes" | "reject">(null);
  const [noteValue, setNoteValue] = useState("");
  const [rejectFeatureId, setRejectFeatureId] = useState<string | null>(null);
  const [rejectFeatureReason, setRejectFeatureReason] = useState("");

  const featureRequests = featureRequestData?.items ?? [];
  const pendingFeatureRequest = featureRequests.find(
    (fr) => fr.status === "PENDING_REVIEW",
  );

  async function handleApprove() {
    if (!event) return;
    const confirmed = await confirm({
      title: "Approve and publish this event?",
      description: `"${event.title}" will become publicly visible immediately.`,
      confirmLabel: "Approve",
    });
    if (!confirmed) return;

    try {
      await approveEvent(event.id).unwrap();
      toast.success("Event approved and published");
    } catch (error) {
      toast.error("Couldn't approve event", {
        description: getApiErrorMessage(error),
      });
    }
  }

  async function handleSubmitNote() {
    if (!event) return;
    if (noteValue.trim().length < 5) {
      toast.error("Please add at least 5 characters explaining the decision.");
      return;
    }

    try {
      if (noteModal === "changes") {
        await requestChanges({ id: event.id, note: noteValue.trim() }).unwrap();
        toast.success("Changes requested");
      } else if (noteModal === "reject") {
        await rejectEvent({ id: event.id, reason: noteValue.trim() }).unwrap();
        toast.success("Event rejected");
      }
      setNoteModal(null);
      setNoteValue("");
    } catch (error) {
      toast.error("Couldn't submit decision", {
        description: getApiErrorMessage(error),
      });
    }
  }

  async function handleApproveFeature(featureRequestId: string) {
    const confirmed = await confirm({
      title: "Approve this Featured Listing?",
      description: "The event will be marked featured immediately.",
      confirmLabel: "Approve",
    });
    if (!confirmed) return;

    try {
      await approveFeature(featureRequestId).unwrap();
      toast.success("Feature request approved");
    } catch (error) {
      toast.error("Couldn't approve request", {
        description: getApiErrorMessage(error),
      });
    }
  }

  async function handleRejectFeature() {
    if (!rejectFeatureId || rejectFeatureReason.trim().length < 5) {
      toast.error("Please add at least 5 characters explaining the rejection.");
      return;
    }
    try {
      await rejectFeature({
        id: rejectFeatureId,
        reason: rejectFeatureReason.trim(),
      }).unwrap();
      toast.success("Feature request rejected and refund initiated");
      setRejectFeatureId(null);
      setRejectFeatureReason("");
    } catch (error) {
      toast.error("Couldn't reject request", {
        description: getApiErrorMessage(error),
      });
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-[8px] bg-[#F5F5F5]" />
        <div className="h-[400px] animate-pulse rounded-[20px] border border-ae-border bg-[#F5F5F5]" />
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="rounded-[20px] border border-ae-border bg-mainbackground px-10 py-16 text-center">
        <p className="text-[15px] text-ae-muted">
          Couldn&apos;t load this event.
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="mt-4"
          onClick={() => refetch()}
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_.35s_ease_both] space-y-5">
      <div>
        <Button
          href={appRoutes.admin.events}
          variant="ghost"
          size="text"
          className="mb-2 inline-block text-[13px] font-semibold"
        >
          ← Back to Events
        </Button>
        <div className="flex flex-wrap items-center gap-3">
          <Heading level="page">{event.title}</Heading>
          {event.isFeatured ? <FeaturedBadge /> : null}
        </div>
        <p className="mt-2 text-[14.5px] text-ae-muted">
          {EVENT_STATUS_LABELS[event.status]} ·{" "}
          {event.organizer?.fullName ?? "—"} · {event.category?.name ?? "—"}
          {event.industry ? ` · ${event.industry.name}` : ""}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="space-y-5">
          <section className="rounded-[20px] border border-ae-border bg-white px-[26px] py-[26px]">
            <Heading level="subsection" as="h3">
              Description
            </Heading>
            <p className="mt-3 whitespace-pre-line text-[14.5px] leading-[1.8] text-[#4E4E4E]">
              {event.description}
            </p>
            {event.latestAdminNote ? (
              <div className="mt-4 rounded-[14px] border border-ae-border bg-mainbackground px-4 py-3 text-[14px] leading-[1.7] text-[#3A3A3A]">
                <span className="font-semibold">Latest admin note:</span>{" "}
                {event.latestAdminNote}
              </div>
            ) : null}
          </section>

          <section className="rounded-[20px] border border-ae-border bg-white px-[26px] py-[26px]">
            <Heading level="subsection" as="h3">
              When &amp; where
            </Heading>
            <div className="mt-4 grid gap-3 text-[14px] text-[#3A3A3A] sm:grid-cols-2">
              <Field label="Starts">
                {dateTimeFormatter.format(new Date(event.startAt))}
              </Field>
              {event.endAt ? (
                <Field label="Ends">
                  {dateTimeFormatter.format(new Date(event.endAt))}
                </Field>
              ) : null}
              <Field label="Format">
                {event.isOnline ? "Online" : "In person"}
              </Field>
              {!event.isOnline ? (
                <>
                  <Field label="City">
                    {[event.city, event.state].filter(Boolean).join(", ") ||
                      "—"}
                  </Field>
                  <Field label="Venue">{event.venueName ?? "—"}</Field>
                  <Field label="Address">{event.address ?? "—"}</Field>
                  {event.latitude != null && event.longitude != null ? (
                    <div className="sm:col-span-2">
                      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-ae-muted">
                        Map
                      </span>
                      <div className="h-[220px] w-full overflow-hidden rounded-[14px] border border-ae-border">
                        <EventLocationMap
                          latitude={event.latitude}
                          longitude={event.longitude}
                        />
                      </div>
                    </div>
                  ) : null}
                </>
              ) : null}
              <Field label="Registration URL">
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-ae-accent transition-colors hover:text-ae-accent-strong"
                >
                  {event.registrationUrl}
                </a>
              </Field>
              <Field label="Price">
                {event.isFree
                  ? "Free"
                  : event.priceFromCents
                    ? `From ${centsToUsd(event.priceFromCents)}`
                    : "—"}
              </Field>
            </div>
          </section>

          <section className="rounded-[20px] border border-ae-border bg-white px-[26px] py-[26px]">
            <Heading level="subsection" as="h3">
              Organizer contact
            </Heading>
            <div className="mt-4 grid gap-3 text-[14px] text-[#3A3A3A] sm:grid-cols-2">
              <Field label="Contact name">{event.contactName}</Field>
              <Field label="Contact email">{event.contactEmail}</Field>
              <Field label="Phone">{event.contactPhone ?? "—"}</Field>
              <Field label="Account email">
                {event.organizer?.email ?? "—"}
              </Field>
            </div>
          </section>

          {event.media && event.media.length > 0 ? (
            <section className="rounded-[20px] border border-ae-border bg-white px-[26px] py-[26px]">
              <Heading level="subsection" as="h3">
                Media
              </Heading>
              <div className="mt-4 grid gap-[14px] sm:grid-cols-3">
                {event.media.map((media) => (
                  <div
                    key={media.id}
                    className={`overflow-hidden rounded-[16px] border ${
                      media.isThumbnail
                        ? "border-foreground"
                        : "border-ae-border"
                    }`}
                  >
                    <div className="relative h-[140px] bg-[#F1F1F1]">
                      {media.resourceType === "VIDEO" ? (
                        <div className="flex h-full w-full items-center justify-center text-ae-muted">
                          <Video className="h-7 w-7" strokeWidth={1.5} />
                        </div>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={media.url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    {media.isThumbnail ? (
                      <p className="py-[8px] text-center text-[11px] font-bold tracking-[0.1em] text-white bg-foreground">
                        THUMBNAIL
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-[20px] border border-ae-border bg-white px-[26px] py-[26px]">
            <Heading level="subsection" as="h3">
              Status history
            </Heading>
            {event.statusHistory && event.statusHistory.length > 0 ? (
              <div className="mt-4 space-y-4">
                {[...event.statusHistory]
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime(),
                  )
                  .map((entry) => (
                    <div
                      key={entry.id}
                      className="border-l-2 border-ae-border pl-4"
                    >
                      <p className="text-[13.5px] font-semibold text-foreground">
                        {EVENT_STATUS_LABELS[entry.fromStatus]} →{" "}
                        {EVENT_STATUS_LABELS[entry.toStatus]}
                      </p>
                      <p className="mt-1 text-[12.5px] text-[#8A8A8A]">
                        {dateTimeFormatter.format(new Date(entry.createdAt))}
                      </p>
                      {entry.note ? (
                        <p className="mt-1.5 text-[14px] leading-[1.6] text-[#4E4E4E]">
                          {entry.note}
                        </p>
                      ) : null}
                    </div>
                  ))}
              </div>
            ) : (
              <p className="mt-3 text-[14px] text-ae-muted">
                No status changes recorded yet.
              </p>
            )}
          </section>
        </div>

        <div className="space-y-5">
          <section className="rounded-[20px] border border-ae-border bg-white px-[26px] py-[26px]">
            <Heading level="subsection" as="h3">
              Review decision
            </Heading>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Button size="sm" onClick={handleApprove} disabled={isApproving}>
                Approve
              </Button>
              <button
                type="button"
                onClick={() => setNoteModal("changes")}
                className="rounded-[10px] border border-foreground bg-white px-4 py-1.5 text-[13.5px] font-medium text-foreground"
              >
                Request changes
              </button>
              <button
                type="button"
                onClick={() => setNoteModal("reject")}
                disabled={event.status !== "UNDER_REVIEW"}
                title={
                  event.status !== "UNDER_REVIEW"
                    ? "Only events currently under review can be rejected"
                    : undefined
                }
                className="text-[13.5px] text-[#5F5F5F] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Reject
              </button>
            </div>
          </section>

          <section className="rounded-[20px] border border-ae-border bg-white px-[26px] py-[26px]">
            <Heading level="subsection" as="h3">
              Featured Listing
            </Heading>
            {featureRequests.length === 0 ? (
              <p className="mt-3 text-[14px] text-ae-muted">
                This organizer has never requested Featured for this event.
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                {featureRequests.map((request) => (
                  <div
                    key={request.id}
                    className="rounded-[14px] border border-ae-border px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[13.5px] font-semibold text-foreground">
                        {featureRequestStatusLabels[request.status]}
                      </span>
                      <span className="text-[13px] text-ae-muted">
                        {centsToUsd(request.amountCents)}
                      </span>
                    </div>
                    <p className="mt-1 text-[12.5px] text-[#8A8A8A]">
                      {dateFormatter.format(new Date(request.createdAt))}
                    </p>
                    {request.status === "PENDING_REVIEW" ? (
                      <div className="mt-3 flex gap-3 text-[13px]">
                        <Button
                          variant="ghost"
                          size="text"
                          className="font-semibold"
                          onClick={() => handleApproveFeature(request.id)}
                          disabled={isApprovingFeature}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="muted"
                          size="text"
                          onClick={() => setRejectFeatureId(request.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <Modal
        open={noteModal !== null}
        onClose={() => {
          setNoteModal(null);
          setNoteValue("");
        }}
        title={noteModal === "changes" ? "Request changes" : "Reject event"}
        description={
          noteModal === "changes"
            ? "Tell the organizer what needs to change before this can be approved."
            : "Explain why this event is being rejected. The organizer will see this note."
        }
        footer={
          <>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setNoteModal(null);
                setNoteValue("");
              }}
            >
              Cancel
            </Button>
            <Button
              size="md"
              onClick={handleSubmitNote}
              disabled={isRequestingChanges || isRejecting}
            >
              {noteModal === "changes" ? "Send to organizer" : "Reject event"}
            </Button>
          </>
        }
      >
        <Textarea
          rows={4}
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
          placeholder="Explain the decision..."
        />
      </Modal>

      <Modal
        open={rejectFeatureId !== null}
        onClose={() => {
          setRejectFeatureId(null);
          setRejectFeatureReason("");
        }}
        title="Reject Featured Listing request"
        description="A refund will be initiated automatically. Explain why for the organizer's records."
        footer={
          <>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setRejectFeatureId(null);
                setRejectFeatureReason("");
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" size="md" onClick={handleRejectFeature}>
              Reject & refund
            </Button>
          </>
        }
      >
        <Textarea
          rows={4}
          value={rejectFeatureReason}
          onChange={(e) => setRejectFeatureReason(e.target.value)}
          placeholder="Explain the rejection..."
        />
      </Modal>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10.5px] font-bold tracking-[0.1em] text-ae-muted">
        {label.toUpperCase()}
      </p>
      <p className="mt-1 font-medium text-foreground">{children}</p>
    </div>
  );
}
