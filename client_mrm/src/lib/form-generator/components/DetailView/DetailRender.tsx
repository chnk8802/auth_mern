"use client";

import { DetailItem } from "@/components/layout/sectionLayouts/DetailViewComponents";
import { formatDate, formatSnakeCaseLabel } from "@/lib/utils";
import type { ModuleField } from "@/lib/form-generator/types/field-types";

type Props = {
  fields: ModuleField[];
  data: Record<string, any>;
};

export function DetailsRenderer({ fields, data, }: Props) {
  const visibleFields = fields.filter((field) => field.showInDetails !== false);

  const renderValue = (field: ModuleField, value: any) => {
    if (value == null) return "-";

    switch (field.type) {
      case "date":
      case "datetime":
        return formatDate(value);
      case "checkbox":
        return Array.isArray(value)
          ? value.join(", ")
          : value
          ? "Yes"
          : "No";
      case "radio":
      case "select":
        return formatSnakeCaseLabel(value);
      case "multiselect":
        return Array.isArray(value) ? value.map(formatSnakeCaseLabel).join(", ") : "-";
      case "address":
        return [
          value?.street,
          value?.city,
          formatSnakeCaseLabel(value?.state),
          formatSnakeCaseLabel(value?.country),
          value?.postalCode,
        ]
          .filter(Boolean)
          .join(", ");
      case "lookup":
        return value?.[field.displayField] || "-";
      case "file":
        return Array.isArray(value)
          ? value.map((f, i) => (
              <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {f.name || f.url}
              </a>
            ))
          : value?.name || value?.url || "-";
      default:
        return String(value);
    }
  };

  return (
    <>
      {visibleFields.map((field) => (
        <DetailItem
          key={field.id}
          label={field.label}
          value={renderValue(field, data?.[field.id])}
        />
      ))}
    </>
  );
}
