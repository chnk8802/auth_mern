"use client";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DeleteConfirmDialog } from "../DeleteConfirmDialog";

type Props = {
  index: number;
  openModal: (i: number | null) => void;
  removeRow: (i: number) => void;
  disabled?: boolean;
};

export function SubformRowAction({
  index,
  openModal,
  removeRow,
  disabled,
}: Props) {
  if (disabled) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => openModal(index)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="py-0" variant="destructive">
          <DeleteConfirmDialog onConfirm={() => removeRow(index)}>
            <Button
              variant="ghost"
              className="flex justify-start w-full p-0 text-destructive hover:text-destructive hover:bg-transparent"
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
