"use client";

import { Bookmark, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { attendeeSavedEvents } from "@/lib/attendee/attendee-data";
import { appRoutes } from "@/lib/routes";

export function AttendeeSavedPage() {
  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const savedEvents = attendeeSavedEvents.filter((event) => !removedIds.includes(event.id));

  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#E7E7E7] pb-5">
        <div>
          <h2 className="ae-serif text-[30px] font-semibold tracking-[-0.015em] text-[#202020]">
            Saved Events
          </h2>
          <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
            {savedEvents.length === 0
              ? "No events saved"
              : savedEvents.length === 1
                ? "1 event saved"
                : `${savedEvents.length} events saved`}
          </p>
        </div>
        <Link
          href={appRoutes.architectureEvents.events}
          className="text-[14.5px] font-semibold text-[var(--ae-accent)] transition-colors hover:text-[var(--ae-accent-strong)]"
        >
          Browse all events {"->"}
        </Link>
      </div>

      {savedEvents.length > 0 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {savedEvents.map((event) => (
            <article
              key={event.id}
              className="overflow-hidden rounded-[18px] border border-[#E7E7E7] bg-white transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(20,20,20,0.24)]"
            >
              <div className="relative h-[168px] overflow-hidden">
                <SavedEventArt eventId={event.id} />
                <div className="absolute left-4 top-4 rounded-[14px] bg-[#232323] px-[13px] py-[10px] text-white shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
                  <div className="text-[12px] font-bold leading-none tracking-[0.06em]">
                    {event.month}
                  </div>
                  <div className="mt-[3px] text-[37px] font-bold leading-[0.9]">{event.day}</div>
                  <div className="mt-[6px] text-[12px] font-medium leading-none text-white/86">
                    {event.year}
                  </div>
                </div>
                <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--ae-accent)] shadow-[0_8px_18px_rgba(0,0,0,0.1)]">
                  <Bookmark className="h-[16px] w-[16px] fill-current" strokeWidth={1.6} />
                </span>
              </div>

              <div className="px-[18px] pb-[16px] pt-[15px]">
                <p className="text-[11px] font-bold tracking-[0.16em] text-[#7A7A7A]">
                  {event.category}
                </p>
                <h3 className="mt-[8px] min-h-[74px] text-[18px] font-bold leading-[1.18] tracking-[-0.02em] text-[#2B2B2B]">
                  {event.title}
                </h3>
                <div className="mt-[14px] flex items-center justify-between gap-4 border-t border-[#ECECEC] pt-[12px] text-[14.5px] text-[#6A6A6A]">
                  <span className="flex items-center gap-[7px]">
                    <MapPin className="h-[14px] w-[14px]" strokeWidth={1.7} />
                    {event.city}
                  </span>
                  <button
                    type="button"
                    onClick={() => setRemovedIds((current) => [...current, event.id])}
                    className="font-medium text-[#5F5F5F] transition-colors hover:text-[#202020]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-[26px] rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] px-10 py-[76px] text-center">
          <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#E7E7E7] bg-[#F1EEE8] text-[var(--ae-accent)]">
            <Bookmark className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <h3 className="ae-serif mt-[22px] text-[27px] font-semibold tracking-[-0.015em] text-[#202020]">
            Nothing saved yet
          </h3>
          <p className="mx-auto mt-[13px] max-w-[46ch] text-[16px] leading-[1.75] text-[#6A6A6A]">
            Tap the bookmark on any event and it will wait for you here with a reminder
            before registration closes.
          </p>
          <Link
            href={appRoutes.architectureEvents.events}
            className="mt-7 inline-block rounded-[12px] bg-[#1E1E1E] px-7 py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-black"
          >
            Browse Events
          </Link>
        </div>
      )}
    </div>
  );
}

type SavedEventArtProps = {
  eventId: string;
};

