export function AdminFooter() {
  return (
    <footer className="bg-foreground text-white/72">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-7 py-[44px] lg:flex-row lg:items-center lg:justify-between lg:px-16">
        <div className="flex items-center gap-3">
          <span className="ae-serif text-[30px] leading-none text-ae-accent">
            A
          </span>
          <span className="text-[12px] font-bold leading-[1.25] tracking-[0.14em] text-white">
            ARCHITECTURE
            <br />
            EVENTS
          </span>
        </div>
        <p className="text-[13.5px]">© 2026 Architecture Events · Admin</p>
      </div>
    </footer>
  );
}
