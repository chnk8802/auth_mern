"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-Table";
import { useNavigate } from "react-router-dom";
import { ColumnGenerator } from "@/lib/form-generator/components/ListView/ColumnGenerator";
import { deleteSupplier, getSuppliers } from "../api/supplierApi";
import type { Supplier } from "../types";
import { supplierConfig } from "../config/supplierConfig";

export function SupplierListPage() {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const handleRowEdit = (supplier: Supplier) => {
    navigate(`/dashboard/suppliers/${supplier._id}/edit`);
  };

  const handleRowDelete = async (supplier: Supplier) => {
    try {
      const result = await deleteSupplier(supplier._id);
      if (result.data.length === 0) {
        toast.error("Supplier not found");
        return;
      }
      toast.success(`${result.data[0].name} deleted`);
      fetchSuppliers();
    } catch (err) {
      toast.error("Failed to delete supplier");
    }
  };

  const columns = ColumnGenerator<Supplier>({
    fieldConfig: supplierConfig,
    onEdit: handleRowEdit,
    onDelete: handleRowDelete,
    copyField: "supplierCode", // you can change this if you want another field copied
  });

  const fetchSuppliers = async () => {
    try {
      const res = await getSuppliers({ page, limit });
      if (res.data.length === 0) {
        setSuppliers([]);
        return;
      }
      setTotal(res.meta.pagination.total);
      setSuppliers(res.data);
    } catch (error: any) {
      toast.error("Failed to fetch suppliers");
      console.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, [page, limit]);

  return (
    <DataTable
      columns={columns}
      data={suppliers}
      moduleName={"Supplier"}
      page={page}
      setPage={setPage}
      limit={limit}
      setLimit={setLimit}
      total={total}
    />
  );
}
