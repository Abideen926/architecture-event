"use client";

import { MapPin } from "lucide-react";
import { organizerUploadImages } from "@/lib/organizer/organizer-data";
import { OrganizerThumbArt } from "./submit-event-thumb-art";

type SubmitEventFormStepProps = {
  selectedPackageLabel: string;
  eventName: string;
  setEventName: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  registrationUrl: string;
  setRegistrationUrl: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  eventDate: string;
  setEventDate: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  venue: string;
  setVenue: (value: string) => void;
  thumbnailIndex: number;
  setThumbnailIndex: (value: number) => void;
  notes: string;
  setNotes: (value: string) => void;
  contactName: string;
  setContactName: (value: string) => void;
  contactEmail: string;
  setContactEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  organization: string;
  setOrganization: (value: string) => void;
  onSubmitReview: () => void;
};

export function SubmitEventFormStep({
  selectedPackageLabel,
  eventName,
  setEventName,
  category,
  setCategory,
  registrationUrl,
  setRegistrationUrl,
  description,
  setDescription,
  eventDate,
  setEventDate,
  city,
  setCity,
  venue,
  setVenue,
  thumbnailIndex,
  setThumbnailIndex,
  notes,
  setNotes,
  contactName,
  setContactName,
  contactEmail,
  setContactEmail,
  phone,
  setPhone,
  organization,
  setOrganization,
  onSubmitReview,
}: SubmitEventFormStepProps) {
  return (
    <>
      <div className="mt-8 flex justify-between rounded-[16px] border border-[#E7E7E7] bg-[#FAFAFA] px-5 py-4 text-[14.5px] text-[#3A3A3A]">
        <div>
          <span className="font-semibold">Package:</span> {selectedPackageLabel}
        </div>
        <span className="text-[13.5px] font-semibold text-[var(--ae-accent)]">
          Change package
        </span>
      </div>

      <div className="mt-[30px] rounded-[20px] border border-[#E7E7E7] p-6 md:p-9">
        <div className="mt-8">
          <h3 className="ae-serif text-[22px] font-semibold tracking-[-0.01em] text-[#202020]">
            Event details
          </h3>
          <div className="mt-[22px] grid gap-[18px] md:grid-cols-2">
            <label className="block md:col-span-2">
              <span className="mb-[9px] block text-[13.5px] font-semibold">
                Event name
              </span>
              <input
                type="text"
                value={eventName}
                onChange={(event) => setEventName(event.target.value)}
                className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-[9px] block text-[13.5px] font-semibold">
                Category
              </span>
              <input
                type="text"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-[9px] block text-[13.5px] font-semibold">
                Registration URL
              </span>
              <input
                type="url"
                value={registrationUrl}
                onChange={(event) => setRegistrationUrl(event.target.value)}
                className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-[9px] block text-[13.5px] font-semibold">
                Description
              </span>
              <textarea
                rows={5}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-full resize-y rounded-[12px] border border-[#E7E7E7] px-4 py-[14px] text-[15px] leading-[1.7] outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-[9px] block text-[13.5px] font-semibold">
                Date
              </span>
              <input
                type="date"
                value={eventDate}
                onChange={(event) => setEventDate(event.target.value)}
                className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-[9px] block text-[13.5px] font-semibold">
                City / region
              </span>
              <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
              />
            </label>

            <div className="md:col-span-2 mt-[14px] border-t border-[#E7E7E7] pt-7">
              <h3 className="m-0 text-[15px] font-bold text-[#202020]">
                Location
              </h3>
              <label className="mt-[16px] block">
                <span className="mb-[9px] block text-[13.5px] font-semibold text-[#202020]">
                  Venue address
                </span>
                <span className="flex h-[52px] items-center gap-[10px] rounded-[12px] border border-[#E7E7E7] bg-white px-4">
                  <MapPin
                    className="h-4 w-4 flex-none text-[#6A6A6A]"
                    strokeWidth={1.7}
                  />
                  <input
                    type="text"
                    value={venue}
                    onChange={(event) => setVenue(event.target.value)}
                    placeholder="Search for a venue or address"
                    className="w-full border-0 bg-transparent text-[15px] text-[#202020] outline-none placeholder:text-[#6A6A6A]"
                  />
                </span>
              </label>
              <div className="mt-[14px] h-[240px] overflow-hidden rounded-[16px] border border-[#E7E7E7] bg-[#F1F1F1]">
                <div
                  className="relative h-full w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #E7E7E7 1px, transparent 1px), linear-gradient(#E7E7E7 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-[10px]">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#B08A45"
                      strokeWidth="1.6"
                      aria-hidden="true"
                    >
                      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
                      <circle cx="12" cy="10" r="2.6" />
                    </svg>
                    <p className="m-0 text-[13.5px] text-[#6A6A6A]">
                      Drag the pin to set the exact location
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#E7E7E7] pt-8">
          <h3 className="ae-serif text-[16px] font-semibold tracking-[-0.01em] text-[#202020]">
            Images and video
          </h3>
          <span className="mb-5 font-medium text-[#6A6A6A]">
            Upload up to six images and one video. Select which image is used as
            the listing thumbnail.
          </span>

          <div className="pt-6">
            <div className="flex h-[142px] w-full flex-col items-center justify-center rounded-[17px] border border-dashed border-[#D1D1D1] bg-white">
              <p className="mb-[14px] text-[14px] font-normal leading-[20px] text-[#444444]">
                Drop files here, or
              </p>

              <label
                htmlFor="file-upload"
                className="flex h-[44px] w-[129px] cursor-pointer items-center justify-center rounded-[12px] border border-[#202020] bg-white text-[15px] font-semibold leading-none text-[#202020]"
              >
                Choose files
              </label>

              <input id="file-upload" type="file" multiple className="hidden" />
            </div>
          </div>
          <div className="mt-[22px] grid gap-[14px] md:grid-cols-3">
            {organizerUploadImages.map((imageId, index) => {
              const selected = thumbnailIndex === index;

              return (
                <button
                  key={imageId}
                  type="button"
                  onClick={() => setThumbnailIndex(index)}
                  className={`overflow-hidden rounded-[18px] border text-left transition-colors ${
                    selected
                      ? "border-[#202020] bg-white"
                      : "border-[#E7E7E7] bg-white hover:bg-[#FAFAFA]"
                  }`}
                >
                  <div className="relative h-[182px]">
                    <OrganizerThumbArt imageId={imageId} />
                    <span
                      className={`absolute left-3 top-3 rounded-full px-[12px] py-[6px] text-[10px] font-bold tracking-[0.14em] ${
                        selected
                          ? "bg-[#1E1E1E] text-white"
                          : "bg-white/92 text-[#3A3A3A]"
                      }`}
                    >
                      {selected ? "THUMBNAIL" : "SET AS THUMB"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className=" mt-10 border-t border-[#E7E7E7] pt-10 ">
          <label className="block md:col-span-2">
            <span className="mb-[9px] block text-[13.5px] font-semibold">
              Internal notes{" "}
              <span className="font-medium text-[#6A6A6A]">- optional</span>
            </span>
            <textarea
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="w-full resize-y rounded-[12px] border border-[#E7E7E7] px-4 py-[14px] text-[15px] leading-[1.7] outline-none"
            />
          </label>
        </div>

        <div className="mt-8 border-t border-[#E7E7E7] pt-8">
          <h3 className="ae-serif text-[22px] font-semibold tracking-[-0.01em] text-[#202020]">
            Organizer contact
          </h3>
          <div className="mt-[22px] grid gap-[18px] md:grid-cols-2">
            <label className="block">
              <span className="mb-[9px] block text-[13.5px] font-semibold">
                Contact name
              </span>
              <input
                type="text"
                value={contactName}
                onChange={(event) => setContactName(event.target.value)}
                className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-[9px] block text-[13.5px] font-semibold">
                Contact email
              </span>
              <input
                type="email"
                value={contactEmail}
                onChange={(event) => setContactEmail(event.target.value)}
                className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-[9px] block text-[13.5px] font-semibold">
                Phone{" "}
                <span className="font-medium text-[#6A6A6A]">- optional</span>
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-[9px] block text-[13.5px] font-semibold">
                Organization
              </span>
              <input
                type="text"
                value={organization}
                onChange={(event) => setOrganization(event.target.value)}
                className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none"
              />
            </label>
          </div>
        </div>

        <div className="mt-[34px] flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onSubmitReview}
            className="rounded-[12px] bg-[#1E1E1E] px-[28px] py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-black"
          >
            Submit for Review
          </button>
          <button
            type="button"
            className="rounded-[12px] border border-[#202020] bg-white px-[26px] py-[15px] text-[15px] font-semibold text-[#202020] transition-colors hover:bg-[#FAFAFA]"
          >
            Save as Draft
          </button>
        </div>
      </div>
    </>
  );
}

