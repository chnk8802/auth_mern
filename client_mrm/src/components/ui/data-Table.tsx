"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import pluralize from "pluralize";
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
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Download,
  Ellipsis,
  Import,
  MoveLeftIcon,
  MoveRightIcon,
  CirclePlus,
} from "lucide-react";
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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSidebar } from "./sidebar";
import { cn } from "@/lib/utils";
import { ListPageHeader } from "../headers/ListPageHeader";
import { SearchDrawer } from "../listView/SearchDrawer";
import { ROUTES } from "@/constants/routes.constants";
import { LiveFormData } from "../debugging/LiveFormData";
import { entries } from "lodash";

interface DataTableProps<TData extends { _id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  moduleName?: string;
  page?: number;
  setPage?: (page: number) => void;
  limit?: number;
  setLimit?: (limit: number) => void;
  total?: number;
}

export function DataTable<TData extends { _id: string }, TValue>({
  columns,
  data,
  moduleName,
  page,
  setPage,
  limit,
  setLimit,
  total,
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const [showLiveData, setShowLiveData] = React.useState(true);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      createdAt: false,
      updatedAt: false,
    });
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
      pagination: {
        pageIndex: (page || 1) - 1,
        pageSize: limit || 10,
      },
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
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    // Manual Pagination
    manualPagination: true,
    pageCount: total && limit ? Math.ceil(total / limit) : -1,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const next = updater({
          pageIndex: (page || 1) - 1,
          pageSize: limit || 10,
        });
        setPage?.(next.pageIndex + 1);
        setLimit?.(next.pageSize);
      } else {
        setPage?.(updater.pageIndex + 1);
        setLimit?.(updater.pageSize);
      }
    },
    // Filters
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      return row.getVisibleCells().some((cell) =>
        String(cell.getValue() ?? "")
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    },
  });


  function ListViewActionButton<TData>({
    table,
  }: {
    table: ReturnType<typeof useReactTable<TData>>;
  }) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
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
                  .map((column) => (
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
                  ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowLiveData(!showLiveData)}>
              {showLiveData ? <>Hide</> : <>Show</>}
            Live Form Data
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Import className="mr-2 h-4 w-4" /> Import
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" /> Export
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
    <div>
      <ListPageHeader
        title={pluralize(moduleName || "")}
        backLink={ROUTES.DASHBOARD}
        actions={
          <Button
            onClick={() =>
              navigate(
                `/dashboard/${pluralize(
                  moduleName?.replace(/\s+/g, "").toLowerCase() || ""
                )}/new`
              )
            }
          >
            {isMobile ? (
              <CirclePlus />
            ) : (
              <>
                <CirclePlus /> Add
              </>
            )}
          </Button>
        }
        filters={
          <>
            <SearchDrawer
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </>
        }
        more={
          <>
            <ListViewActionButton table={table} />
          </>
        }
      />

      <div className="border rounded-md mt-2 max-h-[calc(100vh-210px)] overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="shadow-sm">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onDoubleClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (
                      target.closest("button") ||
                      target.closest("input") ||
                      target.closest("a")
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
                        "sticky left-0 shadow-md":
                          cell.column.getIsPinned() === "left" &&
                          cell.column.id === "select",

                        "sticky left-[24px]":
                          cell.column.getIsPinned() === "left" &&
                          cell.column.id === "actions",
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

      <div className="flex items-center justify-end space-x-2 p-4">
        <div className="text-muted-foreground flex-1 text-sm">
          Total {total}
        </div>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {limit} Records
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={String(limit)}
                onValueChange={(value) => setLimit?.(parseInt(value))}
              >
                <DropdownMenuRadioItem value="10">
                  10 Records
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="25">
                  25 Records
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="50">
                  50 Records
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="100">
                  100 Records
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="200">
                  200 Records
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <MoveLeftIcon /> {!isMobile && "Previous"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {!isMobile && "Next"} <MoveRightIcon />
          </Button>
        </div>
      </div>
    </div>
    {showLiveData && <LiveFormData data={data}/>}
    </>
  );
}
