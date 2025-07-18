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

interface FieldRendererProps {
  formMode?: "create" | "edit";
  field: ModuleField;
  value: any;
  onChange: (value: any) => void;
  visible?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  formMode,
  field,
  value,
  onChange,
  visible,
  disabled,
  readOnly,
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
            readOnly={field.readOnly || readOnly}
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
            value={value ?? ""}
            onChange={(e) => onChange(Number(e.target.value))}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      case "textarea":
        return (
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

      case "select":
        return (
          <Combobox
            value={value}
            onChange={onChange}
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

      case "checkbox":
        if (field.options!.length > 0) {
          return (
            <div className="space-y-2">
              {field.options!.map((opt) => (
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
                    required={field.required}
                    disabled={field.readOnly || disabled}
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
            onCheckedChange={onChange}
            required={field.required}
            disabled={field.readOnly || disabled}
          />
        );

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

      case "file":
  return (
    <div className="space-y-2">
      <label htmlFor={field.id} className="block font-medium text-sm">
        {field.label} {field.required && "*"}
      </label>
      <input
        id={field.id}
        type="file"
        onChange={(e) =>
          onChange(e.target.files ? Array.from(e.target.files) : [])
        }
        required={field.required}
        disabled={field.readOnly || disabled}
        multiple={field.multiple}
        accept={(field.accept ?? []).join(",")}
        className="block w-full border border-gray-300 rounded px-3 py-2 text-sm"
      />
      {Array.isArray(value) && value.length > 0 && (
        <ul className="text-sm text-gray-600">
          {value.map((file: File, i: number) => (
            <li key={i}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
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

      default:
        return <div>Unsupported field type: {(field as any).type}</div>;
    }
  };

  if (!field.showInForm) return null;
  if (formMode === "create" && field.hiddenInCreate) return null;
  if (formMode === "edit" && field.hiddenInEdit) return null;
  if (visible) return null;

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
