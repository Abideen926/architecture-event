"use client";

import Link from "next/link";
import { appRoutes } from "@/lib/routes";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E7E7] bg-white/95 backdrop-blur-[8px]">
      <div className="mx-auto flex h-[76px] w-full max-w-[1600px] items-center gap-8 px-7 lg:px-16">
        <Link href={appRoutes.architectureEvents.root} className="flex items-center gap-3">
          <span className="ae-serif text-[34px] leading-none text-[var(--ae-accent)]">A</span>
          <span className="text-left text-[13px] font-bold leading-[1.25] tracking-[0.14em] text-[#202020]">
            ARCHITECTURE
            <br />
            EVENTS
          </span>
        </Link>

        <span className="hidden rounded-full border border-[#E7E7E7] bg-[#FAFAFA] px-[14px] py-[6px] text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A] md:inline-flex">
          ADMIN
        </span>

        <div className="ml-auto flex items-center gap-5">
          <Link
            href={appRoutes.architectureEvents.root}
            className="hidden text-[14.5px] font-medium text-[#202020] transition-colors hover:text-[var(--ae-accent)] md:inline-flex"
          >
            View public site
          </Link>
          <span className="hidden h-[26px] w-px bg-[#E7E7E7] md:block" />
          <div className="flex items-center gap-[11px]">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#E7E7E7] bg-[#F1EEE8] text-[12.5px] font-bold text-[#3A3A3A]">
              K
            </span>
            <span className="hidden text-[14.5px] font-semibold text-[#202020] md:inline">
              Kim
            </span>
          </div>
          <button
            type="button"
            className="text-[14.5px] font-medium text-[#6A6A6A] transition-colors hover:text-[var(--ae-accent)]"
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
}
