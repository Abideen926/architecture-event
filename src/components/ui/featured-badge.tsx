type FeaturedBadgeProps = {
  className?: string;
};

// Matches the FEATURED tag already used on the package-selection card
// (submit-event-package-step.tsx) verbatim. Placed absolutely by the
// caller (top-right corner of a thumbnail); this component only owns its
// own look, not its position in the parent.
export function FeaturedBadge({ className }: FeaturedBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full bg-[var(--ae-accent)] px-[12px] py-[5px] text-[10px] font-bold tracking-[0.12em] text-white shadow-sm ${className ?? ""}`}
    >
      FEATURED
    </span>
  );
}
