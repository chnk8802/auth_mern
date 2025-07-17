"use client";

import { Copy, Database } from "lucide-react";
import React from "react";
import { Label } from "../ui/label";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  dracula,
  coldarkCold,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useIsDarkMode } from "@/hooks/useDarkMode";
import { Button } from "../ui/button";
import { toast } from "sonner";

type LiveFormDataProps = {
  data: Record<string, any>;
};

export const LiveFormData: React.FC<LiveFormDataProps> = ({ data }) => {
  const isDark = useIsDarkMode();

  return (
    <div className="rounded-lg border p-4 bg-muted/30">
      <div className="flex gap-2 items-center mb-2">
        <Database />
        <Label className="text-lg font-semibold">Live Form Data</Label>
        <Button
          size="sm"
          variant="outline"
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(JSON.stringify(data, null, 2));
            toast.info(`Data Copied: ${JSON.stringify(data, null, 2)}`)
          }}
        >
          <Copy />
        </Button>
      </div>
      <SyntaxHighlighter
        language="json"
        style={isDark ? dracula : coldarkCold}
        customStyle={{
          background: "transparent",
          fontSize: "0.875rem",
          borderRadius: "0.5rem",
          padding: "1rem",
        }}
      >
        {JSON.stringify(data, null, 2)}
      </SyntaxHighlighter>
    </div>
  );
};
