import { appRoutes } from "@/lib/routes";

export const forgotPasswordPageContent = {
  title: "Reset your password",
  description:
    "Enter the email on your account and we'll send you a code to reset your password.",
  emailPlaceholder: "you@studio.com",
  submitLabel: "Send reset code",
  backPrompt: "Remember your password?",
  backCtaLabel: "Log in",
  backCtaHref: appRoutes.architectureEvents.login,
  image: "/images/login-pic.jfif",
  imageCaption: "We'll get you back into your account in a couple of steps.",
} as const;
