import type { SVGProps } from "react";
import { appRoutes } from "@/lib/routes";

function OverviewIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1.4" />
      <rect x="13" y="4" width="7" height="7" rx="1.4" />
      <rect x="4" y="13" width="7" height="7" rx="1.4" />
      <rect x="13" y="13" width="7" height="7" rx="1.4" />
    </svg>
  );
}

function EventsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function OrganizersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="9.5" cy="8.6" r="3.6" />
      <path d="M3.4 19.6c1-3.2 3.4-4.8 6.1-4.8s5.1 1.6 6.1 4.8M16.4 5.6a3.4 3.4 0 0 1 0 6.4M18.2 19.6c-.4-1.6-1-2.9-1.8-3.9" />
    </svg>
  );
}

function InboxIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.6 6.4 8.4 6.2 8.4-6.2" />
    </svg>
  );
}

function CreditIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <rect x="6" y="14" width="4" height="2" rx="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ReportsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 16V11" />
      <path d="M12 16V8" />
      <path d="M16 16V13" />
    </svg>
  );
}

function FeaturedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        d="M12 3.6l2.55 5.17 5.7.83-4.13 4.02.97 5.68L12 16.6l-5.09 2.7.97-5.68L3.75 9.6l5.7-.83L12 3.6z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const adminNavItems = [
  { href: appRoutes.admin.root, label: "Overview", icon: OverviewIcon },
  { href: appRoutes.admin.events, label: "Events", icon: EventsIcon },
  { href: appRoutes.admin.organizers, label: "Organizers", icon: OrganizersIcon },
  {
    href: appRoutes.admin.inbox,
    label: "Inbox & Messages",
    icon: InboxIcon,
    badge: "3",
  },
  {
    href: appRoutes.admin.payments,
    label: "Payments",
    icon: CreditIcon,
  },
  {
    href: appRoutes.admin.featuredRequests,
    label: "Featured Requests",
    icon: FeaturedIcon,
  },
  {
    href: appRoutes.admin.advertising,
    label: "Advertising",
    icon: CreditIcon,
  },
  { href: appRoutes.admin.reports, label: "Reports", icon: ReportsIcon },
] as const;

export const adminOverviewStats = [
  {
    label: "Total events",
    value: "148",
    rows: [
      { label: "Under review", value: "7" },
      { label: "Approved", value: "12" },
      { label: "Published", value: "121" },
    ],
  },
  {
    label: "Organizers",
    value: "64",
    detail: "3 joined this month",
  },
  {
    label: "Advertising inquiries",
    value: "5",
    accent: true,
    detail: "Pending a reply",
  },
  {
    label: "Contact messages",
    value: "9",
    accent: true,
    detail: "Unresolved",
  },
] as const;

export const adminAttentionItems = [
  {
    title: "7 events awaiting review",
    meta: "Oldest submitted Jul 19",
    actionLabel: "Review queue",
    href: appRoutes.admin.events,
    tone: "accent",
  },
  {
    title: "3 unread advertising inquiries",
    meta: "Brand Spotlight, Founding Partner, Sponsored Reel",
    actionLabel: "Open inbox",
    href: appRoutes.admin.inbox,
    tone: "accent",
  },
  {
    title: "1 listing needs a follow-up",
    meta: "Changes requested Jul 26 — no response yet",
    actionLabel: "View listing",
    href: appRoutes.admin.events,
    tone: "muted",
  },
  {
    title: "2 redirects need review",
    meta: "Flagged by SEO monitoring",
    actionLabel: "Open reports",
    href: appRoutes.admin.reports,
    tone: "muted",
  },
] as const;

