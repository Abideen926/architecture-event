"use client";

import { useState } from "react";
import {
  advertisingPackages,
  ledgerEntries as initialLedgerEntries,
  spotlightSlots as initialSpotlightSlots,
  stripePayments,
} from "@/lib/admin/dashboard-data";

type SpotlightSlot = {
  slot: string;
  company: string;
  until: string;
};

type LedgerEntry = {
  date: string;
  description: string;
  amount: string;
  invoice: string;
};

export function AdminAdvertising() {
  const [spotlightSlots, setSpotlightSlots] = useState<SpotlightSlot[]>(
    initialSpotlightSlots.map((slot) => ({ ...slot }))
  );
  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>(
    initialLedgerEntries.map((entry) => ({ ...entry }))
  );
  const [ledgerFormOpen, setLedgerFormOpen] = useState(false);
  const [ledgerForm, setLedgerForm] = useState({
    date: "",
    amount: "",
    description: "",
    invoice: "",
  });

  function updateLedgerField(field: keyof typeof ledgerForm, value: string) {
    setLedgerForm((current) => ({ ...current, [field]: value }));
  }

  function recordEntry() {
    if (
      !ledgerForm.date.trim() ||
      !ledgerForm.amount.trim() ||
      !ledgerForm.description.trim() ||
      !ledgerForm.invoice.trim()
    ) {
      return;
    }

    setLedgerEntries((current) => [
      {
        date: ledgerForm.date,
        description: ledgerForm.description,
        amount: ledgerForm.amount,
        invoice: ledgerForm.invoice,
      },
      ...current,
    ]);

    setLedgerForm({
      date: "",
      amount: "",
      description: "",
      invoice: "",
    });
    setLedgerFormOpen(false);
  }

  function swapSlot(slotName: string) {
    setSpotlightSlots((current) =>
      current.map((slot) =>
        slot.slot === slotName
          ? { ...slot, company: "New Company", until: "Pending assignment" }
          : slot
      )
    );
  }

  return (
    <div className="animate-[fadeIn_.35s_ease_both] space-y-5">
      <div className="border-b border-[#E7E7E7] pb-5">
        <h2 className="ae-serif text-[30px] font-semibold leading-[1.08] tracking-[-0.015em] text-[#202020]">
          Advertising
        </h2>
        <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
          Sponsorship placements, package holders, and the internal ledger.
        </p>
      </div>

      <div className="rounded-[14px] border border-dashed border-[#E7E7E7] bg-[#FAFAFA] px-5 py-3 text-[13px] leading-[1.6] text-[#6A6A6A]">
        There&apos;s no advertising/sponsorship model in the API yet — this page shows sample
        data and isn&apos;t connected to the backend.
      </div>

      <section className="overflow-hidden rounded-[20px] border border-[#E7E7E7] bg-white">
        <div className="px-[26px] py-5">
          <h3 className="ae-serif text-[22px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#202020]">
            Advertising packages
          </h3>
        </div>
        <div className="grid grid-cols-[1.2fr_0.8fr_1.15fr_0.8fr] gap-[22px] border-y border-[#E7E7E7] bg-[#FAFAFA] px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
          <span>PACKAGE</span>
          <span>PRICE</span>
          <span>CURRENT HOLDERS</span>
          <span>AVAILABILITY</span>
        </div>
        {advertisingPackages.map((item, index) => (
          <div
            key={item.name}
            className={`grid grid-cols-[1.2fr_0.8fr_1.15fr_0.8fr] gap-[22px] px-[26px] py-[18px] ${
              index < advertisingPackages.length - 1
                ? "border-b border-[#F1F1F1]"
                : ""
            }`}
          >
            <div className="text-[15px] font-semibold text-[#202020]">
              {item.name}
            </div>
            <div className="text-[14px] text-[#3A3A3A]">{item.price}</div>
            <div className="text-[14.5px] leading-[1.55] text-[#3A3A3A]">
              {item.holders}
            </div>
            <div
              className={`text-[14px] font-semibold ${
                item.availability.includes("remaining")
                  ? "text-[var(--ae-accent)]"
                  : "text-[#4F4F4F]"
              }`}
            >
              {item.availability}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
