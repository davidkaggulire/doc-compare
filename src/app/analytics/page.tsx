// src/app/analytics/page.tsx

import { Suspense } from "react";
import AnalyticsClient from "@/components/analyticsClient"; // ✅ normal import

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnalyticsClient />
    </Suspense>
  );
}
