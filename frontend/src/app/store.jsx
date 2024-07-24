import {configureStore} from '@reduxjs/toolkit'
import renderLoginSignupReducer from './features/renderLoginSignup/renderLoginSignup'
import resetPasswordReducer from './features/resetPassword/resetpasswordSlice'

export default configureStore({
    reducer: {
        renderLoginSignup: renderLoginSignupReducer,
        resetPassword: resetPasswordReducer
    }
})