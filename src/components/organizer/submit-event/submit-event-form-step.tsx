"use client";

import { useMemo, useState } from "react";
import { Trash2, Video } from "lucide-react";
import { toast } from "sonner";
import { useGetCategoriesQuery } from "@/features/public/public-api";
import { useGetIndustriesQuery } from "@/features/public/public-api";
import {
  useAttachEventMediaMutation,
  useCreateFeatureRequestMutation,
  useCreateOrganizerEventMutation,
  useDeleteEventMediaMutation,
  useGetMediaUploadSignatureMutation,
  useListMyFeatureRequestsQuery,
  useResubmitOrganizerEventMutation,
  useRetryFeatureRequestPaymentMutation,
  useSetEventThumbnailMutation,
  useSubmitOrganizerEventMutation,
  useUpdateOrganizerEventMutation,
} from "@/features/organizer/organizer-api";
import { uploadToCloudinary } from "@/features/organizer/cloudinary-upload";
import { detectBrowserTimezone } from "@/features/organizer/datetime";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/store/api-error";
import { useConfirm } from "@/components/ui/modal-provider";
import { FeaturedBadge } from "@/components/ui/featured-badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  isEventEditableByOrganizer,
  isEventFeaturableByOrganizer,
} from "@/features/events/event-types";
import type { EventRecord } from "@/features/events/event-types";
import {
  emptyFormState,
  formStateFromEvent,
  validateEventForm,
} from "./event-form-state";
import type { EventFormState } from "./event-form-state";
import { SubmitEventContactFields, SubmitEventDetailsFields } from "./submit-event-fields";

type SubmitEventFormStepProps = {
  selectedPackageLabel: string;
  requestFeatured: boolean;
  initialEvent?: EventRecord;
  initialFormState?: Partial<EventFormState>;
  onChangePackage: () => void;
  onSavedDraft: (event: EventRecord) => void;
  onSubmittedForReview: (event: EventRecord, checkoutUrl?: string) => void;
};

