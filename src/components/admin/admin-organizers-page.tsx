"use client";

import { toast } from "sonner";
import { useListUsersQuery, useUpdateUserStatusMutation } from "@/features/admin/admin-users-api";
import { getApiErrorMessage } from "@/lib/store/api-error";
import { useConfirm } from "@/components/ui/modal-provider";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });

export function AdminOrganizersPage() {
  const { data, isLoading, isError, refetch } = useListUsersQuery({ role: "ORGANIZER", limit: 100 });
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const confirm = useConfirm();

  const organizers = data?.items ?? [];
  const activeCount = organizers.filter((user) => user.isActive).length;

  async function handleToggleActive(id: string, isActive: boolean, name: string) {
    const confirmed = await confirm({
      title: isActive ? `Deactivate ${name}?` : `Reactivate ${name}?`,
      description: isActive
        ? "They won't be able to log in or manage their listings until reactivated."
        : "They'll be able to log in and manage their listings again.",
      confirmLabel: isActive ? "Deactivate" : "Reactivate",
      tone: isActive ? "danger" : "default",
    });
    if (!confirmed) return;

    try {
      await updateUserStatus({ id, isActive: !isActive }).unwrap();
      toast.success(isActive ? "Organizer deactivated" : "Organizer reactivated");
    } catch (error) {
      toast.error("Couldn't update organizer", { description: getApiErrorMessage(error) });
    }
  }

  return (
    <div className="animate-[fadeIn_.35s_ease_both] space-y-0">
      <div className="flex flex-col gap-5 border-b border-[#E7E7E7] pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="ae-serif text-[30px] font-semibold leading-[1.08] tracking-[-0.015em] text-[#202020]">
            Organizers
          </h2>
          <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
            {isLoading ? "Loading..." : `${organizers.length} accounts · ${activeCount} active`}
          </p>
        </div>
      </div>

      <section className="mt-6 rounded-[20px] border border-dashed border-[#E7E7E7] bg-[#FAFAFA] px-[26px] py-5 text-[13.5px] leading-[1.7] text-[#6A6A6A]">
        Organizer accounts are created through self-registration on the signup page — the API
        doesn&apos;t support admins creating accounts directly. You can activate or deactivate
        existing accounts below.
      </section>

      {isLoading ? (
        <div className="mt-6 h-[200px] animate-pulse rounded-[20px] border border-[#E7E7E7] bg-[#F5F5F5]" />
      ) : isError ? (
        <div className="mt-6 rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] px-10 py-16 text-center">
          <p className="text-[15px] text-[#6A6A6A]">Couldn&apos;t load organizers.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-[10px] border border-[#202020] bg-white px-5 py-2 text-[13.5px] font-semibold text-[#202020]"
          >
            Try again
          </button>
        </div>
      ) : (
        <section className="mt-6 overflow-hidden rounded-[20px] border border-[#E7E7E7] bg-white">
          <div className="grid grid-cols-[1.6fr_1.4fr_0.9fr_0.7fr_auto] gap-[22px] border-b border-[#E7E7E7] bg-[#FAFAFA] px-[26px] py-[15px] text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
            <span>CONTACT</span>
            <span>EMAIL</span>
            <span>JOINED</span>
            <span>STATUS</span>
            <span className="text-right">ACTIONS</span>
          </div>

          {organizers.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-[1.6fr_1.4fr_0.9fr_0.7fr_auto] items-center gap-[22px] border-t border-[#F1F1F1] px-[26px] py-[18px]"
            >
              <div className="text-[15px] font-semibold text-[#202020]">{user.fullName}</div>
              <div className="text-[13.5px] text-[#3A3A3A]">{user.email}</div>
              <div className="text-[13.5px] text-[#6A6A6A]">
                {user.createdAt ? dateFormatter.format(new Date(user.createdAt)) : "—"}
              </div>
              <div>
                <span
                  className={`inline-flex rounded-full border px-[12px] py-1 text-[12px] font-medium ${
                    user.isActive
                      ? "border-[#E7E7E7] bg-white text-[#3A3A3A]"
                      : "border-[#E0DDD6] bg-[#F3F1ED] text-[#6F6F6F]"
                  }`}
                >
                  {user.isActive ? "Active" : "Deactivated"}
                </span>
              </div>
              <div className="flex justify-end gap-4 text-[13px]">
                <button
                  type="button"
                  onClick={() => handleToggleActive(user.id, user.isActive, user.fullName)}
                  className="text-[#4E4E4E] transition-colors hover:text-[#202020]"
                >
                  {user.isActive ? "Deactivate" : "Reactivate"}
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
