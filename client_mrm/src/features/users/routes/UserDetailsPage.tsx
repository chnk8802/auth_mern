"use client";

import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "@/features/users/api/userApi";
import type { User } from "@/features/users/types";
import { DetailGrid } from "@/components/common/DetailGrid";
import { DetailItem } from "@/components/common/DetailItem";
import { toast } from "sonner";
import { DetailToolbar } from "@/components/common/DetailPageToolbar";

export default function UserDetailPage() {
  const navigate = useNavigate()
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await getUser(userId);
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
  if (!user) return <div className="p-6 text-start">User not found.</div>;

  return (
    <>
    <DetailToolbar
  title="User Details"
  onEdit={() => navigate(`/users/${user._id}/edit`)}
  onDelete={() => console.log("delete", user._id)} // Add confirm modal later
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
  
    </>);
}
