import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

// Section wrapper with title
export function DetailViewSection({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-muted/40 p-4 sm:p-6 mb-4">
      <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
        {title}
      </h3>
      <DetailGrid>{children}</DetailGrid>
    </section>
  );
}

// 2-column responsive grid
export function DetailGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6">{children}</div>
  );
}

// Single labeled value
interface DetailItemProps {
  label: string;
  value: React.ReactNode | string | number | null | undefined;
  ref?: {
    module: string;
    id: string;
  };
}

// export function DetailItem({ label, value, ref }: DetailItemProps) {
//   if (ref?.id) {
//     return (
//       <>
//         <p className="text-sm text-muted-foreground">{label}</p>
//         <Link
//           to={`/dashboard/${ref.module}/${ref.id}`}
//           className="hover:underline"
//         >
//           <p className="text-sm break-words">{value || "-"}</p>
//         </Link>
//         <Separator className="my-4 sm:hidden" />
//       </>
//     );
//   }

//   return (
//     <div>
//       <p className="text-sm text-muted-foreground">{label}</p>
//       <p className="text-sm break-words">{value || "-"}</p>
//       <Separator className="my-4 sm:hidden" />
//     </div>
//   );
  export function DetailItem({ label, value, ref }: DetailItemProps) {
    const content = (
      <>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-sm break-words">{value || "-"}</p>
        <Separator className="my-4 sm:hidden" />
      </>
    );

    if (ref?.id) {
      return (
        <Link
          to={`/dashboard/${ref.module}/${ref.id}`}
          className="block rounded-md hover:bg-muted/50 transition-colors px-2 -mx-2"
        >
          {content}
        </Link>
      );
    }

    return <div>{content}</div>;
}
