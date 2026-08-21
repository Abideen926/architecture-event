"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ledgerEntries as initialLedgerEntries,
  spotlightSlots as initialSpotlightSlots,
} from "@/lib/admin/dashboard-data";
import {
  useApproveFeatureRequestMutation,
  useListAdminFeatureRequestsQuery,
  useRejectFeatureRequestMutation,
  useRetryFeatureRequestRefundMutation,
} from "@/features/admin/admin-feature-requests-api";
import type { FeatureRequestStatus } from "@/features/organizer/organizer-api";
import { getApiErrorMessage } from "@/lib/store/api-error";
import { useConfirm } from "@/components/ui/modal-provider";
import { Modal } from "@/components/ui/modal";
import { appRoutes } from "@/lib/routes";

type SpotlightSlot = { slot: string; company: string; until: string };
type LedgerEntry = { date: string; description: string; amount: string; invoice: string };

const statusLabels: Record<FeatureRequestStatus, string> = {
  PENDING_PAYMENT: "Pending Payment",
  PENDING_REVIEW: "Pending Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  PAYMENT_FAILED: "Payment Failed",
  CANCELLED: "Cancelled",
};

const RECENT_COUNT = 5;

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
const centsToUsd = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export function AdminPaymentsPage() {
  const [spotlightSlots] = useState<SpotlightSlot[]>(initialSpotlightSlots.map((slot) => ({ ...slot })));
  const [ledgerEntries] = useState<LedgerEntry[]>(initialLedgerEntries.map((entry) => ({ ...entry })));

  // Defaults to PENDING_REVIEW server-side when no status filter is passed
  // (see featureRequest.service.js#listForAdmin) — this summary only ever
  // needs to surface what's actionable. Full history/search/filters live
  // on the dedicated Featured Requests page.
  const { data, isLoading, isError, refetch } = useListAdminFeatureRequestsQuery({
    page: 1,
    limit: RECENT_COUNT,
  });

  const [approve, { isLoading: isApproving }] = useApproveFeatureRequestMutation();
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
      toast.error("Couldn't approve request", { description: getApiErrorMessage(error) });
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
      toast.error("Couldn't reject request", { description: getApiErrorMessage(error) });
    }
  }

  async function handleRetryRefund(id: string) {
    try {
      await retryRefund(id).unwrap();
      toast.success("Refund retried");
    } catch (error) {
      toast.error("Refund retry failed", { description: getApiErrorMessage(error) });
    }
  }

  return (
    <div className="animate-[fadeIn_.35s_ease_both] space-y-5">
      <div className="border-b border-[#E7E7E7] pb-5">
        <h2 className="ae-serif text-[30px] font-semibold leading-[1.08] tracking-[-0.015em] text-[#202020]">
          Payments
        </h2>
        <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
          Featured Listing requests, sponsorship placements, and the internal ledger.
        </p>
      </div>

      <section className="rounded-[20px] border border-[#E7E7E7] bg-white px-[26px] py-[26px]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="ae-serif text-[22px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#202020]">
              Brand Spotlight rotation
            </h3>
            <p className="mt-3 text-[14px] leading-[1.75] text-[#6A6A6A]">
              Three companies appear on the homepage at a time.
            </p>
          </div>
          <span className="inline-flex h-[27px] items-center rounded-full border border-[#E7E7E7] bg-[#FAFAFA] px-3 text-[10.5px] font-bold tracking-[0.11em] text-[#6A6A6A]">
            SAMPLE DATA
          </span>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {spotlightSlots.map((slot) => (
            <article key={slot.slot} className="rounded-[16px] border border-[#E7E7E7] px-5 py-5">
              <p className="text-[10px] font-bold tracking-[0.15em] text-[#6A6A6A]">
                {slot.slot.toUpperCase()}
              </p>
              <h4 className="mt-3 text-[15px] font-semibold text-[#202020]">{slot.company}</h4>
              <p className="mt-2 text-[13px] text-[#6A6A6A]">{slot.until}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-[12.5px] leading-[1.6] text-[#8A8A8A]">
          There&apos;s no advertising/sponsorship model in the API yet, so this section isn&apos;t
          wired to real data.
        </p>
      </section>

      <section className="overflow-hidden rounded-[20px] border border-[#E7E7E7] bg-white">
        <div className="flex flex-wrap items-start justify-between gap-4 px-[26px] py-5">
          <div>
            <h3 className="ae-serif text-[22px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#202020]">
              Featured Listing requests
            </h3>
            <p className="mt-3 text-[14px] leading-[1.75] text-[#6A6A6A]">
              Organizers pay $49 upfront; approving here marks their event as featured. Showing
              the {RECENT_COUNT} most recent pending review.
            </p>
          </div>
          <Link
            href={appRoutes.admin.featuredRequests}
            className="whitespace-nowrap text-[13.5px] font-semibold text-[var(--ae-accent)] transition-colors hover:text-[var(--ae-accent-strong)]"
          >
            View all →
          </Link>
        </div>

        {isLoading ? (
          <div className="h-[140px] animate-pulse bg-[#F5F5F5]" />
        ) : isError ? (
          <div className="px-[26px] py-10 text-center">
            <p className="text-[14.5px] text-[#6A6A6A]">Couldn&apos;t load feature requests.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 rounded-[10px] border border-[#202020] bg-white px-5 py-2 text-[13.5px] font-semibold text-[#202020]"
            >
              Try again
            </button>
          </div>
        ) : requests.length === 0 ? (
          <div className="px-[26px] py-10 text-center text-[14.5px] text-[#6A6A6A]">
            No pending Featured Listing requests.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[1fr_0.9fr_1fr_1.3fr_auto] gap-[22px] border-y border-[#E7E7E7] bg-[#FAFAFA] px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
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
                <div className="text-[14px] text-[#6A6A6A]">
                  {dateFormatter.format(new Date(request.createdAt))}
                </div>
                <div className="text-[15px] font-semibold text-[#202020]">
                  {centsToUsd(request.amountCents)}
                </div>
                <div className="text-[13.5px] text-[#3A3A3A]">{statusLabels[request.status]}</div>
                <div className="truncate text-[14px] text-[#3A3A3A]">{request.headline ?? "—"}</div>
                <div className="flex justify-end gap-3 text-[13px]">
                  {request.status === "PENDING_REVIEW" ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleApprove(request.id)}
                        disabled={isApproving}
                        className="font-semibold text-[var(--ae-accent)] transition-colors hover:text-[var(--ae-accent-strong)]"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => setRejectModalId(request.id)}
                        className="text-[#6A6A6A] transition-colors hover:text-[#202020]"
                      >
                        Reject
                      </button>
                    </>
                  ) : null}
                  {request.refundStatus === "FAILED" ? (
                    <button
                      type="button"
                      onClick={() => handleRetryRefund(request.id)}
                      className="text-[#6A6A6A] transition-colors hover:text-[#202020]"
                    >
                      Retry refund
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </>
        )}
      </section>

      <section className="overflow-hidden rounded-[20px] border border-[#E7E7E7] bg-white">
        <div className="flex items-start justify-between gap-4 px-[26px] py-5">
          <div>
            <h3 className="ae-serif text-[22px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#202020]">
              Internal ledger
            </h3>
            <p className="mt-3 text-[14px] leading-[1.75] text-[#6A6A6A]">
              Manually recorded payments received and spent.
            </p>
          </div>
          <span className="inline-flex h-[27px] items-center rounded-full border border-[#E7E7E7] bg-[#FAFAFA] px-3 text-[10.5px] font-bold tracking-[0.11em] text-[#6A6A6A]">
            SAMPLE DATA
          </span>
        </div>

        <div className="grid grid-cols-[1fr_2.2fr_0.9fr_0.9fr] gap-[22px] border-y border-[#E7E7E7] bg-[#FAFAFA] px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
          <span>DATE</span>
          <span>DESCRIPTION</span>
          <span>AMOUNT</span>
          <span>INVOICE</span>
        </div>
        {ledgerEntries.map((entry, index) => (
          <div
            key={`${entry.invoice}-${entry.date}-${index}`}
            className={`grid grid-cols-[1fr_2.2fr_0.9fr_0.9fr] gap-[22px] px-[26px] py-[18px] ${
              index < ledgerEntries.length - 1 ? "border-b border-[#F1F1F1]" : ""
            }`}
          >
            <div className="text-[14px] text-[#6A6A6A]">{entry.date}</div>
            <div className="text-[14px] text-[#3A3A3A]">{entry.description}</div>
            <div className="text-[15px] font-semibold text-[#202020]">{entry.amount}</div>
            <div className="text-[14px] text-[#6A6A6A]">{entry.invoice}</div>
          </div>
        ))}
        <p className="px-[26px] py-4 text-[12.5px] leading-[1.6] text-[#8A8A8A]">
          There&apos;s no ledger model in the API yet, so entries here aren&apos;t saved anywhere.
        </p>
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
            <button
              type="button"
              onClick={() => {
                setRejectModalId(null);
                setRejectReason("");
              }}
              className="inline-flex h-[46px] items-center justify-center rounded-[12px] border border-[#E7E7E7] px-6 text-[14.5px] font-semibold text-[#3A3A3A]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleReject}
              className="inline-flex h-[46px] items-center justify-center rounded-[12px] bg-[#B3261E] px-6 text-[14.5px] font-semibold text-white"
            >
              Reject & refund
            </button>
          </>
        }
      >
        <textarea
          rows={4}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Explain the rejection..."
          className="w-full resize-y rounded-[12px] border border-[#E7E7E7] px-4 py-[12px] text-[15px] leading-[1.6] outline-none focus:border-[#C7B48D]"
        />
      </Modal>
    </div>
  );
}
