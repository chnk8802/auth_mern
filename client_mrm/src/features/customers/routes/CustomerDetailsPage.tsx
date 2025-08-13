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
import { customerFields } from "@/features/customers/config/customerFields";
import { DetailsPageHeader } from "@/components/headers/DetailsHeader";
import { DetailsBuilder } from "@/lib/form-generator/components/DetailView/DetailBuilder";

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

      toast.success(`${result.data[0].customerCode} deleted successfully`);
      navigate(ROUTES.CUSTOMERS.LIST);
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete customer");
    }
  };
  const handleEdit = async () => {
     if (!customer?._id) return;
     navigate(ROUTES.CUSTOMERS.EDIT(customer._id));
  }

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
      <DetailsBuilder
        title="Customer Details"
        backLink={ROUTES.CUSTOMERS.LIST}
        fieldConfig={customerFields}
        data={customer}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
