import type { Metadata } from "next";
import { AdminOrganizersPage } from "@/components/admin/admin-organizers-page";

export const metadata: Metadata = {
  title: "Admin Organizers | Architecture Events",
  description: "Manage organizer accounts, status, and featured placements.",
};

export default function AdminOrganizersRoute() {
  return <AdminOrganizersPage />;
}
