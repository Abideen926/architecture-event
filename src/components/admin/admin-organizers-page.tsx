"use client";

import { useState } from "react";
import { adminOrganizerRows } from "@/lib/admin/dashboard-data";

type OrganizerRow = (typeof adminOrganizerRows)[number];

export function AdminOrganizersPage() {
  const [formOpen, setFormOpen] = useState(true);
  const [organizers, setOrganizers] =
    useState<Array<OrganizerRow>>([...adminOrganizerRows]);
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
        row.organization === organization
          ? { ...row, featured: !row.featured }
          : row
      )
    );
  }

  function toggleActive(organization: string) {
    setOrganizers((current) =>
      current.map((row) =>
        row.organization === organization
          ? { ...row, active: !row.active }
          : row
      )
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 border-b border-[#E8E3DB] pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="ae-serif text-[31px] leading-[1.08] tracking-[-0.02em] text-[#202020]">
            Organizers
          </h2>
          <p className="mt-3 text-[14.5px] text-[#7A7A7A]">64 accounts · 61 active</p>
        </div>

        <button
          type="button"
          onClick={() => setFormOpen(true)}
          className="inline-flex py-2 items-center justify-center rounded-[11px] bg-[#232323] px-[18px] text-[14px] font-semibold text-white"
        >
          Create Organizer
        </button>
      </div>

      {formOpen ? (
        <section className="rounded-[20px] border border-[#E3DED6] bg-white px-6 py-6">
          <h3 className="ae-serif text-[23px] leading-[1.1] tracking-[-0.02em] text-[#202020]">
            New organizer account
          </h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-[#303030]">
                Contact name
              </span>
              <input
                type="text"
                value={formData.contactName}
                onChange={(event) => updateField("contactName", event.target.value)}
                className={fieldClassName}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-[#303030]">
                Organization
              </span>
              <input
                type="text"
                value={formData.organization}
                onChange={(event) => updateField("organization", event.target.value)}
                className={fieldClassName}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-[#303030]">
                Email
              </span>
              <input
                type="email"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                className={fieldClassName}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[13px] font-medium text-[#303030]">
                Temporary password
              </span>
              <input
                type="text"
                value={formData.temporaryPassword}
                onChange={(event) =>
                  updateField("temporaryPassword", event.target.value)
                }
                className={fieldClassName}
              />
            </label>
          </div>

          <div className="mt-4 flex gap-2.5">
            <button
              type="button"
              onClick={createOrganizer}
              className="inline-flex py-2 items-center justify-center rounded-[9px] bg-[#232323] px-5 text-[13.5px] font-semibold text-white"
            >
              Create account
            </button>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setFormOpen(false);
              }}
              className="inline-flex py-2 items-center justify-center rounded-[9px] border border-[#232323] bg-white px-5 text-[13.5px] font-medium text-[#232323]"
            >
              Cancel
            </button>
          </div>
        </section>
      ) : null}

      <section className="overflow-hidden rounded-[20px] border border-[#E3DED6] bg-white">
        <div className="grid grid-cols-[1.65fr_1.2fr_0.55fr_0.7fr_1fr] gap-4 border-b border-[#EAE6DE] px-5 py-4 text-[10.5px] font-bold tracking-[0.15em] text-[#848484]">
          <span>ORGANIZATION</span>
          <span>EMAIL</span>
          <span>LISTINGS</span>
          <span>JOINED</span>
          <span className="text-right">ACTIONS</span>
        </div>

        {organizers.map((row, index) => (
          <div
            key={`${row.organization}-${row.email}`}
            className={`grid grid-cols-[1.65fr_1.2fr_0.55fr_0.7fr_1fr] gap-4 px-5 py-[15px] ${
              index < organizers.length - 1 ? "border-b border-[#EEE8E0]" : ""
            }`}
          >
            <div>
              <p className="text-[15px] font-semibold text-[#202020]">{row.organization}</p>
              <p className="mt-1 text-[13px] text-[#7A7A7A]">{row.contact}</p>
            </div>
            <div className="text-[13.5px] text-[#666666]">{row.email}</div>
            <div className="text-[13.5px] text-[#666666]">{row.listings}</div>
            <div className="text-[13.5px] text-[#7A7A7A]">{row.joined}</div>
            <div className="flex justify-end gap-4 text-[13px]">
              <button
                type="button"
                onClick={() => toggleFeatured(row.organization)}
                className={`transition-colors ${
                  row.featured
                    ? "font-medium text-[var(--ae-accent)]"
                    : "text-[#6A6A6A]"
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

const fieldClassName =
  "py-2 w-full rounded-[10px] border border-[#DDD8D0] px-4 text-[14px] text-[#202020] outline-none";
