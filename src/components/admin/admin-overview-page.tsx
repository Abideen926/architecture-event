"use client";

import Link from "next/link";
import {
  adminAttentionItems,
  adminOverviewStats,
} from "@/lib/admin/dashboard-data";

export function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3 border-b border-[#E7E7E7] pb-6">
        <h2 className="ae-serif text-[30px] leading-[1.08] tracking-[-0.02em] text-[#202020]">
          Overview
        </h2>
        <p className="text-[14.5px] text-[#7A7A7A]">Friday, July 31, 2026</p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {adminOverviewStats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[18px] border border-[#E3E0DA] bg-white px-5 py-5"
          >
            <p className="text-[11px] font-bold tracking-[0.16em] text-[#7E7E7E]">
              {stat.label.toUpperCase()}
            </p>
            <p
              className={`mt-4 ae-serif text-[40px] leading-none tracking-[-0.03em] ${
                "accent" in stat && stat.accent
                  ? "text-[var(--ae-accent)]"
                  : "text-[#202020]"
              }`}
            >
              {stat.value}
            </p>

            {"rows" in stat && stat.rows ? (
              <div className="mt-4 border-t border-[#ECE8E0] pt-4">
                <div className="space-y-2.5">
                  {stat.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-3 text-[13.5px] text-[#6A6A6A]"
                    >
                      <span>{row.label}</span>
                      <span className="font-semibold text-[#202020]">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4 border-t border-[#ECE8E0] pt-4">
                {/* FIX: Cast to any to allow access to 'detail' which exists on the alternate card type */}
                <p className="text-[13.5px] text-[#6A6A6A]">
                  {(stat as any).detail}
                </p>
              </div>
            )}
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-[22px] border border-[#E3E0DA] bg-white">
        <div className="flex items-center justify-between gap-4 border-b border-[#EAE6DE] px-6 py-5">
          <h2 className="ae-serif text-[24px] leading-[1.08] tracking-[-0.02em] text-[#202020]">
            Needs your attention
          </h2>
          <p className="text-[13.5px] text-[#7A7A7A]">
            {adminAttentionItems.length} items
          </p>
        </div>

        <div>
          {adminAttentionItems.map((item, index) => (
            <article
              key={item.title}
              className={`flex items-center gap-4 px-6 py-5 ${
                index < adminAttentionItems.length - 1
                  ? "border-b border-[#EFEAE2]"
                  : ""
              }`}
            >
              <span
                className={`mt-1 h-2.5 w-2.5 flex-none rounded-full ${
                  item.tone === "accent"
                    ? "bg-[var(--ae-accent)]"
                    : "bg-[#727272]"
                }`}
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-semibold text-[#202020]">
                  {item.title}
                </h3>
                <p className="text-[13.5px] leading-[1.6] text-[#7A7A7A]">
                  {item.meta}
                </p>
              </div>
              <Link
                href={item.href}
                className="text-right text-[13.5px] font-medium !text-[var(--ae-accent)] transition-colors hover:text-[var(--ae-accent-strong)]"
              >
                {item.actionLabel} →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
