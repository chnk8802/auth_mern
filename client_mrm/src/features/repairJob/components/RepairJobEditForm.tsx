"use client";

import * as React from "react";
import { repairJobFields } from "../config/repairJobFields";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import type { RepairJob } from "../types";

export interface RepairJobFormProps {
  data: RepairJob;
  onSubmit: (data: RepairJob) => void;
}

export const RepairJobEditForm = ({ data, onSubmit }: RepairJobFormProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (formData: RepairJob) => {
    setIsSubmitting(true);
    console.log("formData", formData)
    onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <FormBuilder
      title="Repair Job"
      mode="edit"
      fieldsConfig={repairJobFields}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      initialValues={data}
    />
  );
};