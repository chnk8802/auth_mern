import type { ReactNode } from "react";

export function DetailGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6">{children}</div>
  );
}
