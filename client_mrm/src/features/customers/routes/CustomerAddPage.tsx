import type { Customer } from "@/features/customers/types";
import { AddCustomerForm } from "@/features/customers/components/customerAddForm";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../api/customerApi";
import { toast } from "sonner";
import { ROUTES } from "@/constants/routes";
import { FormHeader } from "@/components/common/headers/FormHeader";

export function CustomerAddPage() {
  const navigate = useNavigate();

  const handleAdd = (customerData: Omit<Customer, "_id">) => {
    const payload = { data: [customerData] };
    console.log(payload)

    const submitAdd = async () => {
      try {
        const result = await createCustomer(payload);
        toast.success("Customer added successfully");
          navigate(ROUTES.CUSTOMERS.DETAILS(result.data[0]._id))
      } catch (error: any) {
        console.error("Unable to add customer", error);
        toast.error(`Unable to add customer ${error?.response?.data?.message}`);
      }
    };

    submitAdd();
  };

  return (
    <div>
      <FormHeader title="Add Customer" />
      <AddCustomerForm onSubmit={handleAdd} />
    </div>
  );
}
