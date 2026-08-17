import type { Metadata } from "next";
import { OrganizerSubmitPage } from "@/components/organizer/organizer-submit-page";

export const metadata: Metadata = {
  title: "Create Event | Admin | Architecture Events",
  description: "Create a new event listing from the admin dashboard.",
};

export default function AdminCreateEventPage() {
  return <OrganizerSubmitPage />;
}

