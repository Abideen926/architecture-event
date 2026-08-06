import type { Metadata } from "next";
import { AdminPaymentsPage } from "@/components/admin/admin-payments-page";

export const metadata: Metadata = {
  title: "Admin Payments | Architecture Events",
  description: "Track Stripe payments, invoices, receipts, and the internal ledger.",
};

export default function AdminPaymentsRoute() {
  return <AdminPaymentsPage />;
}
