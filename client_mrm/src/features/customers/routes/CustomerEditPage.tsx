import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import type { Customer } from "@/features/customers/types";
import { EditCustomerForm } from "@/features/customers/components/customerEditForm";
import { getCustomerById, updateCustomer } from "../api/customerApi";
import { getChangedFields } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

export function CustomerEditPage() {
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

  const handleEdit = (updatedData: Customer) => {
    if (!customerId || !customer) {
      toast.error("Customer ID or original data is missing");
      return;
    }
    const changedFields = getChangedFields(updatedData, customer);
    if (Object.keys(changedFields).length === 0) {
      toast.info("No changes detected");
      return;
    }
    const payload = { data: [{ ...changedFields }] };
    const submitUpdate = async () => {
      try {
        const result = await updateCustomer(customerId, payload);
        toast.success("Customer details updated");
        navigate(ROUTES.CUSTOMERS.DETAILS(result.data[0]._id));
      } catch (error: any) {
        console.error("Update failed:", error.response?.data?.message || error.message);
        toast.error(`Unable to update customer: ${error.response?.data?.message || "Unknown error"}`);
      }
    };

    submitUpdate();
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!customer)
    return <div className="p-6 text-center">Customer not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Customer</h1>
      <EditCustomerForm customer={customer} onSubmit={handleEdit} />
    </div>
  );
}
