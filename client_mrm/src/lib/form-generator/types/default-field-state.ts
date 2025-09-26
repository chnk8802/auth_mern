export interface FieldState {
  visible?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  reason?: string;
  overridden?: boolean;
}

export type FormData = Record<string, any>;
export type FieldStates = Record<string, FieldState>;

export interface UseFormBuilderResult {
  formData: FormData;
  fieldStates: FieldStates;
  updateValue: (id: string, value: any) => void;
  updateFieldState: (id: string, updates: Partial<FieldState>) => void;
  resetForm: () => void;
}
