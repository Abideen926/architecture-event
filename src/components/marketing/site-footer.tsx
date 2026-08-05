import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const discoverLinks = [
  { href: "/events", label: "Events" },
  { href: "/events", label: "Brands" },
  { href: "/events", label: "Venues" },
  { href: "/events", label: "Resources" },
  { href: "/events", label: "Event archive" },
];

const organizerLinks = [
  { href: "/submit-event", label: "Submit an event" },
  { href: "/advertise", label: "Advertise" },
  { href: "/contact", label: "Contact Us" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "#privacy", label: "Privacy" },
  { href: "#terms", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#1E1E1E] text-white/72">
      <div className="ae-container grid gap-14 py-[76px] pb-[34px] lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="ae-serif text-[34px] leading-none text-[#B08A45]">A</span>
            <span className="text-[13px] font-bold leading-[1.25] tracking-[0.14em] text-white">
              ARCHITECTURE
              <br />
              EVENTS
            </span>
          </div>
          <p className="mt-[22px] max-w-[34ch] text-[14.5px] leading-[1.75]">
            Events, brands, and venues for architecture, engineering, construction,
            and design professionals.
          </p>
          <div className="mt-[26px] max-w-[360px]">
            <p className="mb-[10px] text-[11.5px] font-bold tracking-[0.13em] text-white">
              GET EVENT UPDATES
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="you@studio.com"
                className="h-[46px] min-w-0 flex-1 rounded-xl border border-white/20 bg-white/6 px-[14px] text-[14.5px] text-white outline-none placeholder:text-white/42"
              />
              <button
                type="button"
                className="h-[46px] rounded-xl bg-white px-5 text-[14.5px] font-semibold text-[#1E1E1E] transition-colors hover:bg-[#B08A45] hover:text-white"
              >
                Subscribe
              </button>
            </div>
          </div>
          <div className="mt-[26px] flex gap-3">
            <Link
              href="#linkedin"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/18 text-[13px] font-semibold text-white transition-colors hover:border-white"
            >
              in
            </Link>
            <Link
              href="#instagram"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/18 text-white transition-colors hover:border-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
              </svg>
            </Link>
          </div>
        </div>

        <FooterColumn title="DISCOVER" links={discoverLinks} />
        <FooterColumn title="FOR ORGANIZERS" links={organizerLinks} />
        <FooterColumn title="COMPANY" links={companyLinks} />
      </div>

      <div className="ae-container flex flex-col gap-3 border-t border-white/12 py-[26px] pb-[44px] text-[13px] sm:flex-row sm:items-center sm:justify-between">
        <span>&copy; 2026 Architecture Events. All rights reserved.</span>
        <span>Made for the built world.</span>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: Array<{ href: string; label: string }>;
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-[18px] text-[11.5px] font-bold tracking-[0.13em] text-white">
        {title}
      </h3>
      <div className="grid justify-items-start gap-3">
        {links.map((link) => (
          <Link
            key={`${title}-${link.label}`}
            href={link.href}
            className="text-[14.5px] transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
