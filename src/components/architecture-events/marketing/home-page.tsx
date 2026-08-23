"use client";

import type { ReactNode } from "react";
import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FeaturedBadge } from "@/components/ui/featured-badge";
import {
  brandSpotlights,
  heroImage,
  heroKeywordSuggestions,
  valuePoints,
} from "@/lib/architecture-events/marketing/home-data";
import { appRoutes } from "@/lib/routes";
import { useListPublicEventsQuery } from "@/features/public/public-api";
import { useSaveToggle } from "@/features/attendee/use-save-toggle";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <BrandSpotlightSection />
      <FeaturedEventsSection />
      <ValueSection />
      <NewsletterSection />
    </main>
  );
}

function HeroSection() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("search", keyword.trim());
    if (location.trim()) params.set("city", location.trim());
    const query = params.toString();
    router.push(
      query
        ? `${appRoutes.architectureEvents.events}?${query}`
        : appRoutes.architectureEvents.events,
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#1E1E1E]">
      <img
        src={heroImage}
        alt="Modern glass conference building at dusk"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.85]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(20,20,20,0.92)_8%,rgba(20,20,20,0.55)_52%,rgba(20,20,20,0.2)_100%)]" />

      <div className="relative mx-auto max-w-[1440px] px-6 pt-[96px] sm:px-10 lg:px-16 xl:px-20">
        <div className="max-w-[760px]">
          <h1 className="ae-serif max-w-[12ch] text-balance text-[52px] font-semibold leading-[1.02] tracking-[-0.00em] text-white md:text-[64px] 2xl:text-[76px]">
            Discover Architecture Events
          </h1>
          <p className="mt-7 max-w-[57ch] text-[17.5px] leading-[1.7] text-[rgba(255,255,255,0.82)]">
            Connecting architects, engineers, contractors, manufacturers,
            designers, and BIM/VDC professionals through conferences, networking
            events, product showcases, and educational programs.
          </p>
        </div>

        <div className="relative mt-14 translate-y-[56px] rounded-[20px_20px_0_0] border border-[#E7E7E7] bg-white px-7 py-[26px] shadow-[0_24px_60px_-30px_rgba(20,20,20,0.35)]">
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
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && handleSearch()}
                placeholder="Search events, topics, brands, or venues"
                className="w-full border-0 bg-transparent text-[15px] text-foreground outline-none placeholder:text-[#6A6A6A]"
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
              <select
                disabled
                title="Date filtering isn't available yet"
                className="w-full cursor-not-allowed appearance-none border-0 bg-transparent text-[15px] text-[#8A8A8A] outline-none"
              >
                <option>Any date</option>
              </select>
            </HeroField>

            <HeroField
              label="LOCATION"
              icon={
                <MapPin className="h-4 w-4 text-[#6A6A6A]" strokeWidth={1.7} />
              }
            >
              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && handleSearch()}
                placeholder="Any city"
                className="w-full border-0 bg-transparent text-[15px] text-foreground outline-none placeholder:text-[#6A6A6A]"
              />
            </HeroField>

            <button
              type="button"
              onClick={handleSearch}
              className="inline-flex h-[52px] items-center justify-center rounded-xl bg-[#1E1E1E] px-[30px] text-[15px] font-semibold !text-white transition-colors hover:bg-black hover:shadow-[0_10px_22px_-12px_rgba(20,20,20,0.6)]"
            >
              Search Events
            </button>
          </div>

          <div className="mt-[22px] flex flex-wrap items-center gap-[18px] border-t border-[#F1F1F1] pt-[18px]">
            <span className="text-[12.5px] text-[#6A6A6A]">
              Popular searches:
            </span>
            {heroKeywordSuggestions.map((tag) => (
              <Link
                key={tag.label}
                href={`${appRoutes.architectureEvents.events}?search=${encodeURIComponent(tag.label)}`}
                className="text-[12.5px] text-foreground underline underline-offset-[3px] transition-colors hover:text-[var(--ae-accent)]"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandSpotlightSection() {
  return (
    <section className="bg-white pt-[152px]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-14 lg:grid-cols-[1fr_3.1fr] lg:items-start">
          <div className="pt-[6px]">
            <span className="ae-section-kicker">BRAND SPOTLIGHT</span>
            <h2 className="ae-section-heading mt-3 max-w-[16ch] text-[40px] leading-[1.14] tracking-[-0.04em] [word-spacing:0.08em]">
              Brands shaping the future of the built world.
            </h2>
            <p className="mt-[22px] max-w-[66ch] text-[15.5px] leading-[1.75] text-[#6A6A6A]">
              Discover innovative products, materials, and systems from leading
              brands in the AEC industry.
            </p>
            <Link
              href={appRoutes.architectureEvents.events}
              className="mt-[32px] inline-flex items-center gap-[12px] rounded-[12px] border border-[#E7E7E7] bg-white px-[22px] py-[13px] text-[14.5px] font-semibold text-foreground transition-colors hover:border-foreground"
            >
              View all brands
              <ArrowRight className="h-[15px] w-[15px]" strokeWidth={1.7} />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {brandSpotlights.map((brand) => (
              <article
                key={brand.id}
                className="overflow-hidden rounded-[16px] border border-[#E7E7E7] bg-white transition-shadow duration-200 hover:shadow-[0_18px_40px_-28px_rgba(20,20,20,0.35)]"
              >
                <div
                  className="relative h-[250px] overflow-hidden bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${brand.image})` }}
                />
                <div className="relative px-6 pb-[26px] pt-[46px]">
                  <div className="absolute left-[22px] top-0 flex h-[96px] w-[104px] -translate-y-[68%] flex-col items-center justify-center rounded-[12px] border border-[#E7E7E7] bg-white shadow-[0_10px_22px_-18px_rgba(20,20,20,0.3)]">
                    {brand.id === "forest-accents" ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={brand.accent}
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <path d="M12 3 6 12h12L12 3zM12 9l-4.5 8h9L12 9zM12 17v4" />
                      </svg>
                    ) : brand.id === "company-name" ? (
                      <span
                        className="text-[26px] leading-none"
                        style={{ color: "#C4BEB2" }}
                        aria-hidden="true"
                      >
                        □
                      </span>
                    ) : (
                      <span
                        className="font-serif text-[26px] leading-none"
                        style={{ color: brand.accent }}
                      >
                        {brand.token}
                      </span>
                    )}
                    <span className="mt-3 text-center text-[9.5px] font-bold tracking-[0.1em] text-foreground">
                      {brand.name === "Company Name" ? (
                        <>
                          <span className="block">COMPANY</span>
                          <span className="block">LOGO</span>
                        </>
                      ) : (
                        brand.name.toUpperCase()
                      )}
                    </span>
                  </div>

                  <h3 className="m-0 text-[20px] font-bold tracking-[-0.01em] text-foreground">
                    {brand.name}
                  </h3>
                  <p className="mt-[10px] max-w-[23ch] text-[14.5px] leading-[1.7] text-[#6A6A6A]">
                    {brand.headline}
                  </p>
                  <Link
                    href={appRoutes.architectureEvents.events}
                    className="ae-link-accent mt-[18px] inline-flex items-center gap-[9px] text-[14px] font-semibold transition-all hover:gap-[14px]"
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

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });

function FeaturedEventsSection() {
  const { data } = useListPublicEventsQuery({ limit: 4, sort: "soonest" });
  const { isSaved, toggleSave } = useSaveToggle();

  const events = data?.items ?? [];

  if (events.length === 0) return null;

  return (
    <section className="bg-white pt-[120px]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[520px]">
            <p className="ae-section-kicker mb-[18px]">FEATURED EVENTS</p>
            <h2 className="ae-section-heading max-w-[30ch] text-[40px] leading-[1.16] tracking-[-0.015em]">
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
          {events.map((event) => {
            const startAt = new Date(event.startAt);
            const thumbnail = event.media?.find((m) => m.isThumbnail)?.url;
            const saved = isSaved(event.id);

            return (
              <article
                key={event.id}
                className="group relative overflow-hidden rounded-[16px] border border-[#E7E7E7] bg-white transition-shadow duration-200 hover:shadow-[0_18px_40px_-28px_rgba(20,20,20,0.4)]"
              >
                <Link
                  href={appRoutes.architectureEvents.eventDetail(event.id)}
                  className="absolute inset-0 z-10"
                  aria-label={`Open ${event.title}`}
                />
                <div className="relative h-[190px] overflow-hidden bg-[#F1EEE8]">
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt={event.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}
                  <div className="absolute left-[14px] top-[14px] rounded-[12px] bg-[#1E1E1E] px-[14px] py-[9px] text-center text-white shadow-sm">
                    <span className="block text-[10px] font-bold uppercase leading-none tracking-[0.1em]">
                      {monthFormatter.format(startAt).toUpperCase()}
                    </span>
                    <span className="block py-[6px] text-[17px] font-bold leading-none">
                      {startAt.getDate()}
                    </span>
                    <span className="block text-[10px] font-medium leading-none text-[rgba(255,255,255,0.7)]">
                      {startAt.getFullYear()}
                    </span>
                  </div>
                  {event.isFeatured ? (
                    <FeaturedBadge className="absolute right-[14px] top-[14px] z-20" />
                  ) : null}
                </div>

                <div className="relative z-20 border-t border-[#F1F1F1] px-5 pb-[18px] pt-5">
                  <p className="m-0 text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
                    {event.category?.name.toUpperCase() ?? "EVENT"}
                  </p>
                  <h3 className="mt-2 text-[17px] font-bold leading-[1.32] tracking-[-0.01em] text-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-3 flex items-center gap-[7px] text-[13.5px] leading-[1.45] text-[#6A6A6A]">
                    <MapPin size={14} strokeWidth={1.7} />{" "}
                    {event.isOnline ? "Online" : (event.city ?? "—")}
                  </p>
                  <button
                    type="button"
                    onClick={(clickEvent) => {
                      clickEvent.preventDefault();
                      toggleSave(event.id);
                    }}
                    aria-pressed={saved}
                    className={`relative z-30 mt-4 flex items-center gap-[8px] border-t border-[#F1F1F1] pt-[14px] text-[13px] transition-colors ${
                      saved
                        ? "text-[var(--ae-accent)]"
                        : "text-[#6A6A6A] hover:text-foreground"
                    }`}
                  >
                    <Bookmark
                      className={`h-[14px] w-[14px] ${saved ? "fill-current" : ""}`}
                      strokeWidth={1.6}
                    />
                    {saved ? "Saved" : "Save"}
                  </button>
                </div>
              </article>
            );
          })}
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
              className={`flex gap-4 ${
                index > 0 ? "xl:border-l xl:border-[#E7E7E7] xl:pl-[44px]" : ""
              }`}
            >
              {index === 0 ? (
                <CalendarIcon
                  size={24}
                  className="mt-[2px] flex-none text-foreground"
                  strokeWidth={1.5}
                />
              ) : index === 1 ? (
                <Users
                  size={24}
                  className="mt-[2px] flex-none text-foreground"
                  strokeWidth={1.5}
                />
              ) : index === 2 ? (
                <Bookmark
                  size={24}
                  className="mt-[2px] flex-none text-foreground"
                  strokeWidth={1.5}
                />
              ) : (
                <Mail
                  size={24}
                  className="mt-[2px] flex-none text-foreground"
                  strokeWidth={1.5}
                />
              )}
              <div>
                <h3 className="m-0 text-[15px] font-bold text-foreground">
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
  const [email, setEmail] = useState("");

  function handleSubscribe() {
    if (!email.trim()) {
      toast.error("Enter an email address");
      return;
    }
    toast.error("Newsletter signup isn't available yet", {
      description:
        "Create an attendee account to opt into the monthly newsletter from your profile.",
    });
  }

  return (
    <section className="bg-white py-[110px]">
      <div className="ae-container">
        <div className="grid gap-[72px] rounded-[20px] bg-[#1E1E1E] px-6 py-10 text-white md:px-10 md:py-12 xl:grid-cols-[1.1fr_1fr] xl:items-center xl:px-20 xl:py-[72px]">
          <div>
            <div className="max-w-[700px]">
              <p className="ae-section-kicker mb-[18px]">NEWSLETTER</p>
              <h2 className="ae-section-heading max-w-[40ch] text-[38px] leading-[1.16] !text-white">
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@studio.com"
                className="h-[54px] flex-1 rounded-xl border border-white/20 bg-[rgba(255,255,255,0.06)] px-[18px] text-[15px] text-white outline-none placeholder:text-[rgba(255,255,255,0.55)]"
              />
              <button
                type="button"
                onClick={handleSubscribe}
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
