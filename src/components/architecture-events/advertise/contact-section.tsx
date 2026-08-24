"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useCreatePublicMessageMutation } from "@/features/public/public-api";
import { getApiErrorMessage } from "@/lib/store/api-error";

const interestOptions = [
  "Brand Spotlight",
  "Sponsored Reel",
  "Industry Partnership",
  "Founding Partner",
] as const;

export function AdvertiseContactSection() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [interestedIn, setInterestedIn] = useState<string>(interestOptions[0]);
  const [message, setMessage] = useState("");
  const [createMessage, { isLoading }] = useCreatePublicMessageMutation();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    try {
      await createMessage({
        category: "ADVERTISE",
        reasonLabel: interestedIn,
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || undefined,
        message: message.trim(),
      }).unwrap();

      toast.success("Message sent", {
        description: "We'll get back to you as soon as possible.",
      });
      setName("");
      setCompany("");
      setEmail("");
      setInterestedIn(interestOptions[0]);
      setMessage("");
    } catch (error) {
      toast.error("Couldn't send your message", { description: getApiErrorMessage(error) });
    }
  }

  return (
    <section className=" pb-[96px] pt-[8px]">
      <div className="ae-container">
        <div className="mx-auto grid max-w-[1280px] gap-9 rounded-[21px] border border-[#E4E0D8] bg-mainbackground px-[34px] py-[34px] lg:grid-cols-[0.92fr_1.25fr]">
          <div>
            <h2 className="ae-section-heading text-[32px] leading-none md:text-[36px]">
              Tell us about your brand
            </h2>
            <p className="ae-section-description mt-5 text-[14px] leading-[1.7]">
              We reply to every inquiry personally, usually within one business day.
            </p>

            <div
              className="mt-8 h-[226px] rounded-[14px] bg-cover bg-center bg-no-repeat shadow-[0_18px_24px_-24px_rgba(20,20,20,0.55)] sm:h-[260px] lg:h-[305px]"
              style={{
                backgroundImage:
                  "url(/images/advirtise_brand.png)",
              }}
            />
          </div>

          <form onSubmit={handleSubmit} className="grid gap-[15px]">
            <div className="grid gap-[15px] md:grid-cols-2">
              <FormField label="Name">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClassName}
                />
              </FormField>
              <FormField label="Company">
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={fieldClassName}
                />
              </FormField>
            </div>

            <div className="grid gap-[15px] md:grid-cols-2">
              <FormField label="Email">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClassName}
                />
              </FormField>
              <FormField label="Interested in">
                <select
                  value={interestedIn}
                  onChange={(e) => setInterestedIn(e.target.value)}
                  className={fieldClassName}
                >
                  {interestOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <FormField label="Message">
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you promoting, and when?"
                className={`${fieldClassName} min-h-[94px] resize-none px-[14px] py-[11px] placeholder:text-[#8B8B8B]`}
              />
            </FormField>

            <div className="">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-[47px] min-w-[120px] items-center justify-center rounded-[10px] border border-[#232323] bg-[#232323] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Sending..." : "Send inquiry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

const fieldClassName =
  "h-[40px] w-full rounded-[11px] border border-[#DEDBD4] bg-white px-[14px] text-[14px] text-[#252525] outline-none transition-colors focus:border-[#C7B48D]";

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
};

function FormField({ label, children }: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-[8px] block text-[13px] font-medium text-[#353535]">{label}</span>
      {children}
    </label>
  );
}
