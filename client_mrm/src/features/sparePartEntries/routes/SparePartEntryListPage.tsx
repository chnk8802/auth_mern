"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-Table";
import {
  getSparePartEntries,
  deleteSparePartEntry,
} from "@/features/sparePartEntries/api/sparePartEntryApi";
import type { SparePartEntry } from "@/features/sparePartEntries/types";
import { useNavigate } from "react-router-dom";
import { ColumnGenerator } from "@/lib/form-generator/components/ListView/ColumnGenerator";
import { sparePartEntryFields } from "../config/sparePartEntryFields";

export function SparePartEntryListPage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<SparePartEntry[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const handleRowEdit = (entry: SparePartEntry) => {
    navigate(`/dashboard/sparepartentries/${entry._id}/edit`);
  };

  const handleRowDelete = async (entry: SparePartEntry) => {
    try {
      const result = await deleteSparePartEntry(entry._id);
      if (result.data.length === 0) {
        toast.error("Spare part entry not found");
        return;
      }
      toast.success(`Spare part entry ${result.data[0].sparePartEntryCode} deleted`);
      fetchEntries();
    } catch (err) {
      toast.error("Failed to delete spare part entry");
    }
  };

  const columns = ColumnGenerator<SparePartEntry>({
    fieldConfig: sparePartEntryFields,
    onEdit: handleRowEdit,
    onDelete: handleRowDelete,
    copyField: "sparePartEntryCode", // adjust this to your unique identifier
  });

  const fetchEntries = async () => {
    try {
      const res = await getSparePartEntries({ page, limit });
      if (res.data.length === 0) {
        setEntries([]);
        return;
      }
      setTotal(res.meta.pagination.total);
      setEntries(res.data);
    } catch (error: any) {
      toast.error("Failed to fetch spare part entries");
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [page, limit]);

  return (
    <>
      <DataTable
        columns={columns}
        data={entries}
        moduleName={"Spare Part Entry"}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        total={total}
      />
    </>
  );
}
