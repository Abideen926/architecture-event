"use client";

import Link from "next/link";
import {
  adminAttentionItems,
  adminOverviewStats,
} from "@/lib/admin/dashboard-data";

export function AdminOverviewPage() {
  return (
    <div className="animate-[fadeIn_.35s_ease_both] space-y-0">
      <section className="border-b border-[#E7E7E7] pb-5">
        <h2 className="ae-serif text-[30px] font-semibold leading-[1.08] tracking-[-0.015em] text-[#202020]">
          Overview
        </h2>
        <p className="mt-2 text-[14.5px] text-[#6A6A6A]">Friday, July 31, 2026</p>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {adminOverviewStats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[20px] border border-[#E7E7E7] bg-white px-[26px] py-[26px]"
          >
            <p className="text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
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

            {"rows" in stat ? (
              <div className="mt-4 border-t border-[#E7E7E7] pt-4">
                <div className="space-y-2.5">
                  {stat.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-3 text-[13.5px] text-[#6A6A6A]"
                    >
                      <span>{row.label}</span>
                      <span className="font-semibold text-[#202020]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4 border-t border-[#E7E7E7] pt-4">
                <p className="text-[13.5px] text-[#6A6A6A]">{stat.detail}</p>
              </div>
            )}
          </article>
        ))}
      </section>

      <section className="mt-7 overflow-hidden rounded-[20px] border border-[#E7E7E7] bg-white">
        <div className="flex items-center justify-between gap-4 border-b border-[#E7E7E7] px-[26px] py-5">
          <h2 className="ae-serif text-[22px] font-semibold leading-[1.08] tracking-[-0.01em] text-[#202020]">
            Needs your attention
          </h2>
          <p className="text-[13.5px] text-[#6A6A6A]">{adminAttentionItems.length} items</p>
        </div>

        <div>
          {adminAttentionItems.map((item, index) => (
            <article
              key={item.title}
              className={`flex items-center gap-4 px-[26px] py-5 ${
                index < adminAttentionItems.length - 1 ? "border-b border-[#F1F1F1]" : ""
              }`}
            >
              <span
                className={`mt-1 h-2 w-2 flex-none rounded-full ${
                  item.tone === "accent" ? "bg-[var(--ae-accent)]" : "bg-[#6A6A6A]"
                }`}
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-[15.5px] font-semibold text-[#202020]">{item.title}</h3>
                <p className="text-[13.5px] leading-[1.6] text-[#6A6A6A]">{item.meta}</p>
              </div>
              <Link
                href={item.href}
                className="text-[13.5px] font-semibold whitespace-nowrap !text-[var(--ae-accent)] transition-colors hover:text-[var(--ae-accent-strong)]"
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
