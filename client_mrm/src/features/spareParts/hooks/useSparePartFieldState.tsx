import { useMemo } from "react";
import { type FieldState } from "@/lib/form-generator/types/default-field-state";

export function useSparePartFieldStates(formData: Record<string, any>) {
  return useMemo<Record<string, FieldState>>(() => {
    const state: Record<string, FieldState> = {};
    console.log("state", state);
    // const sparePartType = formData.sparePartType;

    // Make phone field required only for business spare parts
    // if (sparePartType === "business") {
    //   state.phone = {
    //     required: true,
    //     reason: "Business spare parts must provide a phone number",
    //     overridden: true,
    //   };
    // }

    // Lock fullName if it's already filled
    // if (formData.fullName) {
    //   state.fullName = {
    //     readOnly: true,
    //     reason: "Full name cannot be changed once set",
    //     overridden: true,
    //   };
    // }

    // Hide address for individual spare parts
    // if (sparePartType === "individual") {
    //   state.address = {
    //     visible: false,
    //     reason: "Address not required for individual spare parts",
    //     overridden: true,
    //   };
    // }

    return state;
  }, [formData]);
}
