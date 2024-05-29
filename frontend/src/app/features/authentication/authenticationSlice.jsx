import { createSlice } from "@reduxjs/toolkit";

export const authenticcationSlice = createSlice({
    name: 'authentication',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        isLoggedIn: state => {
            const userData = localStorage.getItem('loggedInUser')
            if (userData) {
                state.isLoggedIn = true
            }
        }
    }
})