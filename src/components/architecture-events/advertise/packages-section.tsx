"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { appRoutes } from "@/lib/routes";
import { useGetMeQuery } from "@/features/auth/auth-api";
import { useListPublicAdvertisingPackagesQuery } from "@/features/public/public-api";
import type { AdvertisingPackage } from "@/features/public/public-api";
import {
  useListMyAdvertisingRequestsQuery,
  useRequestAdvertisingPackageMutation,
} from "@/features/organizer/organizer-api";
import { getApiErrorMessage } from "@/lib/store/api-error";

export function AdvertisePackagesSection() {
  const router = useRouter();
  const { data: me } = useGetMeQuery();
  const { data: packages } = useListPublicAdvertisingPackagesQuery();

  const isOrganizer = me?.role === "ORGANIZER";
  const { data: myRequests } = useListMyAdvertisingRequestsQuery(undefined, { skip: !isOrganizer });
  const [requestPackage] = useRequestAdvertisingPackageMutation();
  const [requestingId, setRequestingId] = useState<string | null>(null);

  function isRequested(packageId: string) {
    return (myRequests ?? []).some((request) => request.packageId === packageId);
  }

  async function handleGetStarted(pkg: AdvertisingPackage) {
    if (!me) {
      toast.error("Log in as an organizer to request this package");
      router.push(
        `${appRoutes.architectureEvents.login}?redirect=${encodeURIComponent(appRoutes.architectureEvents.advertise)}`
      );
      return;
    }
    if (me.role !== "ORGANIZER") {
      toast.error("Only organizer accounts can request advertising packages");
      return;
    }

    setRequestingId(pkg.id);
    try {
      await requestPackage(pkg.id).unwrap();
      toast.success("Request submitted", {
        description: "Our team will follow up by email shortly.",
      });
    } catch (error) {
      toast.error("Couldn't submit request", { description: getApiErrorMessage(error) });
    } finally {
      setRequestingId(null);
    }
  }

  return (
    <section className="bg-white pb-[84px] pt-[26px]">
      <div className="ae-container">
        <div className="mx-auto max-w-[1280px] mt-20 mb-12">
          <h2 className="ae-section-heading text-[40px] leading-none md:text-[40px]">
            Packages
          </h2>
        </div>
        <div className="mx-auto mt-8 grid max-w-[1280px] gap-[14px] xl:grid-cols-4">
          {(packages ?? []).map((pkg) => {
            const requested = isRequested(pkg.id);
            const sending = requestingId === pkg.id;

            return (
              <article
                key={pkg.id}
                className={`relative flex min-h-[698px] flex-col rounded-[19px] border ${
                  pkg.badge ? " bg-[#fdfbf8]" : ""
                } px-5 pb-6 pt-[26px] shadow-[0_20px_30px_-32px_rgba(20,20,20,0.45)] ${
                  pkg.featured ? "border-[#252525]" : "border-[#E3E0D9]"
                }`}
              >
                {pkg.badge ? (
                  <span className="absolute right-1/120 top-[-11px] -translate-x-1/2 rounded-[8px] bg-ae-accent px-4 py-[5px] text-[10px] font-bold tracking-[0.05em] text-white">
                    {pkg.badge}
                  </span>
                ) : null}

                <h2 className="ae-serif text-[24px] leading-[1.1] text-[#262626]">
                  {pkg.name}
                </h2>

                <div className="mt-5 flex items-end gap-2">
                  <span className="text-[18px] font-semibold leading-none text-[#262626]">
                    {pkg.price}
                  </span>
                  {pkg.priceSuffix ? (
                    <span className="pb-[1px] text-[13px] text-[#8A8A8A]">
                      {pkg.priceSuffix}
                    </span>
                  ) : null}
                </div>

                <p className="mt-7 min-h-[109px] text-[14px] leading-[1.78] text-[#727272]">
                  {pkg.description}
                </p>

                <div className="mt-4 border-t border-[#E2DED7] pt-5">
                  <p className="text-[11px] font-bold tracking-[0.13em] text-[#7A7A7A]">
                    {pkg.label}
                  </p>

                  <ul className="mt-4 grid gap-[13px]">
                    {pkg.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-3 text-[14px] leading-[1.55] text-[#676767]"
                      >
                        <Check
                          className="mt-[2px] h-[13px] w-[13px] shrink-0 text-ae-accent"
                          strokeWidth={2.2}
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-8">
                  {pkg.note ? (
                    <div className="mb-[14px] rounded-[11px] border border-[#E0DDD6] bg-white px-[14px] py-[11px] text-[12px] font-medium leading-[1.5] text-[#505050]">
                      {pkg.note}
                    </div>
                  ) : null}

                  <button
                    type="button"
                    disabled={requested || sending}
                    onClick={() => handleGetStarted(pkg)}
                    className={`inline-flex min-h-[37px] w-full items-center justify-center rounded-[11px] border px-4 py-[8px] text-center text-[13px] font-medium leading-[1.15] transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                      pkg.buttonVariant === "solid"
                        ? "border-[#222222] bg-[#222222] text-white hover:bg-black"
                        : "border-[#262626] bg-white text-[#262626] hover:bg-[#262626] hover:text-white"
                    }`}
                  >
                    {requested ? "Requested" : sending ? "Sending..." : pkg.buttonLabel}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
