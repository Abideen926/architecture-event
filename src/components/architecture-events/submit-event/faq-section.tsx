"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { submitEventFaqItems } from "@/lib/architecture-events/submit-event/submit-event-data";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type SubmitEventFaqSectionProps = {
  heading?: string;
  items?: readonly FaqItem[];
  maxWidthClassName?: string;
};

export function SubmitEventFaqSection({
  heading = "Submit an Event FAQ",
  items = submitEventFaqItems,
  maxWidthClassName = "max-w-[1040px]",
}: SubmitEventFaqSectionProps) {
  const [openItemId, setOpenItemId] = useState<string>(items[0]?.id ?? "");

  return (
    <section className="bg-white pb-[88px] pt-[56px]">
      <div className="ae-container">
        <div className={`mx-auto w-full ${maxWidthClassName}`}>
          <h2 className="ae-section-heading text-[32px] leading-none md:text-[40px]">
            {heading}
          </h2>

          <div className="mt-7 border-t border-[#E3DED7]">
            {items.map((item) => {
              const isOpen = openItemId === item.id;

              return (
                <div key={item.id} className="border-b border-[#E3DED7]">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-6 py-[18px] text-left"
                    onClick={() => setOpenItemId(isOpen ? "" : item.id)}
                  >
                    <span className="text-[15px] font-semibold leading-[1.45] text-[#2A2A2A]">
                      {item.question}
                    </span>
                    {isOpen ? (
                      <Minus className="h-4 w-4 shrink-0 text-[#6F6F6F]" strokeWidth={1.9} />
                    ) : (
                      <Plus className="h-4 w-4 shrink-0 text-[#6F6F6F]" strokeWidth={1.9} />
                    )}
                  </button>

                  {isOpen ? (
                    <p className="max-w-[860px] pb-[18px] text-[14px] leading-[1.85] text-[#747474]">
                      {item.answer}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
