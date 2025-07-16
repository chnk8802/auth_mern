import React from "react";
import { type ModuleField } from "@/lib/form-generator/types/field-types";
import {
  type WorkflowFn,
  workflow,
} from "@/lib/form-generator/core/WorkflowBuilder";
import { FieldRenderer } from "@/lib/form-generator/components/FormView/FieldRendrer";
import {
  AnimatedSection,
  Section,
} from "@/components/layout/sectionLayouts/Sections";
import { FormActionButtons } from "@/components/form/FormActionButtons";
import { FormHeader } from "@/components/headers/FormHeader";
import { LiveFormData } from "@/components/debugging/LiveFormData";

interface FormBuilderProps {
  title?: string;
  backLink: string;
  mode: "create" | "edit";

  fields: ModuleField[];
  formData: Record<string, any>;
  workflowFn?: WorkflowFn;
  context?: Record<string, any>;

  onChange: (fieldId: string, value: any) => void;
  onSubmit: () => void;
  onReset?: () => void;
  isSubmitting?: boolean;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  mode,
  title,
  backLink,

  fields,
  formData,
  workflowFn,
  context,

  onChange,
  onSubmit,
  onReset,
  isSubmitting,
}) => {
  const fieldStates = workflow(fields, formData, workflowFn, context);
  const [showLiveData, setShowLiveData] = React.useState(true);

  const grouped = fields.reduce<Record<string, ModuleField[]>>((acc, field) => {
    const section = field.section || "";
    if (!acc[section]) acc[section] = [];
    acc[section].push(field);
    return acc;
  }, {});
console.log("Builder",formData)
  // Validate section consistency
  for (const [sectionName, sectionFields] of Object.entries(grouped)) {
    const sectionTypesMap = new Map<string, string[]>();
    const colCountsMap = new Map<number, string[]>();

    sectionFields.forEach((field) => {
      const type = field.sectionType ?? "animated";
      const col = field.col ?? 1;

      sectionTypesMap.set(type, [
        ...(sectionTypesMap.get(type) || []),
        field.id,
      ]);
      colCountsMap.set(col, [...(colCountsMap.get(col) || []), field.id]);
    });

    if (sectionTypesMap.size > 1) {
      const typesWithFields = Array.from(sectionTypesMap.entries())
        .map(([type, ids]) => `${type}: [${ids.join(", ")}]`)
        .join(" | ");

      throw new Error(
        `Inconsistent 'sectionType' in section "${sectionName}". Fields must have the same sectionType.\n\nFound:\n${typesWithFields}`
      );
    }

    if (colCountsMap.size > 1) {
      const colsWithFields = Array.from(colCountsMap.entries())
        .map(([col, ids]) => `col=${col}: [${ids.join(", ")}]`)
        .join(" | ");

      throw new Error(
        `Inconsistent 'col' value in section "${sectionName}". All fields must use the same column count.\n\nFound:\n${colsWithFields}`
      );
    }
  }

  return (
    <>
      <form>
        <div className="pb-4">
          <FormHeader
            title={title || ""}
            backLink={backLink}
            actions={
              <FormActionButtons
                mode={mode}
                isSubmitting={isSubmitting || false}
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
        {Object.entries(grouped).map(([sectionTitle, fields]) => {
          const sectionType = fields[0].sectionType ?? "animated";
          const col = fields[0].col ?? 2;

          const Wrapper = sectionType === "basic" ? Section : AnimatedSection;

          return (
            <Wrapper key={sectionTitle} title={sectionTitle} col={col}>
              {fields.map((field) => {
                const state = fieldStates[field.id] || {};
                if (state.visible === false) return null;

                return (
                  <FieldRenderer
                    formMode={mode}
                    key={field.id}
                    field={field}
                    value={formData[field.id]}
                    onChange={(val) => onChange(field.id, val)}
                    disabled={state.disabled}
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
