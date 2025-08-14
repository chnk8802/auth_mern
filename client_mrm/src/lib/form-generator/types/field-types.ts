/**
 * List of all supported field types
 */
export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "currency"
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

/**
 * Shared base properties for all field types
 */
export interface BaseField {
  /**
   * Unique identifier for the field (used as the key in form data)
   */
  id: string;

  /**
   * Display label for the field
   */
  label: string;

  /**
   * Type of field (e.g., text, number, select, etc.)
   */
  type: FieldType;

  /**
   * Default value used to initialize the field
   */
  defaultValue?: any;

  /**
   * Placeholder text shown inside the input when it's empty
   */
  placeholder?: string;

  /**
   * Optional helper text displayed below the field for guidance
   */
  helpText?: string;

  /**
   * Whether the field is required to be filled
   */
  required?: boolean;

  /**
   * Whether the field is read-only (can be viewed but not edited)
   */
  readOnly?: boolean;

  /**
   * Whether the field is rendered in the form (in both create and edit)
   */
  visible?: boolean;

  /**
   * Whether the field is hidden when creating a new entry
   */
  hiddenInCreate?: boolean;

  /**
   * Whether the field is hidden when editing an existing entry
   */
  hiddenInEdit?: boolean;

  // Layout

  /**
   * Optional title of the section this field belongs to
   */
  section?: string;

  /**
   * Optional column span (e.g., for grid layouts)
   */
  col?: number;

  /**
   * Defines the visual type of the section (e.g., animated tabs or simple grouping)
   */
  sectionType?: "animated" | "basic";

  // Display Controls

  /**
   * Whether this field should be shown in forms (default: true)
   */
  showInForm?: boolean;

  /**
   * Whether this field should be shown in table views (default: false)
   */
  showInTable?: boolean;

  /**
   * Whether this field should be shown in detail views (default: true)
   */
  showInDetails?: boolean;
}

/**
 * Single-line text input
 */
export interface TextField extends BaseField {
  type: "text";
  /**
   * Maximum character length
   */
  maxLength?: number;
}

/**
 * Multi-line text input
 */
export interface TextareaField extends BaseField {
  type: "textarea";
  /**
   * Number of visible rows
   */
  rows?: number;
  /**
   * Maximum character length
   */
  maxLength?: number;
}

/**
 * Numeric input field
 */
export interface NumberField extends BaseField {
  type: "number";
  /**
   * Minimum allowed value
   */
  min?: number;
  /**
   * Maximum allowed value
   */
  max?: number;
  /**
   * Increment step for the input
   */
  step?: number;
  /**
   * Optional prefix to display (e.g., "$")
   */
  prefix?: string;
  /**
   * Optional suffix to display (e.g., "kg")
   */
  suffix?: string;
}

/**
 * Currency input field with formatting and symbol
 */
export interface CurrencyField extends BaseField {
  type: "currency";

  /**
   * Currency code (e.g., "USD", "EUR", "INR")
   */
  currencyCode?: string;

  /**
   * Whether to include the currency symbol in the UI (e.g., "$")
   */
  showSymbol?: boolean;

  /**
   * Minimum allowed value
   */
  min?: number;

  /**
   * Maximum allowed value
   */
  max?: number;

  /**
   * Number of decimal places (default: 2)
   */
  decimals?: number;

  /**
   * Whether to allow negative values
   */
  allowNegative?: boolean;
}

/**
 * Date input field (YYYY-MM-DD)
 */
export interface DateField extends BaseField {
  type: "date";
}

/**
 * Time input field (HH:MM)
 */
export interface TimeField extends BaseField {
  type: "time";
}

/**
 * Combined date and time input field
 */
export interface DateTimeField extends BaseField {
  type: "datetime";
}

/**
 * Dropdown single-select field
 */
export interface SelectField extends BaseField {
  type: "select";
  /**
   * List of selectable options
   */
  options: { label: string; value: string }[];
}

/**
 * Dropdown multi-select field
 */
export interface MultiSelectField extends BaseField {
  type: "multiselect";
  /**
   * List of selectable options
   */
  options: { label: string; value: string }[];
}

/**
 * Lookup field for referencing another module/entity
 */
export interface LookupField extends BaseField {
  type: "lookup";
  /**
   * Module name or ID to reference
   */
  module: string;
  /**
   * Field from the referenced module to display
   */
  displayField: string;

