"use client";

import { useMemo, useState } from "react";
import {
  adminArchiveRows,
  adminEventCategories,
  adminEventPricing,
  adminEventRows,
} from "@/lib/admin/dashboard-data";

const submissionTabs = [
  "All",
  // "Draft",
  // "Submitted",
  "Under Review",
  "Published",
  "Rejected",
  "Changes Requested",
] as const;

const topTabs = ["Submissions", "Archive", "Settings"] as const;

type SubmissionFilter = (typeof submissionTabs)[number];
type EventsView = (typeof topTabs)[number];

export function AdminEventsPage() {
  const [view, setView] = useState<EventsView>("Submissions");
  const [filter, setFilter] = useState<SubmissionFilter>("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [categories, setCategories] = useState<string[]>([
    ...adminEventCategories,
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [featuredListingPrice, setFeaturedListingPrice] = useState<string>(
    adminEventPricing.featuredListing
  );

  const [brandSpotlightPrice, setBrandSpotlightPrice] = useState<string>(
    adminEventPricing.brandSpotlight
  );
  const [decisionMessage, setDecisionMessage] = useState("");
  const [decision, setDecision] = useState<
    "pending" | "changes" | "rejected" | "done"
  >("pending");

  const filteredRows = useMemo(() => {
    if (filter === "All") return adminEventRows;
    return adminEventRows.filter((row) => row.status === filter);
  }, [filter]);

  const selectedRow =
    filteredRows[selectedIndex] ?? filteredRows[0] ?? adminEventRows[0];

  const subtitle =
    view === "Submissions"
      ? "148 total submissions · 7 awaiting review"
      : view === "Archive"
      ? "Read-only history"
      : "Categories and pricing";

  function addCategory() {
    const trimmed = newCategory.trim();
    if (!trimmed || categories.includes(trimmed)) {
      setNewCategory("");
      return;
    }
    setCategories((current) => [...current, trimmed]);
    setNewCategory("");
  }

  function removeCategory(category: string) {
    setCategories((current) => current.filter((item) => item !== category));
  }

  function openDetail(index: number) {
    setSelectedIndex(index);
    setView("Submissions");
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
                  onClick={() => setFilter(tab)}
                  className={`rounded-full border px-[17px] py-[9px] text-[13.5px] transition-colors ${
                    active
                      ? "border-[#1E1E1E] bg-[#1E1E1E] font-semibold text-white"
                      : "border-[#E7E7E7] bg-white text-[#5F5F5F]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="grid gap-6">
            {/* <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.95fr)]"> */}
            <section className="overflow-hidden rounded-[20px] border border-[#E7E7E7] bg-white">
              <div className="grid grid-cols-[2.2fr_1.2fr_1fr_0.9fr_auto] gap-[22px] border-b border-[#E7E7E7] bg-[#FAFAFA] px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
                <span>EVENT</span>
                <span>ORGANIZER</span>
                <span>CATEGORY</span>
                <span>SUBMITTED</span>
                <span className="text-right">STATUS</span>
              </div>

              {filteredRows.map((row, index) => (
                <button
                  key={row.title}
                  type="button"
                  onClick={() => openDetail(index)}
                  className={`grid w-full grid-cols-[2.2fr_1.2fr_1fr_0.9fr_auto] items-center gap-[22px] border-t border-[#F1F1F1] px-[26px] py-[18px] text-left transition-colors hover:bg-[#FAFAFA] ${
                    selectedRow?.title === row.title
                      ? "bg-[#F7F3EC]"
                      : "bg-white"
                  }`}
                >
                  <div className="text-[15px] font-semibold leading-[1.45] text-[#202020]">
                    {row.title}
                  </div>
                  <div className="text-[14.5px] text-[#3A3A3A]">
                    {row.organizer}
                  </div>
                  <div className="text-[14.5px] text-[#3A3A3A]">
                    {row.category}
                  </div>
                  <div className="text-[14px] text-[#6A6A6A]">
                    {row.submitted}
                  </div>
                  <div className="flex justify-end">
                    {renderStatus(row.status)}
                  </div>
                </button>
              ))}
            </section>
            {/* 
            <section className="rounded-[20px] border border-[#E7E7E7] bg-white px-[26px] py-[26px]">
              <p className="text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
                {selectedRow.status.toUpperCase()}
              </p>
              <h3 className="mt-3 ae-serif text-[22px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#202020]">
                {selectedRow.title}
              </h3>
              <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
                {selectedRow.organizer} · {selectedRow.category}
              </p>

              <div className="mt-5 space-y-4 border-t border-[#E7E7E7] pt-5 text-[14.5px] leading-[1.8] text-[#4E4E4E]">
                <p>{selectedRow.description}</p>
                <p>{selectedRow.note}</p>
              </div>

              <div className="mt-5 grid gap-3 border-t border-[#E7E7E7] pt-5 text-[14px] text-[#3A3A3A]">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[#6A6A6A]">When</span>
                  <span className="text-right font-medium text-[#202020]">{selectedRow.when}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[#6A6A6A]">City</span>
                  <span className="text-right font-medium text-[#202020]">{selectedRow.city}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[#6A6A6A]">Package</span>
                  <span className="text-right font-medium text-[#202020]">{selectedRow.packageName}</span>
                </div>
              </div>

              <div className="mt-6 border-t border-[#E7E7E7] pt-5">
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setDecision("done");
                      setDecisionMessage(
                        "Approved and published. The organizer has been emailed a link to the live event page."
                      );
                    }}
                    className="rounded-[10px] bg-[#1E1E1E] px-4 py-1.5 text-[13.5px] font-semibold text-white"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => setDecision("changes")}
                    className="rounded-[10px] border border-[#1E1E1E] bg-white px-4 py-1.5 text-[13.5px] font-medium text-[#1E1E1E]"
                  >
                    Request changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setDecision("rejected")}
                    className="text-[13.5px] text-[#5F5F5F]"
                  >
                    Reject
                  </button>
                </div>

                {decision !== "pending" ? (
                  <p className="mt-4 text-[13.5px] leading-[1.7] text-[#6A6A6A]">
                    {decisionMessage ||
                      (decision === "changes"
                        ? "Sent to the organizer. The listing status has been updated and appears in their dashboard."
                        : "The listing has been marked rejected and removed from the review queue.")}
                  </p>
                ) : null}
              </div>
            </section> */}
          </div>
        </div>
      ) : null}

      {view === "Archive" ? (
        <div className="mt-6 space-y-5">
          <p className="text-[14.5px] text-[#6A6A6A]">
            Past events, read-only. 121 published listings have run to date.
          </p>

          <section className="overflow-hidden rounded-[20px] border border-[#E7E7E7] bg-white">
            <div className="grid grid-cols-[2.15fr_1.2fr_1fr_0.9fr_auto] gap-[22px] border-b border-[#E7E7E7] bg-[#FAFAFA] px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
              <span>EVENT</span>
              <span>ORGANIZER</span>
              <span>CATEGORY</span>
              <span>EVENT DATE</span>
              <span className="text-right">RESULT</span>
            </div>

            {adminArchiveRows.map((row, index) => (
              <div
                key={row.title}
                className={`grid grid-cols-[2.15fr_1.2fr_1fr_0.9fr_auto] items-center gap-[22px] border-t border-[#F1F1F1] px-[26px] py-[18px] ${
                  index === 0 ? "border-t-0" : ""
                }`}
              >
                <div className="text-[15px] font-semibold leading-[1.45] text-[#202020]">
                  {row.title}
                </div>
                <div className="text-[14.5px] text-[#3A3A3A]">
                  {row.organizer}
                </div>
                <div className="text-[14.5px] text-[#3A3A3A]">
                  {row.category}
                </div>
                <div className="text-[14px] text-[#6A6A6A]">
                  {row.eventDate}
                </div>
                <div className="flex justify-end">
                  <span className="inline-flex rounded-full border border-[#E7E7E7] bg-[#F1EEE8] px-[14px] py-1.5 text-[12px] font-medium text-[#6A6A6A]">
                    {row.result}
                  </span>
                </div>
              </div>
            ))}
          </section>
        </div>
      ) : null}

      {view === "Settings" ? (
        <div className="mt-6 max-w-[780px] space-y-5">
          <section className="rounded-[20px] border border-[#E7E7E7] bg-white px-[32px] py-[32px]">
            <h3 className="ae-serif text-[22px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#202020]">
              Event categories
            </h3>
            <p className="mt-4 text-[14.5px] leading-[1.75] text-[#6A6A6A]">
              These drive the public filters and the organizer submission form.
            </p>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => removeCategory(category)}
                  className="inline-flex h-[36px] items-center rounded-full border border-[#E7E7E7] px-[14px] text-[14px] text-[#444444]"
                >
                  {category}
                  <span className="ml-2 text-[#8A8A8A]">×</span>
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
                onClick={addCategory}
                className="inline-flex h-[40px] items-center justify-center rounded-[12px] border border-[#1E1E1E] bg-white px-6 text-[14px] font-semibold text-[#1E1E1E]"
              >
                Add category
              </button>
            </div>
          </section>

          <section className="rounded-[20px] border border-[#E7E7E7] bg-white px-[32px] py-[32px]">
            <h3 className="ae-serif text-[22px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#202020]">
              Featured Listing pricing
            </h3>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[13.5px] font-semibold text-[#303030]">
                  Featured Listing price
                </span>
                <input
                  type="text"
                  value={featuredListingPrice}
                  onChange={(event) =>
                    setFeaturedListingPrice(event.target.value)
                  }
                  className="h-[42px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[14px] text-[#202020] outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[13.5px] font-semibold text-[#303030]">
                  Brand Spotlight price
                </span>
                <input
                  type="text"
                  value={brandSpotlightPrice}
                  onChange={(event) =>
                    setBrandSpotlightPrice(event.target.value)
                  }
                  className="h-[42px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[14px] text-[#202020] outline-none"
                />
              </label>
            </div>

            <button
              type="button"
              className="mt-6 inline-flex h-[38px] items-center justify-center rounded-[12px] bg-[#1E1E1E] px-5 text-[14px] font-semibold text-white"
            >
              Save pricing
            </button>
          </section>
        </div>
      ) : null}
    </div>
  );
}

function renderStatus(status: (typeof adminEventRows)[number]["status"]) {
  if (status === "Published") {
    return (
      <span className="inline-flex rounded-full border border-[#1E1E1E] bg-[#1E1E1E] px-[14px] py-1.5 text-[12px] font-semibold text-white">
        {status}
      </span>
    );
  }

  if (status === "Changes Requested") {
    return (
      <span className="inline-flex rounded-full border border-[#B08A45] bg-white px-[14px] py-1.5 text-[12px] font-semibold text-[#B08A45]">
        {status}
      </span>
    );
  }

  if (status === "Rejected") {
    return (
      <span className="inline-flex rounded-full border border-[#E0DDD6] bg-white px-[14px] py-1.5 text-[12px] text-[#6F6F6F]">
        {status}
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full border border-[#E0DDD6] bg-[#F3F1ED] px-[14px] py-1.5 text-[12px] text-[#5F5F5F]">
      {status}
    </span>
  );
}
