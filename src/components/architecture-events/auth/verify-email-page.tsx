"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { verifyEmailPageContent } from "@/lib/architecture-events/auth/verify-email-data";
import { appRoutes } from "@/lib/routes";
import {
  useResendOtpMutation,
  useVerifyEmailMutation,
} from "@/features/auth/auth-api";
import { getApiErrorMessage } from "@/lib/store/api-error";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ROLE_HOME: Record<string, string> = {
  ATTENDEE: appRoutes.attendee.root,
  ORGANIZER: appRoutes.organizer.root,
  ADMIN: appRoutes.admin.root,
};

export function VerifyEmailPage() {
  const content = verifyEmailPageContent;
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [cooldown, setCooldown] = useState(0);

  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((value) => value - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (otp.trim().length === 0) {
      setError("Enter the code we emailed you");
      return;
    }

    setError(undefined);

    try {
      const user = await verifyEmail({ email, otp: otp.trim() }).unwrap();
      toast.success("Email verified", {
        description: "Your account is ready to go.",
      });
      router.push(ROLE_HOME[user.role] ?? "/");
    } catch (submitError) {
      toast.error("Verification failed", {
        description: getApiErrorMessage(submitError),
      });
    }
  }

  async function handleResend() {
    try {
      await resendOtp({ email, purpose: "EMAIL_VERIFICATION" }).unwrap();
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
              href={appRoutes.architectureEvents.signup}
              className="ae-link-accent mt-4 inline-block font-semibold"
            >
              Back to sign up
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
              {content.description} Sent to{" "}
              <span className="font-semibold text-foreground">{email}</span>.
            </p>

            <form
              className="mt-[34px] grid gap-[18px]"
              onSubmit={handleSubmit}
              noValidate
            >
              <Input
                label="Verification code"
                labelClassName="text-[#303030]"
                error={error}
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
                {content.submitLabel}
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
