"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import type {
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Download, Ellipsis, Import } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchToggle } from "@/components/common/SearchToggle";
import { useSidebar } from "./sidebar";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

interface DataTableProps<TData extends { _id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  moduleName?: string;
}

export function DataTable<TData extends { _id: string }, TValue>({
  columns,
  data,
  moduleName,
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate();
  const { isMobile, state } = useSidebar();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({
    left: ["select", "actions"],
    right: [],
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      columnPinning,
    },
    onColumnPinningChange: setColumnPinning,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    /*--------------------- */
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      return row.getVisibleCells().some((cell) =>
        String(cell.getValue() ?? "")
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    },
    /*--------------------- */
  });

  return (
    <div
      className={state === "expanded" && isMobile !== true ? "w-full" : "w-full"}
    >
      <div className="flex items-end justify-end gap-2 py-4">
        <div className="mr-auto text-xl font-semibold text-foreground">
          {moduleName}s
        </div>
        
        <SearchToggle
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <Button onClick={() => navigate(`/dashboard/${moduleName}s/new`)}>Add {moduleName}</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Columns</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Import /> Import
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download /> Export
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={(e) => {
                    // Prevent navigation if the clicked element is an interactive element
                    const target = e.target as HTMLElement;
                    if (
                      target.closest("button") || // avoid buttons
                      target.closest("input") || // avoid checkboxes
                      target.closest("a") // avoid links
                    ) {
                      return;
                    }

                    navigate(row.original._id);
                  }}
                  className="cursor-pointer hover:bg-muted transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn({
                        "sticky left-0 z-30 bg-white shadow-md":
                          cell.column.getIsPinned() === "left" &&
                          cell.column.id === "select",
                        "sticky left-[20px] z-20 bg-white":
                          cell.column.getIsPinned() === "left" &&
                          cell.column.id === "actions",
                        "sticky right-0 z-10 bg-white":
                          cell.column.getIsPinned() === "right",
                      })}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
