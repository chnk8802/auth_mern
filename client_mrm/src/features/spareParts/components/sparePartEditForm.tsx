import React from "react";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import { ROUTES } from "@/constants/routes.constants";
import { useForm, useWatch } from "react-hook-form";
import { sparePartConfig } from "../config/sparePartFields";
import type { SparePart } from "../types";
import { useSparePartFieldStates } from "../hooks/useSparePartFieldState";

export interface SparePartFormProps {
  sparePart: SparePart;
  onSubmit: (data: any) => void;
}

export const SparePartEditForm = ({ sparePart, onSubmit }: SparePartFormProps) => {
  const form = useForm<SparePart>({
    defaultValues: sparePart,
  });
  const formValues = useWatch({
    control: form.control,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const fieldStates = useSparePartFieldStates(formValues);

  const handleChange = (fieldId: string, value: any) => {
    form.setValue(fieldId as keyof SparePart, value, {
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
      title="Spare Part"
      backLink={ROUTES.SPARE_PARTS.DETAILS(sparePart._id)}
      mode="edit"
      fieldStateMap={fieldStates}
      fieldsConfig={sparePartConfig}
      formData={formValues}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};
