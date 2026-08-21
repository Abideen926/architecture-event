"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { Modal } from "./modal";

type ModalTone = "default" | "danger";

type BaseOptions = {
  title: string;
  description?: string;
  confirmLabel?: string;
  tone?: ModalTone;
};

type ConfirmOptions = BaseOptions & { cancelLabel?: string };
type AlertOptions = BaseOptions;

type PendingRequest =
  | { kind: "confirm"; options: ConfirmOptions; resolve: (value: boolean) => void }
  | { kind: "alert"; options: AlertOptions; resolve: (value: void) => void };

type ModalContextValue = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  alertDialog: (options: AlertOptions) => Promise<void>;
};

const ModalContext = createContext<ModalContextValue | null>(null);

const primaryButtonClassName =
  "inline-flex h-[46px] items-center justify-center rounded-[12px] bg-[#1E1E1E] px-6 text-[14.5px] font-semibold text-white transition-colors hover:bg-black";

const dangerButtonClassName =
  "inline-flex h-[46px] items-center justify-center rounded-[12px] bg-[#B3261E] px-6 text-[14.5px] font-semibold text-white transition-colors hover:bg-[#8f1e18]";

const secondaryButtonClassName =
  "inline-flex h-[46px] items-center justify-center rounded-[12px] border border-[#E7E7E7] px-6 text-[14.5px] font-semibold text-[#3A3A3A] transition-colors hover:border-[#202020]";

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = useState<PendingRequest | null>(null);
  const requestRef = useRef<PendingRequest | null>(null);
  requestRef.current = request;

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setRequest({ kind: "confirm", options, resolve });
    });
  }, []);

  const alertDialog = useCallback((options: AlertOptions) => {
    return new Promise<void>((resolve) => {
      setRequest({ kind: "alert", options, resolve });
    });
  }, []);

  const settle = useCallback((result: boolean) => {
    const current = requestRef.current;
    if (!current) return;

    if (current.kind === "confirm") {
      current.resolve(result);
    } else {
      current.resolve();
    }

    setRequest(null);
  }, []);

  const value = useMemo(() => ({ confirm, alertDialog }), [confirm, alertDialog]);

  const primaryClassName =
    request?.options.tone === "danger" ? dangerButtonClassName : primaryButtonClassName;

  return (
    <ModalContext.Provider value={value}>
      {children}

      <Modal
        open={request !== null}
        onClose={() => settle(false)}
        title={request?.options.title ?? ""}
        description={request?.options.description}
        footer={
          request ? (
            <>
              {request.kind === "confirm" ? (
                <button
                  type="button"
                  onClick={() => settle(false)}
                  className={secondaryButtonClassName}
                >
                  {request.options.cancelLabel ?? "Cancel"}
                </button>
              ) : null}

              <button type="button" onClick={() => settle(true)} className={primaryClassName}>
                {request.options.confirmLabel ?? (request.kind === "confirm" ? "Confirm" : "OK")}
              </button>
            </>
          ) : null
        }
      />
    </ModalContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useConfirm must be used within ModalProvider");
  return ctx.confirm;
}

export function useAlertDialog() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useAlertDialog must be used within ModalProvider");
  return ctx.alertDialog;
}
