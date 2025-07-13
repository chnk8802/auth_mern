import React, { useState } from "react";
import { FormBuilder } from "@/lib/form-generator/components/FormBuilder";
import { testFields } from "@/lib/form-generator/demo/testFields"; // path to your test fields
import { type FormField } from "@/lib/form-generator/types/field-types";

export const TestForm: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  return (
    <>
      <FormBuilder
        fields={testFields as FormField[]}
        formData={formData}
        onChange={handleChange}
      />
      <div className="rounded-lg border p-4 bg-muted/30">
        <h3 className="text-lg font-semibold mb-2">📦 Live Form Data</h3>
        <pre className="text-sm bg-muted p-2 rounded overflow-x-auto">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </>
  );
};

export default TestForm;
