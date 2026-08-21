import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "default" | "sm";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingLabel?: string;
  icon?: ReactNode;
};

// Extracted verbatim from the classNames already used across the app
// (auth forms, admin action buttons, organizer/attendee CTAs) — no new
// colors, radii, or spacing invented, just consolidated into one component.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1E1E1E] text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-60",
  secondary:
    "border border-[#202020] bg-white text-[#202020] hover:bg-[#FAFAFA] disabled:cursor-not-allowed disabled:opacity-60",
  danger:
    "bg-[#B3261E] text-white hover:bg-[#8f1e18] disabled:cursor-not-allowed disabled:opacity-60",
  ghost:
    "bg-transparent text-[var(--ae-accent)] hover:text-[var(--ae-accent-strong)] disabled:cursor-not-allowed disabled:opacity-60",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  default: "h-[52px] px-[26px] text-[15px] font-semibold rounded-[12px]",
  sm: "h-auto px-4 py-1.5 text-[13.5px] font-semibold rounded-[10px]",
};

export function Button({
  variant = "primary",
  size = "default",
  isLoading = false,
  loadingLabel,
  icon,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 transition-colors ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className ?? ""}`}
      {...props}
    >
      {icon ? <span className="inline-flex">{icon}</span> : null}
      {isLoading ? loadingLabel ?? "Please wait..." : children}
    </button>
  );
}
