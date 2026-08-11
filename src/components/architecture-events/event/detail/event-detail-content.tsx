import { Share2, Star } from "lucide-react";
import type { EventDetail } from "@/lib/architecture-events/event/event-detail-data";
import { EventRelatedSection } from "@/components/architecture-events/event/detail/event-related-section";

type EventDetailContentProps = {
  event: EventDetail;
};

export function EventDetailContent({ event }: EventDetailContentProps) {
  return (
    <section className="bg-white pt-10 md:pt-12">
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

              <div className="mt-9 overflow-hidden rounded-[18px] border border-[#E6E1D9] bg-white">
                <div className="grid  md:grid-cols-4">
                  {event.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="px-6 py-5 md:px-7 md:py-6"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7E7E7E]">
                        {stat.label}
                      </p>
                      <p className="mt-2 text-[17px] font-medium tracking-[-0.02em] text-[#202020]">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="ae-serif text-[30px] font-semibold  leading-[1.04] tracking-[-0.045em] text-[#202020] md:text-[33px]">
                {event.agendaHeading}
              </h2>

              <div className="mt-6 overflow-hidden rounded-[20px] border border-[#E6E1D9] bg-white">
                <div className="border-b border-[#EFE7DB] px-5 py-4 md:px-6 bg-[#FAFAFA]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7F7F7F] ">
                    {event.agendaDayLabel}
                  </p>
                </div>
                <div className="divide-y divide-[#EFE7DB]">
                  {event.agendaItems.map((item) => (
                    <div
                      key={`${item.time}-${item.title}`}
                      className="grid gap-4 px-5 py-5 md:grid-cols-[124px_1fr] md:px-6 md:py-6"
                    >
                      <p className="text-[15px] font-medium tracking-[-0.02em] text-[#666666] md:text-[16px]">
                        {item.time}
                      </p>
                      <div>
                        <p className="text-[16px] font-semibold leading-[1.35] tracking-[-0.02em] text-[#202020] md:text-[17px]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[13px] text-[#7A7A7A] md:text-[14px]">
                          {item.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="ae-serif text-[24px] leading-[1.04] tracking-[-0.045em] text-[#202020] md:text-[34px] ] font-semibold">
                {event.speakersHeading}
              </h2>

              <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {event.speakers.map((speaker, index) => (
                  <article
                    key={`${speaker.name}-${index}`}
                    className=" rounded-[18px] bg-white"
                  >
                    <div className="h-[130px] rounded-[10px] bg-[#F2EDE4]" />
                    <div className="pt-2">
                      <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[#202020]">
                        {speaker.name}
                      </h3>
                      <p className="mt-1 text-[12px] text-[#7C7C7C]">
                        {speaker.title}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2 className="ae-serif text-[32px] leading-[1.04] tracking-[-0.045em] text-[#202020] md:text-[34px] ] font-semibold">
                {event.venueHeading}
              </h2>
              <div className="mt-6 overflow-hidden rounded-[22px] border border-[#E6E1D9] bg-white p-0 shadow-[0_20px_40px_-36px_rgba(32,32,32,0.3)]">
                <div className="relative overflow-hidden rounded-t-[22px] bg-[#EFE8DB]">
                  <div className="flex min-h-[262px] items-center justify-center bg-[linear-gradient(180deg,#F5F1EA_0%,#F0ECE5_100%)]">
                    <div className="h-5 w-5 rounded-full border-4 border-[#C79A4D] bg-white shadow-[0_0_0_10px_rgba(199,154,77,0.14)]" />
                  </div>
                </div>
                <div className="flex flex-col gap-4 border-t border-[#EDE7DE] px-5 py-5 md:flex-row md:items-center md:justify-between md:px-6">
                  <div className="min-w-0">
                    <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-[#202020]">
                      {event.venueName}
                    </h3>
                    <p className="mt-1 text-[13px] text-[#7A7A7A]">
                      {event.venueAddress}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-[40px] shrink-0 items-center justify-center rounded-[12px] border border-[#E2DED7] bg-white px-5 text-[14px] font-medium text-[#202020]"
                  >
                    Get directions
                  </button>
                </div>
              </div>
            </section>

            <section>
              <h2 className="ae-serif text-[32px] leading-[1.04] tracking-[-0.045em] text-[#202020] md:text-[34px] ] font-semibold">
                {event.sponsorsHeading}
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {event.sponsors.map((sponsor, index) => (
                  <div
                    key={`${sponsor}-${index}`}
                    className="flex min-h-[84px] items-center justify-center rounded-[16px] border border-[#E2DED7] bg-white px-4 text-center text-[14px] font-medium tracking-[-0.01em] text-[#747474]"
                  >
                    {sponsor}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-[24px] border border-[#E6E1D9] bg-white p-6 shadow-[0_22px_48px_-36px_rgba(32,32,32,0.22)]">
              <p className="text-[14px] font-medium text-[#7B7B7B]">
                {event.priceLabel}
              </p>
              <div className="my-3 flex items-end gap-2">
                <p className="ae-serif text-[36px] font-semibold leading-[0.92] tracking-[-0.05em] text-[#202020]">
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

              <div className="mt-7 grid grid-cols-2 gap-3 border-t pt-4 border-[#E7E7E7]">
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
        <EventRelatedSection event={event} />
    </section>
  );
}
