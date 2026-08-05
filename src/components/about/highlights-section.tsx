import { aboutHighlights } from "@/lib/about/about-data";

export function AboutHighlightsSection() {
  return (
    <section className="bg-[#fbfaf7] py-[96px] md:py-[118px]">
      <div className="ae-container">
        <div className="mx-auto grid max-w-[1150px] gap-14 lg:grid-cols-[0.84fr_1.16fr] lg:gap-20">
          <div>
            <h2 className="ae-section-heading max-w-[10ch] text-[52px] leading-[0.96] md:text-[62px]">
              More Than an Event Calendar
            </h2>
            <div className="mt-8 max-w-[33ch] space-y-7 text-[17px] leading-[1.72] text-[#6b6b6b]">
              <p>
                We believe the best opportunities in the AEC industry happen through
                relationships.
              </p>
              <p>
                That&apos;s why Architecture Events is more than a calendar. It&apos;s a
                platform designed to strengthen the industry&apos;s community by helping
                professionals:
              </p>
            </div>
          </div>

          <div className="border-t border-[#e4ded3]">
            {aboutHighlights.map((item, index) => (
              <div
                key={item}
                className="grid gap-5 border-b border-[#e4ded3] py-[23px] md:grid-cols-[58px_1fr] md:items-start"
              >
                <span className="ae-serif text-[24px] leading-none text-[var(--ae-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="max-w-[34ch] text-[16px] leading-[1.5] text-[#373737] md:text-[17px]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
