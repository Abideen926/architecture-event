"use client";

import { Bookmark, Share2 } from "lucide-react";
import { toast } from "sonner";
import type { EventRecord } from "@/features/events/event-types";
import { useRegisterClickThroughMutation } from "@/features/public/public-api";
import { useSaveToggle } from "@/features/attendee/use-save-toggle";
import { getApiErrorMessage } from "@/lib/store/api-error";
import { EventRelatedSection } from "@/components/architecture-events/event/detail/event-related-section";

type EventDetailContentProps = {
  event: EventRecord;
};

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function EventDetailContent({ event }: EventDetailContentProps) {
  const { isSaved, toggleSave, isBusy: isSaving } = useSaveToggle();
  const saved = isSaved(event.id);
  const [registerClickThrough, { isLoading: isRegistering }] = useRegisterClickThroughMutation();

  const stats = [
    { label: "Date", value: dateTimeFormatter.format(new Date(event.startAt)) },
    { label: "Format", value: event.isOnline ? "Online" : "In person" },
    { label: "Category", value: event.category?.name ?? "—" },
    { label: "Industry", value: event.industry?.name ?? "—" },
  ];

  async function handleRegister() {
    try {
      const result = await registerClickThrough(event.id).unwrap();
      window.open(result.registrationUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      toast.error("Couldn't open registration", { description: getApiErrorMessage(error) });
    }
  }

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: event.title, url });
        return;
      } catch {
        // user cancelled the native share sheet — fall through to clipboard
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  }

  return (
    <section className="bg-white pt-10 md:pt-12">
      <div className="ae-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_384px] lg:items-start lg:gap-14">
          <div className="space-y-10 md:space-y-12">
            <section>
              <h2 className="ae-serif text-[clamp(1.7rem,2.1vw,2.2rem)] font-semibold leading-[1] tracking-[-0.04em] text-[#202020]">
                About this event
              </h2>
              <div className="mt-4 space-y-4">
                <p className="max-w-[880px] text-[15px] leading-[1.75] text-[#5F5F5F]">
                  {event.description}
                </p>
              </div>

              <div className="mt-9 overflow-hidden rounded-[18px] border border-[#E6E1D9] bg-white">
                <div className="grid md:grid-cols-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="px-6 py-5 md:px-7 md:py-6">
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

            {event.media && event.media.length > 0 ? (
              <section>
                <h2 className="ae-serif text-[32px] leading-[1.04] tracking-[-0.045em] text-[#202020] md:text-[34px] font-semibold">
                  Photos &amp; video
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {event.media.map((media) => (
                    <div
                      key={media.id}
                      className="overflow-hidden rounded-[18px] border border-[#E6E1D9] bg-[#F2EEE7]"
                    >
                      {media.resourceType === "VIDEO" ? (
                        <video
                          src={media.url}
                          controls
                          className="h-[220px] w-full bg-black object-cover"
                        />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={media.url}
                          alt={event.title}
                          className="h-[220px] w-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {!event.isOnline ? (
              <section>
                <h2 className="ae-serif text-[32px] leading-[1.04] tracking-[-0.045em] text-[#202020] md:text-[34px] font-semibold">
                  Venue
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
                        {event.venueName ?? "Venue TBA"}
                      </h3>
                      <p className="mt-1 text-[13px] text-[#7A7A7A]">
                        {[event.address, event.city, event.state].filter(Boolean).join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-[24px] border border-[#E6E1D9] bg-white p-6 shadow-[0_22px_48px_-36px_rgba(32,32,32,0.22)]">
              <p className="text-[14px] font-medium text-[#7B7B7B]">Starting from</p>
              <div className="my-3 flex items-end gap-2">
                <p className="ae-serif text-[36px] font-semibold leading-[0.92] tracking-[-0.05em] text-[#202020]">
                  {event.isFree ? "Free" : `$${((event.priceFromCents ?? 0) / 100).toFixed(2)}`}
                </p>
              </div>
              <p className="mt-2 text-[15px] leading-[1.55] text-[#7A7A7A]">
                Registration happens on the organizer&apos;s own site.
              </p>

              <button
                type="button"
                onClick={handleRegister}
                disabled={isRegistering}
                className="mt-6 flex h-[54px] w-full items-center justify-center rounded-[14px] bg-[#212121] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#1f1f1f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRegistering ? "Opening..." : "Register"}
              </button>

              <div className="mt-7 grid grid-cols-2 gap-3 border-t pt-4 border-[#E7E7E7]">
                <button
                  type="button"
                  onClick={() => toggleSave(event.id)}
                  disabled={isSaving}
                  aria-pressed={saved}
                  className={`inline-flex h-[46px] items-center justify-center gap-2 rounded-[14px] border px-4 text-[14px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                    saved
                      ? "border-[var(--ae-accent)] bg-[#F1EEE8] text-[var(--ae-accent)]"
                      : "border-[#E2DED7] bg-white text-[#202020]"
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} strokeWidth={1.8} />
                  {saved ? "Saved" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={handleShare}
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
                    {event.organizer?.fullName ?? "—"}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <EventRelatedSection currentEventId={event.id} categoryId={event.categoryId} />
    </section>
  );
}
