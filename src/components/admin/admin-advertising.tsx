"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import {
  useCreateAdvertisingPackageMutation,
  useCreateSpotlightMutation,
  useDeleteAdvertisingPackageMutation,
  useDeleteSpotlightMutation,
  useListAdminAdvertisingPackagesQuery,
  useListAdminSpotlightsQuery,
  useUpdateAdvertisingPackageMutation,
  useUpdateSpotlightMutation,
} from "@/features/admin/admin-advertising-api";
import type { AdvertisingPackage, BrandSpotlight } from "@/features/public/public-api";
import { getApiErrorMessage } from "@/lib/store/api-error";
import { useConfirm } from "@/components/ui/modal-provider";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

const topTabs = ["Packages", "Spotlights"] as const;
type AdvertisingView = (typeof topTabs)[number];

export function AdminAdvertising() {
  const [view, setView] = useState<AdvertisingView>("Packages");

  return (
    <div className="animate-[fadeIn_.35s_ease_both] space-y-0">
      <div className="flex flex-col gap-5 border-b border-ae-border pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Heading level="page">Advertising</Heading>
          <p className="mt-2 text-[14.5px] text-ae-muted">
            Packages shown on the public Advertise page, and homepage Brand
            Spotlights.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {topTabs.map((tab) => {
            const active = view === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setView(tab)}
                className={`rounded-full border px-[18px] py-[9px] text-[13.5px] font-semibold transition-colors ${
                  active
                    ? "border-foreground bg-foreground text-white"
                    : "border-ae-border bg-white text-foreground"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {view === "Packages" ? <PackagesTab /> : <SpotlightsTab />}
    </div>
  );
}

type PackageForm = {
  name: string;
  price: string;
  priceSuffix: string;
  badge: string;
  featured: boolean;
  description: string;
  label: string;
  details: string;
  note: string;
  buttonLabel: string;
  buttonVariant: "solid" | "outline";
  displayOrder: string;
  isActive: boolean;
};

const emptyPackageForm: PackageForm = {
  name: "",
  price: "",
  priceSuffix: "",
  badge: "",
  featured: false,
  description: "",
  label: "",
  details: "",
  note: "",
  buttonLabel: "",
  buttonVariant: "solid",
  displayOrder: "0",
  isActive: true,
};

function packageToForm(item: AdvertisingPackage): PackageForm {
  return {
    name: item.name,
    price: item.price,
    priceSuffix: item.priceSuffix ?? "",
    badge: item.badge ?? "",
    featured: item.featured,
    description: item.description,
    label: item.label,
    details: item.details.join("\n"),
    note: item.note ?? "",
    buttonLabel: item.buttonLabel,
    buttonVariant: item.buttonVariant,
    displayOrder: String(item.displayOrder),
    isActive: item.isActive,
  };
}

function PackagesTab() {
  const { data, isLoading, isError, refetch } = useListAdminAdvertisingPackagesQuery();
  const [createPackage, { isLoading: isCreating }] = useCreateAdvertisingPackageMutation();
  const [updatePackage, { isLoading: isUpdating }] = useUpdateAdvertisingPackageMutation();
  const [deletePackage] = useDeleteAdvertisingPackageMutation();
  const confirm = useConfirm();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<PackageForm>(emptyPackageForm);

  const packages = data ?? [];

  function updateField<K extends keyof PackageForm>(field: K, value: PackageForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function openCreate() {
    setEditingId(null);
    setForm(emptyPackageForm);
    setModalOpen(true);
  }

  function openEdit(item: AdvertisingPackage) {
    setEditingId(item.id);
    setForm(packageToForm(item));
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyPackageForm);
  }

  async function handleSubmit() {
    if (
      !form.name.trim() ||
      !form.price.trim() ||
      !form.description.trim() ||
      !form.label.trim() ||
      !form.buttonLabel.trim()
    ) {
      toast.error("Please fill in name, price, description, label, and button label.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      price: form.price.trim(),
      priceSuffix: form.priceSuffix.trim() || undefined,
      badge: form.badge.trim() || undefined,
      featured: form.featured,
      description: form.description.trim(),
      label: form.label.trim(),
      details: form.details
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      note: form.note.trim() || undefined,
      buttonLabel: form.buttonLabel.trim(),
      buttonVariant: form.buttonVariant,
      displayOrder: Number(form.displayOrder) || 0,
    };

    try {
      if (editingId) {
        await updatePackage({ id: editingId, ...payload, isActive: form.isActive }).unwrap();
        toast.success("Package updated");
      } else {
        await createPackage(payload).unwrap();
        toast.success("Package created");
      }
      closeModal();
    } catch (error) {
      toast.error("Couldn't save package", { description: getApiErrorMessage(error) });
    }
  }

  async function handleDelete(item: AdvertisingPackage) {
    const confirmed = await confirm({
      title: "Delete this package?",
      description: `"${item.name}" will be removed from the Advertise page immediately.`,
      confirmLabel: "Delete",
      tone: "danger",
    });
    if (!confirmed) return;

    try {
      await deletePackage(item.id).unwrap();
      toast.success("Package deleted");
    } catch (error) {
      toast.error("Couldn't delete package", { description: getApiErrorMessage(error) });
    }
  }

  return (
    <div className="mt-6 space-y-5">
      <div className="flex justify-end">
        <Button size="sm" onClick={openCreate}>
          New package
        </Button>
      </div>

      {isLoading ? (
        <div className="h-[200px] animate-pulse rounded-[20px] border border-ae-border bg-[#F5F5F5]" />
      ) : isError ? (
        <div className="rounded-[20px] border border-ae-border bg-mainbackground px-10 py-16 text-center">
          <p className="text-[15px] text-ae-muted">Couldn&apos;t load packages.</p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : packages.length === 0 ? (
        <div className="rounded-[20px] border border-ae-border bg-mainbackground px-10 py-16 text-center text-[15px] text-ae-muted">
          No packages yet.
        </div>
      ) : (
        <section className="overflow-hidden rounded-[20px] border border-ae-border bg-white">
          <div className="grid grid-cols-[1.3fr_0.8fr_0.7fr_0.7fr_auto] gap-[22px] border-b border-ae-border bg-mainbackground px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-ae-muted">
            <span>PACKAGE</span>
            <span>PRICE</span>
            <span>ORDER</span>
            <span>STATUS</span>
            <span className="text-right">ACTIONS</span>
          </div>
          {packages.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-[1.3fr_0.8fr_0.7fr_0.7fr_auto] items-center gap-[22px] px-[26px] py-[18px] ${
                index < packages.length - 1 ? "border-b border-[#F1F1F1]" : ""
              }`}
            >
              <div>
                <div className="text-[15px] font-semibold text-foreground">{item.name}</div>
                {item.badge ? (
                  <div className="mt-1 text-[12px] text-ae-muted">{item.badge}</div>
                ) : null}
              </div>
              <div className="text-[14px] text-[#3A3A3A]">
                {item.price}
                {item.priceSuffix ? <span className="text-ae-muted">{item.priceSuffix}</span> : null}
              </div>
              <div className="text-[14px] text-ae-muted">{item.displayOrder}</div>
              <div>
                <span
                  className={`inline-flex rounded-full border px-[10px] py-1 text-[11.5px] font-semibold ${
                    item.isActive
                      ? "border-foreground bg-foreground text-white"
                      : "border-ae-border bg-white text-[#8A8A8A]"
                  }`}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex justify-end gap-3 text-[13px]">
                <Button variant="ghost" size="text" className="font-semibold" onClick={() => openEdit(item)}>
                  Edit
                </Button>
                <Button variant="muted" size="text" onClick={() => handleDelete(item)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </section>
      )}

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editingId ? "Edit package" : "New package"}
        description="Shown on the public /architecture-events/advertise page."
        footer={
          <>
            <Button variant="outline" size="md" onClick={closeModal}>
              Cancel
            </Button>
            <Button size="md" onClick={handleSubmit} disabled={isCreating || isUpdating}>
              {editingId ? "Save changes" : "Create package"}
            </Button>
          </>
        }
      >
        <div className="max-h-[62vh] space-y-4 overflow-y-auto pr-1">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
            <Input
              label="Price"
              value={form.price}
              onChange={(e) => updateField("price", e.target.value)}
              placeholder="$299"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Price suffix"
              value={form.priceSuffix}
              onChange={(e) => updateField("priceSuffix", e.target.value)}
              placeholder="/month"
            />
            <Input
              label="Badge"
              value={form.badge}
              onChange={(e) => updateField("badge", e.target.value)}
              placeholder="MOST VISIBLE"
            />
          </div>
          <Textarea
            label="Description"
            rows={3}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
          <Input
            label="Details label"
            value={form.label}
            onChange={(e) => updateField("label", e.target.value)}
            placeholder="INCLUDES:"
          />
          <Textarea
            label="Details (one bullet per line)"
            rows={4}
            value={form.details}
            onChange={(e) => updateField("details", e.target.value)}
          />
          <Textarea
            label="Note"
            rows={2}
            value={form.note}
            onChange={(e) => updateField("note", e.target.value)}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Button label"
              value={form.buttonLabel}
              onChange={(e) => updateField("buttonLabel", e.target.value)}
              placeholder="Get Started"
            />
            <label className="block">
              <span className="mb-[9px] block text-[13.5px] font-semibold">Button style</span>
              <select
                value={form.buttonVariant}
                onChange={(e) => updateField("buttonVariant", e.target.value as "solid" | "outline")}
                className="h-[52px] w-full rounded-[12px] border border-ae-border px-4 text-[15px] outline-none focus:border-[#C7B48D]"
              >
                <option value="solid">Solid</option>
                <option value="outline">Outline</option>
              </select>
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Display order"
              type="number"
              value={form.displayOrder}
              onChange={(e) => updateField("displayOrder", e.target.value)}
            />
            <label className="flex items-center gap-2 self-end pb-3">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField("featured", e.target.checked)}
                className="h-4 w-4 rounded border-ae-border"
              />
              <span className="text-[13.5px] font-medium text-foreground">Featured</span>
            </label>
          </div>
          {editingId ? (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => updateField("isActive", e.target.checked)}
                className="h-4 w-4 rounded border-ae-border"
              />
              <span className="text-[13.5px] font-medium text-foreground">Active</span>
            </label>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}

type SpotlightForm = {
  name: string;
  description: string;
  websiteUrl: string;
  displayOrder: string;
  isActive: boolean;
  thumbnailImage: File | null;
  logoImage: File | null;
};

const emptySpotlightForm: SpotlightForm = {
  name: "",
  description: "",
  websiteUrl: "",
  displayOrder: "0",
  isActive: true,
  thumbnailImage: null,
  logoImage: null,
};

function spotlightToForm(item: BrandSpotlight): SpotlightForm {
  return {
    name: item.name,
    description: item.description,
    websiteUrl: item.websiteUrl,
    displayOrder: String(item.displayOrder),
    isActive: item.isActive,
    thumbnailImage: null,
    logoImage: null,
  };
}

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

type ImagePickerProps = {
  label: string;
  file: File | null;
  existingUrl?: string;
  onChange: (file: File | null) => void;
};

const ACCEPTED_IMAGE_TYPES = "image/jpeg,image/png,image/webp,image/gif";

function ImagePicker({ label, file, existingUrl, onChange }: ImagePickerProps) {
  const inputId = useId();
  const [isDragging, setIsDragging] = useState(false);
  const objectUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  const previewUrl = objectUrl ?? existingUrl ?? null;

  function handleFiles(fileList: FileList | null) {
    const picked = fileList?.[0];
    if (picked) onChange(picked);
  }

  return (
    <div>
      <span className="mb-[9px] block text-[13.5px] font-semibold">{label}</span>
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`flex cursor-pointer items-center gap-4 rounded-[12px] border border-dashed px-4 py-4 transition-colors ${
          isDragging ? "border-[#C7B48D] bg-[#FBF8F2]" : "border-ae-border bg-white"
        }`}
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt=""
            className="h-[56px] w-[56px] flex-none rounded-[8px] object-cover"
          />
        ) : (
          <div className="flex h-[56px] w-[56px] flex-none items-center justify-center rounded-[8px] border border-ae-border text-ae-muted">
            <Upload className="h-5 w-5" />
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-medium text-foreground">
            {file ? file.name : previewUrl ? "Click or drop to replace" : "Click or drop to upload"}
          </p>
          <p className="mt-0.5 text-[12px] text-ae-muted">JPEG, PNG, WEBP, or GIF — up to 5MB</p>
        </div>
        <input
          id={inputId}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>
    </div>
  );
}

