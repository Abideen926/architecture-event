import { Bookmark, CircleUserRound, Clock3 } from "lucide-react";
import { appRoutes } from "@/lib/routes";

export const attendeeNavItems = [
  { href: appRoutes.attendee.root, label: "Saved Events", icon: Bookmark },
  { href: appRoutes.attendee.history, label: "Registration History", icon: Clock3 },
  { href: appRoutes.attendee.profile, label: "Profile", icon: CircleUserRound },
] as const;

export const attendeeSavedEvents = [
  {
    id: "e1",
    month: "SEP",
    day: "14",
    year: "2026",
    category: "CONFERENCE",
    title: "Facade Systems Summit 2026",
    city: "New York, NY",
    gradient: "from-[#d8d0c0] via-[#b89a70] to-[#675447]",
  },
  {
    id: "e2",
    month: "SEP",
    day: "29",
    year: "2026",
    category: "PRODUCT SHOWCASE",
    title: "Mass Timber & Low-Carbon Structures",
    city: "Portland, OR",
    gradient: "from-[#d6d6d2] via-[#9b8b79] to-[#53463f]",
  },
  {
    id: "e3",
    month: "OCT",
    day: "08",
    year: "2026",
    category: "EDUCATION / CEU",
    title: "Daylighting and Glazing Performance",
    city: "Chicago, IL",
    gradient: "from-[#e0d8ca] via-[#af8e66] to-[#5b4941]",
  },
  {
    id: "e4",
    month: "OCT",
    day: "21",
    year: "2026",
    category: "NETWORKING",
    title: "AEC Practice Leaders Dinner",
    city: "Boston, MA",
    gradient: "from-[#d8d4cf] via-[#9f7f67] to-[#493c38]",
  },
  {
    id: "e5",
    month: "NOV",
    day: "05",
    year: "2026",
    category: "CONFERENCE",
    title: "BIM / VDC Coordination Forum",
    city: "San Diego, CA",
    gradient: "from-[#d5d6d8] via-[#8a8f98] to-[#454b55]",
  },
  {
    id: "e6",
    month: "NOV",
    day: "17",
    year: "2026",
    category: "EXHIBITION",
    title: "Interior Materials Week",
    city: "Online",
    gradient: "from-[#e2ddd4] via-[#b69f88] to-[#665548]",
  },
] as const;

export const attendeeHistoryRows = [
  {
    category: "CONFERENCE",
    title: "Adaptive Reuse Symposium",
    date: "May 12, 2026",
    city: "Boston, MA",
    status: "Accessed",
  },
  {
    category: "EDUCATION / CEU",
    title: "Envelope Detailing Workshop",
    date: "Apr 24, 2026",
    city: "Chicago, IL",
    status: "Accessed",
  },
  {
    category: "NETWORKING",
    title: "Spring Studio Mixer",
    date: "Mar 30, 2026",
    city: "New York, NY",
    status: "Saved only",
  },
  {
    category: "PRODUCT SHOWCASE",
    title: "Acoustic Ceilings Product Day",
    date: "Feb 18, 2026",
    city: "Online",
    status: "Saved only",
  },
  {
    category: "CONFERENCE",
    title: "Design Technology Conference",
    date: "Jan 27, 2026",
    city: "San Diego, CA",
    status: "Accessed",
  },
] as const;

export const attendeeRoleOptions = [
  "Prefer not to say",
  "Architect",
  "Engineer",
  "Interior Designer",
  "Contractor",
  "Developer",
  "Manufacturer",
  "Consultant",
  "BIM / VDC",
  "Student",
] as const;

export const attendeeCategoryOptions = [
  "Conferences",
  "Sustainability",
  "Facade Systems",
  "BIM / VDC",
  "Interior Design",
  "AI in Design",
  "Networking",
  "Product Showcases",
  "Education / CEU",
] as const;

export const attendeeRegionOptions = [
  "New York, NY",
  "Chicago, IL",
  "Boston, MA",
  "San Diego, CA",
  "Los Angeles, CA",
  "Northeast",
  "Online",
] as const;

export const attendeeDefaultProfile = {
  fullName: "Maya Reyes",
  email: "maya@reyesstudio.com",
  role: "Architect",
  categories: ["Sustainability", "BIM / VDC", "Facade Systems"],
  regions: ["New York, NY"],
  newsletter: true,
} as const;
