"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ROUTES } from "@/constants/routes.constants";
import { DetailsPageHeader } from "@/components/headers/DetailsHeader";
import { DetailsBuilder } from "@/lib/form-generator/components/DetailView/DetailBuilder";
import { deleteSupplier, getSupplierById } from "../api/supplierApi";
import { supplierConfig } from "../config/supplierConfig";
import type { Supplier } from "../types";
import { Loading } from "@/components/common/Loading";

export function SupplierDetailPage() {
  const navigate = useNavigate();
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supplierId) return;

    const fetchSupplier = async () => {
      try {
        const res = await getSupplierById(supplierId);
        setSupplier(res.data[0]);
      } catch (err) {
        toast.error("Failed to fetch supplier");
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [supplierId]);

  const handleDelete = async () => {
    if (!supplier?._id) return;

    try {
      const result = await deleteSupplier(supplier._id);
      toast.success(`${result.data[0].supplierCode} deleted successfully`);
      navigate(ROUTES.SUPPLIERS.LIST);
    } catch (err) {
      toast.error("Failed to delete supplier");
    }
  };

  const handleEdit = async () => {
    if (!supplier?._id) return;
    navigate(ROUTES.SUPPLIERS.EDIT(supplier._id));
  };

  if (loading) return <Loading fullscreen={true} />;
  if (!supplier)
    return (
      <div className="p-6 text-start">
        <DetailsPageHeader title="Supplier Details" />
        Supplier not found.
      </div>
    );

  return (
    <DetailsBuilder
      title="Supplier Details"
      fieldConfig={supplierConfig}
      data={supplier}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );
}
