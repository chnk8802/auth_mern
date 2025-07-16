import { type ModuleField } from "@/lib/form-generator/types/field-types";
import { FieldViewController, type FieldState, type ViewContext } from "./FieldViewController";

// The type for the workflow function you pass in per module
export type WorkflowFn = (
  logic: FieldViewController,
  formData: Record<string, any>,
  context?: Record<string, any>
) => void;

export function workflow(
  viewContext: ViewContext = "create",
  fields: ModuleField[],
  formData: Record<string, any>,
  defaultContext?: Record<string, any>,
  workflowFn?: WorkflowFn,
): Record<string, FieldState> {
  const logic = new FieldViewController(fields, viewContext);

  if (workflowFn) {
    workflowFn(logic, formData, defaultContext);
  }

  return logic.getStates();
}
