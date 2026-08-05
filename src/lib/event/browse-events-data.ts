export type BrowseEvent = {
  id: string;
  month: string;
  day: string;
  category: string;
  title: string;
  location: string;
  price: string;
  summary: string;
  image: string;
};

export const browseEvents: BrowseEvent[] = [
  {
    id: "aia-conference",
    month: "MAY",
    day: "22-24",
    category: "CONFERENCE",
    title: "AIA Conference on Architecture 2026",
    location: "Boston, MA",
    price: "From $540",
    summary:
      "Three days of practice, technology, and materials sessions with the industry's largest exhibition floor.",
    image:
      "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "next-acuity",
    month: "JUN",
    day: "05",
    category: "PRODUCT SHOWCASE",
    title: "Next Acuity: Innovation in Building Design",
    location: "Chicago, IL",
    price: "Free",
    summary:
      "A one-day showcase of new envelope, lighting, and interior systems with manufacturer-led demos.",
    image:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "bim-world",
    month: "JUN",
    day: "18-19",
    category: "CONFERENCE",
    title: "BIM World 2026",
    location: "San Diego, CA",
    price: "From $540",
    summary:
      "Digital delivery, model coordination, and data standards for design and construction teams.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "women-in-architecture",
    month: "JUL",
    day: "10",
    category: "NETWORKING EVENT",
    title: "Women in Architecture Summit",
    location: "New York, NY",
    price: "From $120",
    summary:
      "An evening of talks and structured networking for practitioners across the built environment.",
    image:
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "facade-retrofit",
    month: "AUG",
    day: "14",
    category: "EDUCATIONAL PROGRAM",
    title: "Facade Performance in Retrofit",
    location: "Online",
    price: "Free",
    summary:
      "A two-hour clinic on thermal bridging, glazing selection, and moisture risk in existing buildings.",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "materials-methods",
    month: "SEP",
    day: "02-04",
    category: "TRADE SHOW",
    title: "Materials & Methods Expo",
    location: "Chicago, IL",
    price: "From $85",
    summary:
      "Concrete, timber, steel, and glass suppliers with a full programme of specification workshops.",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80",
  },
];

export const eventTypes = [
  "Conference",
  "Product Showcase",
  "Networking Event",
  "Educational Program",
  "Trade Show",
] as const;

export const priceFilters = ["Free", "Paid"] as const;

export const industryFilters = [
  "Architecture",
  "Engineering",
  "Construction",
  "BIM / VDC",
  "Interior Design",
] as const;
