import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/admin-placeholder-page";

export const metadata: Metadata = {
  title: "Admin Inbox | Architecture Events",
  description: "Work through contact and advertising inquiries routed into the platform inbox.",
};

export default function AdminInboxRoute() {
  return (
    <AdminPlaceholderPage
      title="Inbox workflow"
      description="Handle general contact messages, advertising inquiries, and support follow-ups."
    />
  );
}
