import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import type { Customer } from "@/features/customers/types";
import { DataTableActions } from "@/components/common/DataTableActions";
import { formatDate } from "@/lib/utils";

type CustomerColumnsProps = {
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
};

export const getCustomerColumns = ({
  onEdit,
  onDelete,
}: CustomerColumnsProps): ColumnDef<Customer>[] => [
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
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DataTableActions
          data={data}
          onEdit={() => onEdit(data)}
          onDelete={() => onDelete(data)}
          copyField={"customerCode" as keyof Customer}
        />
      );
    },
    enableHiding: false,
    enablePinning: true,
  },
  {
    accessorKey: "customerCode",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer Code
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("customerCode")}</div>
    ),
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
  },
  {
    accessorKey: "isBulkCustomer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Is Bulk Customer
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
        const isBulkCustomer = row.getValue("isBulkCustomer") as boolean;
        return <div>{isBulkCustomer ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const address = row.getValue("address") as Customer["address"];
      return (
        <div>
          {address?.street} {address?.city} {address?.state} {address?.country}{" "}
          {address?.zip}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = formatDate(row.getValue("createdAt"));
      return <div>{createdAt}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const updatedAt = formatDate(row.getValue("updatedAt"));
      return <div>{updatedAt}</div>;
    },
  }
];
