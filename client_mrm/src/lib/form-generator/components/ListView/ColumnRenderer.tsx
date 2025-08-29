import { ArrowUpDown } from "lucide-react";
import {
  formatCurrency,
  formatDate,
  formatSnakeCaseLabel,
  parseDecimal,
} from "@/lib/utils";
import type { ModuleField } from "@/lib/form-generator/types/field-types";
import { Button } from "@/components/ui/button";
import { indianStateMap } from "@/constants/indianStates";
import type { ColumnDef } from "@tanstack/react-table";
import { COUNTRY_MAP } from "@/constants/countries";
import { Link } from "react-router-dom";
import { spawn } from "child_process";

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
          return <>{formatCurrency(parseDecimal(value))}</>;
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
          if (!value) return <div>—</div>;
          // Force TS to treat it as a record
          const obj = value as Record<string, any>;
          const id = value._id as string;
          const keys = field.displayField.split(",").map((k) => k.trim());
          const display = keys
            .map((key) => obj[key])
            .filter(Boolean)
            .join(" ");

          return (
            <>
              {display ? (
                <Link
                  className="hover:underline"
                  to={`/dashboard/${field.module}/${id}`}
                >
                  {display}
                </Link>
              ) : (
                <span>"-"</span>
              )}
            </>
          );
        }

        case "number":
          return <>{parseDecimal(value)}</>;
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
