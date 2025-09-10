"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { type RepairJob } from "../types";
import { ROUTES } from "@/constants/routes";
import { deleteRepairJob, getRepairjobById } from "../api/repairJobApi";
import { repairJobFields } from "../config/repiarJobFields";
import { DetailsPageHeader } from "@/components/headers/DetailsHeader";
import { DetailsBuilder } from "@/lib/form-generator/components/DetailView/DetailBuilder";
import { Loading } from "@/components/common/Loading";

export function RepairJobDetailPage() {
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

  const handleDelete = async () => {
    if (!repairJob?._id) return;

    try {
      const result = await deleteRepairJob(repairJob._id);

      toast.success(`${result.data[0].repairJobCode} deleted successfully`);
      navigate(ROUTES.REPAIR_JOBS.LIST);
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete repair job");
    }
  };
  const handleEdit = async () => {
     if (!repairJob?._id) return;
     navigate(ROUTES.REPAIR_JOBS.EDIT(repairJob._id));
  }

  if (loading) return <Loading fullscreen={true} />;
  if (!repairJob)
    return (
      <div className="p-6 text-start">
        <DetailsPageHeader title="Repair Job Details" />
        Repair job not found.
      </div>
    );

  return (
    <>
      <DetailsBuilder
        title="Repair Job Details"
        backLink={ROUTES.REPAIR_JOBS.LIST}
        fieldConfig={repairJobFields}
        data={repairJob}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
}
