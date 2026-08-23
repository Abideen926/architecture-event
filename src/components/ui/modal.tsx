"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-10 animate-[fadeIn_0.2s_ease_both]"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-[#141414]/55 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ae-modal-title"
        className="relative w-full max-w-[440px] rounded-[20px] border border-[#E7E7E7] bg-white p-7 shadow-[0_24px_60px_-24px_rgba(20,20,20,0.35)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#8A8A8A] transition-colors hover:bg-[#FAFAFA] hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <h2
          id="ae-modal-title"
          className="ae-section-heading pr-8 text-[22px] leading-[1.25] text-foreground"
        >
          {title}
        </h2>

        {description ? (
          <p className="mt-2.5 text-[14.5px] leading-[1.7] text-[#6A6A6A]">
            {description}
          </p>
        ) : null}

        {children ? <div className="mt-5">{children}</div> : null}

        {footer ? (
          <div className="mt-7 flex flex-wrap items-center justify-end gap-3">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
