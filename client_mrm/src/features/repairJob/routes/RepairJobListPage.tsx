"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-Table";
import {
  getRepairJobs,
  deleteRepairJob,
} from "@/features/repairJob/api/repairJobApi";
import type { RepairJob } from "@/features/repairJob/types";
import { useNavigate } from "react-router-dom";
import { ColumnGenerator } from "@/lib/form-generator/components/ListView/ColumnGenerator";
import { repairJobFields } from "../config/repiarJobFields";

export function RepairJobListPage() {
  const navigate = useNavigate();
  const [repairJobs, setRepairJobs] = useState<RepairJob[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchRepairJobs = async () => {
    try {
      const res = await getRepairJobs({ page, limit });
      if (res.data.length === 0) {
        setRepairJobs([]);
        return;
      }
      setTotal(res.meta.pagination.total);
      setRepairJobs(res.data);
    } catch (error: any) {
      toast.error("Failed to fetch repair jobs");
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handleRowEdit = (repairJob: RepairJob) => {
    navigate(`/dashboard/repairJob/${repairJob._id}/edit`);
  };

  const handleRowDelete = async (repairJob: RepairJob) => {
    try {
      const result = await deleteRepairJob(repairJob._id);
      if (result.data.length === 0) {
        toast.error("Repair job not found");
        return;
      }
      toast.success(`${result.data[0].repairJobCode} Repair job deleted`);
      fetchRepairJobs();
    } catch (err) {
      toast.error("Failed to delete Repair job");
    }
  };

  const columns = ColumnGenerator<RepairJob>({
    fieldConfig: repairJobFields,
    onEdit: handleRowEdit,
    onDelete: handleRowDelete,
    copyField: "repairJobCode",
  });

  useEffect(() => {
    fetchRepairJobs();
  }, [page, limit]);
  return (
    <DataTable
      columns={columns}
      data={repairJobs}
      moduleName={"Repair Job"}
      page={page}
      setPage={setPage}
      limit={limit}
      setLimit={setLimit}
      total={total}
    />
  );
}
