import Link from "next/link";
import { SiteHeader } from "@/components/architecture-events/marketing/site-header";
import { loginPageContent } from "@/lib/architecture-events/auth/login-data";
import { appRoutes } from "@/lib/routes";

export function LoginPage() {
  const content = loginPageContent;

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="grid min-h-[calc(100vh-76px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="flex items-center justify-center px-6 py-14 sm:px-10 lg:px-16 xl:px-20">
          <div className="w-full max-w-[400px]">
            <h1 className="ae-section-heading text-[56px] leading-[0.96] tracking-[-0.045em] text-[#202020]">
              {content.title}
            </h1>
            <p className="ae-section-description mt-6 text-[16px] leading-[1.8]">
              {content.description}
            </p>

            <form className="mt-10">
              <AuthField label="Email">
                <input
                  type="email"
                  placeholder={content.emailPlaceholder}
                  className={fieldClassName}
                />
              </AuthField>

              <div className="mt-6 flex items-end justify-between gap-4">
                <span className="text-[14px] font-semibold text-[#303030]">Password</span>
                <Link
                  href={appRoutes.architectureEvents.contact}
                  className="ae-link-accent text-[14px] font-medium"
                >
                  {content.forgotPasswordLabel}
                </Link>
              </div>
              <input
                type="password"
                placeholder={content.passwordPlaceholder}
                className={`${fieldClassName} mt-3`}
              />

              <button
                type="submit"
                className="mt-5 inline-flex h-[54px] w-full items-center justify-center rounded-[14px] bg-[#232323] text-[15px] font-semibold text-white transition-colors hover:bg-black"
              >
                {content.submitLabel}
              </button>
            </form>

            <p className="mt-8 text-[15px] leading-[1.8] text-[#7A7A7A]">
              {content.accountPrompt}{" "}
              <Link
                href={content.accountCtaHref}
                className="ae-link-accent font-semibold"
              >
                {content.accountCtaLabel}
              </Link>
            </p>
            <p className="mt-3 text-[15px] leading-[1.8] text-[#7A7A7A]">
              {content.note}
            </p>
          </div>
        </section>

        <section className="relative hidden min-h-[720px] xl:block">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${content.image})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(132,149,163,0.26)_0%,rgba(52,56,60,0.42)_100%)]" />
          <div className="absolute inset-x-[58px] bottom-[52px] max-w-[720px]">
            <p className="ae-serif text-[33px] leading-[1.15] tracking-[-0.03em] text-white">
              {content.imageCaption}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

const fieldClassName =
  "h-[54px] w-full rounded-[14px] border border-[#DEDEDE] bg-white px-[18px] text-[15px] text-[#202020] outline-none transition-colors placeholder:text-[#8A8A8A] focus:border-[#C7B48D]";

type AuthFieldProps = {
  label: string;
  children: React.ReactNode;
};

function AuthField({ label, children }: AuthFieldProps) {
  return (
    <label className="block">
      <span className="block text-[14px] font-semibold text-[#303030]">{label}</span>
      <div className="mt-3">{children}</div>
    </label>
  );
}
