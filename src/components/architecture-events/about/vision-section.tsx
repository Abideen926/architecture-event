import Image from "next/image";

export function AboutVisionSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#131313] py-[92px] md:py-[92px]">
      <Image
        src="/images/vission.jfif"
        alt="Architect reviewing plans at a desk"
        fill
        priority={false}
        sizes="100vw"
        className="object-cover object-center opacity-55"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.72)_62%,rgba(0,0,0,0.86)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.62)_0%,rgba(8,8,8,0.72)_100%)]" />

      <div className="ae-container relative z-10">
        <div className="mx-auto flex max-w-[1150px] flex-col items-center text-center">
          <p className="text-[12px] font-semibold tracking-[0.24em] text-ae-accent">
            OUR VISION
          </p>
          <h2 className="ae-serif mt-6 max-w-[32ch] text-balance text-[44px] font-semibold leading-[1.08] tracking-[-0.05em] text-white sm:text-[45px] lg:text-[50px]">
            Our vision is to become the platform
            <br />
            AEC professionals visit first when
            <br />
            they want to know what&apos;s happening
            <br />
            in the industry.
          </h2>
          <p className="mt-7 max-w-[56ch] text-[17px] leading-[1.7] tracking-[-0.01em] text-white/72 sm:text-[18px]">
            Not just for events, but for community, collaboration, and the
            conversations shaping the built environment.
          </p>
        </div>
      </div>
    </section>
  );
}
