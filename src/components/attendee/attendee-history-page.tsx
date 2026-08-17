import { Clock3, MapPin } from "lucide-react";
import Link from "next/link";
import { attendeeHistoryRows } from "@/lib/attendee/attendee-data";
import { appRoutes } from "@/lib/routes";

type AttendeeHistoryPageProps = {
  empty?: boolean;
};

export function AttendeeHistoryPage({ empty = false }: AttendeeHistoryPageProps) {
  const rows = empty ? [] : attendeeHistoryRows;

  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <div className="border-b border-[#E7E7E7] pb-5">
        <h2 className="ae-serif text-[30px] font-semibold tracking-[-0.015em] text-[#202020]">
          Registration History
        </h2>
        <p className="mt-2 text-[14.5px] text-[#6A6A6A]">
          {rows.length === 0 ? "Nothing here yet" : `${rows.length} past events`}
        </p>
      </div>

      {rows.length > 0 ? (
        <div className="mt-[26px] overflow-hidden rounded-[20px] border border-[#E7E7E7]">
          <div className="hidden bg-[#FAFAFA] px-[26px] py-[15px] lg:grid lg:grid-cols-[2.4fr_1fr_1.2fr_auto] lg:gap-6">
            {["EVENT", "DATE", "LOCATION", "STATUS"].map((label) => (
              <span
                key={label}
                className="text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="divide-y divide-[#F1F1F1]">
            {rows.map((row) => {
              const Accessed = row.status === "Accessed";

              return (
                <div
                  key={`${row.title}-${row.date}`}
                  className="grid gap-4 px-5 py-4 transition-colors hover:bg-[#FAFAFA] lg:grid-cols-[2.4fr_1fr_1.2fr_auto] lg:items-center lg:gap-6 lg:px-[26px]"
                >
                  <div>
                    <p className="mb-[3px] text-[10.5px] font-bold tracking-[0.13em] text-[#6A6A6A]">
                      {row.category}
                    </p>
                    <h3 className="text-[16.5px] font-bold leading-[1.28] tracking-[-0.01em] text-[#202020]">
                      {row.title}
                    </h3>
                  </div>
                  <span className="text-[14.5px] text-[#3A3A3A]">{row.date}</span>
                  <span className="flex items-center gap-[7px] text-[14.5px] text-[#6A6A6A]">
                    <MapPin className="h-[14px] w-[14px]" strokeWidth={1.7} />
                    {row.city}
                  </span>
                  <span
                    className={`justify-self-start whitespace-nowrap rounded-full border px-[15px] py-[7px] text-[12.5px] font-semibold ${
                      Accessed
                        ? "border-[#202020] bg-[#1E1E1E] text-white"
                        : "border-[#E7E7E7] bg-white text-[#3A3A3A]"
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-[26px] rounded-[20px] border border-[#E7E7E7] bg-[#FAFAFA] px-10 py-[76px] text-center">
          <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#E7E7E7] bg-[#F1EEE8] text-[var(--ae-accent)]">
            <Clock3 className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <h3 className="ae-serif mt-[22px] text-[27px] font-semibold tracking-[-0.015em] text-[#202020]">
            No past events yet
          </h3>
          <p className="mx-auto mt-[13px] max-w-[46ch] text-[16px] leading-[1.75] text-[#6A6A6A]">
            Once an event you registered for or saved has taken place, it moves here so
            you can look back on it.
          </p>
          <Link
            href={appRoutes.architectureEvents.events}
            className="mt-7 inline-block rounded-[12px] bg-[#1E1E1E] px-7 py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-black"
          >
            Browse Events
          </Link>
        </div>
      )}
    </div>
  );
}
