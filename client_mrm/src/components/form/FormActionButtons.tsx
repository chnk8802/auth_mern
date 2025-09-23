import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type FormMode = "create" | "edit";

type FormActionButtonsProps = {
  mode: FormMode;
  isSubmitting: boolean;
  onSave: () => void;
  onSaveAndNew?: () => void;
  onReset?: () => void;
  showLiveData: boolean;
  onToggleLiveData: () => void;
};

export function FormActionButtons({
  mode,
  isSubmitting,
  onSave,
  onSaveAndNew,
  onReset,
  showLiveData,
  onToggleLiveData,
}: FormActionButtonsProps) {
  return (
    <div className="flex gap-2 justify-end">
      {/* Primary Action */}
      <Button onClick={onSave} disabled={isSubmitting} >
        {mode === "create" ? "Save" : "Update"}
      </Button>

      {/* Secondary actions in a menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {mode === "create" ? (
            <>
              <DropdownMenuItem onClick={onSaveAndNew} disabled={isSubmitting}>
                Save & New
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onReset} disabled={isSubmitting}>
                Reset
              </DropdownMenuItem>
            </>
          ) : (
            <></>
          )}
          <DropdownMenuItem onClick={onToggleLiveData}>
            {showLiveData ? <>Hide </> : <>Show </>}
            Live Form Data
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
