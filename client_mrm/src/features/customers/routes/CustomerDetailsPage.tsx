"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Customer } from "@/features/customers/types";
import { ROUTES } from "@/constants/routes";
import {
  deleteCustomer,
  getCustomerById,
} from "@/features/customers/api/customerApi";
import { formatDate, formatSnakeCaseLabel } from "@/lib/utils";
import { DetailsPageHeader } from "@/components/headers/DetailsHeader";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { SquarePen, Trash2 } from "lucide-react";
import { Section } from "@/components/layout/sectionLayouts/Sections";
import { DetailItem } from "@/components/layout/sectionLayouts/DetailViewComponents";
import { MoreDropdown } from "@/components/detailsView/MoreDropdown";

export function CustomerDetailPage() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!customerId) return;

    const fetchCustomer = async () => {
      try {
        const res = await getCustomerById(customerId);
        setCustomer(res.data[0]);
      } catch (err) {
        console.error("Failed to fetch customer", err);
        toast.error("Failed to fetch customer");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const handleDelete = async () => {
    if (!customer?._id) return;

    try {
      const result = await deleteCustomer(customer._id);

      toast.success(`${result.data[0].customerCode} deleted successfully`);
      navigate(ROUTES.CUSTOMERS.LIST);
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete customer");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!customer)
    return (
      <div className="p-6 text-start">
        <DetailsPageHeader title="Customer Details" />
        Customer not found.
      </div>
    );

  return (
    <div className="px-4">
      <DetailsPageHeader
        title="Customer Details"
        onBack={() => navigate(ROUTES.CUSTOMERS.LIST)}
        actions={
          <>
            <Button
              size={isMobile ? "icon" : "default"}
              onClick={() => navigate(ROUTES.CUSTOMERS.EDIT(customer._id))}
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
          <>
            {
              <MoreDropdown
                onDownloadPdf={() => console.log("Download PDF")}
                onPrint={() => console.log("Print")}
              />
            }
          </>
        }
      />
      <Section col={2}>
        <DetailItem label="Customer Code" value={customer.customerCode} />
        <DetailItem label="Full Name" value={customer.fullName} />
        <DetailItem label="Phone" value={customer.phone} />
        <DetailItem
          label="Is Bulk Customer"
          value={customer.isBulkCustomer ? "Yes" : "No"}
        />
        <DetailItem
          label="Address"
          value={[
            customer.address?.street,
            customer.address?.city,
            formatSnakeCaseLabel(customer.address?.state),
            formatSnakeCaseLabel(customer.address?.country),
            customer.address?.zip,
          ]
            .filter(Boolean)
            .join(", ")}
        />
        <DetailItem label="Created at" value={formatDate(customer.createdAt)} />
        <DetailItem
          label="Last updated"
          value={formatDate(customer.updatedAt)}
        />
      </Section>
    </div>
  );
}
