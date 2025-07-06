import type { User } from "@/features/users/types";
import { EditUserForm } from "@/features/users/components/UserEditForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getUserById } from "../api/userApi";

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
  const {userId} = useParams()
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await getUserById(userId);
        setUser(res.data[0]);
      } catch (err) {
        console.error("Failed to fetch user", err);
        toast.error("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleEdit = (data: User) => {
    console.log("Edited user:", data);
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!user) return <div className="p-6 text-center">User not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit User</h1>
      <EditUserForm user={user} onSubmit={handleEdit} />
    </div>
  );
}
