import React from "react";
import { type FormField } from "@/lib/form-generator/types/field-types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/form/Combobox";
import { MultiSelectCombobox } from "@/components/form/MultiselectCombobox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DateTimePicker } from "@/components/form/DateTimePicker";
import { DateInput } from "@/components/form/DateInput";
import { TimeInput } from "@/components/form/TimeInput";
import { LookupInput } from "@/components/common/LookupInput";
import { Checkbox } from "@/components/ui/checkbox";
import { AddressInput } from "@/components/form/AddressInput";
import { SignatureInput } from "@/components/form/SignatureInput";
import { LocationInput } from "@/components/form/LocationInput";
import { SubformInput } from "@/components/form/SubFormInput";

interface FieldRendererProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
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
            placeholder={field.placeholder}
            disabled={disabled}
            type={field.type === "email" ? "email" : "text"}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "number":
        return (
          <Input
            id={field.id}
            placeholder={field.placeholder}
            disabled={disabled}
            type="number"
            value={value ?? ""}
            onChange={(e) => onChange(Number(e.target.value))}
          />
        );

      case "textarea":
        return (
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            disabled={disabled}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "select":
        return (
          <Combobox
            value={value}
            onChange={onChange}
            options={field.options || []}
            placeholder={field.placeholder}
          />
        );

      case "multiselect":
        return (
          <MultiSelectCombobox
            value={value || []}
            onChange={onChange}
            options={field.options || []}
            placeholder={field.placeholder || "Select one or more"}
          />
        );
      case "radio":
        return (
          <RadioGroup
            value={value}
            onValueChange={onChange}
            className="flex flex-col gap-2"
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
            disabled={disabled}
          />
        );

      case "datetime":
        return (
          <DateTimePicker
            value={value ? new Date(value) : undefined}
            onChange={(val) => onChange(val?.toISOString() ?? "")}
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
                    disabled={disabled}
                  />
                  <label
                    htmlFor={`${field.id}-${opt.value}`}
                    className="text-sm"
                  >
                    {opt.label}
                  </label>
                </div>
              ))}
            </div>
          );
        }

        return (
          <Checkbox
            checked={!!value}
            onCheckedChange={(checked) => onChange(checked)}
            disabled={disabled}
          />
        );

      case "address":
        return (
          <AddressInput
            field={field}
            value={value ?? {}}
            onChange={onChange}
            disabled={disabled}
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
            disabled={disabled}
          />
        );

      case "signature":
        return (
          <SignatureInput
            id={field.id}
            label={field.label}
            value={value}
            onChange={onChange}
            disabled={disabled}
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
            disabled={disabled}
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
            disabled={disabled}
          />
        );

      // case "lookup":
      //   const options = [
      //     { value: "1", label: "Apple" },
      //     { value: "2", label: "Banana" },
      //     { value: "3", label: "Cherry" },
      //   ];
      //   return (
      //     <LookupInput
      //       value={value}
      //       onChange={onChange}
      //       options={options}
      //       placeholder={field.placeholder}
      //       disabled={disabled}
      //     />
      //   );

      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  return (
    <div className="space-y-1">
      <Label htmlFor={field.id}>{field.label}</Label>
      {renderInput()}
      {field.helpText && (
        <p className="text-xs text-muted-foreground">{field.helpText}</p>
      )}
    </div>
  );
};
