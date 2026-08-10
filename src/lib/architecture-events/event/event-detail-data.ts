export type EventStat = {
  label: string;
  value: string;
};

export type EventAgendaItem = {
  time: string;
  title: string;
  location: string;
};

export type EventSpeaker = {
  name: string;
  title: string;
  image: string;
};

export type EventRelatedItem = {
  id: string;
  month: string;
  day: string;
  title: string;
  location: string;
  image: string;
};

export type EventDetail = {
  id: string;
  category: string;
  registrationStatus: string;
  title: string;
  subtitle: string;
  heroImage: string;
  heroImageAlt: string;
  aboutHeading: string;
  about: string[];
  stats: EventStat[];
  priceLabel: string;
  price: string;
  priceNote: string;
  ctaLabel: string;
  ctaNote: string;
  organizerName: string;
  organizerEvents: string;
  agendaHeading: string;
  agendaDayLabel: string;
  agendaItems: EventAgendaItem[];
  speakersHeading: string;
  speakers: EventSpeaker[];
  venueHeading: string;
  venueName: string;
  venueAddress: string;
  sponsorsHeading: string;
  sponsors: string[];
  relatedHeading: string;
  relatedViewAllLabel: string;
  relatedEvents: EventRelatedItem[];
};

const bimWorldEvent: EventDetail = {
  id: "bim-world",
  category: "CONFERENCE",
  registrationStatus: "Registration open",
  title: "BIM World 2026",
  subtitle: "June 18–19, 2026 · San Diego Convention Center, San Diego, CA",
  heroImage:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
  heroImageAlt: "Architecture event keynote stage",
  aboutHeading: "About this event",
  about: [
    "Two days of practical sessions on digital delivery for design and construction teams. Sessions cover model coordination, data standards, automation in documentation, and how firms are restructuring their workflows around shared models.",
    "The programme is built for architects, engineers, VDC leads, and construction technology teams who want working detail rather than overview talks. Sessions are grouped into three tracks so you can follow one thread across both days.",
  ],
  stats: [
    { label: "DATE", value: "Jun 18–19, 2026" },
    { label: "TIME", value: "9:00 – 17:30 PST" },
    { label: "FORMAT", value: "In person" },
    { label: "ORGANIZER", value: "BIM World Group" },
  ],
  priceLabel: "From",
  price: "$540",
  priceNote: "Early rate until 30 April 2026",
  ctaLabel: "Register on organizer site",
  ctaNote: "No account needed to register",
  organizerName: "BIM World Group",
  organizerEvents: "12 events listed",
  agendaHeading: "Agenda",
  agendaDayLabel: "DAY ONE — 18 JUNE",
  agendaItems: [
    {
      time: "09:00",
      title: "Opening keynote: the shared model as contract",
      location: "Main hall",
    },
    {
      time: "10:30",
      title: "Coordination workshop: clash to consensus",
      location: "Track A · Room 204",
    },
    {
      time: "13:30",
      title: "Automating documentation without losing control",
      location: "Track B · Room 210",
    },
    {
      time: "16:00",
      title: "Networking reception",
      location: "Terrace",
    },
  ],
  speakersHeading: "Speakers",
  speakers: [
    { name: "Speaker name", title: "Title, Firm", image: "" },
    { name: "Speaker name", title: "Title, Firm", image: "" },
    { name: "Speaker name", title: "Title, Firm", image: "" },
    { name: "Speaker name", title: "Title, Firm", image: "" },
  ],
  venueHeading: "Venue & location",
  venueName: "San Diego Convention Center",
  venueAddress: "111 W Harbor Dr, San Diego, CA 92101",
  sponsorsHeading: "Sponsors",
  sponsors: ["Taylor Metals", "Forest Accents", "Sponsor logo", "Sponsor logo"],
  relatedHeading: "Related events",
  relatedViewAllLabel: "View all events",
  relatedEvents: [
    {
      id: "aia-conference",
      month: "MAY",
      day: "22–24",
      title: "AIA Conference on Architecture 2026",
      location: "Boston, MA",
      image:
        "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "next-acuity",
      month: "JUN",
      day: "05",
      title: "Next Acuity: Innovation in Building Design",
      location: "Chicago, IL",
      image:
        "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "women-in-architecture",
      month: "JUL",
      day: "10",
      title: "Women in Architecture Summit",
      location: "New York, NY",
      image:
        "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80",
    },
  ],
};

const eventDetailsBySlug: Record<string, EventDetail> = {
  "bim-world": bimWorldEvent,
};

export function getEventDetailBySlug(slug: string) {
  return eventDetailsBySlug[slug] ?? null;
}

