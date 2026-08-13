import { AdminAdvertising } from "@/components/admin/admin-advertising";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Payments | Architecture Events",
  description:
    "Track Stripe payments, invoices, receipts, and the internal ledger.",
};

export default function AdminAdverstisingRoute() {
  return <AdminAdvertising />;
}
