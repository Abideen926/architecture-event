import { useId, type InputHTMLAttributes } from "react";

export type InputSize = "default" | "lg" | "sm";
export type InputTone = "plain" | "auth";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  error?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  // Named inputSize, not size — <input size> is a native HTML attribute
  // (a number) already present on InputHTMLAttributes.
  inputSize?: InputSize;
  tone?: InputTone;
};

// Matches the fieldClassName convention duplicated across submit-event,
// account, and profile forms — same border, radius, and focus color.
const BASE_CLASSES =
  "w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none focus:border-[#C7B48D]";

const SIZE_CLASSES: Record<InputSize, string> = {
  default: "h-[52px]",
  lg: "h-[54px]",
  // Compact search-bar field (e.g. admin Featured Requests search).
  sm: "h-[44px]",
};

// "auth" matches the fieldClassName duplicated across the auth pages
// (login/signup/forgot-password/reset-password/verify-email) — adds a
// background, explicit text color, transition, and placeholder color on
// top of the plain dashboard-style field.
const TONE_CLASSES: Record<InputTone, string> = {
  plain: "",
  auth: "bg-white text-foreground transition-colors placeholder:text-[#8A8A8A]",
};

export function inputFieldClassName(
  size: InputSize = "default",
  tone: InputTone = "plain",
) {
  return `${SIZE_CLASSES[size]} ${BASE_CLASSES} ${TONE_CLASSES[tone]}`;
}

export function Input({
  label,
  error,
  wrapperClassName,
  labelClassName,
  inputSize = "default",
  tone = "plain",
  className,
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label htmlFor={inputId} className={`block ${wrapperClassName ?? ""}`}>
      {label ? (
        <span
          className={`mb-[9px] block text-[13.5px] font-semibold ${labelClassName ?? ""}`}
        >
          {label}
        </span>
      ) : null}
      <input
        id={inputId}
        className={`${inputFieldClassName(inputSize, tone)} ${className ?? ""}`}
        {...props}
      />
      {error ? (
        <span className="mt-[7px] block text-[13px] text-[#B3261E]">
          {error}
        </span>
      ) : null}
    </label>
  );
}
