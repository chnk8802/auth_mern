"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getUserById } from "@/features/users/api/userApi";
import type { User } from "@/features/users/types";
import { DetailViewSection, DetailItem } from "@/components/detailView/DetailViewComponents";
import { DetailToolbar } from "@/components/headers/DetailPageToolbar";
import { deleteUser } from "@/features/users/api/userApi";
import { ROUTES } from "@/constants/routes";
import { formatDate, formatSnakeCaseLabel } from "@/lib/utils/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, SquarePen, Trash2 } from "lucide-react";
import { DetailsPageHeader } from "@/components/headers/DetailsHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { DeleteConfirmDialog } from "@/components/common/DeleteConfirmDialog";

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

  function More() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>More Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => console.log("Duplicate")}>
              Duplicate
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => console.log("Download PDF")}>
              Download PDF
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => console.log("Print")}>
              Print
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="px-4">
      <DetailsPageHeader
        title="Users Details"
        onBack={() => navigate(ROUTES.USERS.LIST)}
        actions={
          <>
            <Button
              size={isMobile ? "icon" : "default"}
              onClick={() => navigate(ROUTES.USERS.EDIT(user._id))}
            >
              {isMobile ? (
                <SquarePen />
              ) : (
                <>
                  <SquarePen /> Edit
                </>
              )}
            </Button>
            <DeleteConfirmDialog onConfirm={() => handleDelete()}>
              <Button size={isMobile ? "icon" : "default"}>
                {isMobile ? (
                  <Trash2 />
                ) : (
                  <>
                    <Trash2 /> Delete
                  </>
                )}
              </Button>
            </DeleteConfirmDialog>
          </>
        }
        more={<>{<More />}</>}
      />
      <DetailViewSection>
        <DetailItem label="User Code" value={user.userCode} />
        <DetailItem
          label="Name"
          value={user.fullName || user.email.split("@")[0]}
        />
        <DetailItem label="Email" value={user.email} />
        <DetailItem label="Role" value={formatSnakeCaseLabel(user.role)} />
        <DetailItem
          label="Address"
          value={[
            user.address?.street,
            user.address?.city,
            formatSnakeCaseLabel(user.address?.state),
            formatSnakeCaseLabel(user.address?.country),
            user.address?.zip,
          ]
            .filter(Boolean)
            .join(", ")}
        />
        <DetailItem label="Created at" value={formatDate(user.createdAt)} />
        <DetailItem label="Last updated" value={formatDate(user.updatedAt)} />
      </DetailViewSection>
    </div>
  );
}
