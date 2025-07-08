import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ListPageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  more?: React.ReactNode;
};

export function ListPageHeader({
  title,
  actions,
  filters,
  more,
}: ListPageHeaderProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  return (
    <div className="flex items-end justify-end gap-2 py-4">
      <div className="flex-1">
        <Button
          variant="ghost"
          className="mr-2 cursor-pointer"
          onClick={() => navigate(ROUTES.DASHBOARD)}
        >
          <ChevronLeft />
        </Button>
      </div>

      {title && !isMobile && (
        <div className="flex-1 flex-wrap text-lg font-semibold text-foreground">
          {title}
        </div>
      )}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        {filters && <>{filters}</>}
        {actions && <>{actions}</>}
        {more && <>{more}</>}
      </div>
    </div>
  );
}
