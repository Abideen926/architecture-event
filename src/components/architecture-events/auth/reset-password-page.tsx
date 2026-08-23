"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { resetPasswordPageContent } from "@/lib/architecture-events/auth/reset-password-data";
import { appRoutes } from "@/lib/routes";
import {
  useResendOtpMutation,
  useResetPasswordMutation,
  useVerifyResetOtpMutation,
} from "@/features/auth/auth-api";
import { getApiErrorMessage } from "@/lib/store/api-error";
import { PasswordInput } from "@/components/ui/password-input";
import { Input, inputFieldClassName } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,72}$/;

export function ResetPasswordPage() {
  const content = resetPasswordPageContent;
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [stage, setStage] = useState<"otp" | "password">("otp");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cooldown, setCooldown] = useState(0);

  const [verifyResetOtp, { isLoading: isVerifying }] =
    useVerifyResetOtpMutation();
  const [resetPassword, { isLoading: isResetting }] =
    useResetPasswordMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((value) => value - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  async function handleVerifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (otp.trim().length === 0) {
      setErrors({ otp: "Enter the code we emailed you" });
      return;
    }

    setErrors({});

    try {
      await verifyResetOtp({ email, otp: otp.trim() }).unwrap();
      setStage("password");
    } catch (submitError) {
      toast.error("Code didn't verify", {
        description: getApiErrorMessage(submitError),
      });
    }
  }

  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors: Record<string, string> = {};

    if (!PASSWORD_RULE.test(newPassword)) {
      validationErrors.newPassword =
        "Password must be 8+ characters with an uppercase, lowercase, and number";
    }
    if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords don't match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await resetPassword({ newPassword }).unwrap();
      toast.success("Password reset", {
        description: "You can now log in with your new password.",
      });
      router.push(appRoutes.architectureEvents.login);
    } catch (submitError) {
      toast.error("Couldn't reset password", {
        description: getApiErrorMessage(submitError),
      });
    }
  }

  async function handleResend() {
    try {
      await resendOtp({ email, purpose: "PASSWORD_RESET" }).unwrap();
      toast.success("Code sent", {
        description: "Check your email for the new code.",
      });
      setCooldown(content.resendCooldownSeconds);
    } catch (resendError) {
      toast.error("Couldn't resend code", {
        description: getApiErrorMessage(resendError),
      });
    }
  }

  if (!email) {
    return (
      <div className="bg-white">
        <main className="flex min-h-[calc(100vh-76px)] items-center justify-center px-6 py-14 text-center">
          <div className="max-w-[420px]">
            <h1 className="ae-section-heading text-[32px] text-foreground">
              {content.missingEmailMessage}
            </h1>
            <Link
              href={appRoutes.architectureEvents.forgotPassword}
              className="ae-link-accent mt-4 inline-block font-semibold"
            >
              Back to reset request
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <main className="grid min-h-[calc(100vh-76px)] animate-[fadeIn_0.4s_ease_both] xl:grid-cols-[1fr_1fr]">
        <section className="flex items-center justify-center px-6 py-14 sm:px-10 lg:px-16 xl:p-[80px]">
          <div className="w-full max-w-[400px]">
            <h1 className="ae-section-heading text-[40px] leading-none tracking-[-0.02em] text-foreground">
              {content.title}
            </h1>
            <p className="ae-section-description mt-[14px] text-[15.5px] leading-[1.75]">
              {stage === "otp"
                ? content.description
                : `Choose a new password for ${email}.`}
            </p>

            {stage === "otp" ? (
              <>
                <form
                  className="mt-[34px] grid gap-[18px]"
                  onSubmit={handleVerifyOtp}
                  noValidate
                >
                  <Input
                    label="Verification code"
                    labelClassName="text-[#303030]"
                    error={errors.otp}
                    inputSize="lg"
                    tone="auth"
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    placeholder={content.otpPlaceholder}
                    className="tracking-[0.3em]"
                  />

                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isVerifying}
                    loadingLabel="Verifying..."
                  >
                    {content.verifyLabel}
                  </Button>
                </form>

                <p className="mt-[22px] text-[14.5px] leading-[1.75] text-[#6A6A6A]">
                  Didn&apos;t get a code?{" "}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isResending || cooldown > 0}
                    className="ae-link-accent font-semibold disabled:cursor-not-allowed disabled:text-[#B0A588]"
                  >
                    {cooldown > 0
                      ? `${content.resendLabel} (${cooldown}s)`
                      : content.resendLabel}
                  </button>
                </p>
              </>
            ) : (
              <form
                className="mt-[34px] grid gap-[18px]"
                onSubmit={handleResetPassword}
                noValidate
              >
                <label className="block">
                  <span className="mb-[9px] block text-[13.5px] font-semibold text-[#303030]">
                    {content.newPasswordLabel}
                  </span>
                  <PasswordInput
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    autoComplete="new-password"
                    className={fieldClassName}
                  />
                  {errors.newPassword ? (
                    <span className="mt-[7px] block text-[13px] text-[#B3261E]">
                      {errors.newPassword}
                    </span>
                  ) : null}
                </label>

                <label className="block">
                  <span className="mb-[9px] block text-[13.5px] font-semibold text-[#303030]">
                    {content.confirmPasswordLabel}
                  </span>
                  <PasswordInput
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    autoComplete="new-password"
                    className={fieldClassName}
                  />
                  {errors.confirmPassword ? (
                    <span className="mt-[7px] block text-[13px] text-[#B3261E]">
                      {errors.confirmPassword}
                    </span>
                  ) : null}
                </label>

                <Button
                  type="submit"
                  size="lg"
                  isLoading={isResetting}
                  loadingLabel="Saving..."
                >
                  {content.submitLabel}
                </Button>
              </form>
            )}
          </div>
        </section>

        <section className="relative hidden overflow-hidden bg-[#1E1E1E] xl:block">
          <Image
            src={content.image}
            alt="Modern building facade"
            fill
            sizes="50vw"
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,20,0.1),rgba(20,20,20,0.75))]" />
          <div className="absolute inset-x-[56px] bottom-[56px]">
            <p className="ae-serif text-[26px] leading-[1.35] tracking-[-0.03em] text-white">
              {content.imageCaption}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

const fieldClassName = inputFieldClassName("lg", "auth");
