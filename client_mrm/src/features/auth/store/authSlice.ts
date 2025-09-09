import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice} from "@reduxjs/toolkit"
import type { AuthUser, AuthState } from "../types"

const initialState: AuthState = {
  user: null,
  loading: { /*login: false;*/register: false },
  bootstrapped: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
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
    setBootstrapped(state, action: PayloadAction<boolean>) {
      state.bootstrapped = action.payload
    },
  },
})

export const {
  // loginStart,
  loginSuccess,
  // loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  setBootstrapped,
} = authSlice.actions

export default authSlice.reducer
