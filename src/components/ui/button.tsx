import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import Link from "next/link";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "outline"
  | "muted";
export type ButtonSize = "default" | "sm" | "lg" | "md" | "text";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingLabel?: string;
  icon?: ReactNode;
  /** Renders as a Next.js Link with identical styling instead of a <button>. */
  href?: string;
  target?: string;
  rel?: string;
};

// Extracted verbatim from the classNames already used across the app
// (auth forms, admin action buttons, organizer/attendee CTAs) — no new
// colors, radii, or spacing invented, just consolidated into one component.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1E1E1E] text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-60",
  secondary:
    "border border-foreground bg-white text-foreground hover:bg-[#FAFAFA] disabled:cursor-not-allowed disabled:opacity-60",
  danger:
    "bg-[#B3261E] text-white hover:bg-[#8f1e18] disabled:cursor-not-allowed disabled:opacity-60",
  ghost:
    "bg-transparent text-[var(--ae-accent)] hover:text-[var(--ae-accent-strong)] disabled:cursor-not-allowed disabled:opacity-60",
  // Matches the Modal/ModalProvider cancel button, reused verbatim by every
  // confirm/alert dialog and admin "note" modal footer across the app.
  outline:
    "border border-[#E7E7E7] text-[#3A3A3A] hover:border-foreground disabled:cursor-not-allowed disabled:opacity-60",
  // Bare muted-gray text action (e.g. "Remove", admin row-level Reject/Retry
  // refund) — distinct from "ghost", which is accent-colored.
  muted:
    "text-[#6A6A6A] hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  // Matches the padding-based (not fixed-height) CTA buttons used across
  // organizer/attendee/admin pages (Submit, Save changes, Update password...).
  default: "px-[26px] py-[15px] text-[15px] font-semibold rounded-[12px]",
  sm: "h-auto px-4 py-1.5 text-[13.5px] font-semibold rounded-[10px]",
  // Matches the full-width auth-form submit button used across
  // login/signup/forgot-password/reset-password/verify-email.
  lg: "h-[54px] w-full text-[15.5px] font-semibold rounded-[12px]",
  // Matches Modal/ModalProvider and admin "note" modal footer buttons.
  md: "h-[46px] px-6 text-[14.5px] font-semibold rounded-[12px]",
  // Bare inline text action — contributes nothing of its own (no
  // padding/height/radius/font-size); callers pass their own text size via
  // className, since it varies by call site (e.g. "Change package" at
  // 13.5px, "Log out" at 14.5px) and font-size utilities can't be safely
  // layered with a preset one via plain class strings.
  text: "",
};

export function Button({
  variant = "primary",
  size = "default",
  isLoading = false,
  loadingLabel,
  icon,
  href,
  target,
  rel,
  disabled,
  className,
  children,
  type,
  onClick,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 transition-colors ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className ?? ""}`;
  const content = (
    <>
      {icon ? <span className="inline-flex">{icon}</span> : null}
      {isLoading ? (loadingLabel ?? "Please wait...") : children}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={classes}
        onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
        aria-label={props["aria-label"]}
        id={props.id}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      disabled={disabled || isLoading}
      className={classes}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}
