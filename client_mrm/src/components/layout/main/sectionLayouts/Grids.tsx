import type { ReactNode } from "react";

const colClassMap: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
  7: "sm:grid-cols-7",
  8: "sm:grid-cols-8",
  9: "sm:grid-cols-9",
  10: "sm:grid-cols-10",
  11: "sm:grid-cols-11",
  12: "sm:grid-cols-12",
};


type ColumnGridProps = {
  children: ReactNode;
  col?: number;
};

export function ColumnGrid({ children, col = 2 }: ColumnGridProps) {
  const smCols = colClassMap[col] || "sm:grid-cols-2";
  return (
    <div className={`grid grid-cols-1 ${smCols} gap-x-6 gap-y-4`}>
      {children}
    </div>
  );
}

