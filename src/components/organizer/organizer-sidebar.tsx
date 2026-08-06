"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { organizerNavItems } from "@/lib/organizer/organizer-data";

export function OrganizerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-[108px]">
      <nav className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:gap-[8px] lg:overflow-visible">
        {organizerNavItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex items-center gap-3 whitespace-nowrap rounded-[14px] border px-[14px] py-[10px] text-[14.5px] transition-colors ${
                active
                  ? "border-[#202020] bg-[#F4EFE6] font-semibold text-[#202020]"
                  : "border-transparent font-medium text-[#6A6A6A] hover:bg-[#F7F3EB]"
              }`}
            >
              <Icon className="h-[14px] w-[14px]" strokeWidth={1.55} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
