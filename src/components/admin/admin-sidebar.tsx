"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavItems } from "@/lib/admin/dashboard-data";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-[108px]">
      <nav className="grid gap-1 overflow-x-auto pb-1 lg:overflow-visible">
        {adminNavItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex items-center gap-3 rounded-[12px] px-4 py-3 text-[14.5px] transition-colors ${
                active
                  ? "bg-background font-semibold text-foreground"
                  : "font-medium text-ae-muted hover:bg-background"
              }`}
            >
              <Icon className="h-4 w-4 flex-none" />
              <span>{item.label}</span>
              {"badge" in item && item.badge ? (
                <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1.5 text-[11px] font-bold text-white">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
