// hooks/useFormBuilder.ts
import { useState } from "react";
import type { ModuleField } from "../types/field-types";
import type { FieldState, FieldStates, FormData, UseFormBuilderResult } from "../types/default-field-state";

export function useFormBuilder(fields: ModuleField[]): UseFormBuilderResult {
  const [formData, setFormData] = useState<FormData>(() => {
    const init: FormData = {};
    for (const f of fields) {
      init[f.id] = f.defaultValue ?? null;
    }
    return init;
  });

  const [fieldStates, setFieldStates] = useState<FieldStates>(() => {
    const init: FieldStates = {};
    for (const f of fields) {
      init[f.id] = {
        visible: true,
        disabled: false,
        readOnly: false,
        required: f.required ?? false,
        
      };
    }
    return init;
  });

  const updateValue = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const updateFieldState = (id: string, updates: Partial<FieldState>) => {
    setFieldStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...updates },
    }));
  };

  const resetForm = () => {
    setFormData({});
    setFieldStates({});
  };

  return {
    formData,
    fieldStates,
    updateValue,
    updateFieldState,
    resetForm,
  };
}
