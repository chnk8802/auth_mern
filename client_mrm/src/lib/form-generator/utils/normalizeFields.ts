import type { ModuleField, FieldConfig } from "@/lib/form-generator/types/field-types";
import { normalizeField } from "./normalizeField";

/**
 * Normalize a flat list of ModuleFields
 */
export function normalizeFields<T extends ModuleField>(fields: T[] = []): T[] {
  return fields.map(normalizeField);
}

/**
 * Normalize a FieldConfig (i.e., FieldSection[])
 */
export function normalizeFieldConfig(config: FieldConfig): FieldConfig {
  return config.map((section) => ({
    ...section,
    fields: normalizeFields(section.fields),
  }));
}
