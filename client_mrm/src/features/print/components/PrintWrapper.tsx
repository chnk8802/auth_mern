import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export const PrintWrapper = ({ children }: { children: React.ReactNode }) => {
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <ReactToPrint
        trigger={() => (
          <Button variant="ghost" size="icon">
            <Printer className="w-4 h-4" />
          </Button>
        )}
        content={() => printRef.current}
      />
      <div className="hidden">
        <div ref={printRef}>{children}</div>
      </div>
    </>
  );
};
