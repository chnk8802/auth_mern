import { Database } from "lucide-react";
import React from "react";

type LiveFormDataProps = {
  data: Record<string, any>;
};

export const LiveFormData: React.FC<LiveFormDataProps> = ({
  data,
}) => {
  return (
    <div className="rounded-lg border p-4 bg-muted/30">
      <h3 className="text-lg font-semibold mb-2"><Database/>Live Form Data</h3>
      <pre className="text-sm bg-muted p-2 rounded overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};
