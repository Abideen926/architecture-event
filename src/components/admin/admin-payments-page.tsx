"use client";

import { useState } from "react";
import {
  advertisingPackages,
  ledgerEntries as initialLedgerEntries,
  spotlightSlots as initialSpotlightSlots,
  stripePayments,
} from "@/lib/admin/dashboard-data";

// FIX: Explicitly define interfaces to prevent TS from narrowing types to specific mock strings
interface SpotlightSlot {
  slot: string;
  company: string;
  until: string;
}

interface LedgerEntry {
  date: string;
  description: string;
  amount: string;
  invoice: string;
}

export function AdminPaymentsPage() {
  // FIX: Use the interfaces in the generic state declaration
  const [spotlightSlots, setSpotlightSlots] = useState<SpotlightSlot[]>(
    initialSpotlightSlots.map((s) => ({ ...s }))
  );

  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>(
    initialLedgerEntries.map((e) => ({ ...e }))
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
    <div className="space-y-5">
      <div className="border-b border-[#E8E3DB] pb-5">
        <h2 className="ae-serif text-[31px] leading-[1.08] tracking-[-0.02em] text-[#202020]">
          Payments & Advertising
        </h2>
        <p className="mt-3 text-[14.5px] text-[#7A7A7A]">
          Sponsorship placements, package holders, and the internal ledger.
        </p>
      </div>

      <section className="rounded-[20px] border border-[#E3DED6] bg-white px-6 py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="ae-serif text-[22px] leading-[1.1] tracking-[-0.02em] text-[#202020]">
              Brand Spotlight rotation
            </h3>
            <p className="mt-3 text-[14px] leading-[1.75] text-[#6A6A6A]">
              Three companies appear on the homepage at a time.
            </p>
          </div>
          <p className="pt-4 text-[12.5px] text-[#7A7A7A]">Rotates monthly</p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {spotlightSlots.map((slot) => (
            <article
              key={slot.slot}
              className="rounded-[16px] border border-[#E3DED6] px-5 py-5"
            >
              <p className="text-[10px] font-bold tracking-[0.15em] text-[#8A8A8A]">
                {slot.slot.toUpperCase()}
              </p>
              <h4 className="mt-3 text-[15px] font-semibold text-[#202020]">
                {slot.company}
              </h4>
              <p className="mt-2 text-[13px] text-[#7A7A7A]">{slot.until}</p>
              <button
                type="button"
                onClick={() => swapSlot(slot.slot)}
                className="mt-4 inline-flex py-1.5 items-center justify-center rounded-[10px] border border-[#232323] bg-white px-4 text-[13px] font-medium text-[#232323]"
              >
                Swap out
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[20px] border border-[#E3DED6] bg-white">
        <div className="px-6 py-5">
          <h3 className="ae-serif text-[22px] leading-[1.1] tracking-[-0.02em] text-[#202020]">
            Advertising packages
          </h3>
        </div>
        <div className="grid grid-cols-[1.2fr_0.8fr_1.15fr_0.8fr] gap-4 border-y border-[#EAE6DE] px-5 py-4 text-[10.5px] font-bold tracking-[0.15em] text-[#848484]">
          <span>PACKAGE</span>
          <span>PRICE</span>
          <span>CURRENT HOLDERS</span>
          <span>AVAILABILITY</span>
        </div>
        {advertisingPackages.map((item, index) => (
          <div
            key={item.name}
            className={`grid grid-cols-[1.2fr_0.8fr_1.15fr_0.8fr] gap-4 px-5 py-[15px] ${
              index < advertisingPackages.length - 1
                ? "border-b border-[#EEE8E0]"
                : ""
            }`}
          >
            <div className="text-[15px] font-semibold text-[#202020]">
              {item.name}
            </div>
            <div className="text-[14px] text-[#666666]">{item.price}</div>
            <div className="text-[14px] leading-[1.55] text-[#666666]">
              {item.holders}
            </div>
            <div
              className={`text-[14px] ${
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

      <section className="overflow-hidden rounded-[20px] border border-[#E3DED6] bg-white">
        <div className="flex items-start justify-between gap-4 px-6 py-5">
          <div>
            <h3 className="ae-serif text-[22px] leading-[1.1] tracking-[-0.02em] text-[#202020]">
              Recent Stripe transactions
            </h3>
            <p className="mt-3 text-[14px] leading-[1.75] text-[#6A6A6A]">
              Read-only view of transaction data.
            </p>
          </div>
          <span className="inline-flex h-[27px] items-center rounded-full border border-[#DED9D1] bg-white px-3 text-[10.5px] font-bold tracking-[0.14em] text-[#7A7A7A]">
            SYNCED 09:12
          </span>
        </div>

        <div className="grid grid-cols-[1fr_0.9fr_1.5fr_1.5fr] gap-4 border-y border-[#EAE6DE] px-5 py-4 text-[10.5px] font-bold tracking-[0.15em] text-[#848484]">
          <span>DATE</span>
          <span>AMOUNT</span>
          <span>PACKAGE</span>
          <span>CUSTOMER</span>
        </div>
        {stripePayments.map((payment, index) => (
          <div
            key={`${payment.date}-${payment.customer}`}
            className={`grid grid-cols-[1fr_0.9fr_1.5fr_1.5fr] gap-4 px-5 py-[15px] ${
              index < stripePayments.length - 1
                ? "border-b border-[#EEE8E0]"
                : ""
            }`}
          >
            <div className="text-[14px] text-[#7A7A7A]">{payment.date}</div>
            <div className="text-[15px] font-semibold text-[#202020]">
              {payment.amount}
            </div>
            <div className="text-[14px] text-[#666666]">
              {payment.packageName}
            </div>
            <div className="text-[14px] text-[#666666]">{payment.customer}</div>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-[20px] border border-[#E3DED6] bg-white">
        <div className="flex items-start justify-between gap-4 px-6 py-5">
          <div>
            <h3 className="ae-serif text-[22px] leading-[1.1] tracking-[-0.02em] text-[#202020]">
              Internal ledger
            </h3>
            <p className="mt-3 text-[14px] leading-[1.75] text-[#6A6A6A]">
              Manually recorded payments received and spent.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setLedgerFormOpen((current) => !current)}
            className="inline-flex py-1.5 items-center justify-center rounded-[10px] border border-[#232323] bg-white px-4 text-[13px] font-medium text-[#232323]"
          >
            {ledgerFormOpen ? "Close entry" : "Record entry"}
          </button>
        </div>

        {ledgerFormOpen ? (
          <div className="border-t border-[#EAE6DE] px-5 py-5">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[12.5px] font-medium text-[#303030]">
                  Date
                </span>
                <input
                  type="text"
                  value={ledgerForm.date}
                  onChange={(event) =>
                    updateLedgerField("date", event.target.value)
                  }
                  placeholder="mm/dd/yyyy"
                  className={fieldClassName}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-[12.5px] font-medium text-[#303030]">
                  Amount
                </span>
                <input
                  type="text"
                  value={ledgerForm.amount}
                  onChange={(event) =>
                    updateLedgerField("amount", event.target.value)
                  }
                  placeholder="$0.00"
                  className={fieldClassName}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-[12.5px] font-medium text-[#303030]">
                  Description
                </span>
                <input
                  type="text"
                  value={ledgerForm.description}
                  onChange={(event) =>
                    updateLedgerField("description", event.target.value)
                  }
                  className={fieldClassName}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-[12.5px] font-medium text-[#303030]">
                  Invoice number
                </span>
                <input
                  type="text"
                  value={ledgerForm.invoice}
                  onChange={(event) =>
                    updateLedgerField("invoice", event.target.value)
                  }
                  className={fieldClassName}
                />
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={recordEntry}
                className="inline-flex py-1.5 items-center justify-center rounded-[10px] bg-[#232323] px-4 text-[13px] font-semibold text-white"
              >
                Save entry
              </button>
              <button
                type="button"
                className="inline-flex py-1.5 items-center justify-center rounded-[10px] border border-[#232323] bg-white px-4 text-[13px] font-medium text-[#232323]"
              >
                Attach receipt
              </button>
              <button
                type="button"
                onClick={() => {
                  setLedgerForm({
                    date: "",
                    amount: "",
                    description: "",
                    invoice: "",
                  });
                  setLedgerFormOpen(false);
                }}
                className="text-[13px] text-[#5F5F5F]"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-[1fr_2.2fr_0.9fr_0.9fr_0.9fr] gap-4 border-y border-[#EAE6DE] px-5 py-4 text-[10.5px] font-bold tracking-[0.15em] text-[#848484]">
          <span>DATE</span>
          <span>DESCRIPTION</span>
          <span>AMOUNT</span>
          <span>INVOICE</span>
          <span className="text-right">RECEIPT</span>
        </div>
        {ledgerEntries.map((entry, index) => (
          <div
            key={`${entry.invoice}-${entry.date}-${index}`}
            className={`grid grid-cols-[1fr_2.2fr_0.9fr_0.9fr_0.9fr] gap-4 px-5 py-[15px] ${
              index < ledgerEntries.length - 1
                ? "border-b border-[#EEE8E0]"
                : ""
            }`}
          >
            <div className="text-[14px] text-[#7A7A7A]">{entry.date}</div>
            <div className="text-[14px] text-[#666666]">
              {entry.description}
            </div>
            <div className="text-[15px] font-semibold text-[#202020]">
              {entry.amount}
            </div>
            <div className="text-[14px] text-[#7A7A7A]">{entry.invoice}</div>
            <button
              type="button"
              className="text-right text-[13px] text-[var(--ae-accent)]"
            >
              View receipt
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

const fieldClassName =
  "py-1.5 w-full rounded-[10px] border border-[#DDD8D0] px-4 text-[14px] text-[#202020] outline-none";
