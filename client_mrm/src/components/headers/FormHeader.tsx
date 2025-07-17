import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import type { ReactNode } from "react";

type FormPageHeaderProps = {
  title: string;
  backLink: string;
  actions: ReactNode;
};

export function FormHeader({ title, backLink, actions }: FormPageHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between gap-4 pt-4">
      <div className="flex gap-2">
        {backLink && (
          <Button variant="outline" size="icon" onClick={() => navigate(backLink)}>
            <ChevronLeft />
          </Button>
        )}
        <Label className="text-xl font-bold pl-2">{title}</Label>
      </div>
      {actions && actions}
    </div>
  );
}
