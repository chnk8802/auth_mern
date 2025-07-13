"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { RepairJob } from "@/features/repairJob/types";
import { ROUTES } from "@/constants/routes";
import {
  getRepairjobById,
  deleteRepairJob,
} from "@/features/repairJob/api/repairJobApi";
import { formatCurrency, formatDate, parseDecimal } from "@/lib/utils";
import { DetailsPageHeader } from "@/components/headers/DetailsHeader";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/form/DeleteConfirmDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { SquarePen, Trash2 } from "lucide-react";
import { PaymentStatusBadge } from "@/components/common/PaymentStatusBadge";
import { RepairJobStatusBadge } from "@/components/common/RepairJobStatusBadge";
import { Section } from "@/components/layout/sectionLayouts/Sections";
import { DetailItem } from "@/components/layout/sectionLayouts/DetailViewComponents";
import { MoreDropdown } from "@/components/detailsView/MoreDropdown";

export function RepairJobDetailPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { repairJobId } = useParams();
  const [repairJob, setRepairJob] = useState<RepairJob | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!repairJobId) return;

    const fetchRepairJob = async () => {
      try {
        const res = await getRepairjobById(repairJobId);
        console.log(res.data[0]);
        setRepairJob(res.data[0]);
      } catch (err) {
        console.error("Failed to fetch repair Job", err);
        toast.error("Failed to fetch repair Job");
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

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!repairJob)
    return (
      <div className="p-6 text-start">
        <DetailsPageHeader title="Customer Details" />
        Repair Job not found.
      </div>
    );

  return (
    <div className="px-4">
      <DetailsPageHeader
        title={
          <>
            {repairJob.repairJobCode}{" "}
            <RepairJobStatusBadge status={repairJob.repairStatus} />{" "}
            <PaymentStatusBadge
              status={repairJob?.paymentDetails?.paymentStatus}
            />{" "}
          </>
        }
        onBack={() => navigate(ROUTES.REPAIR_JOBS.LIST)}
        actions={
          <>
            <Button
              size={isMobile ? "icon" : "default"}
              onClick={() => navigate(ROUTES.REPAIR_JOBS.EDIT(repairJob._id))}
            >
              {isMobile ? (
                <SquarePen />
              ) : (
                <>
                  <SquarePen /> Edit
                </>
              )}
            </Button>
            <DeleteConfirmDialog onConfirm={() => handleDelete()}>
              <Button size={isMobile ? "icon" : "default"}>
                {isMobile ? (
                  <Trash2 />
                ) : (
                  <>
                    <Trash2 /> Delete
                  </>
                )}
              </Button>
            </DeleteConfirmDialog>
          </>
        }
        more={
          <MoreDropdown
            onDownloadPdf={() => console.log("Download PDF")}
            onPrint={() => console.log("Print")}
          />
        }
      />
      <>
        <Section title="Repair Job Information" col={4}>
          <DetailItem
            label="Repair Status"
            value={<RepairJobStatusBadge status={repairJob.repairStatus} />}
          />

          <DetailItem
            label="Customer"
            value={
              repairJob.customer?.fullName
                ? repairJob.customer.fullName
                : repairJob.customer?.customerCode
            }
            ref={{
              module: "customers", // or whatever your module name is
              id: repairJob.customer?._id ?? "",
            }}
          />
          <DetailItem label="Repair Job Code" value={repairJob.repairJobCode} />
          <DetailItem label="Device Model" value={repairJob.deviceModel} />
          <DetailItem label="Device IMEI" value={repairJob.deviceIMEI} />
          <DetailItem
            label="Issue Description"
            value={repairJob.issueDescription}
          />
          <DetailItem label="Repair Type" value={repairJob.repairType} />
          <DetailItem
            label="Technician"
            value={
              repairJob.technician?.fullName
                ? repairJob.technician.fullName
                : repairJob.technician?.userCode
            }
            ref={{
              module: "users",
              id: repairJob.technician?._id ?? "",
            }}
          />
          <DetailItem
            label="Device Components"
            value={
              repairJob.deviceComponents?.length
                ? repairJob.deviceComponents.join(", ")
                : "None"
            }
          />
          <DetailItem label="Spare Parts" value="To be implemented" />
          <DetailItem label="Notes" value={repairJob.notes ?? "None"} />
          <DetailItem
            label="Picked At"
            value={
              repairJob.pickedAt ? formatDate(repairJob.pickedAt) : "Not picked"
            }
          />
        </Section>

        <Section title="Financial Details" col={4}>
          <DetailItem
            label="Repair Cost"
            value={formatCurrency(parseDecimal(repairJob.repairCost))}
          />
          <DetailItem
            label="Discount"
            value={formatCurrency(parseDecimal(repairJob.discount))}
          />
          <DetailItem
            label="Total Spare Parts Cost"
            value={formatCurrency(parseDecimal(repairJob.totalSparePartsCost))}
          />
          <DetailItem
            label="Profit"
            value={formatCurrency(parseDecimal(repairJob.profit))}
          />

          <DetailItem
            label="Payment Status"
            value={
              repairJob.paymentDetails?.paymentStatus ? (
                <PaymentStatusBadge
                  status={repairJob.paymentDetails.paymentStatus}
                />
              ) : (
                "N/A"
              )
            }
          />

          <DetailItem
            label="Amount Received"
            value={formatCurrency(
              parseDecimal(repairJob.paymentDetails?.amountReceived ?? 0)
            )}
          />
          <DetailItem
            label="Amount Due"
            value={formatCurrency(
              parseDecimal(repairJob.paymentDetails?.amountDue ?? 0)
            )}
          />
        </Section>

        <Section title="Audit Trail" col={4}>
          <DetailItem
            label="Created At"
            value={formatDate(repairJob.createdAt)}
          />
          <DetailItem
            label="Updated At"
            value={formatDate(repairJob.updatedAt)}
          />
        </Section>
      </>
    </div>
  );
}
