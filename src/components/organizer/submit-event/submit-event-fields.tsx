"use client";

import { MapPin } from "lucide-react";
import type { Category, Industry } from "@/features/public/public-api";
import { EventLocationPicker } from "@/components/maps/event-location-picker";
import type { PickedPlace } from "@/components/maps/event-location-picker";
import { Input, inputFieldClassName } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heading } from "@/components/ui/heading";
import type { EventFormState } from "./event-form-state";

const fieldClassName = inputFieldClassName();

type SubmitEventDetailsFieldsProps = {
  form: EventFormState;
  errors: Record<string, string>;
  onChange: <K extends keyof EventFormState>(key: K, value: EventFormState[K]) => void;
  onBulkChange: (patch: Partial<EventFormState>) => void;
  categories: Category[] | undefined;
  industries: Industry[] | undefined;
};

// Shared between the organizer dashboard's submit/edit wizard and the public
// pre-login intake form — deliberately excludes media upload (needs a real
// event ID, which only exists after an authenticated create call) and
// internal notes (organizer-only operational field). Split from
// SubmitEventContactFields (rather than one combined component) so the
// organizer wizard can keep its existing field order — Details/Location,
// then Media, then Internal notes, then Contact — unchanged.
export function SubmitEventDetailsFields({
  form,
  errors,
  onChange,
  onBulkChange,
  categories,
  industries,
}: SubmitEventDetailsFieldsProps) {
  function handlePositionChange(lat: string, lng: string) {
    onBulkChange({ latitude: lat, longitude: lng });
  }

  function handlePlaceSelected(place: PickedPlace) {
    onBulkChange({
      city: place.city ?? form.city,
      state: place.state ?? form.state,
      address: place.address ?? form.address,
      venueName: place.venueName ?? form.venueName,
    });
  }

  return (
    <>
      <div className="mt-8">
        <Heading level="card" as="h3">
          Event details
        </Heading>
        <div className="mt-[22px] grid gap-[18px] md:grid-cols-2">
          <Input
            label="Event name"
            error={errors.title}
            wrapperClassName="md:col-span-2"
            type="text"
            value={form.title}
            onChange={(e) => onChange("title", e.target.value)}
          />

          <Field label="Category" error={errors.categoryId}>
            <select
              value={form.categoryId}
              onChange={(e) => onChange("categoryId", e.target.value)}
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
              onChange={(e) => onChange("industryId", e.target.value)}
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

          <Input
            label="Registration URL"
            error={errors.registrationUrl}
            type="url"
            value={form.registrationUrl}
            onChange={(e) => onChange("registrationUrl", e.target.value)}
          />

          <div className="block">
            <span className="mb-[9px] block text-[13.5px] font-semibold">
              Pricing
            </span>
            <div className="flex h-[52px] items-center gap-4 rounded-[12px] border border-ae-border px-4">
              <label className="flex items-center gap-2 text-[14px]">
                <input
                  type="checkbox"
                  checked={form.isFree}
                  onChange={(e) => onChange("isFree", e.target.checked)}
                  className="h-[16px] w-[16px] accent-foreground"
                />
                Free event
              </label>
              {!form.isFree ? (
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.priceFrom}
                  onChange={(e) => onChange("priceFrom", e.target.value)}
                  placeholder="Starting price, e.g. 49.00"
                  className="h-full w-full border-0 bg-transparent text-[15px] outline-none"
                />
              ) : null}
            </div>
            {errors.priceFrom ? (
              <span className="mt-[7px] block text-[13px] text-[#B3261E]">
                {errors.priceFrom}
              </span>
            ) : null}
          </div>

          <Textarea
            label="Description"
            wrapperClassName="md:col-span-2"
            error={errors.description}
            rows={5}
            value={form.description}
            onChange={(e) => onChange("description", e.target.value)}
          />

          <Input
            label="Start date"
            error={errors.startDate}
            type="date"
            value={form.startDate}
            onChange={(e) => onChange("startDate", e.target.value)}
          />
          <Input
            label="Start time"
            error={errors.startTime}
            type="time"
            value={form.startTime}
            onChange={(e) => onChange("startTime", e.target.value)}
          />
          <Input
            label="End date (optional)"
            error={errors.endDate}
            type="date"
            value={form.endDate}
            min={form.startDate || undefined}
            onChange={(e) => onChange("endDate", e.target.value)}
          />
          <Input
            label="End time (optional)"
            error={errors.endTime}
            type="time"
            value={form.endTime}
            onChange={(e) => onChange("endTime", e.target.value)}
            disabled={!form.endDate}
            className="disabled:cursor-not-allowed disabled:opacity-50"
          />

          <div className="md:col-span-2 mt-[14px] border-t border-ae-border pt-7">
            <h3 className="m-0 text-[15px] font-bold text-foreground">
              Location
            </h3>

            <label className="mt-[16px] inline-flex items-center gap-2 text-[14px] text-[#3A3A3A]">
              <input
                type="checkbox"
                checked={form.isOnline}
                onChange={(e) => onChange("isOnline", e.target.checked)}
                className="h-[16px] w-[16px] accent-foreground"
              />
              This is an online event
            </label>

            {!form.isOnline ? (
              <div className="mt-[16px] grid gap-[18px] md:grid-cols-2">
                <Input
                  label="City"
                  error={errors.city}
                  type="text"
                  value={form.city}
                  onChange={(e) => onChange("city", e.target.value)}
                />
                <Input
                  label="State"
                  error={errors.state}
                  type="text"
                  value={form.state}
                  onChange={(e) => onChange("state", e.target.value)}
                />
                <Field label="Venue name">
                  <span className="flex h-[52px] items-center gap-[10px] rounded-[12px] border border-ae-border bg-white px-4">
                    <MapPin
                      className="h-4 w-4 flex-none text-ae-muted"
                      strokeWidth={1.7}
                    />
                    <input
                      type="text"
                      value={form.venueName}
                      onChange={(e) => onChange("venueName", e.target.value)}
                      className="w-full border-0 bg-transparent text-[15px] outline-none"
                    />
                  </span>
                </Field>
                <Input
                  label="Address"
                  type="text"
                  value={form.address}
                  onChange={(e) => onChange("address", e.target.value)}
                />

                <div className="md:col-span-2">
                  <EventLocationPicker
                    latitude={form.latitude}
                    longitude={form.longitude}
                    onPositionChange={handlePositionChange}
                    onPlaceSelected={handlePlaceSelected}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

type SubmitEventContactFieldsProps = {
  form: EventFormState;
  errors: Record<string, string>;
  onChange: <K extends keyof EventFormState>(key: K, value: EventFormState[K]) => void;
};

export function SubmitEventContactFields({
  form,
  errors,
  onChange,
}: SubmitEventContactFieldsProps) {
  return (
    <div className="mt-8 border-t border-ae-border pt-8">
      <Heading level="card" as="h3">
        Organizer contact
      </Heading>
      <div className="mt-[22px] grid gap-[18px] md:grid-cols-2">
        <Input
          label="Contact name"
          error={errors.contactName}
          type="text"
          value={form.contactName}
          onChange={(e) => onChange("contactName", e.target.value)}
        />
        <Input
          label="Contact email"
          error={errors.contactEmail}
          type="email"
          value={form.contactEmail}
          onChange={(e) => onChange("contactEmail", e.target.value)}
        />
        <Input
          label="Phone — optional"
          type="tel"
          value={form.contactPhone}
          onChange={(e) => onChange("contactPhone", e.target.value)}
        />
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
};

export function Field({ label, children, error, className }: FieldProps) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-[9px] block text-[13.5px] font-semibold">
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
