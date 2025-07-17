"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-Table";
import { deleteUser, getUsers } from "@/features/users/api/userApi";
import type { User } from "@/features/users/types";
import { useNavigate } from "react-router-dom";
import { userFields } from "../config/userFields";
import { ColumnGenerator } from "@/lib/form-generator/components/ListView/ColumnGenerator";

export function UsersListPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchUsers = async () => {
    try {
      const res = await getUsers({ page, limit }); // Fetching all users with a large limit
      setUsers(res.data);
      setTotal(res.meta.pagination.total);
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

  const columns = ColumnGenerator<User>({
    fields: userFields,
    onEdit: handleRowEdit,
    onDelete: handleRowDelete,
    copyField: "userCode",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <DataTable
      columns={columns}
      data={users}
      moduleName={"User"}
      page={page}
      setPage={setPage}
      limit={limit}
      setLimit={setLimit}
      total={total}
    />
  );
}
