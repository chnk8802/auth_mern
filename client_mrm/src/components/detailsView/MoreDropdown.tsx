import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import type { ReactNode } from "react";
import { DeleteConfirmDialog } from "../form/DeleteConfirmDialog";

type MoreDropdownProps = {
  onDownloadPdf: () => void;
  onPrint: () => void;
  onDelete: () => void;
  actions?: ReactNode | ReactNode[];
};

export function MoreDropdown({
  onDownloadPdf,
  onPrint,
  onDelete,
  actions,
}: MoreDropdownProps) {
  const renderActions = () => {
    if (!actions) return null;

    if (Array.isArray(actions)) {
      return actions.map((action, index) => (
        <DropdownMenuItem key={index}>{action}</DropdownMenuItem>
      ));
    }

    return <DropdownMenuItem>{actions}</DropdownMenuItem>;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>More Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onDownloadPdf()}>
            Download PDF
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onPrint()}>Print</DropdownMenuItem>
          <DropdownMenuItem className="py-0" variant="destructive">
            <DeleteConfirmDialog onConfirm={onDelete}>
              <Button
              variant={"ghost"}
              className="flex justify-start w-full p-0 text-destructive hover:text-destructive hover:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Delete
              </Button>
            </DeleteConfirmDialog>
          </DropdownMenuItem>

          {actions && <DropdownMenuSeparator />}
          {renderActions()}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
