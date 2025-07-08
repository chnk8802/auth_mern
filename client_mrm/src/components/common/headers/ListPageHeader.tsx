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
    <div className="flex items-end justify-end gap-12 py-4">
      <div className="flex-1">
        {isMobile && (
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            <ChevronLeft />
          </Button>
        )}
        {title && !isMobile && (
        <div className="flex-1 flex-wrap text-2xl font-semibold text-foreground">
          {title}
        </div>
      )}
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-between">
        {filters && <>{filters}</>}
        {actions && <>{actions}</>}
        {more && <>{more}</>}
      </div>
    </div>
  );
}
