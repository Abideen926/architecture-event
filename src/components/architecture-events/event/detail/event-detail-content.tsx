import Link from "next/link";
import { ArrowRight, Share2, Star } from "lucide-react";
import type { EventDetail } from "@/lib/architecture-events/event/event-detail-data";
import { appRoutes } from "@/lib/routes";

type EventDetailContentProps = {
  event: EventDetail;
};

export function EventDetailContent({ event }: EventDetailContentProps) {
  return (
    <section className="bg-white py-10 md:py-12">
      <div className="ae-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_384px] lg:items-start lg:gap-14">
          <div className="space-y-10 md:space-y-12">
            <section>
              <h2 className="ae-serif text-[clamp(1.7rem,2.1vw,2.2rem)] font-semibold leading-[1] tracking-[-0.04em] text-[#202020]">
                {event.aboutHeading}
              </h2>
              <div className="mt-4 space-y-4">
                {event.about.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-[880px] text-[15px] leading-[1.75] text-[#5F5F5F]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {event.stats.map((stat) => (
                  <StatCard key={stat.label} label={stat.label} value={stat.value} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="ae-serif text-[24px] leading-[1.04] tracking-[-0.045em] text-[#202020] md:text-[26px]">
                {event.agendaHeading}
              </h2>

              <div className="mt-6 overflow-hidden rounded-[18px] border border-[#E6E1D9] bg-white">
                <div className="border-b border-[#EFE7DB] px-5 py-4 md:px-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7F7F7F]">
                    {event.agendaDayLabel}
                  </p>
                </div>
                <div className="divide-y divide-[#EFE7DB]">
                  {event.agendaItems.map((item) => (
                    <div
                      key={`${item.time}-${item.title}`}
                      className="grid gap-4 px-5 py-4 md:grid-cols-[96px_1fr] md:px-6 md:py-5"
                    >
                      <p className="text-[13px] font-medium tracking-[-0.02em] text-[#666666] md:text-[14px]">
                        {item.time}
                      </p>
                      <div>
                        <p className="text-[13px] font-semibold leading-[1.35] tracking-[-0.02em] text-[#202020] md:text-[14px]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[11px] text-[#7A7A7A] md:text-[12px]">
                          {item.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="ae-serif text-[24px] leading-[1.04] tracking-[-0.045em] text-[#202020] md:text-[26px]">
                {event.speakersHeading}
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {event.speakers.map((speaker, index) => (
                  <article
                    key={`${speaker.name}-${index}`}
                    className="overflow-hidden rounded-[18px] bg-white"
                  >
                    <div className="h-[68px] rounded-[10px] bg-[#F2EDE4]" />
                    <div className="pt-2">
                      <h3 className="text-[11px] font-semibold tracking-[-0.01em] text-[#202020]">
                        {speaker.name}
                      </h3>
                      <p className="mt-1 text-[10px] text-[#7C7C7C]">
                        {speaker.title}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="ae-serif text-[24px] leading-[1.04] tracking-[-0.045em] text-[#202020] md:text-[26px]">
                {event.venueHeading}
              </h2>
              <div className="mt-5 overflow-hidden rounded-[18px] border border-[#E6E1D9] bg-white p-3 shadow-[0_20px_40px_-36px_rgba(32,32,32,0.3)]">
                <div className="relative overflow-hidden rounded-[18px] bg-[#EFE8DB]">
                  <div className="flex min-h-[186px] items-center justify-center bg-[radial-gradient(circle_at_50%_50%,rgba(193,149,69,0.25)_0,rgba(193,149,69,0.15)_18%,rgba(239,232,219,0.95)_45%,#EFE8DB_70%)]">
                    <div className="h-5 w-5 rounded-full border-4 border-[#C79A4D] bg-white shadow-[0_0_0_10px_rgba(199,154,77,0.14)]" />
                  </div>
                </div>
                <div className="flex flex-col gap-3 px-2 pb-1 pt-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-[11px] font-semibold tracking-[-0.01em] text-[#202020]">
                      {event.venueName}
                    </h3>
                    <p className="mt-1 text-[9px] text-[#7A7A7A]">
                      {event.venueAddress}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-[24px] items-center justify-center rounded-[8px] border border-[#E2DED7] bg-white px-3 text-[9px] font-medium text-[#202020]"
                  >
                    Get directions
                  </button>
                </div>
              </div>
            </section>

            <section>
              <h2 className="ae-serif text-[24px] leading-[1.04] tracking-[-0.045em] text-[#202020] md:text-[26px]">
                {event.sponsorsHeading}
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {event.sponsors.map((sponsor, index) => (
                  <div
                    key={`${sponsor}-${index}`}
                    className="flex min-h-[26px] items-center justify-center rounded-[9px] border border-[#E2DED7] bg-white px-3 py-2 text-center text-[9px] font-medium tracking-[-0.01em] text-[#747474]"
                  >
                    {sponsor}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-end justify-between gap-6">
                <h2 className="ae-serif text-[24px] leading-[1.04] tracking-[-0.045em] text-[#202020] md:text-[26px]">
                  {event.relatedHeading}
                </h2>
                <Link
                  href={appRoutes.architectureEvents.events}
                  className="hidden items-center gap-2 text-[14px] font-semibold text-[var(--ae-accent)] transition-colors hover:text-[var(--ae-accent-strong)] md:inline-flex"
                >
                  {event.relatedViewAllLabel}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                </Link>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {event.relatedEvents.map((item) => (
                  <Link
                    key={item.id}
                    href={appRoutes.architectureEvents.eventDetail(item.id)}
                    className="group overflow-hidden rounded-[24px] border border-[#E8E0D3] bg-white shadow-[0_18px_36px_-30px_rgba(32,32,32,0.28)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-[1.55] overflow-hidden bg-[#D8D0C2]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute left-4 top-4 rounded-[16px] border border-white/16 bg-[#171717]/88 px-3 py-2 text-white shadow-[0_12px_30px_-18px_rgba(0,0,0,0.85)]">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/72">
                          {item.month}
                        </p>
                        <p className="mt-1 text-[20px] font-semibold leading-none">
                          {item.day}
                        </p>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-[#202020]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[14px] text-[#6A6A6A]">
                        {item.location}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-[24px] border border-[#E6E1D9] bg-white p-6 shadow-[0_22px_48px_-36px_rgba(32,32,32,0.22)]">
              <p className="text-[14px] font-medium text-[#7B7B7B]">
                {event.priceLabel}
              </p>
              <div className="mt-1 flex items-end gap-2">
                <p className="ae-serif text-[56px] leading-[0.92] tracking-[-0.05em] text-[#202020]">
                  {event.price}
                </p>
              </div>
              <p className="mt-2 text-[15px] leading-[1.55] text-[#7A7A7A]">
                {event.priceNote}
              </p>

              <button
                type="button"
                className="mt-6 flex h-[54px] w-full items-center justify-center rounded-[14px] bg-[#212121] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#1f1f1f]"
              >
                {event.ctaLabel}
              </button>

              <p className="mt-4 text-center text-[14px] text-[#7A7A7A]">
                {event.ctaNote}
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[14px] border border-[#E2DED7] bg-white px-4 text-[14px] font-medium text-[#202020]"
                >
                  <Star className="h-4 w-4" strokeWidth={1.8} />
                  Save
                </button>
                <button
                  type="button"
                  className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[14px] border border-[#E2DED7] bg-white px-4 text-[14px] font-medium text-[#202020]"
                >
                  <Share2 className="h-4 w-4" strokeWidth={1.8} />
                  Share
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[#E6E1D9] bg-white p-5 shadow-[0_22px_48px_-42px_rgba(32,32,32,0.16)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7D7D7D]">
                Organizer
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-[12px] bg-[#F2EEE7]" />
                <div>
                  <p className="text-[17px] font-semibold tracking-[-0.02em] text-[#202020]">
                    {event.organizerName}
                  </p>
                  <p className="mt-1 text-[14px] text-[#6D6D6D]">
                    {event.organizerEvents}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="mt-5 flex h-[42px] w-full items-center justify-center rounded-[14px] border border-[#E2DED7] bg-white text-[14px] font-medium text-[#202020]"
              >
                View organizer profile
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

type StatCardProps = {
  label: string;
  value: string;
};

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-[20px] border border-[#E6E1D9] bg-white px-5 py-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7A7A7A]">
        {label}
      </p>
      <p className="mt-2 text-[16px] font-semibold tracking-[-0.02em] text-[#202020]">
        {value}
      </p>
    </div>
  );
}

