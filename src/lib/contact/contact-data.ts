export const contactPageContent = {
  kicker: "CONTACT US",
  title: "Let's Connect",
  description:
    "Have a question about submitting an event, upgrading a listing, advertising, or partnering with Architecture Events? Send a message and we'll get back to you as soon as possible.",
  email: "hello@architectureevents.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
  ],
  supportCards: [
    {
      title: "Interested in Advertising?",
      description:
        "Reach architects, designers, engineers, contractors, manufacturers, and other AEC professionals through Architecture Events.",
      ctaLabel: "View Advertising Opportunities",
      href: "/advertise",
    },
    {
      title: "Submitting an Event?",
      description:
        "You can submit an architecture, design, engineering, or construction industry event directly through the website.",
      ctaLabel: "Submit an Event",
      href: "/submit-event",
    },
  ],
} as const;

export const contactHelpOptions = [
  "Submit or update an event",
  "Advertising opportunities",
  "Brand partnership",
  "General question",
] as const;
