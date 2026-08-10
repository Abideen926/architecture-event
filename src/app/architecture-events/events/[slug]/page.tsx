import { notFound } from "next/navigation";
import { getEventDetailBySlug } from "@/lib/architecture-events/event/event-detail-data";
import { EventDetailHero } from "@/components/architecture-events/event/detail/event-detail-hero";
import { EventDetailContent } from "@/components/architecture-events/event/detail/event-detail-content";

type EventDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;
  const event = getEventDetailBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="ae-shell bg-white">
      <main>
        <EventDetailHero event={event} />
        <EventDetailContent event={event} />
      </main>
    </div>
  );
}
