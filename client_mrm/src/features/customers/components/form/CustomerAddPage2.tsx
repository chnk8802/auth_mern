import { CustomerForm } from "./CutomerForm";
import type { AuthUser } from "@/features/auth/types";

export function CustomerAddPage() {
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
  return (
    <>
    {/* Render in fragment div etc is not needed */}
      <h2 className="text-xl font-semibold mb-4">Customer Form</h2>
      
      <CustomerForm currentUser={mockUser} />
    </>
  );
}
