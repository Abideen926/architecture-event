"use client";

import { useMemo, useState } from "react";
import { MapPin, Trash2, Video } from "lucide-react";
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
import { detectBrowserTimezone, formatDateInZone, formatTimeInZone } from "@/features/organizer/datetime";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/store/api-error";
import { useConfirm } from "@/components/ui/modal-provider";
import { FeaturedBadge } from "@/components/ui/featured-badge";
import { isEventEditableByOrganizer, isEventFeaturableByOrganizer } from "@/features/events/event-types";
import type { EventRecord } from "@/features/events/event-types";

type EventFormState = {
  title: string;
  description: string;
  registrationUrl: string;
  categoryId: string;
  industryId: string;
  isFree: boolean;
  priceFrom: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  isOnline: boolean;
  city: string;
  state: string;
  venueName: string;
  address: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  internalNotes: string;
};

function emptyFormState(): EventFormState {
  return {
    title: "",
    description: "",
    registrationUrl: "",
    categoryId: "",
    industryId: "",
    isFree: false,
    priceFrom: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    isOnline: false,
    city: "",
    state: "",
    venueName: "",
    address: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    internalNotes: "",
  };
}

function formStateFromEvent(event: EventRecord): EventFormState {
  return {
    title: event.title,
    description: event.description,
    registrationUrl: event.registrationUrl,
    categoryId: event.categoryId,
    industryId: event.industryId ?? "",
    isFree: event.isFree,
    priceFrom: event.priceFromCents ? (event.priceFromCents / 100).toFixed(2) : "",
    startDate: formatDateInZone(event.startAt, event.timezone),
    startTime: formatTimeInZone(event.startAt, event.timezone),
    endDate: event.endAt ? formatDateInZone(event.endAt, event.timezone) : "",
    endTime: event.endAt ? formatTimeInZone(event.endAt, event.timezone) : "",
    isOnline: event.isOnline,
    city: event.city ?? "",
    state: event.state ?? "",
    venueName: event.venueName ?? "",
    address: event.address ?? "",
    contactName: event.contactName,
    contactEmail: event.contactEmail,
    contactPhone: event.contactPhone ?? "",
    internalNotes: event.internalNotes ?? "",
  };
}

const fieldClassName =
  "h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none focus:border-[#C7B48D]";
const textareaClassName =
  "w-full resize-y rounded-[12px] border border-[#E7E7E7] px-4 py-[14px] text-[15px] leading-[1.7] outline-none focus:border-[#C7B48D]";

type SubmitEventFormStepProps = {
  selectedPackageLabel: string;
  requestFeatured: boolean;
  initialEvent?: EventRecord;
  onChangePackage: () => void;
  onSavedDraft: (event: EventRecord) => void;
  onSubmittedForReview: (event: EventRecord, checkoutUrl?: string) => void;
};

