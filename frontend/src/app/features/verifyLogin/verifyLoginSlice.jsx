import { createSlice } from "@reduxjs/toolkit"

export const verifyLoginSlice = createSlice({
    name: "verifyLogin",
    initialState: {
        accessToken:localStorage.getItem("accessToken") || null,
        isLoggedIn: !!localStorage.getItem("loggedInUser"),
    },
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.isLoggedIn = true
            localStorage.setItem("accessToken", action.payload.accessToken)
            localStorage.setItem("loggedInUser", JSON.stringify(action.payload.user))
            console.log(action)
        },
        logout: (state) => {
            state.isLoggedIn = false
            localStorage.removeItem("accessToken")
            localStorage.removeItem("loggedInUser")
        }
    }
})

export const {login, logout} = verifyLoginSlice.actions
export default verifyLoginSlice.reducer