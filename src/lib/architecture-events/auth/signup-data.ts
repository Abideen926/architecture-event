import { appRoutes } from "@/lib/routes";

export const signupPageContent = {
  title: "Create your account",
  description:
    "Takes a minute. Everything below the password is optional — it just makes your recommendations better.",
  submitLabel: "Create account",
  loginPrompt: "Already have an account?",
  loginCtaLabel: "Log in",
  loginCtaHref: appRoutes.architectureEvents.login,
  roles: [
    "Architect",
    "Engineer",
    "Contractor",
    "Designer",
    "BIM / VDC",
    "Manufacturer",
    "Student",
  ] as const,
  categories: [
    { label: "Conferences", selected: false },
    { label: "Sustainability", selected: true },
    { label: "Facade Systems", selected: false },
    { label: "BIM / VDC", selected: true },
    { label: "Interior Design", selected: false },
    { label: "AI in Design", selected: false },
    { label: "Networking", selected: false },
  ],
  cities: [
    { label: "New York, NY", selected: true },
    { label: "Chicago, IL", selected: false },
    { label: "Boston, MA", selected: false },
    { label: "San Diego, CA", selected: false },
    { label: "Online", selected: false },
  ],
  newsletterLabel:
    "Send me the monthly newsletter — a curated round-up of upcoming events.",
  newsletterNote: "Unsubscribe anytime.",
} as const;
