import { useState } from "react";
import { TestForm } from "@/lib/form-generator/demo/TestForm";
import { fields } from "@/lib/form-generator/demo/testFields";

export const FormGeneratorPage = () => {
  const [formData, setFormData] = useState({});
  
  const handleChange = (fieldId: string, value: any) => {
    const updated = {
      ...formData,
      [fieldId]: value,
    };
    console.log(updated);
    console.log(fields);
    setFormData(updated);
  };

  return (
    <TestForm fields={fields} formData={formData} onChange={handleChange} />
  );
};
