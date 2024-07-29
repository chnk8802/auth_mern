import {configureStore} from '@reduxjs/toolkit'
import renderLoginSignupReducer from './features/renderLoginSignup/renderLoginSignup'
import resetPasswordReducer from './features/resetPassword/resetpasswordSlice'
import authReducer from './features/authentication/authenticationSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        resetPassword: resetPasswordReducer,
        renderLoginSignup: renderLoginSignupReducer,
    }
})