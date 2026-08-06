import {
  ArrowRight,
  Bookmark,
  CalendarDays,
  Handshake,
  MapPin,
  Search,
  Bell,
} from "lucide-react";
import Link from "next/link";
import {
  brandSpotlights,
  featuredEvents,
  heroImage,
  valuePoints,
} from "@/lib/architecture-events/marketing/home-data";
import { appRoutes } from "@/lib/routes";
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
      <img
        src={heroImage}
        alt="Modern glass conference building at dusk"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.85]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,69,0.36),transparent_25%),linear-gradient(120deg,rgba(24,24,24,0.96)_8%,rgba(24,24,24,0.78)_52%,rgba(24,24,24,0.38)_100%)]" />

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
                <Search className="h-[17px] w-[17px] text-[#6A6A6A]" strokeWidth={1.7} />
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
                <CalendarDays
                  className="h-4 w-4 text-[#6A6A6A]"
                  strokeWidth={1.7}
                />
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
                <MapPin className="h-4 w-4 text-[#6A6A6A]" strokeWidth={1.7} />
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
              href={appRoutes.architectureEvents.events}
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
    <section className="bg-white pt-28">
      <div className="ae-container max-w-[1366px]">
        <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)] lg:items-start">
          <div className="pt-2">
            <p className="ae-section-kicker">BRAND SPOTLIGHT</p>
            <h2 className="ae-section-heading mt-5 max-w-[10.8ch] text-[31px] leading-[0.96]">
              Brands shaping the future of the built world.
            </h2>
            <p className="ae-section-description mt-8 max-w-[25ch] text-[11.5px] leading-[1.9]">
              Discover innovative products, materials, and systems from leading
              brands in the AEC industry.
            </p>
            <Link
              href={appRoutes.architectureEvents.events}
              className="mt-8 inline-flex h-[46px] items-center justify-center rounded-[14px] border border-[var(--ae-border)] px-6 text-[13px] font-medium text-[#303030] transition-colors hover:border-[var(--ae-accent)] hover:text-[var(--ae-accent)]"
            >
              View all brands
              <ArrowRight className="ml-3 h-[14px] w-[14px]" strokeWidth={1.8} />
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {brandSpotlights.map((brand) => (
              <article
                key={brand.id}
                 className="overflow-hidden rounded-[8px] border border-[#DCDCDC] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_14px_-8px_rgba(0,0,0,0.35)]"
              >
                <div
                  className="h-[248px] bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${brand.image})` }}
                  aria-label={brand.name}
                />
                <div className="relative px-6 pb-7 pt-[58px]">
                  <div className="absolute left-6 top-0 flex h-[94px] w-[104px] -translate-y-[68%] flex-col items-center justify-center rounded-[16px] border border-[#E6DED1] bg-white shadow-[0_10px_22px_-18px_rgba(20,20,20,0.3)]">
                    <span
                      className="text-[23px] leading-none"
                      style={{ color: brand.accent }}
                    >
                      {brand.token}
                    </span>
                    <span className="mt-3 text-center text-[5.8px] font-semibold tracking-[0.24em] text-[#5B5B5B]">
                      {brand.name.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-[16px] font-semibold text-[#202020]">
                    {brand.name}
                  </h3>
                  <p className="ae-section-description mt-3 max-w-[22ch] text-[11px] leading-[1.78]">
                    {brand.headline}
                  </p>
                  <Link
                    href={appRoutes.architectureEvents.events}
                    className="ae-link-accent mt-5 inline-flex items-center text-[11px] font-semibold"
                  >
                    View Spotlight
                    <ArrowRight className="ml-2 h-[12px] w-[12px]" strokeWidth={1.8} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedEventsSection() {
  return (
    <section className="bg-white py-24">
      <div className="ae-container max-w-[1280px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[520px]">
            <p className="ae-section-kicker">FEATURED EVENTS</p>
            <h2 className="ae-section-heading mt-3 max-w-[11ch] text-[27px] leading-[1.02] md:text-[30px]">
              Curated events. Meaningful connections.
            </h2>
          </div>
          <Link
            href={appRoutes.architectureEvents.events}
            className="ae-link-accent inline-flex items-center text-[11px] font-medium"
          >
            View all events
            <ArrowRight className="ml-2 h-[12px] w-[12px]" strokeWidth={1.8} />
          </Link>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredEvents.map((event) => (
            <article
              key={event.id}
               className="overflow-hidden rounded-[8px] border border-[#DCDCDC] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_14px_-8px_rgba(0,0,0,0.35)]"
            >
              <div className="relative h-[124px] border-b border-[#E7E7E7]">
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute left-2 top-2 rounded-[6px] bg-[#252525] px-2 py-1.5 text-white shadow-sm">
                  <p className="text-[7px] font-medium uppercase leading-none tracking-[0.1em]">
                    {event.month}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold leading-none">
                    {event.day}
                  </p>
                  <p className="mt-1 text-[6px] font-medium leading-none text-white/80">
                    2026
                  </p>
                </div>
              </div>
              <div className="p-3.5">
                <p className="text-[7px] font-semibold tracking-[0.14em] text-[#8D8D8D]">
                  {event.category}
                </p>
                <h3 className="mt-2 text-[13px] font-semibold leading-[1.3] text-[#202020]">
                  {event.title}
                </h3>
                <p className="mt-1.5 text-[10px] leading-[1.45] text-[#8A8A8A]">
                  {event.location}
                </p>
                <button
                  type="button"
                  aria-label={`Save ${event.title}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-medium text-[#9A9A9A] transition-colors hover:text-[#202020]"
                >
                  <Bookmark className="h-[16px] w-[16px]" strokeWidth={1.8} />
                  Save
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueSection() {
  return (
    <section className="border-t border-[#E7E7E7] bg-[#F8F7F5] py-8">
      <div className="ae-container max-w-[1280px]">
        <div className="grid gap-0 md:grid-cols-2 xl:grid-cols-4">
          {valuePoints.map((point, index) => (
            <article
              key={point.title}
              className="border-[#E1DED7] px-5 py-4 md:border-r last:border-r-0"
            >
              <div className="flex items-center gap-2">
                <div className="text-[#6A6A6A]">
                  {index === 0 ? (
                    <Search className="h-3.5 w-3.5" strokeWidth={1.8} />
                  ) : index === 1 ? (
                    <Handshake className="h-3.5 w-3.5" strokeWidth={1.8} />
                  ) : index === 2 ? (
                    <Bookmark className="h-3.5 w-3.5" strokeWidth={1.8} />
                  ) : (
                    <Bell className="h-3.5 w-3.5" strokeWidth={1.8} />
                  )}
                </div>
                <h3 className="text-[11px] font-medium text-[#202020]">
                {point.title}
                </h3>
              </div>
              <p className="mt-2 pl-6 text-[9.5px] leading-[1.55] text-[#8A8A8A]">
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
              <p className="ae-section-kicker">NEWSLETTER</p>
              <h2 className="ae-section-heading mt-4 max-w-[16ch] text-[38px] leading-[1.08] text-white md:text-[46px]">
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
                className="mt-4 h-[54px] w-full rounded-xl bg-[var(--ae-accent)] text-[15.5px] font-semibold text-white transition-colors hover:bg-[var(--ae-accent-strong)]"
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
