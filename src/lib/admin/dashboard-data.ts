import {
  BarChart3,
  CalendarDays,
  CreditCard,
  Inbox,
  LayoutGrid,
  Users,
} from "lucide-react";
import { appRoutes } from "@/lib/routes";

export const adminNavItems = [
  { href: appRoutes.admin.root, label: "Overview", icon: LayoutGrid },
  { href: appRoutes.admin.events, label: "Events", icon: CalendarDays },
  { href: appRoutes.admin.organizers, label: "Organizers", icon: Users },
  {
    href: appRoutes.admin.inbox,
    label: "Inbox & Messages",
    icon: Inbox,
    badge: "3",
  },
  {
    href: appRoutes.admin.payments,
    label: "Payments & Advertising",
    icon: CreditCard,
  },
  { href: appRoutes.admin.reports, label: "Reports", icon: BarChart3 },
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
    meta: "Changes requested Jul 26 - no response yet",
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
  },
  {
    title: "Mass Timber & Low-Carbon Structures",
    organizer: "Cedar & Frame Collective",
    category: "Product Showcase",
    submitted: "Jul 26, 2026",
    status: "Changes Requested",
  },
  {
    title: "AEC Practice Leaders Dinner",
    organizer: "Meridian Events Group",
    category: "Networking",
    submitted: "Jul 28, 2026",
    status: "Submitted",
  },
  {
    title: "Facade Systems Summit 2026",
    organizer: "Northline Forum",
    category: "Conference",
    submitted: "Jul 14, 2026",
    status: "Published",
  },
  {
    title: "Interior Materials Week",
    organizer: "Studio Verde",
    category: "Exhibition",
    submitted: "Jul 30, 2026",
    status: "Draft",
  },
  {
    title: "Regional Contractors Expo",
    organizer: "Harbor Design Council",
    category: "Conference",
    submitted: "Jun 30, 2026",
    status: "Rejected",
  },
  {
    title: "BIM / VDC Coordination Forum",
    organizer: "Meridian Events Group",
    category: "Conference",
    submitted: "Jul 19, 2026",
    status: "Under Review",
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