export function SubmitEventFormStep({
  selectedPackageLabel,
  requestFeatured,
  initialEvent,
  initialFormState,
  onChangePackage,
  onSavedDraft,
  onSubmittedForReview,
}: SubmitEventFormStepProps) {
  const [form, setForm] = useState<EventFormState>(() => {
    if (initialEvent) return formStateFromEvent(initialEvent);
    if (initialFormState) return { ...emptyFormState(), ...initialFormState };
    return emptyFormState();
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [event, setEvent] = useState<EventRecord | undefined>(initialEvent);

  const { data: categories } = useGetCategoriesQuery();
  const { data: industries } = useGetIndustriesQuery();

  const [createEvent, { isLoading: isCreating }] =
    useCreateOrganizerEventMutation();
  const [updateEvent, { isLoading: isUpdating }] =
    useUpdateOrganizerEventMutation();
  const [submitEvent, { isLoading: isSubmitting }] =
    useSubmitOrganizerEventMutation();
  const [getUploadSignature] = useGetMediaUploadSignatureMutation();
  const [attachMedia] = useAttachEventMediaMutation();
  const [setThumbnail] = useSetEventThumbnailMutation();
  const [deleteMedia] = useDeleteEventMediaMutation();
  const [resubmitEvent] = useResubmitOrganizerEventMutation();
  const [createFeatureRequest, { isLoading: isRequestingFeatured }] =
    useCreateFeatureRequestMutation();
  const [retryFeaturePayment, { isLoading: isRetryingPayment }] =
    useRetryFeatureRequestPaymentMutation();
  const { data: myFeatureRequests } = useListMyFeatureRequestsQuery(undefined, {
    skip: !event,
  });
  const confirm = useConfirm();

  const [uploadingCount, setUploadingCount] = useState(0);

  const isEditableStatus = !event || isEventEditableByOrganizer(event.status);
  const isBusy = isCreating || isUpdating || isSubmitting;

  function setField<K extends keyof EventFormState>(
    key: K,
    value: EventFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleBulkChange(patch: Partial<EventFormState>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function buildPayload() {
    return {
      title: form.title.trim(),
      description: form.description.trim(),
      registrationUrl: form.registrationUrl.trim(),
      categoryId: form.categoryId,
      industryId: form.industryId,
      isFree: form.isFree,
      priceFrom: form.isFree ? undefined : Number(form.priceFrom),
      currency: "USD",
      startDate: form.startDate,
      startTime: form.startTime,
      endDate: form.endDate || undefined,
      endTime: form.endDate ? form.endTime || undefined : undefined,
      timezone: event?.timezone ?? detectBrowserTimezone(),
      isOnline: form.isOnline,
      city: form.isOnline ? undefined : form.city.trim() || undefined,
      state: form.isOnline ? undefined : form.state.trim() || undefined,
      venueName: form.venueName.trim() || undefined,
      address: form.address.trim() || undefined,
      latitude:
        !form.isOnline && form.latitude !== "" ? Number(form.latitude) : undefined,
      longitude:
        !form.isOnline && form.longitude !== "" ? Number(form.longitude) : undefined,
      contactName: form.contactName.trim(),
      contactEmail: form.contactEmail.trim(),
      contactPhone: form.contactPhone.trim() || undefined,
      internalNotes: form.internalNotes.trim() || undefined,
    };
  }

  function validate(): boolean {
    const next = validateEventForm(form);
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSaveDraft() {
    if (!validate()) {
      toast.error("Please fix the highlighted fields before saving.");
      return;
    }

    try {
      const payload = buildPayload();
      const saved = event
        ? await updateEvent({ id: event.id, body: payload }).unwrap()
        : await createEvent(payload).unwrap();
      setEvent(saved);
      toast.success("Draft saved", {
        description: "Add images or continue editing anytime.",
      });
      onSavedDraft(saved);
    } catch (error) {
      setErrors(getApiFieldErrors(error));
      toast.error("Couldn't save draft", {
        description: getApiErrorMessage(error),
      });
    }
  }

  async function handleSubmitForReview() {
    if (!validate()) {
      toast.error("Please fix the highlighted fields before submitting.");
      return;
    }

    try {
      const payload = buildPayload();
      let current = event;

      if (!current) {
        // Brand new event: create as DRAFT, then submit it straight away.
        current = await createEvent(payload).unwrap();
        setEvent(current);

        const result = await submitEvent({
          id: current.id,
          requestFeatured,
        }).unwrap();
        toast.success("Submitted for review", {
          description: "Editorial will review it shortly.",
        });
        onSubmittedForReview(result.event, result.featureRequest?.checkoutUrl);
        return;
      }

      // submit/resubmit only ever move status — they never accept field
      // updates — so any edits must be persisted via PATCH first, for every
      // status the organizer can still edit (Draft, Under Review, Changes
      // Requested), not just Draft.
      if (isEventEditableByOrganizer(current.status)) {
        current = await updateEvent({ id: current.id, body: payload }).unwrap();
        setEvent(current);
      }

      if (current.status === "DRAFT") {
        const result = await submitEvent({
          id: current.id,
          requestFeatured,
        }).unwrap();
        toast.success("Submitted for review", {
          description: "Editorial will review it shortly.",
        });
        onSubmittedForReview(result.event, result.featureRequest?.checkoutUrl);
        return;
      }

      if (current.status === "CHANGES_REQUESTED") {
        const resubmitted = await resubmitEvent(current.id).unwrap();
        toast.success("Resubmitted for review", {
          description: "Editorial will take another look shortly.",
        });
        onSubmittedForReview(resubmitted);
        return;
      }

      // Already Under Review: nothing left to transition — the PATCH above
      // already saved the edits.
      toast.success("Changes saved", {
        description: "Your event is still under review.",
      });
      onSavedDraft(current);
    } catch (error) {
      setErrors(getApiFieldErrors(error));
      toast.error("Couldn't submit event", {
        description: getApiErrorMessage(error),
      });
    }
  }

  async function handleFileUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    if (!event) {
      toast.error("Save your details first", {
        description:
          "Save this event as a draft before adding images or video.",
      });
      return;
    }

    setUploadingCount(files.length);

    try {
      for (const file of Array.from(files)) {
        const resourceType = file.type.startsWith("video/") ? "VIDEO" : "IMAGE";
        const signature = await getUploadSignature({
          id: event.id,
          resourceType,
        }).unwrap();
        const uploaded = await uploadToCloudinary(file, signature);
        const media = await attachMedia({
          id: event.id,
          publicId: uploaded.publicId,
          url: uploaded.url,
          resourceType,
          isThumbnail: !event.media || event.media.length === 0,
        }).unwrap();

        setEvent((prev) =>
          prev ? { ...prev, media: [...(prev.media ?? []), media] } : prev,
        );
      }
      toast.success("Media uploaded");
    } catch (error) {
      toast.error("Upload failed", {
        description: getApiErrorMessage(error, "Please try again."),
      });
    } finally {
      setUploadingCount(0);
    }
  }

  async function handleSetThumbnail(mediaId: string) {
    if (!event) return;
    try {
      await setThumbnail({ id: event.id, mediaId }).unwrap();
      setEvent((prev) =>
        prev
          ? {
              ...prev,
              media: prev.media?.map((item) => ({
                ...item,
                isThumbnail: item.id === mediaId,
              })),
            }
          : prev,
      );
    } catch (error) {
      toast.error("Couldn't update thumbnail", {
        description: getApiErrorMessage(error),
      });
    }
  }

  async function handleDeleteMedia(mediaId: string) {
    if (!event) return;
    const confirmed = await confirm({
      title: "Remove this media?",
      description:
        "This will permanently delete the image or video from this listing.",
      confirmLabel: "Remove",
      tone: "danger",
    });
    if (!confirmed) return;

    try {
      await deleteMedia({ id: event.id, mediaId }).unwrap();
      setEvent((prev) =>
        prev
          ? {
              ...prev,
              media: prev.media?.filter((item) => item.id !== mediaId),
            }
          : prev,
      );
      toast.success("Media removed");
    } catch (error) {
      toast.error("Couldn't remove media", {
        description: getApiErrorMessage(error),
      });
    }
  }

  const pendingFeatureRequest = event
    ? myFeatureRequests?.items.find(
        (fr) =>
          fr.eventId === event.id &&
          (fr.status === "PENDING_PAYMENT" || fr.status === "PAYMENT_FAILED"),
      )
    : undefined;
  const reviewFeatureRequest = event
    ? myFeatureRequests?.items.find(
        (fr) => fr.eventId === event.id && fr.status === "PENDING_REVIEW",
      )
    : undefined;

  async function handleMakeFeatured() {
    if (!event) return;
    const confirmed = await confirm({
      title: "Make this event Featured?",
      description:
        "You'll be redirected to a secure Stripe checkout to pay $49. Your event keeps its current status while payment and review are pending.",
      confirmLabel: "Continue to payment",
    });
    if (!confirmed) return;

    try {
      const result = await createFeatureRequest({ id: event.id }).unwrap();
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      }
    } catch (error) {
      toast.error("Couldn't start Featured checkout", {
        description: getApiErrorMessage(error),
      });
    }
  }

  async function handleRetryFeaturedPayment() {
    if (!pendingFeatureRequest) return;
    try {
      const result = await retryFeaturePayment(
        pendingFeatureRequest.id,
      ).unwrap();
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }
      // No checkout URL back means the previous payment had actually already
      // succeeded on Stripe's side and this call just reconciled it.
      toast.success("Payment confirmed", {
        description: "This request is now waiting on editorial approval.",
      });
    } catch (error) {
      toast.error("Couldn't restart payment", {
        description: getApiErrorMessage(error),
      });
    }
  }

  const submitLabel = useMemo(() => {
    if (!event) return "Submit for Review";
    if (event.status === "UNDER_REVIEW") return "Save Changes";
    if (event.status === "CHANGES_REQUESTED") return "Resubmit for Review";
    return "Submit for Review";
  }, [event]);

  return (
    <>
      <div className="mt-8 flex justify-between rounded-[16px] border border-ae-border bg-mainbackground px-5 py-4 text-[14.5px] text-[#3A3A3A]">
        <div>
          <span className="font-semibold">Package:</span> {selectedPackageLabel}
        </div>
        <Button
          variant="ghost"
          size="text"
          className="text-[13.5px] font-semibold"
          onClick={onChangePackage}
        >
          Change package
        </Button>
      </div>

      {!isEditableStatus ? (
        <div className="mt-[18px] rounded-[14px] border border-ae-border bg-background px-5 py-4 text-[14px] text-[#3A3A3A]">
          This event is {event?.status.replace("_", " ").toLowerCase()} and can
          no longer be edited here.
        </div>
      ) : null}

      <fieldset disabled={!isEditableStatus || isBusy} className="contents">
        <div className="mt-[30px] rounded-[20px] border border-ae-border p-6 md:p-9">
          <SubmitEventDetailsFields
            form={form}
            errors={errors}
            onChange={setField}
            onBulkChange={handleBulkChange}
            categories={categories}
            industries={industries}
          />

          <div className="mt-8 border-t border-ae-border pt-8">
            <h3 className="ae-serif text-[16px] font-semibold tracking-[-0.01em] text-foreground">
              Images and video
            </h3>
            <span className="mb-5 font-medium text-ae-muted">
              {event
                ? "Upload up to six images and one video. Select which image is used as the listing thumbnail."
                : "Save this event first, then come back here to add images and video."}
            </span>

            {event ? (
              <div className="pt-6">
                <div className="flex h-[142px] w-full flex-col items-center justify-center rounded-[17px] border border-dashed border-[#D1D1D1] bg-white">
                  <p className="mb-[14px] text-[14px] font-normal leading-[20px] text-[#444444]">
                    {uploadingCount > 0
                      ? "Uploading..."
                      : "Drop files here, or"}
                  </p>
                  <label
                    htmlFor="file-upload"
                    className="flex h-[44px] w-[129px] cursor-pointer items-center justify-center rounded-[12px] border border-foreground bg-white text-[15px] font-semibold leading-none text-foreground"
                  >
                    Choose files
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                </div>

                {event.media && event.media.length > 0 ? (
                  <div className="mt-[22px] grid gap-[14px] md:grid-cols-3">
                    {event.media.map((media) => (
                      <div
                        key={media.id}
                        className={`overflow-hidden rounded-[18px] border ${
                          media.isThumbnail
                            ? "border-foreground"
                            : "border-ae-border"
                        }`}
                      >
                        <div className="relative h-[182px] bg-[#F1F1F1]">
                          {media.resourceType === "VIDEO" ? (
                            <div className="flex h-full w-full items-center justify-center text-ae-muted">
                              <Video className="h-8 w-8" strokeWidth={1.5} />
                            </div>
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={media.url}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteMedia(media.id)}
                            aria-label="Remove media"
                            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/92 text-[#3A3A3A] transition-colors hover:bg-white"
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={1.8} />
                          </button>
                        </div>
                        {media.resourceType === "IMAGE" ? (
                          <button
                            type="button"
                            onClick={() => handleSetThumbnail(media.id)}
                            className={`w-full py-[10px] text-[12px] font-bold tracking-[0.1em] ${
                              media.isThumbnail
                                ? "bg-foreground text-white"
                                : "bg-white text-[#3A3A3A] hover:bg-mainbackground"
                            }`}
                          >
                            {media.isThumbnail
                              ? "THUMBNAIL"
                              : "SET AS THUMBNAIL"}
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-10 border-t border-ae-border pt-10">
            <Textarea
              label="Internal notes — optional"
              rows={3}
              value={form.internalNotes}
              onChange={(e) => setField("internalNotes", e.target.value)}
            />
          </div>

          <SubmitEventContactFields form={form} errors={errors} onChange={setField} />

          <div className="mt-[34px] flex flex-wrap items-center gap-3">
            <Button onClick={handleSubmitForReview} isLoading={isBusy}>
              {submitLabel}
            </Button>
            <Button
              variant="secondary"
              onClick={handleSaveDraft}
              disabled={isBusy}
            >
              {event ? "Save changes" : "Save as Draft"}
            </Button>
          </div>
        </div>
      </fieldset>

      {event && isEventFeaturableByOrganizer(event.status) ? (
        <div className="mt-[22px] rounded-[20px] border border-ae-border bg-mainbackground p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Heading level="subsection" as="h3">
                Featured Listing
              </Heading>
              <p className="mt-[6px] max-w-[54ch] text-[14px] leading-[1.7] text-ae-muted">
                {event.isFeatured
                  ? "This event is featured and appears near the top of the Events page."
                  : reviewFeatureRequest
                    ? "Your payment was received — this request is now waiting on editorial approval."
                    : pendingFeatureRequest
                      ? pendingFeatureRequest.status === "PAYMENT_FAILED"
                        ? "Your last payment attempt didn't go through. Retry payment below — if a previous attempt actually went through on Stripe's side, this confirms it instead of charging you again; otherwise it opens a new checkout."
                        : "A Featured checkout is already open for this event. Retry payment below — if you already paid, this confirms it instead of charging you again; if you haven't, it takes you back to checkout."
                      : "Get placement near the top of the Events page and a Featured badge, for a one-time $49 fee."}
              </p>
            </div>

            {event.isFeatured ? (
              <FeaturedBadge />
            ) : reviewFeatureRequest ? (
              <span className="whitespace-nowrap rounded-full border border-ae-border bg-white px-[15px] py-[7px] text-[12.5px] font-semibold text-[#3A3A3A]">
                Pending review
              </span>
            ) : pendingFeatureRequest ? (
              <Button
                variant="secondary"
                size="md"
                className="whitespace-nowrap"
                onClick={handleRetryFeaturedPayment}
                isLoading={isRetryingPayment}
              >
                Retry payment — $49
              </Button>
            ) : (
              <Button
                size="md"
                className="whitespace-nowrap"
                onClick={handleMakeFeatured}
                isLoading={isRequestingFeatured}
              >
                Make Featured — $49
              </Button>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
