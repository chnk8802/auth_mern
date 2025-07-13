"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type AddressField } from "@/lib/form-generator/types/field-types";
import { Combobox } from "./Combobox";
import { indianStates } from "@/constants/indianStates";
import { countries } from "@/constants/countries";

type Props = {
  field: AddressField;
  value: Record<string, any>;
  onChange: (val: Record<string, any>) => void;
  disabled?: boolean;
};

export function AddressInput({ field, value = {}, onChange, disabled }: Props) {
  const handleChange = (key: string, val: any) => {
    onChange({ ...value, [key]: val });
  };

  const { components = {} } = field;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {components.street && (
        <div>
          {/* <Label htmlFor={components.street.id}>{components.street.label}</Label> */}
          <Input
            id={components.street.id}
            value={value.street ?? ""}
            placeholder={components.street.placeholder || "Enter Street"}
            onChange={(e) => handleChange("street", e.target.value)}
            disabled={disabled}
          />
        </div>
      )}

      {components.city && (
        <div>
          {/* <Label htmlFor={components.city.id}>{components.city.label}</Label> */}
          <Input
            id={components.city.id}
            value={value.city ?? ""}
            placeholder={components.city.placeholder || "Enter City"}
            onChange={(e) => handleChange("city", e.target.value)}
            disabled={disabled}
          />
        </div>
      )}

      {components.state && (
        <div>
          {/* <Label htmlFor={components.state.id}>{components.state.label}</Label> */}
          <Combobox
            id={components.state.id}
            options={indianStates || components.state.options || "Select State"}
            value={value.state ?? ""}
            onChange={(val) => handleChange("state", val)}
            placeholder={components.state.placeholder || "Select state"}
            disabled={disabled}
          />
        </div>
      )}

      {components.country && (
        <div>
          {/* <Label htmlFor={components.country.id}>{components.country.label}</Label> */}
          <Combobox
            id={components.country.id}
            options={ countries || components.country.options  || "Select Country"}
            value={value.country ?? ""}
            onChange={(val) => handleChange("country", val)}
            placeholder={components.country.placeholder || "Select country"}
            disabled={disabled}
          />
        </div>
      )}

      {components.postalCode && (
        <div>
          {/* <Label htmlFor={components.postalCode.id}>{components.postalCode.label}</Label> */}
          <Input
            id={components.postalCode.id}
            value={value.postalCode ?? ""}
            placeholder={components.postalCode.placeholder || "Enter Postal Code"}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
}
