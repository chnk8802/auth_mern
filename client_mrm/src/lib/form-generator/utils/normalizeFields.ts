import type { ModuleField } from "@/lib/form-generator/types/field-types";

export function normalizeField<T extends ModuleField>(field: T): T {
  return {
    ...field,
    col: field.col ?? 2,
    sectionType: field.sectionType ?? "animated",

    required: field.required ?? false,
    readOnly: field.readOnly ?? false,
    
    editable: field.editable ?? true,
    showInForm: field.showInForm ?? true,
    showInTable: field.showInTable ?? false,
    showInDetails: field.showInDetails ?? true,
    hiddenInCreate: field.hiddenInCreate ?? false,
    hiddenInEdit: field.hiddenInEdit ?? false,
  };
}

export function normalizeFields<T extends ModuleField>(fields: T[]): T[] {
  return fields.map(normalizeField);
}
