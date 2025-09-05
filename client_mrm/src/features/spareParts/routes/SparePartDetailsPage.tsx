"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ROUTES } from "@/constants/routes";
import { DetailsPageHeader } from "@/components/headers/DetailsHeader";
import { DetailsBuilder } from "@/lib/form-generator/components/DetailView/DetailBuilder";
import { deleteSparePart, getSparePartById } from "../api/sparePartApi";
import { sparePartConfig } from "../config/sparePartFields";
import type { SparePart } from "../types";

export function SparePartDetailPage() {
  const navigate = useNavigate();
  const { sparePartId } = useParams();
  const [sparePart, setSparePart] = useState<SparePart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sparePartId) return;

    const fetchSparePart = async () => {
      try {
        const res = await getSparePartById(sparePartId);
        setSparePart(res.data[0]);
      } catch (err) {
        console.error("Failed to fetch spare part", err);
        toast.error("Failed to fetch spare part");
      } finally {
        setLoading(false);
      }
    };

    fetchSparePart();
  }, [sparePartId]);

  const handleDelete = async () => {
    if (!sparePart?._id) return;

    try {
      const result = await deleteSparePart(sparePart._id);

      toast.success(`${result.data[0].partCode} deleted successfully`);
      navigate(ROUTES.SPARE_PARTS.LIST);
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete spare part");
    }
  };
  const handleEdit = async () => {
     if (!sparePart?._id) return;
     navigate(ROUTES.SPARE_PARTS.EDIT(sparePart._id));
  }

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!sparePart)
    return (
      <div className="p-6 text-start">
        <DetailsPageHeader title="Spare Part Details" />
        Spare Part not found.
      </div>
    );

  return (
    <div className="px-4">
      <DetailsBuilder
        title="Spare Part Details"
        backLink={ROUTES.SPARE_PARTS.LIST}
        fieldConfig={sparePartConfig}
        data={sparePart}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
