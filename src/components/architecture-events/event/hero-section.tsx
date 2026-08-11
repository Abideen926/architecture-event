import { CalendarDays, ChevronDown, MapPin, Search } from "lucide-react";

export function BrowseHeroSection() {
  return (
    <section className="bg-[var(--mainbackground)] border-b border-[#E7E7E7] pb-11 pt-14">
      <div className="ae-container">
        <div className="ae-browse-shell">
          <p className="ae-section-kicker">BROWSE EVENTS</p>
          <h1 className="ae-browse-title">Find your next event</h1>

          <div className="ae-browse-panel">
            <div className="ae-browse-grid">
              <BrowseField
                label="KEYWORD"
                icon={<Search className="h-[17px] w-[17px] text-[#7B7B7B]" strokeWidth={1.8} />}
              >
                <input
                  type="text"
                  placeholder="Search events, topics, brands"
                  className="w-full border-0 bg-transparent text-[15px] text-[#202020] outline-none placeholder:text-[#8A8A8A]"
                />
              </BrowseField>

              <BrowseField
                label="DATE"
                icon={
                  <CalendarDays
                    className="h-[16px] w-[16px] text-[#7B7B7B]"
                    strokeWidth={1.8}
                  />
                }
              >
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="text-[15px] text-[#202020]">Any date</span>
                  <ChevronDown className="h-[15px] w-[15px] text-[#8A8A8A]" strokeWidth={1.8} />
                </div>
              </BrowseField>

              <BrowseField
                label="LOCATION"
                icon={<MapPin className="h-[16px] w-[16px] text-[#7B7B7B]" strokeWidth={1.8} />}
              >
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="text-[15px] text-[#202020]">All locations</span>
                  <ChevronDown className="h-[15px] w-[15px] text-[#8A8A8A]" strokeWidth={1.8} />
                </div>
              </BrowseField>

              <BrowseField label="EVENT TYPE" icon={null}>
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="text-[15px] text-[#202020]">All types</span>
                  <ChevronDown className="h-[15px] w-[15px] text-[#8A8A8A]" strokeWidth={1.8} />
                </div>
              </BrowseField>

              <button type="button" className="ae-browse-button">
                Search Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type BrowseFieldProps = {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

function BrowseField({ label, icon, children }: BrowseFieldProps) {
  return (
    <label className="block">
      <span className="ae-browse-field-label">{label}</span>
      <span className="ae-browse-field">
        {icon}
        {children}
      </span>
    </label>
  );
}
