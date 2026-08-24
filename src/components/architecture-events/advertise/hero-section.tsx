export function AdvertiseHeroSection() {
  return (
    <section className="relative min-h-[424px] overflow-hidden bg-[#1A1A1A]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{
          backgroundImage: "url(/images/taylor.jfif)",
          filter: "saturate(0.9) brightness(0.58) contrast(1.02)",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,18,18,0.78)_0%,rgba(18,18,18,0.72)_38%,rgba(18,18,18,0.42)_100%)]" />
      <div className="relative mx-auto flex min-h-[424px] max-w-[1440px] items-center px-[80px] py-[76px]">
        <div className="max-w-[1060px]">
          <p className="text-[11px] font-semibold tracking-[0.26em] text-ae-accent">
            ADVERTISE
          </p>
          <h1 className="ae-serif mt-5 max-w-[22ch] text-[53px] font-semibold leading-[0.99] tracking-[-0.04em] text-white md:text-[48px] lg:text-[58px]">
            Advertise with Architecture Events
          </h1>
          <p className="mt-7 max-w-[800px] text-[17px] leading-[1.62] text-white/78 md:text-[18px]">
            Connect your brand with architects, designers, engineers,
            contractors, manufacturers, developers, and other AEC professionals
            through premium advertising opportunities designed specifically for
            the architecture, engineering, and construction industry.
          </p>
        </div>
      </div>
    </section>
  );
}
