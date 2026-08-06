import Link from "next/link";
import { contactHelpOptions, contactPageContent } from "@/lib/architecture-events/contact/contact-data";
import { SiteFooter } from "@/components/architecture-events/marketing/site-footer";
import { SiteHeader } from "@/components/architecture-events/marketing/site-header";

export function ContactPage() {
  const { description, email, kicker, socials, supportCards, title } =
    contactPageContent;

  return (
    <div className="ae-shell">
      <SiteHeader />

      <main className="bg-white py-[52px] pb-[96px]">
        <section className="ae-container max-w-[1020px]">
          <p className="ae-section-kicker">{kicker}</p>
          <h1 className="ae-section-heading mt-3 text-[48px] leading-[0.98] md:text-[60px]">
            {title}
          </h1>
          <p className="ae-section-description mt-5 max-w-[64ch] text-[15px] leading-[1.9]">
            {description}
          </p>

          <form className="mt-10 rounded-[14px] border border-[#DEDEDE] bg-white px-5 py-5 shadow-[0_12px_28px_-26px_rgba(20,20,20,0.35)] sm:px-5 sm:py-5 md:px-5 md:py-5 lg:px-5 lg:py-5">
            <div className="grid gap-[14px] md:grid-cols-2">
              <FormField label="Name">
                <input type="text" className={fieldClassName} />
              </FormField>
              <FormField label="Email Address">
                <input type="email" className={fieldClassName} />
              </FormField>
            </div>

            <FormField className="mt-[14px]" label="Company or Organization">
              <input type="text" className={fieldClassName} />
            </FormField>

            <FormField className="mt-[14px]" label="What can we help you with?">
              <select defaultValue={contactHelpOptions[0]} className={fieldClassName}>
                {contactHelpOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField className="mt-[14px]" label="Message">
              <textarea
                rows={6}
                className={`${fieldClassName} min-h-[128px] resize-y px-[14px] py-[12px]`}
              />
            </FormField>

            <div className="mt-[14px]">
              <button
                type="submit"
                className="inline-flex h-[42px] min-w-[120px] items-center justify-center rounded-[7px] bg-[#232323] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-black"
              >
                Send Message
              </button>
            </div>
          </form>

          <div className="mt-[22px] grid gap-[14px] md:grid-cols-2">
            {supportCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[14px] border border-[#DEDEDE] bg-white px-5 py-5"
              >
                <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-[#202020]">
                  {card.title}
                </h2>
                <p className="ae-section-description mt-3 max-w-[30ch] text-[14px] leading-[1.85]">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="mt-8 inline-flex h-[40px] items-center justify-center rounded-[9px] border border-[#202020] px-4 text-[12.5px] font-medium text-[#202020] transition-colors hover:bg-[#202020] hover:!text-white"
                >
                  {card.ctaLabel}
                </Link>
              </article>
            ))}
          </div>

          <section className="mt-[22px] rounded-[14px] border border-[#DEDEDE] bg-[#fbfaf8] px-5 py-5">
            <p className="text-[14.5px] font-medium text-[#3A3A3A]">
              Most messages are answered within one to two business days.
            </p>
            <a
              href={`mailto:${email}`}
              className="ae-link-accent mt-4 inline-flex text-[14px] font-medium"
            >
              {email}
            </a>
            <div className="mt-5 border-t border-[#E2E2E2] pt-4 text-[13.5px] leading-[1.8] text-[#7A7A7A]">
              Follow Architecture Events on{" "}
              {socials.map((social, index) => (
                <span key={social.label}>
                  <a
                    href={social.href}
                    className="ae-link-accent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {social.label}
                  </a>
                  {index === 0 ? " and " : ""}
                </span>
              ))}{" "}
              for event announcements and industry updates.
            </div>
          </section>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

const fieldClassName =
  "h-[42px] w-full rounded-[9px] border border-[#DEDEDE] bg-white px-[14px] text-[14px] text-[#202020] outline-none transition-colors focus:border-[#C7B48D]";

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

function FormField({ label, children, className }: FormFieldProps) {
  return (
    <label className={className}>
      <span className="mb-[8px] block text-[11px] font-medium text-[#353535]">
        {label}
      </span>
      {children}
    </label>
  );
}