export const adminEventRows = [
  {
    title: "Daylighting and Glazing Performance",
    organizer: "Northline Forum",
    category: "Education / CEU",
    submitted: "Jul 22, 2026",
    status: "Under Review",
    when: "Oct 8, 2026 · 9:00 AM",
    city: "Chicago, IL",
    packageName: "Featured Listing — $49",
    description:
      "A one-day technical program on glazing selection, daylight modelling, and post-occupancy measurement, with three AIA-accredited sessions and a manufacturer panel.",
    note: "Repeat of last year’s program with an expanded afternoon track.",
  },
  {
    title: "Mass Timber & Low-Carbon Structures",
    organizer: "Cedar & Frame Collective",
    category: "Product Showcase",
    submitted: "Jul 26, 2026",
    status: "Changes Requested",
    when: "Sep 29, 2026 · 10:00 AM",
    city: "Portland, OR",
    packageName: "Basic Listing — Free",
    description:
      "Product walkthroughs from six mass timber suppliers, plus a structural detailing clinic for design teams new to the material.",
    note: "Venue is confirmed; sponsor list still being finalised.",
  },
  {
    title: "AEC Practice Leaders Dinner",
    organizer: "Meridian Events Group",
    category: "Networking",
    submitted: "Jul 28, 2026",
    status: "Submitted",
    when: "Oct 21, 2026 · 6:30 PM",
    city: "Boston, MA",
    packageName: "Featured Listing — $49",
    description:
      "An invitation-style dinner for principals and studio directors, with a short moderated conversation on practice growth.",
    note: "Capacity capped at 80 seats.",
  },
  {
    title: "Facade Systems Summit 2026",
    organizer: "Northline Forum",
    category: "Conference",
    submitted: "Jul 14, 2026",
    status: "Published",
    when: "Sep 14, 2026 · 8:30 AM",
    city: "New York, NY",
    packageName: "Featured Listing — $49",
    description:
      "Two days on unitised curtain wall, thermal bridging, and facade retrofit economics, with a supplier exhibition floor.",
    note: "Registration link points to the organiser’s own platform.",
  },
  {
    title: "Interior Materials Week",
    organizer: "Studio Verde",
    category: "Exhibition",
    submitted: "Jul 30, 2026",
    status: "Draft",
    when: "Nov 17, 2026 · Online",
    city: "Online",
    packageName: "Basic Listing — Free",
    description:
      "A week-long online showcase of interior finishes, acoustics, and circular material sourcing.",
    note: "Still drafting session titles.",
  },
  {
    title: "Regional Contractors Expo",
    organizer: "Harbor Design Council",
    category: "Conference",
    submitted: "Jun 30, 2026",
    status: "Rejected",
    when: "Aug 19, 2026 · 9:00 AM",
    city: "Newark, NJ",
    packageName: "Basic Listing — Free",
    description: "Trade expo for regional general contractors and subcontractors.",
    note: "Submitted twice by mistake.",
  },
  {
    title: "BIM / VDC Coordination Forum",
    organizer: "Meridian Events Group",
    category: "Conference",
    submitted: "Jul 19, 2026",
    status: "Under Review",
    when: "Nov 5, 2026 · 9:00 AM",
    city: "San Diego, CA",
    packageName: "Basic Listing — Free",
    description:
      "Coordination workflows, clash management, and field verification practices for large project teams.",
    note: "Requesting an early publish date if possible.",
  },
] as const;

export const adminArchiveRows = [
  {
    title: "Adaptive Reuse Symposium",
    organizer: "Harbor Design Council",
    category: "Conference",
    eventDate: "May 12, 2026",
    result: "Completed",
  },
  {
    title: "Envelope Detailing Workshop",
    organizer: "Northline Forum",
    category: "Education / CEU",
    eventDate: "Apr 24, 2026",
    result: "Completed",
  },
  {
    title: "Spring Studio Mixer",
    organizer: "Meridian Events Group",
    category: "Networking",
    eventDate: "Mar 30, 2026",
    result: "Completed",
  },
  {
    title: "Acoustic Ceilings Product Day",
    organizer: "Studio Verde",
    category: "Product Showcase",
    eventDate: "Feb 18, 2026",
    result: "Completed",
  },
  {
    title: "Design Technology Conference",
    organizer: "Northline Forum",
    category: "Conference",
    eventDate: "Jan 27, 2026",
    result: "Completed",
  },
] as const;

export const adminEventCategories = [
  "Conference",
  "Product Showcase",
  "Education / CEU",
  "Networking",
  "Exhibition",
  "Awards",
] as const;

export const adminEventPricing = {
  featuredListing: "$49",
  brandSpotlight: "$299 / month",
} as const;

