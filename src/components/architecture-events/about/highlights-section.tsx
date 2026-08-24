import { aboutHighlights } from "@/lib/architecture-events/about/about-data";

export function AboutHighlightsSection() {
  return (
    <section className="bg-[#f6f4ef] py-[92px] md:py-[112px]">
      <div className="ae-container">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-[72px] xl:gap-[84px]">
          <div className="pt-[2px] lg:pt-0">
            <h2 className="ae-serif max-w-[18ch] text-[42px] font-semibold leading-[0.94] tracking-[-0.05em] text-[#232323] md:text-[52px] xl:text-[45px]">
              More Than an Event Calendar
            </h2>
            <div className="mt-8 max-w-[70ch] space-y-6 text-[18px] leading-[1.68] tracking-[-0.01em] text-[#232323]">
              <p>
                We believe the best opportunities in the AEC industry happen
                through relationships.
              </p>
              <p>
                That&apos;s why Architecture Events is more than a calendar.
                It&apos;s a platform designed to strengthen the industry&apos;s
                community by helping professionals:
              </p>
            </div>
          </div>

          <div className="border-t border-[#ded6c9]">
            {aboutHighlights.map((item, index) => (
              <div
                key={item}
                className="grid gap-4 border-b border-[#ded6c9] py-[22px] md:grid-cols-[54px_1fr] md:items-start md:gap-6"
              >
                <span className="ae-serif text-[24px] leading-none tracking-[-0.04em] text-ae-accent md:text-[26px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="max-w-[44ch] text-[16px] leading-[1.55] tracking-[-0.01em] text-[#343434] md:text-[17px] lg:max-w-[54ch]">
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
