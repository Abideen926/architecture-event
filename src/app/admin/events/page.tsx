import type { Metadata } from "next";
import { AdminEventsPage } from "@/components/admin/admin-events-page";

export const metadata: Metadata = {
  title: "Admin Events | Architecture Events",
  description: "Review, approve, reject, and configure event listings.",
};

export default function AdminEventsRoute() {
  return <AdminEventsPage />;
}
