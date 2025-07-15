import { type ModuleField } from "@/lib/form-generator/types/field-types";
import { FormLogicController, type FieldState } from "./FormLogicController";

// The type for the workflow function you pass in per module
export type WorkflowFn = (
  logic: FormLogicController,
  formData: Record<string, any>,
  context?: Record<string, any>
) => void;

export function runWorkflow(
  fields: ModuleField[],
  formData: Record<string, any>,
  workflowFn?: WorkflowFn,
  context?: Record<string, any>
): Record<string, FieldState> {
  const logic = new FormLogicController(fields);

  if (workflowFn) {
    workflowFn(logic, formData, context);
  }

  return logic.getStates();
}
