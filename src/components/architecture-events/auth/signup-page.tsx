"use client";

import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { signupPageContent } from "@/lib/architecture-events/auth/signup-data";

export function SignupPage() {
  const content = signupPageContent;
  const [selectedCategories, setSelectedCategories] = useState(
    () => new Set(content.categories.filter((item) => item.selected).map((item) => item.label)),
  );
  const [selectedCities, setSelectedCities] = useState(
    () => new Set(content.cities.filter((item) => item.selected).map((item) => item.label)),
  );
  const [newsletterEnabled, setNewsletterEnabled] = useState(true);

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

  return (
    <div className="bg-white">
      <main className="animate-[fadeIn_0.4s_ease_both]">
        <section className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-16 xl:px-20 xl:py-[80px]">
          <div className="mx-auto max-w-[700px]">
            <h1 className="ae-section-heading text-[46px] leading-[1.08] tracking-[-0.02em] text-[#202020]">
              {content.title}
            </h1>
            <p className="ae-section-description mt-4 text-[16.5px] leading-[1.75]">
              {content.description}
            </p>

            <form
              className="mt-10 rounded-[20px] border border-[#E7E7E7] bg-white p-9"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid gap-[18px] md:grid-cols-2">
                <AuthField label="Full name">
                  <input type="text" className={fieldClassName} />
                </AuthField>
                <AuthField label="Email">
                  <input type="email" className={fieldClassName} />
                </AuthField>
                <AuthField label="Password">
                  <input type="password" className={fieldClassName} />
                </AuthField>
                <AuthField label="Role">
                  <select
                    defaultValue={content.roles[0]}
                    className={fieldClassName}
                  >
                    {content.roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </AuthField>
              </div>

              <div className="mt-8 border-t border-[#E7E7E7] pt-7">
                <PreferenceGroup
                  title="Favourite categories"
                  subtitle="optional"
                  items={content.categories}
                  selected={selectedCategories}
                  onToggle={(label) => toggleSelection(label, setSelectedCategories)}
                />

                <div className="mt-7">
                  <PreferenceGroup
                    title="Cities you follow"
                    subtitle="optional"
                    items={content.cities}
                    selected={selectedCities}
                    onToggle={(label) => toggleSelection(label, setSelectedCities)}
                  />
                </div>

                <label className="mt-[30px] flex items-start gap-3 rounded-[16px] border border-[#E7E7E7] bg-[#FAFAFA] p-5">
                  <input
                    type="checkbox"
                    checked={newsletterEnabled}
                    onChange={(event) => setNewsletterEnabled(event.target.checked)}
                    className="mt-[2px] h-[18px] w-[18px] accent-[#1E1E1E]"
                  />
                  <span className="text-[14.5px] leading-[1.7] text-[#3A3A3A]">
                    {content.newsletterLabel}{" "}
                    <span className="block">{content.newsletterNote}</span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="mt-7 inline-flex h-[54px] w-full items-center justify-center rounded-[12px] bg-[#1E1E1E] text-[15.5px] font-semibold text-white transition-colors hover:bg-black"
              >
                {content.submitLabel}
              </button>

              <p className="mt-[18px] text-center text-[14.5px] text-[#6A6A6A]">
                {content.loginPrompt}{" "}
                <Link href={content.loginCtaHref} className="ae-link-accent font-semibold">
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

const fieldClassName =
  "h-[52px] w-full rounded-[12px] border border-[#E7E7E7] bg-white px-[16px] text-[15px] text-[#202020] outline-none transition-colors placeholder:text-[#8A8A8A] focus:border-[#C7B48D]";

type AuthFieldProps = {
  label: string;
  children: React.ReactNode;
};

function AuthField({ label, children }: AuthFieldProps) {
  return (
    <label className="block">
      <span className="mb-[9px] block text-[13.5px] font-semibold text-[#303030]">
        {label}
      </span>
      {children}
    </label>
  );
}

type PreferenceItem = {
  label: string;
  selected: boolean;
};

type PreferenceGroupProps = {
  title: string;
  subtitle: string;
  items: readonly PreferenceItem[];
  selected: Set<string>;
  onToggle: (label: string) => void;
};

function PreferenceGroup({ title, subtitle, items, selected, onToggle }: PreferenceGroupProps) {
  return (
    <div>
      <h2 className="text-[15px] font-bold text-[#202020]">
        {title} <span className="font-medium text-[#6A6A6A]">— {subtitle}</span>
      </h2>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {items.map((item) => {
          const isActive = selected.has(item.label);

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onToggle(item.label)}
              aria-pressed={isActive}
              className={`inline-flex h-[40px] items-center rounded-full border px-[18px] text-[14px] transition-colors ${
                isActive
                  ? "border-[#202020] bg-[#1E1E1E] text-white"
                  : "border-[#E7E7E7] bg-white text-[#3A3A3A] hover:border-[#202020]"
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
