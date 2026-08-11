export const advertisingPackages = [
  {
    id: "brand-spotlight",
    name: "Brand Spotlight",
    price: "$299",
    priceSuffix: "/month",
    badge: "MOST VISIBLE",
    featured: true,
    description:
      "Put your brand in front of the AEC community with premium exposure across the Architecture Events platform and social media channels.",
    label: "INCLUDES:",
    details: [
      "Featured placement in the Brand Spotlight section on the homepage",
      "Company logo and featured image",
      "Company overview (100-200 words)",
      "Direct link to your website",
      "Call-to-action button",
      "One dedicated Instagram feed post",
      "One Instagram Story",
      "One LinkedIn feature/post",
      "Featured Brand designation for the month",
    ],
    note: "Limited to 4 companies per month.",
    buttonLabel: "Get Started",
    buttonVariant: "solid",
  },
  {
    id: "sponsored-reel",
    name: "Sponsored Reel",
    price: "$199",
    priceSuffix: "one-time",
    badge: null,
    featured: false,
    description:
      "Showcase your company, product, project, or event through a dedicated Instagram Reel.",
    label: "INCLUDES:",
    details: [
      "One Instagram Reel",
      "Company tagging (when applicable)",
      "Promotion through the Architecture Events Instagram account",
    ],
    note: null,
    buttonLabel: "Get Started",
    buttonVariant: "outline",
  },
  {
    id: "industry-partnership",
    name: "Industry Partnership",
    price: "Starting at $499",
    priceSuffix: "",
    badge: null,
    featured: false,
    description:
      "Create a customized marketing campaign designed to maximize your company's visibility within the AEC community.",
    label: "PARTNERSHIPS MAY INCLUDE:",
    details: [
      "Brand Spotlight",
      "Instagram promotion",
      "LinkedIn promotion",
      "Event promotion before, during, and after your event",
      "Event recap coverage",
      "Dedicated landing page",
      "Custom marketing campaigns",
      "Priority exposure across the platform",
    ],
    note:
      "Every partnership is customized based on your marketing goals and campaign objectives.",
    buttonLabel: "Contact Us for a Custom Proposal",
    buttonVariant: "outline",
  },
  {
    id: "founding-partner",
    name: "Founding Partner",
    price: "$999",
    priceSuffix: "/year",
    badge: null,
    featured: false,
    description:
      "Become one of the first companies to support Architecture Events and be recognized as a Founding Partner.",
    label: "INCLUDES:",
    details: [
      "Founding Partner recognition on the website",
      "Quarterly Brand Spotlight (4 per year)",
      "Quarterly Instagram feature",
      "Quarterly LinkedIn feature",
      "Company logo displayed in the Founding Partners section",
      "Priority consideration for future promotional opportunities",
    ],
    note: "Limited to the first 10 partners.",
    buttonLabel: "Become a Founding Partner",
    buttonVariant: "outline",
  },
] as const;

export const advertiseFaqItems = [
  {
    id: "brand-spotlight",
    question: "What is Brand Spotlight?",
    answer:
      "Brand Spotlight is a featured placement in the Brand Spotlight section on the homepage, paired with social coverage. It includes your logo and featured image, a 100-200 word company overview, a direct link to your site, a call-to-action button, and a Featured Brand designation for the month.",
  },
  {
    id: "campaign-length",
    question: "How long does my campaign run?",
    answer:
      "Brand Spotlight runs for one calendar month. Sponsored Reels are a one-time placement. Industry Partnerships are scoped to your campaign, and Founding Partner runs for a full year.",
  },
  {
    id: "customize-partnership",
    question: "Can I customize an Industry Partnership?",
    answer:
      "Yes - every partnership is built around your marketing goals. Tell us what you're promoting and when, and we'll put together a custom proposal combining spotlight, social, event, and landing-page elements.",
  },
  {
    id: "brand-spotlight-availability",
    question: "How many Brand Spotlight positions are available each month?",
    answer:
      "Four. Spots are filled on a first-come basis, so we recommend booking a month or two ahead for a specific window.",
  },
  {
    id: "campaign-go-live",
    question: "When will my campaign go live?",
    answer:
      "Once assets are received and the placement is confirmed, campaigns typically go live at the start of the next available month. Sponsored Reels are usually published within one to two weeks.",
  },
  {
    id: "submit-assets",
    question: "How do I submit my company assets (logo, images, etc.)?",
    answer:
      "After booking we'll email you an asset checklist and an upload link. We ask for a vector or high-resolution logo, one or more landscape images at 1600x900 or larger, and your company overview copy.",
  },
] as const;
