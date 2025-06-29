import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice} from "@reduxjs/toolkit"
import type { AuthUser, AuthState } from "../types"

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  registerLoading: false,
  registerError: null,
  registeredUser: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true
      state.error = null
    },
    loginSuccess(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
      state.loading = false
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    logout(state) {
      state.user = null
      state.error = null
      state.loading = false
    },
    registerStart(state) {
      state.registerLoading = true
      state.registerError = null
    },
    registerSuccess(state, action: PayloadAction<AuthUser>) {
      state.registerLoading = false
      state.registeredUser = action.payload
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.registerLoading = false
      state.registerError = action.payload
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
} = authSlice.actions

export default authSlice.reducer
