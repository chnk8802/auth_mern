import { useMediaQuery } from "@mui/material";

export default function useIsMobileView() {
    return useMediaQuery(theme => theme.breakpoints.down("sm"))
}