function SavedEventArt({ eventId }: SavedEventArtProps) {
  if (eventId === "e1") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#1d94ba]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b81a9] via-[#1598bd] to-[#77c0d3]" />
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            // The repeated arcs mimic the architectural lattice in the reference card.
            key={`wave-${index}`}
            className="absolute left-[-6%] right-[-6%] rounded-[999px] border-[3px] border-[#dceef0]"
            style={{
              bottom: `${-44 + index * 9}px`,
              height: `${98 + index * 8}px`,
              transform: "rotate(-10deg)",
              opacity: 0.96,
            }}
          />
        ))}
      </div>
    );
  }

  if (eventId === "e2") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#d9e9f4]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#dbeaf4] via-[#f6f8fb] to-[#c7dfef]" />
        <div className="absolute left-0 top-0 h-full w-[24%] bg-[#d2dbe3]" />
        <div className="absolute left-[20%] top-0 h-full w-[3px] bg-[#edf2f6]" />
        <div className="absolute left-[27%] top-0 h-full w-[19%] bg-[#f4f6f8]" />
        <div className="absolute left-[31%] top-0 h-full w-[2px] bg-[#d7dde4]" />
        <div className="absolute left-[39%] top-0 h-full w-[2px] bg-[#d7dde4]" />
        <div className="absolute left-[47%] top-0 h-full w-[37%] bg-[#ffffff]" />
        <div className="absolute left-[47%] top-[26%] h-[10px] w-[37%] bg-[#eef2f5]" />
        <div className="absolute left-[58%] top-[16%] h-[52%] w-[18%] bg-[#f9fafb]" />
        <div className="absolute bottom-0 right-[-4%] h-[48%] w-[44%] origin-bottom-left -skew-x-[28deg] bg-[#f8f8f8] shadow-[-10px_0_0_#d5d8dc]" />
      </div>
    );
  }

  if (eventId === "e3") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#14121b]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#18141d] via-[#0f1118] to-[#251534]" />
        {Array.from({ length: 42 }).map((_, index) => (
          <span
            key={`light-${index}`}
            className="absolute rounded-full bg-[#d7d5c8]"
            style={{
              left: `${(index * 11) % 100}%`,
              top: `${(index * 7) % 34}%`,
              width: `${4 + (index % 3)}px`,
              height: `${4 + (index % 3)}px`,
              opacity: 0.35 + (index % 4) * 0.12,
              filter: "blur(0.2px)",
            }}
          />
        ))}
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={`audience-${index}`}
            className="absolute bottom-0 rounded-t-full"
            style={{
              left: `${index * 5.7}%`,
              width: `${18 + (index % 4) * 4}px`,
              height: `${32 + (index % 6) * 6}px`,
              background:
                index % 3 === 0
                  ? "#3f6fa2"
                  : index % 3 === 1
                    ? "#62487b"
                    : "#24262d",
            }}
          />
        ))}
      </div>
    );
  }

  if (eventId === "e4") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#e5dcd2]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#cdc2b4] via-[#f4ece6] to-[#b7976f]" />
        <div className="absolute left-0 top-0 h-[18%] w-full bg-[#d5ccbf]" />
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`ceiling-${index}`}
            className="absolute top-[7%] h-[22px] w-[12%] bg-[#eee7df] shadow-[0_0_0_1px_rgba(80,60,40,0.08)]"
            style={{ left: `${8 + index * 14}%` }}
          />
        ))}
        <div className="absolute inset-y-0 right-0 w-[28%] bg-gradient-to-l from-[#e9ddd3] to-transparent" />
        <div className="absolute bottom-0 left-0 h-[28%] w-full bg-gradient-to-t from-[#74634d] to-transparent" />
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={`chair-${index}`}
            className="absolute bottom-[14%] w-[8%] rounded-t-[8px] bg-[#7b694f]"
            style={{
              left: `${12 + index * 11}%`,
              height: `${42 + (index % 2) * 8}px`,
              transform: "perspective(40px) rotateX(6deg)",
            }}
          />
        ))}
      </div>
    );
  }

  if (eventId === "e5") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#dde9f3]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#cddceb] via-[#edf4fa] to-[#f6f8fa]" />
        <div className="absolute bottom-0 left-[18%] h-[72%] w-[34%] origin-bottom-left skew-x-[-34deg] bg-[#d7e0ea] shadow-[0_0_0_1px_rgba(120,140,160,0.18)]" />
        <div className="absolute bottom-0 left-[36%] h-[56%] w-[25%] origin-bottom-left skew-x-[-34deg] bg-[#f7fafc] shadow-[0_0_0_1px_rgba(120,140,160,0.12)]" />
        <div className="absolute bottom-0 left-[46%] h-[78%] w-[17%] origin-bottom-left skew-x-[-34deg] bg-[#d9e2ea]" />
        <div className="absolute bottom-0 left-[53%] h-[28%] w-[16%] origin-bottom-left skew-x-[28deg] bg-[#edf3f8]" />
        <div className="absolute bottom-[20%] left-[45%] h-[11%] w-[4%] bg-[#7d8a98]" />
        <div className="absolute bottom-0 left-0 h-[12%] w-full bg-white/55" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#e8d7d8]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f1d9df] via-[#f2e6ea] to-[#c27f64]" />
      <div className="absolute bottom-0 left-0 h-[48%] w-full bg-gradient-to-t from-[#b45f4b] to-transparent" />
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={`building-${index}`}
          className="absolute bottom-0 bg-[#6b6f79]"
          style={{
            left: `${index * 9.4}%`,
            width: `${20 + (index % 3) * 7}px`,
            height: `${34 + (index % 5) * 14}px`,
          }}
        />
      ))}
      <div className="absolute bottom-0 left-[63%] h-[72%] w-[8%] bg-[#3e434d]" />
      <div className="absolute bottom-0 left-[74%] h-[58%] w-[6%] bg-[#4c515c]" />
      <div className="absolute bottom-0 left-[82%] h-[44%] w-[10%] bg-[#595e68]" />
    </div>
  );
}
