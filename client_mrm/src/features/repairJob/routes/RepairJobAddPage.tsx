import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { RepairJob } from "@/features/repairJob/types";
import { AddRepairJobForm } from "@/features/repairJob/components/RepairJobAddForm";
import { createRepairJob } from "@/features/repairJob/api/repairJobApi";
import { ROUTES } from "@/constants/routes";

export function RepairJobAddPage() {
  const navigate = useNavigate();

  const handleAdd = (repairJobData: Omit<RepairJob, "_id">) => {
    const payload = { data: [repairJobData] };
    console.log(payload)

    const submitAdd = async () => {
      try {
        const result = await createRepairJob(payload);
        console.log(result)
        toast.success("Reair Job added successfully");
          navigate(ROUTES.REPAIR_JOBS.DETAILS(result.data[0]._id))
      } catch (error: any) {
        console.error("Unable to add repair job", error);
        toast.error(`Unable to add repair job ${error?.response?.data?.message}`);
      }
    };

    submitAdd();
  };

  return (
    <>
      <AddRepairJobForm onSubmit={handleAdd} />
    </>
  );
}
