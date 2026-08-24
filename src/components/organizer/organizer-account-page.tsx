"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { appRoutes } from "@/lib/routes";
import { useGetMeQuery, useLogoutMutation } from "@/features/auth/auth-api";
import {
  useGetOrganizerProfileQuery,
  useUpdateOrganizerProfileMutation,
} from "@/features/organizer/organizer-api";
import {
  useChangeMyPasswordMutation,
  useUpdateMyProfileMutation,
} from "@/features/users/users-api";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/store/api-error";
import { useConfirm } from "@/components/ui/modal-provider";
import { PasswordInput } from "@/components/ui/password-input";
import { Input, inputFieldClassName } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

const inputClassName = inputFieldClassName();

export function OrganizerAccountPage() {
  const router = useRouter();
  const confirm = useConfirm();

  const { data: me } = useGetMeQuery();
  const { data: profile } = useGetOrganizerProfileQuery();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>(
    {},
  );
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangeMyPasswordMutation();

  const [fullName, setFullName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [orgErrors, setOrgErrors] = useState<Record<string, string>>({});
  const [updateProfile, { isLoading: isSavingProfile }] =
    useUpdateMyProfileMutation();
  const [updateOrgProfile, { isLoading: isSavingOrg }] =
    useUpdateOrganizerProfileMutation();

  const [logout] = useLogoutMutation();
  const [partnerState, setPartnerState] = useState<"closed" | "open" | "sent">(
    "closed",
  );

  useEffect(() => {
    if (me) setFullName(me.fullName);
  }, [me]);

  useEffect(() => {
    if (profile) {
      setOrganizationName(profile.organizationName);
      setWebsite(profile.website ?? "");
      setPhone(profile.phone ?? "");
    }
  }, [profile]);

  async function handleChangePassword() {
    if (!currentPassword || !newPassword) {
      setPasswordErrors({
        ...(currentPassword
          ? {}
          : { currentPassword: "Current password is required" }),
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
      toast.error("Couldn't update password", {
        description: getApiErrorMessage(error),
      });
    }
  }

  async function handleSaveOrganization() {
    setOrgErrors({});
    try {
      await Promise.all([
        updateProfile({ fullName: fullName.trim() }).unwrap(),
        updateOrgProfile({
          organizationName: organizationName.trim(),
          website: website.trim() || undefined,
          phone: phone.trim() || undefined,
        }).unwrap(),
      ]);
      toast.success("Changes saved");
    } catch (error) {
      setOrgErrors(getApiFieldErrors(error));
      toast.error("Couldn't save changes", {
        description: getApiErrorMessage(error),
      });
    }
  }

  async function handleLogout() {
    const confirmed = await confirm({
      title: "Log out?",
      description: "You'll need to sign in again to manage your listings.",
      confirmLabel: "Log out",
    });
    if (!confirmed) return;

    await logout();
    router.push(appRoutes.architectureEvents.login);
  }

  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <div className="border-b border-ae-border pb-5">
        <Heading level="page">Account</Heading>
        <p className="mt-2 text-[14.5px] text-ae-muted">
          Your login, your organization details, and partnership requests.
        </p>
      </div>

      <div className="mt-[20px] rounded-[20px] border border-ae-border p-6 md:px-6 md:py-7">
        <Heading level="card" as="h3">
          Login credentials
        </Heading>
        <Input
          label="Email"
          type="email"
          value={me?.email ?? ""}
          disabled
          wrapperClassName="mt-[18px] max-w-[400px]"
          className="cursor-not-allowed bg-mainbackground text-ae-muted"
        />
        <div className="mt-[10px] grid gap-[16px] md:grid-cols-2">
          <label className="block">
            <span className="mb-[9px] block text-[13.5px] font-semibold">
              Current password
            </span>
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
            <span className="mb-[9px] block text-[13.5px] font-semibold">
              New password
            </span>
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
        <Button
          variant="secondary"
          size="md"
          className="mt-[14px]"
          onClick={handleChangePassword}
          isLoading={isChangingPassword}
          loadingLabel="Updating..."
        >
          Update password
        </Button>
      </div>

      <div className="mt-[18px] rounded-[20px] border border-ae-border p-6 md:px-6 md:py-7">
        <Heading level="card" as="h3">
          Organization
        </Heading>
        <div className="mt-[18px] grid gap-[16px] md:grid-cols-2">
          <Input
            label="Organization name"
            error={orgErrors.organizationName}
            type="text"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          />
          <Input
            label="Website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <Input
            label="Contact name"
            error={orgErrors.fullName}
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={handleSaveOrganization}
          disabled={isSavingProfile || isSavingOrg}
          className="mt-4 rounded-[10px] bg-[#232323] px-[22px] py-[12px] text-[14.5px] font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSavingProfile || isSavingOrg ? "Saving..." : "Save changes"}
        </button>
      </div>

      <div className="mt-[18px] rounded-[20px] border border-ae-border p-6 md:px-6 md:py-7">
        <Heading level="card" as="h3">
          Partnership request
        </Heading>
        <p className="mt-3 max-w-[62ch] text-[15.5px] leading-[1.75] text-ae-muted">
          A formal partnership lets attendees register for your events natively
          on Architecture Events, with registrations fully tracked on your
          listing instead of handed off to an external page.
        </p>

        {partnerState === "closed" ? (
          <Button
            variant="secondary"
            size="md"
            className="mt-6"
            onClick={() => setPartnerState("open")}
          >
            Request Partnership
          </Button>
        ) : null}

        {partnerState === "open" ? (
          <div className="mt-6 grid gap-[18px] border-t border-ae-border pt-[26px] animate-[fadeIn_0.3s_ease]">
            <div className="grid gap-[18px] md:grid-cols-2">
              <Input label="Your name" type="text" defaultValue={fullName} />
              <Input
                label="Company"
                type="text"
                defaultValue={organizationName}
              />
            </div>
            <Textarea
              label="Message"
              rows={4}
              placeholder="Tell us about your events and how many you run each year."
            />
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setPartnerState("sent")}>
                Send request
              </Button>
              <Button
                variant="secondary"
                onClick={() => setPartnerState("closed")}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : null}

        {partnerState === "sent" ? (
          <div className="mt-6 flex items-start gap-3 rounded-[16px] border border-ae-border bg-background px-[22px] py-5 animate-[fadeIn_0.3s_ease]">
            <span className="mt-1 inline-flex h-[20px] w-[20px] items-center justify-center text-ae-accent">
              <Check className="h-[17px] w-[17px]" strokeWidth={2.1} />
            </span>
            <p className="text-[15px] leading-[1.7] text-[#3A3A3A]">
              Request sent. The Architecture Events team will follow up by email
              within a few business days.
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-[18px] flex flex-wrap items-center justify-between gap-5 border-t border-ae-border pt-[16px]">
        <p className="text-[14.5px] text-ae-muted">Signed in as {me?.email}</p>
        <Button
          variant="ghost"
          size="text"
          className="text-[14.5px] font-semibold"
          onClick={handleLogout}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
