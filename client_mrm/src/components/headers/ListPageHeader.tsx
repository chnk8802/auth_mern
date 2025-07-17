import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";

type ListPageHeaderProps = {
  title: string;
  backLink?: string;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  more?: React.ReactNode;
};

export function ListPageHeader({
  title,
  backLink,
  actions,
  filters,
  more,
}: ListPageHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between gap-4 pt-4">
      <div className="flex gap-2 items-center">
        {backLink && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(backLink)}
          >
            <ChevronLeft />
          </Button>
        )}
        <Label className="text-xl font-bold pl-2">{title}</Label>
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-between">
        {filters && <>{filters}</>}
        {actions && <>{actions}</>}
        {more && <>{more}</>}
      </div>
    </div>
  );
}
