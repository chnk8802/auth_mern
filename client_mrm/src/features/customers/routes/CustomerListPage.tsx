"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-Table";
import { getCustomerColumns } from "@/features/customers/components/columns";
import { getCustomers, deleteCustomer } from "@/features/customers/api/customerApi";
import type { Customer } from "@/features/customers/types";
import { useNavigate } from "react-router-dom";

export function CustomersPage() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const handleRowEdit = (customer: Customer) => {
    navigate(`/dashboard/customers/${customer._id}/edit`);
  };

  const handleRowDelete = async (customer: Customer) => {
    try {
      const result = await deleteCustomer(customer._id);
      if (result.data.length === 0) {
        toast.error("Customer not found");
        return;
      }
      toast.success(`${result.data[0].customerCode} Customer deleted`);
      fetchCustomers();
    } catch (err) {
      toast.error("Failed to delete customer");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <DataTable
      columns={getCustomerColumns({
        onEdit: handleRowEdit,
        onDelete: handleRowDelete,
      })}
      data={customers}
      moduleName={"Customer"}
    />
  );
}
