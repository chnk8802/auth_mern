import type { WorkflowFn } from "@/lib/form-generator/core/WorkflowBuilder";

export const customerWorkflow: WorkflowFn = (logic, formData, context) => {
  const { currentUser } = context || {};
  // console.log("currentUser", currentUser)
  // logic.disable("fullName");
};