export const adminOrganizerRows = [
  {
    organization: "Northline Forum",
    contact: "Daniel Okafor",
    email: "daniel@northlineforum.com",
    listings: "12",
    joined: "Mar 2024",
    featured: true,
    active: true,
  },
  {
    organization: "Meridian Events Group",
    contact: "Sofia Alvarez",
    email: "sofia@meridianevents.com",
    listings: "9",
    joined: "Jul 2024",
    featured: false,
    active: true,
  },
  {
    organization: "Cedar & Frame Collective",
    contact: "Ben Whitaker",
    email: "ben@cedarframe.co",
    listings: "4",
    joined: "Nov 2025",
    featured: false,
    active: true,
  },
  {
    organization: "Studio Verde",
    contact: "Ana Mirković",
    email: "ana@studioverde.design",
    listings: "3",
    joined: "Feb 2026",
    featured: false,
    active: true,
  },
  {
    organization: "Harbor Design Council",
    contact: "Grace Lin",
    email: "grace@harbordesign.org",
    listings: "6",
    joined: "Sep 2023",
    featured: false,
    active: false,
  },
] as const;

export const adminInboxMessages = [
  {
    from: "Priya Raman — Solstice Glazing",
    subject: "Interested in Brand Spotlight for Q4",
    tag: "Advertising · Brand Spotlight",
    shortTag: "Advertising · Brand Spotlight",
    date: "Jul 31",
    kind: "Advertising",
    resolved: false,
    body: [
      "Hello,",
      "We would like to hold one of the Brand Spotlight positions for October through December and can provide creative by mid-September.",
      "Could you confirm availability and the invoicing process?",
      "Priya Raman",
      "Marketing Director, Solstice Glazing",
    ],
  },
  {
    from: "Tom Beaulieu — Arcform Systems",
    subject: "Founding Partner — is a slot still open?",
    tag: "Advertising · Founding Partner",
    shortTag: "Advertising · Founding Partner",
    date: "Jul 30",
    kind: "Advertising",
    resolved: false,
    body: [
      "Hi Kim,",
      "We were told the Founding Partner programme is limited to the first ten companies. Are any slots left for this year?",
      "Happy to jump on a call.",
      "Tom",
    ],
  },
  {
    from: "Sofia Alvarez — Meridian Events",
    subject: "Update the venue on a published listing",
    tag: "Submit/update event",
    shortTag: "Submit/update event",
    date: "Jul 30",
    kind: "Contact Us",
    resolved: false,
    body: [
      "Hello,",
      "The BIM / VDC Coordination Forum has moved to a larger room at the same convention centre. Could you update the venue line on the published listing?",
      "Thanks,",
      "Sofia Alvarez",
    ],
  },
  {
    from: "Marcus Hale — Halewood Timber",
    subject: "Sponsored Reel — production timeline",
    tag: "Advertising · Sponsored Reel",
    shortTag: "Advertising · Sponsored Reel",
    date: "Jul 28",
    kind: "Advertising",
    resolved: true,
    body: [
      "Thanks for the details on the Sponsored Reel.",
      "We are ready to proceed and can supply footage next week.",
      "Marcus Hale",
    ],
  },
  {
    from: "Elena Voss",
    subject: "Schema markup question on event pages",
    tag: "Technical support",
    shortTag: "Technical support",
    date: "Jul 27",
    kind: "Contact Us",
    resolved: false,
    body: [
      "Hello,",
      "Our SEO team noticed the event pages carry Event schema but not offers pricing. Is that intentional?",
      "Elena",
    ],
  },
  {
    from: "Jordan Pike — Pike & Co",
    subject: "Media partnership for our podcast",
    tag: "Media/promotional partnership",
    shortTag: "Media/promotional partnership",
    date: "Jul 25",
    kind: "Contact Us",
    resolved: false,
    body: [
      "Hi,",
      "We run a weekly AEC podcast and would like to explore a cross-promotional partnership around your featured events.",
      "Jordan Pike",
    ],
  },
  {
    from: "Amelia Grant",
    subject: "General question about listing an event series",
    tag: "General question",
    shortTag: "General question",
    date: "Jul 24",
    kind: "Contact Us",
    resolved: false,
    body: [
      "Hello,",
      "Is a recurring monthly series submitted once, or as separate listings each month?",
      "Amelia Grant",
    ],
  },
] as const;

