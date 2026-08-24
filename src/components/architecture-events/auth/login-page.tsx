"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { loginPageContent } from "@/lib/architecture-events/auth/login-data";
import { appRoutes } from "@/lib/routes";
import { useLoginMutation } from "@/features/auth/auth-api";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/store/api-error";
import { PasswordInput } from "@/components/ui/password-input";
import { Input, inputFieldClassName } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ROLE_HOME: Record<string, string> = {
  ATTENDEE: appRoutes.attendee.root,
  ORGANIZER: appRoutes.organizer.root,
  ADMIN: appRoutes.admin.root,
};

export function LoginPage() {
  const content = loginPageContent;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setFieldErrors({
        ...(trimmedEmail ? {} : { email: "Email is required" }),
        ...(password ? {} : { password: "Password is required" }),
      });
      return;
    }

    try {
      const user = await login({ email: trimmedEmail, password }).unwrap();
      toast.success("Welcome back", {
        description: `Signed in as ${user.fullName}.`,
      });

      const redirect = searchParams.get("redirect");
      const target =
        redirect && redirect.startsWith("/")
          ? redirect
          : (ROLE_HOME[user.role] ?? "/");
      router.push(target);
    } catch (error) {
      setFieldErrors(getApiFieldErrors(error));
      toast.error("Couldn't sign you in", {
        description: getApiErrorMessage(
          error,
          "Check your email and password and try again.",
        ),
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
                error={fieldErrors.email}
                inputSize="lg"
                tone="auth"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={content.emailPlaceholder}
                autoComplete="email"
              />

              <label className="block">
                <span className="mb-[9px] flex items-center justify-between text-[13.5px] font-semibold text-[#303030]">
                  <span>Password</span>
                  <Link
                    href={appRoutes.architectureEvents.forgotPassword}
                    className="ae-link-accent font-medium"
                  >
                    {content.forgotPasswordLabel}
                  </Link>
                </span>
                <PasswordInput
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={content.passwordPlaceholder}
                  autoComplete="current-password"
                  className={fieldClassName}
                />
                {fieldErrors.password ? (
                  <span className="mt-[7px] block text-[13px] text-[#B3261E]">
                    {fieldErrors.password}
                  </span>
                ) : null}
              </label>

              <Button
                type="submit"
                size="lg"
                isLoading={isLoading}
                loadingLabel="Signing in..."
              >
                {content.submitLabel}
              </Button>
            </form>

            <p className="mt-[26px] text-[14.5px] leading-[1.75] text-ae-muted">
              {content.accountPrompt}{" "}
              <Link
                href={content.accountCtaHref}
                className="ae-link-accent font-semibold"
              >
                {content.accountCtaLabel}
              </Link>
            </p>
            <p className="mt-[16px] text-[13.5px] leading-[1.75] text-ae-muted">
              {content.note}
            </p>
          </div>
        </section>

        <section className="relative hidden overflow-hidden bg-foreground xl:block">
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
