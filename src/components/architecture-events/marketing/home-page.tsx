import type { ReactNode } from "react";
import {
  ArrowRight,
  Bookmark,
  CalendarDays,
  CalendarIcon,
  Mail,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  brandSpotlights,
  featuredEvents,
  heroImage,
  valuePoints,
} from "@/lib/architecture-events/marketing/home-data";
import { appRoutes } from "@/lib/routes";

export function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <BrandSpotlightSection />
        <FeaturedEventsSection />
        <ValueSection />
        <NewsletterSection />
      </main>
    </>
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
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(20,20,20,0.92)_8%,rgba(20,20,20,0.55)_52%,rgba(20,20,20,0.2)_100%)]" />

      <div className="ae-container relative pb-0 pt-24 lg:min-h-[695.5px]">
        <div className="max-w-[760px]">
          <h1 className="ae-serif max-w-[12ch] text-balance text-[52px] font-semibold leading-[1.02] tracking-[-0.02em] text-white md:text-[64px] xl:text-[78px]">
            Discover Architecture Events
          </h1>
          <p className="mt-7 max-w-[46ch] text-[17.5px] leading-[1.7] text-[rgba(255,255,255,0.82)]">
            Connecting architects, engineers, contractors, manufacturers,
            designers, and BIM/VDC professionals through conferences, networking
            events, product showcases, and educational programs.
          </p>
        </div>

        <div className="relative mt-14 translate-y-[56px] rounded-[20px_20px_0px_0px] border border-[#E7E7E7] bg-white px-5 py-6 shadow-[0_24px_60px_-30px_rgba(20,20,20,0.35)] md:px-7 md:py-[26px]">
          <div className="grid gap-[22px] xl:grid-cols-[1.6fr_1fr_1fr_auto] xl:items-end">
            <HeroField
              label="KEYWORD"
              icon={
                <Search
                  className="h-[17px] w-[17px] text-[#6A6A6A]"
                  strokeWidth={1.7}
                />
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
        </div>
      </div>
    </section>
  );
}

