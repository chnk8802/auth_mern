import { Separator } from "@/components/ui/separator";

interface DetailItemProps {
  label: string;
  value: string | number | null | undefined;
}

export function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm break-words">{value || "-"}</p>
      <Separator className="my-4 sm:hidden" />
    </div>
  );
}
