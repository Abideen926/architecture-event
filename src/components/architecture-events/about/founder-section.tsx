import Image from "next/image";

export function AboutFounderSection() {
  return (
    <section className="bg-[#FFFFFF] py-[78px] md:py-[102px]">
      <div className="ae-container">
        <div className="mx-auto max-w-[1280px]">
          <div className="border-t border-[#252525]" />

          <div className="pt-9">
            <h2 className="ae-serif text-[50px] font-semibold leading-[0.98] tracking-[-0.05em] text-[#252525] md:text-[56px] lg:text-[58px]">
              Meet the Founder
            </h2>

            <div className="mt-10 grid gap-10 lg:grid-cols-[510px_1fr] lg:gap-[72px] xl:grid-cols-[510px_1fr] xl:gap-[86px]">
              <div className="relative aspect-[1/1] overflow-hidden rounded-[18px] bg-[#e8e2da] shadow-[0_22px_40px_-34px_rgba(20,20,20,0.45)]">
                <Image
                  src="/images/founder.png"
                  alt="Founder portrait"
                  fill
                  sizes="(min-width: 1024px) 510px, 100vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="pt-[10px] text-[16px] leading-[1.9] tracking-[-0.01em] text-[#252525] md:text-[17px]">
                <p className="max-w-[50ch]">
                  After spending more than 15 years working in the AEC industry, I
                  experienced firsthand how difficult it was to keep up with
                  industry events. Great networking opportunities were often
                  hidden across dozens of organizations, websites, and email
                  lists.
                </p>

                <div className="my-8 border-y border-[#e7e0d7] py-8">
                  <p className="ae-serif max-w-[28ch] text-[32px] leading-[1.08] tracking-[-0.05em] text-[#2b2b2b] md:text-[36px] lg:text-[38px]">
                    I created Architecture Events to solve that problem.
                  </p>
                </div>

                <div className="space-y-6">
                  <p className="max-w-[72ch]">
                    My goal is simple: make it easier for our industry to connect,
                    learn from one another, and build stronger professional
                    relationships.
                  </p>
                  <p className="max-w-[72ch] text-[#757575]">
                    Thank you for being part of the community. We&apos;re just getting
                    started.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
