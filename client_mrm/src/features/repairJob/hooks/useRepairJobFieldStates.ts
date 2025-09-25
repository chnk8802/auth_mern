import { useMemo } from "react";
import { type FieldState } from "@/lib/form-generator/types/default-field-state";

export function useRepairJobFieldStates(formData: Record<string, any>) {
  return useMemo<Record<string, FieldState>>(() => {
    const state: Record<string, FieldState> = {};
     const sparePartEntries = formData.sparePartEntries || [];

    // sparePartEntries.forEach((entry:any, index:number) => {
    //   if (entry.sourceType === "in_house") {
    //     state[`sparePart_${index}`] = { visible: true, reason: "", overridden: true };
    //     state[`externalPartName_${index}`] = { visible: false, reason: "", overridden: true };
    //   }
    //   if (entry.sourceType === "external") {
    //     state[`sparePart_${index}`] = { visible: false, reason: "", overridden: true };
    //     state[`externalPartName_${index}`] = { visible: true, reason: "", overridden: true };
    //   }
    // });
    return state;
  }, [formData]);
}
