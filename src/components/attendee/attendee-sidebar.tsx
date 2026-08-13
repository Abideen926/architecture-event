"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appRoutes } from "@/lib/routes";

const navItems = [
  {
    href: appRoutes.attendee.root,
    label: "Saved Events",
    icon: SavedIcon,
  },
  {
    href: appRoutes.attendee.history,
    label: "Registration History",
    icon: HistoryIcon,
  },
  {
    href: appRoutes.attendee.profile,
    label: "Profile",
    icon: ProfileIcon,
  },
] as const;

export function AttendeeSidebar() {
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

function SavedIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M6 4h12v17l-6-4.5L6 21z" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.4V12l3.4 2.1" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="12" cy="8.6" r="3.9" />
      <path d="M4.8 20c1.1-3.6 3.9-5.4 7.2-5.4s6.1 1.8 7.2 5.4" />
    </svg>
  );
}
