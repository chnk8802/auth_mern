import type { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Optional: if you use a classnames util
import { motion } from "framer-motion";
import { ColumnGrid } from "@/components/layout/sectionLayouts/Grids";

export function Section({
  title,
  col,
  children,
}: {
  title?: string;
  col?: number
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-muted/10 p-4 sm:p-6 mb-4">
      <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
        {title}
      </h3>
      <ColumnGrid col={col}>{children}</ColumnGrid>
    </section>
  );
}

type FormSectionProps = {
  title?: string;
  col?: number;
  children: React.ReactNode;
  disableAnimation?: boolean;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function AnimatedSection({
  title,
  children,
  col,
  disableAnimation = false,
}: FormSectionProps) {
  const Container = disableAnimation ? "div" : motion.div;

  return (
    <section className={cn("rounded-xl border bg-muted/10 p-4 sm:p-6 mb-4")}>
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
          {title}
        </h3>
      )}
      <Container
        {...(!disableAnimation && {
          initial: "hidden",
          animate: "show",
          variants: fadeInUp,
        })}
        className={cn("space-y-4")}
      >
        <ColumnGrid col={col}>{children}</ColumnGrid>
      </Container>
    </section>
  );
}
