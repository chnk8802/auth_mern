import { toast } from "sonner";
import { createCustomer } from "../api/customerApi";
import { CustomerAddForm } from "@/features/customers/components/customerAddForm";
import type { Customer } from "@/features/customers/types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export function CustomerAddPage() {
  const navigate = useNavigate();
   const handleSave = (customerData: Omit<Customer, "_id">) => {
    const payload = { data: [customerData] };

    const submitAdd = async () => {
      try {
        const result = await createCustomer(payload);
        toast.success("Customer added successfully");
        navigate(ROUTES.CUSTOMERS.DETAILS(result.data[0]._id));
      } catch (error: any) {
        console.error("Unable to add customer", error);
        toast.error(`Unable to add customer ${error?.response?.data?.message}`);
      }
    };

    submitAdd();
  };
  return (
    <>      
      <CustomerAddForm onSubmit={handleSave} />
    </>
  );
}
