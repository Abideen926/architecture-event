import Link from "next/link";
import {
  contactHelpOptions,
  contactPageContent,
} from "@/lib/architecture-events/contact/contact-data";

export function ContactPage() {
  const { description, email, socials, supportCards, title } =
    contactPageContent;

  return (
    <div className="ae-shell bg-white">
      <main className="pb-[104px] pt-[22px]">
        <section className="ae-container max-w-[1000px]">
          <p className="text-[12px] font-semibold tracking-[0.24em] text-[var(--ae-accent)] mb-7 mt-6">
            CONTACT US
          </p>
          <h1 className="ae-serif text-[45px] font-semibold leading-[0.92] tracking-[-0.06em] text-[#232323] sm:text-[50px] xl:text-[50px]">
            {title}
          </h1>
          <p className="mt-5 max-w-[66ch] text-[18px] leading-[1.7] tracking-[-0.01em] text-[#6f6f6f]">
            {description}
          </p>

          <form className="mt-14 rounded-[20px] border border-[#e3e3e3] bg-white px-5 py-5 shadow-none sm:px-6 sm:py-6 md:px-7 md:py-7 lg:px-8 lg:py-8">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Name">
                <input type="text" className={fieldClassName} />
              </FormField>
              <FormField label="Email Address">
                <input type="email" className={fieldClassName} />
              </FormField>
            </div>

            <FormField className="mt-4" label="Company or Organization">
              <input type="text" className={fieldClassName} />
            </FormField>

            <FormField className="mt-4" label="What can we help you with?">
              <select
                defaultValue={contactHelpOptions[0]}
                className={fieldClassName}
              >
                {contactHelpOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField className="mt-4" label="Message">
              <textarea
                rows={6}
                className={`${fieldClassName} min-h-[122px] resize-y px-[14px] py-[12px]`}
              />
            </FormField>

            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex h-[52px] min-w-[157px] items-center justify-center rounded-[14px] bg-[#232323] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-black"
              >
                Send Message
              </button>
            </div>
          </form>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {supportCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[20px] border border-[#e3e3e3] bg-white px-8 py-8"
              >
                <h2 className="text-[23px] font-semibold tracking-[-0.04em] text-[#242424]">
                  {card.title}
                </h2>
                <p className="mt-4 max-w-[34ch] text-[16px] leading-[1.75] tracking-[-0.01em] text-[#6f6f6f]">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="mt-8 inline-flex h-[46px] items-center justify-center rounded-[14px] border border-[#232323] px-5 text-[15px] font-medium text-[#232323] transition-colors hover:bg-[#232323] hover:!text-white"
                >
                  {card.ctaLabel}
                </Link>
              </article>
            ))}
          </div>

          <section className="mt-8 rounded-[20px] border border-[#e3e3e3] bg-[#fbfbfa] px-8 py-8">
            <p className="text-[18px] font-medium leading-[1.55] tracking-[-0.02em] text-[#2f2f2f]">
              Most messages are answered within one to two business days.
            </p>
            <a
              href={`mailto:${email}`}
              className="mt-4 inline-flex text-[16px] font-medium text-[var(--ae-accent)]"
            >
              {email}
            </a>
            <div className="mt-5 border-t border-[#e6e6e6] pt-4 text-[16px] leading-[1.8] tracking-[-0.01em] text-[#707070]">
              Follow Architecture Events on{" "}
              {socials.map((social, index) => (
                <span key={social.label}>
                  <a
                    href={social.href}
                    className="text-[var(--ae-accent)] transition-colors hover:text-[var(--ae-accent-strong)]"
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
    </div>
  );
}

const fieldClassName =
  "h-[52px] w-full rounded-[12px] border border-[#e1e1e1] bg-white px-[14px] text-[15px] text-[#232323] outline-none transition-colors placeholder:text-[#a2a2a2] focus:border-[var(--ae-accent)]";

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

function FormField({ label, children, className }: FormFieldProps) {
  return (
    <label className={className}>
      <span className="mb-[10px] block text-[14px] font-semibold text-[#2f2f2f]">
        {label}
      </span>
      {children}
    </label>
  );
}
