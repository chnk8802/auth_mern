"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-Table";
import { getUserColumns } from "@/features/users/components/Columns";
import { deleteUser, getUsers } from "@/features/users/api/userApi";
import type { User } from "@/features/users/types";
import { useNavigate } from "react-router-dom";

export function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const handleRowEdit = (user: User) => {
    navigate(`/dashboard/users/${user._id}/edit`);
  };

  const handleRowDelete = async (user: User) => {
    try {
      const result = await deleteUser(user._id);
      toast.success(`${result.data[0].userCode} User deleted`);
      fetchUsers(); // refresh list
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <DataTable
      columns={getUserColumns({
        onEdit: handleRowEdit,
        onDelete: handleRowDelete,
      })}
      data={users}
      moduleName={"Users"}
    />
  );
}
