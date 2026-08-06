"use client";

import { useState } from "react";
import {
  adminArchiveRows,
  adminEventCategories,
  adminEventPricing,
  adminEventRows,
} from "@/lib/admin/dashboard-data";

const submissionTabs = [
  "All",
  "Draft",
  "Submitted",
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
  const [categories, setCategories] = useState([...adminEventCategories]);
  const [newCategory, setNewCategory] = useState("");
  const [featuredListingPrice, setFeaturedListingPrice] = useState(
    adminEventPricing.featuredListing
  );
  const [brandSpotlightPrice, setBrandSpotlightPrice] = useState(
    adminEventPricing.brandSpotlight
  );

  const filteredRows =
    filter === "All"
      ? adminEventRows
      : adminEventRows.filter((row) => row.status === filter);

  const subtitle =
    view === "Submissions"
      ? "148 total submissions · 7 awaiting review"
      : view === "Archive"
        ? "Read-only history"
        : "Categories and pricing";

  const archiveDescription =
    "Past events, read-only. 121 published listings have run to date.";

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

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-6 border-b border-[#E8E3DB] pb-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="ae-serif text-[31px] leading-[1.08] tracking-[-0.02em] text-[#202020]">
            Events
          </h2>
          <p className="mt-3 text-[14.5px] text-[#7A7A7A]">{subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {topTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setView(tab)}
              className={`inline-flex py-2  items-center rounded-full border px-[16px] text-[14px] transition-colors ${
                view === tab
                  ? "border-[#232323] bg-[#232323] font-semibold text-white"
                  : "border-[#DDD8D0] bg-white text-[#303030]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {view === "Submissions" ? (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {submissionTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`inline-flex py-1 items-center rounded-full border px-[14px] !text-[12.5px] transition-colors ${
                  filter === tab
                    ? "border-[#232323] bg-[#232323] font-medium text-white"
                    : "border-[#DDD8D0] bg-white text-[#5F5F5F]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <section className="overflow-hidden rounded-[20px] border border-[#E3DED6] bg-white">
            <div className="grid grid-cols-[2.1fr_1.3fr_1.2fr_1fr_0.95fr] gap-4 border-b border-[#EAE6DE] px-6 py-5 text-[10.5px] font-bold tracking-[0.15em] text-[#848484]">
              <span>EVENT</span>
              <span>ORGANIZER</span>
              <span>CATEGORY</span>
              <span>SUBMITTED</span>
              <span className="text-right">STATUS</span>
            </div>

            {filteredRows.map((row, index) => (
              <div
                key={row.title}
                className={`grid grid-cols-[2.1fr_1.3fr_1.2fr_1fr_0.95fr] gap-4 px-6 py-[15px] ${
                  index < filteredRows.length - 1 ? "border-b border-[#EEE8E0]" : ""
                }`}
              >
                <div className="text-[15px] font-semibold text-[#202020]">{row.title}</div>
                <div className="text-[14px] text-[#666666]">{row.organizer}</div>
                <div className="text-[14px] text-[#777777]">{row.category}</div>
                <div className="text-[14px] text-[#777777]">{row.submitted}</div>
                <div className="flex justify-end">{renderSubmissionStatus(row.status)}</div>
              </div>
            ))}
          </section>
        </div>
      ) : null}

      {view === "Archive" ? (
        <div className="space-y-5">
          <p className="text-[14.5px] text-[#7A7A7A]">{archiveDescription}</p>

          <section className="overflow-hidden rounded-[20px] border border-[#E3DED6] bg-white">
            <div className="grid grid-cols-[2.15fr_1.3fr_1.2fr_1fr_0.95fr] gap-4 border-b border-[#EAE6DE] px-6 py-5 text-[10.5px] font-bold tracking-[0.15em] text-[#848484]">
              <span>EVENT</span>
              <span>ORGANIZER</span>
              <span>CATEGORY</span>
              <span>EVENT DATE</span>
              <span className="text-right">RESULT</span>
            </div>

            {adminArchiveRows.map((row, index) => (
              <div
                key={row.title}
                className={`grid grid-cols-[2.15fr_1.3fr_1.2fr_1fr_0.95fr] gap-4 px-6 py-[15px] ${
                  index < adminArchiveRows.length - 1 ? "border-b border-[#EEE8E0]" : ""
                }`}
              >
                <div className="text-[15px] font-semibold text-[#202020]">{row.title}</div>
                <div className="text-[14px] text-[#666666]">{row.organizer}</div>
                <div className="text-[14px] text-[#777777]">{row.category}</div>
                <div className="text-[14px] text-[#777777]">{row.eventDate}</div>
                <div className="flex justify-end">
                  <span className="inline-flex py-1.5 items-center rounded-full border border-[#E0DDD6] bg-[#F3F1ED] px-[14px] !text-[12px] text-[#696969]">
                    {row.result}
                  </span>
                </div>
              </div>
            ))}
          </section>
        </div>
      ) : null}

      {view === "Settings" ? (
        <div className="max-w-[920px] space-y-5">
          <section className="rounded-[20px] border border-[#E3DED6] bg-white px-7 py-7">
            <h3 className="ae-serif text-[23px] leading-[1.1] tracking-[-0.02em] text-[#202020]">
              Event categories
            </h3>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#6A6A6A]">
              These drive the public filters and the organizer submission form.
            </p>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => removeCategory(category)}
                  className="inline-flex h-[36px] items-center rounded-full border border-[#E0DBD3] px-[14px] text-[14px] text-[#444444]"
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
                className="h-[40px] flex-1 rounded-[12px] border border-[#DDD8D0] px-4 text-[14px] text-[#202020] outline-none"
              />
              <button
                type="button"
                onClick={addCategory}
                className="inline-flex h-[40px] items-center justify-center rounded-[12px] border border-[#232323] bg-white px-6 text-[14px] font-semibold text-[#232323]"
              >
                Add category
              </button>
            </div>
          </section>

          <section className="rounded-[20px] border border-[#E3DED6] bg-white px-7 py-7">
            <h3 className="ae-serif text-[23px] leading-[1.1] tracking-[-0.02em] text-[#202020]">
              Featured Listing pricing
            </h3>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[13px] font-semibold text-[#303030]">
                  Featured Listing price
                </span>
                <input
                  type="text"
                  value={featuredListingPrice}
                  onChange={(event) => setFeaturedListingPrice(event.target.value)}
                  className="h-[42px] w-full rounded-[12px] border border-[#DDD8D0] px-4 text-[14px] text-[#202020] outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[13px] font-semibold text-[#303030]">
                  Brand Spotlight price
                </span>
                <input
                  type="text"
                  value={brandSpotlightPrice}
                  onChange={(event) => setBrandSpotlightPrice(event.target.value)}
                  className="h-[42px] w-full rounded-[12px] border border-[#DDD8D0] px-4 text-[14px] text-[#202020] outline-none"
                />
              </label>
            </div>

            <button
              type="button"
              className="mt-6 inline-flex h-[38px] items-center justify-center rounded-[12px] bg-[#232323] px-5 text-[14px] font-semibold text-white"
            >
              Save pricing
            </button>
          </section>
        </div>
      ) : null}
    </div>
  );
}

function renderSubmissionStatus(status: (typeof adminEventRows)[number]["status"]) {
  if (status === "Published") {
    return (
      <span className="inline-flex py-1.5 items-center rounded-full border border-[#232323] bg-[#232323] px-[14px] !text-[12px] font-semibold text-white">
        {status}
      </span>
    );
  }

  if (status === "Changes Requested") {
    return (
      <span className="inline-flex py-1.5 items-center rounded-full border border-[#C58B2D] bg-white px-[14px] !text-[12px] font-semibold text-[#C58B2D]">
        {status}
      </span>
    );
  }

  if (status === "Rejected") {
    return (
      <span className="inline-flex py-1.5 items-center rounded-full border border-[#D8D3CB] bg-white px-[14px] !text-[12px] text-[#6F6F6F]">
        {status}
      </span>
    );
  }

  return (
    <span className="inline-flex py-1.5 items-center rounded-full border border-[#E0DDD6] bg-[#F3F1ED] px-[14px] !text-[12px] text-[#5F5F5F]">
      {status}
    </span>
  );
}
