import type { Metadata } from "next";
import { AdminReportsPage } from "@/components/admin/admin-reports-page";

export const metadata: Metadata = {
  title: "Admin Reports | Architecture Events",
  description: "Reporting views for volume, performance, and SEO health.",
};

export default function AdminReportsRoute() {
  return <AdminReportsPage />;
}
