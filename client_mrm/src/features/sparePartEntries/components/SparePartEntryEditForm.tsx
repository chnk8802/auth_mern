import React from "react";
import { sparePartEntryFields } from "@/features/sparePartEntries/config/sparePartEntryFields";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import { ROUTES } from "@/constants/routes.constants";
import type { SparePartEntry } from "@/features/sparePartEntries/types";
import { useForm, useWatch } from "react-hook-form";
import { useSparePartEntryFieldStates } from "../hooks/useSparePartEntryFieldState";

export interface SparePartEntryFormProps {
  sparePartEntry: SparePartEntry;
  onSubmit: (data: any) => void;
}

export const SparePartEntryEditForm = ({
  sparePartEntry,
  onSubmit,
}: SparePartEntryFormProps) => {
  const form = useForm<SparePartEntry>({
    defaultValues: sparePartEntry,
  });

  const formValues = useWatch({
    control: form.control,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const fieldStates = useSparePartEntryFieldStates(formValues);

  const handleChange = (fieldId: string, value: any) => {
    form.setValue(fieldId as keyof SparePartEntry, value, {
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
      title="Spare Part Entry"
      mode="edit"
      fieldStateMap={fieldStates}
      fieldsConfig={sparePartEntryFields}
      formData={formValues}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};
