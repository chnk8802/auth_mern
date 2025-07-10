export type FieldType = "string" | "number" | "boolean" | "date" | "object" | "array" | "enum";

export interface FieldSchema {
  key: string; // field key
  label?: string; // human label
  type: FieldType; // field type
  enumValues?: string[]; // if type is "enum"
  referenceKey?: string; // for object like customer._id or populated fields
  required?: boolean;
  hiddenInTable?: boolean;
  hiddenInForm?: boolean;
}

export interface ModelSchema {
  modelName: string;
  fields: FieldSchema[];
  primaryKey?: string; // default is "_id"
  createdAt?: boolean; // if true, adds a createdAt field
  updatedAt?: boolean; // if true, adds an updatedAt field
  actions?: {
    edit?: boolean; // if true, allows editing
    delete?: boolean; // if true, allows deleting
    view?: boolean; // if true, allows viewing details
  };
  relations?: {
    [key: string]: {
      type: "one" | "many";
      model: string;
    };
  };
  customActions?: {
    [key: string]: {
      label: string;
      action: (row: any) => void; // function to execute on click
    };
  };
  validation?: {
    [key: string]: {
      required?: boolean; // if true, field is required
      minLength?: number; // minimum length for strings
      maxLength?: number; // maximum length for strings
      pattern?: RegExp; // regex pattern for validation
    };
  };
  sort?: {
    defaultField?: string; // field to sort by by default
    defaultOrder?: "asc" | "desc"; // default sort order
  };
  pagination?: {
    pageSize?: number; // default number of items per page
    pageSizes?: number[]; // available page sizes
  };
  filters?: {
    [key: string]: {
      type: "text" | "select" | "date"; // filter type
      options?: string[]; // options for select filters
      defaultValue?: any; // default value for the filter
    };
  };
  search?: {
    enabled?: boolean; // if true, enables search functionality
    fields?: string[]; // fields to search in
  };
  ui?: {
    hidden?: boolean; // if true, hides the model from the UI
    icon?: string; // optional icon for the model
  };
  [key: string]: any; // allow additional properties
}