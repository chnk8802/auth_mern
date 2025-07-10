import { Copy, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";

type DataTableActionsProps<T> = {
  data: any;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  copyField?: keyof T;
};

export function DataTableActions<T>({
  data,
  onEdit,
  onDelete,
  copyField,
}: DataTableActionsProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {copyField && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(data[copyField]);
            }}
          >
            Copy Code <Copy />
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onEdit(data);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="py-0" variant="destructive">
          <DeleteConfirmDialog
            onConfirm={() => {
              onDelete(data);
            }}
          >
            <Button
              className="p-0 text-destructive hover:text-destructive hover:bg-transparent"
              variant="ghost"
              onClick={(e) => e.stopPropagation()}
            >
              Delete
            </Button>
          </DeleteConfirmDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
