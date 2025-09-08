// src/components/ui/loading.tsx
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  text?: string;
  fullscreen?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses: Record<NonNullable<LoadingProps["size"]>, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

export function Loading({
  text = "",
  fullscreen = false,
  size = "lg",
  className,
}: LoadingProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2",
        fullscreen && "fixed inset-0 bg-background/80 z-50",
        className
      )}
    >
      <Loader2 className={cn(sizeClasses[size], "animate-spin text-primary")} />
      { text && (
        <span className="text-sm font-medium text-muted-foreground">{text}</span>
      )}
    </div>
  );
}
