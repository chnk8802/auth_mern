"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { SparePartEntry } from "@/features/sparePartEntries/types";
import { ROUTES } from "@/constants/routes.constants";
import {
  deleteSparePartEntry,
  getSparePartEntryById,
} from "@/features/sparePartEntries/api/sparePartEntryApi";
import { sparePartEntryFields } from "@/features/sparePartEntries/config/sparePartEntryFields";
import { DetailsPageHeader } from "@/components/headers/DetailsHeader";
import { DetailsBuilder } from "@/lib/form-generator/components/DetailView/DetailBuilder";
import { Loading } from "@/components/common/Loading";

export function SparePartEntryDetailPage() {
  const navigate = useNavigate();
  const { sparePartEntryId } = useParams();
  const [sparePartEntry, setSparePartEntry] = useState<SparePartEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sparePartEntryId) return;

    const fetchSparePartEntry = async () => {
      try {
        const res = await getSparePartEntryById(sparePartEntryId);
        setSparePartEntry(res.data[0]);
      } catch (err) {
        toast.error("Failed to fetch spare part entry");
      } finally {
        setLoading(false);
      }
    };

    fetchSparePartEntry();
  }, [sparePartEntryId]);

  const handleDelete = async () => {
    if (!sparePartEntry?._id) return;

    try {
      const result = await deleteSparePartEntry(sparePartEntry._id);
      toast.success(
        `${result.data[0].sparePartEntryCode} deleted successfully`
      );
      navigate(ROUTES.SPARE_PART_ENTRIES.LIST);
    } catch (err) {
      toast.error("Failed to delete spare part entry");
    }
  };

  const handleEdit = async () => {
    if (!sparePartEntry?._id) return;
    navigate(ROUTES.SPARE_PART_ENTRIES.EDIT(sparePartEntry._id));
  };

  if (loading) return <Loading fullscreen={true} />;
  if (!sparePartEntry)
    return (
      <div className="p-6 text-start">
        <DetailsPageHeader title="Spare Part Entry Details" />
        Spare part entry not found.
      </div>
    );

  return (
    <>
      <DetailsBuilder
        title="Spare Part Entry Details"
        fieldConfig={sparePartEntryFields}
        data={sparePartEntry}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
}
