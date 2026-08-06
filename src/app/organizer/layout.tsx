import type { ReactNode } from "react";
import { OrganizerFooter } from "@/components/organizer/organizer-footer";
import { OrganizerHeader } from "@/components/organizer/organizer-header";
import { OrganizerShell } from "@/components/organizer/organizer-shell";

type OrganizerLayoutProps = {
  children: ReactNode;
};

export default function OrganizerLayout({ children }: OrganizerLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <OrganizerHeader />
      <OrganizerShell>{children}</OrganizerShell>
      <OrganizerFooter />
    </div>
  );
}
