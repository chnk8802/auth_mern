import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type DetailsPageHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  onBack?: () => void;
  actions?: React.ReactNode;
};

export function DetailsPageHeader({
  title,
  subtitle,
  onBack,
  actions,
}: DetailsPageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 sm:gap-2 mb-6">
      {/* Title + Back */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack || (() => navigate(-1))}
            className="h-8 w-8 shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Actions for larger screens */}
        {actions && (
          <div className="hidden sm:flex flex-wrap gap-2">{actions}</div>
        )}
      </div>

      {/* Actions for small screens */}
      {actions && (
        <div className="flex sm:hidden flex-wrap gap-2">{actions}</div>
      )}
    </div>
  );
}


// import { Button } from "@/components/ui/button"
// import { ChevronLeft } from "lucide-react"
// import { useNavigate } from "react-router-dom"

// type DetailsPageHeaderProps = {
//   title: React.ReactNode
//   subtitle?: React.ReactNode
//   onBack?: () => void
//   actions?: React.ReactNode
// }

// export function DetailsPageHeader({
//   title,
//   subtitle,
//   onBack,
//   actions,
// }: DetailsPageHeaderProps) {
//   const navigate = useNavigate()

//   return (
//     <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
//       <div className="flex items-center gap-3">
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={onBack || (() => navigate(-1))}
//           className="h-8 w-8"
//         >
//           <ChevronLeft className="h-4 w-4" />
//         </Button>
//         <div>
//           <h1 className="text-xl font-semibold leading-tight">{title}</h1>
//           {subtitle && (
//             <p className="text-sm text-muted-foreground leading-snug">
//               {subtitle}
//             </p>
//           )}
//         </div>
//       </div>

//       {actions && (
//         <div className="mt-2 sm:mt-0 flex flex-wrap gap-2 sm:justify-end">
//           {actions}
//         </div>
//       )}
//     </div>
//   )
// }
