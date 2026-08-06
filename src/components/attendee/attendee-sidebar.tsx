"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { attendeeNavItems } from "@/lib/attendee/attendee-data";

export function AttendeeSidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-[108px]">
      <nav className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:gap-1 lg:overflow-visible">
        {attendeeNavItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex items-center gap-3 whitespace-nowrap rounded-[12px] px-4 py-[13px] text-[14.5px] transition-colors ${
                active
                  ? "bg-[#F1EEE8] font-semibold text-[#202020]"
                  : "font-medium text-[#6A6A6A] hover:bg-[#F1EEE8]"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.6} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
