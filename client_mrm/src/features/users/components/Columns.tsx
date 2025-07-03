import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Printer } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import type { User } from "../types";
import { DataTableActions } from "@/components/common/DataTableActions";
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<User>[] = [
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
  },
  {
    accessorKey: "userCode",
    enableHiding: false,
    header: "User Code",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("userCode")}</div>
    ),
  },
  {
    accessorKey: "fullName",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
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
      const address = row.getValue("address") as User["address"];
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
  },{
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;

      return <DataTableActions data={data} />;
    },
  },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));

  //     // Format the amount as Indian Rupees with Indian-style grouping
  //     const formatted = new Intl.NumberFormat("en-IN", {
  //       style: "currency",
  //       currency: "INR",
  //     }).format(amount);

  //     console.log(formatted)

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
  
];
