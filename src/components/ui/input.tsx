import { useId, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  wrapperClassName?: string;
};

// Matches the fieldClassName convention duplicated across submit-event,
// account, and profile forms — same border, radius, and focus color.
export const inputFieldClassName =
  "h-[52px] w-full rounded-[12px] border border-[#E7E7E7] px-4 text-[15px] outline-none focus:border-[#C7B48D]";

export function Input({ label, error, wrapperClassName, className, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label htmlFor={inputId} className={`block ${wrapperClassName ?? ""}`}>
      {label ? <span className="mb-[9px] block text-[13.5px] font-semibold">{label}</span> : null}
      <input id={inputId} className={`${inputFieldClassName} ${className ?? ""}`} {...props} />
      {error ? <span className="mt-[7px] block text-[13px] text-[#B3261E]">{error}</span> : null}
    </label>
  );
}
