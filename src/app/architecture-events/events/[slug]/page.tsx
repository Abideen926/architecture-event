import { EventDetailView } from "@/components/architecture-events/event/detail/event-detail-view";

type EventDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;

  return <EventDetailView id={slug} />;
}
