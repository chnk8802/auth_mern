import { createSlice } from "@reduxjs/toolkit";

export const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState: {
        showVerifyEmail: true,
        showOtpInput: false,
        showChangePassword: false,
        otpVerifiedUser:''
    },
    reducers: {
        showVerifyEmail: state => {
            state.showVerifyEmail = true,
            state.showOtpInput = false,
            state.showChangePassword = false
            state.otpVerifiedUser = ""
        },
        showOtpInput: (state) => {
            state.showVerifyEmail = false,
            state.showOtpInput = true,
            state.showChangePassword = false
            state.otpVerifiedUser = ""
        },
        showChangePassword: (state, otpVerifiedUser) => {
            state.showVerifyEmail = false,
            state.showOtpInput = false,
            state.showChangePassword = true
            state.otpVerifiedUser = otpVerifiedUser
        }
    }
})

export const {showVerifyEmail, showOtpInput, showChangePassword} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer