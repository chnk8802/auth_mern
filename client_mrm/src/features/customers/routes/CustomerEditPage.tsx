import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import type { Customer } from "@/features/customers/types";
import { EditCustomerForm } from "@/features/customers/components/customerEditForm";
import { getCustomerById, updateCustomer } from "../api/customerApi";
import { getChangedFields } from "@/lib/utils/utils";
import { ROUTES } from "@/constants/routes";
import { BasePageHeader } from "@/components/common/headers/BasePageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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

  const handleEdit = (data: Customer) => {
    if (!customerId || !customer) {
      toast.error("Customer ID or original data is missing");
      return;
    }
    const changedFields = getChangedFields(data, customer);
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

  if (loading) return <div className="p-2 text-center">Loading...</div>;
  if (!customer)
    return <div className="p-2 text-center">Customer not found</div>;

  return (
    <div>
      <BasePageHeader title="Edit Customer" subtitle="" actions={<Button className="btn"><Plus/></Button>} />
      <EditCustomerForm customer={customer} onSubmit={handleEdit} />
    </div>
  );
}
