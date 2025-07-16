import { toast } from "sonner";
import { createCustomer } from "../../api/customerApi";
import { CustomerForm } from "./CutomerForm";
import type { Customer } from "../../types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useAppSelector } from "@/hooks/redux";

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
      <CustomerForm context={{}} onSubmit={handleSave} />
    </>
  );
}