export function SubmitEventFormStep({
  selectedPackageLabel,
  requestFeatured,
  initialEvent,
  onChangePackage,
  onSavedDraft,
  onSubmittedForReview,
}: SubmitEventFormStepProps) {
  const [form, setForm] = useState<EventFormState>(() =>
    initialEvent ? formStateFromEvent(initialEvent) : emptyFormState()
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [event, setEvent] = useState<EventRecord | undefined>(initialEvent);

  const { data: categories } = useGetCategoriesQuery();
  const { data: industries } = useGetIndustriesQuery();

  const [createEvent, { isLoading: isCreating }] = useCreateOrganizerEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateOrganizerEventMutation();
  const [submitEvent, { isLoading: isSubmitting }] = useSubmitOrganizerEventMutation();
  const [getUploadSignature] = useGetMediaUploadSignatureMutation();
  const [attachMedia] = useAttachEventMediaMutation();
  const [setThumbnail] = useSetEventThumbnailMutation();
  const [deleteMedia] = useDeleteEventMediaMutation();
  const [resubmitEvent] = useResubmitOrganizerEventMutation();
  const [createFeatureRequest, { isLoading: isRequestingFeatured }] = useCreateFeatureRequestMutation();
  const [retryFeaturePayment, { isLoading: isRetryingPayment }] = useRetryFeatureRequestPaymentMutation();
  const { data: myFeatureRequests } = useListMyFeatureRequestsQuery(undefined, { skip: !event });
  const confirm = useConfirm();

  const [uploadingCount, setUploadingCount] = useState(0);

  const isEditableStatus = !event || isEventEditableByOrganizer(event.status);
  const isBusy = isCreating || isUpdating || isSubmitting;

  function setField<K extends keyof EventFormState>(key: K, value: EventFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
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
      contactName: form.contactName.trim(),
      contactEmail: form.contactEmail.trim(),
      contactPhone: form.contactPhone.trim() || undefined,
      internalNotes: form.internalNotes.trim() || undefined,
    };
  }

  function isValidUrl(value: string) {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  const EMAIL_RULE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (form.title.trim().length < 3) next.title = "Title must be at least 3 characters";
    if (form.description.trim().length < 10) next.description = "Description must be at least 10 characters";
    if (!form.registrationUrl.trim()) {
      next.registrationUrl = "Registration URL is required";
    } else if (!isValidUrl(form.registrationUrl.trim())) {
      next.registrationUrl = "Enter a valid URL, e.g. https://example.com/register";
    }
    if (!form.categoryId) next.categoryId = "Choose a category";
    if (!form.industryId) next.industryId = "Choose an industry";
    if (!form.isFree && !form.priceFrom) next.priceFrom = "Enter a starting price, or mark this event free";
    if (!form.isFree && form.priceFrom && Number(form.priceFrom) <= 0) {
      next.priceFrom = "Price must be greater than 0";
    }
    if (!form.startDate) next.startDate = "Start date is required";
    if (!form.startTime) next.startTime = "Start time is required";

    // Mirrors two separate backend checks: Zod compares dates only (create/update
    // schema), the Event model compares the full date+time instant — so a
    // same-day event with an end time before the start time passes Zod but is
    // rejected at the database layer. Catch both here before submitting.
    if (form.endDate && form.startDate) {
      if (form.endDate < form.startDate) {
        next.endDate = "End date can't be before the start date";
      } else if (
        form.endDate === form.startDate &&
        form.endTime &&
        form.startTime &&
        form.endTime < form.startTime
      ) {
        next.endTime = "End time can't be before the start time on the same day";
      }
    }

    if (!form.isOnline) {
      if (!form.city.trim()) next.city = "City is required for in-person events";
      if (!form.state.trim()) next.state = "State is required for in-person events";
    }
    if (form.contactName.trim().length < 2) next.contactName = "Contact name is required";
    if (!form.contactEmail.trim()) {
      next.contactEmail = "Contact email is required";
    } else if (!EMAIL_RULE.test(form.contactEmail.trim())) {
      next.contactEmail = "Enter a valid email address";
    }

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
      toast.success("Draft saved", { description: "Add images or continue editing anytime." });
      onSavedDraft(saved);
    } catch (error) {
      setErrors(getApiFieldErrors(error));
      toast.error("Couldn't save draft", { description: getApiErrorMessage(error) });
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

        const result = await submitEvent({ id: current.id, requestFeatured }).unwrap();
        toast.success("Submitted for review", { description: "Editorial will review it shortly." });
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
        const result = await submitEvent({ id: current.id, requestFeatured }).unwrap();
        toast.success("Submitted for review", { description: "Editorial will review it shortly." });
        onSubmittedForReview(result.event, result.featureRequest?.checkoutUrl);
        return;
      }

      if (current.status === "CHANGES_REQUESTED") {
        const resubmitted = await resubmitEvent(current.id).unwrap();
        toast.success("Resubmitted for review", { description: "Editorial will take another look shortly." });
        onSubmittedForReview(resubmitted);
        return;
      }

      // Already Under Review: nothing left to transition — the PATCH above
      // already saved the edits.
      toast.success("Changes saved", { description: "Your event is still under review." });
      onSavedDraft(current);
    } catch (error) {
      setErrors(getApiFieldErrors(error));
      toast.error("Couldn't submit event", { description: getApiErrorMessage(error) });
    }
  }

  async function handleFileUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    if (!event) {
      toast.error("Save your details first", {
        description: "Save this event as a draft before adding images or video.",
      });
      return;
    }

    setUploadingCount(files.length);

    try {
      for (const file of Array.from(files)) {
        const resourceType = file.type.startsWith("video/") ? "VIDEO" : "IMAGE";
        const signature = await getUploadSignature({ id: event.id, resourceType }).unwrap();
        const uploaded = await uploadToCloudinary(file, signature);
        const media = await attachMedia({
          id: event.id,
          publicId: uploaded.publicId,
          url: uploaded.url,
          resourceType,
          isThumbnail: !event.media || event.media.length === 0,
        }).unwrap();

        setEvent((prev) =>
          prev ? { ...prev, media: [...(prev.media ?? []), media] } : prev
        );
      }
      toast.success("Media uploaded");
    } catch (error) {
      toast.error("Upload failed", { description: getApiErrorMessage(error, "Please try again.") });
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
              media: prev.media?.map((item) => ({ ...item, isThumbnail: item.id === mediaId })),
            }
          : prev
      );
    } catch (error) {
      toast.error("Couldn't update thumbnail", { description: getApiErrorMessage(error) });
    }
  }

  async function handleDeleteMedia(mediaId: string) {
    if (!event) return;
    const confirmed = await confirm({
      title: "Remove this media?",
      description: "This will permanently delete the image or video from this listing.",
      confirmLabel: "Remove",
      tone: "danger",
    });
    if (!confirmed) return;

    try {
      await deleteMedia({ id: event.id, mediaId }).unwrap();
      setEvent((prev) =>
        prev ? { ...prev, media: prev.media?.filter((item) => item.id !== mediaId) } : prev
      );
      toast.success("Media removed");
    } catch (error) {
      toast.error("Couldn't remove media", { description: getApiErrorMessage(error) });
    }
  }

  const pendingFeatureRequest = event
    ? myFeatureRequests?.items.find(
        (fr) =>
          fr.eventId === event.id &&
          (fr.status === "PENDING_PAYMENT" || fr.status === "PAYMENT_FAILED")
      )
    : undefined;
  const reviewFeatureRequest = event
    ? myFeatureRequests?.items.find((fr) => fr.eventId === event.id && fr.status === "PENDING_REVIEW")
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
      toast.error("Couldn't start Featured checkout", { description: getApiErrorMessage(error) });
    }
  }

  async function handleRetryFeaturedPayment() {
    if (!pendingFeatureRequest) return;
    try {
      const result = await retryFeaturePayment(pendingFeatureRequest.id).unwrap();
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
      toast.error("Couldn't restart payment", { description: getApiErrorMessage(error) });
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
      <div className="mt-8 flex justify-between rounded-[16px] border border-[#E7E7E7] bg-[#FAFAFA] px-5 py-4 text-[14.5px] text-[#3A3A3A]">
        <div>
          <span className="font-semibold">Package:</span> {selectedPackageLabel}
        </div>
        <button
          type="button"
          onClick={onChangePackage}
          className="text-[13.5px] font-semibold text-[var(--ae-accent)]"
        >
          Change package
        </button>
      </div>

      {!isEditableStatus ? (
        <div className="mt-[18px] rounded-[14px] border border-[#E7E7E7] bg-[#F1EEE8] px-5 py-4 text-[14px] text-[#3A3A3A]">
          This event is {event?.status.replace("_", " ").toLowerCase()} and can no longer be edited here.
        </div>
      ) : null}

      <fieldset disabled={!isEditableStatus || isBusy} className="contents">
        <div className="mt-[30px] rounded-[20px] border border-[#E7E7E7] p-6 md:p-9">
          <div className="mt-8">
            <h3 className="ae-serif text-[22px] font-semibold tracking-[-0.01em] text-[#202020]">
              Event details
            </h3>
            <div className="mt-[22px] grid gap-[18px] md:grid-cols-2">
              <Field label="Event name" error={errors.title} className="md:col-span-2">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setField("title", e.target.value)}
                  className={fieldClassName}
                />
              </Field>

              <Field label="Category" error={errors.categoryId}>
                <select
                  value={form.categoryId}
                  onChange={(e) => setField("categoryId", e.target.value)}
                  className={fieldClassName}
                >
                  <option value="">Select a category</option>
                  {(categories ?? []).map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Industry" error={errors.industryId}>
                <select
                  value={form.industryId}
                  onChange={(e) => setField("industryId", e.target.value)}
                  className={fieldClassName}
                >
                  <option value="">Select an industry</option>
                  {(industries ?? []).map((industry) => (
                    <option key={industry.id} value={industry.id}>
                      {industry.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Registration URL" error={errors.registrationUrl}>
                <input
                  type="url"
                  value={form.registrationUrl}
                  onChange={(e) => setField("registrationUrl", e.target.value)}
                  className={fieldClassName}
                />
              </Field>

              <div className="block">
                <span className="mb-[9px] block text-[13.5px] font-semibold">Pricing</span>
                <div className="flex h-[52px] items-center gap-4 rounded-[12px] border border-[#E7E7E7] px-4">
                  <label className="flex items-center gap-2 text-[14px]">
                    <input
                      type="checkbox"
                      checked={form.isFree}
                      onChange={(e) => setField("isFree", e.target.checked)}
                      className="h-[16px] w-[16px] accent-[#1E1E1E]"
                    />
                    Free event
                  </label>
                  {!form.isFree ? (
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.priceFrom}
                      onChange={(e) => setField("priceFrom", e.target.value)}
                      placeholder="Starting price, e.g. 49.00"
                      className="h-full w-full border-0 bg-transparent text-[15px] outline-none"
                    />
                  ) : null}
                </div>
                {errors.priceFrom ? (
                  <span className="mt-[7px] block text-[13px] text-[#B3261E]">{errors.priceFrom}</span>
                ) : null}
              </div>

              <Field label="Description" className="md:col-span-2" error={errors.description}>
                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  className={textareaClassName}
                />
              </Field>

              <Field label="Start date" error={errors.startDate}>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setField("startDate", e.target.value)}
                  className={fieldClassName}
                />
              </Field>
              <Field label="Start time" error={errors.startTime}>
                <input
                  type="time"
                  value={form.startTime}
                  onChange={(e) => setField("startTime", e.target.value)}
                  className={fieldClassName}
                />
              </Field>
              <Field label="End date (optional)" error={errors.endDate}>
                <input
                  type="date"
                  value={form.endDate}
                  min={form.startDate || undefined}
                  onChange={(e) => setField("endDate", e.target.value)}
                  className={fieldClassName}
                />
              </Field>
              <Field label="End time (optional)" error={errors.endTime}>
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) => setField("endTime", e.target.value)}
                  disabled={!form.endDate}
                  className={`${fieldClassName} disabled:cursor-not-allowed disabled:opacity-50`}
                />
              </Field>

              <div className="md:col-span-2 mt-[14px] border-t border-[#E7E7E7] pt-7">
                <h3 className="m-0 text-[15px] font-bold text-[#202020]">Location</h3>

                <label className="mt-[16px] inline-flex items-center gap-2 text-[14px] text-[#3A3A3A]">
                  <input
                    type="checkbox"
                    checked={form.isOnline}
                    onChange={(e) => setField("isOnline", e.target.checked)}
                    className="h-[16px] w-[16px] accent-[#1E1E1E]"
                  />
                  This is an online event
                </label>

                {!form.isOnline ? (
                  <div className="mt-[16px] grid gap-[18px] md:grid-cols-2">
                    <Field label="City" error={errors.city}>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => setField("city", e.target.value)}
                        className={fieldClassName}
                      />
                    </Field>
                    <Field label="State" error={errors.state}>
                      <input
                        type="text"
                        value={form.state}
                        onChange={(e) => setField("state", e.target.value)}
                        className={fieldClassName}
                      />
                    </Field>
                    <Field label="Venue name">
                      <span className="flex h-[52px] items-center gap-[10px] rounded-[12px] border border-[#E7E7E7] bg-white px-4">
                        <MapPin className="h-4 w-4 flex-none text-[#6A6A6A]" strokeWidth={1.7} />
                        <input
                          type="text"
                          value={form.venueName}
                          onChange={(e) => setField("venueName", e.target.value)}
                          className="w-full border-0 bg-transparent text-[15px] outline-none"
                        />
                      </span>
                    </Field>
                    <Field label="Address">
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => setField("address", e.target.value)}
                        className={fieldClassName}
                      />
                    </Field>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-[#E7E7E7] pt-8">
            <h3 className="ae-serif text-[16px] font-semibold tracking-[-0.01em] text-[#202020]">
              Images and video
            </h3>
            <span className="mb-5 font-medium text-[#6A6A6A]">
              {event
                ? "Upload up to six images and one video. Select which image is used as the listing thumbnail."
                : "Save this event first, then come back here to add images and video."}
            </span>

            {event ? (
              <div className="pt-6">
                <div className="flex h-[142px] w-full flex-col items-center justify-center rounded-[17px] border border-dashed border-[#D1D1D1] bg-white">
                  <p className="mb-[14px] text-[14px] font-normal leading-[20px] text-[#444444]">
                    {uploadingCount > 0 ? "Uploading..." : "Drop files here, or"}
                  </p>
                  <label
                    htmlFor="file-upload"
                    className="flex h-[44px] w-[129px] cursor-pointer items-center justify-center rounded-[12px] border border-[#202020] bg-white text-[15px] font-semibold leading-none text-[#202020]"
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
                          media.isThumbnail ? "border-[#202020]" : "border-[#E7E7E7]"
                        }`}
                      >
                        <div className="relative h-[182px] bg-[#F1F1F1]">
                          {media.resourceType === "VIDEO" ? (
                            <div className="flex h-full w-full items-center justify-center text-[#6A6A6A]">
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
                                ? "bg-[#1E1E1E] text-white"
                                : "bg-white text-[#3A3A3A] hover:bg-[#FAFAFA]"
                            }`}
                          >
                            {media.isThumbnail ? "THUMBNAIL" : "SET AS THUMBNAIL"}
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-10 border-t border-[#E7E7E7] pt-10">
            <Field label="Internal notes — optional">
              <textarea
                rows={3}
                value={form.internalNotes}
                onChange={(e) => setField("internalNotes", e.target.value)}
                className={textareaClassName}
              />
            </Field>
          </div>

          <div className="mt-8 border-t border-[#E7E7E7] pt-8">
            <h3 className="ae-serif text-[22px] font-semibold tracking-[-0.01em] text-[#202020]">
              Organizer contact
            </h3>
            <div className="mt-[22px] grid gap-[18px] md:grid-cols-2">
              <Field label="Contact name" error={errors.contactName}>
                <input
                  type="text"
                  value={form.contactName}
                  onChange={(e) => setField("contactName", e.target.value)}
                  className={fieldClassName}
                />
              </Field>
              <Field label="Contact email" error={errors.contactEmail}>
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => setField("contactEmail", e.target.value)}
                  className={fieldClassName}
                />
              </Field>
              <Field label="Phone — optional">
                <input
                  type="tel"
                  value={form.contactPhone}
                  onChange={(e) => setField("contactPhone", e.target.value)}
                  className={fieldClassName}
                />
              </Field>
            </div>
          </div>

          <div className="mt-[34px] flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSubmitForReview}
              disabled={isBusy}
              className="rounded-[12px] bg-[#1E1E1E] px-[28px] py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isBusy ? "Please wait..." : submitLabel}
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isBusy}
              className="rounded-[12px] border border-[#202020] bg-white px-[26px] py-[15px] text-[15px] font-semibold text-[#202020] transition-colors hover:bg-[#FAFAFA] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {event ? "Save changes" : "Save as Draft"}
            </button>
          </div>
        </div>
      </fieldset>

      {event && isEventFeaturableByOrganizer(event.status) ? (
        <div className="mt-[22px] rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="ae-serif text-[19px] font-semibold tracking-[-0.01em] text-[#202020]">
                Featured Listing
              </h3>
              <p className="mt-[6px] max-w-[54ch] text-[14px] leading-[1.7] text-[#6A6A6A]">
                {event.isFeatured
                  ? "This event is featured and appears near the top of the Events page."
                  : reviewFeatureRequest
                    ? "Your payment was received — this request is now waiting on editorial approval."
                    : pendingFeatureRequest
                      ? pendingFeatureRequest.status === "PAYMENT_FAILED"
                        ? "Your last payment attempt didn't go through. You can try again below."
                        : "A Featured checkout is in progress. If you already paid, retrying below will confirm it instead of charging you again — if you didn't, it opens a fresh checkout."
                      : "Get placement near the top of the Events page and a Featured badge, for a one-time $49 fee."}
              </p>
            </div>

            {event.isFeatured ? (
              <FeaturedBadge />
            ) : reviewFeatureRequest ? (
              <span className="whitespace-nowrap rounded-full border border-[#E7E7E7] bg-white px-[15px] py-[7px] text-[12.5px] font-semibold text-[#3A3A3A]">
                Pending review
              </span>
            ) : pendingFeatureRequest ? (
              <button
                type="button"
                onClick={handleRetryFeaturedPayment}
                disabled={isRetryingPayment}
                className="whitespace-nowrap rounded-[12px] border border-[#202020] bg-white px-[24px] py-[13px] text-[14.5px] font-semibold text-[#202020] transition-colors hover:bg-[#FAFAFA] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRetryingPayment ? "Please wait..." : "Retry payment — $49"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleMakeFeatured}
                disabled={isRequestingFeatured}
                className="whitespace-nowrap rounded-[12px] bg-[#1E1E1E] px-[24px] py-[13px] text-[14.5px] font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRequestingFeatured ? "Please wait..." : "Make Featured — $49"}
              </button>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

type FieldProps = {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
};

function Field({ label, children, error, className }: FieldProps) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-[9px] block text-[13.5px] font-semibold">{label}</span>
      {children}
      {error ? <span className="mt-[7px] block text-[13px] text-[#B3261E]">{error}</span> : null}
    </label>
  );
}
