import type { ReactNode } from "react";
import { SiteFooter } from "@/components/architecture-events/marketing/site-footer";
import { SiteHeader } from "@/components/architecture-events/marketing/site-header";

type ArchitectureEventsLayoutProps = {
  children: ReactNode;
};

export default function ArchitectureEventsLayout({
  children,
}: ArchitectureEventsLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
