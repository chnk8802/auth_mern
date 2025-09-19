import type { User } from "@/features/users/types";
import { EditUserForm } from "@/features/users/components/UserEditForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getUserById, updateUser } from "../api/userApi";
import { getChangedFields } from "@/lib/utils";
import { ROUTES } from "@/constants/routes.constants";
import { Loading } from "@/components/common/Loading";

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
    
    if (Object.keys(changedFields).length === 0) {
      toast.info("No changes detected");
      return;
    }
    const payload = { data: [changedFields] };
    const submitUpdate = async () => {
      try {
        const result = await updateUser(userId, payload);
        
        toast.success("User details updated");
        navigate(ROUTES.USERS.DETAILS(result.data[0]._id));
      } catch (error: any) {
        
        toast.error(
          `Unable to update user: ${
            error.response?.data?.message || "Unknown error"
          }`
        );
      }
    };

    submitUpdate();
  };

  if (loading) return <Loading fullscreen={true} />;
  if (!user) return <div className="p-2 text-center">User not found</div>;

  return (
    <>
      <EditUserForm user={user} onSubmit={handleEdit} />
    </>
  );
}
