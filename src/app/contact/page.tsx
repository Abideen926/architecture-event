import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact | Architecture Events",
  description:
    "Get in touch about event submissions, advertising, partnerships, and general questions.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
