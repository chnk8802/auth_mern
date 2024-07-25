import {configureStore} from '@reduxjs/toolkit'
import renderLoginSignupReducer from './features/renderLoginSignup/renderLoginSignup'
import resetPasswordReducer from './features/resetPassword/resetpasswordSlice'
import verifyLoginReducer from './features/verifyLogin/verifyLoginSlice'

export default configureStore({
    reducer: {
        renderLoginSignup: renderLoginSignupReducer,
        resetPassword: resetPasswordReducer,
        verifyLogin: verifyLoginReducer
    }
})