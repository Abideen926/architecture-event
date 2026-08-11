import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  List,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import {
  browseEvents,
  eventTypes,
  industryFilters,
  priceFilters,
} from "@/lib/architecture-events/event/browse-events-data";
import { appRoutes } from "@/lib/routes";

export function BrowseMainSection() {
  return (
    <section className="bg-white pb-18 pt-16">
      <div className="mx-auto w-full max-w-[1310px]" style={{ paddingInline: "20px" }}>
        <div className="grid gap-9 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
          <aside className="text-[#3A3A3A]">
            <div className="flex items-center justify-between border-b border-[#E5E1DA] pb-4">
              <h2 className="text-[16px] font-semibold leading-none text-[#2A2A2A]">
                Filters
              </h2>
              <button
                type="button"
                className="text-[12px] font-medium text-[var(--ae-accent)] transition-colors hover:text-[var(--ae-accent-strong)]"
              >
                Clear all
              </button>
            </div>

            <FilterGroup title="EVENT TYPE" items={eventTypes} />
            <FilterGroup title="PRICE" items={priceFilters} />
            <FilterGroup title="INDUSTRY FOCUS" items={industryFilters} />

            <div className="border-t border-[#E5E1DA] pt-5">
              <h3 className="text-[11px] font-bold tracking-[0.12em] text-[#6F6F6F]">
                MAP
              </h3>
              <div className="mt-3 overflow-hidden rounded-[14px] border border-[#E0DDD6] bg-[#F6F3ED]">
                <div className="relative h-[134px] bg-[linear-gradient(180deg,rgba(176,138,69,0.06),rgba(176,138,69,0.02)),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:auto,58px_58px,58px_58px]">
                  <span className="absolute left-[44px] top-[31px] h-3.5 w-3.5 rounded-full bg-[var(--ae-accent)] ring-4 ring-[#DCC89E]/50" />
                  <span className="absolute left-[95px] top-[74px] h-3.5 w-3.5 rounded-full bg-[var(--ae-accent)] ring-4 ring-[#DCC89E]/50" />
                  <button
                    type="button"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[10px] bg-white px-4 py-2 text-[11px] font-medium text-[#2A2A2A] shadow-[0_8px_18px_-16px_rgba(20,20,20,0.5)]"
                  >
                    Open map view
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="flex flex-col gap-5 border-b border-[#E5E1DA] pb-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[14px] text-[#585858]">
                <span className="font-semibold text-[#2A2A2A]">24 events</span>{" "}
                matching your filters
              </p>
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <button
                  type="button"
                  className="inline-flex h-[32px] items-center gap-2 rounded-[10px] border border-[#E0DDD6] bg-white px-4 text-[12px] font-medium text-[#2E2E2E]"
                >
                  Sort: Date (soonest)
                  <ChevronDown className="h-3.5 w-3.5 text-[#6F6F6F]" strokeWidth={1.8} />
                </button>
                <div className="inline-flex overflow-hidden rounded-[10px] border border-[#DAD7D0]">
                  <button
                    type="button"
                    className="inline-flex h-[32px] items-center justify-center gap-1.5 bg-[#1F1F1F] px-4 text-[12px] font-semibold text-white"
                  >
                    <List className="h-3.5 w-3.5" strokeWidth={1.8} />
                    List
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-[32px] items-center justify-center gap-1.5 bg-white px-4 text-[12px] font-medium text-[#6B6B6B]"
                  >
                    Calendar
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {browseEvents.map((event) => (
                <article
                  key={event.id}
                  className="group relative overflow-hidden rounded-[18px] border border-[#DEDEDE] bg-white shadow-[0_16px_28px_-26px_rgba(20,20,20,0.28)]"
                >
                  <Link
                    href={appRoutes.architectureEvents.eventDetail(event.id)}
                    className="absolute inset-0 z-10"
                    aria-label={`Open ${event.title}`}
                  />
                  <div
                    className="relative h-[198px] bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${event.image})` }}
                  >
                    <div className="absolute left-3 top-3 flex h-[66px] w-[66px] flex-col items-center justify-center rounded-[12px] bg-[#242424] text-white shadow-sm">
                      <p className="text-[10px] font-semibold uppercase leading-none tracking-[0.1em]">
                        {event.month}
                      </p>
                      <p className="mt-[2px] text-[21px] font-semibold leading-none">
                        {event.day}
                      </p>
                      <p className="mt-[2px] text-[9px] font-medium leading-none text-white/80">
                        2026
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Save ${event.title}`}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#595959] shadow-sm"
                    >
                      <Bookmark className="h-3.5 w-3.5" strokeWidth={1.8} />
                    </button>
                  </div>

                  <div className="relative z-20 px-5 pb-5 pt-5">
                    <p className="text-[10px] font-bold tracking-[0.16em] text-[#848484]">
                      {event.category}
                    </p>
                    <h3 className="mt-2 max-w-[17ch] text-[18px] font-semibold leading-[1.22] text-[#252525]">
                      {event.title}
                    </h3>
                    <p className="mt-3 max-w-[28ch] text-[14px] leading-[1.7] text-[#7C7C7C]">
                      {event.summary}
                    </p>

                    <div className="mt-5 border-t border-[#ECE7E0] pt-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="inline-flex items-center gap-1.5 text-[12px] text-[#7B7B7B]">
                          <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
                          {event.location}
                        </div>
                        <span className="text-[12.5px] font-medium text-[var(--ae-accent)]">
                          {event.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-9 flex items-center justify-center gap-2">
              <PagerButton icon={<ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.8} />} />
              <PagerButton active label="1" />
              <PagerButton label="2" />
              <PagerButton label="3" />
              <PagerButton icon={<ChevronRight className="h-3.5 w-3.5" strokeWidth={1.8} />} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type FilterGroupProps = {
  title: string;
  items: readonly string[];
};

function FilterGroup({ title, items }: FilterGroupProps) {
  return (
    <div className="border-t border-[#E5E1DA] py-5">
      <h3 className="text-[11px] font-bold tracking-[0.12em] text-[#6F6F6F]">
        {title}
      </h3>
      <div className="mt-4 grid gap-[13px]">
        {items.map((item) => (
          <label
            key={item}
            className="inline-flex items-center gap-2.5 text-[13px] text-[#5E5E5E]"
          >
            <input
              type="checkbox"
              className="h-[14px] w-[14px] rounded-[3px] border border-[#B9B9B9] accent-[var(--ae-accent)]"
            />
            {item}
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
};

function PagerButton({ label, active = false, icon }: PagerButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex h-[30px] min-w-[30px] items-center justify-center rounded-[9px] border text-[12px] font-medium transition-colors ${
        active
          ? "border-[#1F1F1F] bg-[#1F1F1F] px-3 text-white"
          : "border-[#D8D5CE] bg-white px-3 text-[#6A6A6A] hover:border-[#BEB7AA]"
      }`}
    >
      {icon ?? label}
    </button>
  );
}
