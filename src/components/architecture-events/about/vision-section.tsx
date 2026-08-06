export function AboutVisionSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#1b1b1b] py-[96px] md:py-[124px]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(20,20,20,0.72), rgba(20,20,20,0.72)), url(https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="ae-container relative z-10">
        <div className="mx-auto max-w-[920px] text-center">
          <p className="ae-section-kicker">OUR VISION</p>
          <h2 className="ae-serif mt-7 text-[46px] leading-[1.02] tracking-[-0.04em] text-white md:text-[64px]">
            Our vision is to become the platform AEC professionals visit first when
            they want to know what&apos;s happening in the industry.
          </h2>
          <p className="mx-auto mt-8 max-w-[40ch] text-[16px] leading-[1.7] text-white/78 md:text-[17px]">
            Not just for events, but for community, collaboration, and the
            conversations shaping the built environment.
          </p>
        </div>
      </div>
    </section>
  );
}
