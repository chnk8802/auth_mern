import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import type { ReactNode } from "react";

type FormPageHeaderProps = {
  title: string;
  actions: ReactNode;
};

export function FormHeader({ title, actions }: FormPageHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between gap-4 pt-4">
      <div className="flex gap-2">
          {/* <Button variant="outline" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </Button> */}
        <Label className="text-xl font-bold pl-2">{title}</Label>
      </div>
      {actions && actions}
    </div>
  );
}
