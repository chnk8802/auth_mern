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

  fields: FieldConfig; // 👈 Changed from ModuleField[] to FieldConfig
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
  fields,
  formData,
  fieldStateMap,
  onChange,
  onSubmit,
  onReset,
  isSubmitting,
}) => {
  const [showLiveData, setShowLiveData] = React.useState(false);
// Normalize fields once when they change
  const normalizedFields = React.useMemo(() => normalizeFieldConfig(fields), [fields]);

  return (
    <>
      <form>
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

        {normalizedFields.map((section) => {
          const visibleFields = section.fields.filter(
            (f) => f.showInForm !== false && fieldStateMap?.[f.id]?.visible !== false
          );
          if (visibleFields.length === 0) return null;

          const Wrapper =
            section.sectionType === "basic" ? Section : AnimatedSection;

          return (
            <Wrapper key={section.section} title={section.section} col={section.col}>
              {visibleFields.map((field) => {
                const state = fieldStateMap?.[field.id];

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



// import React from "react";
// import { type ModuleField } from "@/lib/form-generator/types/field-types";
// import { normalizeFields } from "@/lib/form-generator/utils/normalizeFields";
// import { FieldRenderer } from "@/lib/form-generator/components/FormView/FieldRendrer";

// import {
//   AnimatedSection,
//   Section,
// } from "@/components/layout/sectionLayouts/Sections";
// import { FormActionButtons } from "@/components/form/FormActionButtons";
// import { FormHeader } from "@/components/headers/FormHeader";
// import { LiveFormData } from "@/components/debugging/LiveFormData";
// import type { FieldState } from "@/lib/form-generator/types/default-field-state";

// interface FormBuilderProps {
//   title?: string;
//   backLink: string;
//   mode: "create" | "edit";

//   fields: ModuleField[];
//   formData: Record<string, any>;
//   fieldStateMap?: Record<string, FieldState>;

//   onChange: (fieldId: string, value: any) => void;
//   onSubmit: () => void;
//   onReset?: () => void;
//   isSubmitting?: boolean;
// }

// export const FormBuilder: React.FC<FormBuilderProps> = ({
//   title,
//   backLink,
//   mode,

//   fields,
//   formData,
//   fieldStateMap,

//   onChange,
//   onSubmit,
//   onReset,
//   isSubmitting,
// }) => {
//   const [showLiveData, setShowLiveData] = React.useState(false);

//   const normalizedFields = React.useMemo(
//     () => normalizeFields(fields),
//     [fields]
//   );

//   const groupedSections = React.useMemo(() => {
//     const grouped = normalizedFields.reduce<Record<string, ModuleField[]>>(
//       (acc, field) => {
//         const section = field.section || "";
//         if (!acc[section]) acc[section] = [];
//         acc[section].push(field);
//         return acc;
//       },
//       {}
//     );

//     for (const [sectionName, sectionFields] of Object.entries(grouped)) {
//       const sectionTypes = new Set(sectionFields.map((f) => f.sectionType));
//       const columnCounts = new Set(sectionFields.map((f) => f.col));

//       if (sectionTypes.size > 1) {
//         const typesWithFields = Array.from(sectionTypes)
//           .map(
//             (type) =>
//               `${type}: [${sectionFields
//                 .filter((f) => f.sectionType === type)
//                 .map((f) => f.id)
//                 .join(", ")}]`
//           )
//           .join(" | ");
//         throw new Error(
//           `Inconsistent 'sectionType' in section "${sectionName}".\n\n${typesWithFields}`
//         );
//       }

//       if (columnCounts.size > 1) {
//         const colsWithFields = Array.from(columnCounts)
//           .map(
//             (col) =>
//               `col=${col}: [${sectionFields
//                 .filter((f) => f.col === col)
//                 .map((f) => f.id)
//                 .join(", ")}]`
//           )
//           .join(" | ");
//         throw new Error(
//           `Inconsistent 'col' value in section "${sectionName}".\n\n${colsWithFields}`
//         );
//       }
//     }

//     return grouped;
//   }, [normalizedFields]);

//   return (
//     <>
//       <form>
//         <div className="pb-4">
//           <FormHeader
//             title={title ?? ""}
//             backLink={backLink}
//             actions={
//               <FormActionButtons
//                 mode={mode}
//                 isSubmitting={isSubmitting ?? false}
//                 onSave={onSubmit}
//                 onSaveAndNew={() => {
//                   onSubmit();
//                   onReset?.();
//                 }}
//                 onReset={onReset}
//                 showLiveData={showLiveData}
//                 onToggleLiveData={() => setShowLiveData((prev) => !prev)}
//               />
//             }
//           />
//         </div>

//         {Object.entries(groupedSections).map(
//           ([sectionTitle, sectionFields]) => {

//             const visibleFields = sectionFields.filter(
//               (f) => f.showInForm !== false
//             );
//             if (visibleFields.length === 0) return null;

//             const sectionType = sectionFields[0].sectionType!;
//             const col = sectionFields[0].col!;
//             const Wrapper = sectionType === "basic" ? Section : AnimatedSection;
//             return (
//               <Wrapper key={sectionTitle} title={sectionTitle} col={col}>
//                 {visibleFields.map((field) => {
//                   const state = fieldStateMap?.[field.id];
//                   if (state?.visible === false) return null;

//                   return (
//                     <FieldRenderer
//                       key={field.id}
//                       formMode={mode}
//                       field={field}
//                       value={formData[field.id]}
//                       onChange={(val) => onChange(field.id, val)}
//                       visible={state?.visible}
//                       disabled={state?.disabled}
//                       readOnly={state?.readOnly}
//                     />
//                   );
//                 })}
//               </Wrapper>
//             );
//           }
//         )}
//       </form>

//       {showLiveData && <LiveFormData data={formData} />}
//     </>
//   );
// };
