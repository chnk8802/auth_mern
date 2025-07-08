import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router-dom";

type DetailsPageHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  onBack?: () => void;
  actions?: React.ReactNode;
  more?: React.ReactNode;
};

export function DetailsPageHeader({
  title,
  onBack,
  actions,
  more,
}: DetailsPageHeaderProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="flex items-end justify-end gap-2 py-4">
      <div className="flex-1">
        {isMobile && (
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={onBack || (() => navigate(-1))}
          >
            <ChevronLeft />
          </Button>
        )}
        {title && !isMobile && (
        <div className="flex-1 flex-wrap justify-start text-2xl font-semibold text-foreground">
          {title}
        </div>
      )}
      </div>
      
      <div className="flex flex-wrap gap-2 items-center justify-between">
        {actions && <>{actions}</>}
        {more && <>{more}</>}
      </div>
    </div>
  );
}
