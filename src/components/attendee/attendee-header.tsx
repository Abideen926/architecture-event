"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/lib/routes";
import { useGetMeQuery, useLogoutMutation } from "@/features/auth/auth-api";
import { useConfirm } from "@/components/ui/modal-provider";

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function AttendeeHeader() {
  const router = useRouter();
  const confirm = useConfirm();
  const { data: me } = useGetMeQuery();
  const [logout] = useLogoutMutation();

  async function handleLogout() {
    const confirmed = await confirm({
      title: "Log out?",
      description: "You'll need to sign in again to see your saved events.",
      confirmLabel: "Log out",
    });
    if (!confirmed) return;

    await logout();
    router.push(appRoutes.architectureEvents.login);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E7E7] bg-white/94 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] w-full max-w-[1440px] items-center gap-8 px-[28px] lg:px-[80px]">
        <Link href={appRoutes.architectureEvents.root} className="flex items-center gap-3">
          <span className="ae-serif text-[34px] leading-none text-[var(--ae-accent)]">A</span>
          <span className="text-left text-[13px] font-bold leading-[1.25] tracking-[0.14em] text-[#202020]">
            ARCHITECTURE
            <br />
            EVENTS
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-6">
          <Link
            href={appRoutes.architectureEvents.events}
            className="hidden text-[14.5px] font-medium text-[#202020] transition-colors hover:text-[var(--ae-accent)] md:inline-flex"
          >
            Browse Events
          </Link>
          <span className="hidden h-[26px] w-px bg-[#E7E7E7] md:block" />
          <div className="flex items-center gap-[11px]">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#E7E7E7] bg-[#F1EEE8] text-[12.5px] font-bold tracking-[0.04em] text-[#3A3A3A]">
              {me ? initialsFor(me.fullName) : "…"}
            </span>
            <span className="hidden text-[14.5px] font-semibold text-[#202020] md:inline">
              {me?.fullName ?? "Loading…"}
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="text-[14.5px] font-medium text-[#6A6A6A] transition-colors hover:text-[var(--ae-accent)]"
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
}
