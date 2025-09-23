import { ROUTES } from "@/constants/routes.constants";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import React from "react";
import { sparePartEntryFields } from "../config/sparePartEntryFields";
import { useSparePartEntryFieldStates } from "../hooks/useSparePartEntryFieldState";
export interface SparePartEntryFormProps {
  onSubmit: (data: any) => void;
}

export const SparePartEntryAddForm = ({ onSubmit }: SparePartEntryFormProps) => {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const fieldStates = useSparePartEntryFieldStates(formData);

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit?.(formData);
    setTimeout(() => setIsSubmitting(false), 300); // simulate delay
  };

  const handleReset = () => {
    setFormData({});
    setIsSubmitting(false);
  };

  return (
    <FormBuilder
      title="Spare Part Entry"
      mode="create"
      fieldStateMap={fieldStates}
      fieldsConfig={sparePartEntryFields}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onReset={handleReset}
      isSubmitting={isSubmitting}
    />
  );
};
