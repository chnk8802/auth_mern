import { MoveLeft, MoveRight } from "lucide-react";
import { Button } from "../ui/button";

type PaginationProps = {
  page: number;
  total: number;
  limit: number;
  onPageChange: (newPage: number) => void;
  onLimitChange?: (newLimit: number) => void;
};

export function Pagination({ page, total, limit, onPageChange, onLimitChange }: PaginationProps) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="fixed bottom-0 w-screen bg-gray-100 flex items-center justify-between py-4">
      <div>
        Page {page} of {totalPages}
      </div>
      <div className="flex gap-2 items-center">
        {onLimitChange && (
          <select
            className="border rounded px-2 py-1 text-sm"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
          >
            {[10, 20, 50, 100].map((val) => (
              <option key={val} value={val}>
                {val} / page
              </option>
            ))}
          </select>
        )}
        <Button variant="secondary" onClick={() => onPageChange(page - 1)}>
          <MoveLeft/>
        </Button>
        <Button variant="secondary" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
          <MoveRight/>
        </Button>
      </div>
    </div>
  );
}
