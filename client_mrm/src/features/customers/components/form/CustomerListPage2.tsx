"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-Table";
import {
  getCustomers,
  deleteCustomer,
} from "@/features/customers/api/customerApi";
import type { Customer } from "@/features/customers/types";
import { useNavigate } from "react-router-dom";
import { ColumnGenerator } from "@/lib/form-generator/components/ListView/ColumnGenerator";
import { customerFields } from "./customerFields";

export function CustomersListPage2() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

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

  const columns = ColumnGenerator<Customer>({
    fields: customerFields,
    onEdit: handleRowEdit,
    onDelete: handleRowDelete,
    copyField: "customerCode",
  });

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers({ page, limit });
      if (res.data.length === 0) {
        setCustomers([]);
        return;
      }
      setTotal(res.meta.pagination.total);
      setCustomers(res.data);
    } catch (error: any) {
      toast.error("Failed to fetch customers");
      console.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, limit]);
  return (
    <>
      <DataTable
        columns={columns}
        data={customers}
        moduleName={"Customer"}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        total={total}
      />
    </>
  );
}
