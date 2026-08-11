"use client";

import { useState, type ReactNode } from "react";
import { CalendarDays, ChevronDown, MapPin, Search } from "lucide-react";
import {
  browseEvents,
  eventTypes,
} from "@/lib/architecture-events/event/browse-events-data";

const browseDates = ["Any date", "This month", "Next 3 months", "Later in 2026"];
const browseLocations = [
  "All locations",
  ...new Set(browseEvents.map((event) => event.location)),
];
const browseTypes = ["All types", ...eventTypes];

export function BrowseHeroSection() {
  const [openField, setOpenField] = useState<"date" | "location" | "type" | null>(null);
  const [selectedDate, setSelectedDate] = useState(browseDates[0]);
  const [selectedLocation, setSelectedLocation] = useState(browseLocations[0]);
  const [selectedType, setSelectedType] = useState(browseTypes[0]);

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
                  placeholder="Search events, topics, brands"
                  className="w-full border-0 bg-transparent text-[15px] text-[#202020] outline-none placeholder:text-[#8A8A8A]"
                />
              </BrowseField>

              <BrowseField
                label="DATE"
                icon={
                  <CalendarDays
                    className="h-[16px] w-[16px] text-[#7B7B7B]"
                    strokeWidth={1.8}
                  />
                }
                value={selectedDate}
                open={openField === "date"}
                onToggle={() => setOpenField(openField === "date" ? null : "date")}
                options={browseDates}
                onSelect={(value) => {
                  setSelectedDate(value);
                  setOpenField(null);
                }}
              />

              <BrowseField
                label="LOCATION"
                icon={<MapPin className="h-[16px] w-[16px] text-[#7B7B7B]" strokeWidth={1.8} />}
                value={selectedLocation}
                open={openField === "location"}
                onToggle={() => setOpenField(openField === "location" ? null : "location")}
                options={browseLocations}
                onSelect={(value) => {
                  setSelectedLocation(value);
                  setOpenField(null);
                }}
              />

              <BrowseField
                label="EVENT TYPE"
                icon={null}
                value={selectedType}
                open={openField === "type"}
                onToggle={() => setOpenField(openField === "type" ? null : "type")}
                options={browseTypes}
                onSelect={(value) => {
                  setSelectedType(value);
                  setOpenField(null);
                }}
              />

              <button type="button" className="ae-browse-button">
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
