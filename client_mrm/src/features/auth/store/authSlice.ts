import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice} from "@reduxjs/toolkit"
import type { AuthUser, AuthState } from "../types"

const initialState: AuthState = {
  user: null,
  loading: { login: false, register: false },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading.login = true
    },
    loginSuccess(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
      state.loading.login = false
    },
    loginFailure(state) {
      state.loading.login = false
    },
    logout(state) {
      state.user = null
      state.loading.login = false
    },
    registerStart(state) {
      state.loading.register = true
    },
    registerSuccess(state) {
      state.loading.register = false
    },
    registerFailure(state) {
      state.loading.register = false
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
