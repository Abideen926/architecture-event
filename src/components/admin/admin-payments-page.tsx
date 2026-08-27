"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  useApproveFeatureRequestMutation,
  useListAdminFeatureRequestsQuery,
  useRejectFeatureRequestMutation,
  useRetryFeatureRequestRefundMutation,
} from "@/features/admin/admin-feature-requests-api";
import { useListAdminSpotlightsQuery } from "@/features/admin/admin-advertising-api";
import { useListAdminLedgerQuery } from "@/features/admin/admin-payments-api";
import type { FeatureRequestStatus } from "@/features/organizer/organizer-api";
import { getApiErrorMessage } from "@/lib/store/api-error";
import { useConfirm } from "@/components/ui/modal-provider";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { appRoutes } from "@/lib/routes";

const LEDGER_PAGE_SIZE = 10;

const statusLabels: Record<FeatureRequestStatus, string> = {
  PENDING_PAYMENT: "Pending Payment",
  PENDING_REVIEW: "Pending Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  PAYMENT_FAILED: "Payment Failed",
  CANCELLED: "Cancelled",
};

const RECENT_COUNT = 5;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const ledgerDateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});
const centsToUsd = (cents: number) => `$${(cents / 100).toFixed(2)}`;
const signedCentsToUsd = (cents: number) =>
  `${cents < 0 ? "-" : "+"}$${(Math.abs(cents) / 100).toFixed(2)}`;

