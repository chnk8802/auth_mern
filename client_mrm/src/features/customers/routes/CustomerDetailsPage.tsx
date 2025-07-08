"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DetailGrid } from "@/components/common/DetailGrid";
import { DetailItem } from "@/components/common/DetailItem";
import { DetailToolbar } from "@/components/common/DetailPageToolbar";
import type { Customer } from "@/features/customers/types";
import { ROUTES } from "@/constants/routes";
import {
  deleteCustomer,
  getCustomerById,
} from "@/features/customers/api/customerApi";
import { formatSnakeCaseLabel } from "@/lib/utils/utils";
import { CircleX, CircleCheck } from "lucide-react";

export function CustomerDetailPage() {
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
      console.log("results", result);
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
        <DetailToolbar title="Customer Details" />
        Customer not found.
      </div>
    );

  return (
    <>
      <DetailToolbar
        title="Customer Details"
        onEdit={() => navigate(ROUTES.CUSTOMERS.EDIT(customer._id))}
        onDelete={() => handleDelete()}
      />
      <DetailGrid>
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
      </DetailGrid>
    </>
  );
}