function SpotlightsTab() {
  const { data, isLoading, isError, refetch } = useListAdminSpotlightsQuery();
  const [createSpotlight, { isLoading: isCreating }] = useCreateSpotlightMutation();
  const [updateSpotlight, { isLoading: isUpdating }] = useUpdateSpotlightMutation();
  const [deleteSpotlight] = useDeleteSpotlightMutation();
  const confirm = useConfirm();

  const [editingItem, setEditingItem] = useState<BrandSpotlight | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<SpotlightForm>(emptySpotlightForm);

  const spotlights = data ?? [];
  const descriptionWords = wordCount(form.description);

  function updateField<K extends keyof SpotlightForm>(field: K, value: SpotlightForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function openCreate() {
    setEditingItem(null);
    setForm(emptySpotlightForm);
    setModalOpen(true);
  }

  function openEdit(item: BrandSpotlight) {
    setEditingItem(item);
    setForm(spotlightToForm(item));
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingItem(null);
    setForm(emptySpotlightForm);
  }

  async function handleSubmit() {
    if (!form.name.trim() || !form.description.trim() || !form.websiteUrl.trim()) {
      toast.error("Please fill in name, description, and website link.");
      return;
    }
    if (descriptionWords > 16) {
      toast.error("Description must be 16 words or fewer.");
      return;
    }
    if (!editingItem && (!form.thumbnailImage || !form.logoImage)) {
      toast.error("Please upload a thumbnail and a logo image.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      websiteUrl: form.websiteUrl.trim(),
      displayOrder: Number(form.displayOrder) || 0,
    };

    try {
      if (editingItem) {
        await updateSpotlight({
          id: editingItem.id,
          ...payload,
          isActive: form.isActive,
          thumbnailImage: form.thumbnailImage ?? undefined,
          logoImage: form.logoImage ?? undefined,
        }).unwrap();
        toast.success("Spotlight updated");
      } else {
        await createSpotlight({
          ...payload,
          thumbnailImage: form.thumbnailImage!,
          logoImage: form.logoImage!,
        }).unwrap();
        toast.success("Spotlight created");
      }
      closeModal();
    } catch (error) {
      toast.error("Couldn't save spotlight", { description: getApiErrorMessage(error) });
    }
  }

  async function handleDelete(item: BrandSpotlight) {
    const confirmed = await confirm({
      title: "Delete this spotlight?",
      description: `"${item.name}" will be removed from the homepage immediately.`,
      confirmLabel: "Delete",
      tone: "danger",
    });
    if (!confirmed) return;

    try {
      await deleteSpotlight(item.id).unwrap();
      toast.success("Spotlight deleted");
    } catch (error) {
      toast.error("Couldn't delete spotlight", { description: getApiErrorMessage(error) });
    }
  }

  return (
    <div className="mt-6 space-y-5">
      <div className="flex justify-end">
        <Button size="sm" onClick={openCreate}>
          New spotlight
        </Button>
      </div>

      {isLoading ? (
        <div className="h-[200px] animate-pulse rounded-[20px] border border-ae-border bg-[#F5F5F5]" />
      ) : isError ? (
        <div className="rounded-[20px] border border-ae-border bg-mainbackground px-10 py-16 text-center">
          <p className="text-[15px] text-ae-muted">Couldn&apos;t load spotlights.</p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : spotlights.length === 0 ? (
        <div className="rounded-[20px] border border-ae-border bg-mainbackground px-10 py-16 text-center text-[15px] text-ae-muted">
          No spotlights yet.
        </div>
      ) : (
        <section className="overflow-hidden rounded-[20px] border border-ae-border bg-white">
          <div className="grid grid-cols-[0.6fr_1.4fr_0.7fr_0.7fr_auto] gap-[22px] border-b border-ae-border bg-mainbackground px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-ae-muted">
            <span>THUMBNAIL</span>
            <span>NAME</span>
            <span>ORDER</span>
            <span>STATUS</span>
            <span className="text-right">ACTIONS</span>
          </div>
          {spotlights.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-[0.6fr_1.4fr_0.7fr_0.7fr_auto] items-center gap-[22px] px-[26px] py-[18px] ${
                index < spotlights.length - 1 ? "border-b border-[#F1F1F1]" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.thumbnailImageUrl}
                alt=""
                className="h-[40px] w-[56px] rounded-[8px] object-cover"
              />
              <div className="text-[15px] font-semibold text-foreground">{item.name}</div>
              <div className="text-[14px] text-ae-muted">{item.displayOrder}</div>
              <div>
                <span
                  className={`inline-flex rounded-full border px-[10px] py-1 text-[11.5px] font-semibold ${
                    item.isActive
                      ? "border-foreground bg-foreground text-white"
                      : "border-ae-border bg-white text-[#8A8A8A]"
                  }`}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex justify-end gap-3 text-[13px]">
                <Button variant="ghost" size="text" className="font-semibold" onClick={() => openEdit(item)}>
                  Edit
                </Button>
                <Button variant="muted" size="text" onClick={() => handleDelete(item)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </section>
      )}

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editingItem ? "Edit spotlight" : "New spotlight"}
        description="Shown in the Brand Spotlight section on the homepage."
        footer={
          <>
            <Button variant="outline" size="md" onClick={closeModal}>
              Cancel
            </Button>
            <Button size="md" onClick={handleSubmit} disabled={isCreating || isUpdating}>
              {editingItem ? "Save changes" : "Create spotlight"}
            </Button>
          </>
        }
      >
        <div className="max-h-[62vh] space-y-4 overflow-y-auto pr-1">
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
          <Textarea
            label="Description"
            rows={3}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
          <p className={`text-[12.5px] ${descriptionWords > 16 ? "text-[#B3261E]" : "text-ae-muted"}`}>
            {descriptionWords}/16 words
          </p>
          <ImagePicker
            label="Thumbnail image"
            file={form.thumbnailImage}
            existingUrl={editingItem?.thumbnailImageUrl}
            onChange={(file) => updateField("thumbnailImage", file)}
          />
          <ImagePicker
            label="Logo image"
            file={form.logoImage}
            existingUrl={editingItem?.logoImageUrl}
            onChange={(file) => updateField("logoImage", file)}
          />
          <Input
            label="Website link"
            value={form.websiteUrl}
            onChange={(e) => updateField("websiteUrl", e.target.value)}
            placeholder="https://..."
          />
          <Input
            label="Display order"
            type="number"
            value={form.displayOrder}
            onChange={(e) => updateField("displayOrder", e.target.value)}
          />
          {editingItem ? (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => updateField("isActive", e.target.checked)}
                className="h-4 w-4 rounded border-ae-border"
              />
              <span className="text-[13.5px] font-medium text-foreground">Active</span>
            </label>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}
