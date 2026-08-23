"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { Modal } from "./modal";
import { Button } from "./button";

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
                <Button variant="outline" size="md" onClick={() => settle(false)}>
                  {request.options.cancelLabel ?? "Cancel"}
                </Button>
              ) : null}

              <Button
                variant={request.options.tone === "danger" ? "danger" : "primary"}
                size="md"
                onClick={() => settle(true)}
              >
                {request.options.confirmLabel ?? (request.kind === "confirm" ? "Confirm" : "OK")}
              </Button>
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
