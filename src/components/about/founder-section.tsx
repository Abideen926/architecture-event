import { ArrowRight } from "lucide-react";
import { aboutValues, contactLinks, platformSteps } from "@/lib/about/about-data";

export function AboutFounderSection() {
  return (
    <section className="bg-[#fbfaf7] py-[78px] md:py-[102px]">
      <div className="ae-container">
        <div className="mx-auto max-w-[1150px]">
          <div className="border-t border-[#272727]" />

          <div className="pt-5">
            <h2 className="ae-section-heading text-[38px] leading-none md:text-[44px]">
              Meet the Founder
            </h2>

            <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
              <div
                className="h-[266px] rounded-[10px] bg-cover bg-center bg-no-repeat shadow-[0_22px_30px_-30px_rgba(20,20,20,0.4)]"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=900&q=80)",
                }}
              />

              <div className="text-[12.5px] leading-[1.72] text-[#6d6d6d]">
                <p className="max-w-[70ch]">
                  After spending more than 15 years working in the AEC industry, I
                  experienced firsthand how difficult it was to keep up with industry
                  events. Great networking opportunities were often hidden across
                  dozens of organization websites, newsletters, and email lists.
                </p>

                <div className="mt-6 border-y border-[#e5dfd4] py-5">
                  <p className="ae-serif max-w-[23ch] text-[33px] leading-[1.16] text-[#2b2b2b]">
                    I created Architecture Events to solve that problem.
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  <p className="max-w-[72ch]">
                    My goal is simple: make it easier for our industry to connect,
                    learn from one another, and build stronger professional
                    relationships.
                  </p>
                  <p className="max-w-[72ch]">
                    Thank you for being part of the community. We&apos;re just getting
                    started.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-8 border-t border-[#e5dfd4] pt-8 lg:grid-cols-3 lg:gap-7">
              {aboutValues.map((item) => (
                <div key={item.title} className="lg:border-r lg:border-[#e5dfd4] lg:pr-7 last:lg:border-r-0 last:lg:pr-0">
                  <h3 className="ae-serif text-[18px] text-[#2c2c2c]">{item.title}</h3>
                  <p className="mt-3 text-[12px] leading-[1.72] text-[#6d6d6d]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1.06fr_0.94fr]">
              <div>
                <h3 className="ae-section-heading text-[36px] leading-none">
                  How the platform works
                </h3>
                <div className="mt-6 border-t border-[#e5dfd4]">
                  {platformSteps.map((step) => (
                    <p
                      key={step}
                      className="border-b border-[#e5dfd4] py-[16px] text-[12px] leading-[1.72] text-[#6d6d6d]"
                    >
                      {step}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="ae-section-heading text-[36px] leading-none">Get in touch</h3>
                <p className="mt-6 max-w-[30ch] text-[12px] leading-[1.72] text-[#6d6d6d]">
                  For listings, advertising, corrections, or anything else, email is
                  fastest.
                </p>

                <div className="mt-6 border-t border-[#e5dfd4]">
                  {contactLinks.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="flex w-full items-center justify-between border-b border-[#e5dfd4] py-[14px] text-left text-[12px] font-medium text-[#2f2f2f]"
                    >
                      <span>{item}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[var(--ae-accent)]" strokeWidth={1.8} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
