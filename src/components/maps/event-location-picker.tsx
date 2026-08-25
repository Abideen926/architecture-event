"use client";

import dynamic from "next/dynamic";
import type { PickedPlace } from "@/components/maps/event-location-picker-leaflet";

export type { PickedPlace };

// Leaflet touches `window` at import time, so it can never run during SSR —
// load the real implementation only on the client.
const EventLocationPickerLeaflet = dynamic(
  () =>
    import("@/components/maps/event-location-picker-leaflet").then(
      (mod) => mod.EventLocationPickerLeaflet,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] w-full animate-pulse rounded-[14px] border border-ae-border bg-mainbackground" />
    ),
  },
);

type EventLocationPickerProps = {
  latitude: string;
  longitude: string;
  onPositionChange: (lat: string, lng: string) => void;
  onPlaceSelected: (place: PickedPlace) => void;
};

export function EventLocationPicker(props: EventLocationPickerProps) {
  return <EventLocationPickerLeaflet {...props} />;
}
