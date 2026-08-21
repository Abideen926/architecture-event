import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordPage } from "@/components/architecture-events/auth/reset-password-page";

export const metadata: Metadata = {
  title: "Reset Password | Architecture Events",
  description: "Enter your reset code and choose a new password.",
};

export default function ResetPasswordRoute() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordPage />
    </Suspense>
  );
}
