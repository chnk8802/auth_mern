"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-Table";
import { columns } from "@/features/users/components/Columns";
import { getUsers } from "@/features/users/api/userApi";
import type { User } from "@/features/users/types";
import { toast } from "sonner";
import { UserIcon } from "lucide-react";

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const promise = getUsers().then((res) => {
        setUsers(res.data);
        return res;
      });

      toast.promise(promise, {
        error: "Failed to fetch users",
      });
    };

    fetchUsers();
  }, []);
  return <DataTable columns={columns} data={users} moduleName={"Users"} />;
}
