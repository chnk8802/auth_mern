import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import type { SparePartEntry } from "@/features/sparePartEntries/types";
import {
  getSparePartEntryById,
  updateSparePartEntry,
} from "@/features/sparePartEntries/api/sparePartEntryApi";
import { getChangedFields } from "@/lib/utils";
import { ROUTES } from "@/constants/routes.constants";
import { Loading } from "@/components/common/Loading";
import { SparePartEntryEditForm } from "@/features/sparePartEntries/components/SparePartEntryEditForm";

export function SparePartEntryEditPage() {
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

  const handleEdit = (data: SparePartEntry) => {
    if (!sparePartEntryId || !sparePartEntry) {
      toast.error("Spare Part Entry ID or original data is missing");
      return;
    }

    const changedFields = getChangedFields(data, sparePartEntry);
    if (Object.keys(changedFields).length === 0) {
      toast.info("No changes detected");
      return;
    }

    const payload = { data: [{ ...changedFields }] };
    const submitUpdate = async () => {
      try {
        const result = await updateSparePartEntry(sparePartEntryId, payload);
        toast.success("Spare part entry updated");
        navigate(ROUTES.SPARE_PART_ENTRIES.DETAILS(result.data[0]._id));
      } catch (error: any) {
        toast.error(
          `Unable to update spare part entry: ${
            error.response?.data?.message || "Unknown error"
          }`
        );
      }
    };

    submitUpdate();
  };

  if (loading) return <Loading fullscreen={true} />;
  if (!sparePartEntry)
    return <div className="p-2 text-center">Spare part entry not found</div>;

  return (
    <>
      <SparePartEntryEditForm
        sparePartEntry={sparePartEntry}
        onSubmit={handleEdit}
      />
    </>
  );
}
