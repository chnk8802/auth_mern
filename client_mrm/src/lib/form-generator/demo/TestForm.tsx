import { FormBuilder } from "@/lib/form-generator/components/FormView/FormBuilder";
import { type ModuleField } from "@/lib/form-generator/types/field-types";
import { ROUTES } from "@/constants/routes";

type TestFormProps = {
  fields: ModuleField[];
  formData: Record<string, any>;
  onChange: (fieldId: string, value: any) => void;
};

export const TestForm: React.FC<TestFormProps> = ({
  fields,
  formData,
  onChange,
}) => {
  const mode: "create" | "edit" = "create";
  return (
    <>
      <FormBuilder
        mode={mode}
        fields={fields}
        formData={formData}
        backLink={ROUTES.DASHBOARD}
        onChange={onChange}
        onSubmit={() => {
          console.log("Saving:", formData);
          // call mutation or API
        }}
        onReset={() => {
          console.log("Reset clicked");
          // clear form if needed
        }}
      />
    </>
  );
};
