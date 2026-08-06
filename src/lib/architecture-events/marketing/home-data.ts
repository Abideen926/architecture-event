export type HeroTag = {
  label: string;
};

export type BrandSpotlight = {
  id: string;
  name: string;
  headline: string;
  summary: string;
  accent: string;
  token: string;
  image: string;
};

export type FeaturedEvent = {
  id: string;
  month: string;
  day: string;
  category: string;
  title: string;
  location: string;
  summary: string;
  image: string;
};

export const heroImage =
  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=80";

export type ValuePoint = {
  title: string;
  description: string;
};

export const heroKeywordSuggestions: HeroTag[] = [
  { label: "Sustainability" },
  { label: "AI in Design" },
  { label: "Facade Systems" },
  { label: "Networking" },
  { label: "BIM" },
];

export const brandSpotlights: BrandSpotlight[] = [
  {
    id: "taylor-metals",
    name: "Taylor Metals",
    headline: "Architectural metal systems designed for clean, modern building envelopes.",
    summary:
      "Cladding, trim, and facade systems for projects that need precision, durability, and a strong architectural finish.",
    accent: "#c9b080",
    token: "T",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "forest-accents",
    name: "Forest Accents",
    headline: "Biophilic design solutions that bring warmth, beauty, and connection to space.",
    summary:
      "Natural interior systems and material collections made for hospitality, workplace, and residential environments.",
    accent: "#5d6f53",
    token: "F",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "company-name",
    name: "Company Name",
    headline: "A short description of the products, materials, or systems this brand brings to the AEC industry.",
    summary:
      "Reserved for future brand spotlight inventory and premium sponsor placement across the homepage.",
    accent: "#9f9b94",
    token: "C",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80",
  },
];

export const featuredEvents: FeaturedEvent[] = [
  {
    id: "aia-conference",
    month: "MAY",
    day: "22-24",
    category: "CONFERENCE",
    title: "AIA Conference on Architecture 2026",
    location: "Boston, MA",
    summary:
      "Three days of practice, technology, and materials sessions with the industry's largest exhibition floor.",
    image:
      "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "next-acuity",
    month: "JUN",
    day: "05",
    category: "PRODUCT SHOWCASE",
    title: "Next Acuity: Innovation in Building Design",
    location: "Chicago, IL",
    summary:
      "A one-day showcase of new envelope, lighting, and interior systems with manufacturer-led demos.",
    image:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "bim-world",
    month: "JUN",
    day: "18-19",
    category: "CONFERENCE",
    title: "BIM World 2026",
    location: "San Diego, CA",
    summary:
      "Digital delivery, model coordination, and data standards for design and construction teams.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "women-in-architecture",
    month: "JUL",
    day: "10",
    category: "NETWORKING EVENT",
    title: "Women in Architecture Summit",
    location: "New York, NY",
    summary:
      "An evening of talks and structured networking for practitioners across the built environment.",
    image:
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=70",
  },
];

export const valuePoints: ValuePoint[] = [
  {
    title: "Find Relevant Events",
    description:
      "Discover conferences, showcases, and networking events that align with your interests and goals.",
  },
  {
    title: "Connect & Network",
    description:
      "Build relationships with industry leaders, manufacturers, studios, consultants, and peers.",
  },
  {
    title: "Save & Organize",
    description:
      "Bookmark events and brand spotlights to plan your calendar before registration windows close.",
  },
  {
    title: "Stay Informed",
    description:
      "Get curated updates on events worth your time without digging through scattered industry channels.",
  },
];
