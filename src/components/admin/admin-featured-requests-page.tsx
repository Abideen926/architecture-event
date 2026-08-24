"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
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
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { appRoutes } from "@/lib/routes";

const statusLabels: Record<FeatureRequestStatus, string> = {
  PENDING_PAYMENT: "Pending Payment",
  PENDING_REVIEW: "Pending Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  PAYMENT_FAILED: "Payment Failed",
  CANCELLED: "Cancelled",
};

const statusFilters: (FeatureRequestStatus | "ALL")[] = [
  "ALL",
  "PENDING_REVIEW",
  "APPROVED",
  "REJECTED",
  "PENDING_PAYMENT",
  "PAYMENT_FAILED",
  "CANCELLED",
];

const LIMIT = 20;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const centsToUsd = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export function AdminFeaturedRequestsPage() {
  const [statusFilter, setStatusFilter] = useState<
    FeatureRequestStatus | "ALL"
  >("ALL");
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, refetch } =
    useListAdminFeatureRequestsQuery({
      status: statusFilter === "ALL" ? undefined : statusFilter,
      page,
      limit: LIMIT,
      search: search || undefined,
    });

  const [approve, { isLoading: isApproving }] =
    useApproveFeatureRequestMutation();
  const [reject] = useRejectFeatureRequestMutation();
  const [retryRefund] = useRetryFeatureRequestRefundMutation();
  const confirm = useConfirm();

  const [rejectModalId, setRejectModalId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const requests = data?.items ?? [];
  const meta = data?.meta;

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

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
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ae-border pb-5">
        <div>
          <Button
            href={appRoutes.admin.payments}
            variant="ghost"
            size="text"
            className="mb-2 inline-block text-[13px] font-semibold"
          >
            ← Back to Payments
          </Button>
          <Heading level="page">Featured Listing requests</Heading>
          <p className="mt-2 text-[14.5px] text-ae-muted">
            {isLoading ? "Loading..." : `${meta?.total ?? 0} requests`}
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search event or organizer..."
            wrapperClassName="w-[260px]"
            inputSize="sm"
          />
          <Button type="submit" variant="secondary" className="h-[44px]">
            Search
          </Button>
        </form>
      </div>

      <div className="flex flex-wrap gap-2">
        {statusFilters.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => {
              setStatusFilter(status);
              setPage(1);
            }}
            className={`rounded-full border px-[13px] py-1.5 text-[12px] font-semibold transition-colors ${
              statusFilter === status
                ? "border-foreground bg-foreground text-white"
                : "border-ae-border bg-white text-[#5F5F5F]"
            }`}
          >
            {status === "ALL" ? "All" : statusLabels[status]}
          </button>
        ))}
      </div>

      <section className="overflow-hidden rounded-[20px] border border-ae-border bg-white">
        {isLoading ? (
          <div className="h-[240px] animate-pulse bg-[#F5F5F5]" />
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
            No requests match this filter.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[1.8fr_1.4fr_1fr_0.9fr_1fr_auto] gap-[22px] border-b border-ae-border bg-mainbackground px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-ae-muted">
              <span>EVENT</span>
              <span>ORGANIZER</span>
              <span>DATE</span>
              <span>AMOUNT</span>
              <span>STATUS</span>
              <span className="text-right">ACTIONS</span>
            </div>
            {requests.map((request, index) => (
              <div
                key={request.id}
                className={`grid grid-cols-[1.8fr_1.4fr_1fr_0.9fr_1fr_auto] items-center gap-[22px] px-[26px] py-[18px] ${
                  index < requests.length - 1 ? "border-b border-[#F1F1F1]" : ""
                }`}
              >
                <div className="truncate text-[15px] font-semibold text-foreground">
                  {request.event ? (
                    <Link
                      href={appRoutes.admin.eventDetail(request.event.id)}
                      className="transition-colors hover:text-ae-accent-strong"
                    >
                      {request.event.title}
                    </Link>
                  ) : (
                    "—"
                  )}
                </div>
                <div className="truncate text-[13.5px] text-[#3A3A3A]">
                  {request.organizer?.fullName ?? "—"}
                  {request.organizer?.email ? (
                    <span className="block truncate text-[12px] text-[#8A8A8A]">
                      {request.organizer.email}
                    </span>
                  ) : null}
                </div>
                <div className="text-[13.5px] text-ae-muted">
                  {dateFormatter.format(new Date(request.createdAt))}
                </div>
                <div className="text-[14.5px] font-semibold text-foreground">
                  {centsToUsd(request.amountCents)}
                </div>
                <div className="text-[13px] text-[#3A3A3A]">
                  {statusLabels[request.status]}
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

      {meta && meta.totalPages > 1 ? (
        <div className="flex items-center justify-between gap-4 text-[13.5px] text-ae-muted">
          <span>
            Page {meta.page} of {meta.totalPages}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="rounded-[10px] border border-ae-border bg-white px-4 py-1.5 text-[13.5px] font-semibold text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              disabled={page >= meta.totalPages}
              className="rounded-[10px] border border-ae-border bg-white px-4 py-1.5 text-[13.5px] font-semibold text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}

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
