import { useState } from "react";
import { TestForm } from "@/lib/form-generator/demo/TestForm";
import { testFields } from "@/lib/form-generator/demo/testFields";

export const FormGeneratorPage = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (fieldId: string, value: any) => {
    const updated = {
      ...formData,
      [fieldId]: value,
    };
    console.log(updated);
    setFormData(updated);
  };

  return <TestForm fields={testFields} formData={formData} onChange={handleChange} />;
};
