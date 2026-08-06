import type { ReactNode } from "react";
import { AdminFooter } from "@/components/admin/admin-footer";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />
      <main className="mx-auto w-full max-w-[1600px] px-7 pb-[110px] pt-12 lg:px-16">
        <div className="grid gap-[30px] lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14">
          <AdminSidebar />
          <section>{children}</section>
        </div>
      </main>
      <AdminFooter />
    </div>
  );
}
