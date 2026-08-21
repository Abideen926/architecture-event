export const resetPasswordPageContent = {
  title: "Enter your reset code",
  description: "Enter the 6-digit code we emailed you, then choose a new password.",
  otpPlaceholder: "000000",
  verifyLabel: "Verify code",
  resendLabel: "Resend code",
  resendCooldownSeconds: 60,
  newPasswordLabel: "New password",
  confirmPasswordLabel: "Confirm new password",
  submitLabel: "Reset password",
  missingEmailMessage: "We couldn't find an email to reset. Please start over.",
  image: "/images/login-pic.jfif",
  imageCaption: "Choose a strong password to keep your account secure.",
} as const;
