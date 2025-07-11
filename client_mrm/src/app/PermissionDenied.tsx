import { useNavigate } from "react-router-dom";
import noPermission from "@/assets/no-permission.png";
import { Button } from "@/components/ui/button";

export const PermissionDenied = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center bg-background px-4 text-center">
      <img
        src={noPermission}
        alt="Not Permission"
        className="w-64 h-64 object-contain mb-8"
      />

      <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
        Permission Denied
      </h1>
      <p className="text-muted-foreground text-lg mb-6">
        You do not have permission to perform this action.
      </p>
      <Button size="lg" onClick={() => navigate(-1)}>Go back</Button>
    </div>
  );
};
