import { ArrowUpDown } from "lucide-react";
import { formatDate, formatSnakeCaseLabel, parseDecimal } from "@/lib/utils";
import type { ModuleField } from "@/lib/form-generator/types/field-types";
import { Button } from "@/components/ui/button";
import { indianStateMap } from "@/constants/indianStates";
import type { ColumnDef } from "@tanstack/react-table";
import { COUNTRY_MAP } from "@/constants/countries";

export function renderColumn<T>(field: ModuleField): ColumnDef<T> | undefined {
  if (field.showInTable === false) return undefined;
  return {
    accessorKey: field.id,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {field.label || formatSnakeCaseLabel(field.id)}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue(field.id);
      switch (field.type) {
        case "date":
        case "datetime":
          return <div>{value ? formatDate(value as string) : "—"}</div>;

        case "select":
        case "radio":
        case "multiselect":
          const optionMap = Object.fromEntries(
            (field.options || []).map((opt) => [opt.value, opt.label])
          );
          if (Array.isArray(value)) {
            return (
              <div>{value.map((v) => optionMap[v] || v).join(", ") || "—"}</div>
            );
          }
          return (
            <div>{String(optionMap[value as string] || value) || "—"}</div>
          );

        case "checkbox":
          return <div>{value ? "✔️" : "—"}</div>;

        case "address":
          const address = value as {
            street?: string;
            city?: string;
            state?: string;
            country?: string;
            zip?: string;
          };

          return (
            <div>
              {[
                address?.street,
                address?.city,
                indianStateMap[address?.state as string] || address?.state,
                COUNTRY_MAP[address?.country as string] || address?.country,
                address?.zip,
              ]
                .filter(Boolean)
                .join(", ") || "—"}
            </div>
          );

        case "lookup": {
          if (!value || typeof value !== "object") return <div>—</div>;

          const display =
            (value as any).displayName ??
            (value as any).fullName ??
            (value as any).name ??
            (value as any).label ??
            (value as any)._id ??
            "—";

          return <div>{display}</div>;
        }
        case "number":
          return (<>{parseDecimal(value)}</>);
        case "text":
        case "phone":
        case "email":
        case "textarea":
        default:
          return <div>{(value as string) ?? "—"}</div>;
      }
    },
  };
}
