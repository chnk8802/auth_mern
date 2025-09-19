import { useMemo } from "react";
import { type FieldState } from "@/lib/form-generator/types/default-field-state";

export function useCustomerFieldStates(formData: Record<string, any>) {
  return useMemo<Record<string, FieldState>>(() => {
    const state: Record<string, FieldState> = {};
    const customerType = formData.customerType;

    // Make phone field required only for business customers
    if (customerType === "business") {
      state.phone = {
        required: true,
        reason: "Business customers must provide a phone number",
        overridden: true,
      };
    }

    // Lock fullName if it's already filled
    // if (formData.fullName) {
    //   state.fullName = {
    //     readOnly: true,
    //     reason: "Full name cannot be changed once set",
    //     overridden: true,
    //   };
    // }

    // Hide address for individual customers
    if (customerType === "individual") {
      state.address = {
        visible: false,
        reason: "Address not required for individual customers",
        overridden: true,
      };
    }

    return state;
  }, [formData]);
}
