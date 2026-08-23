import type { Metadata } from "next";
import { appRoutes } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

export const metadata: Metadata = {
  title: "Create Event | Admin | Architecture Events",
  description: "Create a new event listing from the admin dashboard.",
};

export default function AdminCreateEventPage() {
  return (
    <div className="rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] px-10 py-16 text-center">
      <Heading level="section" as="h2">
        Admins don&apos;t create events directly
      </Heading>
      <p className="mx-auto mt-3 max-w-[52ch] text-[15px] leading-[1.75] text-[#6A6A6A]">
        The API only supports organizers submitting their own events for review. From here you
        can approve, request changes on, or reject events organizers have already submitted.
      </p>
      <Button href={appRoutes.admin.events} size="md" className="mt-6">
        Go to Events
      </Button>
    </div>
  );
}
