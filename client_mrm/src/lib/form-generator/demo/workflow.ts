import { useRunWorkflow } from "../core/useWorkFlowRunner";
import { testFields } from "./testFields";

const runWorkflow = useRunWorkflow();

export const testStateMap = runWorkflow(
    "edit",
    testFields,
    {},
    {},
    (logic, formData) => {
        if (formData.type === "admin") {
            logic.hide("basicPermissions");
        }
    },
);