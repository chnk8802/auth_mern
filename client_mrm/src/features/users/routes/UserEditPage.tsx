import type { User } from "@/features/users/types";
import { EditUserForm } from "@/features/users/components/UserEditForm";

const mockUser: User = {
  _id: "1",
  userCode: "U123",
  fullName: "John Doe",
  email: "john@example.com",
  role: "admin",
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    country: "USA",
    zip: "90001",
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function UserEditPage() {
  const handleEdit = (data: User) => {
    console.log("Edited user:", data);
    // call API to update user
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit User</h1>
      <EditUserForm user={mockUser} onSubmit={handleEdit} />
    </div>
  );
}
