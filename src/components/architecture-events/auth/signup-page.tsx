"use client";

import { useState } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signupPageContent } from "@/lib/architecture-events/auth/signup-data";
import { appRoutes } from "@/lib/routes";
import {
  useRegisterAttendeeMutation,
  useRegisterOrganizerMutation,
} from "@/features/auth/auth-api";
import { useGetCategoriesQuery } from "@/features/public/public-api";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/store/api-error";
import { PasswordInput } from "@/components/ui/password-input";
import { Input, inputFieldClassName } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AccountType = "attendee" | "organizer";

const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,72}$/;

export function SignupPage() {
  const content = signupPageContent;
  const router = useRouter();

  const [accountType, setAccountType] = useState<AccountType>("attendee");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [professionalRole, setProfessionalRole] = useState<string>(
    content.roles[0],
  );
  const [organizationName, setOrganizationName] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [newsletterEnabled, setNewsletterEnabled] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { data: categories } = useGetCategoriesQuery();
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<string>>(
    new Set(),
  );
  const [selectedCities, setSelectedCities] = useState<Set<string>>(
    () =>
      new Set(
        content.cities
          .filter((item) => item.selected)
          .map((item) => item.label),
      ),
  );

  const [registerAttendee, { isLoading: isRegisteringAttendee }] =
    useRegisterAttendeeMutation();
  const [registerOrganizer, { isLoading: isRegisteringOrganizer }] =
    useRegisterOrganizerMutation();
  const isSubmitting = isRegisteringAttendee || isRegisteringOrganizer;

  function toggleSelection(
    value: string,
    setCurrent: Dispatch<SetStateAction<Set<string>>>,
  ) {
    setCurrent((prev) => {
      const next = new Set(prev);

      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }

      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors: Record<string, string> = {};

    if (fullName.trim().length < 2)
      errors.fullName = "Full name must be at least 2 characters";
    if (!email.trim()) errors.email = "Email is required";
    if (!PASSWORD_RULE.test(password)) {
      errors.password =
        "Password must be 8+ characters with an uppercase, lowercase, and number";
    }
    if (accountType === "organizer" && organizationName.trim().length < 2) {
      errors.organizationName =
        "Organization name must be at least 2 characters";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    try {
      if (accountType === "organizer") {
        await registerOrganizer({
          fullName: fullName.trim(),
          email: email.trim(),
          password,
          organizationName: organizationName.trim(),
          website: website.trim() || undefined,
          phone: phone.trim() || undefined,
        }).unwrap();
      } else {
        await registerAttendee({
          fullName: fullName.trim(),
          email: email.trim(),
          password,
          professionalRole: professionalRole || undefined,
          followedCategoryIds: Array.from(selectedCategoryIds),
          followedLocations: Array.from(selectedCities),
          newsletterOptIn: newsletterEnabled,
        }).unwrap();
      }

      toast.success("Account created", {
        description: "We've sent a verification code to your email.",
      });
      router.push(
        `${appRoutes.architectureEvents.verifyEmail}?email=${encodeURIComponent(email.trim())}`,
      );
    } catch (error) {
      setFieldErrors(getApiFieldErrors(error));
      toast.error("Couldn't create your account", {
        description: getApiErrorMessage(error),
      });
    }
  }

  return (
    <div className="bg-white">
      <main className="animate-[fadeIn_0.4s_ease_both]">
        <section className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-16 xl:px-20 xl:py-[80px]">
          <div className="mx-auto max-w-[700px]">
            <h1 className="ae-section-heading text-[46px] leading-[1.08] tracking-[-0.02em] text-foreground">
              {content.title}
            </h1>

            <p className="ae-section-description mt-4 text-[16.5px] leading-[1.75]">
              {content.description}
            </p>

            <form
              className="mt-10 rounded-[20px] border border-[#E7E7E7] bg-white p-9"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <h2 className="text-[15px] font-bold text-foreground">
                  {content.accountTypeLabel}
                </h2>

                <div className="mt-4 inline-flex rounded-full border border-[#E7E7E7] p-1">
                  {(
                    [
                      { value: "attendee", label: content.attendeeToggleLabel },
                      {
                        value: "organizer",
                        label: content.organizerToggleLabel,
                      },
                    ] as const
                  ).map((option) => {
                    const isActive = accountType === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setAccountType(option.value)}
                        aria-pressed={isActive}
                        className={`inline-flex h-[40px] items-center rounded-full px-[22px] text-[14px] font-semibold transition-colors ${
                          isActive
                            ? "bg-[#1E1E1E] text-white"
                            : "text-[#3A3A3A] hover:text-foreground"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                {accountType === "organizer" ? (
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#6A6A6A]">
                    {content.organizerDescription}
                  </p>
                ) : null}
              </div>

              <div className="mt-8 grid gap-[18px] border-t border-[#E7E7E7] pt-7 md:grid-cols-2">
                <Input
                  label="Full name"
                  labelClassName="text-[#303030]"
                  error={fieldErrors.fullName}
                  tone="auth"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  autoComplete="name"
                />

                <Input
                  label="Email"
                  labelClassName="text-[#303030]"
                  error={fieldErrors.email}
                  tone="auth"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />

                <AuthField label="Password" error={fieldErrors.password}>
                  <PasswordInput
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className={fieldClassName}
                    autoComplete="new-password"
                  />
                </AuthField>

                {accountType === "attendee" ? (
                  <AuthField label="Role">
                    <select
                      value={professionalRole}
                      onChange={(event) =>
                        setProfessionalRole(event.target.value)
                      }
                      className={fieldClassName}
                    >
                      {content.roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </AuthField>
                ) : (
                  <>
                    <Input
                      label={content.organizationNameLabel}
                      labelClassName="text-[#303030]"
                      error={fieldErrors.organizationName}
                      tone="auth"
                      type="text"
                      value={organizationName}
                      onChange={(event) =>
                        setOrganizationName(event.target.value)
                      }
                    />

                    <Input
                      label={content.websiteLabel}
                      labelClassName="text-[#303030]"
                      error={fieldErrors.website}
                      tone="auth"
                      type="url"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                      placeholder={content.websitePlaceholder}
                    />

                    <Input
                      label={content.phoneLabel}
                      labelClassName="text-[#303030]"
                      error={fieldErrors.phone}
                      tone="auth"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder={content.phonePlaceholder}
                    />
                  </>
                )}
              </div>

              {accountType === "attendee" ? (
                <div className="mt-8 border-t border-[#E7E7E7] pt-7">
                  <PreferenceGroup
                    title="Favourite categories"
                    subtitle="optional"
                    items={(categories ?? []).map((category) => ({
                      label: category.name,
                      value: category.id,
                    }))}
                    selected={selectedCategoryIds}
                    onToggle={(value) =>
                      toggleSelection(value, setSelectedCategoryIds)
                    }
                  />

                  <div className="mt-7">
                    <PreferenceGroup
                      title="Cities you follow"
                      subtitle="optional"
                      items={content.cities.map((item) => ({
                        label: item.label,
                        value: item.label,
                      }))}
                      selected={selectedCities}
                      onToggle={(value) =>
                        toggleSelection(value, setSelectedCities)
                      }
                    />
                  </div>

                  <label className="mt-[30px] flex items-start gap-3 rounded-[16px] border border-[#E7E7E7] bg-[#FAFAFA] p-5">
                    <input
                      type="checkbox"
                      checked={newsletterEnabled}
                      onChange={(event) =>
                        setNewsletterEnabled(event.target.checked)
                      }
                      className="mt-[2px] h-[18px] w-[18px] accent-[#1E1E1E]"
                    />

                    <span className="text-[14.5px] leading-[1.7] text-[#3A3A3A]">
                      {content.newsletterLabel}{" "}
                      <span className="block">{content.newsletterNote}</span>
                    </span>
                  </label>
                </div>
              ) : null}

              <Button
                type="submit"
                size="lg"
                className="mt-7"
                isLoading={isSubmitting}
                loadingLabel="Creating account..."
              >
                {accountType === "organizer"
                  ? content.organizerSubmitLabel
                  : content.submitLabel}
              </Button>

              <p className="mt-[18px] text-center text-[14.5px] text-[#6A6A6A]">
                {content.loginPrompt}{" "}
                <Link
                  href={content.loginCtaHref}
                  className="ae-link-accent font-semibold"
                >
                  {content.loginCtaLabel}
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

const fieldClassName = inputFieldClassName("default", "auth");

type AuthFieldProps = {
  label: string;
  children: React.ReactNode;
  error?: string;
};

function AuthField({ label, children, error }: AuthFieldProps) {
  return (
    <label className="block">
      <span className="mb-[9px] block text-[13.5px] font-semibold text-[#303030]">
        {label}
      </span>

      {children}
      {error ? (
        <span className="mt-[7px] block text-[13px] text-[#B3261E]">
          {error}
        </span>
      ) : null}
    </label>
  );
}

type PreferenceItem = {
  label: string;
  value: string;
};

type PreferenceGroupProps = {
  title: string;
  subtitle: string;
  items: readonly PreferenceItem[];
  selected: Set<string>;
  onToggle: (value: string) => void;
};

function PreferenceGroup({
  title,
  subtitle,
  items,
  selected,
  onToggle,
}: PreferenceGroupProps) {
  return (
    <div>
      <h2 className="text-[15px] font-bold text-foreground">
        {title} <span className="font-medium text-[#6A6A6A]">— {subtitle}</span>
      </h2>

      <div className="mt-4 flex flex-wrap gap-2.5">
        {items.map((item) => {
          const isActive = selected.has(item.value);

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onToggle(item.value)}
              aria-pressed={isActive}
              className={`inline-flex h-[40px] items-center rounded-full border px-[18px] text-[14px] transition-colors ${
                isActive
                  ? "border-foreground bg-[#1E1E1E] text-white"
                  : "border-[#E7E7E7] bg-white text-[#3A3A3A] hover:border-foreground"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
