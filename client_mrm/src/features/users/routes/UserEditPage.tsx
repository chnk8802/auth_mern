import type { User } from "@/features/users/types";
import { EditUserForm } from "@/features/users/components/UserEditForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getUserById, updateUser } from "../api/userApi";
import { getChangedFields } from "@/lib/utils/utils";
import { ROUTES } from "@/constants/routes";
import { DetailToolbar } from "@/components/headers/DetailPageToolbar";
import { FormHeader } from "@/components/headers/FormHeader";
import { Button } from "@/components/ui/button";

export function UserEditPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
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

  const handleEdit = (updateUserData: User) => {
    if (!userId || !user) {
      toast.error("User ID or original data is missing");
      return;
    }
    const changedFields = getChangedFields(updateUserData, user);
    console.log("Changed fields:", changedFields);
    if (Object.keys(changedFields).length === 0) {
      toast.info("No changes detected");
      return;
    }
    const payload = { data: [changedFields] };
    const submitUpdate = async () => {
      try {
        const result = await updateUser(userId, payload);
        console.log("Update result:", result);
        toast.success("User details updated");
        navigate(ROUTES.USERS.DETAILS(result.data[0]._id));
      } catch (error: any) {
        console.error(
          "Update failed:",
          error,
          error.response?.data?.message || error.message
        );
        toast.error(
          `Unable to update user: ${
            error.response?.data?.message || "Unknown error"
          }`
        );
      }
    };

    submitUpdate();
  };

  if (loading) return <div className="p-2 text-center">Loading...</div>;
  if (!user) return <div className="p-2 text-center">User not found</div>;

  return (
    <div className="p-2">
      <FormHeader
        title="Edit User"
        backLink={ROUTES.USERS.LIST}
      />
      <EditUserForm user={user} onSubmit={handleEdit} />
    </div>
  );
}