function BrandSpotlightSection() {
  return (
    <section className="bg-white pt-[152px]">
      <div className="ae-container max-w-[1440px]">
        <div className="grid gap-14 lg:grid-cols-[1fr_3.1fr] lg:items-start">
          <div className="pt-[6px]">
            <span className="ae-section-kicker">BRAND SPOTLIGHT</span>
            <h2 className="ae-section-heading mt-3 max-w-[11ch] text-[40px] leading-[1.14]">
              Brands shaping the future of the built world.
            </h2>
            <p className="mt-[22px] max-w-[26ch] text-[15.5px] leading-[1.75] text-[#6A6A6A]">
              Discover innovative products, materials, and systems from leading
              brands in the AEC industry.
            </p>
            <Link
              href={appRoutes.architectureEvents.events}
              className="mt-[32px] inline-flex items-center gap-[12px] rounded-xl border border-[#E7E7E7] bg-white px-[22px] py-[13px] text-[14.5px] font-semibold text-[#202020] transition-colors hover:border-[#202020]"
            >
              View all brands
              <ArrowRight
                className="h-[15px] w-[15px]"
                strokeWidth={1.7}
              />
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-6">
            {brandSpotlights.map((brand) => (
              <article
                key={brand.id}
                className="overflow-hidden rounded-[16px] border border-[#E7E7E7] bg-white transition-shadow duration-200 hover:shadow-[0_18px_40px_-28px_rgba(20,20,20,0.35)]"
              >
                <div
                  className="h-[250px] bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${brand.image})` }}
                  aria-label={brand.name}
                />
                <div className="relative px-4 pb-5 pt-[42px]">
                  <div className="absolute left-6 top-0 flex h-[94px] w-[104px] -translate-y-[68%] flex-col items-center justify-center rounded-[16px] border border-[#E6DED1] bg-white shadow-[0_10px_22px_-18px_rgba(20,20,20,0.3)]">
                    <span
                      className="text-[23px] leading-none"
                      style={{ color: brand.accent }}
                    >
                      {brand.token}
                    </span>
                    <span className="mt-3 text-center text-[10px] font-semibold tracking-[0.30em] text-[#202020]">
                      {brand.name.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="m-0 text-[20px] font-bold text-[#202020]">
                    {brand.name}
                  </h3>
                  <p className="mt-2 max-w-[23ch] text-[14px] leading-[1.70] text-[#5B5B5B]">
                    {brand.headline}
                  </p>
                  <Link
                    href={appRoutes.architectureEvents.events}
                    className="ae-link-accent mt-[18px] inline-flex items-center gap-[9px] text-[14px] font-semibold"
                  >
                    View Spotlight
                    <ArrowRight
                      className="h-[15px] w-[15px]"
                      strokeWidth={1.8}
                    />
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
    <section className="bg-white pt-[120px]">
      <div className="ae-container max-w-[1440px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[520px]">
            <p className="ae-section-kicker mb-[18px]">FEATURED EVENTS</p>
            <h2 className="ae-section-heading max-w-[18ch] text-[40px] leading-[1.16]">
              Curated events.
              <br />
              Meaningful connections.
            </h2>
          </div>
          <Link
            href={appRoutes.architectureEvents.events}
            className="ae-link-accent inline-flex items-center gap-[10px] pb-2 text-[14.5px] font-semibold"
          >
            View all events
            <ArrowRight className="h-[15px] w-[15px]" strokeWidth={1.8} />
          </Link>
        </div>

        <div className="mt-[42px] grid gap-[26px] md:grid-cols-2 xl:grid-cols-4">
          {featuredEvents.map((event) => (
            <article
              key={event.id}
              className="group relative overflow-hidden rounded-[16px] border border-[#E7E7E7] bg-white transition-shadow duration-200 hover:shadow-[0_18px_40px_-28px_rgba(20,20,20,0.4)]"
            >
              <Link
                href={appRoutes.architectureEvents.eventDetail(event.id)}
                className="absolute inset-0 z-10"
                aria-label={`Open ${event.title}`}
              />
              <div className="relative h-[190px] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute left-2 top-2 flex flex-col items-center justify-center rounded-[6px] bg-[#252525] px-2 py-2 text-white shadow-sm">
                  <span className="text-[12px] font-medium uppercase leading-none tracking-[0.1em]">
                    {event.month}
                  </span>
                  <span className="py-[6px] text-[16px] font-bold leading-none">
                    {event.day}
                  </span>
                  <span className="text-[12px] font-medium leading-none text-[rgba(255,255,255,0.8)]">
                    2026
                  </span>
                </div>
              </div>
              <div className="relative z-20 px-[14px] pb-[14px] pt-[14px]">
                <p className="m-0 text-[12px] font-semibold tracking-[0.1em] text-[#8D8D8D]">
                  {event.category}
                </p>
                <h3 className="mt-2 text-[18px] font-semibold leading-[1.3] text-[#202020]">
                  {event.title}
                </h3>
                <p className="mt-1 flex items-center gap-2 text-[10px] leading-[1.45] text-[#8A8A8A]">
                  <MapPin size={14} /> {event.location}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#9A9A9A] transition-colors group-hover:text-[#202020]">
                  <Bookmark className="h-[14px] w-[14px]" strokeWidth={1.8} />
                  Save
                </span>
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
    <section className="mt-[120px] border-y border-[#E7E7E7] bg-[#FAFAFA]">
      <div className="ae-container max-w-[1440px]">
        <div className="grid gap-0 py-[56px] md:grid-cols-2 xl:grid-cols-4 xl:gap-[44px]">
          {valuePoints.map((point, index) => (
            <article
              key={point.title}
              className={`flex gap-4 ${index > 0 ? "xl:border-l xl:border-[#E7E7E7] xl:pl-[44px]" : ""}`}
            >
              {index === 0 ? (
                <CalendarIcon
                  size={24}
                  className="mt-[2px] flex-none text-[#202020]"
                  strokeWidth={1.5}
                />
              ) : index === 1 ? (
                <Users
                  size={24}
                  className="mt-[2px] flex-none text-[#202020]"
                  strokeWidth={1.5}
                />
              ) : index === 2 ? (
                <Bookmark
                  size={24}
                  className="mt-[2px] flex-none text-[#202020]"
                  strokeWidth={1.5}
                />
              ) : (
                <Mail
                  size={24}
                  className="mt-[2px] flex-none text-[#202020]"
                  strokeWidth={1.5}
                />
              )}
              <div>
                <h3 className="m-0 text-[15px] font-bold text-[#202020]">
                  {point.title}
                </h3>
                <p className="mt-[7px] max-w-[24ch] text-[13.5px] leading-[1.65] text-[#6A6A6A]">
                  {point.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="bg-white py-[110px]">
      <div className="ae-container">
        <div className="grid gap-[72px] rounded-[20px] bg-[#1E1E1E] px-6 py-10 text-white md:px-10 md:py-12 xl:grid-cols-[1.1fr_1fr] xl:items-center xl:px-20 xl:py-[72px]">
          <div>
            <div className="max-w-[700px]">
              <p className="ae-section-kicker mb-[18px]">NEWSLETTER</p>
              <h2 className="ae-section-heading max-w-[20ch] text-[38px] leading-[1.16] !text-white">
                The events worth your time, once a month.
              </h2>
              <p className="mt-[20px] max-w-[48ch] text-[15.5px] leading-[1.75] text-[rgba(255,255,255,0.7)]">
                A short, curated email with upcoming conferences, product
                showcases, and educational programs across the AEC industry. No
                noise, unsubscribe anytime.
              </p>
            </div>
          </div>

          <div>
            <label className="mb-[10px] block text-[13px] font-semibold text-[rgba(255,255,255,0.75)]">
              Email address
            </label>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="you@studio.com"
                className="h-[54px] flex-1 rounded-xl border border-white/20 bg-[rgba(255,255,255,0.06)] px-[18px] text-[15px] text-white outline-none placeholder:text-[rgba(255,255,255,0.55)]"
              />
              <button
                type="button"
                className="h-[54px] rounded-xl bg-white px-7 text-[15px] font-semibold text-[#1E1E1E] transition-colors hover:bg-[var(--ae-accent)] hover:text-white"
              >
                Subscribe
              </button>
            </div>
            <p className="mt-[14px] text-[12.5px] text-[rgba(255,255,255,0.55)]">
              By subscribing you agree to our privacy policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

type HeroFieldProps = {
  label: string;
  icon: ReactNode;
  children: ReactNode;
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
