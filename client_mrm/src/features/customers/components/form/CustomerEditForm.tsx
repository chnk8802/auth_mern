import React from "react";
import { customerFields } from "@/features/customers/config/customerFields";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import { ROUTES } from "@/constants/routes";
import type { Customer } from "@/features/customers/types";
import { useForm, useWatch } from "react-hook-form";
import { useCustomerFieldStates } from "../../hooks/useCustomerFieldState";

export interface CustomerFormProps {
  customer: Customer;
  onSubmit: (data: any) => void;
}

export const CustomerEditForm = ({ customer, onSubmit }: CustomerFormProps) => {
  const form = useForm<Customer>({
    defaultValues: customer,
  });
  const formValues = useWatch({
    control: form.control,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const fieldStates = useCustomerFieldStates(formValues);



  const handleChange = (fieldId: string, value: any) => {
    form.setValue(fieldId as keyof Customer, value, {
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
      title="Customer"
      backLink={ROUTES.CUSTOMERS.DETAILS(customer._id)}
      mode="edit"
      fieldStateMap={fieldStates}
      fields={customerFields}
      formData={formValues}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};
