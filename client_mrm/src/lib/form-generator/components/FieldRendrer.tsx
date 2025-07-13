import React from "react";
import { type FormField } from "@/lib/form-generator/types/field-types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/common/Combobox";
import { MultiSelectCombobox } from "@/components/common/MultiselectCombobox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DateTimePicker } from "@/components/common/DateTimePicker";
import { DateInput } from "@/components/common/DateInput";
import { TimeInput } from "@/components/common/TimeInput";

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
            placeholder={field.placeholder}
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
