type AdminPageHeaderProps = {
  kicker: string;
  title: string;
  description: string;
};

export function AdminPageHeader({
  kicker,
  title,
  description,
}: AdminPageHeaderProps) {
  return (
    <div className="pb-[40px]">
      <p className="mb-[10px] text-[11.5px] font-bold tracking-[0.16em] text-ae-accent">
        {kicker}
      </p>
      <h1 className="ae-serif text-[40px] leading-[1.08] tracking-[-0.02em] text-foreground md:text-[44px] font-semibold">
        {title}
      </h1>
      <p className="mt-[14px] max-w-[62ch] text-[16.5px] leading-[1.75] text-ae-muted">
        {description}
      </p>
    </div>
  );
}
