"use client";

import { Check, MapPin } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
  organizerDefaultForm,
  organizerPackages,
  organizerUploadImages,
} from "@/lib/organizer/organizer-data";

type SubmitStep = "package" | "form" | "done";
type PackageId = "basic" | "featured";

export function OrganizerSubmitPage() {
  return (
    <Suspense fallback={<OrganizerSubmitPageFallback />}>
      <OrganizerSubmitPageContent />
    </Suspense>
  );
}

function OrganizerSubmitPageFallback() {
  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <div className="border-b border-[#E7E7E7] pb-5">
        <h2 className="ae-serif text-[30px] font-semibold tracking-[-0.015em] text-[#202020]">
          Submit New Event
        </h2>
        <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
          Step 1 of 2 - choose your listing package
        </p>
      </div>
    </div>
  );
}

function OrganizerSubmitPageContent() {
  const searchParams = useSearchParams();
  const initialStep: SubmitStep =
    searchParams.get("step") === "form" ? "form" : "package";
  const [step, setStep] = useState<SubmitStep>(initialStep);
  const [selectedPackage, setSelectedPackage] = useState<PackageId>("featured");
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  // FIX: Explicitly type all form states as <string> to allow updates from inputs
  const [eventName, setEventName] = useState<string>(
    organizerDefaultForm.eventName
  );
  const [eventDate, setEventDate] = useState<string>(
    organizerDefaultForm.eventDate
  );
  const [city, setCity] = useState<string>(organizerDefaultForm.city);
  const [venue, setVenue] = useState<string>(organizerDefaultForm.venue);
  const [category, setCategory] = useState<string>(
    organizerDefaultForm.category
  );
  const [registrationUrl, setRegistrationUrl] = useState<string>(
    organizerDefaultForm.registrationUrl
  );
  const [description, setDescription] = useState<string>(
    organizerDefaultForm.description
  );
  const [notes, setNotes] = useState<string>(organizerDefaultForm.notes);
  const [contactName, setContactName] = useState<string>(
    organizerDefaultForm.contactName
  );
  const [contactEmail, setContactEmail] = useState<string>(
    organizerDefaultForm.contactEmail
  );
  const [phone, setPhone] = useState<string>(organizerDefaultForm.phone);
  const [organization, setOrganization] = useState<string>(
    organizerDefaultForm.organization
  );

  const selectedPackageLabel =
    selectedPackage === "featured"
      ? "Featured Listing - $49"
      : "Basic Listing - Free";

  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <div className="border-b border-[#E7E7E7] pb-5">
        <h2 className="ae-serif text-[30px] font-semibold tracking-[-0.015em] text-[#202020]">
          Submit New Event
        </h2>
        <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
          Step 1 of 2 - choose your listing package
        </p>
      </div>

      {step === "package" ? (
        <div className="mt-[28px]">
          <h3 className="ae-serif text-[26px] font-semibold tracking-[-0.015em] text-[#202020]">
            Choose a listing package
          </h3>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#6A6A6A]">
            Pick a package to open the submission form. You can change it before
            you submit.
          </p>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {organizerPackages.map((item) => (
              <div
                key={item.id}
                className={`rounded-[20px] border bg-white p-[26px] ${
                  item.id === "featured"
                    ? "border-[#202020]"
                    : "border-[#E7E7E7]"
                }`}
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.16em] text-[#6A6A6A]">
                      {item.name.toUpperCase()}
                    </p>
                    <p className="ae-serif mt-[18px] text-[46px] font-semibold leading-none tracking-[-0.04em] text-[#2C2C2C]">
                      {item.price}
                    </p>
                  </div>
                  {item.id === "featured" ? (
                    <span className="inline-flex rounded-full bg-[var(--ae-accent)] px-[12px] py-[5px] text-[10px] font-bold tracking-[0.12em] text-white">
                      FEATURED
                    </span>
                  ) : null}
                </div>

                <div className="mt-5 border-t border-[#EAEAEA] pt-5" />

                <div className="grid gap-[11px] text-[14.5px] text-[#4B4B4B]">
                  {item.points.map((point) => (
                    <span key={point} className="flex items-start gap-[10px]">
                      <span className="mt-[2px] text-[13px] font-semibold text-[var(--ae-accent)]">
                        +
                      </span>
                      <span>{point}</span>
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPackage(item.id);
                    setStep("form");
                  }}
                  className={`mt-7 rounded-[12px] px-[20px] py-[13px] text-[15px] font-semibold transition-colors ${
                    item.id === "featured"
                      ? "bg-[#232323] text-white hover:bg-black"
                      : "border border-[#202020] bg-white text-[#202020] hover:bg-[#FAFAFA]"
                  }`}
                >
                  {item.id === "featured" ? "Select Featured" : "Select Basic"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {step === "form" ? (
        <>
          <div className="flex justify-between rounded-[16px] border border-[#E7E7E7] bg-[#FAFAFA] mt-8 px-5 py-4 text-[14.5px] text-[#3A3A3A]">
            <div>
              <span className="font-semibold">Package:</span>{" "}
              {selectedPackageLabel}
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
              <span className="font-medium text-[#6A6A6A] mb-5">
                Upload up to six images and one video. Select which image is
                used as the listing thumbnail.
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

                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                  />
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
            <div className=" mt-10 pt-10 border-t border-[#E7E7E7] ">
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
                    <span className="font-medium text-[#6A6A6A]">
                      - optional
                    </span>
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
                onClick={() => setStep("done")}
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
      ) : null}

      {step === "done" ? (
        <div className="mt-[30px] rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] px-[44px] py-[66px] text-center">
          <span className="inline-flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#1E1E1E] text-white">
            <Check className="h-[22px] w-[22px]" strokeWidth={2.1} />
          </span>
          <h3 className="ae-serif mt-6 text-[29px] font-semibold tracking-[-0.015em] text-[#202020]">
            Your event has been submitted
          </h3>
          <p className="mx-auto mt-[14px] max-w-[52ch] text-[16px] leading-[1.75] text-[#6A6A6A]">
            It is now under review. You&apos;ll receive a confirmation email
            shortly, and the status on your listing will update as editorial
            works through it.
          </p>
          {selectedPackage === "featured" ? (
            <p className="mx-auto mt-[18px] max-w-[52ch] text-[14.5px] leading-[1.7] text-[#6A6A6A]">
              Payment for the Featured Listing is processed after editorial
              approval. Nothing has been charged yet.
            </p>
          ) : null}
          <div className="mt-[30px] flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setStep("package")}
              className="rounded-[12px] bg-[#1E1E1E] px-[28px] py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-black"
            >
              Back to My Listings
            </button>
            <button
              type="button"
              onClick={() => setStep("package")}
              className="rounded-[12px] border border-[#202020] bg-white px-[26px] py-[15px] text-[15px] font-semibold text-[#202020] transition-colors hover:bg-[#F1F1F1]"
            >
              Submit another event
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

type OrganizerThumbArtProps = {
  imageId: (typeof organizerUploadImages)[number];
};

function OrganizerThumbArt({ imageId }: OrganizerThumbArtProps) {
  if (imageId === "e1") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#1d94ba]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b81a9] via-[#1598bd] to-[#77c0d3]" />
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={`wave-${index}`}
            className="absolute left-[-6%] right-[-6%] rounded-[999px] border-[3px] border-[#dceef0]"
            style={{
              bottom: `${-44 + index * 9}px`,
              height: `${98 + index * 8}px`,
              transform: "rotate(-10deg)",
              opacity: 0.96,
            }}
          />
        ))}
      </div>
    );
  }

  if (imageId === "e3") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#14121b]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#18141d] via-[#0f1118] to-[#251534]" />
        {Array.from({ length: 42 }).map((_, index) => (
          <span
            key={`light-${index}`}
            className="absolute rounded-full bg-[#d7d5c8]"
            style={{
              left: `${(index * 11) % 100}%`,
              top: `${(index * 7) % 34}%`,
              width: `${4 + (index % 3)}px`,
              height: `${4 + (index % 3)}px`,
              opacity: 0.35 + (index % 4) * 0.12,
            }}
          />
        ))}
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={`audience-${index}`}
            className="absolute bottom-0 rounded-t-full"
            style={{
              left: `${index * 5.7}%`,
              width: `${18 + (index % 4) * 4}px`,
              height: `${32 + (index % 6) * 6}px`,
              background:
                index % 3 === 0
                  ? "#3f6fa2"
                  : index % 3 === 1
                  ? "#62487b"
                  : "#24262d",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#dde9f3]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#cddceb] via-[#edf4fa] to-[#f6f8fa]" />
      <div className="absolute bottom-0 left-[18%] h-[72%] w-[34%] origin-bottom-left skew-x-[-34deg] bg-[#d7e0ea] shadow-[0_0_0_1px_rgba(120,140,160,0.18)]" />
      <div className="absolute bottom-0 left-[36%] h-[56%] w-[25%] origin-bottom-left skew-x-[-34deg] bg-[#f7fafc] shadow-[0_0_0_1px_rgba(120,140,160,0.12)]" />
      <div className="absolute bottom-0 left-[46%] h-[78%] w-[17%] origin-bottom-left skew-x-[-34deg] bg-[#d9e2ea]" />
      <div className="absolute bottom-0 left-[53%] h-[28%] w-[16%] origin-bottom-left skew-x-[28deg] bg-[#edf3f8]" />
      <div className="absolute bottom-[20%] left-[45%] h-[11%] w-[4%] bg-[#7d8a98]" />
      <div className="absolute bottom-0 left-0 h-[12%] w-full bg-white/55" />
    </div>
  );
}
