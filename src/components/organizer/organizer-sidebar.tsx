"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appRoutes } from "@/lib/routes";

const navItems = [
  {
    href: appRoutes.organizer.root,
    label: "My Listings",
    icon: ListIcon,
  },
  {
    href: appRoutes.organizer.submit,
    label: "Submit New Event",
    icon: PlusIcon,
  },
  {
    href: appRoutes.organizer.account,
    label: "Account",
    icon: AccountIcon,
  },
] as const;

export function OrganizerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-[108px]">
      <nav className="grid gap-[4px] overflow-x-auto pb-1 lg:overflow-visible">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 whitespace-nowrap rounded-[12px] border-0 px-[16px] py-[13px] text-[14.5px] transition-colors hover:bg-[#F1EEE8]"
              style={{
                background: active ? "#F1EEE8" : "transparent",
                color: active ? "#202020" : "#6A6A6A",
                fontWeight: active ? 600 : 500,
              }}
            >
              <Icon />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9.5h8M8 14h5" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="8.6" r="3.9" />
      <path d="M4.8 20c1.1-3.6 3.9-5.4 7.2-5.4s6.1 1.8 7.2 5.4" />
    </svg>
  );
}
