import {
  adminLeadVolume,
  monthlyVolume,
  seoHealthItems,
} from "@/lib/admin/dashboard-data";

export function AdminReportsPage() {
  const maxVolume = Math.max(...monthlyVolume.map((entry) => entry.submitted), 1);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-5 border-b border-[#E8E3DB] pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="ae-serif text-[31px] leading-[1.08] tracking-[-0.02em] text-[#202020]">
            Reports
          </h2>
          <p className="mt-3 text-[14.5px] text-[#7A7A7A]">
            Last 12 months, through July 2026.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex py-2 items-center justify-center rounded-[10px] border border-[#232323] bg-white px-4 text-[13px] font-medium text-[#232323]"
        >
          Export Data (CSV)
        </button>
      </div>

      <section className="rounded-[20px] border border-[#E3DED6] bg-white px-6 py-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="ae-serif text-[22px] leading-[1.1] tracking-[-0.02em] text-[#202020]">
            Event volume
          </h3>

          <div className="flex flex-wrap gap-4 text-[12.5px] text-[#7A7A7A]">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-[2px] bg-[#232323]" />
              Submitted
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-[2px] bg-[var(--ae-accent)]" />
              Published
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-6 gap-4 md:grid-cols-12">
          {monthlyVolume.map((entry) => (
            <div key={entry.month} className="flex flex-col items-center gap-3">
              <div className="flex h-[140px] items-end gap-[5px]">
                <span
                  className="w-[22px] rounded-t-[3px] bg-[#232323]"
                  style={{ height: `${(entry.submitted / maxVolume) * 100}%` }}
                />
                <span
                  className="w-[22px] rounded-t-[3px] bg-[var(--ae-accent)]"
                  style={{ height: `${(entry.published / maxVolume) * 100}%` }}
                />
              </div>
              <span className="text-[10.5px] font-bold tracking-[0.12em] text-[#7A7A7A]">
                {entry.month}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[20px] border border-[#E3DED6] bg-white px-6 py-6">
          <h3 className="ae-serif text-[22px] leading-[1.1] tracking-[-0.02em] text-[#202020]">
            Lead volume
          </h3>
          <p className="mt-3 text-[14px] leading-[1.75] text-[#6A6A6A]">
            Leads captured through saves and registration opt-ins.
          </p>

          <p className="mt-6 ae-serif text-[50px] leading-none tracking-[-0.03em] text-[#202020]">
            {adminLeadVolume.total}
          </p>
          <p className="mt-2 text-[13px] text-[#7A7A7A]">{adminLeadVolume.detail}</p>

          <div className="mt-6 space-y-5">
            {adminLeadVolume.rows.map((row) => (
              <div key={row.label}>
                <div className="mb-2 flex items-center justify-between gap-3 text-[13.5px] text-[#4E4E4E]">
                  <span>{row.label}</span>
                  <span className="font-medium">{row.value}</span>
                </div>
                <div className="h-[6px] rounded-full bg-[#F1EEE8]">
                  <div
                    className={`h-[6px] rounded-full ${
                      row.tone === "dark" ? "bg-[#232323]" : "bg-[var(--ae-accent)]"
                    }`}
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[20px] border border-[#E3DED6] bg-white px-6 py-6">
          <h3 className="ae-serif text-[22px] leading-[1.1] tracking-[-0.02em] text-[#202020]">
            SEO monitoring
          </h3>

          <div className="mt-5 divide-y divide-[#EAE6DE]">
            {seoHealthItems.map((item) => (
              <article key={item.title} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                <span
                  className={`mt-1 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full text-[10px] font-bold ${
                    item.status === "ok"
                      ? "bg-[#232323] text-white"
                      : "bg-[#F1EEE8] text-[var(--ae-accent)]"
                  }`}
                >
                  {item.status === "ok" ? "✓" : "!"}
                </span>
                <div>
                  <h4 className="text-[15px] font-semibold text-[#202020]">{item.title}</h4>
                  <p className="mt-1 text-[13px] leading-[1.7] text-[#7A7A7A]">
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
