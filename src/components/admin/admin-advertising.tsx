"use client";

import { useState } from "react";
import {
  advertisingPackages,
  ledgerEntries as initialLedgerEntries,
  spotlightSlots as initialSpotlightSlots,
  stripePayments,
} from "@/lib/admin/dashboard-data";
import { Heading } from "@/components/ui/heading";

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
    initialSpotlightSlots.map((slot) => ({ ...slot })),
  );
  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>(
    initialLedgerEntries.map((entry) => ({ ...entry })),
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
          : slot,
      ),
    );
  }

  return (
    <div className="animate-[fadeIn_.35s_ease_both] space-y-5">
      <div className="border-b border-ae-border pb-5">
        <Heading level="page">Advertising</Heading>
        <p className="mt-2 text-[14.5px] text-ae-muted">
          Sponsorship placements, package holders, and the internal ledger.
        </p>
      </div>

      <div className="rounded-[14px] border border-dashed border-ae-border bg-mainbackground px-5 py-3 text-[13px] leading-[1.6] text-ae-muted">
        There&apos;s no advertising/sponsorship model in the API yet — this page
        shows sample data and isn&apos;t connected to the backend.
      </div>

      <section className="overflow-hidden rounded-[20px] border border-ae-border bg-white">
        <div className="px-[26px] py-5">
          <Heading level="card" as="h3">
            Advertising packages
          </Heading>
        </div>
        <div className="grid grid-cols-[1.2fr_0.8fr_1.15fr_0.8fr] gap-[22px] border-y border-ae-border bg-mainbackground px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-ae-muted">
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
            <div className="text-[15px] font-semibold text-foreground">
              {item.name}
            </div>
            <div className="text-[14px] text-[#3A3A3A]">{item.price}</div>
            <div className="text-[14.5px] leading-[1.55] text-[#3A3A3A]">
              {item.holders}
            </div>
            <div
              className={`text-[14px] font-semibold ${
                item.availability.includes("remaining")
                  ? "text-ae-accent"
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