export function AdminPaymentsPage() {
  const { data: spotlightsData } = useListAdminSpotlightsQuery();
  const spotlights = (spotlightsData ?? []).slice(0, 3);

  // Stripe's balance-transaction API is cursor-paginated, not page-numbered —
  // each entry is the "startingAfter" cursor used to reach that page, so
  // "Previous" just pops back to the prior cursor instead of re-deriving it.
  const [ledgerCursorStack, setLedgerCursorStack] = useState<string[]>([]);
  const ledgerCursor = ledgerCursorStack[ledgerCursorStack.length - 1];
  const {
    data: ledgerData,
    isLoading: isLedgerLoading,
    isError: isLedgerError,
    refetch: refetchLedger,
  } = useListAdminLedgerQuery({
    limit: LEDGER_PAGE_SIZE,
    startingAfter: ledgerCursor,
  });
  const ledgerEntries = ledgerData?.transactions ?? [];

  function handleLedgerNext() {
    const lastEntry = ledgerEntries[ledgerEntries.length - 1];
    if (!lastEntry) return;
    setLedgerCursorStack((prev) => [...prev, lastEntry.id]);
  }

  function handleLedgerPrevious() {
    setLedgerCursorStack((prev) => prev.slice(0, -1));
  }

  // Defaults to PENDING_REVIEW server-side when no status filter is passed
  // (see featureRequest.service.js#listForAdmin) — this summary only ever
  // needs to surface what's actionable. Full history/search/filters live
  // on the dedicated Featured Requests page.
  const { data, isLoading, isError, refetch } =
    useListAdminFeatureRequestsQuery({
      page: 1,
      limit: RECENT_COUNT,
    });

  const [approve, { isLoading: isApproving }] =
    useApproveFeatureRequestMutation();
  const [reject] = useRejectFeatureRequestMutation();
  const [retryRefund] = useRetryFeatureRequestRefundMutation();
  const confirm = useConfirm();

  const [rejectModalId, setRejectModalId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const requests = data?.items ?? [];

  async function handleApprove(id: string) {
    const confirmed = await confirm({
      title: "Approve this Featured Listing?",
      description: "The event will be marked featured immediately.",
      confirmLabel: "Approve",
    });
    if (!confirmed) return;

    try {
      await approve(id).unwrap();
      toast.success("Feature request approved");
    } catch (error) {
      toast.error("Couldn't approve request", {
        description: getApiErrorMessage(error),
      });
    }
  }

  async function handleReject() {
    if (!rejectModalId || rejectReason.trim().length < 5) {
      toast.error("Please add at least 5 characters explaining the rejection.");
      return;
    }
    try {
      await reject({ id: rejectModalId, reason: rejectReason.trim() }).unwrap();
      toast.success("Feature request rejected and refund initiated");
      setRejectModalId(null);
      setRejectReason("");
    } catch (error) {
      toast.error("Couldn't reject request", {
        description: getApiErrorMessage(error),
      });
    }
  }

  async function handleRetryRefund(id: string) {
    try {
      await retryRefund(id).unwrap();
      toast.success("Refund retried");
    } catch (error) {
      toast.error("Refund retry failed", {
        description: getApiErrorMessage(error),
      });
    }
  }

  return (
    <div className="animate-[fadeIn_.35s_ease_both] space-y-5">
      <div className="border-b border-ae-border pb-5">
        <Heading level="page">Payments</Heading>
        <p className="mt-2 text-[14.5px] text-ae-muted">
          Featured Listing requests, sponsorship placements, and the internal
          ledger.
        </p>
      </div>

      <section className="rounded-[20px] border border-ae-border bg-white px-[26px] py-[26px]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Heading level="card" as="h3">
              Brand Spotlight rotation
            </Heading>
            <p className="mt-3 text-[14px] leading-[1.75] text-ae-muted">
              Three companies appear on the homepage at a time.
            </p>
          </div>
          <Button
            href={appRoutes.admin.advertising}
            variant="ghost"
            size="text"
            className="whitespace-nowrap text-[13.5px] font-semibold"
          >
            Manage →
          </Button>
        </div>

        {spotlights.length === 0 ? (
          <p className="mt-5 text-[14px] text-ae-muted">
            No active spotlights yet.
          </p>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {spotlights.map((spotlight) => (
              <article
                key={spotlight.id}
                className="flex items-center gap-3 rounded-[16px] border border-ae-border px-5 py-5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={spotlight.thumbnailImageUrl}
                  alt=""
                  className="h-[40px] w-[40px] flex-none rounded-[10px] object-cover"
                />
                <h4 className="text-[15px] font-semibold text-foreground">
                  {spotlight.name}
                </h4>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="overflow-hidden rounded-[20px] border border-ae-border bg-white">
        <div className="flex flex-wrap items-start justify-between gap-4 px-[26px] py-5">
          <div>
            <Heading level="card" as="h3">
              Featured Listing requests
            </Heading>
            <p className="mt-3 text-[14px] leading-[1.75] text-ae-muted">
              Organizers pay $49 upfront; approving here marks their event as
              featured. Showing the {RECENT_COUNT} most recent pending review.
            </p>
          </div>
          <Button
            href={appRoutes.admin.featuredRequests}
            variant="ghost"
            size="text"
            className="whitespace-nowrap text-[13.5px] font-semibold"
          >
            View all →
          </Button>
        </div>

        {isLoading ? (
          <div className="h-[140px] animate-pulse bg-[#F5F5F5]" />
        ) : isError ? (
          <div className="px-[26px] py-10 text-center">
            <p className="text-[14.5px] text-ae-muted">
              Couldn&apos;t load feature requests.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-3"
              onClick={() => refetch()}
            >
              Try again
            </Button>
          </div>
        ) : requests.length === 0 ? (
          <div className="px-[26px] py-10 text-center text-[14.5px] text-ae-muted">
            No pending Featured Listing requests.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[1fr_0.9fr_1fr_1.3fr_auto] gap-[22px] border-y border-ae-border bg-mainbackground px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-ae-muted">
              <span>DATE</span>
              <span>AMOUNT</span>
              <span>STATUS</span>
              <span>HEADLINE</span>
              <span className="text-right">ACTIONS</span>
            </div>
            {requests.map((request, index) => (
              <div
                key={request.id}
                className={`grid grid-cols-[1fr_0.9fr_1fr_1.3fr_auto] items-center gap-[22px] px-[26px] py-[18px] ${
                  index < requests.length - 1 ? "border-b border-[#F1F1F1]" : ""
                }`}
              >
                <div className="text-[14px] text-ae-muted">
                  {dateFormatter.format(new Date(request.createdAt))}
                </div>
                <div className="text-[15px] font-semibold text-foreground">
                  {centsToUsd(request.amountCents)}
                </div>
                <div className="text-[13.5px] text-[#3A3A3A]">
                  {statusLabels[request.status]}
                </div>
                <div className="truncate text-[14px] text-[#3A3A3A]">
                  {request.headline ?? "—"}
                </div>
                <div className="flex justify-end gap-3 text-[13px]">
                  {request.status === "PENDING_REVIEW" ? (
                    <>
                      <Button
                        variant="ghost"
                        size="text"
                        className="font-semibold"
                        onClick={() => handleApprove(request.id)}
                        disabled={isApproving}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="muted"
                        size="text"
                        onClick={() => setRejectModalId(request.id)}
                      >
                        Reject
                      </Button>
                    </>
                  ) : null}
                  {request.refundStatus === "FAILED" ? (
                    <Button
                      variant="muted"
                      size="text"
                      onClick={() => handleRetryRefund(request.id)}
                    >
                      Retry refund
                    </Button>
                  ) : null}
                </div>
              </div>
            ))}
          </>
        )}
      </section>

      <section className="overflow-hidden rounded-[20px] border border-ae-border bg-white">
        <div className="flex items-start justify-between gap-4 px-[26px] py-5">
          <div>
            <Heading level="card" as="h3">
              Internal ledger
            </Heading>
            <p className="mt-3 text-[14px] leading-[1.75] text-ae-muted">
              Transactions recorded on the connected Stripe account.
            </p>
          </div>
        </div>

        {isLedgerLoading ? (
          <div className="h-[140px] animate-pulse bg-[#F5F5F5]" />
        ) : isLedgerError ? (
          <div className="px-[26px] py-10 text-center">
            <p className="text-[14.5px] text-ae-muted">
              Couldn&apos;t load the ledger from Stripe.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-3"
              onClick={() => refetchLedger()}
            >
              Try again
            </Button>
          </div>
        ) : ledgerEntries.length === 0 ? (
          <div className="px-[26px] py-10 text-center text-[14.5px] text-ae-muted">
            No ledger transactions yet.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[1.3fr_2fr_0.8fr_0.8fr_1.1fr] gap-[22px] border-y border-ae-border bg-mainbackground px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-ae-muted">
              <span>DATE &amp; TIME</span>
              <span>DESCRIPTION</span>
              <span>AMOUNT</span>
              <span>FEE</span>
              <span>REFERENCE</span>
            </div>
            {ledgerEntries.map((entry, index) => (
              <div
                key={entry.id}
                className={`grid grid-cols-[1.3fr_2fr_0.8fr_0.8fr_1.1fr] gap-[22px] px-[26px] py-[18px] ${
                  index < ledgerEntries.length - 1
                    ? "border-b border-[#F1F1F1]"
                    : ""
                }`}
              >
                <div className="text-[14px] text-ae-muted">
                  {ledgerDateTimeFormatter.format(new Date(entry.createdAt))}
                </div>
                <div className="truncate text-[14px] capitalize text-[#3A3A3A]">
                  {entry.description}
                </div>
                <div
                  className={`text-[15px] font-semibold ${
                    entry.amountCents < 0 ? "text-[#B3261E]" : "text-foreground"
                  }`}
                >
                  {signedCentsToUsd(entry.amountCents)}
                </div>
                <div className="text-[14px] text-ae-muted">
                  {centsToUsd(entry.feeCents)}
                </div>
                <div className="truncate text-[13px] text-ae-muted">
                  {entry.id}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-end gap-2.5 border-t border-ae-border px-[26px] py-4">
              <Button
                variant="outline"
                size="sm"
                disabled={ledgerCursorStack.length === 0}
                onClick={handleLedgerPrevious}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!ledgerData?.hasMore}
                onClick={handleLedgerNext}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </section>

      <Modal
        open={rejectModalId !== null}
        onClose={() => {
          setRejectModalId(null);
          setRejectReason("");
        }}
        title="Reject Featured Listing request"
        description="A refund will be initiated automatically. Explain why for the organizer's records."
        footer={
          <>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setRejectModalId(null);
                setRejectReason("");
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" size="md" onClick={handleReject}>
              Reject & refund
            </Button>
          </>
        }
      >
        <Textarea
          rows={4}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Explain the rejection..."
        />
      </Modal>
    </div>
  );
}
