const architectureEventsBase = "/architecture-events";

export const appRoutes = {
  architectureEvents: {
    root: architectureEventsBase,
    events: `${architectureEventsBase}/events`,
    submitEvent: `${architectureEventsBase}/submit-event`,
    advertise: `${architectureEventsBase}/advertise`,
    about: `${architectureEventsBase}/about`,
    contact: `${architectureEventsBase}/contact`,
    login: `${architectureEventsBase}/login`,
    signup: `${architectureEventsBase}/signup`,
  },
  attendee: {
    root: "/attendee",
  },
  organizer: {
    root: "/organizer",
  },
  admin: {
    root: "/admin",
    events: "/admin/events",
    organizers: "/admin/organizers",
    inbox: "/admin/inbox",
    payments: "/admin/payments",
    reports: "/admin/reports",
  },
} as const;
