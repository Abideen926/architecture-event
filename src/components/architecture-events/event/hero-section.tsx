"use client";

import { useState, type ReactNode } from "react";
import { CalendarDays, ChevronDown, MapPin, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { appRoutes } from "@/lib/routes";
import { useGetCategoriesQuery } from "@/features/public/public-api";

export function BrowseHeroSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories } = useGetCategoriesQuery();

  const [openField, setOpenField] = useState<"category" | null>(null);
  const [keyword, setKeyword] = useState(searchParams.get("search") ?? "");
  const [location, setLocation] = useState(searchParams.get("city") ?? "");

  const selectedCategoryId = searchParams.get("categoryId") ?? "";
  const selectedCategoryName =
    categories?.find((category) => category.id === selectedCategoryId)?.name ?? "All types";

  function navigateWith(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(overrides)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const query = params.toString();
    router.push(query ? `${appRoutes.architectureEvents.events}?${query}` : appRoutes.architectureEvents.events);
  }

  function handleSearch() {
    navigateWith({ search: keyword.trim() || undefined, city: location.trim() || undefined });
  }

  return (
    <section className="bg-[var(--mainbackground)] border-b border-[#E7E7E7] pb-10 pt-14">
      <div className="ae-container">
        <div className="ae-browse-shell">
          <p className="ae-section-kicker">BROWSE EVENTS</p>
          <h1 className="ae-browse-title">Find your next event</h1>

          <div className="ae-browse-panel">
            <div className="ae-browse-grid">
              <BrowseField
                label="KEYWORD"
                icon={<Search className="h-[17px] w-[17px] text-[#7B7B7B]" strokeWidth={1.8} />}
              >
                <input
                  type="text"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && handleSearch()}
                  placeholder="Search events, topics, brands"
                  className="w-full border-0 bg-transparent text-[15px] text-[#202020] outline-none placeholder:text-[#8A8A8A]"
                />
              </BrowseField>

              <BrowseField
                label="DATE"
                icon={<CalendarDays className="h-[16px] w-[16px] text-[#7B7B7B]" strokeWidth={1.8} />}
              >
                <select
                  disabled
                  title="Date filtering isn't available yet"
                  className="w-full cursor-not-allowed appearance-none border-0 bg-transparent text-[15px] text-[#8A8A8A] outline-none"
                >
                  <option>Any date</option>
                </select>
              </BrowseField>

              <BrowseField
                label="LOCATION"
                icon={<MapPin className="h-[16px] w-[16px] text-[#7B7B7B]" strokeWidth={1.8} />}
              >
                <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && handleSearch()}
                  placeholder="Any city"
                  className="w-full border-0 bg-transparent text-[15px] text-[#202020] outline-none placeholder:text-[#8A8A8A]"
                />
              </BrowseField>

              <BrowseField
                label="EVENT TYPE"
                icon={null}
                value={selectedCategoryName}
                open={openField === "category"}
                onToggle={() => setOpenField(openField === "category" ? null : "category")}
                options={["All types", ...(categories ?? []).map((c) => c.name)]}
                onSelect={(value) => {
                  const category = categories?.find((c) => c.name === value);
                  navigateWith({ categoryId: category?.id });
                  setOpenField(null);
                }}
              />

              <button type="button" onClick={handleSearch} className="ae-browse-button">
                Search Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type BrowseFieldProps = {
  label: string;
  icon: ReactNode;
  children?: ReactNode;
  value?: string;
  open?: boolean;
  options?: readonly string[];
  onToggle?: () => void;
  onSelect?: (value: string) => void;
};

function BrowseField({
  label,
  icon,
  children,
  value,
  open = false,
  options,
  onToggle,
  onSelect,
}: BrowseFieldProps) {
  return (
    <div className="relative block">
      <span className="ae-browse-field-label">{label}</span>
      <button type="button" className="ae-browse-field w-full" onClick={onToggle}>
        {icon}
        {children ?? (
          <span className="flex w-full items-center justify-between gap-3">
            <span className="text-[15px] text-[#202020]">{value}</span>
            <ChevronDown
              className={`h-[15px] w-[15px] text-[#8A8A8A] transition-transform ${open ? "rotate-180" : ""}`}
              strokeWidth={1.8}
            />
          </span>
        )}
      </button>

      {open && options ? (
        <div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-[14px] border border-[#E7E7E7] bg-white shadow-[0_18px_36px_-24px_rgba(32,32,32,0.24)]">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className="flex h-[44px] w-full items-center px-4 text-left text-[14px] text-[#202020] transition-colors hover:bg-[#FAFAFA]"
              onClick={() => onSelect?.(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
