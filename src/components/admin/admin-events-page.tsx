"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { appRoutes } from "@/lib/routes";
import {
  useApproveEventMutation,
  useListAdminEventsQuery,
  useRejectEventMutation,
  useRequestEventChangesMutation,
} from "@/features/admin/admin-events-api";
import {
  useCreateCategoryMutation,
  useListAdminCategoriesQuery,
  useListAdminIndustriesQuery,
  useUpdateCategoryMutation,
} from "@/features/admin/admin-taxonomy-api";
import { EVENT_STATUS_LABELS } from "@/features/events/event-types";
import type { EventRecord, EventStatus } from "@/features/events/event-types";
import { getApiErrorMessage } from "@/lib/store/api-error";
import { useConfirm } from "@/components/ui/modal-provider";
import { Modal } from "@/components/ui/modal";

const submissionTabs: (EventStatus | "All")[] = [
  "All",
  "DRAFT",
  "UNDER_REVIEW",
  "CHANGES_REQUESTED",
  "PUBLISHED",
  "REJECTED",
];

const topTabs = ["Submissions", "Archive", "Settings"] as const;
type EventsView = (typeof topTabs)[number];

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});
const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

export function AdminEventsPage() {
  const [view, setView] = useState<EventsView>("Submissions");
  const [filter, setFilter] = useState<EventStatus | "All">("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [noteModal, setNoteModal] = useState<null | "changes" | "reject">(null);
  const [noteValue, setNoteValue] = useState("");

  const { data, isLoading, isError, refetch } = useListAdminEventsQuery({
    status: filter === "All" ? undefined : filter,
    limit: 50,
    sort: "recent",
  });
  const { data: archiveData, isLoading: isArchiveLoading } = useListAdminEventsQuery(
    { status: "ARCHIVED", limit: 50 },
    { skip: view !== "Archive" }
  );

  const [approveEvent, { isLoading: isApproving }] = useApproveEventMutation();
  const [requestChanges, { isLoading: isRequestingChanges }] = useRequestEventChangesMutation();
  const [rejectEvent, { isLoading: isRejecting }] = useRejectEventMutation();
  const confirm = useConfirm();

  const rows = data?.items ?? [];
  const selectedRow = rows.find((row) => row.id === selectedId) ?? rows[0];

  const subtitle =
    view === "Submissions"
      ? isLoading
        ? "Loading..."
        : `${data?.meta.total ?? 0} submissions`
      : view === "Archive"
        ? "Read-only history"
        : "Categories and industries";

  async function handleApprove(event: EventRecord) {
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
      toast.error("Couldn't approve event", { description: getApiErrorMessage(error) });
    }
  }

  async function handleSubmitNote() {
    if (!selectedRow) return;
    if (noteValue.trim().length < 5) {
      toast.error("Please add at least 5 characters explaining the decision.");
      return;
    }

    try {
      if (noteModal === "changes") {
        await requestChanges({ id: selectedRow.id, note: noteValue.trim() }).unwrap();
        toast.success("Changes requested");
      } else if (noteModal === "reject") {
        await rejectEvent({ id: selectedRow.id, reason: noteValue.trim() }).unwrap();
        toast.success("Event rejected");
      }
      setNoteModal(null);
      setNoteValue("");
    } catch (error) {
      toast.error("Couldn't submit decision", { description: getApiErrorMessage(error) });
    }
  }

  return (
    <div className="animate-[fadeIn_.35s_ease_both] space-y-0">
      <div className="flex flex-col gap-5 border-b border-[#E7E7E7] pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="ae-serif text-[30px] font-semibold leading-[1.08] tracking-[-0.015em] text-[#202020]">
            Events
          </h2>
          <p className="mt-2 text-[14.5px] text-[#6A6A6A]">{subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {topTabs.map((tab) => {
            const active = view === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setView(tab)}
                className={`rounded-full border px-[18px] py-[9px] text-[13.5px] font-semibold transition-colors ${
                  active
                    ? "border-[#1E1E1E] bg-[#1E1E1E] text-white"
                    : "border-[#E7E7E7] bg-white text-[#202020]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {view === "Submissions" ? (
        <div className="mt-6 space-y-5">
          <div className="flex flex-wrap gap-2">
            {submissionTabs.map((tab) => {
              const active = filter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setFilter(tab);
                    setSelectedId(null);
                  }}
                  className={`rounded-full border px-[17px] py-[9px] text-[13.5px] transition-colors ${
                    active
                      ? "border-[#1E1E1E] bg-[#1E1E1E] font-semibold text-white"
                      : "border-[#E7E7E7] bg-white text-[#5F5F5F]"
                  }`}
                >
                  {tab === "All" ? "All" : EVENT_STATUS_LABELS[tab]}
                </button>
              );
            })}
          </div>

          {isLoading ? (
            <div className="grid gap-[10px]">
              {[0, 1, 2].map((key) => (
                <div key={key} className="h-[70px] animate-pulse rounded-[16px] border border-[#E7E7E7] bg-[#F5F5F5]" />
              ))}
            </div>
          ) : isError ? (
            <div className="rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] px-10 py-16 text-center">
              <p className="text-[15px] text-[#6A6A6A]">Couldn&apos;t load events.</p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 rounded-[10px] border border-[#202020] bg-white px-5 py-2 text-[13.5px] font-semibold text-[#202020]"
              >
                Try again
              </button>
            </div>
          ) : rows.length === 0 ? (
            <div className="rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] px-10 py-16 text-center text-[15px] text-[#6A6A6A]">
              No events match this filter.
            </div>
          ) : (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.95fr)]">
              <section className="overflow-hidden rounded-[20px] border border-[#E7E7E7] bg-white">
                <div className="grid grid-cols-[2.2fr_1.2fr_1fr_0.9fr_auto] gap-[22px] border-b border-[#E7E7E7] bg-[#FAFAFA] px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
                  <span>EVENT</span>
                  <span>ORGANIZER</span>
                  <span>CATEGORY</span>
                  <span>SUBMITTED</span>
                  <span className="text-right">STATUS</span>
                </div>

                {rows.map((row) => (
                  <button
                    key={row.id}
                    type="button"
                    onClick={() => setSelectedId(row.id)}
                    className={`grid w-full grid-cols-[2.2fr_1.2fr_1fr_0.9fr_auto] items-center gap-[22px] border-t border-[#F1F1F1] px-[26px] py-[18px] text-left transition-colors hover:bg-[#FAFAFA] ${
                      selectedRow?.id === row.id ? "bg-[#F7F3EC]" : "bg-white"
                    }`}
                  >
                    <div className="text-[15px] font-semibold leading-[1.45] text-[#202020]">
                      {row.title}
                    </div>
                    <div className="text-[14.5px] text-[#3A3A3A]">{row.organizer?.fullName ?? "—"}</div>
                    <div className="text-[14.5px] text-[#3A3A3A]">{row.category?.name ?? "—"}</div>
                    <div className="text-[14px] text-[#6A6A6A]">
                      {row.submittedAt ? dateFormatter.format(new Date(row.submittedAt)) : "—"}
                    </div>
                    <div className="flex justify-end">{renderStatus(row.status)}</div>
                  </button>
                ))}
              </section>

              {selectedRow ? (
                <section className="rounded-[20px] border border-[#E7E7E7] bg-white px-[26px] py-[26px]">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
                      {EVENT_STATUS_LABELS[selectedRow.status].toUpperCase()}
                    </p>
                    <Link
                      href={appRoutes.admin.eventDetail(selectedRow.id)}
                      className="whitespace-nowrap text-[12.5px] font-semibold text-[var(--ae-accent)] transition-colors hover:text-[var(--ae-accent-strong)]"
                    >
                      Review full details →
                    </Link>
                  </div>
                  <h3 className="mt-3 ae-serif text-[22px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#202020]">
                    {selectedRow.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
                    {selectedRow.organizer?.fullName ?? "—"} · {selectedRow.category?.name ?? "—"}
                  </p>

                  <div className="mt-5 space-y-4 border-t border-[#E7E7E7] pt-5 text-[14.5px] leading-[1.8] text-[#4E4E4E]">
                    <p>{selectedRow.description}</p>
                    {selectedRow.latestAdminNote ? <p>{selectedRow.latestAdminNote}</p> : null}
                  </div>

                  <div className="mt-5 grid gap-3 border-t border-[#E7E7E7] pt-5 text-[14px] text-[#3A3A3A]">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-[#6A6A6A]">When</span>
                      <span className="text-right font-medium text-[#202020]">
                        {dateTimeFormatter.format(new Date(selectedRow.startAt))}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-[#6A6A6A]">Location</span>
                      <span className="text-right font-medium text-[#202020]">
                        {selectedRow.isOnline ? "Online" : selectedRow.city ?? "—"}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-[#6A6A6A]">Package</span>
                      <span className="text-right font-medium text-[#202020]">
                        {selectedRow.isFeatured ? "Featured Listing — $49" : "Basic Listing — Free"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[#E7E7E7] pt-5">
                    <div className="flex flex-wrap gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleApprove(selectedRow)}
                        disabled={isApproving}
                        className="rounded-[10px] bg-[#1E1E1E] px-4 py-1.5 text-[13.5px] font-semibold text-white disabled:opacity-60"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => setNoteModal("changes")}
                        className="rounded-[10px] border border-[#1E1E1E] bg-white px-4 py-1.5 text-[13.5px] font-medium text-[#1E1E1E]"
                      >
                        Request changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setNoteModal("reject")}
                        disabled={selectedRow.status !== "UNDER_REVIEW"}
                        title={
                          selectedRow.status !== "UNDER_REVIEW"
                            ? "Only events currently under review can be rejected"
                            : undefined
                        }
                        className="text-[13.5px] text-[#5F5F5F] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </section>
              ) : null}
            </div>
          )}
        </div>
      ) : null}

      {view === "Archive" ? (
        <div className="mt-6 space-y-5">
          <p className="text-[14.5px] text-[#6A6A6A]">Past events, read-only.</p>

          {isArchiveLoading ? (
            <div className="h-[200px] animate-pulse rounded-[20px] border border-[#E7E7E7] bg-[#F5F5F5]" />
          ) : (archiveData?.items.length ?? 0) === 0 ? (
            <div className="rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] px-10 py-16 text-center text-[15px] text-[#6A6A6A]">
              No archived events yet.
            </div>
          ) : (
            <section className="overflow-hidden rounded-[20px] border border-[#E7E7E7] bg-white">
              <div className="grid grid-cols-[2.15fr_1.2fr_1fr_0.9fr] gap-[22px] border-b border-[#E7E7E7] bg-[#FAFAFA] px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
                <span>EVENT</span>
                <span>ORGANIZER</span>
                <span>CATEGORY</span>
                <span>EVENT DATE</span>
              </div>

              {(archiveData?.items ?? []).map((row, index) => (
                <div
                  key={row.id}
                  className={`grid grid-cols-[2.15fr_1.2fr_1fr_0.9fr] items-center gap-[22px] border-t border-[#F1F1F1] px-[26px] py-[18px] ${
                    index === 0 ? "border-t-0" : ""
                  }`}
                >
                  <div className="text-[15px] font-semibold leading-[1.45] text-[#202020]">{row.title}</div>
                  <div className="text-[14.5px] text-[#3A3A3A]">{row.organizer?.fullName ?? "—"}</div>
                  <div className="text-[14.5px] text-[#3A3A3A]">{row.category?.name ?? "—"}</div>
                  <div className="text-[14px] text-[#6A6A6A]">{dateFormatter.format(new Date(row.startAt))}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      ) : null}

      {view === "Settings" ? <TaxonomySettings /> : null}

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
            <button
              type="button"
              onClick={() => {
                setNoteModal(null);
                setNoteValue("");
              }}
              className="inline-flex h-[46px] items-center justify-center rounded-[12px] border border-[#E7E7E7] px-6 text-[14.5px] font-semibold text-[#3A3A3A]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmitNote}
              disabled={isRequestingChanges || isRejecting}
              className="inline-flex h-[46px] items-center justify-center rounded-[12px] bg-[#1E1E1E] px-6 text-[14.5px] font-semibold text-white disabled:opacity-60"
            >
              {noteModal === "changes" ? "Send to organizer" : "Reject event"}
            </button>
          </>
        }
      >
        <textarea
          rows={4}
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
          placeholder="Explain the decision..."
          className="w-full resize-y rounded-[12px] border border-[#E7E7E7] px-4 py-[12px] text-[15px] leading-[1.6] outline-none focus:border-[#C7B48D]"
        />
      </Modal>
    </div>
  );
}

function renderStatus(status: EventStatus) {
  if (status === "PUBLISHED") {
    return (
      <span className="inline-flex rounded-full border border-[#1E1E1E] bg-[#1E1E1E] px-[14px] py-1.5 text-[12px] font-semibold text-white">
        {EVENT_STATUS_LABELS[status]}
      </span>
    );
  }
  if (status === "CHANGES_REQUESTED") {
    return (
      <span className="inline-flex rounded-full border border-[#B08A45] bg-white px-[14px] py-1.5 text-[12px] font-semibold text-[#B08A45]">
        {EVENT_STATUS_LABELS[status]}
      </span>
    );
  }
  if (status === "REJECTED") {
    return (
      <span className="inline-flex rounded-full border border-[#E0DDD6] bg-white px-[14px] py-1.5 text-[12px] text-[#6F6F6F]">
        {EVENT_STATUS_LABELS[status]}
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full border border-[#E0DDD6] bg-[#F3F1ED] px-[14px] py-1.5 text-[12px] text-[#5F5F5F]">
      {EVENT_STATUS_LABELS[status]}
    </span>
  );
}

function TaxonomySettings() {
  const { data: categories } = useListAdminCategoriesQuery();
  const { data: industries } = useListAdminIndustriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [newCategory, setNewCategory] = useState("");

  async function handleAddCategory() {
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    try {
      await createCategory({ name: trimmed }).unwrap();
      setNewCategory("");
    } catch (error) {
      toast.error("Couldn't add category", { description: getApiErrorMessage(error) });
    }
  }

  async function handleToggleCategory(id: string, isActive: boolean) {
    try {
      await updateCategory({ id, isActive: !isActive }).unwrap();
    } catch (error) {
      toast.error("Couldn't update category", { description: getApiErrorMessage(error) });
    }
  }

  return (
    <div className="mt-6 max-w-[780px] space-y-5">
      <section className="rounded-[20px] border border-[#E7E7E7] bg-white px-[32px] py-[32px]">
        <h3 className="ae-serif text-[22px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#202020]">
          Event categories
        </h3>
        <p className="mt-4 text-[14.5px] leading-[1.75] text-[#6A6A6A]">
          These drive the public filters and the organizer submission form.
        </p>

        <div className="mt-4 flex flex-wrap gap-2.5">
          {(categories ?? []).map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleToggleCategory(category.id, category.isActive)}
              title={category.isActive ? "Click to deactivate" : "Click to reactivate"}
              className={`inline-flex h-[36px] items-center rounded-full border px-[14px] text-[14px] ${
                category.isActive
                  ? "border-[#E7E7E7] text-[#444444]"
                  : "border-[#E7E7E7] bg-[#F1F1F1] text-[#9A9A9A] line-through"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            placeholder="New category name"
            className="h-[40px] flex-1 rounded-[12px] border border-[#E7E7E7] px-4 text-[14px] text-[#202020] outline-none"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="inline-flex h-[40px] items-center justify-center rounded-[12px] border border-[#1E1E1E] bg-white px-6 text-[14px] font-semibold text-[#1E1E1E]"
          >
            Add category
          </button>
        </div>
      </section>

      <section className="rounded-[20px] border border-[#E7E7E7] bg-white px-[32px] py-[32px]">
        <h3 className="ae-serif text-[22px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#202020]">
          Industries
        </h3>
        <p className="mt-4 text-[14.5px] leading-[1.75] text-[#6A6A6A]">
          The industry an event is targeted at, shown alongside its category.
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {(industries ?? []).map((industry) => (
            <span
              key={industry.id}
              className={`inline-flex h-[36px] items-center rounded-full border px-[14px] text-[14px] ${
                industry.isActive ? "border-[#E7E7E7] text-[#444444]" : "border-[#E7E7E7] bg-[#F1F1F1] text-[#9A9A9A]"
              }`}
            >
              {industry.name}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-[20px] border border-dashed border-[#E7E7E7] bg-[#FAFAFA] px-[32px] py-[26px]">
        <p className="text-[13.5px] leading-[1.7] text-[#6A6A6A]">
          Featured Listing and Brand Spotlight pricing management is not yet available — the
          backend doesn&apos;t expose a settings endpoint for these values yet. The Featured
          Listing price is currently fixed at $49 in the API configuration.
        </p>
      </section>
    </div>
  );
}
