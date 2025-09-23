import React from "react";
import clsx from "clsx";
import type { ModuleField } from "@/lib/form-generator/types/field-types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/form/Combobox";
import { MultiSelectCombobox } from "@/components/form/MultiselectCombobox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DateTimePicker } from "@/components/form/DateTimePicker";
import { DateInput } from "@/components/form/DateInput";
import { LookupInput } from "@/components/form/LookupInput";
import { Checkbox } from "@/components/ui/checkbox";
import { AddressInput } from "@/components/form/AddressInput";
import { SignatureInput } from "@/components/form/SignatureInput";
import { LocationInput } from "@/components/form/LocationInput";
import { FileInput } from "@/components/form/FileInput";
import { FormatLookup, toDate } from "@/lib/utils";
import { SubformInputGrid } from "@/components/form/SubFormInputGrid";
import { TimePicker } from "@/components/form/TimePicker";
import { SubformInputModal } from "@/components/form/SubformInputModal";

interface FieldRendererProps {
  formMode?: "create" | "edit";
  field: ModuleField;
  value: any;
  onChange: (value: any) => void;
  defaultValue?: any;
  disabled?: boolean;
  readOnly?: boolean;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  formMode,
  field,
  value,
  onChange,
  defaultValue,
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
            field={field}
            value={Array.isArray(value) ? value : []}
            onChange={onChange}
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
            value={value}
            onChange={onChange}
            key={field.id}
            options={field.options}
            placeholder={field.placeholder}
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
            value={FormatLookup(value) ?? ""}
            onChange={onChange}
            field={field}
          />
        );

      // ---------------- BASIC DATE/TIME ----------------
      case "date":
        return (
          <DateInput
            field={field}
            value={value ? toDate(value) : undefined} // convert server string to Date
            onChange={(val) => onChange(val?.toISOString().split("T")[0] ?? "")} // keep ISO yyyy-MM-dd for server
          />
        );

      case "time":
        return (
          <TimePicker
            field={field}
            value={value} // format server string for TimePicker
            onChange={onChange}
          />
        );

      case "datetime":
        return <DateTimePicker field={field} value={value} />;

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
          <SubformInputModal
            field={field}
            value={value ?? []}
            onChange={onChange}
            disabled={disabled}
          />
        );
      // return (
      //   <SubformInputGrid
      //     field={field}
      //     value={value ?? []}
      //     onChange={onChange}
      //     disabled={disabled}
      //   />
      // );

      case "signature":
        return (
          <SignatureInput field={field} value={value} onChange={onChange} />
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
