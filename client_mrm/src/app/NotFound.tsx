import { useNavigate } from "react-router-dom";
import notFoundImage from "@/assets/not-found.png";
import { Button } from "@/components/ui/button";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <img
        src={notFoundImage}
        alt="Not Found"
        className="w-64 h-64 object-contain mb-8"
      />

      <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-muted-foreground text-lg mb-6">
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <Button onClick={() => navigate("/")}>Go back</Button>
    </div>
  );
};
