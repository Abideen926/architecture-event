import Image from "next/image";

export function AboutHeroSection() {
  return (
    <div className="bg-white antialiased pb-5">
      <section className="relative isolate overflow-hidden bg-[#1f1e1d]">
        <div className="grid min-h-[560px] lg:min-h-[672px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 flex items-start px-6 pb-24 pt-16 sm:px-8 sm:pt-20 lg:px-16 lg:pb-28 lg:pt-18 xl:px-20">
            <div className="max-w-[650px]">
              <div className="flex gap-4 mb-8">
                <div className="w-[55px] h-[1px] bg-ae-accent mt-[8px] shrink-0"></div>

                <p className="text-[12px] font-semibold tracking-[0.26em] text-ae-accent mb-4">
                  ABOUT
                </p>
              </div>
              <h1 className="ae-serif text-balance text-[56px] font-semibold leading-[0.94] tracking-[-0.05em] text-white sm:text-[52px] lg:text-[60px] xl:text-[80px]">
                Where the AEC
                <br />
                Community
                <br />
                <span className="italic font-normal text-ae-accent">
                  Connects
                </span>
              </h1>

              <p className="mt-10 max-w-[40rem] text-[14px] leading-[1.65] tracking-[-0.010em] text-[rgba(255,255,255,0.72)] sm:text-[18px]">
                Architecture Events was created with one simple goal: to make it
                easier for professionals across the Architecture, Engineering,
                and Construction (AEC) industry to discover meaningful events,
                build valuable relationships, and stay connected to what&apos;s
                happening in their local community.
              </p>
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-0">
            <Image
              src="/images/abouthero.jfif"
              alt="Modern glass architecture viewed from street level"
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,30,29,0.98)_0%,rgba(31,30,29,0.94)_38%,rgba(31,30,29,0.6)_60%,rgba(31,30,29,0.05)_84%,rgba(31,30,29,0)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_42%)]" />
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-24 px-6 pb-10 sm:px-8 lg:-mt-20 lg:px-16 lg:pb-5 xl:px-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="rounded-[28px] border border-[#E8E1D7] bg-white px-7 py-5 shadow-[0_30px_70px_-34px_rgba(20,20,20,0.28)] sm:px-10 sm:py-9 lg:px-10 lg:py-12">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.25fr] lg:gap-16 justify-center items-center">
              <h2 className="ae-serif max-w-[18ch] text-[28px] font-semibold leading-[1.20] tracking-[-0.04em] text-[#1f1f1f] sm:text-[30px] lg:text-[32px]">
                Architecture Events brings everything together in one place.
              </h2>

              <div className="space-y-3 text-[16px] leading-[1.95] text-[#6f6f6f] sm:text-[17px]">
                <p>
                  For years, industry events have been scattered across
                  association websites, LinkedIn posts, newsletters, and word of
                  mouth. Finding the right networking event, product showcase,
                  conference, or educational program often meant searching
                  multiple sources and hoping you didn&apos;t miss something
                  important.
                </p>
                <p>
                  Whether you&apos;re an architect, designer, engineer,
                  contractor, developer, manufacturer, consultant, or student,
                  our platform helps you discover opportunities to learn,
                  connect, and grow your network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
