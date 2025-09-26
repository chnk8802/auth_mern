// hooks/useFormBuilder.tsx
import React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import type { ModuleField } from "@/lib/form-generator/types/field-types";
import type { FieldState } from "@/lib/form-generator/types/default-field-state";

/** Helpers */
function buildInitialFormData(fields: ModuleField[], initialValues: Record<string, any> = {}) {
  const data: Record<string, any> = { ...initialValues };
  fields.forEach((f) => {
    if (data[f.id] !== undefined) return;
    if (f.type === "subform" || f.type === "multiselect") data[f.id] = [];
    else if (f.defaultValue !== undefined) data[f.id] = f.defaultValue;
    else data[f.id] = f.type === "checkbox" ? false : "";
  });
  return data;
}

function buildInitialFieldStates(fields: ModuleField[], mode: "create" | "edit" = "create") {
  const states: Record<string, FieldState> = {};
  fields.forEach((f) => {
    const visible =
      f.showInForm !== false &&
      !(mode === "create" && f.hiddenInCreate) &&
      !(mode === "edit" && f.hiddenInEdit);
    states[f.id] = {
      visible,
      disabled: !!f.disabled,
      readOnly: !!f.readOnly,
      required: !!f.required,
    };
  });
  return states;
}

/** Hook */
export function useFormBuilder(
  fields: ModuleField[],
  options?: {
    mode?: "create" | "edit";
    initialValues?: Record<string, any>;
    validate?: (form: Record<string, any>) => Promise<Record<string, string>> | Record<string, string>;
  }
) {
  const mode = options?.mode ?? "create";
  const initialFormData = useMemo(() => buildInitialFormData(fields, options?.initialValues), [fields, options?.initialValues]);
  const initialFieldStates = useMemo(() => buildInitialFieldStates(fields, mode), [fields, mode]);
  const [formData, setFormData] = useState<Record<string, any>>(initialFormData);
  const [fieldStates, setFieldStates] = useState<Record<string, FieldState>>(initialFieldStates);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // rules: fieldId -> Set<fn(formData) => Partial<FieldState>>
  const rulesRef = useRef<Record<string, Set<(form: Record<string, any>) => Partial<FieldState> | null>>>({});
  // subform rules: subformId -> Set<fn(row) => Partial<Record<childId, Partial<FieldState>>>>
  const subformRulesRef = useRef<Record<string, Set<(row: any) => Partial<Record<string, Partial<FieldState>>> | null>>>({});

  // Register rule
  const registerRule = useCallback((fieldId: string, ruleFn: (form: Record<string, any>) => Partial<FieldState> | null) => {
    rulesRef.current[fieldId] ??= new Set();
    rulesRef.current[fieldId].add(ruleFn);
    return () => rulesRef.current[fieldId]?.delete(ruleFn);
  }, []);

  const registerSubformRule = useCallback((subformId: string, ruleFn: (row: any) => Partial<Record<string, Partial<FieldState>>> | null) => {
    subformRulesRef.current[subformId] ??= new Set();
    subformRulesRef.current[subformId].add(ruleFn);
    return () => subformRulesRef.current[subformId]?.delete(ruleFn);
  }, []);

  // evaluate all simple rules and patch fieldStates
  const evaluateRules = useCallback((latestForm: Record<string, any>) => {
    setFieldStates(prev => {
      const current = { ...prev };
      let changed = false;

      for (const [fieldId, setOfFns] of Object.entries(rulesRef.current)) {
        if (!setOfFns) continue;
        for (const fn of Array.from(setOfFns)) {
          try {
            const delta = fn(latestForm);
            if (delta) {
              const prevState = current[fieldId] ?? {};
              const merged = { ...prevState, ...delta, overridden: true };
              if (JSON.stringify(merged) !== JSON.stringify(prevState)) {
                current[fieldId] = merged;
                changed = true;
              }
            }
          } catch (err) {
            console.error("rule error", fieldId, err);
          }
        }
      }

      return changed ? current : prev;
    });
  }, []);


  // subform evaluation helper for a given row and subform
  const getSubformFieldState = useCallback((subformId: string, row: any, childFieldId: string) => {
    // base state comes from global field state for child; fallback to empty
    const baseState = fieldStates[childFieldId] ?? {};
    const rules = subformRulesRef.current[subformId];
    if (!rules || rules.size === 0) return baseState;
    let merged = { ...baseState };
    for (const fn of Array.from(rules)) {
      try {
        const delta = fn(row); // delta: { childFieldId: Partial<FieldState> }
        if (delta && delta[childFieldId]) {
          merged = { ...merged, ...delta[childFieldId], overridden: true };
        }
      } catch (err) {
        console.error("subform rule error", subformId, err);
      }
    }
    return merged;
  }, [fieldStates]);

  // Update top-level value
  const updateValue = useCallback((fieldId: string, value: any) => {
    setFormData((prev) => {
      const next = { ...prev, [fieldId]: value };
      // re-evaluate rules
      evaluateRules(next);
      return next;
    });
  }, [evaluateRules]);

  // Update entire field state manually (external override)
  const updateFieldState = useCallback((fieldId: string, partial: Partial<FieldState>) => {
    setFieldStates((prev) => {
      const next = { ...prev, [fieldId]: { ...(prev[fieldId] ?? {}), ...partial } };
      return next;
    });
  }, []);

  // Subform helpers
  const addSubformRow = useCallback((subformId: string, row: any = {}) => {
    setFormData((prev) => {
      const arr = Array.isArray(prev[subformId]) ? [...prev[subformId]] : [];
      arr.push(row);
      const next = { ...prev, [subformId]: arr };
      evaluateRules(next);
      return next;
    });
  }, [evaluateRules]);

  const updateSubformRow = useCallback((subformId: string, index: number, row: any) => {
    setFormData((prev) => {
      const arr = Array.isArray(prev[subformId]) ? [...prev[subformId]] : [];
      arr[index] = { ...arr[index], ...row };
      const next = { ...prev, [subformId]: arr };
      evaluateRules(next);
      return next;
    });
  }, [evaluateRules]);

  const removeSubformRow = useCallback((subformId: string, index: number) => {
    setFormData((prev) => {
      const arr = Array.isArray(prev[subformId]) ? [...prev[subformId]] : [];
      arr.splice(index, 1);
      const next = { ...prev, [subformId]: arr };
      evaluateRules(next);
      return next;
    });
  }, [evaluateRules]);

  // reset
  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setFieldStates(initialFieldStates);
    setErrors({});
  }, [initialFormData, initialFieldStates]);

  // validate form (calls optional validate function)
  const validateForm = useCallback(async () => {
    if (!options?.validate) return { valid: true, errors: {} };
    const result = await options.validate(formData);
    setErrors(result);
    return { valid: Object.keys(result || {}).length === 0, errors: result };
  }, [formData, options?.validate]);

  // Update formData if initialValues change (for edit forms)
  // React.useEffect(() => {
  //   if (options?.initialValues) {
  //     // const newData = buildInitialFormData(fields, options.initialValues);
  //     console.log(options.initialValues)
  //     // setFormData(newData);
  //     // also re-evaluate rules
  //     // evaluateRules(newData);
  //   }
  // }, [options?.initialValues, fields]);

  return {
    formData,
    fieldStates,
    errors,
    updateValue,
    updateFieldState,
    addSubformRow,
    updateSubformRow,
    removeSubformRow,
    registerRule,
    registerSubformRule,
    getSubformFieldState,
    resetForm,
    validateForm,
  };
}