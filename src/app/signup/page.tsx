import type { Metadata } from "next";
import { SignupPage } from "@/components/auth/signup-page";

export const metadata: Metadata = {
  title: "Sign Up | Architecture Events",
  description:
    "Create an Architecture Events account to save events, follow cities, and get curated reminders.",
};

export default function SignupRoute() {
  return <SignupPage />;
}
