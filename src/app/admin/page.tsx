import type { Metadata } from "next";
import { AdminOverviewPage } from "@/components/admin/admin-overview-page";

export const metadata: Metadata = {
  title: "Admin Dashboard | Architecture Events",
  description:
    "Internal oversight for event reviews, organizers, inbox workflows, payments, and reports.",
};

export default function AdminOverviewRoute() {
  return <AdminOverviewPage />;
}
