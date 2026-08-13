import { appRoutes } from "@/lib/routes";

export const loginPageContent = {
  title: "Welcome back",
  description: "Sign in to reach your saved events and reminders.",
  emailPlaceholder: "you@studio.com",
  passwordPlaceholder: "........",
  forgotPasswordLabel: "Forgot password?",
  submitLabel: "Log In",
  accountPrompt: "New here?",
  accountCtaLabel: "Create an account",
  accountCtaHref: appRoutes.architectureEvents.signup,
  note: "You can browse and register for events without an account.",
  image:
    "/images/login-pic.jfif",
  imageCaption:
    "Save the events that matter, and get a reminder before registration closes.",
} as const;
