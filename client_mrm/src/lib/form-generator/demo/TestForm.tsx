import { FormBuilder } from "@/lib/form-generator/components/FormBuilder";
import { type FormField } from "@/lib/form-generator/types/field-types";

type TestFormProps = {
  fields: FormField[];
  formData: Record<string, any>;
  onChange: (fieldId: string, value: any) => void;
};

export const TestForm: React.FC<TestFormProps> = ({ fields, formData, onChange }) => {
  return (
    <>
      <FormBuilder fields={fields} formData={formData} onChange={onChange} />
      <div className="rounded-lg border p-4 bg-muted/30">
        <h3 className="text-lg font-semibold mb-2">📦 Live Form Data</h3>
        <pre className="text-sm bg-muted p-2 rounded overflow-x-auto">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </>
  );
};

