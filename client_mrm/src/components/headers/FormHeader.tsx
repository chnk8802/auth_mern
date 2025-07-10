import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type FormPageHeaderProps = {
  title: string;
  subtitle?: string;
  backLink?: React.ReactNode;
  actions?: React.ReactNode;
};

export function FormHeader({
  title,
  subtitle,
  backLink,
  actions,
}: FormPageHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="space-y-2 sm:space-y-0 mb-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          {backLink && <Button onClick={() => navigate(backLink)}><ChevronLeft /></Button>}
          <h1 className="text-lg font-semibold leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex gap-2 mt-2 sm:mt-0 flex-wrap justify-start sm:justify-end">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
