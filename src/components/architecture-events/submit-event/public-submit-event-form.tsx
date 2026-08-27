"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { appRoutes } from "@/lib/routes";
import { useGetMeQuery } from "@/features/auth/auth-api";
import { useGetCategoriesQuery, useGetIndustriesQuery } from "@/features/public/public-api";
import {
  emptyFormState,
  validateEventForm,
} from "@/components/organizer/submit-event/event-form-state";
import type { EventFormState } from "@/components/organizer/submit-event/event-form-state";
import {
  SubmitEventContactFields,
  SubmitEventDetailsFields,
} from "@/components/organizer/submit-event/submit-event-fields";
import type { PackageId } from "@/components/organizer/submit-event/submit-event-types";
import { savePendingEventDraft } from "@/lib/organizer/pending-event-draft";
import { Button } from "@/components/ui/button";

const PACKAGE_LABEL: Record<PackageId, string> = {
  basic: "Basic Listing — Free",
  featured: "Featured Listing — $49",
};

type PublicSubmitEventFormProps = {
  packageId: PackageId;
  onChangePackage: () => void;
};

export function PublicSubmitEventForm({
  packageId,
  onChangePackage,
}: PublicSubmitEventFormProps) {
  const router = useRouter();
  const { data: me } = useGetMeQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: industries } = useGetIndustriesQuery();

  const [form, setForm] = useState<EventFormState>(emptyFormState());
  const [errors, setErrors] = useState<Record<string, string>>({});

  function setField<K extends keyof EventFormState>(
    key: K,
    value: EventFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleBulkChange(patch: Partial<EventFormState>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function handleSubmit() {
    const nextErrors = validateEventForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted fields before continuing.");
      return;
    }

    savePendingEventDraft({ form, packageId });

    if (!me) {
      toast.success("Almost there", {
        description: "Log in as an organizer to finish submitting your event.",
      });
      router.push(
        `${appRoutes.architectureEvents.login}?redirect=${encodeURIComponent(
          `${appRoutes.organizer.submit}?step=form&prefill=1`,
        )}`,
      );
      return;
    }

    if (me.role !== "ORGANIZER") {
      toast.error("Only organizer accounts can submit events", {
        description: "Log in with an organizer account to continue — your details are saved.",
      });
      return;
    }

    router.push(`${appRoutes.organizer.submit}?step=form&prefill=1`);
  }

  return (
    <section className="bg-white pt-[68px] pb-[84px]">
      <div className="ae-container">
        <div className="mx-auto max-w-[860px]">
          <p className="ae-section-kicker">SUBMIT AN EVENT</p>
          <h1 className="ae-section-heading mt-5 text-[38px] leading-[1] md:text-[42px]">
            {PACKAGE_LABEL[packageId]}
          </h1>
          <p className="ae-section-description mt-5 max-w-[66ch] text-[16px] leading-[1.7]">
            Fill in your event details below — we&apos;ll ask you to log in (or
            create an organizer account) before it goes live.
          </p>

          <div className="mt-6 rounded-[14px] border border-ae-border bg-mainbackground px-5 py-4 text-[14px] text-[#3A3A3A]">
            Login as organizer is required to submit an event.
          </div>

          <div className="mt-[30px] rounded-[20px] border border-ae-border p-6 md:p-9">
            <SubmitEventDetailsFields
              form={form}
              errors={errors}
              onChange={setField}
              onBulkChange={handleBulkChange}
              categories={categories}
              industries={industries}
            />
            <SubmitEventContactFields form={form} errors={errors} onChange={setField} />

            <div className="mt-[34px] flex flex-wrap items-center gap-3">
              <Button onClick={handleSubmit}>Submit</Button>
              <Button variant="secondary" onClick={onChangePackage}>
                Change package
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
