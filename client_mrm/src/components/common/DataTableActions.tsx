import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

export function DataTableActions({ data, onEdit, onDelete }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(data.userCode);
          }}
        >
          Copy Code
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onEdit(data);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
        >
          <DeleteConfirmDialog
            onConfirm={() => {
              onDelete(data);
            }}
          >
            <Button className="p-0" variant="ghost" onClick={(e) => e.stopPropagation()}>Delete</Button>
          </DeleteConfirmDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
