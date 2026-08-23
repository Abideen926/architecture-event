import type { ElementType, HTMLAttributes } from "react";

export type HeadingLevel = "page" | "section" | "card" | "subsection";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel;
  as?: ElementType;
};

// Sizes match the ae-serif headings already used across organizer/admin/attendee
// pages (page title ~30px, section title ~27px, card title ~22px, subsection
// title ~19px — the smaller in-card group headings on the admin event review
// and organizer Featured Listing panels).
const LEVEL_CLASSES: Record<HeadingLevel, string> = {
  page: "text-[30px] font-semibold tracking-[-0.015em]",
  section: "text-[27px] font-semibold tracking-[-0.015em]",
  card: "text-[22px] font-semibold tracking-[-0.01em]",
  subsection: "text-[19px] font-semibold tracking-[-0.01em]",
};

export function Heading({ level = "page", as, className, children, ...props }: HeadingProps) {
  const Tag = as ?? (level === "page" ? "h2" : level === "card" ? "h4" : "h3");
  return (
    <Tag
      className={`ae-serif text-[#202020] ${LEVEL_CLASSES[level]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
