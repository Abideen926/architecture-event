const architectureEventsBase = "/architecture-events";

export const appRoutes = {
  architectureEvents: {
    root: architectureEventsBase,
    events: `${architectureEventsBase}/events`,
    eventDetail: (slug: string) => `${architectureEventsBase}/events/${slug}`,
    submitEvent: `${architectureEventsBase}/submit-event`,
    advertise: `${architectureEventsBase}/advertise`,
    about: `${architectureEventsBase}/about`,
    contact: `${architectureEventsBase}/contact`,
    login: `${architectureEventsBase}/login`,
    signup: `${architectureEventsBase}/signup`,
  },
  attendee: {
    root: "/attendee",
    history: "/attendee/history",
    profile: "/attendee/profile",
  },
  organizer: {
    root: "/organizer",
    submit: "/organizer/submit",
    account: "/organizer/account",
  },
  admin: {
    root: "/admin",
    events: "/admin/events",
    organizers: "/admin/organizers",
    inbox: "/admin/inbox",
    payments: "/admin/payments",
    advertising: "/admin/advertising",
    reports: "/admin/reports",
  },
} as const;
