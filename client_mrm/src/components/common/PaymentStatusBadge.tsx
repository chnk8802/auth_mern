import { Badge } from "@/components/ui/badge";

type PaymentStatus = "paid" | "partial" | "unpaid" | string;

interface PaymentStatusBadgeProps {
  status?: PaymentStatus;
}

const STATUS_MAP: Record<
  PaymentStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline" | null;
  }
> = {
  paid: {
    label: "Paid",
    variant: "default",
  },
  partial: {
    label: "Partially Paid",
    variant: "secondary",
  },
  unpaid: {
    label: "Unpaid",
    variant: "destructive",
  },
};

export function PaymentStatusBadge({
  status = "unpaid",
}: PaymentStatusBadgeProps) {
  const { label, variant } = STATUS_MAP[status] || {
    label: status.charAt(0).toUpperCase() + status.slice(1),
    variant: "outline",
  };

  return <Badge variant={variant}>{label}</Badge>;
}
