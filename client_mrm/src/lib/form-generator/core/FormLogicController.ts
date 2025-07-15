import type { ModuleField } from "@/lib/form-generator/types/field-types";

// What each field can have manipulated
export interface FieldState {
  visible?: boolean;
  disabled?: boolean;
}

export class FormLogicController {
  private fields: ModuleField[];
  private stateMap: Record<string, FieldState> = {};

  // Initialize state map with default values
  constructor(fields: ModuleField[]) {
    this.fields = fields;
    for (const field of fields) {
      this.stateMap[field.id] = {
        visible: field.visible ?? true,
        disabled: field.readOnly ?? false,
      };
    }
  }

  // Internal check
  private ensureFieldExists(fieldId: string) {
    if (!(fieldId in this.stateMap)) {
      throw new Error(`Field "${fieldId}" does not exist.`);
    }
  }

  // Hide a field
  hide(fieldId: string) {
    this.ensureFieldExists(fieldId);
    this.stateMap[fieldId].visible = false;
  }

  // Show a field
  show(fieldId: string) {
    this.ensureFieldExists(fieldId);
    this.stateMap[fieldId].visible = true;
  }

  // Disable a field
  disable(fieldId: string) {
    this.ensureFieldExists(fieldId);
    this.stateMap[fieldId].disabled = true;
  }

  // Enable a field
  enable(fieldId: string) {
    this.ensureFieldExists(fieldId);
    this.stateMap[fieldId].disabled = false;
  }

  // Set full state manually
  set(fieldId: string, state: FieldState) {
    this.ensureFieldExists(fieldId);
    this.stateMap[fieldId] = {
      ...this.stateMap[fieldId],
      ...state,
    };
  }

  // Final computed result to pass to FormBuilder
  getStates(): Record<string, FieldState> {
    return this.stateMap;
  }
}