export const spotlightSlots = [
  { slot: "Slot 1", company: "Solstice Glazing", until: "Through Sep 2026" },
  { slot: "Slot 2", company: "Halewood Timber", until: "Through Aug 2026" },
  { slot: "Slot 3", company: "Arcform Systems", until: "Through Oct 2026" },
] as const;

export const advertisingPackages = [
  {
    name: "Brand Spotlight",
    price: "$299 / month",
    holders: "Solstice Glazing, Halewood Timber, Arcform Systems",
    availability: "Full - 3 of 3 held",
  },
  {
    name: "Sponsored Reel",
    price: "$199 one-time",
    holders: "Halewood Timber",
    availability: "Open",
  },
  {
    name: "Industry Partnership",
    price: "From $499 - quote",
    holders: "Meridian Events Group",
    availability: "By quote",
  },
  {
    name: "Founding Partner",
    price: "$999 / year",
    holders: "Solstice Glazing, Arcform Systems, Pike & Co, +1",
    availability: "6 of 10 remaining",
  },
] as const;

export const stripePayments = [
  {
    date: "Jul 30, 2026",
    amount: "$299.00",
    packageName: "Brand Spotlight",
    customer: "Solstice Glazing",
  },
  {
    date: "Jul 28, 2026",
    amount: "$49.00",
    packageName: "Featured Listing",
    customer: "Northline Forum",
  },
  {
    date: "Jul 22, 2026",
    amount: "$199.00",
    packageName: "Sponsored Reel",
    customer: "Halewood Timber",
  },
  {
    date: "Jul 15, 2026",
    amount: "$999.00",
    packageName: "Founding Partner",
    customer: "Arcform Systems",
  },
] as const;

export const ledgerEntries = [
  {
    date: "Jul 29, 2026",
    description: "Brand Spotlight - Solstice Glazing (Aug)",
    amount: "+$299.00",
    invoice: "AE-1042",
  },
  {
    date: "Jul 21, 2026",
    description: "Reel editing - freelance",
    amount: "-$420.00",
    invoice: "AE-1041",
  },
  {
    date: "Jul 15, 2026",
    description: "Founding Partner - Arcform Systems",
    amount: "+$999.00",
    invoice: "AE-1040",
  },
  {
    date: "Jul 6, 2026",
    description: "Email platform - monthly",
    amount: "-$89.00",
    invoice: "AE-1039",
  },
] as const;

export const monthlyVolume = [
  { month: "AUG", submitted: 9, published: 7 },
  { month: "SEP", submitted: 12, published: 10 },
  { month: "OCT", submitted: 14, published: 11 },
  { month: "NOV", submitted: 10, published: 9 },
  { month: "DEC", submitted: 7, published: 6 },
  { month: "JAN", submitted: 13, published: 11 },
  { month: "FEB", submitted: 15, published: 12 },
  { month: "MAR", submitted: 18, published: 15 },
  { month: "APR", submitted: 16, published: 14 },
  { month: "MAY", submitted: 20, published: 17 },
  { month: "JUN", submitted: 17, published: 15 },
  { month: "JUL", submitted: 22, published: 18 },
] as const;

export const seoHealthItems = [
  {
    status: "ok",
    title: "42 pages indexed",
    detail: "Last crawl July 30, 2026 with no coverage errors",
  },
  {
    status: "ok",
    title: "Event schema present on 121 listings",
    detail: "Structured data validates successfully",
  },
  {
    status: "warn",
    title: "2 redirects need review",
    detail: "Legacy event URLs are resolving with two hops",
  },
  {
    status: "ok",
    title: "Sitemap submitted",
    detail: "Updated automatically on publish",
  },
] as const;

export const adminLeadVolume = {
  total: "3,482",
  detail: "All time · 412 in July",
  rows: [
    { label: "Saved events", value: "2,145", percentage: 100, tone: "dark" },
    { label: "Registration opt-ins", value: "1,337", percentage: 62, tone: "accent" },
  ],
} as const;
