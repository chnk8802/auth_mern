"use client";

import { MoreDropdown } from "@/components/detailsView/MoreDropdown";
import { DetailsPageHeader } from "@/components/headers/DetailsHeader";
import {
  Section,
  AnimatedSection,
} from "@/components/layout/sectionLayouts/Sections";
import { DetailsRenderer } from "@/lib/form-generator/components/DetailView/DetailRender";
import type { FieldConfig } from "@/lib/form-generator/types/field-types";

type Props = {
  title: string;
  backLink: string;
  fieldConfig: FieldConfig;
  data: Record<string, any>;
  onDelete?: () => void;
  onEdit?: () => void;
};

export function DetailsBuilder({
  title,
  backLink,
  fieldConfig,
  data,
  onDelete,
  onEdit,
}: Props) {

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
      {fieldConfig.map((section) => {
        const col = section.col;
        const sectionType = section.sectionType || "animated";

        const Wrapper = sectionType === "basic" ? Section : AnimatedSection;

        return (
          <Wrapper key={section.section} title={section.section} col={col}>
            <DetailsRenderer fields={section.fields} data={data} />
          </Wrapper>
        );
      })}
    </>
  );
}
