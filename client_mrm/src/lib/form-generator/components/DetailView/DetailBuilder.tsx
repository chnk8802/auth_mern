"use client";

import { MoreDropdown } from "@/components/detailsView/MoreDropdown";
import { DetailsPageHeader } from "@/components/headers/DetailsHeader";
import {
  Section,
  AnimatedSection,
} from "@/components/layout/sectionLayouts/Sections";
import { DetailsRenderer } from "@/lib/form-generator/components/DetailView/DetailRender";
import type { ModuleField } from "@/lib/form-generator/types/field-types";

type Props = {
  title: string;
  backLink: string;
  fields: ModuleField[];
  data: Record<string, any>;
  onDelete?: () => void;
  onEdit?: () => void;
};

export function DetailsBuilder({
  title,
  backLink,
  fields,
  data,
  onDelete,
  onEdit,
}: Props) {
  const grouped = fields
    .filter((f) => f.showInDetails !== false)
    .reduce<Record<string, ModuleField[]>>((acc, field) => {
      const section = field.section || "";
      if (!acc[section]) acc[section] = [];
      acc[section].push(field);
      return acc;
    }, {});

  return (
    <>
      <div className="pb-4">
        <DetailsPageHeader
          title={title}
          backLink={backLink}
          onEdit={onEdit}
          more={
            <MoreDropdown
              onDownloadPdf={() =>
                console.log(
                  `Download PDF for: ${title} ${data._id} ${backLink}`
                )
              }
              onPrint={() => console.log(`Print: ${title}`)}
              onDelete={() => onDelete?.()}
            />
          }
        />
      </div>
      {Object.entries(grouped).map(([sectionTitle, sectionFields]) => {
        const col = sectionFields[0].col || 2;
        const sectionType = sectionFields[0].sectionType || "animated";

        const Wrapper = sectionType === "basic" ? Section : AnimatedSection;

        return (
          <Wrapper key={sectionTitle} title={sectionTitle} col={col}>
            <DetailsRenderer fields={sectionFields} data={data} />
          </Wrapper>
        );
      })}
    </>
  );
}
