import type { Metadata } from "next";
import { Suspense } from "react";
import { VerifyEmailPage } from "@/components/architecture-events/auth/verify-email-page";

export const metadata: Metadata = {
  title: "Verify Email | Architecture Events",
  description: "Verify your email to finish creating your account.",
};

export default function VerifyEmailRoute() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailPage />
    </Suspense>
  );
}
