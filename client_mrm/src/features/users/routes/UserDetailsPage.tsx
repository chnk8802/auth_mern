"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getUserById } from "@/features/users/api/userApi";
import type { User } from "@/features/users/types";
import { DetailToolbar } from "@/components/headers/DetailPageToolbar";
import { deleteUser } from "@/features/users/api/userApi";
import { ROUTES } from "@/constants/routes";
import { useIsMobile } from "@/hooks/use-mobile";
import { userFields } from "../config/userFields";
import { DetailsBuilder } from "@/lib/form-generator/components/DetailView/DetailBuilder";

export function UserDetailPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleDelete = async () => {
    if (!user?._id) return;

    try {
      const result = await deleteUser(user._id);
      console.log("results", result);
      toast.success(`${result.data[0].userCode} deleted successfully`);
      navigate(ROUTES.USERS.LIST);
    } catch (err) {
      console.error("Delete failed", err);
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
      <DetailsBuilder
        title="User Details"
        backLink={ROUTES.USERS.LIST}
        fields={userFields}
        data={user}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
}
