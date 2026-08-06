export const listingPlans = [
  {
    id: "basic",
    name: "Basic Listing",
    price: "Free",
    priceSuffix: "",
    badge: null,
    featured: false,
    buttonLabel: "Select Basic",
    benefits: [
      "Event listed on website",
      "Event appears in category + city filters",
      "Linked registration button",
      "Visible until event date",
    ],
  },
  {
    id: "featured",
    name: "Featured Listing",
    price: "$49",
    priceSuffix: "per event",
    badge: "MOST VISIBLE",
    featured: true,
    buttonLabel: "Select Featured",
    benefits: [
      "Placement near top of Events page",
      "\"Featured\" badge",
    ],
  },
] as const;

export const submitEventFaqItems = [
  {
    id: "approval-time",
    question: "How long does approval take?",
    answer:
      "Most submissions are reviewed within two business days. If we need a better image or a clearer description, we'll email you rather than reject the listing.",
  },
  {
    id: "edit-event",
    question: "Can I edit my event after it's published?",
    answer:
      "Yes. Organizers can request updates after publishing so listing details stay current before the event date.",
  },
  {
    id: "featured-listing",
    question: "What is a Featured Listing?",
    answer:
      "A Featured Listing adds stronger placement and visibility so your event appears more prominently across discovery surfaces.",
  },
  {
    id: "upgrade-listing",
    question: "Can I upgrade from a Community Listing to a Featured Listing?",
    answer:
      "Yes. You can upgrade later if you want more visibility once your listing is in progress.",
  },
  {
    id: "event-types",
    question: "What types of events can I submit?",
    answer:
      "Architecture Events supports conferences, product showcases, networking sessions, educational programmes, trade shows, and adjacent built-environment events.",
  },
] as const;
