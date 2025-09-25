import { useMemo } from "react";
import { type FieldState } from "@/lib/form-generator/types/default-field-state";

export function useSparePartEntryFieldStates(formData: Record<string, any>) {
  return useMemo<Record<string, FieldState>>(() => {
    const state: Record<string, FieldState> = {};

    // if (formData.sourceType === undefined || formData.sourceType === "") {
    //   state.sparePart = {
    //     visible: false,
    //     reason: "Please select a supplier first",
    //     overridden: true,
    //   };
    //   state.supplier = {
    //     visible: false,
    //     reason:
    //       "Supplier and Spare Part selector are only visible if source type is In-house",
    //     overridden: true,
    //   };
    //   state.externalPartName = {
    //     visible: false,
    //     reason: "Please select a supplier first",
    //     overridden: true,
    //   };
    // } else if (formData.sourceType && formData.sourceType === "external") {
    //   state.sparePart = {
    //     visible: false,
    //     reason: "Please select a supplier first",
    //     overridden: true,
    //   };
    // } else {
    //   state.supplier = {
    //     visible: false,
    //     reason:
    //       "Supplier and Spare Part selector are only visible if source type is In-house",
    //     overridden: true,
    //   };
    //   state.externalPartName = {
    //     visible: false,
    //     reason: "Please select a supplier first",
    //     overridden: true,
    //   };
    // }

    return state;
  }, [formData]);
}
