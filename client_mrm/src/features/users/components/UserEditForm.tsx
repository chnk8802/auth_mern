"use client";

import React from "react";
import { useForm, useWatch } from "react-hook-form";
import type { User } from "../types";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import { ROUTES } from "@/constants/routes.constants";
import { userFields } from "../config/userFields";
import { useUserFieldState } from "../hooks/useUserFieldState";

type EditUserFormProps = {
  user: User;
  onSubmit: (data: User) => void;
};

export function EditUserForm({ user, onSubmit }: EditUserFormProps) {
  const form = useForm<User>({
    defaultValues: user,
  });

  const formValues = useWatch({
    control: form.control
  })
  const fieldStates = useUserFieldState(formValues);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
    // const fieldStates = useCustomerFieldStates(formValues);

  const handleChange = (fieldId: string, value: any) => {
    form.setValue(fieldId as keyof User, value, {
      shouldValidate: true,
      shouldDirty: true
    })
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit(form.getValues());
    setTimeout(() => setIsSubmitting(false), 300);
  };

  return (
    <FormBuilder
      title="Edit User"
      mode="edit"
      fieldsConfig={userFields}
      formData={formValues}
      fieldStateMap={fieldStates}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
