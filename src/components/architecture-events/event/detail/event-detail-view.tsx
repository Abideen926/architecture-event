"use client";

import { notFound } from "next/navigation";
import { useGetPublicEventQuery } from "@/features/public/public-api";
import { EventDetailHero } from "@/components/architecture-events/event/detail/event-detail-hero";
import { EventDetailContent } from "@/components/architecture-events/event/detail/event-detail-content";

type EventDetailViewProps = {
  id: string;
};

export function EventDetailView({ id }: EventDetailViewProps) {
  const { data: event, isLoading, isError, error } = useGetPublicEventQuery(id);

  if (isLoading) {
    return (
      <div className="ae-shell bg-[#F7F4EF]">
        <div className="h-[482px] animate-pulse bg-[#E7E1D6]" />
      </div>
    );
  }

  if (isError) {
    const statusCode = (error as { statusCode?: number } | undefined)?.statusCode;
    if (statusCode === 404) {
      notFound();
    }
    return (
      <div className="ae-shell flex min-h-[50vh] items-center justify-center bg-[#F7F4EF] text-center">
        <p className="text-[16px] text-[#6A6A6A]">Couldn&apos;t load this event. Please try again.</p>
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="ae-shell bg-[#F7F4EF]">
      <main>
        <EventDetailHero event={event} />
        <EventDetailContent event={event} />
      </main>
    </div>
  );
}
