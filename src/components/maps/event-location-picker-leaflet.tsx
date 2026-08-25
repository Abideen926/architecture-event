"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  useLazyReverseGeocodeQuery,
  useLazySearchGeocodeQuery,
} from "@/features/organizer/organizer-api";
import type { GeocodeResult } from "@/features/organizer/organizer-api";

const DEFAULT_CENTER: [number, number] = [20, 0];
const DEFAULT_ZOOM = 2;
const PINNED_ZOOM = 15;

// Inline SVG pin — avoids Leaflet's classic bundler-broken-default-icon
// problem (its default marker images don't resolve reliably through
// webpack/Turbopack) and matches the site's existing accent gold.
const pinIcon = L.divIcon({
  html: `<svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 0C6.7 0 0 6.7 0 15c0 10.9 12.4 24.8 14.1 26.6a1.2 1.2 0 0 0 1.8 0C17.6 39.8 30 25.9 30 15 30 6.7 23.3 0 15 0z" fill="#C79A4D"/>
    <circle cx="15" cy="15" r="6.2" fill="#FFFFFF"/>
  </svg>`,
  className: "",
  iconSize: [30, 42],
  iconAnchor: [15, 40],
});

export type PickedPlace = {
  city?: string;
  state?: string;
  address?: string;
  venueName?: string;
};

type EventLocationPickerLeafletProps = {
  latitude: string;
  longitude: string;
  onPositionChange: (lat: string, lng: string) => void;
  onPlaceSelected: (place: PickedPlace) => void;
};

export function EventLocationPickerLeaflet({
  latitude,
  longitude,
  onPositionChange,
  onPlaceSelected,
}: EventLocationPickerLeafletProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [triggerSearch, { isFetching }] = useLazySearchGeocodeQuery();
  const [triggerReverseGeocode, { isFetching: isReverseGeocoding }] =
    useLazyReverseGeocodeQuery();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasPin = latitude !== "" && longitude !== "";
  const position: [number, number] | null = hasPin
    ? [Number(latitude), Number(longitude)]
    : null;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 3) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const data = await triggerSearch(query.trim()).unwrap();
        setResults(data);
        setIsOpen(true);
      } catch {
        setResults([]);
      }
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function handleSelectResult(result: GeocodeResult) {
    setQuery(result.displayName);
    setIsOpen(false);
    onPositionChange(String(result.latitude), String(result.longitude));
    onPlaceSelected({
      city: result.city,
      state: result.state,
      address: result.displayName,
      venueName: result.venueName,
    });
  }

  // Click/drag doesn't come with address data attached (unlike a search
  // selection, which already has it) — reverse-geocode the dropped point so
  // Venue name/Address/City/State fill in automatically too. The organizer
  // can still freely edit any of those fields afterward.
  async function handleMapPick(lat: number, lng: number) {
    onPositionChange(String(lat), String(lng));
    try {
      const result = await triggerReverseGeocode({ lat, lon: lng }).unwrap();
      if (result) {
        onPlaceSelected({
          city: result.city,
          state: result.state,
          address: result.displayName,
          venueName: result.venueName,
        });
      }
    } catch {
      // best-effort — leave venue/address fields as the organizer last set them
    }
  }

  return (
    <div>
      <span className="mb-[9px] block text-[13.5px] font-semibold">
        Pin this event on the map
      </span>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder="Search for an address, venue, or city "
          className="h-[52px] w-full rounded-[12px] z-10 border border-ae-border px-4 text-[15px] outline-none focus:border-[#C7B48D]"
        />
        {isFetching ? (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-ae-muted">
            Searching…
          </span>
        ) : null}

        {isOpen && results.length > 0 ? (
          <ul className="absolute z-20 mt-1 max-h-[280px] w-full overflow-y-auto rounded-[12px] border border-ae-border bg-white shadow-[0_12px_30px_-16px_rgba(20,20,20,0.25)]">
            {results.map((result, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleSelectResult(result)}
                  className="block w-full px-4 py-3 text-left text-[14px] leading-[1.4] text-[#3A3A3A] hover:bg-mainbackground"
                >
                  {result.displayName}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-3 h-[450px] z-0 relative w-full overflow-hidden rounded-[14px] border border-ae-border">
        <MapContainer
          center={position ?? DEFAULT_CENTER}
          zoom={hasPin ? PINNED_ZOOM : DEFAULT_ZOOM}
          scrollWheelZoom
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickToPlacePin onPick={handleMapPick} />
          <RecenterOnPositionChange position={position} />
          {position ? (
            <DraggablePin position={position} onPick={handleMapPick} />
          ) : null}
        </MapContainer>
      </div>

      <p className="mt-2 text-[12.5px] text-ae-muted">
        {isReverseGeocoding
          ? "Looking up the venue and address for this point…"
          : hasPin
            ? `Pinned at ${Number(latitude).toFixed(5)}, ${Number(longitude).toFixed(5)} — drag the marker to fine-tune. Venue and address below are editable.`
            : "Search above, or click the map to drop a pin — venue and address fill in automatically and you can still edit them."}
      </p>
    </div>
  );
}

function ClickToPlacePin({
  onPick,
}: {
  onPick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(event) {
      onPick(event.latlng.lat, event.latlng.lng);
    },
  });
  return null;
}

function RecenterOnPositionChange({
  position,
}: {
  position: [number, number] | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!position) return;
    map.setView(position, Math.max(map.getZoom(), PINNED_ZOOM));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position?.[0], position?.[1]]);

  return null;
}

function DraggablePin({
  position,
  onPick,
}: {
  position: [number, number];
  onPick: (lat: number, lng: number) => void;
}) {
  const markerRef = useRef<L.Marker | null>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (!marker) return;
        const latLng = marker.getLatLng();
        onPick(latLng.lat, latLng.lng);
      },
    }),
    [onPick],
  );

  return (
    <Marker
      position={position}
      icon={pinIcon}
      draggable
      eventHandlers={eventHandlers}
      ref={markerRef}
    />
  );
}
