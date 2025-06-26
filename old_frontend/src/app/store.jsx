import {configureStore} from '@reduxjs/toolkit'
import renderLoginSignupReducer from './features/renderLoginSignup/renderLoginSignup'
import resetPasswordReducer from './features/resetPassword/resetpasswordSlice'
import authReducer from './features/authentication/authenticationSlice'
import notificationReducer from './features/notification/notificationSlice'
import currentPageReducer from './features/currentPage/currentPageSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        resetPassword: resetPasswordReducer,
        renderLoginSignup: renderLoginSignupReducer,
        notification: notificationReducer,
        currentPage: currentPageReducer
    }
})