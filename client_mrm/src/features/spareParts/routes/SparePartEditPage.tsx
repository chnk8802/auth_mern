import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { getChangedFields } from "@/lib/utils";
import { ROUTES } from "@/constants/routes.constants";
import { getSparePartById, updateSparePart } from "../api/sparePartApi";
import type { SparePart } from "../types";
import { SparePartEditForm } from "../components/sparePartEditForm";
import { Loading } from "@/components/common/Loading";

export function SparePartEditPage() {
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
        toast.error("Failed to fetch spare part");
      } finally {
        setLoading(false);
      }
    };

    fetchSparePart();
  }, [sparePartId]);

  const handleEdit = (data: SparePart) => {
    if (!sparePartId || !sparePart) {
      toast.error("Spare Part ID or original data is missing");
      return;
    }
    const changedFields = getChangedFields(data, sparePart);
    if (Object.keys(changedFields).length === 0) {
      toast.info("No changes detected");
      return;
    }
    const payload = { data: [{ ...changedFields }] };
    const submitUpdate = async () => {
      try {
        const result = await updateSparePart(sparePartId, payload);
        toast.success("Spare Part details updated");
        navigate(ROUTES.SPARE_PARTS.DETAILS(result.data[0]._id));
      } catch (error: any) {
        toast.error(
          `Unable to update spare part: ${
            error.response?.data?.message || "Unknown error"
          }`
        );
      }
    };

    submitUpdate();
  };

  if (loading) return <Loading fullscreen={true} />;
  if (!sparePart)
    return <div className="p-2 text-center">Spare Part not found</div>;

  return (
    <>
      <SparePartEditForm sparePart={sparePart} onSubmit={handleEdit}/>
    </>
  );
}
