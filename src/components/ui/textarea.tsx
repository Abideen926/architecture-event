import { useId, type TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  wrapperClassName?: string;
};

export const textareaFieldClassName =
  "w-full resize-y rounded-[12px] border border-ae-border px-4 py-[14px] text-[15px] leading-[1.7] outline-none focus:border-[#C7B48D]";

export function Textarea({
  label,
  error,
  wrapperClassName,
  className,
  id,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <label htmlFor={textareaId} className={`block ${wrapperClassName ?? ""}`}>
      {label ? (
        <span className="mb-[9px] block text-[13.5px] font-semibold">
          {label}
        </span>
      ) : null}
      <textarea
        id={textareaId}
        className={`${textareaFieldClassName} ${className ?? ""}`}
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
