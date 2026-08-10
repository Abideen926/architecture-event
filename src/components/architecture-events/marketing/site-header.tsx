"use client";

import { Bookmark, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { appRoutes } from "@/lib/routes";

const navItems = [
  { href: appRoutes.architectureEvents.events, label: "Browse Events" },
  { href: appRoutes.architectureEvents.submitEvent, label: "Submit an Event" },
  { href: appRoutes.architectureEvents.advertise, label: "Advertise" },
  { href: appRoutes.architectureEvents.about, label: "About" },
  { href: appRoutes.architectureEvents.contact, label: "Contact Us" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E7E7] bg-[rgba(255,255,255,0.94)] backdrop-blur-[8px] backdrop-saturate-125">
      <div className="ae-container flex h-[76px] items-center gap-12">
        <Link href={appRoutes.architectureEvents.root} className="flex items-center gap-3">
          <span className="ae-serif ae-accent-text text-[34px] leading-none">A</span>
          <span className="text-left text-[13px] font-bold leading-[1.25] tracking-[0.14em] text-[#202020]">
            ARCHITECTURE
            <br />
            EVENTS
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-[34px] xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[14.5px] font-medium ae-nav-link ${
                pathname === item.href ? "ae-nav-link-active" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-5 pl-2 md:flex xl:ml-0">
          <button
            type="button"
            aria-label="Saved events"
            className="flex items-center text-[#202020] transition-colors hover:text-[var(--ae-accent)]"
          >
            <Bookmark className="h-[17px] w-[17px]" strokeWidth={1.6} />
          </button>
          <Link
            href={appRoutes.architectureEvents.login}
            className="text-[14.5px] font-medium text-[#202020] transition-colors hover:text-[var(--ae-accent)]"
          >
            Log In
          </Link>
          <Link
            href={appRoutes.architectureEvents.signup}
            className="rounded-xl bg-[var(--ae-accent)] px-[22px] py-[8.4px] text-[14.5px] font-semibold !text-white transition-colors hover:bg-[var(--ae-accent-strong)]"
          >
            Sign Up
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-3 md:hidden">
          <Link
            href={appRoutes.architectureEvents.signup}
            className="rounded-xl bg-[var(--ae-accent)] px-4 py-2.5 text-[13.5px] font-semibold text-white"
          >
            Sign Up
          </Link>
          <button
            type="button"
            aria-label="Open navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#E7E7E7] bg-white text-[#202020]"
          >
            <Menu className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </header>
  );
}
