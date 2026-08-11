import { Check } from "lucide-react";
import { listingPlans } from "@/lib/architecture-events/submit-event/submit-event-data";

export function SubmitEventPricingSection() {
  return (
    <section className="bg-white py-[46px] md:py-[52px]">
      <div className="ae-container">
        <div className="mx-auto grid max-w-[1000px] gap-6 lg:grid-cols-2">
          {listingPlans.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex min-h-[448px] flex-col rounded-[20px] border px-[42px] pb-[28px] pt-[28px] shadow-[0_18px_28px_-30px_rgba(20,20,20,0.4)] ${
                plan.featured
                  ? "border-[#1E1E1E] bg-[#FBF8F1]"
                  : "border-[#E2DDD5] bg-white"
              }`}
            >
              {plan.badge ? (
                <span className="absolute right-[22px] top-[-14px] rounded-[10px] bg-[var(--ae-accent)] px-3 py-[8px] text-[10px] font-bold tracking-[0.07em] text-white shadow-[0_10px_20px_-16px_rgba(176,138,69,0.55)]">
                  {plan.badge}
                </span>
              ) : null}

              <h2 className="ae-serif text-[25px] font-semibold leading-[1] tracking-[-0.04em] text-[#252525] md:text-[26px]">
                {plan.name}
              </h2>

              <div className="mt-7 flex items-end gap-2">
                <span className="text-[24px] font-semibold leading-none tracking-[-0.02em] text-[#252525]">
                  {plan.price}
                </span>
                {plan.priceSuffix ? (
                  <span className="pb-[3px] text-[13px] leading-none text-[#8C8C8C]">
                    {plan.priceSuffix}
                  </span>
                ) : null}
              </div>

              <div className="mt-8 border-t border-[#E3DED7] pt-6">
                <p className="text-[14px] font-semibold leading-none text-[#2E2E2E]">
                  {plan.featured ? "Everything in Basic, plus:" : ""}
                </p>

                <ul className="mt-5 grid gap-[15px]">
                  {plan.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-[14px] leading-[1.5] text-[#5E5E5E]"
                    >
                      <Check
                        className="mt-[2px] h-[13px] w-[13px] shrink-0 text-[var(--ae-accent)]"
                        strokeWidth={2.1}
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className={`mt-auto inline-flex h-[54px] w-full items-center justify-center rounded-[14px] border text-[14px] font-medium tracking-[-0.01em] transition-colors ${
                  plan.featured
                    ? "border-[#1F1F1F] bg-[#1F1F1F] text-white hover:bg-black"
                    : "border-[#232323] bg-white text-[#232323] hover:bg-[#232323] hover:text-white"
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
