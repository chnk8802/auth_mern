import { toast } from "sonner";
import { createCustomer } from "../../api/customerApi";
import { CustomerForm } from "./CutomerForm";
import type { AuthUser } from "@/features/auth/types";
import type { Customer } from "../../types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const mockUser: AuthUser = {
    _id: "u123456789",
    fullName: "Naveen Kumar",
    email: "naveen@example.com",
    address: {
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      postalCode: "560001",
    },
    role: "admin",
  };

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
      <CustomerForm currentUser={mockUser} onSubmit={handleSave} />
    </>
  );
}
