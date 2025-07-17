import { Button } from "@/components/ui/button";
import { ChevronLeft, SquarePen } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { useIsMobile } from "@/hooks/use-mobile";

type DetailsPageHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  backLink?: string;
  actions?: React.ReactNode;
  more?: React.ReactNode;
  onEdit?: () => void;
};

export function DetailsPageHeader({
  title,
  backLink,
  onEdit,
  more,
}: DetailsPageHeaderProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center justify-between gap-4 pt-4">
      <div className="flex gap-2">
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
      <div className="flex gap-2">
        <>
          <Button onClick={onEdit}>
            <SquarePen className="sm:mr-2 h-4 w-4" />
            {!isMobile && "Edit"}
          </Button>
        </>
        {more && <>{more}</>}
      </div>
    </div>
  );
}
