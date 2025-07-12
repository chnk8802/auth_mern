import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type FormPageHeaderProps = {
  title: string;
  backLink: string;
};

export function FormHeader({ title, backLink }: FormPageHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-start gap-4 pt-4 px-6">
      {backLink && (
        <Button variant="ghost" size="sm" onClick={() => navigate(backLink)}>
          <ChevronLeft />
        </Button>
      )}
      <h1 className="text-lg font-semibold leading-tight">{title}</h1>
    </div>
  );
}
