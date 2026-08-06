import Link from "next/link";
import { SiteHeader } from "@/components/architecture-events/marketing/site-header";
import { signupPageContent } from "@/lib/architecture-events/auth/signup-data";

export function SignupPage() {
  const content = signupPageContent;

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="px-6 py-14 sm:px-10 lg:px-16">
        <section className="mx-auto max-w-[670px]">
          <h1 className="ae-section-heading text-[56px] leading-[0.96] tracking-[-0.045em] text-[#202020]">
            {content.title}
          </h1>
          <p className="ae-section-description mt-5 max-w-[34ch] text-[16px] leading-[1.85]">
            {content.description}
          </p>

          <form className="mt-9 rounded-[20px] border border-[#DEDEDE] bg-white px-7 py-7 shadow-[0_12px_28px_-26px_rgba(20,20,20,0.35)]">
            <div className="grid gap-5 md:grid-cols-2">
              <AuthField label="Full name">
                <input type="text" className={fieldClassName} />
              </AuthField>
              <AuthField label="Email">
                <input type="email" className={fieldClassName} />
              </AuthField>
              <AuthField label="Password">
                <input type="password" className={fieldClassName} />
              </AuthField>
              <AuthField label="Role">
                <select defaultValue={content.roles[0]} className={fieldClassName}>
                  {content.roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </AuthField>
            </div>

            <div className="mt-6 border-t border-[#E5E5E5] pt-6">
              <PreferenceGroup
                title="Favourite categories"
                subtitle="optional"
                items={content.categories}
              />

              <div className="mt-6">
                <PreferenceGroup
                  title="Cities you follow"
                  subtitle="optional"
                  items={content.cities}
                />
              </div>

              <label className="mt-6 flex rounded-[14px] border border-[#DEDEDE] bg-[#fafafa] px-4 py-4">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-1 h-4 w-4 rounded border-[#CFCFCF] accent-[#232323]"
                />
                <span className="ml-4 text-[14px] leading-[1.75] text-[#666666]">
                  {content.newsletterLabel}
                  <br />
                  {content.newsletterNote}
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex h-[44px] w-full items-center justify-center rounded-[12px] bg-[#232323] text-[15px] font-semibold text-white transition-colors hover:bg-black"
            >
              {content.submitLabel}
            </button>

            <p className="mt-5 text-center text-[14px] leading-[1.8] text-[#7A7A7A]">
              {content.loginPrompt}{" "}
              <Link href={content.loginCtaHref} className="ae-link-accent font-semibold">
                {content.loginCtaLabel}
              </Link>
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}

const fieldClassName =
  "h-[44px] w-full rounded-[13px] border border-[#DEDEDE] bg-white px-[14px] text-[14px] text-[#202020] outline-none transition-colors focus:border-[#C7B48D]";

type AuthFieldProps = {
  label: string;
  children: React.ReactNode;
};

function AuthField({ label, children }: AuthFieldProps) {
  return (
    <label className="block">
      <span className="mb-[8px] block text-[14px] font-semibold text-[#303030]">{label}</span>
      {children}
    </label>
  );
}

type PreferenceItem = {
  label: string;
  selected: boolean;
};

type PreferenceGroupProps = {
  title: string;
  subtitle: string;
  items: readonly PreferenceItem[];
};

function PreferenceGroup({ title, subtitle, items }: PreferenceGroupProps) {
  return (
    <div>
      <p className="text-[14px] font-semibold text-[#303030]">
        {title} <span className="font-normal text-[#7A7A7A]">- {subtitle}</span>
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`inline-flex h-[32px] items-center rounded-full border px-4 text-[14px] transition-colors ${
              item.selected
                ? "border-[#232323] bg-[#232323] text-white"
                : "border-[#DEDEDE] bg-white text-[#3A3A3A] hover:border-[#C7B48D]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
