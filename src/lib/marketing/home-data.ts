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
};

export type FeaturedEvent = {
  id: string;
  month: string;
  day: string;
  category: string;
  title: string;
  location: string;
  summary: string;
};

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
  },
  {
    id: "forest-accents",
    name: "Forest Accents",
    headline: "Biophilic design solutions that bring warmth, beauty, and connection to space.",
    summary:
      "Natural interior systems and material collections made for hospitality, workplace, and residential environments.",
    accent: "#5d6f53",
    token: "F",
  },
  {
    id: "company-name",
    name: "Company Name",
    headline: "A short description of the products, materials, or systems this brand brings to the AEC industry.",
    summary:
      "Reserved for future brand spotlight inventory and premium sponsor placement across the homepage.",
    accent: "#9f9b94",
    token: "C",
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
