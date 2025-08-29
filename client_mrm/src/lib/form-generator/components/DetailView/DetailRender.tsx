"use client";

import { DetailItem } from "@/components/layout/sectionLayouts/DetailViewComponents";
import {
  formatCurrency,
  formatDate,
  formatSnakeCaseLabel,
  parseDecimal,
} from "@/lib/utils";
import type { ModuleField, SubformField } from "@/lib/form-generator/types/field-types";
import { Link } from "react-router-dom";

type Props = {
  fields: ModuleField[];
  data: Record<string, any>;
};

export function DetailsRenderer({ fields, data }: Props) {
  const visibleFields = fields.filter((field) => field.showInDetails !== false);

  const renderValue = (field: ModuleField, value: any) => {
    if (value == null) return "-";

    switch (field.type) {
      case "text":
      case "textarea":
        return String(value) || "-";
      case "currency":
        return formatCurrency(parseDecimal(value));
      case "date":
      case "datetime":
        return formatDate(value);
      case "checkbox":
        return Array.isArray(value) ? value.join(", ") : value ? "Yes" : "No";
      case "radio":
      case "select":
        return formatSnakeCaseLabel(value) || "-";
      case "multiselect":
        return Array.isArray(value)
          ? value.map(formatSnakeCaseLabel).join(", ")
          : "-";
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
      case "lookup": {
        if (!value) return "-";

        // Support multiple display fields: e.g. "firstName, lastName"
        const keys = field.displayField.split(",").map((k) => k.trim());
        const id = value._id as string;
        const display = keys
          .map((key) => value?.[key])
          .filter(Boolean)
          .join(" ");

        return (
          <>
            {display ? (
              <Link
                className="hover:underline hover:text-blue-600"
                to={`/dashboard/${field.module}/${id}`}
              >
                {display}
              </Link>
            ) : (
              "-"
            )}
          </>
        );
      }
      case "file":
        return Array.isArray(value)
          ? value.map((f, i) => (
              <a
                key={i}
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {f.name || f.url}
              </a>
            ))
          : value?.name || value?.url || "-";
      case "subform": {
        if (!Array.isArray(value) || value.length === 0) return "-";

        const subformField = field as SubformField; // type-narrowing
        if (!subformField.fields) return "-";

        return value.map((item, i) => (
          <div
            key={i}
            className="flex flex-col border p-2 mb-2 rounded bg-gray-50"
          >
            <DetailsRenderer fields={subformField.fields} data={item} />
          </div>
        ));
      }

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
