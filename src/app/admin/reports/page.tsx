import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/admin-placeholder-page";

export const metadata: Metadata = {
  title: "Admin Reports | Architecture Events",
  description: "Reporting views for volume, performance, and SEO health.",
};

export default function AdminReportsRoute() {
  return (
    <AdminPlaceholderPage
      title="Reports"
      description="Track submission volume, publication performance, and search health across the platform."
    />
  );
}
