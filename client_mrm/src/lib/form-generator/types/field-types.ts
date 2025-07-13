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
  required?: boolean;
  readOnly?: boolean;
  visible?: boolean;
  defaultValue?: any;
  placeholder?: string;
  helpText?: string;
  section?: string; // section title
  col?: number;    // optional field-level column span
  sectionType?: "animated" | "basic";
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
  options: { label: string; value: string | number }[];
}

export interface MultiSelectField extends BaseField {
  type: "multiselect";
  options: { label: string; value: string | number }[];
}

export interface LookupField extends BaseField {
  type: "lookup";
  module: string; // reference module name or ID
  displayField: string; // field to display from referenced entity
}

export interface RadioField extends BaseField {
  type: "radio";
  options: { label: string; value: string | number }[];
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
  options?: { label: string; value: string | number }[]; // optional for multi-checkbox
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
  fields: BaseField[];  
  minRows?: number;
  maxRows?: number;
}

export interface SignatureField extends BaseField {
  type: "signature";
}

export interface MapField extends BaseField {
  type: "map";
  showCoordinates?: boolean;
}

export type FormField =
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
