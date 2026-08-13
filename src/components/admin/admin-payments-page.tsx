"use client";

import { useState } from "react";
import {
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

export function AdminPaymentsPage() {
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
          Payments
        </h2>
        <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
          Sponsorship placements, package holders, and the internal ledger.
        </p>
      </div>

      <section className="rounded-[20px] border border-[#E7E7E7] bg-white px-[26px] py-[26px]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="ae-serif text-[22px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#202020]">
              Brand Spotlight rotation
            </h3>
            <p className="mt-3 text-[14px] leading-[1.75] text-[#6A6A6A]">
              Three companies appear on the homepage at a time.
            </p>
          </div>
          <p className="pt-4 text-[12.5px] text-[#6A6A6A]">Rotates monthly</p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {spotlightSlots.map((slot) => (
            <article key={slot.slot} className="rounded-[16px] border border-[#E7E7E7] px-5 py-5">
              <p className="text-[10px] font-bold tracking-[0.15em] text-[#6A6A6A]">
                {slot.slot.toUpperCase()}
              </p>
              <h4 className="mt-3 text-[15px] font-semibold text-[#202020]">{slot.company}</h4>
              <p className="mt-2 text-[13px] text-[#6A6A6A]">{slot.until}</p>
              <button
                type="button"
                onClick={() => swapSlot(slot.slot)}
                className="mt-4 rounded-[10px] border border-[#1E1E1E] bg-white px-4 py-1.5 text-[13px] font-medium text-[#1E1E1E]"
              >
                Swap out
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[20px] border border-[#E7E7E7] bg-white">
        <div className="flex items-start justify-between gap-4 px-[26px] py-5">
          <div>
            <h3 className="ae-serif text-[22px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#202020]">
              Recent Stripe transactions
            </h3>
            <p className="mt-3 text-[14px] leading-[1.75] text-[#6A6A6A]">
              Read-only view of transaction data.
            </p>
          </div>
          <span className="inline-flex h-[27px] items-center rounded-full border border-[#E7E7E7] bg-[#FAFAFA] px-3 text-[10.5px] font-bold tracking-[0.11em] text-[#6A6A6A]">
            SYNCED 09:12
          </span>
        </div>

        <div className="grid grid-cols-[1fr_0.9fr_1.5fr_1.5fr] gap-[22px] border-y border-[#E7E7E7] bg-[#FAFAFA] px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
          <span>DATE</span>
          <span>AMOUNT</span>
          <span>PACKAGE</span>
          <span>CUSTOMER</span>
        </div>
        {stripePayments.map((payment, index) => (
          <div
            key={`${payment.date}-${payment.customer}`}
            className={`grid grid-cols-[1fr_0.9fr_1.5fr_1.5fr] gap-[22px] px-[26px] py-[18px] ${
              index < stripePayments.length - 1 ? "border-b border-[#F1F1F1]" : ""
            }`}
          >
            <div className="text-[14px] text-[#6A6A6A]">{payment.date}</div>
            <div className="text-[15px] font-semibold text-[#202020]">{payment.amount}</div>
            <div className="text-[14.5px] text-[#3A3A3A]">{payment.packageName}</div>
            <div className="text-[14.5px] text-[#3A3A3A]">{payment.customer}</div>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-[20px] border border-[#E7E7E7] bg-white">
        <div className="flex items-start justify-between gap-4 px-[26px] py-5">
          <div>
            <h3 className="ae-serif text-[22px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#202020]">
              Internal ledger
            </h3>
            <p className="mt-3 text-[14px] leading-[1.75] text-[#6A6A6A]">
              Manually recorded payments received and spent.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setLedgerFormOpen((current) => !current)}
            className="rounded-[10px] border border-[#1E1E1E] bg-white px-4 py-1.5 text-[13px] font-medium text-[#1E1E1E]"
          >
            {ledgerFormOpen ? "Close entry" : "Record entry"}
          </button>
        </div>

        {ledgerFormOpen ? (
          <div className="border-t border-[#E7E7E7] px-[26px] py-5">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Date", "date", "mm/dd/yyyy"],
                ["Amount", "amount", "$0.00"],
                ["Description", "description", ""],
                ["Invoice number", "invoice", ""],
              ].map(([label, field, placeholder]) => (
                <label key={field} className="block">
                  <span className="mb-2 block text-[12.5px] font-medium text-[#303030]">
                    {label}
                  </span>
                  <input
                    type="text"
                    value={ledgerForm[field as keyof typeof ledgerForm]}
                    onChange={(event) =>
                      updateLedgerField(field as keyof typeof ledgerForm, event.target.value)
                    }
                    placeholder={placeholder}
                    className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[14px] text-[#202020] outline-none"
                  />
                </label>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={recordEntry}
                className="rounded-[10px] bg-[#1E1E1E] px-4 py-1.5 text-[13px] font-semibold text-white"
              >
                Save entry
              </button>
              <button
                type="button"
                className="rounded-[10px] border border-[#1E1E1E] bg-white px-4 py-1.5 text-[13px] font-medium text-[#1E1E1E]"
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

        <div className="grid grid-cols-[1fr_2.2fr_0.9fr_0.9fr_0.9fr] gap-[22px] border-y border-[#E7E7E7] bg-[#FAFAFA] px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
          <span>DATE</span>
          <span>DESCRIPTION</span>
          <span>AMOUNT</span>
          <span>INVOICE</span>
          <span className="text-right">RECEIPT</span>
        </div>
        {ledgerEntries.map((entry, index) => (
          <div
            key={`${entry.invoice}-${entry.date}-${index}`}
            className={`grid grid-cols-[1fr_2.2fr_0.9fr_0.9fr_0.9fr] gap-[22px] px-[26px] py-[18px] ${
              index < ledgerEntries.length - 1 ? "border-b border-[#F1F1F1]" : ""
            }`}
          >
            <div className="text-[14px] text-[#6A6A6A]">{entry.date}</div>
            <div className="text-[14px] text-[#3A3A3A]">{entry.description}</div>
            <div className="text-[15px] font-semibold text-[#202020]">{entry.amount}</div>
            <div className="text-[14px] text-[#6A6A6A]">{entry.invoice}</div>
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
