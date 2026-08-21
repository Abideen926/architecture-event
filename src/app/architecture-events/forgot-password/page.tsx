import type { Metadata } from "next";
import { ForgotPasswordPage } from "@/components/architecture-events/auth/forgot-password-page";

export const metadata: Metadata = {
  title: "Reset Password | Architecture Events",
  description: "Request a password reset code for your account.",
};

export default function ForgotPasswordRoute() {
  return <ForgotPasswordPage />;
}
