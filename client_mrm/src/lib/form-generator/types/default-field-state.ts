export interface FieldState {
  /**
   * Whether the field is rendered
   */
  visible?: boolean;

  /**
   * Whether the field is interactive (cannot be clicked or typed)
   */
  disabled?: boolean;

  /**
   * Whether the field value is locked (can be viewed but not changed)
   */
  readOnly?: boolean;

  /**
   * Override the "required" flag dynamically
   */
  required?: boolean;

  /**
   * Allows logic to override the displayed value
   */
  valueOverride?: any;

  /**
   * Optional reason for state changes, useful for debugging or UI messaging
   */
  reason?: string;

  /**
   * Optional flag to indicate this was changed by workflow logic
   */
  overridden?: boolean;
}
