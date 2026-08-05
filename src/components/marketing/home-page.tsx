import Link from "next/link";
import {
  brandSpotlights,
  featuredEvents,
  heroKeywordSuggestions,
  valuePoints,
} from "@/lib/marketing/home-data";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function HomePage() {
  return (
    <div className="ae-shell">
      <SiteHeader />

      <main>
        <HeroSection />
        <BrandSpotlightSection />
        <FeaturedEventsSection />
        <ValueSection />
        <NewsletterSection />
      </main>

      <SiteFooter />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#1E1E1E]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,69,0.36),transparent_25%),linear-gradient(120deg,rgba(24,24,24,0.96)_8%,rgba(24,24,24,0.78)_52%,rgba(24,24,24,0.38)_100%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />
          here should be background image not background color 
      <div className="ae-container relative px-20 pb-0 pt-24 lg:min-h-[620px]">
        <div className="max-w-[760px]">
          <h1 className="ae-serif max-w-[12ch] text-balance text-[52px] leading-[0.98] tracking-[-0.02em] text-white md:text-[64px] xl:text-[78px]">
            Discover Architecture Events
          </h1>
          <p className="mt-7 max-w-[46ch] text-[16px] leading-[1.7] text-white/82 md:text-[17.5px]">
            Connecting architects, engineers, contractors, manufacturers,
            designers, and BIM/VDC professionals through conferences, networking
            events, product showcases, and educational programs.
          </p>
        </div>

        <div className="relative mt-14 translate-y-14 rounded-[20px] border border-[#E7E7E7] bg-white px-5 py-6 shadow-[0_24px_60px_-30px_rgba(20,20,20,0.35)] md:px-7 md:py-[26px]">
          <div className="grid gap-[22px] xl:grid-cols-[1.6fr_1fr_1fr_auto] xl:items-end">
            <HeroField
              label="KEYWORD"
              icon={
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6A6A6A"
                  strokeWidth="1.7"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M16.5 16.5 21 21" />
                </svg>
              }
            >
              <input
                type="text"
                placeholder="Search events, topics, brands, or venues"
                className="w-full border-0 bg-transparent text-[15px] text-[#202020] outline-none placeholder:text-[#6A6A6A]"
              />
            </HeroField>

            <HeroField
              label="DATE"
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6A6A6A"
                  strokeWidth="1.7"
                >
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 10h18M8 3v4M16 3v4" />
                </svg>
              }
            >
              <select className="w-full appearance-none border-0 bg-transparent text-[15px] text-[#202020] outline-none">
                <option>Select date</option>
                <option>This month</option>
                <option>Next 3 months</option>
                <option>Later in 2026</option>
              </select>
            </HeroField>

            <HeroField
              label="LOCATION"
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6A6A6A"
                  strokeWidth="1.7"
                >
                  <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.6" />
                </svg>
              }
            >
              <select className="w-full appearance-none border-0 bg-transparent text-[15px] text-[#202020] outline-none">
                <option>All locations</option>
                <option>Boston, MA</option>
                <option>Chicago, IL</option>
                <option>New York, NY</option>
                <option>San Diego, CA</option>
              </select>
            </HeroField>

            <Link
              href="/events"
              className="inline-flex h-[52px] items-center justify-center rounded-xl bg-[#1E1E1E] px-7 text-[15px] font-semibold !text-white transition-colors hover:bg-black"
            >
              Search Events
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="mt-5 block w-full border-2 border-[#6A6A6A]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandSpotlightSection() {
  return (
    <section className="bg-white pt-36">
      <div className="ae-container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[700px]">
            <p className="text-[11.5px] font-bold tracking-[0.13em] text-[#B08A45]">
              BRAND SPOTLIGHT
            </p>
            <h2 className="ae-serif mt-4 max-w-[14ch] text-[38px] leading-[1.08] tracking-[-0.02em] text-[#202020] md:text-[46px]">
              Brands shaping the future of the built world.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[16.5px] leading-[1.75] text-[#6A6A6A]">
              Discover innovative products, materials, and systems from leading
              brands in the AEC industry.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex h-[50px] items-center justify-center rounded-xl border border-[#E7E7E7] px-6 text-[14.5px] font-semibold text-[#202020] transition-colors hover:border-[#202020]"
          >
            View all brands
          </Link>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          {brandSpotlights.map((brand) => (
            <article
              key={brand.id}
              className="rounded-[20px] border border-[#E7E7E7] bg-white p-6 shadow-[0_16px_34px_-26px_rgba(20,20,20,0.32)]"
            >
              <div
                className="flex h-[220px] items-end rounded-[18px] p-6"
                style={{
                  background: `linear-gradient(135deg, ${brand.accent} 0%, rgba(30,30,30,0.92) 100%)`,
                }}
              >
                <div className="rounded-full border border-white/22 bg-white/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/88">
                  {brand.token} {brand.name}
                </div>
              </div>
              <h3 className="mt-5 text-[20px] font-semibold leading-[1.35] text-[#202020]">
                {brand.headline}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-[#6A6A6A]">
                {brand.summary}
              </p>
              <Link
                href="/events"
                className="mt-5 inline-flex text-[14.5px] font-semibold text-[#B08A45] transition-colors hover:text-[#94733A]"
              >
                View Spotlight
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedEventsSection() {
  return (
    <section className="bg-white py-24">
      <div className="ae-container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[680px]">
            <p className="text-[11.5px] font-bold tracking-[0.13em] text-[#B08A45]">
              FEATURED EVENTS
            </p>
            <h2 className="ae-serif mt-4 max-w-[15ch] text-[38px] leading-[1.08] tracking-[-0.02em] text-[#202020] md:text-[46px]">
              Curated events. Meaningful connections.
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex h-[50px] items-center justify-center rounded-xl border border-[#E7E7E7] px-6 text-[14.5px] font-semibold text-[#202020] transition-colors hover:border-[#202020]"
          >
            View all events
          </Link>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-4">
          {featuredEvents.map((event) => (
            <article
              key={event.id}
              className="rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#E7E7E7] pb-5">
                <div>
                  <p className="text-[11.5px] font-bold tracking-[0.13em] text-[#B08A45]">
                    {event.month}
                  </p>
                  <p className="mt-1 text-[28px] font-semibold leading-none text-[#202020]">
                    {event.day}
                  </p>
                  <p className="mt-2 text-[12px] font-semibold tracking-[0.1em] text-[#6A6A6A]">
                    2026
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Save ${event.title}`}
                  className="rounded-full border border-[#E7E7E7] p-2 text-[#6A6A6A] transition-colors hover:border-[#202020] hover:text-[#202020]"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M6 4h12v17l-6-4.5L6 21z" />
                  </svg>
                </button>
              </div>
              <p className="mt-5 text-[11.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
                {event.category}
              </p>
              <h3 className="mt-3 text-[21px] font-semibold leading-[1.35] text-[#202020]">
                {event.title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.75] text-[#6A6A6A]">
                {event.summary}
              </p>
              <p className="mt-4 text-[14.5px] font-medium text-[#202020]">
                {event.location}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueSection() {
  return (
    <section className="bg-[#FAFAFA] py-24">
      <div className="ae-container">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {valuePoints.map((point, index) => (
            <article
              key={point.title}
              className="rounded-[20px] border border-[#E7E7E7] bg-white p-7 shadow-[0_16px_34px_-26px_rgba(20,20,20,0.24)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E1E1E] text-[15px] font-semibold text-white">
                0{index + 1}
              </div>
              <h3 className="mt-5 text-[20px] font-semibold text-[#202020]">
                {point.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-[#6A6A6A]">
                {point.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="bg-white py-24">
      <div className="ae-container">
        <div className="rounded-[28px] bg-[#1E1E1E] px-6 py-10 text-white md:px-10 md:py-12 xl:px-14 xl:py-14">
          <div className="grid gap-10 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
            <div className="max-w-[700px]">
              <p className="text-[11.5px] font-bold tracking-[0.13em] text-[#B08A45]">
                NEWSLETTER
              </p>
              <h2 className="ae-serif mt-4 max-w-[16ch] text-[38px] leading-[1.08] tracking-[-0.02em] text-white md:text-[46px]">
                The events worth your time, once a month.
              </h2>
              <p className="mt-4 max-w-[48ch] text-[16.5px] leading-[1.75] text-white/74">
                A short, curated email with upcoming conferences, product
                showcases, and educational programs across the AEC industry. No
                noise, unsubscribe anytime.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/6 p-6 md:p-7">
              <label className="block">
                <span className="mb-3 block text-[13.5px] font-semibold text-white">
                  Email address
                </span>
                <input
                  type="email"
                  placeholder="you@studio.com"
                  className="h-[54px] w-full rounded-xl border border-white/18 bg-white px-4 text-[15px] text-foreground outline-none placeholder:text-muted"
                />
              </label>
              <button
                type="button"
                className="mt-4 h-[54px] w-full rounded-xl bg-[#B08A45] text-[15.5px] font-semibold text-white transition-colors hover:bg-[#94733A]"
              >
                Subscribe
              </button>
              <p className="mt-4 text-[13.5px] leading-[1.7] text-white/64">
                By subscribing you agree to our privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type HeroFieldProps = {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

function HeroField({ label, icon, children }: HeroFieldProps) {
  return (
    <label className="block">
      <span className="mb-[9px] block text-[11px] font-bold tracking-[0.12em] text-[#6A6A6A]">
        {label}
      </span>
      <span className="flex h-[52px] items-center gap-[10px] rounded-xl border border-[#E7E7E7] bg-white px-4">
        {icon}
        {children}
      </span>
    </label>
  );
}
