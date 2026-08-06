import type { ReactNode } from "react";
import { AttendeeFooter } from "@/components/attendee/attendee-footer";
import { AttendeeHeader } from "@/components/attendee/attendee-header";
import { AttendeeShell } from "@/components/attendee/attendee-shell";

type AttendeeLayoutProps = {
  children: ReactNode;
};

export default function AttendeeLayout({ children }: AttendeeLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <AttendeeHeader />
      <AttendeeShell>{children}</AttendeeShell>
      <AttendeeFooter />
    </div>
  );
}
