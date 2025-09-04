"use client";

import { useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import type { SignatureField } from "@/lib/form-generator/types/field-types";

type Props = {
  field: SignatureField
  value?: string; // base64 string
  onChange: (val: string) => void;
};

export function SignatureInput({
  field,
  value,
  onChange,
}: Props) {
  const sigPadRef = useRef<SignatureCanvas>(null);

  // Handle drawing enable/disable
  useEffect(() => {
    if (!sigPadRef.current) return;
    if (field.disabled || field.readOnly) {
      sigPadRef.current.off(); // disables drawing
    } else {
      sigPadRef.current.on(); // enables drawing
    }
  }, [field.disabled, field.readOnly]);

  // Load existing signature
  useEffect(() => {
    if (value && sigPadRef.current && sigPadRef.current.isEmpty()) {
      const img = new Image();
      img.onload = () => {
        const canvas = sigPadRef.current?.getCanvas();
        canvas?.getContext("2d")?.drawImage(img, 0, 0);
      };
      img.src = value;
    }
  }, [value]);

  const handleClear = () => {
    sigPadRef.current?.clear();
    onChange("");
  };

  const handleEnd = () => {
    if (sigPadRef.current?.isEmpty()) return;
    onChange(sigPadRef.current?.toDataURL() || "");
  };

  return (
    <div className="space-y-2">
      {/* {label && <Label htmlFor={id}>{label}</Label>} */}
      <div
        className={clsx(
          "border rounded-md p-2 w-full max-w-md bg-white dark:bg-neutral-900"
        )}
      >
        <SignatureCanvas
          ref={sigPadRef}
          penColor="#1E40AF"
          canvasProps={{
            className: clsx(
              "rounded-md w-full h-48",
              "bg-white dark:bg-neutral-900",
              field.readOnly || field.disabled && "opacity-70 cursor-not-allowed"
            ),
          }}
          onEnd={handleEnd}
          clearOnResize={false}
        />
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={handleClear}
        disabled={field.disabled || field.readOnly}
      >
        Clear
      </Button>
    </div>
  );
}
