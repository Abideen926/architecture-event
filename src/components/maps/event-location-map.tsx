"use client";

import dynamic from "next/dynamic";

const EventLocationMapLeaflet = dynamic(
  () =>
    import("@/components/maps/event-location-map-leaflet").then(
      (mod) => mod.EventLocationMapLeaflet,
    ),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-[#EFE8DB]" />,
  },
);

type EventLocationMapProps = {
  latitude: number;
  longitude: number;
};

export function EventLocationMap(props: EventLocationMapProps) {
  return <EventLocationMapLeaflet {...props} />;
}
