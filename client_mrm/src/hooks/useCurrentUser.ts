import { useAppSelector } from "./redux";

export function useLoggedInUser() {
    const user = useAppSelector(state => state.auth.user);
    return user;
}