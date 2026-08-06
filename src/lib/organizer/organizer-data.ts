import { CircleUserRound, List, Plus } from "lucide-react";
import { appRoutes } from "@/lib/routes";

export const organizerNavItems = [
  { href: appRoutes.organizer.root, label: "My Listings", icon: List },
  { href: appRoutes.organizer.submit, label: "Submit New Event", icon: Plus },
  { href: appRoutes.organizer.account, label: "Account", icon: CircleUserRound },
] as const;

export const organizerListings = [
  {
    category: "CONFERENCE",
    title: "Facade Systems Summit 2026",
    meta: "Submitted Jul 14, 2026 - Sep 14, 2026 - New York, NY",
    status: "Published",
  },
  {
    category: "EDUCATION / CEU",
    title: "Daylighting and Glazing Performance",
    meta: "Submitted Jul 22, 2026 - Oct 8, 2026 - Chicago, IL",
    status: "Under Review",
  },
  {
    category: "PRODUCT SHOWCASE",
    title: "Mass Timber & Low-Carbon Structures",
    meta: "Submitted Jul 26, 2026 - Sep 29, 2026 - Portland, OR",
    status: "Changes Requested",
    note: "Admin has requested changes to the event description - please add the session schedule and confirm the CEU credit count.",
  },
  {
    category: "NETWORKING",
    title: "AEC Practice Leaders Dinner",
    meta: "Submitted Jul 28, 2026 - Oct 21, 2026 - Boston, MA",
    status: "Submitted",
  },
  {
    category: "EXHIBITION",
    title: "Interior Materials Week",
    meta: "Not yet submitted - Nov 17, 2026 - Online",
    status: "Draft",
  },
  {
    category: "CONFERENCE",
    title: "Regional Contractors Expo",
    meta: "Submitted Jun 30, 2026 - Aug 19, 2026 - Newark, NJ",
    status: "Rejected",
    note: "Not approved - the listing duplicates an existing published event. Reply to the review email if you believe this was a mistake.",
  },
] as const;

export const organizerPackages = [
  {
    id: "basic",
    name: "Basic Listing",
    price: "Free",
    points: [
      "Standard directory listing",
      "Appears in category and city filters",
      "Linked registration button",
      "Visible until the event date",
    ],
  },
  {
    id: "featured",
    name: "Featured Listing",
    price: "$49",
    points: [
      "Everything in Basic",
      "Placement near the top of the Events page",
      'A "Featured" badge on your listing',
    ],
  },
] as const;

export const organizerUploadImages = ["e1", "e3", "e5"] as const;

export const organizerDefaultForm = {
  eventName: "Facade Systems Summit 2026",
  eventDate: "2026-09-14",
  city: "New York, NY",
  venue: "Pier 57",
  category: "Conference",
  registrationUrl: "https://northlineforum.com/facade-summit",
  description:
    "A one-day summit for architects, facade consultants, and manufacturers focused on high-performance envelope design, detailing, and case studies.",
  notes: "Editorial note: keynote speaker announcement lands next week.",
  contactName: "Daniel Okafor",
  contactEmail: "daniel@northlineforum.com",
  phone: "",
  organization: "Northline Forum",
} as const;
