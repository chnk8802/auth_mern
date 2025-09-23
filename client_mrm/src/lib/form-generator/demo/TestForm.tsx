/*
TestForm
  - runs `useRunWorkflow` → gets `stateMap`
  - passes `formData` and `stateMap` to FormBuilder

FormBuilder
  - uses `stateMap[field.id]` to determine:
      - should it render the field?
      - should it disable the input?

FieldRenderer
  - receives `disabled` (from `stateMap`)
  - conditionally disables or skips rendering the input
*/


import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import { type FieldConfig} from "@/lib/form-generator/types/field-types";
import { ROUTES } from "@/constants/routes.constants";
import React from "react";
// import { testStateMap } from "./testWorkflow";

type TestFormProps = {
  fieldsConfig: FieldConfig;
  formData: Record<string, any>;
  onChange: (fieldId: string, value: any) => void;
};

export const TestForm: React.FC<TestFormProps> = ({
  fieldsConfig,
  formData,
  onChange
}) => {
  const mode: "create" | "edit" = "create";
  return (
    <>
      <FormBuilder
        mode={mode}
        fieldsConfig={fieldsConfig}
        formData={formData}
        // fieldStateMap={testStateMap}
        onChange={onChange}
        onSubmit={() => {
          console.log("Saving:", formData);
        }}
        onReset={() => {
          console.log("Reset clicked");
        }}
      />
    </>
  );
};
