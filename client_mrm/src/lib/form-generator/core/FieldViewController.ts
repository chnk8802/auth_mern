import type { ModuleField } from "@/lib/form-generator/types/field-types";

export type ViewContext = "create" | "edit" | "list" | "details";

export interface FieldState {
  visible?: boolean;
  disabled?: boolean;
}

export class FieldViewController {
  private context: ViewContext;
  private fields: ModuleField[];
  private stateMap: Record<string, FieldState> = {};

  constructor(fields: ModuleField[], context: ViewContext) {
    this.context = context;
    this.fields = this.filterFieldsForView(fields, context);

    // Only setup dynamic field state for form views
    if (context === "create" || context === "edit") {
      for (const field of this.fields) {
        this.stateMap[field.id] = {
          disabled: field.readOnly ?? false,
        };
      }
    }
  }

  /**
   * Filters fields based on view-specific flags.
   */
  private filterFieldsForView(fields: ModuleField[], context: ViewContext): ModuleField[] {
    return fields.filter(field => {
      if (context === "create") {
        return field.showInForm !== false && !field.hiddenInCreate;
      }
      if (context === "edit") {
        return field.showInForm !== false && !field.hiddenInEdit;
      }
      if (context === "list") {
        return field.showInTable === true;
      }
      if (context === "details") {
        return field.showInDetails !== false;
      }
      return true;
    });
  }

  /**
   * Returns the filtered fields for the current context.
   */
  getFields(): ModuleField[] {
    return this.fields;
  }

  /**
   * Returns dynamic form field state (only applicable for form views).
   */
  getStates(): Record<string, FieldState> {
    if (this.context !== "create" && this.context !== "edit") {
      throw new Error(`getStates() is only available in 'create' or 'edit' context.`);
    }
    return this.stateMap;
  }

  private ensureFormView() {
    if (this.context !== "create" && this.context !== "edit") {
      throw new Error(`This operation is only allowed in 'create' or 'edit' form context.`);
    }
  }

  private ensureFieldExists(fieldId: string) {
    if (!(fieldId in this.stateMap)) {
      throw new Error(`Field "${fieldId}" does not exist in state map.`);
    }
  }

  /** Show a field at runtime */
  show(fieldId: string) {
    this.ensureFormView();
    this.ensureFieldExists(fieldId);
    this.stateMap[fieldId].visible = true;
  }

  /** Hide a field at runtime */
  hide(fieldId: string) {
    this.ensureFormView();
    this.ensureFieldExists(fieldId);
    this.stateMap[fieldId].visible = false;
  }

  /** Disable a field at runtime */
  disable(fieldId: string) {
    this.ensureFormView();
    this.ensureFieldExists(fieldId);
    this.stateMap[fieldId].disabled = true;
  }

  /** Enable a field at runtime */
  enable(fieldId: string) {
    this.ensureFormView();
    this.ensureFieldExists(fieldId);
    this.stateMap[fieldId].disabled = false;
  }

  /** Update field state in bulk */
  set(fieldId: string, state: FieldState) {
    this.ensureFormView();
    this.ensureFieldExists(fieldId);
    this.stateMap[fieldId] = {
      ...this.stateMap[fieldId],
      ...state,
    };
  }
}
