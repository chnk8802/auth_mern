import { ArrowUpDown } from "lucide-react";
import {
  formatCurrency,
  formatDate,
  formatSnakeCaseLabel,
} from "@/lib/utils";
import type { ModuleField } from "@/lib/form-generator/types/field-types";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { COUNTRY_MAP, INDIAN_STATE_MAP } from "@/constants/address.constants";
import { Link } from "react-router-dom";
import pluralize from "pluralize";

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
        case "currency":
          if (value == null) return <div>—</div>;
          return <>{formatCurrency(value as number)}</>;
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
          return <div>{value ? "Yes" : "No"}</div>;

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
                INDIAN_STATE_MAP[address?.state as string] || address?.state,
                COUNTRY_MAP[address?.country as string] || address?.country,
                address?.zip,
              ]
                .filter(Boolean)
                .join(", ") || "—"}
            </div>
          );

        case "lookup": {
          if (!value) return <div>—</div>;
          const obj = value as Record<string, any>;
          const id = obj._id as string;
          const keys = field.displayField.split(",").map((k) => k.trim());
          const display = keys
            .map((key) => obj[key])
            .filter(Boolean)
            .join(" ");

          return (
            <>
              {display ? (
                <Link
                  className="hover:underline hover:text-blue-600"
                  to={`/dashboard/${pluralize(field.module)}/${id}`}
                >
                  {display}
                </Link>
              ) : (
                <span>-</span>
              )}
            </>
          );
        }

        case "subform":
          if (!value) return <div>-</div>;
          return <div>See in Detail View</div>;

        case "number":
          return <>{value}</>;
          // return <>{parseDecimal(value)}</>;
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
