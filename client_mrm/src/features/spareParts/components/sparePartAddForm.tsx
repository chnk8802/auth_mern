import React from "react";
import { sparePartConfig } from "../config/sparePartFields";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import { ROUTES } from "@/constants/routes.constants";
import { useSparePartFieldStates } from "../hooks/useSparePartFieldState";

export interface SparePartFormProps {
  onSubmit: (data: any) => void;
}

export const SparePartAddForm = ({ onSubmit }: SparePartFormProps) => {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const fieldStates = useSparePartFieldStates(formData);

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };
  const handleSubmit = () => {
      setIsSubmitting(true);
      onSubmit?.(formData);
      setTimeout(() => setIsSubmitting(false), 300); // Simulate delay
    };
    const handleReset = () => {
    setFormData({})
    setIsSubmitting(false);
  };

  return (
    <FormBuilder
      title="Spare Part"
      backLink={ROUTES.SPARE_PARTS.LIST}
      mode="create"
      fieldStateMap={fieldStates}
      fieldsConfig={sparePartConfig}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onReset={handleReset}
      isSubmitting={isSubmitting}
    />
  );
};
