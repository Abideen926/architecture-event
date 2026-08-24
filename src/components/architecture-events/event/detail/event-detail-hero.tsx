import Link from "next/link";
import { appRoutes } from "@/lib/routes";
import type { EventRecord } from "@/features/events/event-types";

type EventDetailHeroProps = {
  event: EventRecord;
};

export function EventDetailHero({ event }: EventDetailHeroProps) {
  const heroImage =
    event.media?.find((m) => m.isThumbnail)?.url ?? event.media?.[0]?.url;

  return (
    <section className="relative min-h-[482px] overflow-hidden bg-[#111111] text-white md:h-[482px]">
      <div className="absolute inset-0">
        {heroImage ? (
          <img
            src={heroImage}
            alt={event.title}
            className="h-full w-full object-cover object-center opacity-[0.62]"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.38)_100%)]" />
      </div>

      <div className="ae-container relative h-full">
        <div className="max-w-[1200px] pt-10 md:pt-11">
          <div className="text-[13px] font-medium tracking-[0.01em] text-white/82">
            <Link
              href={appRoutes.architectureEvents.root}
              className="transition-colors hover:text-white"
            >
              Home
            </Link>
            <span className="px-3 text-white/45">/</span>
            <Link
              href={appRoutes.architectureEvents.events}
              className="transition-colors hover:text-white"
            >
              Events
            </Link>
            <span className="px-3 text-white/45">/</span>
            <span className="font-semibold text-white">{event.title}</span>
          </div>

          <div className="absolute bottom-0">
            <div className="pb-10 md:pb-11">
              <div className="inline-flex items-center gap-3">
                <span className="rounded-[10px] bg-ae-accent px-4 py-[11px] text-[11px] font-bold uppercase tracking-[0.17em] text-white">
                  {event.category?.name ?? "Event"}
                </span>
                {event.isFeatured ? (
                  <span className="rounded-[10px] bg-[#2B2B2B] px-4 py-[11px] text-[11px] font-semibold tracking-[0.05em] text-white">
                    Featured
                  </span>
                ) : null}
              </div>

              <h1 className="ae-serif mt-4 max-w-[760px] text-[clamp(3.7rem,4.2vw,4.1rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
                {event.title}
              </h1>

              <p className="mt-4 max-w-[760px] text-[18px] leading-[1.35] text-white/86 md:text-[19px]">
                {event.isOnline
                  ? "Online"
                  : [event.venueName, event.city, event.state]
                      .filter(Boolean)
                      .join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
