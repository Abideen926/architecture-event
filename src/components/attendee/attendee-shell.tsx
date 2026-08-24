import type { ReactNode } from "react";
import { AttendeeSidebar } from "@/components/attendee/attendee-sidebar";

type AttendeeShellProps = {
  children: ReactNode;
};

export function AttendeeShell({ children }: AttendeeShellProps) {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-[28px] pb-[90px] pt-[30px] lg:px-[80px]">
      <div className="max-w-[1440px]">
        <p className="mb-[7px] text-[11.5px] font-bold tracking-[0.16em] text-ae-accent">
          MY ACCOUNT
        </p>
        <h1 className="ae-serif text-[38px] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground md:text-[46px]">
          Your dashboard
        </h1>
        <p className="mt-[10px] max-w-[60ch] text-[16.5px] leading-[1.6] text-ae-muted">
          Save events, view your registration history, and manage your
          preferences.
        </p>
      </div>

      <div className="mt-6 grid gap-[30px] lg:grid-cols-[244px_minmax(0,1fr)] lg:gap-16">
        <AttendeeSidebar />
        <section>{children}</section>
      </div>
    </main>
  );
}
