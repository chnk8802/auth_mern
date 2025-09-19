"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-Table";
import { useNavigate } from "react-router-dom";
import { ColumnGenerator } from "@/lib/form-generator/components/ListView/ColumnGenerator";
import { deleteSparePart, getSpareParts } from "../api/sparePartApi";
import type { SparePart } from "../types";
import {sparePartConfig} from "@/features/spareParts/config/sparePartFields";

export function SparePartListPage() {
  const navigate = useNavigate();
  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const handleRowEdit = (sparePart: SparePart) => {
    navigate(`/dashboard/spareparts/${sparePart._id}/edit`);
  };

  const handleRowDelete = async (sparePart: SparePart) => {
    try {
      const result = await deleteSparePart(sparePart._id);
      if (result.data.length === 0) {
        toast.error("Spare Part not found");
        return;
      }
      toast.success(`${result.data[0].partCode} Spare Part deleted`);
      fetchSpareParts();
    } catch (err) {
      toast.error("Failed to delete spare part");
    }
  };

  const columns = ColumnGenerator<SparePart>({
    fieldConfig: sparePartConfig,
    onEdit: handleRowEdit,
    onDelete: handleRowDelete,
    copyField: "partCode",
  });

  const fetchSpareParts = async () => {
    try {
      const res = await getSpareParts({ page, limit });
      if (res.data.length === 0) {
        setSpareParts([]);
        return;
      }
      setTotal(res.meta.pagination.total);
      setSpareParts(res.data);
    } catch (error: any) {
      toast.error("Failed to fetch spare parts");
    }
  };

  useEffect(() => {
    fetchSpareParts();
  }, [page, limit]);
  
  return (
    <>
      <DataTable
        columns={columns}
        data={spareParts}
        moduleName={"Spare Part"}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        total={total}
      />
    </>
  );
}
