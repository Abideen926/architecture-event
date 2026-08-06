import { Check } from "lucide-react";
import { listingPlans } from "@/lib/architecture-events/submit-event/submit-event-data";

export function SubmitEventPricingSection() {
  return (
    <section className="bg-white pt-[42px]">
      <div className="ae-container">
        <div className="mx-auto grid max-w-[1040px] gap-5 lg:grid-cols-2">
          {listingPlans.map((plan) => (
            <article
              key={plan.id}
              className={`relative rounded-[18px] border bg-[#fdfbf8] px-[26px] pb-[20px] pt-[28px] shadow-[0_18px_28px_-30px_rgba(20,20,20,0.4)] ${
                plan.featured ? "border-[#242424]" : "border-[#E2DDD5]"
              }`}
            >
              {plan.badge ? (
                <span className="absolute right-[20px] top-[-9px] rounded-full bg-[var(--ae-accent)] px-3 py-[5px] text-[10px] font-bold tracking-[0.05em] text-white">
                  {plan.badge}
                </span>
              ) : null}

              <h2 className="ae-serif text-[24px] leading-none text-[#252525]">{plan.name}</h2>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-[21px] font-semibold leading-none text-[#252525]">
                  {plan.price}
                </span>
                {plan.priceSuffix ? (
                  <span className="pb-[2px] text-[13px] text-[#9A9A9A]">{plan.priceSuffix}</span>
                ) : null}
              </div>

              <div className="mt-8 border-t border-[#E3DED7] pt-6">
                <p className="text-[15px] font-medium text-[#373737]">
                  {plan.featured ? "Everything in Basic, plus:" : ""}
                </p>

                <ul className="mt-5 grid gap-[14px]">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-[14px] text-[#6A6A6A]">
                      <Check
                        className="mt-[1px] h-[14px] w-[14px] shrink-0 text-[var(--ae-accent)]"
                        strokeWidth={2.1}
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className={`mt-8 inline-flex h-[56px] w-full items-center justify-center rounded-[10px] border text-[14px] font-semibold transition-colors ${
                  plan.featured
                    ? "border-[#1F1F1F] bg-[#1F1F1F] text-white hover:bg-black"
                    : "border-[#262626] bg-white text-[#262626] hover:bg-[#262626] hover:text-white"
                }`}
              >
                {plan.buttonLabel}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