  /**
   * Optional criteria for filtering lookup options
   */
  criteria?: Record<string, any>;
}

/**
 * Radio button group field
 */
export interface RadioField extends BaseField {
  type: "radio";
  /**
   * List of options (single-select)
   */
  options: { label: string; value: string }[];
}

/**
 * Checkbox input (single or multi-checkbox)
 */
export interface CheckboxField extends BaseField {
  type: "checkbox";
  /**
   * Optional list of options for multiple checkboxes
   */
  options?: { label: string; value: string }[];
}

/**
 * Email input field
 */
export interface EmailField extends BaseField {
  type: "email";
}

/**
 * Phone input field with optional country code handling
 */
export interface PhoneField extends BaseField {
  type: "phone";
  /**
   * Country code configuration
   */
  countryCode?: {
    /**
     * Whether to show country selector
     */
    enabled: boolean;
    /**
     * Default country code (e.g., "US", "IN")
     */
    default?: string;
    /**
     * Limit selection to specific countries
     */
    allowed?: string[];
  };
  /**
   * Display format: national or international
   */
  format?: "national" | "international";
}

/**
 * Structured address field with subfields
 */
export interface AddressField extends BaseField {
  type: "address";
  /**
   * Address components (each is a subfield)
   */
  components?: {
    street?: TextField;
    city?: TextField;
    state?: SelectField;
    country?: SelectField;
    postalCode?: TextField;
  };
}

/**
 * File upload field
 */
export interface FileField extends BaseField {
  type: "file";
  /**
   * List of accepted MIME types or file extensions
   */
  accept?: string[];
  /**
   * File type (e.g., "image", "pdf")
   */
  fileType?: "image" | "pdf";
  /**
   * Whether multiple files can be uploaded
   */
  multiple?: boolean;
  /**
   * Maximum file size in megabytes
   */
  maxSizeMB?: number;
}

/**
 * Nested subform (for repeating groups of fields)
 */
export interface SubformField extends BaseField {
  type: "subform";
  /**
   * Fields that make up the subform
   */
  fields: ModuleField[];
  /**
   * Minimum number of rows allowed
   */
  minRows?: number;
  /**
   * Maximum number of rows allowed
   */
  maxRows?: number;
}

/**
 * Signature input (drawn or signed by user)
 */
export interface SignatureField extends BaseField {
  type: "signature";
}

/**
 * Map input for selecting a location
 */
export interface MapField extends BaseField {
  type: "map";
  /**
   * Optional address text to use as initial marker
   */
  address?: string;
  /**
   * Whether to show latitude and longitude
   */
  showCoordinates?: boolean;
}

/**
 * Represents any kind of supported field in the form generator.
 * 
 * - **Basic Fields**: Commonly used inputs for standard forms.
 * - **Advanced Fields**: Specialized or composite inputs with extra functionality.
 */
export type ModuleField =
  // ===== BASIC FIELDS =====
  /** Single-line text input */
  | TextField
  /** Multi-line text area */
  | TextareaField
  /** Numeric input */
  | NumberField
  /** Currency input (formatted number) */
  | CurrencyField
  /** File upload input */
  | FileField
  /** Email address input */
  | EmailField
  /** Phone number input */
  | PhoneField
  /** Radio button selection (single choice) */
  | RadioField
  /** Checkbox selection (boolean or multi-choice) */
  | CheckboxField
  /** Dropdown selection (single choice) */
  | SelectField
  /** Multi-select dropdown (multiple choices) */
  | MultiSelectField
  /** Date picker */
  | DateField
  /** Time picker */
  | TimeField
  /** Combined date & time picker */
  | DateTimeField

  // ===== ADVANCED FIELDS =====
  /** Lookup field (search & select from external source) */
  | LookupField
  /** Structured address input */
  | AddressField
  /** Nested form inside a form */
  | SubformField
  /** Signature capture (drawn or uploaded) */
  | SignatureField
  /** Map location picker */
  | MapField;


export interface FieldSection {
  /**
   * Section title or label
   */
  section: string;

  /**
   * Section layout type (e.g., animated tabs or plain grouping)
   */
  sectionType: "animated" | "basic";

  /**
   * Number of columns in this section (e.g., 1, 2, 3)
   */
  col: number;

  /**
   * List of fields in this section
   */
  fields: ModuleField[];
}

/**
 * Complete FieldConfig type for a form
 * It's just an array of sections
 */
export type FieldConfig = FieldSection[];
