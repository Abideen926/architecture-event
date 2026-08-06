"use client";

import { Check } from "lucide-react";
import { useState } from "react";

export function OrganizerAccountPage() {
  const [partnerState, setPartnerState] = useState<"closed" | "open" | "sent">("closed");

  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <div className="border-b border-[#E7E7E7] pb-5">
        <h2 className="ae-serif text-[30px] font-semibold tracking-[-0.015em] text-[#202020]">
          Account
        </h2>
        <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
          Your login, your organization details, and partnership requests.
        </p>
      </div>

      <div className="mt-[20px] rounded-[20px] border border-[#E7E7E7] p-6 md:px-6 md:py-7">
        <h3 className="ae-serif text-[22px] font-semibold tracking-[-0.01em] text-[#202020]">
          Login credentials
        </h3>
        <label className="mt-[18px] block max-w-[400px]">
          <span className="mb-[9px] block text-[13.5px] font-semibold">Email</span>
          <input
            type="email"
            defaultValue="daniel@northlineforum.com"
            className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
          />
        </label>
        <div className="mt-[10px] grid gap-[16px] md:grid-cols-2">
          <label className="block">
            <span className="mb-[9px] block text-[13.5px] font-semibold">Current password</span>
            <input
              type="password"
              placeholder="********"
              className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-[9px] block text-[13.5px] font-semibold">New password</span>
            <input
              type="password"
              placeholder="At least 8 characters"
              className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
            />
          </label>
        </div>
        <button
          type="button"
          className="mt-[14px] rounded-[12px] border border-[#202020] bg-white px-6 py-[14px] text-[14.5px] font-semibold text-[#202020] transition-colors hover:bg-[#FAFAFA]"
        >
          Update password
        </button>
      </div>

      <div className="mt-[18px] rounded-[20px] border border-[#E7E7E7] p-6 md:px-6 md:py-7">
        <h3 className="ae-serif text-[22px] font-semibold tracking-[-0.01em] text-[#202020]">
          Organization
        </h3>
        <div className="mt-[18px] grid gap-[16px] md:grid-cols-2">
          <label className="block">
            <span className="mb-[9px] block text-[13.5px] font-semibold">Organization name</span>
            <input
              type="text"
              defaultValue="Northline Forum"
              className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-[9px] block text-[13.5px] font-semibold">Website</span>
            <input
              type="url"
              defaultValue="northlineforum.com"
              className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-[9px] block text-[13.5px] font-semibold">Contact name</span>
            <input
              type="text"
              defaultValue="Daniel Okafor"
              className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-[9px] block text-[13.5px] font-semibold">Phone</span>
            <input
              type="tel"
              defaultValue="(212) 555-0148"
              className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
            />
          </label>
        </div>
        <button
          type="button"
          className="mt-4 rounded-[10px] bg-[#232323] px-[22px] py-[12px] text-[14.5px] font-semibold text-white transition-colors hover:bg-black"
        >
          Save changes
        </button>
      </div>

      <div className="mt-[18px] rounded-[20px] border border-[#E7E7E7] p-6 md:px-6 md:py-7">
        <h3 className="ae-serif text-[22px] font-semibold tracking-[-0.01em] text-[#202020]">
          Partnership request
        </h3>
        <p className="mt-3 max-w-[62ch] text-[15.5px] leading-[1.75] text-[#6A6A6A]">
          A formal partnership lets attendees register for your events natively on
          Architecture Events, with registrations fully tracked on your listing instead
          of handed off to an external page.
        </p>

        {partnerState === "closed" ? (
          <button
            type="button"
            onClick={() => setPartnerState("open")}
            className="mt-6 rounded-[12px] border border-[#202020] bg-white px-6 py-[14px] text-[14.5px] font-semibold text-[#202020] transition-colors hover:bg-[#FAFAFA]"
          >
            Request Partnership
          </button>
        ) : null}

        {partnerState === "open" ? (
          <div className="mt-6 grid gap-[18px] border-t border-[#E7E7E7] pt-[26px] animate-[fadeIn_0.3s_ease]">
            <div className="grid gap-[18px] md:grid-cols-2">
              <label className="block">
                <span className="mb-[9px] block text-[13.5px] font-semibold">Your name</span>
                <input
                  type="text"
                  defaultValue="Daniel Okafor"
                  className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-[9px] block text-[13.5px] font-semibold">Company</span>
                <input
                  type="text"
                  defaultValue="Northline Forum"
                  className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-[9px] block text-[13.5px] font-semibold">Message</span>
              <textarea
                rows={4}
                placeholder="Tell us about your events and how many you run each year."
                className="w-full rounded-[12px] border border-[#E7E7E7] px-4 py-[14px] text-[15px] leading-[1.7] outline-none resize-y"
              />
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setPartnerState("sent")}
                className="rounded-[12px] bg-[#1E1E1E] px-[26px] py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-black"
              >
                Send request
              </button>
              <button
                type="button"
                onClick={() => setPartnerState("closed")}
                className="rounded-[12px] border border-[#202020] bg-white px-[26px] py-[15px] text-[15px] font-semibold text-[#202020] transition-colors hover:bg-[#FAFAFA]"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}

        {partnerState === "sent" ? (
          <div className="mt-6 flex items-start gap-3 rounded-[16px] border border-[#E7E7E7] bg-[#F1EEE8] px-[22px] py-5 animate-[fadeIn_0.3s_ease]">
            <span className="mt-1 inline-flex h-[20px] w-[20px] items-center justify-center text-[var(--ae-accent)]">
              <Check className="h-[17px] w-[17px]" strokeWidth={2.1} />
            </span>
            <p className="text-[15px] leading-[1.7] text-[#3A3A3A]">
              Request sent. The Architecture Events team will follow up by email within
              a few business days.
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-[18px] flex flex-wrap items-center justify-between gap-5 border-t border-[#E7E7E7] pt-[16px]">
        <p className="text-[14.5px] text-[#6A6A6A]">
          Signed in as daniel@northlineforum.com
        </p>
        <button
          type="button"
          className="text-[14.5px] font-semibold text-[var(--ae-accent)] transition-colors hover:text-[var(--ae-accent-strong)]"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
