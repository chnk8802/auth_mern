import React, { useState } from "react";
import TestForm from "./TestForm";

export const FormGeneratorPage: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  return (
    <div className="mx-auto p-4 space-y-8">
      <div className="rounded-lg border p-4">
        <h2 className="text-xl font-bold mb-4">🧪 Test Form</h2>
        <TestForm/>
      </div>
    </div>
  );
};
