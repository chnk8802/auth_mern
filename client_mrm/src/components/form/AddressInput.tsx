"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type AddressField } from "@/lib/form-generator/types/field-types";
import { Combobox } from "./Combobox";
import { INDIAN_STATES } from "@/constants/indianStates";
import { COUNTRY } from "@/constants/countries";

type Props = {
  field: AddressField;
  value: Record<string, any>;
  onChange: (val: Record<string, any>) => void;
  disabled?: boolean;
  required?: boolean;
};

export function AddressInput({ field, value = {}, onChange, disabled, required}: Props) {
  const handleChange = (key: string, val: any) => {
    onChange({ ...value, [key]: val });
  };

  const { components = {} } = field;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 pt-2">
      {components.street && (
        // <div className="sm:flex sm:justify-between">
          <div>
          <Label className="pb-4 sm:pb-2" htmlFor={components.street.id}>{components.street.label}</Label>
          <Input
            id={components.street.id}
            value={value.street ?? ""}
            placeholder={components.street.placeholder || "Enter Street"}
            onChange={(e) => handleChange("street", e.target.value)}
            disabled={disabled}
            required={required}
            className="sm:w-64"
          />
        </div>
      )}

      {components.city && (
        // <div className="sm:flex sm:justify-between">
        <div>
          <Label className="pb-4 sm:pb-2" htmlFor={components.city.id}>{components.city.label}</Label>
          <Input
            id={components.city.id}
            value={value.city ?? ""}
            placeholder={components.city.placeholder || "Enter City"}
            onChange={(e) => handleChange("city", e.target.value)}
            disabled={disabled}
            required
            className="sm:w-64"
          />
        </div>
      )}

      {components.state && (
        // <div className="sm:flex sm:justify-between">
        <div>
          <Label className="pb-4 sm:pb-2" htmlFor={components.state.id}>{components.state.label}</Label>
          <Combobox
            id={components.state.id}
            options={INDIAN_STATES || components.state.options || "Select State"}
            value={value.state ?? ""}
            onChange={(val) => handleChange("state", val)}
            placeholder={components.state.placeholder || "Select state"}
            disabled={disabled}
            required={required}
          />
        </div>
      )}

      {components.country && (
        // <div className="sm:flex sm:justify-between">
        <div>
          <Label className="pb-4 sm:pb-2" htmlFor={components.country.id}>{components.country.label}</Label>
          <Combobox
            id={components.country.id}
            options={ COUNTRY || components.country.options  || "Select Country"}
            value={value.country ?? ""}
            onChange={(val) => handleChange("country", val)}
            placeholder={components.country.placeholder || "Select country"}
            disabled={disabled}
            required={required}
          />
        </div>
      )}

      {components.postalCode && (
        // <div className="sm:flex sm:justify-between">
        <div>
          <Label className="pb-4 sm:pb-2" htmlFor={components.postalCode.id}>{components.postalCode.label}</Label>
          <Input
            id={components.postalCode.id}
            value={value.postalCode ?? ""}
            placeholder={components.postalCode.placeholder || "Enter Postal Code"}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            disabled={disabled}
            required={required}
            className="sm:w-64"
          />
        </div>
      )}
    </div>
  );
}
