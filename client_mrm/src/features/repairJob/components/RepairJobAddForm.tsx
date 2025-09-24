"use client";

import * as React from "react";
import { repairJobFields } from "../config/repairJobFields";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import type { SparePartEntry } from "@/features/sparePartEntries/types";

type AddRepairJobFormProps = {
  onSubmit: (data: any) => void;
};

export function AddRepairJobForm({ onSubmit }: AddRepairJobFormProps) {
  const [formData, setFormData] = React.useState<{ sparePartEntries: SparePartEntry[] }>({
    sparePartEntries: [],
  });
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
    setFormData({ sparePartEntries: [] });
    setIsSubmitting(false);
  };

  return (
    <FormBuilder
      title="Repair Job"
      mode="create"
      // fieldStateMap={fieldStates}
      fieldsConfig={repairJobFields}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onReset={handleReset}
      isSubmitting={isSubmitting}
    />
  );
}
