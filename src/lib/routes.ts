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
    forgotPassword: `${architectureEventsBase}/forgot-password`,
    resetPassword: `${architectureEventsBase}/reset-password`,
    verifyEmail: `${architectureEventsBase}/verify-email`,
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
    featureSuccess: "/organizer/feature/success",
    featureCancelled: "/organizer/feature/cancelled",
  },
  admin: {
    root: "/admin",
    events: "/admin/events",
    createEvent: "/admin/events/create",
    organizers: "/admin/organizers",
    inbox: "/admin/inbox",
    payments: "/admin/payments",
    featuredRequests: "/admin/payments/featured-requests",
    eventDetail: (id: string) => `/admin/events/${id}`,
    advertising: "/admin/advertising",
    reports: "/admin/reports",
  },
} as const;
