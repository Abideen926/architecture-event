import type { ReactNode } from "react";
import { OrganizerFooter } from "@/components/organizer/organizer-footer";
import { OrganizerHeader } from "@/components/organizer/organizer-header";
import { OrganizerShell } from "@/components/organizer/organizer-shell";
import { requireRole } from "@/lib/auth/session-guard";

type OrganizerLayoutProps = {
  children: ReactNode;
};

export default async function OrganizerLayout({ children }: OrganizerLayoutProps) {
  await requireRole("ORGANIZER");

  return (
    <div className="min-h-screen bg-white">
      <OrganizerHeader />
      <OrganizerShell>{children}</OrganizerShell>
      <OrganizerFooter />
    </div>
  );
}
