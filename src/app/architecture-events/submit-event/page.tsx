import { Suspense } from "react";
import { SubmitEventPageContent } from "@/components/architecture-events/submit-event/submit-event-page-content";

export default function SubmitEventPage() {
  return (
    <div className="ae-shell">
      <main>
        <Suspense fallback={null}>
          <SubmitEventPageContent />
        </Suspense>
      </main>
    </div>
  );
}
