import { AdminPageHeader } from "./admin-page-header";

type AdminPlaceholderPageProps = {
  title: string;
  description: string;
};

export function AdminPlaceholderPage({
  title,
  description,
}: AdminPlaceholderPageProps) {
  return (
    <div className="space-y-8">
      <AdminPageHeader kicker="ADMIN" title={title} description={description} />

      <section className="rounded-[22px] border border-ae-border bg-white p-8 shadow-[0_10px_20px_-24px_rgba(20,20,20,0.24)]">
        <h2 className="ae-serif text-[28px] leading-[1.12] tracking-[-0.02em] text-foreground">
          Section scaffolded
        </h2>
        <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.8] text-ae-muted">
          This route is partitioned and ready for feature-specific
          implementation using its own admin components and data sources. The
          next pass should convert the matching view from the admin prototype.
        </p>
      </section>
    </div>
  );
}
