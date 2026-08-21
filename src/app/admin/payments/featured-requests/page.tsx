import type { Metadata } from "next";
import { AdminFeaturedRequestsPage } from "@/components/admin/admin-featured-requests-page";

export const metadata: Metadata = {
  title: "Featured Listing Requests | Architecture Events",
  description: "Review, approve, reject, and search all Featured Listing requests.",
};

export default function AdminFeaturedRequestsRoute() {
  return <AdminFeaturedRequestsPage />;
}
