"use client";

import * as React from "react";
import { ROUTES } from "@/constants/routes";
import { repairJobFields } from "../config/repiarJobFields";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";

type AddRepairJobFormProps = {
  onSubmit: (data: any) => void;
};

export function AddRepairJobForm({ onSubmit }: AddRepairJobFormProps) {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // const fieldStates = useRepairJobFieldStates(formData);

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };
  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit?.(formData);
    setTimeout(() => setIsSubmitting(false), 300);
  };
  const handleReset = () => {
    setFormData({});
    setIsSubmitting(false);
  };

  return (
    <FormBuilder
      title="Repair Job"
      backLink={ROUTES.REPAIR_JOBS.LIST}
      mode="create"
      // fieldStateMap={fieldStates}
      fields={repairJobFields}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onReset={handleReset}
      isSubmitting={isSubmitting}
    />
  );
}
