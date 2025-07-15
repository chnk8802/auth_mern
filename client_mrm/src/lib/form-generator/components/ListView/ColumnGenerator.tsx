// utils/withDefaults.tsx
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableActions } from "@/components/listView/DataTableActions";
import { renderColumn } from "@/lib/form-generator/components/ListView/ColumnRenderer";
import type { ModuleField } from "@/lib/form-generator/types/field-types";

interface ColumnGeneratorParams<T> {
  fields: ModuleField[];
  onEdit: (data: T) => void;
  onDelete: (data: T) => void;
  copyField?: keyof T;
}

export function ColumnGenerator<T>({
  fields,
  onEdit,
  onDelete,
  copyField,
}: ColumnGeneratorParams<T>): ColumnDef<T>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      enablePinning: true,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableActions
          data={row.original}
          onEdit={() => onEdit(row.original)}
          onDelete={() => onDelete(row.original)}
          copyField={copyField}
        />
      ),
      enableSorting: false,
      enableHiding: false,
      enablePinning: true,
    },
    ...fields.map((field) => renderColumn<T>(field)),
  ];
}
