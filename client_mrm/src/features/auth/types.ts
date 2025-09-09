export interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  address: object;
  role: string;
}

export interface AuthState {
  user: AuthUser | null
  loading: { /*login: boolean;*/ register: boolean }
  bootstrapped: boolean
}


export interface LoginPayload {
  email: string;
  password: string;
}


export interface RegisterPayload {
    email: string,
    password: string,
    role: string
}