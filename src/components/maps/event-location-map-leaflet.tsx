"use client";

type EventLocationMapLeafletProps = {
  latitude: number;
  longitude: number;
};

// Google's keyless embed ("output=embed") — no API key/billing needed,
// unlike the Maps JavaScript API/Places API. Used instead of the Leaflet
// map for read-only display.
export function EventLocationMapLeaflet({
  latitude,
  longitude,
}: EventLocationMapLeafletProps) {
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <a
      href={mapUrl}
      target="_blank"
      rel="noreferrer"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </a>
  );
}
