import {createSlice} from '@reduxjs/toolkit'

export const renderLoginSignupSlice = createSlice({
    name: 'renderLoginSignup',
    initialState: {
        showLogin: true,
        showSignup: false,
    },
    reducers:{
        showLogin: state => {
            state.showLogin = true
            state.showSignup = false 
        },
        showSignup: state => {
            state.showLogin = false
            state.showSignup = true 
        },
    }
})

export const { showLogin, showSignup } = renderLoginSignupSlice.actions
export default renderLoginSignupSlice.reducer