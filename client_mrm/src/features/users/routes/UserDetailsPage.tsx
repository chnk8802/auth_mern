"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getUserById } from "@/features/users/api/userApi";
import type { User } from "@/features/users/types";
import { deleteUser } from "@/features/users/api/userApi";
import { ROUTES } from "@/constants/routes.constants";
import { userFields } from "../config/userFields";
import { DetailsBuilder } from "@/lib/form-generator/components/DetailView/DetailBuilder";
import { Loading } from "@/components/common/Loading";
import { DetailsPageHeader } from "@/components/headers/DetailsHeader";

export function UserDetailPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleDelete = async () => {
    if (!user?._id) return;

    try {
      const result = await deleteUser(user._id);
      toast.success(`${result.data[0].userCode} deleted successfully`);
      navigate(ROUTES.USERS.LIST);
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };
  const handleEdit = async () => {
    if (!user?._id) return;
    navigate(ROUTES.USERS.EDIT(user._id));
  };

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

  if (loading) return <Loading fullscreen={true} />;
  if (!user)
    return (
      <div className="p-6 text-start">
        <DetailsPageHeader title="User Details" />
        User not found.
      </div>
    );

  return (
    <>
      <DetailsBuilder
        title="User Details"
        fieldConfig={userFields}
        data={user}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
}
