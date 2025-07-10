import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";

interface DetailToolbarProps {
  title: string;
  onEdit?: () => void;
  onDelete?: () => void;
  actions?: ReactNode; // For extra buttons
}

export function DetailToolbar({
  title,
  onEdit,
  onDelete,
  actions,
}: DetailToolbarProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {actions}
        {onEdit && (
          <Button variant="outline" onClick={onEdit}>
            <Edit />
          </Button>
        )}
        {onDelete && (
          <DeleteConfirmDialog onConfirm={onDelete}>
            <Button variant="destructive">
              <Trash2 />
            </Button>
          </DeleteConfirmDialog>
        )}
      </div>
    </div>
  );
}
