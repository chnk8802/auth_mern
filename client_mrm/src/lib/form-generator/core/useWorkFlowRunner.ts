import { useLoggedInUser } from "@/hooks/useCurrentUser";
import type { ModuleField } from "../types/field-types";
import type { ViewContext } from "./FieldViewController";
import { workflow, type WorkflowFn } from "./WorkflowBuilder";

export function useRunWorkflow() {
    const user = useLoggedInUser();

    return (
        viewContext: ViewContext = "create",
        fields: ModuleField[],
        formData: Record<string, any>,
        context: Record<string, any> = {},
        workflowFn?: WorkflowFn
    ) => {
        const fullContext = {
            ...context,  // passed-in context first (caller wins)
            user         // always inject latest user
        };

        return workflow(viewContext, fields, formData, fullContext, workflowFn);
    };
}
