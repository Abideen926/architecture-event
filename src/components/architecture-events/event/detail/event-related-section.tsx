import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { EventDetail } from "@/lib/architecture-events/event/event-detail-data";
import { appRoutes } from "@/lib/routes";

type EventRelatedSectionProps = {
  event: EventDetail;
};

const relatedCardDetails: Record<string, { category: string; dateLabel: string }> = {
  "aia-conference": {
    category: "CONFERENCE",
    dateLabel: "MAY 22-24, 2026",
  },
  "next-acuity": {
    category: "PRODUCT SHOWCASE",
    dateLabel: "JUN 05, 2026",
  },
  "women-in-architecture": {
    category: "NETWORKING EVENT",
    dateLabel: "JUL 10, 2026",
  },
};

export function EventRelatedSection({ event }: EventRelatedSectionProps) {
  return (
    <section className="border-y border-[#E7E7E7] bg-[#FAFAFA] py-10 md:py-23 mt-15">
      <div className="ae-container">
        <div className="flex items-end justify-between gap-6">
          <h2 className="ae-serif text-[32px] leading-[1.04] tracking-[-0.045em] text-[#202020] md:text-[33px] font-semibold  mb-4">
            {event.relatedHeading}
          </h2>
          <Link
            href={appRoutes.architectureEvents.events}
            className="hidden items-center gap-2 text-[14px] font-semibold !text-[var(--ae-accent)] transition-colors !hover:text-[var(--ae-accent-strong)] md:inline-flex"
          >
            {event.relatedViewAllLabel}
            <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {event.relatedEvents.map((item) => {
            const details = relatedCardDetails[item.id];

            return (
              <Link
                key={item.id}
                href={appRoutes.architectureEvents.eventDetail(item.id)}
                className="group overflow-hidden rounded-[18px] border border-[#E7E1D6] bg-white shadow-[0_10px_24px_-22px_rgba(32,32,32,0.18)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative h-[176px] overflow-hidden bg-[#D8D0C2]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="px-5 pb-5 pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7F7F7F]">
                    {details?.category ?? "EVENT"}
                  </p>
                  <h3 className="mt-2 text-[18px] font-semibold tracking-[-0.02em] text-[#202020]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.55] text-[#7A7A7A]">
                    {details?.dateLabel ?? ""}{" "}
                    <span aria-hidden="true">{String.fromCharCode(183)}</span>{" "}
                    {item.location}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
