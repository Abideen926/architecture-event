"use client";

import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  List,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { appRoutes } from "@/lib/routes";
import {
  useGetCategoriesQuery,
  useGetIndustriesQuery,
  useListPublicEventsQuery,
} from "@/features/public/public-api";
import { useSaveToggle } from "@/features/attendee/use-save-toggle";
import { FeaturedBadge } from "@/components/ui/featured-badge";
import { Button } from "@/components/ui/button";

const sortOptions = [
  { value: "soonest", label: "Soonest" },
  { value: "recent", label: "Recently added" },
  { value: "az", label: "A–Z" },
] as const;

const dateBadgeFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });

export function BrowseMainSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortOpen, setSortOpen] = useState(false);

  const search = searchParams.get("search") ?? undefined;
  const city = searchParams.get("city") ?? undefined;
  const categoryId = searchParams.get("categoryId") ?? undefined;
  const industryId = searchParams.get("industryId") ?? undefined;
  const isFreeParam = searchParams.get("isFree");
  const isFree =
    isFreeParam === "true" ? true : isFreeParam === "false" ? false : undefined;
  const sort = searchParams.get("sort") ?? "soonest";
  const page = Number(searchParams.get("page") ?? "1");

  const { data, isLoading, isError, refetch } = useListPublicEventsQuery({
    search,
    city,
    categoryId,
    industryId,
    isFree,
    sort,
    page,
    limit: 12,
  });

  const { data: categories } = useGetCategoriesQuery();
  const { data: industries } = useGetIndustriesQuery();
  const { isSaved, toggleSave } = useSaveToggle();

  const events = data?.items ?? [];
  const sortLabel =
    sortOptions.find((option) => option.value === sort)?.label ?? "Soonest";

  function navigateWith(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(overrides)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    if (!("page" in overrides)) params.delete("page");
    const query = params.toString();
    router.push(
      query
        ? `${appRoutes.architectureEvents.events}?${query}`
        : appRoutes.architectureEvents.events,
    );
  }

  return (
    <section className="bg-white pb-18 pt-16">
      <div
        className="mx-auto w-full max-w-[1310px]"
        style={{ paddingInline: "20px" }}
      >
        <div className="grid gap-9 lg:grid-cols-[248px_minmax(0,1fr)] lg:gap-10">
          <aside className="text-[#3A3A3A]">
            <div className="flex items-center justify-between border-b border-[#E5E1DA] pb-4">
              <h2 className="text-[16px] font-semibold leading-none text-[#2A2A2A]">
                Filters
              </h2>
              <button
                type="button"
                onClick={() => router.push(appRoutes.architectureEvents.events)}
                className="text-[12px] font-medium text-ae-accent transition-colors hover:text-ae-accent-strong"
              >
                Clear all
              </button>
            </div>

            <SingleSelectFilterGroup
              title="EVENT TYPE"
              items={(categories ?? []).map((c) => ({
                id: c.id,
                label: c.name,
              }))}
              selectedId={categoryId}
              onChange={(id) => navigateWith({ categoryId: id })}
            />

            <SingleSelectFilterGroup
              title="PRICE"
              items={[
                { id: "free", label: "Free" },
                { id: "paid", label: "Paid" },
              ]}
              selectedId={
                isFree === true ? "free" : isFree === false ? "paid" : undefined
              }
              onChange={(id) =>
                navigateWith({
                  isFree:
                    id === "free"
                      ? "true"
                      : id === "paid"
                        ? "false"
                        : undefined,
                })
              }
            />

            <SingleSelectFilterGroup
              title="INDUSTRY FOCUS"
              items={(industries ?? []).map((i) => ({
                id: i.id,
                label: i.name,
              }))}
              selectedId={industryId}
              onChange={(id) => navigateWith({ industryId: id })}
            />

            <div className="border-t border-[#E5E1DA] pt-5">
              <h3 className="text-[11px] font-bold tracking-[0.12em] text-[#6F6F6F]">
                MAP
              </h3>
              <div className="mt-3 overflow-hidden rounded-[14px] border border-[#E0DDD6] bg-[#F6F3ED]">
                <div className="relative h-[138px] bg-[linear-gradient(180deg,rgba(176,138,69,0.06),rgba(176,138,69,0.02)),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:auto,58px_58px,58px_58px]">
                  <button
                    type="button"
                    disabled
                    title="Map view isn't available yet"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-not-allowed rounded-[10px] bg-white px-4 py-2 text-[11px] font-medium text-[#2A2A2A] opacity-70 shadow-[0_8px_18px_-16px_rgba(20,20,20,0.5)]"
                  >
                    Map view coming soon
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="flex flex-col gap-5 border-b border-[#E5E1DA] pb-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[14px] text-[#585858]">
                <span className="font-semibold text-[#2A2A2A]">
                  {isLoading ? "…" : (data?.meta.total ?? 0)} events
                </span>{" "}
                matching your filters
              </p>
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <div className="relative">
                  <button
                    type="button"
                    aria-expanded={sortOpen}
                    onClick={() => setSortOpen((value) => !value)}
                    className="inline-flex h-[32px] items-center gap-2 rounded-[10px] border border-[#E0DDD6] bg-white px-4 text-[12px] font-medium text-[#2E2E2E]"
                  >
                    Sort: {sortLabel}
                    <ChevronDown
                      className="h-3.5 w-3.5 text-[#6F6F6F]"
                      strokeWidth={1.8}
                    />
                  </button>

                  {sortOpen ? (
                    <div className="absolute right-0 top-full z-20 mt-2 w-[190px] overflow-hidden rounded-[12px] border border-[#E0DDD6] bg-white shadow-[0_16px_34px_-24px_rgba(20,20,20,0.26)]">
                      {sortOptions.map((option, index) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            navigateWith({ sort: option.value });
                            setSortOpen(false);
                          }}
                          className={`flex h-[40px] w-full items-center px-4 text-left text-[12px] text-[#2E2E2E] transition-colors hover:bg-mainbackground ${
                            index > 0 ? "border-t border-[#F2EEE7]" : ""
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="inline-flex overflow-hidden rounded-[10px] border border-[#DAD7D0]">
                  <button
                    type="button"
                    className="inline-flex h-[32px] items-center justify-center gap-1.5 bg-[#1F1F1F] px-4 text-[12px] font-semibold text-white"
                  >
                    <List className="h-3.5 w-3.5" strokeWidth={1.8} />
                    List
                  </button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map((key) => (
                  <div
                    key={key}
                    className="h-[360px] animate-pulse rounded-[18px] border border-[#DEDEDE] bg-[#F5F5F5]"
                  />
                ))}
              </div>
            ) : isError ? (
              <div className="mt-7 rounded-[18px] border border-[#DEDEDE] bg-mainbackground px-10 py-16 text-center">
                <p className="text-[15px] text-ae-muted">
                  Couldn&apos;t load events.
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
            ) : events.length === 0 ? (
              <div className="mt-7 rounded-[18px] border border-[#DEDEDE] bg-mainbackground px-10 py-16 text-center text-[15px] text-ae-muted">
                No events match these filters.
              </div>
            ) : (
              <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {events.map((event) => {
                  const startAt = new Date(event.startAt);
                  const thumbnail = event.media?.find(
                    (m) => m.isThumbnail,
                  )?.url;
                  const saved = isSaved(event.id);

                  return (
                    <article
                      key={event.id}
                      className="group relative overflow-hidden rounded-[18px] border border-[#DEDEDE] bg-white shadow-[0_16px_28px_-26px_rgba(20,20,20,0.28)]"
                    >
                      <Link
                        href={appRoutes.architectureEvents.eventDetail(
                          event.id,
                        )}
                        className="absolute inset-0 z-10"
                        aria-label={`Open ${event.title}`}
                      />
                      <div className="relative h-[198px] overflow-hidden bg-background">
                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt={event.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : null}
                        <div className="absolute left-3 top-3 flex h-[66px] px-3 flex-col items-center justify-center rounded-[12px] bg-[#242424] text-white shadow-sm">
                          <p className="text-[10px] font-semibold uppercase leading-none tracking-[0.1em]">
                            {dateBadgeFormatter.format(startAt).toUpperCase()}
                          </p>
                          <p className="mt-[2px] text-[21px] font-semibold leading-none">
                            {startAt.getDate()}
                          </p>
                          <p className="mt-[2px] text-[9px] font-medium leading-none text-white/80">
                            {startAt.getFullYear()}
                          </p>
                        </div>
                        {event.isFeatured ? (
                          <FeaturedBadge className="absolute right-3 top-3 z-20" />
                        ) : null}
                        <button
                          type="button"
                          aria-label={
                            saved
                              ? `Unsave ${event.title}`
                              : `Save ${event.title}`
                          }
                          aria-pressed={saved}
                          onClick={(clickEvent) => {
                            clickEvent.preventDefault();
                            toggleSave(event.id);
                          }}
                          className={`absolute right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ${
                            event.isFeatured ? "top-[46px]" : "top-3"
                          } ${saved ? "text-ae-accent" : "text-[#595959]"}`}
                        >
                          <Bookmark
                            className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`}
                            strokeWidth={1.8}
                          />
                        </button>
                      </div>

                      <div className="relative z-20 px-5 pb-5 pt-5">
                        <p className="text-[10px] font-bold tracking-[0.16em] text-[#848484]">
                          {event.category?.name.toUpperCase() ?? "EVENT"}
                        </p>
                        <h3 className="mt-2 max-w-[17ch] text-[18px] font-semibold leading-[1.22] text-[#252525]">
                          {event.title}
                        </h3>
                        <p className="mt-3 max-w-[28ch] text-[14px] leading-[1.7] text-[#7C7C7C]">
                          {event.description}
                        </p>

                        <div className="mt-5 border-t border-[#ECE7E0] pt-4">
                          <div className="flex items-center justify-between gap-4">
                            <div className="inline-flex items-center gap-1.5 text-[12px] text-[#7B7B7B]">
                              <MapPin
                                className="h-3.5 w-3.5"
                                strokeWidth={1.8}
                              />
                              {event.isOnline ? "Online" : (event.city ?? "—")}
                            </div>
                            <span className="text-[12.5px] font-medium text-ae-accent">
                              {event.isFree
                                ? "Free"
                                : event.priceFromCents
                                  ? `From $${(event.priceFromCents / 100).toFixed(0)}`
                                  : "—"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {data && data.meta.totalPages > 1 ? (
              <div className="mt-9 flex items-center justify-center gap-2">
                <PagerButton
                  icon={
                    <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
                  }
                  onClick={() =>
                    navigateWith({ page: String(Math.max(1, page - 1)) })
                  }
                />
                {Array.from(
                  { length: data.meta.totalPages },
                  (_, index) => index + 1,
                ).map((pageNumber) => (
                  <PagerButton
                    key={pageNumber}
                    label={String(pageNumber)}
                    active={pageNumber === page}
                    onClick={() => navigateWith({ page: String(pageNumber) })}
                  />
                ))}
                <PagerButton
                  icon={
                    <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                  }
                  onClick={() =>
                    navigateWith({
                      page: String(Math.min(data.meta.totalPages, page + 1)),
                    })
                  }
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

type SingleSelectFilterGroupProps = {
  title: string;
  items: { id: string; label: string }[];
  selectedId?: string;
  onChange: (id: string | undefined) => void;
};

function SingleSelectFilterGroup({
  title,
  items,
  selectedId,
  onChange,
}: SingleSelectFilterGroupProps) {
  return (
    <div className="border-t border-[#E5E1DA] py-5">
      <h3 className="text-[11px] font-bold tracking-[0.12em] text-[#6F6F6F]">
        {title}
      </h3>
      <div className="mt-7 grid gap-[14px]">
        {items.map((item) => (
          <label
            key={item.id}
            className="inline-flex items-center gap-2.5 text-[14px] text-[#5E5E5E] mb-1"
          >
            <input
              type="checkbox"
              checked={selectedId === item.id}
              onChange={() =>
                onChange(selectedId === item.id ? undefined : item.id)
              }
              className="h-[14px] w-[14px] rounded-[3px] border border-[#B9B9B9] accent-ae-accent"
            />
            {item.label}
          </label>
        ))}
      </div>
    </div>
  );
}

type PagerButtonProps = {
  label?: string;
  active?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
};

function PagerButton({
  label,
  active = false,
  icon,
  onClick,
}: PagerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-[30px] min-w-[30px] items-center justify-center rounded-[9px] border text-[12px] font-medium transition-colors ${
        active
          ? "border-[#1F1F1F] bg-[#1F1F1F] px-3 text-white"
          : "border-[#D8D5CE] bg-white px-3 text-ae-muted hover:border-[#BEB7AA]"
      }`}
    >
      {icon ?? label}
    </button>
  );
}
