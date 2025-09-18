import React from "react";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import { ROUTES } from "@/constants/routes";
import { useForm, useWatch } from "react-hook-form";
import { supplierConfig } from "../config/supplierConfig";
import type { Supplier } from "../types";
// import { useSupplierFieldStates } from "../hooks/useSupplierFieldState";

export interface SupplierFormProps {
  supplier: Supplier;
  onSubmit: (data: any) => void;
}

export const SupplierEditForm = ({ supplier, onSubmit }: SupplierFormProps) => {
  const form = useForm<Supplier>({
    defaultValues: supplier,
  });

  const formValues = useWatch({
    control: form.control,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // const fieldStates = useSupplierFieldStates(formValues);

  const handleChange = (fieldId: string, value: any) => {
    form.setValue(fieldId as keyof Supplier, value, {
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
      title="Supplier"
      backLink={ROUTES.SUPPLIERS.DETAILS(supplier._id)}
      mode="edit"
      // fieldStateMap={fieldStates}
      fieldsConfig={supplierConfig}
      formData={formValues}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};
