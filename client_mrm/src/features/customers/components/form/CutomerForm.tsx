  import { useState } from "react";
  import { customerFields} from "@/features/customers/components/form/customerFields"
  import { customerWorkflow } from "../../workflows/workflow";
  import { FormBuilder } from "@/lib/form-generator/components/FormBuilder";
  import type { AuthUser } from "@/features/auth/types";

 export interface CustomerFormProps {
  currentUser: AuthUser;
}

export const CustomerForm = ({ currentUser }: CustomerFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  return (
    <FormBuilder
      fields={customerFields}
      formData={formData}
      onChange={handleChange}
      workflow={customerWorkflow}
      context={{ currentUser }}
    />
  );
};

