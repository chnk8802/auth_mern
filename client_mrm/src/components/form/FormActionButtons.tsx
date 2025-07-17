import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";

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
  onToggleLiveData
}: FormActionButtonsProps) {
  return (
    <div className="flex gap-2 justify-end">
      <div>
        <Button
          type="button"
          onClick={onToggleLiveData}
          variant="outline"
        >
          {showLiveData ? (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              Hide Live Data
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Show Live Data
            </>
          )}
        </Button>
      </div>
      {mode === "create" && (
        <>
          <Button
            type="button"
            onClick={onSave}
            disabled={isSubmitting}
          >
            Save
          </Button>
          <Button
            type="button"
            onClick={onSaveAndNew}
            variant="secondary"
            disabled={isSubmitting}
          >
            Save & New
          </Button>
          <Button
            type="reset"
            onClick={onReset}
            variant="outline"
            disabled={isSubmitting}
          >
            Reset
          </Button>
        </>
      )}

      {mode === "edit" && (
        <>
          <Button
            type="button"
            onClick={onSave}
            disabled={isSubmitting}
          >
            Update
          </Button>
          <Button
            type="reset"
            onClick={onReset}
            variant="outline"
            disabled={isSubmitting}
          >
            Reset
          </Button>
        </>
      )}
    </div>
  );
}
