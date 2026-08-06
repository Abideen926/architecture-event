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
    <div>
      <p className="mb-[10px] text-[11.5px] font-bold tracking-[0.16em] text-[var(--ae-accent)]">
        {kicker}
      </p>
      <h1 className="ae-serif text-[40px] leading-[1.08] tracking-[-0.02em] text-[#202020] md:text-[44px]">
        {title}
      </h1>
      <p className="mt-[14px] max-w-[62ch] text-[16.5px] leading-[1.75] text-[#6A6A6A]">
        {description}
      </p>
    </div>
  );
}
