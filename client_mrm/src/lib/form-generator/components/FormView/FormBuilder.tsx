import React from "react";
import { FieldRenderer } from "@/lib/form-generator/components/FormView/FieldRendrer";
import { FormActionButtons } from "@/components/form/FormActionButtons";
import { FormHeader } from "@/components/headers/FormHeader";
import { LiveFormData } from "@/components/debugging/LiveFormData";
import type { FieldConfig, ModuleField } from "@/lib/form-generator/types/field-types";
import { normalizeFieldConfig } from "../../utils/normalizeFields";
import { Loading } from "@/components/common/Loading";
import { AnimatedSection, Section } from "@/components/layout/main/sectionLayouts/Sections";
import { useFormBuilder } from "../../hooks/useFormBuilder";

interface FormBuilderProps {
  title?: string;
  mode: "create" | "edit";
  fieldsConfig: FieldConfig;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  title,
  mode,
  fieldsConfig,
  onSubmit,
  isSubmitting, // to disable save button untill saving / updating finishes
}) => {
  const allFields: ModuleField[] = fieldsConfig.flatMap((section) => section.fields);

  const { formData, fieldStates, updateValue, resetForm } = useFormBuilder(allFields);
  const [showLiveData, setShowLiveData] = React.useState(false);

  if (!fieldsConfig) return <Loading fullscreen={true} />;

  const normalizedFields = React.useMemo(() => normalizeFieldConfig(fieldsConfig), [fieldsConfig]);

  return (
    <>
      <div className="pb-4">
        <FormHeader
          title={title ?? ""}
          actions={
            <FormActionButtons
              mode={mode}
              isSubmitting={isSubmitting ?? false}
              onSave={onSubmit}
              onSaveAndNew={() => {
                onSubmit();
                resetForm();
              }}
              onReset={() => resetForm()}
              showLiveData={showLiveData}
              onToggleLiveData={() => setShowLiveData((prev) => !prev)}
            />
          }
        />
      </div>

      <form>
        {normalizedFields.map((section) => {
          const visibleFields = section.fields.filter(
            (f) => f.showInForm !== false && fieldStates[f.id]?.visible !== false
          );
          if (visibleFields.length === 0) return null;

          const Wrapper = section.sectionType === "basic" ? Section : AnimatedSection;

          return (
            <Wrapper key={section.section} title={section.section} col={section.col}>
              {visibleFields.map((field) => {
                const state = fieldStates[field.id];
                return (
                  <FieldRenderer
                    key={field.id}
                    formMode={mode}
                    field={field}
                    value={formData[field.id]}
                    onChange={(val) => updateValue(field.id, val)}
                    disabled={state?.disabled}
                    readOnly={state?.readOnly}
                  />
                );
              })}
            </Wrapper>
          );
        })}
      </form>

      {showLiveData && <LiveFormData data={formData} />}
    </>
  );
};
