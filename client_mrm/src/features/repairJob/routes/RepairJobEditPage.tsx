import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { type RepairJob } from "../types";
import { getRepairjobById, updateRepairJob } from "../api/repairJobApi";
import { getChangedFields } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { RepairJobEditForm } from "../components/RepairJobEditForm";

export function RepairJobEditPage() {
  const navigate = useNavigate();
  const { repairJobId } = useParams();
  const [repairJob, setRepairJob] = useState<RepairJob | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!repairJobId) return;

    const fetchRepairJob = async () => {
      try {
        const res = await getRepairjobById(repairJobId);
        setRepairJob(res.data[0]);
      } catch (err) {
        console.error("Failed to fetch repair job", err);
        toast.error("Failed to fetch repair job");
      } finally {
        setLoading(false);
      }
    };

    fetchRepairJob();
  }, [repairJobId]);

  const handleEdit = (data: RepairJob) => {
    if (!repairJobId || !repairJob) {
      toast.error("Repair Job ID or original data is missing");
      return;
    }
    const changedFields = getChangedFields(data, repairJob);
    if (Object.keys(changedFields).length === 0) {
      toast.info("No changes detected");
      return;
    }
    const payload = { data: [{ ...changedFields }] };
    const submitUpdate = async () => {
      try {
        const result = await updateRepairJob(repairJobId, payload);
        toast.success("Repair Job details updated");
        navigate(ROUTES.REPAIR_JOBS.DETAILS(result.data[0]._id));
      } catch (error: any) {
        console.error(
          "Update failed:",
          error.response?.data?.message || error.message
        );
        toast.error(
          `Unable to update customer: ${
            error.response?.data?.message || "Unknown error"
          }`
        );
      }
    };

    submitUpdate();
  };

  if (loading) return <div className="p-2 text-center">Loading...</div>;
  if (!repairJob)
    return <div className="p-2 text-center">Customer not found</div>;

  return (
    <>
      <RepairJobEditForm repairJob={repairJob} onSubmit={handleEdit}/>
    </>
  );
}
