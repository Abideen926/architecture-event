import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/admin-placeholder-page";

export const metadata: Metadata = {
  title: "Admin Organizers | Architecture Events",
  description: "Manage organizer accounts, status, and featured placements.",
};

export default function AdminOrganizersRoute() {
  return (
    <AdminPlaceholderPage
      title="Organizer management"
      description="Create organizer accounts, manage activity status, and assign featured treatment."
    />
  );
}
