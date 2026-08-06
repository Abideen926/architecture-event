import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/admin-placeholder-page";

export const metadata: Metadata = {
  title: "Admin Payments | Architecture Events",
  description: "Track Stripe payments, invoices, receipts, and the internal ledger.",
};

export default function AdminPaymentsRoute() {
  return (
    <AdminPlaceholderPage
      title="Payments and ledger"
      description="Monitor paid placements, reconcile internal records, and prepare invoices and receipts."
    />
  );
}
