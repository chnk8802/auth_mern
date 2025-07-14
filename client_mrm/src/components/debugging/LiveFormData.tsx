"use client";

import { Database } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";

type LiveFormDataProps = {
  data: Record<string, any>;
};

export const LiveFormData: React.FC<LiveFormDataProps> = ({ data }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode(); // Initial check

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="rounded-lg border p-4 bg-muted/30">
      <div className="flex gap-2 items-center mb-2">
        <Database />
        <Label className="text-lg font-semibold">Live Form Data</Label>
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
