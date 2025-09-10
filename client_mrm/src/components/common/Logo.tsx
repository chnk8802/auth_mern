import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Wrench } from "lucide-react";

type LogoProps = {
  className?: string;
  textLogo?: string;
  tagline?: string;
  imageSrc?: string;
  altText?: string;
  linkTo?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: { img: "h-8", text: "text-sm", tagline: "text-xs" },
  md: { img: "h-16", text: "text-lg", tagline: "text-sm" },
  lg: { img: "h-20", text: "text-2xl", tagline: "text-base" },
};

export function Logo({
  className,
  textLogo,
  tagline,
  imageSrc,
  altText,
  linkTo = "/",
  size = "md",
}: LogoProps) {
  const { img, text, tagline: taglineSize } = sizeClasses[size];

  return (
    <Link to={linkTo} className={cn("flex items-center gap-2", className)}>
      {imageSrc ? (
        <img src={imageSrc} alt={altText || textLogo} className={img} />
      ) : (
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Wrench className="size-4" />
            </div>
            MRM Inc.
          </Link>
        </div>
      )}

      <div className="flex flex-col leading-none">
        <span className={cn("font-bold text-blue-600", text)}>{textLogo}</span>
        {imageSrc && tagline && (
          <span className={cn("text-muted-foreground", taglineSize)}>
            {tagline}
          </span>
        )}
      </div>
    </Link>
  );
}
