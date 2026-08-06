import type { Metadata } from "next";
import { LoginPage } from "@/components/auth/login-page";

export const metadata: Metadata = {
  title: "Log In | Architecture Events",
  description: "Sign in to access saved events, reminders, and your account.",
};

export default function LoginRoute() {
  return <LoginPage />;
}
