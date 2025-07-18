import { useMemo } from "react";
import { type FieldState } from "@/lib/form-generator/types/default-field-state";

export const useUserFieldState = (formData: Record <string, any>) => {
return useMemo<Record<string, FieldState>>(() => {
    const state: Record<string, FieldState> = {};

    state.userCode = {
        visible: false
    }
    state.address
    state.createdAt = {
        visible: false
    }
    state.updatedAt = {
        visible: false
    }
    return state;
}, [formData])
}