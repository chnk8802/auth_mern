import React from "react";
import { repairJobFields } from "../config/repairJobFields";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import { ROUTES } from "@/constants/routes.constants";
import { type RepairJob } from "../types";
import { useForm, useWatch } from "react-hook-form";
import { useRepairJobFieldStates } from "../hooks/useRepairJobFieldStates";


export interface RepairJobFormProps {
  repairJob: RepairJob;
  onSubmit: (data: any) => void;
}

export const RepairJobEditForm = ({ repairJob, onSubmit }: RepairJobFormProps) => {
  const form = useForm<RepairJob>({
    defaultValues: repairJob,
  });
  const formValues = useWatch({
    control: form.control,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const fieldStates = useRepairJobFieldStates(formValues);

  const handleChange = (fieldId: string, value: any) => {
    form.setValue(fieldId as keyof RepairJob, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit(form.getValues());
    setTimeout(() => setIsSubmitting(false), 300);
  };

  return (
    <FormBuilder
      title="Repair Job"
      backLink={ROUTES.REPAIR_JOBS.DETAILS(repairJob._id)}
      mode="edit"
      fieldStateMap={fieldStates}
      fieldsConfig={repairJobFields}
      formData={formValues}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};
