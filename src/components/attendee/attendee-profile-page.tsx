"use client";

import { useState } from "react";
import {
  attendeeCategoryOptions,
  attendeeDefaultProfile,
  attendeeRegionOptions,
  attendeeRoleOptions,
} from "@/lib/attendee/attendee-data";

function toggleInList(current: string[], value: string) {
  return current.includes(value)
    ? current.filter((entry) => entry !== value)
    : [...current, value];
}

export function AttendeeProfilePage() {
  const [fullName, setFullName] = useState(attendeeDefaultProfile.fullName);
  const [email, setEmail] = useState(attendeeDefaultProfile.email);
  const [role, setRole] = useState(attendeeDefaultProfile.role);
  const [categories, setCategories] = useState([...attendeeDefaultProfile.categories]);
  const [regions, setRegions] = useState([...attendeeDefaultProfile.regions]);
  const [newsletter, setNewsletter] = useState(attendeeDefaultProfile.newsletter);

  const resetProfile = () => {
    setFullName(attendeeDefaultProfile.fullName);
    setEmail(attendeeDefaultProfile.email);
    setRole(attendeeDefaultProfile.role);
    setCategories([...attendeeDefaultProfile.categories]);
    setRegions([...attendeeDefaultProfile.regions]);
    setNewsletter(attendeeDefaultProfile.newsletter);
  };

  return (
    <div className="max-w-[780px] animate-[fadeIn_0.35s_ease]">
      <div className="border-b border-[#E7E7E7] pb-5">
        <h2 className="ae-serif text-[30px] font-semibold tracking-[-0.015em] text-[#202020]">
          Profile
        </h2>
        <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
          Only your name and email are needed. Everything else is optional and just
          sharpens your recommendations.
        </p>
      </div>

      <div className="mt-[30px] rounded-[20px] border border-[#E7E7E7] p-6 md:p-9">
        <div className="grid gap-[18px] md:grid-cols-2">
          <label className="block">
            <span className="mb-[9px] block text-[13.5px] font-semibold">Full name</span>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-[9px] block text-[13.5px] font-semibold">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
            />
          </label>
        </div>

        <div className="mt-[26px]">
          <label className="block max-w-[380px]">
            <span className="mb-[9px] block text-[13.5px] font-semibold">
              Role <span className="font-medium text-[#6A6A6A]">- optional</span>
            </span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] bg-white px-[14px] text-[15px] text-[#202020] outline-none"
            >
              {attendeeRoleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-8 border-t border-[#E7E7E7] pt-7">
          <h3 className="text-[15px] font-bold text-[#202020]">
            Categories you follow <span className="font-medium text-[#6A6A6A]">- optional</span>
          </h3>
          <p className="mt-2 text-[14px] text-[#6A6A6A]">
            Tap to add or remove. Changes save as you go.
          </p>
          <div className="mt-4 flex flex-wrap gap-[10px]">
            {attendeeCategoryOptions.map((option) => {
              const active = categories.includes(option);

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCategories((current) => toggleInList(current, option))}
                  className={`rounded-full border px-[18px] py-[10px] text-[14px] transition-colors ${
                    active
                      ? "border-[#202020] bg-[#1E1E1E] text-white"
                      : "border-[#E7E7E7] bg-white text-[#202020] hover:border-[#202020]"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-7">
          <h3 className="text-[15px] font-bold text-[#202020]">
            Regions and cities you follow{" "}
            <span className="font-medium text-[#6A6A6A]">- optional</span>
          </h3>
          <div className="mt-4 flex flex-wrap gap-[10px]">
            {attendeeRegionOptions.map((option) => {
              const active = regions.includes(option);

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRegions((current) => toggleInList(current, option))}
                  className={`rounded-full border px-[18px] py-[10px] text-[14px] transition-colors ${
                    active
                      ? "border-[#202020] bg-[#1E1E1E] text-white"
                      : "border-[#E7E7E7] bg-white text-[#202020] hover:border-[#202020]"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-[30px] flex flex-col gap-5 rounded-[16px] border border-[#E7E7E7] bg-[#FAFAFA] p-[22px] sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[15px] font-semibold text-[#202020]">Monthly newsletter</p>
            <p className="mt-[7px] max-w-[52ch] text-[14.5px] leading-[1.7] text-[#6A6A6A]">
              A curated round-up of upcoming events. Unsubscribe anytime.
            </p>
          </div>
          <button
            type="button"
            title="Toggle newsletter"
            onClick={() => setNewsletter((current) => !current)}
            className={`flex h-[30px] w-[52px] flex-none items-center rounded-full border p-[3px] transition-colors ${
              newsletter
                ? "justify-end border-[#202020] bg-[#1E1E1E]"
                : "justify-start border-[#E7E7E7] bg-white"
            }`}
          >
            <span
              className={`block h-[22px] w-[22px] rounded-full ${
                newsletter ? "bg-white" : "bg-[#C9C9C9]"
              }`}
            />
          </button>
        </div>

        <div className="mt-[34px] flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-[12px] bg-[#1E1E1E] px-[26px] py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-black"
          >
            Save changes
          </button>
          <button
            type="button"
            onClick={resetProfile}
            className="rounded-[12px] border border-[#202020] bg-white px-[26px] py-[15px] text-[15px] font-semibold text-[#202020] transition-colors hover:bg-[#FAFAFA]"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="mt-[26px] rounded-[20px] border border-[#E7E7E7] p-6 md:p-9">
        <h3 className="ae-serif text-[22px] font-semibold tracking-[-0.01em] text-[#202020]">
          Account settings
        </h3>
        <div className="mt-[22px] grid gap-[18px] md:grid-cols-2">
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
          className="mt-[22px] rounded-[12px] border border-[#202020] bg-white px-6 py-[14px] text-[14.5px] font-semibold text-[#202020] transition-colors hover:bg-[#FAFAFA]"
        >
          Update password
        </button>
        <div className="mt-[26px] flex flex-wrap items-center justify-between gap-5 border-t border-[#E7E7E7] pt-[22px]">
          <p className="text-[14.5px] text-[#6A6A6A]">Signed in as maya@reyesstudio.com</p>
          <button
            type="button"
            className="text-[14.5px] font-semibold text-[var(--ae-accent)] transition-colors hover:text-[var(--ae-accent-strong)]"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
