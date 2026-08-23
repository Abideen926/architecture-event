"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { forgotPasswordPageContent } from "@/lib/architecture-events/auth/forgot-password-data";
import { appRoutes } from "@/lib/routes";
import { useForgotPasswordMutation } from "@/features/auth/auth-api";
import { getApiErrorMessage } from "@/lib/store/api-error";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ForgotPasswordPage() {
  const content = forgotPasswordPageContent;
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Email is required");
      return;
    }

    setError(undefined);

    try {
      await forgotPassword({ email: trimmedEmail }).unwrap();
      toast.success("Check your email", {
        description:
          "If an account exists for that email, a reset code is on its way.",
      });
      router.push(
        `${appRoutes.architectureEvents.resetPassword}?email=${encodeURIComponent(trimmedEmail)}`,
      );
    } catch (submitError) {
      toast.error("Something went wrong", {
        description: getApiErrorMessage(submitError),
      });
    }
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
              {content.description}
            </p>

            <form
              className="mt-[34px] grid gap-[18px]"
              onSubmit={handleSubmit}
              noValidate
            >
              <Input
                label="Email"
                labelClassName="text-[#303030]"
                error={error}
                inputSize="lg"
                tone="auth"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={content.emailPlaceholder}
                autoComplete="email"
              />

              <Button
                type="submit"
                size="lg"
                isLoading={isLoading}
                loadingLabel="Sending..."
              >
                {content.submitLabel}
              </Button>
            </form>

            <p className="mt-[26px] text-[14.5px] leading-[1.75] text-[#6A6A6A]">
              {content.backPrompt}{" "}
              <Link
                href={content.backCtaHref}
                className="ae-link-accent font-semibold"
              >
                {content.backCtaLabel}
              </Link>
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
