import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutValues, contactLinks, platformSteps } from "@/lib/architecture-events/about/about-data";

export function AboutLastSection() {
  return (
    <section className="bg-white text-[#242424]">
      <div className="ae-container pb-20 pt-14 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
        <div className="border-t border-[#e9e9e9] pt-12">
          <div className="grid gap-10 md:grid-cols-3 md:gap-0">
            {aboutValues.map((item, index) => (
              <article
                key={item.title}
                className={[
                  "max-w-[32ch]",
                  index > 0 ? "md:border-l md:border-[#e6e6e6] md:pl-10 lg:pl-12" : "",
                ].join(" ")}
              >
                <h2 className="ae-serif text-[25px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#242424] sm:text-[28px]">
                  {item.title}
                </h2>
                <p className="mt-6 text-[16px] leading-[1.65] tracking-[-0.01em] text-[#6d6d6d]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-28 grid gap-16 lg:mt-40 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <h2 className="ae-serif text-[40px] font-semibold leading-[1.06] tracking-[-0.045em] text-[#242424] sm:text-[45px]">
              How the platform works
            </h2>

            <div className="mt-10 border-t border-[#e6e6e6]">
              {platformSteps.map((step) => (
                <p
                  key={step}
                  className="border-b border-[#e6e6e6] py-8 text-[18px] leading-[1.7] tracking-[-0.01em] text-[#5f5f5f]"
                >
                  {step}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="ae-serif text-[40px] font-semibold leading-[1.06] tracking-[-0.045em] text-[#242424] sm:text-[45px]">
              Get in touch
            </h2>

            <p className="mt-10 max-w-[34ch] text-[18px] leading-[1.7] tracking-[-0.01em] text-[#6d6d6d]">
              For listings, advertising, corrections, or anything else - email is
              fastest.
            </p>

            <div className="mt-10 border-t border-[#e6e6e6]">
              {contactLinks.map((link) =>
                link.href.startsWith("http") ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between border-b border-[#e6e6e6] py-6 text-[18px] font-semibold text-[#242424] transition-colors hover:text-[var(--ae-accent)]"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-4 w-4 text-[var(--ae-accent)] transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group flex items-center justify-between border-b border-[#e6e6e6] py-6 text-[18px] font-semibold text-[#242424] transition-colors hover:text-[var(--ae-accent)]"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-4 w-4 text-[var(--ae-accent)] transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
