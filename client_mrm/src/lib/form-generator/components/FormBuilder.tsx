import React from "react";
import { type FormField } from "@/lib/form-generator/types/field-types";
import { type WorkflowFn, runWorkflow } from "@/lib/form-generator/core/runWorkflow";
import { FieldRenderer } from "@/lib/form-generator/components/FieldRendrer";
import { AnimatedSection, Section } from "@/components/layout/sectionLayouts/Sections";

interface FormBuilderProps {
  fields: FormField[];
  formData: Record<string, any>;
  onChange: (fieldId: string, value: any) => void;
  workflow?: WorkflowFn;
  context?: Record<string, any>;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  fields,
  formData,
  onChange,
  workflow,
  context,
}) => {
  const fieldStates = runWorkflow(fields, formData, workflow, context);

  const grouped = fields.reduce<Record<string, FormField[]>>((acc, field) => {
    const section = field.section || "";
    if (!acc[section]) acc[section] = [];
    acc[section].push(field);
    return acc;
  }, {});

  // Validate section consistency
for (const [sectionName, sectionFields] of Object.entries(grouped)) {
  const sectionTypesMap = new Map<string, string[]>();
  const colCountsMap = new Map<number, string[]>();

  sectionFields.forEach((field) => {
    const type = field.sectionType ?? "animated";
    const col = field.col ?? 1;

    sectionTypesMap.set(type, [...(sectionTypesMap.get(type) || []), field.id]);
    colCountsMap.set(col, [...(colCountsMap.get(col) || []), field.id]);
  });

  if (sectionTypesMap.size > 1) {
    const typesWithFields = Array.from(sectionTypesMap.entries())
      .map(([type, ids]) => `${type}: [${ids.join(", ")}]`)
      .join(" | ");

    throw new Error(
      `❌ Inconsistent 'sectionType' in section "${sectionName}". Fields must have the same sectionType.\n\nFound:\n${typesWithFields}`
    );
  }

  if (colCountsMap.size > 1) {
    const colsWithFields = Array.from(colCountsMap.entries())
      .map(([col, ids]) => `col=${col}: [${ids.join(", ")}]`)
      .join(" | ");

    throw new Error(
      `❌ Inconsistent 'col' value in section "${sectionName}". All fields must use the same column count.\n\nFound:\n${colsWithFields}`
    );
  }
}


  return (
    <form>
      {Object.entries(grouped).map(([sectionTitle, fields]) => {
        const sectionType = fields[0].sectionType ?? "animated";
        const col = fields[0].col ?? 4;

        const Wrapper = sectionType === "basic" ? Section : AnimatedSection;

        return (
          <Wrapper key={sectionTitle} title={sectionTitle} col={col}>
            {fields.map((field) => {
              const state = fieldStates[field.id] || {};
              if (state.visible === false) return null;

              return (
                <FieldRenderer
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
  );
};
