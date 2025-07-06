"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getUserById } from "@/features/users/api/userApi";
import type { User } from "@/features/users/types";
import { DetailGrid } from "@/components/common/DetailGrid";
import { DetailItem } from "@/components/common/DetailItem";
import { DetailToolbar } from "@/components/common/DetailPageToolbar";
import { deleteUser } from "@/features/users/api/userApi";
import { ROUTES } from "@/constants/routes";

export function UserDetailPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleDelete = async () => {
    if (!user?._id) return;

    try {
      const result = await deleteUser(user._id);
      console.log("results", result)
      toast.success(`${result.data[0].userCode} deleted successfully`);
      navigate(ROUTES.USERS.LIST);
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete user");
    }
  };

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

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!user)
    return (
      <div className="p-6 text-start">
        <DetailToolbar title="User Details" />
        User not found.
      </div>
    );

  return (
    <>
      <DetailToolbar
        title="User Details"
        onEdit={() => navigate(ROUTES.USERS.EDIT(user._id))}
        onDelete={() => handleDelete()}
      />
      <DetailGrid>
        <DetailItem label="User Code" value={user.userCode} />
        <DetailItem
          label="Name"
          value={user.fullName || user.email.split("@")[0]}
        />
        <DetailItem label="Email" value={user.email} />
        <DetailItem label="Role" value={user.role} />
        <DetailItem
          label="Address"
          value={[
            user.address?.street,
            user.address?.city,
            user.address?.state,
            user.address?.country,
            user.address?.zip,
          ]
            .filter(Boolean)
            .join(", ")}
        />
      </DetailGrid>
    </>
  );
}
