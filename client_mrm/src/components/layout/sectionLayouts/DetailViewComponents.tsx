import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface DetailItemProps {
  label: string;
  value: ReactNode | string | number | null | undefined;
  ref?: {
    module: string;
    id: string;
  };
}

export function DetailItem({ label, value, ref }: DetailItemProps) {
  const content = (
    <>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm break-words">{value ?? "-"}</p>
      <Separator className="my-2 sm:hidden" />
    </>
  );

  const wrapperClass = "block rounded-md hover:bg-muted/50 transition-colors px-2 mx-2";

  return ref?.id ? (
    <Link to={`/dashboard/${ref.module}/${ref.id}`} className={wrapperClass}>
      {content}
    </Link>
  ) : (
    <div>{content}</div>
  );
}
