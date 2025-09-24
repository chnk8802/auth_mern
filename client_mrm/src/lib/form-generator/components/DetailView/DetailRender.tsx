"use client";
import { formatCurrency, formatDate, formatLabel } from "@/lib/utils";
import type {
  ModuleField,
  SubformField,
} from "@/lib/form-generator/types/field-types";
import { Link } from "react-router-dom";
import { DetailItem } from "@/components/layout/main/sectionLayouts/DetailViewComponents";

type Props = {
  fields: ModuleField[];
  data: Record<string, any>;
};

export function DetailsRenderer({ fields, data }: Props) {
  const visibleFields = fields.filter((field) => field.showInDetails !== false );

  const renderValue = (field: ModuleField, value: any) => {
    if (value == null) return "-";

    switch (field.type) {
      case "text":
      case "textarea":
        return String(value) || "-";
      case "currency":
        if (isNaN(value)) return "-";
        return formatCurrency(value);
      case "date":
      case "datetime":
        return formatDate(value);
      case "checkbox":
        return Array.isArray(value) ? value.join(", ") : value ? "Yes" : "No";
      case "radio":
      case "select":
        return typeof value === "string" ? formatLabel(value) : "-";
      case "multiselect":
        return Array.isArray(value)
          ? value
              .map((v) => (typeof v === "string" ? formatLabel(v) : v))
              .join(", ")
          : "-";
      case "address":
        return [
          value?.street,
          value?.city,
          typeof value?.state === "string"
            ? formatLabel(value?.state)
            : value?.state,
          typeof value?.country === "string"
            ? formatLabel(value?.country)
            : value?.country,
          ,
          value?.zip,
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
              <>-</>
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
          <div key={i} className="border p-2 my-2 rounded">
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
