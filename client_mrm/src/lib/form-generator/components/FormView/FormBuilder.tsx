import React from "react";
import { FieldRenderer } from "@/lib/form-generator/components/FormView/FieldRendrer";
import {
  AnimatedSection,
  Section,
} from "@/components/layout/sectionLayouts/Sections";
import { FormActionButtons } from "@/components/form/FormActionButtons";
import { FormHeader } from "@/components/headers/FormHeader";
import { LiveFormData } from "@/components/debugging/LiveFormData";
import type { FieldState } from "@/lib/form-generator/types/default-field-state";
import type { FieldConfig } from "@/lib/form-generator/types/field-types";
import { normalizeFieldConfig } from "../../utils/normalizeFields";

interface FormBuilderProps {
  title?: string;
  backLink: string;
  mode: "create" | "edit";

  fieldsConfig: FieldConfig;
  formData: Record<string, any>;
  fieldStateMap?: Record<string, FieldState>;

  onChange: (fieldId: string, value: any) => void;
  onSubmit: () => void;
  onReset?: () => void;
  isSubmitting?: boolean;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  title,
  backLink,
  mode,
  fieldsConfig,
  formData,
  fieldStateMap,
  onChange,
  onSubmit,
  onReset,
  isSubmitting,
}) => {
  const [showLiveData, setShowLiveData] = React.useState(false);
  if (!fieldsConfig) return <div>Loading form...</div>;
  const normalizedFields = React.useMemo(
    () => normalizeFieldConfig(fieldsConfig),
    [fieldsConfig]
  );

  return (
    <>
      <div className="pb-4">
        <FormHeader
          title={title ?? ""}
          backLink={backLink}
          actions={
            <FormActionButtons
              mode={mode}
              isSubmitting={isSubmitting ?? false}
              onSave={onSubmit}
              onSaveAndNew={() => {
                onSubmit();
                onReset?.();
              }}
              onReset={onReset}
              showLiveData={showLiveData}
              onToggleLiveData={() => setShowLiveData((prev) => !prev)}
            />
          }
        />
      </div>
      <form>
        {normalizedFields.map((section) => {
          const visibleFields = section.fields.filter(
            (f) =>
              f.showInForm !== false && fieldStateMap?.[f.id]?.visible !== false
          );
          if (visibleFields.length === 0) return null;

          const Wrapper =
            section.sectionType === "basic" ? Section : AnimatedSection;

          return (
            <Wrapper
              key={section.section}
              title={section.section}
              col={section.col}
            >
              {visibleFields.map((field) => {
                let state = fieldStateMap?.[field.id];

                return (
                  <FieldRenderer
                    key={field.id}
                    formMode={mode}
                    field={field}
                    value={formData[field.id]}
                    onChange={(val) => onChange(field.id, val)}
                    visible={state?.visible}
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
