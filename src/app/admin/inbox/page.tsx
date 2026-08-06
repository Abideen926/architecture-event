import type { Metadata } from "next";
import { AdminInboxPage } from "@/components/admin/admin-inbox-page";

export const metadata: Metadata = {
  title: "Admin Inbox | Architecture Events",
  description: "Work through contact and advertising inquiries routed into the platform inbox.",
};

export default function AdminInboxRoute() {
  return <AdminInboxPage />;
}
