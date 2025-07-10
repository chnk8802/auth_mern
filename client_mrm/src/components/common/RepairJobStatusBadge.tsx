import { Badge } from "@/components/ui/badge";

type RepairStatus = "pending" | "in_progress" | "completed" | "picked" | string;

interface RepairJobStatusBadgeProps {
  status: RepairStatus;
}

const statusMap: Record<
  RepairStatus,
  {
    label: string;
    variant:
      | "default"
      | "secondary"
      | "destructive"
      | "primary"
      | "outline"
      | "success"
      | "warning";
  }
> = {
  pending: { label: "Pending", variant: "secondary" },
  in_progress: { label: "In Progress", variant: "warning" },
  completed: { label: "Completed", variant: "success" },
  incomplete: { label: "Incomplete", variant: "primary" },
  picked: { label: "Picked", variant: "default" },
};

export function RepairJobStatusBadge({ status }: RepairJobStatusBadgeProps) {
  const statusConfig = statusMap[status] ?? {
    label: status.toString(),
    variant: "outline",
  };

  return <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>;
}
