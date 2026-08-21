import type { ReactNode } from "react";
import { AdminFooter } from "@/components/admin/admin-footer";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { requireRole } from "@/lib/auth/session-guard";

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  await requireRole("ADMIN");

  return (
    <div className="min-h-screen bg-white">
      <AdminHeader />
      <main className="mx-auto w-full max-w-[1600px] px-7 pb-[110px] pt-12 lg:px-16">
        <AdminPageHeader
          kicker="ADMIN"
          title="Platform oversight"
          description="Everything submitted, everyone who submitted it, and what needs a decision today."
        />
        <div className="grid gap-[30px] lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14">
          <AdminSidebar />
          <section>{children}</section>
        </div>
      </main>
      <AdminFooter />
    </div>
  );
}
