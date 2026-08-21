"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { attendeeRegionOptions, attendeeRoleOptions } from "@/lib/attendee/attendee-data";
import { appRoutes } from "@/lib/routes";
import { useGetMeQuery, useLogoutMutation } from "@/features/auth/auth-api";
import {
  useGetAttendeeProfileQuery,
  useUpdateAttendeeProfileMutation,
} from "@/features/attendee/attendee-api";
import { useGetCategoriesQuery } from "@/features/public/public-api";
import { useChangeMyPasswordMutation, useUpdateMyProfileMutation } from "@/features/users/users-api";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/store/api-error";
import { useConfirm } from "@/components/ui/modal-provider";
import { PasswordInput } from "@/components/ui/password-input";

function toggleInList(current: string[], value: string) {
  return current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value];
}

const inputClassName =
  "h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none focus:border-[#C7B48D]";

export function AttendeeProfilePage() {
  const router = useRouter();
  const confirm = useConfirm();

  const { data: me } = useGetMeQuery();
  const { data: profile } = useGetAttendeeProfileQuery();
  const { data: categories } = useGetCategoriesQuery();

  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<string>(attendeeRoleOptions[0]);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [newsletter, setNewsletter] = useState(true);
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  const [updateMyProfile, { isLoading: isSavingName }] = useUpdateMyProfileMutation();
  const [updateAttendeeProfile, { isLoading: isSavingProfile }] = useUpdateAttendeeProfileMutation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [changePassword, { isLoading: isChangingPassword }] = useChangeMyPasswordMutation();

  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (me) setFullName(me.fullName);
  }, [me]);

  useEffect(() => {
    if (profile) {
      setRole(profile.professionalRole || attendeeRoleOptions[0]);
      setCategoryIds(profile.followedCategories.map((category) => category.id));
      setRegions(profile.followedLocations);
      setNewsletter(profile.newsletterOptIn);
    }
  }, [profile]);

  function resetProfile() {
    if (me) setFullName(me.fullName);
    if (profile) {
      setRole(profile.professionalRole || attendeeRoleOptions[0]);
      setCategoryIds(profile.followedCategories.map((category) => category.id));
      setRegions(profile.followedLocations);
      setNewsletter(profile.newsletterOptIn);
    }
  }

  async function handleSave() {
    setProfileErrors({});
    try {
      await Promise.all([
        updateMyProfile({ fullName: fullName.trim() }).unwrap(),
        updateAttendeeProfile({
          professionalRole: role,
          followedCategoryIds: categoryIds,
          followedLocations: regions,
          newsletterOptIn: newsletter,
        }).unwrap(),
      ]);
      toast.success("Profile updated");
    } catch (error) {
      setProfileErrors(getApiFieldErrors(error));
      toast.error("Couldn't save profile", { description: getApiErrorMessage(error) });
    }
  }

  async function handleChangePassword() {
    if (!currentPassword || !newPassword) {
      setPasswordErrors({
        ...(currentPassword ? {} : { currentPassword: "Current password is required" }),
        ...(newPassword ? {} : { newPassword: "New password is required" }),
      });
      return;
    }
    setPasswordErrors({});

    try {
      await changePassword({ currentPassword, newPassword }).unwrap();
      toast.success("Password updated");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      setPasswordErrors(getApiFieldErrors(error));
      toast.error("Couldn't update password", { description: getApiErrorMessage(error) });
    }
  }

  async function handleLogout() {
    const confirmed = await confirm({
      title: "Log out?",
      description: "You'll need to sign in again to see your saved events.",
      confirmLabel: "Log out",
    });
    if (!confirmed) return;

    await logout();
    router.push(appRoutes.architectureEvents.login);
  }

  return (
    <div className="animate-[fadeIn_0.35s_ease] max-w-[780px]">
      <div style={{ paddingBottom: 20, borderBottom: "1px solid #E7E7E7" }}>
        <h2 className="ae-serif m-0 text-[30px] font-semibold tracking-[-0.015em] text-[#202020]">
          Profile
        </h2>
        <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
          Only your name and email are needed. Everything else is optional and just
          sharpens your recommendations.
        </p>
      </div>

      <div className="mt-[30px] rounded-[20px] border border-[#E7E7E7] p-[36px]">
        <div className="grid gap-[18px] md:grid-cols-2">
          <label className="block">
            <span className="mb-[9px] block text-[13.5px] font-semibold">Full name</span>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className={inputClassName}
            />
            {profileErrors.fullName ? (
              <span className="mt-[7px] block text-[13px] text-[#B3261E]">
                {profileErrors.fullName}
              </span>
            ) : null}
          </label>
          <label className="block">
            <span className="mb-[9px] block text-[13.5px] font-semibold">Email</span>
            <input
              type="email"
              value={me?.email ?? ""}
              disabled
              className={`${inputClassName} cursor-not-allowed bg-[#FAFAFA] text-[#6A6A6A]`}
            />
          </label>
        </div>

        <div className="mt-[26px]">
          <label className="block max-w-[380px]">
            <span className="mb-[9px] block text-[13.5px] font-semibold">
              Role <span className="font-medium text-[#6A6A6A]">— optional</span>
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

        <div className="mt-[32px] border-t border-[#E7E7E7] pt-[28px]">
          <h3 className="m-0 text-[15px] font-bold text-[#202020]">
            Categories you follow <span className="font-medium text-[#6A6A6A]">— optional</span>
          </h3>
          <p className="mt-[8px] text-[14px] text-[#6A6A6A]">
            Tap to add or remove. Changes save when you hit &quot;Save changes&quot;.
          </p>
          <div className="mt-[16px] flex flex-wrap gap-[10px]">
            {(categories ?? []).map((category) => {
              const active = categoryIds.includes(category.id);

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setCategoryIds((current) => toggleInList(current, category.id))}
                  className={`rounded-full border px-[18px] py-[6px] text-[14px] transition-colors ${
                    active
                      ? "border-[#202020] bg-[#1E1E1E] text-white"
                      : "border-[#E7E7E7] bg-white text-[#202020] hover:border-[#202020]"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-[28px]">
          <h3 className="m-0 text-[15px] font-bold text-[#202020]">
            Regions and cities you follow{" "}
            <span className="font-medium text-[#6A6A6A]">— optional</span>
          </h3>
          <div className="mt-[16px] flex flex-wrap gap-[10px]">
            {attendeeRegionOptions.map((option) => {
              const active = regions.includes(option);

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRegions((current) => toggleInList(current, option))}
                  className={`rounded-full border px-[18px] py-[6px] text-[14px] transition-colors ${
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

        <div className="mt-[30px] flex items-start justify-between gap-6 rounded-[16px] border border-[#E7E7E7] bg-[#FAFAFA] p-[22px]">
          <div>
            <p className="m-0 text-[15px] font-semibold text-[#202020]">Monthly newsletter</p>
            <p className="mt-[7px] max-w-[52ch] text-[14.5px] leading-[1.7] text-[#6A6A6A]">
              A curated round-up of upcoming events. Unsubscribe anytime.
            </p>
          </div>
          <button
            type="button"
            title="Toggle newsletter"
            onClick={() => setNewsletter((current) => !current)}
            className={`flex h-[30px] w-[52px] flex-none rounded-full border p-[3px] transition-colors ${
              newsletter ? "justify-end border-[#202020] bg-[#1E1E1E]" : "justify-start border-[#E7E7E7] bg-white"
            }`}
          >
            <span className={`block h-[22px] w-[22px] rounded-full ${newsletter ? "bg-white" : "bg-[#C9C9C9]"}`} />
          </button>
        </div>

        <div className="mt-[34px] flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSavingName || isSavingProfile}
            className="rounded-[12px] bg-[#1E1E1E] px-[26px] py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSavingName || isSavingProfile ? "Saving..." : "Save changes"}
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

      <div className="mt-[26px] rounded-[20px] border border-[#E7E7E7] p-[36px]">
        <h3 className="ae-serif m-0 text-[22px] font-semibold tracking-[-0.01em] text-[#202020]">
          Account settings
        </h3>
        <div className="mt-[22px] grid gap-[18px] md:grid-cols-2">
          <label className="block">
            <span className="mb-[9px] block text-[13.5px] font-semibold">Current password</span>
            <PasswordInput
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="********"
              className={inputClassName}
            />
            {passwordErrors.currentPassword ? (
              <span className="mt-[7px] block text-[13px] text-[#B3261E]">
                {passwordErrors.currentPassword}
              </span>
            ) : null}
          </label>
          <label className="block">
            <span className="mb-[9px] block text-[13.5px] font-semibold">New password</span>
            <PasswordInput
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              className={inputClassName}
            />
            {passwordErrors.newPassword ? (
              <span className="mt-[7px] block text-[13px] text-[#B3261E]">
                {passwordErrors.newPassword}
              </span>
            ) : null}
          </label>
        </div>
        <button
          type="button"
          onClick={handleChangePassword}
          disabled={isChangingPassword}
          className="mt-[22px] rounded-[12px] border border-[#202020] bg-white px-6 py-[14px] text-[14.5px] font-semibold text-[#202020] transition-colors hover:bg-[#FAFAFA] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isChangingPassword ? "Updating..." : "Update password"}
        </button>
        <div className="mt-[26px] flex flex-wrap items-center justify-between gap-5 border-t border-[#E7E7E7] pt-[22px]">
          <p className="text-[14.5px] text-[#6A6A6A]">Signed in as {me?.email}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="text-[14.5px] font-semibold text-[var(--ae-accent)] transition-colors hover:text-[var(--ae-accent-strong)]"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
