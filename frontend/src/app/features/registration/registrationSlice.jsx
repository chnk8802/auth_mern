import { createSlice } from "@reduxjs/toolkit"

export const registrationSlice = createSlice({
    name: "registration",
    initialState: {
        loading: false,
        error: null
    },
    reducers: {
        registrationRequest: state => {
            return { ...state, loading: true, error: null };
        },
        registrationSuccessfull: state => {
            return { ...state, loading: false };
        },
        registrationFailure: state => {
            return { ...state, loading: false, error: action.payload };
        },
    }
}) 