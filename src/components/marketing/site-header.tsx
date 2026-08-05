import { Bookmark, Menu } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "/events", label: "Browse Events" },
  { href: "/submit-event", label: "Submit an Event" },
  { href: "/advertise", label: "Advertise" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E7E7] bg-white/94 backdrop-blur-md">
      <div className="ae-container flex h-[76px] items-center gap-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="ae-serif text-[34px] leading-none text-[#B08A45]">A</span>
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
              className="text-[14.5px] font-medium text-[#202020] transition-colors hover:text-[#B08A45]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-5 pl-2 md:flex xl:ml-0">
          <button
            type="button"
            aria-label="Saved events"
            className="flex items-center text-[#202020] transition-colors hover:text-[#B08A45]"
          >
            <Bookmark className="h-[17px] w-[17px]" strokeWidth={1.6} />
          </button>
          <Link
            href="/login"
            className="text-[14.5px] font-medium text-[#202020] transition-colors hover:text-[#B08A45]"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="rounded-xl bg-[#B08A45] px-[22px] py-[11px] text-[14.5px] font-semibold text-white transition-colors hover:bg-[#94733A]"
          >
            Sign Up
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-3 md:hidden">
          <Link
            href="/signup"
            className="rounded-xl bg-[#B08A45] px-4 py-2.5 text-[13.5px] font-semibold text-white"
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
