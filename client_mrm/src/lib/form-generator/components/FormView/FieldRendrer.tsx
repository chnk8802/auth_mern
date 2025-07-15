import React from "react";
import { type ModuleField } from "@/lib/form-generator/types/field-types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/form/Combobox";
import { MultiSelectCombobox } from "@/components/form/MultiselectCombobox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DateTimePicker } from "@/components/form/DateTimePicker";
import { DateInput } from "@/components/form/DateInput";
import { TimeInput } from "@/components/form/TimeInput";
import { LookupInput } from "@/components/form/LookupInput";
import { Checkbox } from "@/components/ui/checkbox";
import { AddressInput } from "@/components/form/AddressInput";
import { SignatureInput } from "@/components/form/SignatureInput";
import { LocationInput } from "@/components/form/LocationInput";
import { SubformInput } from "@/components/form/SubFormInput";
import clsx from "clsx";

interface FieldRendererProps {
  formMode?: "create" | "edit";
  field: ModuleField;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  formMode,
  field,
  value,
  onChange,
  disabled,
}) => {
  const renderInput = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "phone":
        return (
          <Input
            id={field.id}
            type={field.type === "email" ? "email" : "text"}
            placeholder={field.placeholder}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={field.readOnly || disabled}
            required={field.required}
          />
        );

      case "number":
        return (
          <Input
            id={field.id}
            type="number"
            placeholder={field.placeholder}
            value={value ?? ""}
            onChange={(e) => onChange(Number(e.target.value))}
            disabled={field.readOnly || disabled}
            required={field.required}
          />
        );

      case "textarea":
        return (
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={field.readOnly || disabled}
            required={field.required}
          />
        );

      case "select":
        return (
          <Combobox
            value={value}
            onChange={onChange}
            options={field.options || []}
            placeholder={field.placeholder}
            disabled={field.readOnly || disabled}
            required={field.required}
          />
        );

      case "multiselect":
        return (
          <MultiSelectCombobox
            value={value || []}
            onChange={onChange}
            options={field.options || []}
            placeholder={field.placeholder || "Select one or more"}
            disabled={field.readOnly || disabled}
            required={field.required}
          />
        );
      case "radio":
        return (
          <RadioGroup
            value={value}
            onValueChange={onChange}
            className="flex flex-col gap-2"
            disabled={field.readOnly || disabled}
            required={field.required}
          >
            {field.options.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <RadioGroupItem value={opt.value} />
                <span>{opt.label}</span>
              </label>
            ))}
          </RadioGroup>
        );

      case "date":
        return (
          <DateInput
            id={field.id}
            label={field.label}
            placeholder={field.placeholder}
            value={value ? new Date(value) : undefined}
            onChange={(val) => onChange(val?.toISOString().split("T")[0] ?? "")}
            disabled={field.readOnly || disabled}
            required={field.required}
          />
        );

      case "time":
        return (
          <TimeInput
            id={field.id}
            label={field.label}
            placeholder={field?.placeholder || "00:00:00"}
            value={value}
            onChange={onChange}
            disabled={field.readOnly || disabled}
            required={field.required}
          />
        );

      case "datetime":
        return (
          <DateTimePicker
            value={value ? new Date(value) : undefined}
            onChange={(val) => onChange(val?.toISOString() ?? "")}
            disabled={field.readOnly || disabled}
            required={field.required}
          />
        );

      case "checkbox":
        if (field.options && field.options.length > 0) {
          return (
            <div className="space-y-2">
              {field.options.map((opt) => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.id}-${opt.value}`}
                    checked={
                      Array.isArray(value) ? value.includes(opt.value) : false
                    }
                    onCheckedChange={(checked) => {
                      const updated = checked
                        ? [...(value ?? []), opt.value]
                        : (value ?? []).filter((v: any) => v !== opt.value);
                      onChange(updated);
                    }}
                    disabled={field.readOnly || disabled}
                    required={field.required}
                  />
                  <Label
                    htmlFor={`${field.id}-${opt.value}`}
                    className="text-sm"
                  >
                    {opt.label}
                  </Label>
                </div>
              ))}
            </div>
          );
        }

        return (
          <Checkbox
            checked={!!value}
            onCheckedChange={(checked) => onChange(checked)}
            disabled={field.readOnly || disabled}
            required={field.required}
          />
        );

      case "address":
        return (
          <AddressInput
            field={field}
            value={value ?? {}}
            onChange={onChange}
            disabled={field.readOnly || disabled}
            required={field.required}
          />
        );

      case "file":
        return (
          <Input
            id={field.id}
            type="file"
            onChange={(e) =>
              onChange(e.target.files ? Array.from(e.target.files) : null)
            }
            disabled={field.readOnly || disabled}
            required={field.required}
          />
        );

      case "signature":
        return (
          <SignatureInput
            id={field.id}
            label={field.label}
            value={value}
            onChange={onChange}
            disabled={field.readOnly || disabled}
            required={field.required}
          />
        );

      case "map":
        return (
          <LocationInput
            id={field.id}
            label={field.label}
            value={value}
            address={field.address}
            onChange={(val) => onChange(val)}
            disabled={field.readOnly || disabled}
            required={field.required}
          />
        );
      case "subform":
        return (
          <SubformInput
            id={field.id}
            label={field.label}
            fields={field.fields}
            value={value ?? []}
            onChange={onChange}
            minRows={field.minRows}
            maxRows={field.maxRows}
            disabled={field.readOnly || disabled}
            required={field.required}
          />
        );

      case "lookup":
        return (
          <LookupInput
            field={field}
            value={value || ""}
            onChange={onChange}
            disabled={field.readOnly || disabled}
            required={field.required}
          />
        );

      default:
        return <div>Unsupported field type: {(field as any).type}</div>;
    }
  };

  if (!field.showInForm) return null;
  if (formMode === "create" && field.hiddenInCreate) return null;
  if (formMode === "edit" && field.hiddenInEdit) return null;

  const cssClass = clsx("space-y-1", {
    "sm:w-64": field.type !== "subform",
  });
  return (
    <div className={cssClass}>
      <Label htmlFor={field.id} className="font-semibold pb-1">
        {field.label}{" "}
        {field.required && <span className="text-red-500">*</span>}
      </Label>
      {renderInput()}
      {field.helpText && (
        <p className="text-xs text-muted-foreground">{field.helpText}</p>
      )}
    </div>
  );
};
