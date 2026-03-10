import PlayMatch from "@/app/component/application/matchesList";
import { Suspense } from "react";

export default function PlayMatchPage() {
  return (
    <Suspense fallback={<p>Loading matches...</p>}>
      <PlayMatch />
    </Suspense>
  );
}
