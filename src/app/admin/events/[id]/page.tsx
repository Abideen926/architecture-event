import type { Metadata } from "next";
import { AdminEventReviewPage } from "@/components/admin/admin-event-review-page";

export const metadata: Metadata = {
  title: "Review Event | Architecture Events",
  description: "Full event detail for admin review.",
};

type AdminEventReviewRouteProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEventReviewRoute({ params }: AdminEventReviewRouteProps) {
  const { id } = await params;

  return <AdminEventReviewPage id={id} />;
}
