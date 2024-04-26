import {configureStore} from '@reduxjs/toolkit'
import renderLoginSignupReducer from './features/renderLoginSignup/renderLoginSignup'

export default configureStore({
    reducer: {
        renderLoginSignup: renderLoginSignupReducer
    }
})