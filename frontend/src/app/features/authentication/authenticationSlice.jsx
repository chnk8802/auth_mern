import { createSlice } from "@reduxjs/toolkit"

export const authenticationSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: localStorage.getItem("accessToken") || null,
        loggedInUser: JSON.parse(localStorage.getItem("loggedInUser")) || null,
        isLoggedIn: !!localStorage.getItem("loggedInUser"),
    },
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.isLoggedIn = true
            localStorage.setItem("accessToken", action.payload.accessToken)
            localStorage.setItem("loggedInUser", JSON.stringify(action.payload.user))
        },
        logout: (state) => {
            state.isLoggedIn = false
            localStorage.removeItem("accessToken")
            localStorage.removeItem("loggedInUser")
        }
    }
})

export const {login, logout} = authenticationSlice.actions
export default authenticationSlice.reducer