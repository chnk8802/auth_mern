import type { WorkflowFn } from "@/lib/form-generator/core/runWorkflow";

export const customerWorkflow: WorkflowFn = (logic, formData, context) => {
  const { currentUser } = context || {};
  console.log("currentUser", currentUser)
  logic.disable("fullName");
};
