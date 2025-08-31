import React from "react";
import clsx from "clsx";
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
import { FileInput } from "@/components/form/FileInput";

interface FieldRendererProps {
  formMode?: "create" | "edit";
  field: ModuleField;
  value: any;
  onChange: (value: any) => void;
  defaultValue?: any;
  visible?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  formMode,
  field,
  value,
  onChange,
  defaultValue,
  visible,
  disabled,
  readOnly,
}) => {
  const renderInput = () => {
    switch (field.type) {
      // ---------------- BASIC FIELDS ----------------
      case "text":
        return (
          <Input
            id={field.id}
            type="text"
            placeholder={field.placeholder}
            value={String(value ?? defaultValue ?? "")}
            onChange={(e) => onChange(e.target.value)}
            readOnly={field.readOnly || readOnly}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      case "textarea":
        return (
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            value={String(value ?? defaultValue ?? "")}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      case "number":
        return (
          <Input
            id={field.id}
            type="number"
            placeholder={field.placeholder}
            value={value ?? defaultValue ?? ""}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );
      case "currency":
        return (
          <Input
          id={field.id}
            type="number"
            placeholder={field.placeholder}
            value={value ?? defaultValue ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              onChange(val === "" ? null : Number(val));
            }}
          />
        );

      case "file":
        return (
          <FileInput
            id={field.id}
            label={field.label}
            value={Array.isArray(value) ? value : []}
            onChange={onChange}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      case "email":
        return (
          <Input
            id={field.id}
            type="email"
            placeholder={field.placeholder}
            value={String(value ?? defaultValue ?? "")}
            onChange={(e) => onChange(e.target.value)}
            readOnly={field.readOnly || readOnly}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      case "phone":
        return (
          <Input
            id={field.id}
            type="tel"
            placeholder={field.placeholder}
            value={String(value ?? defaultValue ?? "")}
            onChange={(e) => onChange(e.target.value)}
            readOnly={field.readOnly || readOnly}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      // ---------------- BASIC SELECTORS ----------------
      case "radio":
        return (
          <RadioGroup
            value={value}
            onValueChange={onChange}
            className="flex flex-col gap-2"
            required={field.required}
            disabled={field.readOnly || disabled}
          >
            {field.options.map((opt) => (
              <Label
                key={opt.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <RadioGroupItem value={opt.value} />
                <span>{opt.label}</span>
              </Label>
            ))}
          </RadioGroup>
        );

      case "checkbox":
        if (field.options?.length) {
          return (
            <div className="space-y-2">
              {field.options.map((opt) => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.id}-${opt.value}`}
                    checked={Array.isArray(value) && value.includes(opt.value)}
                    onCheckedChange={(checked) => {
                      const updated = checked
                        ? [...(value ?? []), opt.value]
                        : (value ?? []).filter((v: any) => v !== opt.value);
                      onChange(updated);
                    }}
                    required={field.required}
                    disabled={field.readOnly || disabled}
                  />
                  <Label htmlFor={`${field.id}-${opt.value}`}>
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
            onCheckedChange={onChange}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      case "select":
        return (
          <Combobox
            key={field.id}
            value={value}
            onChange={onChange}
            options={field.options}
            placeholder={field.placeholder}
            defaultValue={defaultValue ?? ""}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      case "multiselect":
        return (
          <MultiSelectCombobox
            value={value ?? []}
            onChange={onChange}
            options={field.options}
            placeholder={field.placeholder}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      case "lookup":
        return (
          <LookupInput
            field={field}
            value={value ?? ""}
            onChange={onChange}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      // ---------------- BASIC DATE/TIME ----------------
      case "date":
        return (
          <DateInput
            id={field.id}
            label={field.label}
            placeholder={field.placeholder}
            value={value ? new Date(value) : undefined}
            onChange={(val) => onChange(val?.toISOString().split("T")[0] ?? "")}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      case "time":
        return (
          <TimeInput
            id={field.id}
            label={field.label}
            placeholder={field.placeholder}
            value={value}
            onChange={onChange}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      case "datetime":
        return (
          <DateTimePicker
            value={value ? new Date(value) : undefined}
            onChange={(val) => onChange(val?.toISOString() ?? "")}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      // ---------------- ADVANCED ----------------
      case "address":
        return (
          <AddressInput
            field={field}
            value={value ?? {}}
            onChange={onChange}
            required={field.required}
            disabled={field.readOnly || disabled}
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
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      case "signature":
        return (
          <SignatureInput
            id={field.id}
            label={field.label}
            value={value}
            onChange={onChange}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      case "map":
        return (
          <LocationInput
            id={field.id}
            label={field.label}
            address={field.address}
            value={value}
            onChange={onChange}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      default:
        return <div>Unsupported field type: {(field as any).type}</div>;
    }
  };

  if (!field.showInForm) return null;
  if (formMode === "create" && field.hiddenInCreate) return null;
  if (formMode === "edit" && field.hiddenInEdit) return null;
  if (visible === false) return null;

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
