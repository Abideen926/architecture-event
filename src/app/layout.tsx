import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/ui/modal-provider";
import { ReduxProvider } from "@/lib/store/redux-provider";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Architecture Events",
  description:
    "Events, brands, and venues for architecture, engineering, construction, and design professionals.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <ModalProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                classNames: {
                  toast:
                    "!rounded-[14px] !border !border-[#E7E7E7] !bg-white !shadow-[0_14px_34px_-18px_rgba(20,20,20,0.35)]",
                  title: "!text-[14.5px] !font-semibold !text-foreground",
                  description: "!text-[13.5px] !text-[#6A6A6A]",
                  actionButton: "!rounded-[10px] !bg-[#1E1E1E] !text-white",
                  cancelButton: "!rounded-[10px] !bg-[#F2F2F2] !text-[#3A3A3A]",
                  success: "!border-l-[3px] !border-l-[#b08a45]",
                  error: "!border-l-[3px] !border-l-[#B3261E]",
                },
              }}
            />
          </ModalProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
