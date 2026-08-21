"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  wrapperClassName?: string;
};

export function PasswordInput({
  className,
  wrapperClassName,
  id,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={`relative ${wrapperClassName ?? ""}`}>
      <input
        {...props}
        id={inputId}
        type={visible ? "text" : "password"}
        className={`${className ?? ""} pr-[46px]`}
      />

      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        tabIndex={-1}
        className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#8A8A8A] transition-colors hover:text-[#202020]"
      >
        {visible ? (
          <EyeOff className="h-[18px] w-[18px]" />
        ) : (
          <Eye className="h-[18px] w-[18px]" />
        )}
      </button>
    </div>
  );
}
