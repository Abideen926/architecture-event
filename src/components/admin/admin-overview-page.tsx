import Link from "next/link";
import {
  adminAttentionItems,
  adminOverviewStats,
  advertisingPackages,
  ledgerEntries,
  monthlyVolume,
  seoHealthItems,
  spotlightSlots,
  stripePayments,
} from "@/lib/admin/dashboard-data";
import { appRoutes } from "@/lib/routes";
import { AdminPageHeader } from "./admin-page-header";

export function AdminOverviewPage() {
  const maxVolume = Math.max(...monthlyVolume.map((entry) => entry.submitted), 1);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        kicker="ADMIN"
        title="Platform oversight"
        description="Everything submitted, everyone who submitted it, and what needs a decision today."
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {adminOverviewStats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[20px] border border-[#E7E7E7] bg-white p-6 shadow-[0_10px_20px_-24px_rgba(20,20,20,0.24)]"
          >
            <p className="text-[12px] font-bold tracking-[0.12em] text-[#8A8A8A]">
              {stat.label.toUpperCase()}
            </p>
            <p className="mt-4 ae-serif text-[42px] leading-none tracking-[-0.03em] text-[#202020]">
              {stat.value}
            </p>
            <p className="mt-3 text-[14px] leading-[1.75] text-[#6A6A6A]">
              {stat.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-[22px] border border-[#E7E7E7] bg-white p-7 shadow-[0_10px_20px_-24px_rgba(20,20,20,0.24)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11.5px] font-bold tracking-[0.13em] text-[var(--ae-accent)]">
              NEEDS ATTENTION
            </p>
            <h2 className="mt-3 ae-serif text-[30px] leading-[1.08] tracking-[-0.02em] text-[#202020]">
              What needs a decision now
            </h2>
          </div>
          <Link
            href={appRoutes.admin.events}
            className="text-[14px] font-semibold text-[var(--ae-accent)] transition-colors hover:text-[var(--ae-accent-strong)]"
          >
            Open review tools
          </Link>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {adminAttentionItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[18px] border border-[#E7E7E7] bg-[#FCFBF8] p-5"
            >
              <h3 className="text-[17px] font-semibold text-[#202020]">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.7] text-[#6A6A6A]">{item.meta}</p>
              <Link
                href={item.href}
                className="mt-4 inline-flex text-[13.5px] font-semibold text-[var(--ae-accent)] transition-colors hover:text-[var(--ae-accent-strong)]"
              >
                {item.actionLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_1fr]">
        <section className="rounded-[22px] border border-[#E7E7E7] bg-white p-7 shadow-[0_10px_20px_-24px_rgba(20,20,20,0.24)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11.5px] font-bold tracking-[0.13em] text-[var(--ae-accent)]">
                ADVERTISING
              </p>
              <h2 className="mt-3 ae-serif text-[28px] leading-[1.08] tracking-[-0.02em] text-[#202020]">
                Inventory and placements
              </h2>
            </div>
            <Link
              href={appRoutes.admin.payments}
              className="text-[14px] font-semibold text-[var(--ae-accent)] transition-colors hover:text-[var(--ae-accent-strong)]"
            >
              View payments
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {spotlightSlots.map((slot) => (
              <article key={slot.slot} className="rounded-[18px] border border-[#E7E7E7] p-5">
                <p className="text-[11px] font-bold tracking-[0.14em] text-[#8A8A8A]">
                  {slot.slot.toUpperCase()}
                </p>
                <h3 className="mt-3 text-[17px] font-semibold text-[#202020]">
                  {slot.company}
                </h3>
                <p className="mt-2 text-[13.5px] text-[#6A6A6A]">{slot.until}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {advertisingPackages.map((item) => (
              <article key={item.name} className="rounded-[18px] border border-[#E7E7E7] p-5">
                <h3 className="text-[17px] font-semibold text-[#202020]">{item.name}</h3>
                <p className="mt-2 text-[14px] font-medium text-[#202020]">{item.price}</p>
                <p className="mt-3 text-[13.5px] leading-[1.7] text-[#6A6A6A]">
                  {item.holders}
                </p>
                <p className="mt-3 text-[13px] font-semibold text-[#B08A45]">
                  {item.availability}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-[22px] border border-[#E7E7E7] bg-white p-7 shadow-[0_10px_20px_-24px_rgba(20,20,20,0.24)]">
            <p className="text-[11.5px] font-bold tracking-[0.13em] text-[var(--ae-accent)]">
              STRIPE
            </p>
            <h2 className="mt-3 ae-serif text-[28px] leading-[1.08] tracking-[-0.02em] text-[#202020]">
              Recent payments
            </h2>
            <div className="mt-6 space-y-4">
              {stripePayments.map((payment) => (
                <div
                  key={`${payment.date}-${payment.customer}`}
                  className="flex items-start justify-between gap-4 border-b border-[#EFEFEF] pb-4 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="text-[15px] font-semibold text-[#202020]">
                      {payment.customer}
                    </p>
                    <p className="mt-1 text-[13.5px] text-[#6A6A6A]">
                      {payment.packageName} · {payment.date}
                    </p>
                  </div>
                  <span className="text-[15px] font-semibold text-[#202020]">
                    {payment.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-[#E7E7E7] bg-white p-7 shadow-[0_10px_20px_-24px_rgba(20,20,20,0.24)]">
            <p className="text-[11.5px] font-bold tracking-[0.13em] text-[var(--ae-accent)]">
              LEDGER
            </p>
            <h2 className="mt-3 ae-serif text-[28px] leading-[1.08] tracking-[-0.02em] text-[#202020]">
              Internal record
            </h2>
            <div className="mt-6 space-y-4">
              {ledgerEntries.map((entry) => (
                <div
                  key={`${entry.invoice}-${entry.date}`}
                  className="border-b border-[#EFEFEF] pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[15px] font-semibold text-[#202020]">
                        {entry.description}
                      </p>
                      <p className="mt-1 text-[13.5px] text-[#6A6A6A]">
                        {entry.date} · {entry.invoice}
                      </p>
                    </div>
                    <span className="text-[15px] font-semibold text-[#202020]">
                      {entry.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[22px] border border-[#E7E7E7] bg-white p-7 shadow-[0_10px_20px_-24px_rgba(20,20,20,0.24)]">
          <p className="text-[11.5px] font-bold tracking-[0.13em] text-[var(--ae-accent)]">
            VOLUME
          </p>
          <h2 className="mt-3 ae-serif text-[28px] leading-[1.08] tracking-[-0.02em] text-[#202020]">
            Submission and publish trend
          </h2>
          <div className="mt-8 grid grid-cols-6 gap-4 md:grid-cols-12">
            {monthlyVolume.map((entry) => (
              <div key={entry.month} className="flex flex-col items-center gap-3">
                <div className="flex h-[180px] items-end gap-[5px]">
                  <span
                    className="w-[10px] rounded-t-full bg-[#1E1E1E]"
                    style={{ height: `${(entry.submitted / maxVolume) * 100}%` }}
                  />
                  <span
                    className="w-[10px] rounded-t-full bg-[#B08A45]"
                    style={{ height: `${(entry.published / maxVolume) * 100}%` }}
                  />
                </div>
                <span className="text-[10.5px] font-bold tracking-[0.1em] text-[#8A8A8A]">
                  {entry.month}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-5 text-[13px] text-[#6A6A6A]">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#1E1E1E]" />
              Submitted
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#B08A45]" />
              Published
            </span>
          </div>
        </section>

        <section className="rounded-[22px] border border-[#E7E7E7] bg-white p-7 shadow-[0_10px_20px_-24px_rgba(20,20,20,0.24)]">
          <p className="text-[11.5px] font-bold tracking-[0.13em] text-[var(--ae-accent)]">
            SEO HEALTH
          </p>
          <h2 className="mt-3 ae-serif text-[28px] leading-[1.08] tracking-[-0.02em] text-[#202020]">
            Search and schema checks
          </h2>
          <div className="mt-6 space-y-4">
            {seoHealthItems.map((item) => (
              <article
                key={item.title}
                className="flex gap-4 rounded-[18px] border border-[#E7E7E7] p-4"
              >
                <span
                  className={`mt-1 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full text-[14px] font-bold ${
                    item.status === "ok"
                      ? "bg-[#1E1E1E] text-white"
                      : "bg-[#F1EEE8] text-[#B08A45]"
                  }`}
                >
                  {item.status === "ok" ? "✓" : "!"}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#202020]">{item.title}</h3>
                  <p className="mt-1 text-[13.5px] leading-[1.7] text-[#6A6A6A]">
                    {item.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
