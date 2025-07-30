import type { ModuleField } from "@/lib/form-generator/types/field-types";

/**
 * Normalize a single ModuleField with default values based on type
 */
export function normalizeField<T extends ModuleField>(field: T): T {
  const common: Partial<ModuleField> = {
    col: field.col ?? 2,
    sectionType: field.sectionType ?? "animated",

    required: field.required ?? false,
    readOnly: field.readOnly ?? false,
    visible: field.visible ?? true,
    hiddenInCreate: field.hiddenInCreate ?? false,
    hiddenInEdit: field.hiddenInEdit ?? false,

    showInForm: field.showInForm ?? true,
    showInTable: field.showInTable ?? true,
    showInDetails: field.showInDetails ?? true,
  };

  switch (field.type) {
    case "text":
      return {
        ...field,
        ...common,
        maxLength: field.maxLength ?? 255,
      };

    case "textarea":
      return {
        ...field,
        ...common,
        rows: field.rows ?? 4,
        maxLength: field.maxLength ?? 1000,
      };

    case "number":
      return {
        ...field,
        ...common,
        min: field.min ?? 0,
        max: field.max ?? undefined,
        step: field.step ?? 1,
        prefix: field.prefix ?? "",
        suffix: field.suffix ?? "",
      };

    case "currency":
      return {
        ...field,
        ...common,
        currencyCode: field.currencyCode ?? "USD",
        showSymbol: field.showSymbol ?? true,
        min: field.min ?? 0,
        max: field.max ?? undefined,
        decimals: field.decimals ?? 2,
        allowNegative: field.allowNegative ?? false,
      };

    case "select":
    case "multiselect":
    case "radio":
      return {
        ...field,
        ...common,
        options: field.options ?? [],
      };

    case "checkbox":
      return {
        ...field,
        ...common,
        defaultValue: field.defaultValue ?? false,
        options: field.options ?? [],
      };

    case "lookup":
      return {
        ...field,
        ...common,
        module: field.module,
        displayField: field.displayField,
      };

    case "phone":
      return {
        ...field,
        ...common,
        countryCode: field.countryCode ?? { enabled: false },
        format: field.format ?? "international",
      };

    case "address":
      return {
        ...field,
        ...common,
        components: field.components ?? {},
      };

    case "file":
      return {
        ...field,
        ...common,
        accept: field.accept ?? [],
        multiple: field.multiple ?? false,
        maxSizeMB: field.maxSizeMB ?? 10,
      };

    case "subform":
      return {
        ...field,
        ...common,
        fields: field.fields?.map(normalizeField) ?? [],
        minRows: field.minRows ?? 0,
        maxRows: field.maxRows ?? undefined,
      };

    case "map":
      return {
        ...field,
        ...common,
        address: field.address ?? "",
        showCoordinates: field.showCoordinates ?? false,
      };

    case "signature":
    case "email":
    case "date":
    case "time":
    case "datetime":
    default:
      return {
        ...field,
        ...common,
      };
  }
}
