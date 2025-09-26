"use client";

import * as React from "react";
import { repairJobFields } from "../config/repairJobFields";
import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import { useFormBuilderContext } from "@/lib/form-generator/context/FormBulderContext";
import type { RepairJob } from "../types";
import type { SparePartEntry } from "@/features/sparePartEntries/types";

type AddRepairJobFormProps = {
  onSubmit: (data: any) => void;
};

export function AddRepairJobForm({ onSubmit }: AddRepairJobFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // 🔑 Access FormBuilderContext API
  const api = useFormBuilderContext();

  // Register field visibility / rules
  React.useEffect(() => {
    if (!api) return;

    // Show "technician" only when repairStatus === "assigned"
    const unregister1 = api.registerRule("technician", (form: RepairJob) => ({
      visible: form.repairStatus === "assigned",
    }));

    // Subform: per-row visibility rules
    const unregister2 = api.registerSubformRule("sparePartEntries", (row: SparePartEntry) => {
      if (!row) return null;
      return row.sourceType === "external"
        ? { supplier: { visible: true }, sparePart: { visible: false } }
        : { supplier: { visible: false }, sparePart: { visible: true } };
    });

    return () => {
      unregister1();
      unregister2();
    };
  }, [api]);

  // Handle form submit
  const handleSubmit = (formDataFromBuilder: any) => {
    setIsSubmitting(true);
    onSubmit(formDataFromBuilder);
    setIsSubmitting(false);
  };

  return (
    <FormBuilder
      title="Repair Job"
      mode="create"
      fieldsConfig={repairJobFields}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}


// "use client";

// import * as React from "react";
// import { repairJobFields } from "../config/repairJobFields";
// import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
// import type { SparePartEntry } from "@/features/sparePartEntries/types";

// type AddRepairJobFormProps = {
//   onSubmit: (data: any) => void;
// };

// export function AddRepairJobForm({ onSubmit }: AddRepairJobFormProps) {
//   const [formData, setFormData] = React.useState<{ sparePartEntries: SparePartEntry[] }>({
//     sparePartEntries: [],
//   });
//   const [isSubmitting, setIsSubmitting] = React.useState(false);
//   // const fieldStates = useRepairJobFieldStates(formData);

//   const handleChange = (fieldId: string, value: any) => {
//     setFormData((prev) => ({ ...prev, [fieldId]: value }));
//   };

//   const handleSubmit = () => {
//     setIsSubmitting(true);
//     onSubmit?.(formData);
//     setTimeout(() => setIsSubmitting(false), 300);
//   };

//   const handleReset = () => {
//     setFormData({ sparePartEntries: [] });
//     setIsSubmitting(false);
//   };

//   return (
//     <FormBuilder
//       title="Repair Job"
//       mode="create"
//       fieldsConfig={repairJobFields}
//       onSubmit={handleSubmit}
//       isSubmitting={isSubmitting}
//     />
//   );
// }
