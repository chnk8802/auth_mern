import { useState } from "react";
import { TestForm } from "@/lib/form-generator/demo/TestForm";
import { testFields } from "./testFields";

export const FormGeneratorPage = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (fieldId: string, value: any) => {
    const updated = {
      ...formData,
      [fieldId]: value,
    };
    setFormData(updated);
  };

  return (
    <TestForm fieldsConfig={testFields} formData={formData} onChange={handleChange} />
  );
};
