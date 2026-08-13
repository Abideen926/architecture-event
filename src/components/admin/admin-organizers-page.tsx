"use client";

import { useState } from "react";
import { adminOrganizerRows } from "@/lib/admin/dashboard-data";

type Organizer = {
  organization: string;
  contact: string;
  email: string;
  listings: string;
  joined: string;
  featured: boolean;
  active: boolean;
};

export function AdminOrganizersPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [organizers, setOrganizers] = useState<Organizer[]>(
    adminOrganizerRows.map((row) => ({ ...row }))
  );
  const [formData, setFormData] = useState({
    contactName: "",
    organization: "",
    email: "",
    temporaryPassword: "",
  });

  function updateField(field: keyof typeof formData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setFormData({
      contactName: "",
      organization: "",
      email: "",
      temporaryPassword: "",
    });
  }

  function createOrganizer() {
    if (
      !formData.contactName.trim() ||
      !formData.organization.trim() ||
      !formData.email.trim() ||
      !formData.temporaryPassword.trim()
    ) {
      return;
    }

    setOrganizers((current) => [
      {
        organization: formData.organization.trim(),
        contact: formData.contactName.trim(),
        email: formData.email.trim(),
        listings: "0",
        joined: "Aug 2026",
        featured: false,
        active: true,
      },
      ...current,
    ]);

    resetForm();
    setFormOpen(false);
  }

  function toggleFeatured(organization: string) {
    setOrganizers((current) =>
      current.map((row) =>
        row.organization === organization ? { ...row, featured: !row.featured } : row
      )
    );
  }

  function toggleActive(organization: string) {
    setOrganizers((current) =>
      current.map((row) =>
        row.organization === organization ? { ...row, active: !row.active } : row
      )
    );
  }

  return (
    <div className="animate-[fadeIn_.35s_ease_both] space-y-0">
      <div className="flex flex-col gap-5 border-b border-[#E7E7E7] pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="ae-serif text-[30px] font-semibold leading-[1.08] tracking-[-0.015em] text-[#202020]">
            Organizers
          </h2>
          <p className="mt-2 text-[14.5px] text-[#6A6A6A]">64 accounts · 61 active</p>
        </div>

        <button
          type="button"
          onClick={() => setFormOpen(true)}
          className="rounded-[12px] bg-[#1E1E1E] px-6 py-[14px] text-[14.5px] font-semibold text-white transition-colors hover:bg-black"
        >
          Create Organizer
        </button>
      </div>

      {formOpen ? (
        <section className="mt-6 rounded-[20px] border border-[#E7E7E7] bg-white px-[32px] py-[32px]">
          <h3 className="ae-serif text-[22px] font-semibold leading-[1.1] tracking-[-0.01em] text-[#202020]">
            New organizer account
          </h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              ["Contact name", "contactName", "text"],
              ["Organization", "organization", "text"],
              ["Email", "email", "email"],
              ["Temporary password", "temporaryPassword", "text"],
            ].map(([label, key, type]) => (
              <label key={key} className="block">
                <span className="mb-2 block text-[13.5px] font-semibold text-[#303030]">
                  {label}
                </span>
                <input
                  type={type}
                  value={formData[key as keyof typeof formData]}
                  onChange={(event) => updateField(key as keyof typeof formData, event.target.value)}
                  className="h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] text-[#202020] outline-none"
                />
              </label>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={createOrganizer}
              className="rounded-[9px] bg-[#1E1E1E] px-5 py-2 text-[13.5px] font-semibold text-white"
            >
              Create account
            </button>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setFormOpen(false);
              }}
              className="rounded-[9px] border border-[#1E1E1E] bg-white px-5 py-2 text-[13.5px] font-medium text-[#1E1E1E]"
            >
              Cancel
            </button>
          </div>
        </section>
      ) : null}

      <section className="mt-6 overflow-hidden rounded-[20px] border border-[#E7E7E7] bg-white">
        <div className="grid grid-cols-[1.6fr_1.4fr_0.6fr_0.9fr_auto] gap-[22px] border-b border-[#E7E7E7] bg-[#FAFAFA] px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
          <span>ORGANIZATION</span>
          <span>EMAIL</span>
          <span>LISTINGS</span>
          <span>JOINED</span>
          <span className="text-right">ACTIONS</span>
        </div>

        {organizers.map((row) => (
          <div
            key={`${row.organization}-${row.email}`}
            className="grid grid-cols-[1.6fr_1.4fr_0.6fr_0.9fr_auto] items-center gap-[22px] border-t border-[#F1F1F1] px-[26px] py-[18px]"
          >
            <div>
              <p className="text-[15px] font-semibold text-[#202020]">{row.organization}</p>
              <p className="mt-1 text-[13px] text-[#6A6A6A]">{row.contact}</p>
            </div>
            <div className="text-[13.5px] text-[#3A3A3A]">{row.email}</div>
            <div className="text-[13.5px] text-[#3A3A3A]">{row.listings}</div>
            <div className="text-[13.5px] text-[#6A6A6A]">{row.joined}</div>
            <div className="flex justify-end gap-4 text-[13px]">
              <button
                type="button"
                onClick={() => toggleFeatured(row.organization)}
                className={`transition-colors ${
                  row.featured ? "font-medium text-[var(--ae-accent)]" : "text-[#6A6A6A]"
                }`}
              >
                {row.featured ? "Featured placement ✓" : "Assign featured"}
              </button>
              <button
                type="button"
                onClick={() => toggleActive(row.organization)}
                className="text-[#4E4E4E]"
              >
                {row.active ? "Deactivate" : "Reactivate"}
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
