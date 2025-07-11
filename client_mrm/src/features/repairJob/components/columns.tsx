import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import type { RepairJob } from "@/features/repairJob/types";
import { DataTableActions } from "@/components/listView/DataTableActions";
import { formatCurrency, formatDate, parseDecimal } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

type CustomerColumnsProps = {
  onEdit: (customer: RepairJob) => void;
  onDelete: (customer: RepairJob) => void;
};

export const getRepaiJobColumns = ({
  onEdit,
  onDelete,
}: CustomerColumnsProps): ColumnDef<RepairJob>[] => [
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
          copyField={"repairJobCode" as keyof RepairJob}
        />
      );
    },
    enableHiding: false,
    enablePinning: true,
  },
  {
    accessorKey: "repairJobCode",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Repair Job Code
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("repairJobCode")}</div>
    ),
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Customer
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("customer") as RepairJob["customer"];
      if (value === null || value === undefined) {
        return <></>;
      }
      return (
        <div className="capitalize">
          <Link
            className="hover:underline"
            to={ROUTES.CUSTOMERS.DETAILS(value?._id)}
          >
            {value?.fullName}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "deviceModel",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Device Model
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("deviceModel")}</div>
    ),
  },
  {
    accessorKey: "deviceIMEI",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Device IMEI
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("deviceIMEI")}</div>
    ),
  },
  {
    accessorKey: "issueDescription",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Issue Description
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("issueDescription")}</div>
    ),
  },
  {
    accessorKey: "repairType",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Repair Type
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("repairType")}</div>
    ),
  },
  {
    accessorKey: "technician",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Technician
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("technician") as RepairJob["technician"];
      if (value === null || value === undefined) {
        return <></>;
      }
      return (
        <div className="capitalize">
          <Link
            className="hover:underline"
            to={ROUTES.USERS.DETAILS(value?._id)}
          >
            {value?.userCode}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "deviceComponents",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Device Components
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("deviceComponents") as string[] | undefined;

      if (!Array.isArray(value) || value.length === 0) {
        return <div className="text-muted-foreground italic">None</div>;
      }
      const displayed = value.slice(0, 2).join(", ");
      const suffix = value.length > 2 ? "..." : "";

      return <div className="capitalize">{displayed + suffix}</div>;
    },
  },
  {
    accessorKey: "spareParts",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Spare Parts
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("spareParts") as RepairJob["spareParts"];
      if (value === null || value === undefined) {
        return <></>;
      }
      return <>To be Implemented</>;
    },
  },
  {
    accessorKey: "repairCost",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Repair Cost
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const rawValue = row.getValue("repairCost");
      const amount = parseDecimal(rawValue);
      const formatted = formatCurrency(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "discount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Discount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const rawValue = row.getValue("discount");
      const amount = parseDecimal(rawValue);
      const formatted = formatCurrency(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "totalSparePartsCost",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Spare Parts Cost
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const rawValue = row.getValue("totalSparePartsCost");
      const amount = parseDecimal(rawValue);
      const formatted = formatCurrency(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "profit",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Profit
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const rawValue = row.getValue("profit");
      const amount = parseDecimal(rawValue);
      const formatted = formatCurrency(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Payment Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const data = row.original as RepairJob;
      const status = data.paymentDetails?.paymentStatus ?? "N/A";

      return <div className="capitalize">{status}</div>;
    },
  },
  {
    accessorKey: "amountReceived",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount Received
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const raw = row.original.paymentDetails?.amountReceived;
      const value = raw ? parseDecimal(raw.toString()) : 0;
      const formatted = formatCurrency(value);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "amountDue",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount Due
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const raw = row.original.paymentDetails?.amountDue;
      const value = raw ? parseDecimal(raw.toString()) : 0;
      const formatted = formatCurrency(value);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Notes
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.original.notes;

      return <div>{value}</div>;
    },
  },
  {
    accessorKey: "pickedAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Picked At
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("pickedAt") as RepairJob["pickedAt"];
      if (!date) {
        return <></>;
      }
      return <div>{formatDate(date)}</div>;
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
      const date = formatDate(row.getValue("createdAt"));
      if (!date) {
        return <></>;
      }
      return <div>{date}</div>;
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
      const date = formatDate(row.getValue("updatedAt"));
      if (!date) {
        return <></>;
      }
      return <div>{date}</div>;
    },
  },
];
