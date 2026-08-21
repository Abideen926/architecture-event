import type { ElementType, HTMLAttributes } from "react";

export type HeadingLevel = "page" | "section" | "card";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel;
  as?: ElementType;
};

// Sizes match the ae-serif headings already used across organizer/admin/attendee
// pages (page title ~30px, section title ~27px, card title ~22px).
const LEVEL_CLASSES: Record<HeadingLevel, string> = {
  page: "text-[30px] font-semibold tracking-[-0.015em]",
  section: "text-[27px] font-semibold tracking-[-0.015em]",
  card: "text-[22px] font-semibold tracking-[-0.01em]",
};

export function Heading({ level = "page", as, className, children, ...props }: HeadingProps) {
  const Tag = as ?? (level === "page" ? "h2" : level === "section" ? "h3" : "h4");
  return (
    <Tag
      className={`ae-serif text-[#202020] ${LEVEL_CLASSES[level]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
