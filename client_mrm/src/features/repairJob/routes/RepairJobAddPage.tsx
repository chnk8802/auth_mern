import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { RepairJob } from "@/features/repairJob/types";
import { AddRepairJobForm } from "@/features/repairJob/components/RepairJobAddForm";
import { createRepairJob } from "@/features/repairJob/api/repairJobApi";
import { ROUTES } from "@/constants/routes.constants";

export function RepairJobAddPage() {
  const navigate = useNavigate();

  const handleAdd = async (repairJobData: Omit<RepairJob, "_id">) => {
    const payload = { data: [repairJobData] };

    try {
      const result = await createRepairJob(payload);
      toast.success("Repair Job added successfully");
      const newRepairJobId = result.data[0]?._id;
      if (newRepairJobId) {
        navigate(ROUTES.REPAIR_JOBS.DETAILS(newRepairJobId));
      }
    } catch (error: any) {
      toast.error(
        `Unable to add repair job: ${error?.response?.data?.message || error.message}`
      );
    }
  };

  return <AddRepairJobForm onSubmit={handleAdd} />;
}
