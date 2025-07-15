/**
 * Field Configuration Schema
 * --------------------------
 * This file defines a unified, type-safe configuration schema for building dynamic forms, 
 * tables, and detail views across modules in the application.
 * 
 *  Purpose:
 * - Centralize field definitions for Create, Edit, List, and Detail views.
 * - Serve as the schema input for dynamic UI generators (form builder, column builder, etc).
 * - Enable conditional rendering, view-specific visibility, validation, and layout metadata.
 * 
 *   Base Design:
 * - `BaseField`: Shared properties used across all field types.
 * - `FieldType`: Discriminator union used for rendering logic.
 * - Extended interfaces (e.g., `TextField`, `SelectField`, `FileField`) define specific props.
 * 
 *  View Filtering Example:
 * ```ts
 * const createFields = fields.filter(f => f.showInForm !== false && !f.hiddenInCreate);
 * const editFields   = fields.filter(f => f.showInForm !== false && !f.hiddenInEdit);
 * const columns      = fields.filter(f => f.showInTable);
 * const details      = fields.filter(f => f.showInDetails !== false);
 * ```
 * 
 *  Common View Control Flags:
 * - `showInForm` (default: true)   → used in Create/Edit forms
 * - `showInTable` (default: false) → used in List/Table view
 * - `showInDetails` (default: true)→ used in Detail view
 * - `editable`, `readOnly`, `visible`, `hiddenInCreate`, `hiddenInEdit` → fine-grained controls
 * 
 *  Usage:
 * - Import `ModuleField` to define fields for a module.
 * - Feed the array of fields to form/column/detail generators.
 * - Extend field types as needed (e.g., for custom widgets).
 * 
 * Author: Naveen
 * Date: 15/07/2025
 */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "time"
  | "datetime"
  | "select"
  | "multiselect"
  | "lookup"
  | "radio"
  | "checkbox"
  | "email"
  | "phone"
  | "address"
  | "file"
  | "subform"
  | "signature"
  | "map";

export interface BaseField {
  id: string;
  label: string;
  type: FieldType;
  defaultValue?: any;
  placeholder?: string;
  helpText?: string;

  required?: boolean;
  readOnly?: boolean;
  visible?: boolean;
  // Layout
  section?: string; // section title
  col?: number;    // optional field-level column span
  sectionType?: "animated" | "basic";
  // These control where this field appears
  showInForm?: boolean;      // default: true
  showInTable?: boolean;     // default: false
  showInDetails?: boolean;   // default: true
  editable?: boolean;        // true/false in edit form
  hiddenInCreate?: boolean;
  hiddenInEdit?: boolean;
}

export interface TextField extends BaseField {
  type: "text";
  maxLength?: number;
}

export interface TextareaField extends BaseField {
  type: "textarea";
  rows?: number;
  maxLength?: number;
}

export interface NumberField extends BaseField {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}

export interface DateField extends BaseField {
  type: "date";
}

export interface TimeField extends BaseField {
  type: "time";
}

export interface DateTimeField extends BaseField {
  type: "datetime";
}

export interface SelectField extends BaseField {
  type: "select";
  options: { label: string; value: string }[];
}

export interface MultiSelectField extends BaseField {
  type: "multiselect";
  options: { label: string; value: string }[];
}

export interface LookupField extends BaseField {
  type: "lookup";
  module: string; // reference module name or ID
  displayField: string; // field to display from referenced entity
}

export interface RadioField extends BaseField {
  type: "radio";
  options: { label: string; value: string }[];
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
  options?: { label: string; value: string }[]; // optional for multi-checkbox
}

export interface EmailField extends BaseField {
  type: "email";
}

export interface PhoneField extends BaseField {
  type: "phone";
  countryCode?: {
    enabled: boolean; // whether to show country selector
    default?: string; // e.g., "IN", "US"
    allowed?: string[]; // limit to specific countries
  };
  format?: "national" | "international"; // how to format display
}


export interface AddressField extends BaseField {
  type: "address";
  components?: {
    street?: TextField;
    city?: TextField;
    state?: SelectField;
    country?: SelectField;
    postalCode?: TextField;
  };
}

export interface FileField extends BaseField {
  type: "file";
  accept?: string[];
  multiple?: boolean;
  maxSizeMB?: number;
}

export interface SubformField extends BaseField {
  type: "subform";
  fields: ModuleField[];  
  minRows?: number;
  maxRows?: number;
}

export interface SignatureField extends BaseField {
  type: "signature";
}

export interface MapField extends BaseField {
  type: "map";
  address?: string;
  showCoordinates?: boolean;
}

export type ModuleField =
  | TextField
  | TextareaField
  | NumberField
  | DateField
  | TimeField
  | DateTimeField
  | SelectField
  | MultiSelectField
  | LookupField
  | RadioField
  | CheckboxField
  | EmailField
  | PhoneField
  | AddressField
  | FileField
  | SubformField
  | SignatureField
  | MapField;
