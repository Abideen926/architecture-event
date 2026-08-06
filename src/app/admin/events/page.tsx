import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/admin-placeholder-page";

export const metadata: Metadata = {
  title: "Admin Events | Architecture Events",
  description: "Review, approve, reject, and configure event listings.",
};

export default function AdminEventsRoute() {
  return (
    <AdminPlaceholderPage
      title="Events review"
      description="Moderate submissions, review statuses, archive history, and listing settings."
    />
  );
}
